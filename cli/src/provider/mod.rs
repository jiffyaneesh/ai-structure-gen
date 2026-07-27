//! Provider abstraction. Each backend turns a prompt into a raw JSON manifest string.
//! A future hosted proxy slots in here as just another `Provider`.

mod claude;
mod gemini;
mod openai;

use crate::manifest::Manifest;
use anyhow::{Context, Result};

pub trait Provider {
    /// Send prompt + optional existing-project context, return a validated Manifest.
    fn generate(&self, prompt: &str, context: &str) -> Result<Manifest>;
}

/// Pick a provider by name, reading the API key from the matching env var.
/// Default is Claude (`ANTHROPIC_API_KEY`).
pub fn resolve(name: &str) -> Result<Box<dyn Provider>> {
    match name {
        "claude" | "anthropic" => Ok(Box::new(claude::Claude::from_env()?)),
        "openai" | "gpt" => Ok(Box::new(openai::OpenAi::from_env()?)),
        "gemini" | "google" => Ok(Box::new(gemini::Gemini::from_env()?)),
        other => anyhow::bail!("unknown provider '{other}' (use: claude, openai, gemini)"),
    }
}

/// System instruction shared by all providers so manifest shape is consistent.
pub(crate) const SYSTEM: &str = "You are a project scaffolding engine. \
Given a request and optional existing-project context, respond with ONLY a JSON object, \
no markdown fences, no prose. Schema: \
{\"name\":string,\"summary\":string,\
\"files\":[{\"path\":relative-path,\"content\":full-file-text}],\
\"commands\":[{\"run\":shell-command,\"reason\":string}]}. \
Rules: paths are relative, never absolute, never contain '..'. \
Include real starter code, not placeholders. \
Order commands so deps install before build. \
If existing-project context is given, only emit files/commands that ADD or CHANGE what the \
request asks for — do not rewrite unrelated files. Be idempotent.";

/// Extract a Manifest from a model's text response, tolerating stray fences/prose.
pub(crate) fn parse_manifest(raw: &str) -> Result<Manifest> {
    let json = extract_json(raw).context("no JSON object found in model response")?;
    let m: Manifest = serde_json::from_str(json)
        .with_context(|| format!("model returned invalid manifest JSON:\n{json}"))?;
    m.validate()?;
    Ok(m)
}

/// Turn a ureq error into a readable anyhow error, surfacing HTTP error bodies
/// (rate limits, bad keys) instead of a bare status code.
pub(crate) fn http_err(e: ureq::Error) -> anyhow::Error {
    match e {
        ureq::Error::Status(code, resp) => {
            let body = resp.into_string().unwrap_or_default();
            anyhow::anyhow!("provider returned HTTP {code}: {body}")
        }
        ureq::Error::Transport(t) => anyhow::anyhow!("network error: {t}"),
    }
}

/// Grab the outermost `{...}` span, ignoring markdown fences or leading prose.
fn extract_json(s: &str) -> Option<&str> {
    let start = s.find('{')?;
    let end = s.rfind('}')?;
    if end > start {
        Some(&s[start..=end])
    } else {
        None
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_fenced_json() {
        let raw = "here you go:\n```json\n{\"name\":\"x\",\"files\":[{\"path\":\"a.txt\",\"content\":\"hi\"}]}\n```";
        let m = parse_manifest(raw).unwrap();
        assert_eq!(m.name, "x");
        assert_eq!(m.files.len(), 1);
    }

    #[test]
    fn rejects_escape_path() {
        let raw = "{\"files\":[{\"path\":\"../evil\",\"content\":\"\"}]}";
        assert!(parse_manifest(raw).is_err());
    }
}
