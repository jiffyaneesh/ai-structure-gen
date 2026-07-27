//! OpenAI provider. Key: OPENAI_API_KEY.

use super::{parse_manifest, Provider, SYSTEM};
use crate::manifest::Manifest;
use anyhow::{Context, Result};
use serde_json::json;

const URL: &str = "https://api.openai.com/v1/chat/completions";
const MODEL: &str = "gpt-4o";

pub struct OpenAi {
    key: String,
}

impl OpenAi {
    pub fn from_env() -> Result<Self> {
        let key = std::env::var("OPENAI_API_KEY")
            .context("set OPENAI_API_KEY to use the openai provider")?;
        Ok(Self { key })
    }
}

impl Provider for OpenAi {
    fn generate(&self, prompt: &str, context: &str) -> Result<Manifest> {
        let user = if context.is_empty() {
            prompt.to_string()
        } else {
            format!("Existing project context:\n{context}\n\nRequest: {prompt}")
        };
        let resp = ureq::post(URL)
            .set("authorization", &format!("Bearer {}", self.key))
            .set("content-type", "application/json")
            .send_json(json!({
                "model": MODEL,
                "response_format": { "type": "json_object" },
                "messages": [
                    { "role": "system", "content": SYSTEM },
                    { "role": "user", "content": user },
                ],
            }))
            .map_err(super::http_err)?;
        let body: serde_json::Value = resp.into_json().context("openai: bad response body")?;
        let text = body["choices"][0]["message"]["content"]
            .as_str()
            .context("openai: no content in response")?;
        parse_manifest(text)
    }
}
