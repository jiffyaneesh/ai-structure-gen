//! Anthropic Claude provider (default). Key: ANTHROPIC_API_KEY.

use super::{parse_manifest, Provider, SYSTEM};
use crate::manifest::Manifest;
use anyhow::{Context, Result};
use serde_json::json;

const URL: &str = "https://api.anthropic.com/v1/messages";
const MODEL: &str = "claude-opus-4-8";

pub struct Claude {
    key: String,
}

impl Claude {
    pub fn from_env() -> Result<Self> {
        let key = std::env::var("ANTHROPIC_API_KEY")
            .context("set ANTHROPIC_API_KEY to use the claude provider")?;
        Ok(Self { key })
    }
}

impl Provider for Claude {
    fn generate(&self, prompt: &str, context: &str) -> Result<Manifest> {
        let user = if context.is_empty() {
            prompt.to_string()
        } else {
            format!("Existing project context:\n{context}\n\nRequest: {prompt}")
        };
        let resp = ureq::post(URL)
            .set("x-api-key", &self.key)
            .set("anthropic-version", "2023-06-01")
            .set("content-type", "application/json")
            .send_json(json!({
                "model": MODEL,
                "max_tokens": 8192,
                "system": SYSTEM,
                "messages": [{ "role": "user", "content": user }],
            }))
            .map_err(super::http_err)?;
        let body: serde_json::Value = resp.into_json().context("claude: bad response body")?;
        let text = body["content"][0]["text"]
            .as_str()
            .context("claude: no text in response")?;
        parse_manifest(text)
    }
}
