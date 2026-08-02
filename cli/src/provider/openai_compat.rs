//! Providers speaking the OpenAI chat-completions protocol.
//! Groq is wire-compatible with OpenAI, so both share this one implementation —
//! they differ only in base URL, model, and which env var holds the key.

use super::{parse_manifest, Provider, SYSTEM};
use crate::manifest::Manifest;
use anyhow::{Context, Result};
use serde_json::json;

pub struct OpenAiCompat {
    /// Display name used in error messages, e.g. "openai" or "groq".
    label: &'static str,
    url: &'static str,
    model: &'static str,
    key: String,
}

impl OpenAiCompat {
    pub fn openai() -> Result<Self> {
        Ok(Self {
            label: "openai",
            url: "https://api.openai.com/v1/chat/completions",
            model: "gpt-4o",
            key: env("OPENAI_API_KEY", "openai")?,
        })
    }

    pub fn groq() -> Result<Self> {
        Ok(Self {
            label: "groq",
            url: "https://api.groq.com/openai/v1/chat/completions",
            model: "llama-3.3-70b-versatile",
            key: env("GROQ_API_KEY", "groq")?,
        })
    }
}

fn env(var: &str, provider: &str) -> Result<String> {
    std::env::var(var).with_context(|| format!("set {var} to use the {provider} provider"))
}

impl Provider for OpenAiCompat {
    fn generate(&self, prompt: &str, context: &str) -> Result<Manifest> {
        let user = if context.is_empty() {
            prompt.to_string()
        } else {
            format!("Existing project context:\n{context}\n\nRequest: {prompt}")
        };
        let resp = ureq::post(self.url)
            .set("authorization", &format!("Bearer {}", self.key))
            .set("content-type", "application/json")
            .send_json(json!({
                "model": self.model,
                "response_format": { "type": "json_object" },
                "messages": [
                    { "role": "system", "content": SYSTEM },
                    { "role": "user", "content": user },
                ],
            }))
            .map_err(super::http_err)?;
        let body: serde_json::Value = resp
            .into_json()
            .with_context(|| format!("{}: bad response body", self.label))?;
        let text = body["choices"][0]["message"]["content"]
            .as_str()
            .with_context(|| format!("{}: no content in response", self.label))?;
        parse_manifest(text)
    }
}
