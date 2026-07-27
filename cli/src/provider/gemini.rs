//! Google Gemini provider. Key: GEMINI_API_KEY.

use super::{parse_manifest, Provider, SYSTEM};
use crate::manifest::Manifest;
use anyhow::{Context, Result};
use serde_json::json;

const MODEL: &str = "gemini-2.0-flash";

pub struct Gemini {
    key: String,
}

impl Gemini {
    pub fn from_env() -> Result<Self> {
        let key = std::env::var("GEMINI_API_KEY")
            .context("set GEMINI_API_KEY to use the gemini provider")?;
        Ok(Self { key })
    }
}

impl Provider for Gemini {
    fn generate(&self, prompt: &str, context: &str) -> Result<Manifest> {
        let user = if context.is_empty() {
            prompt.to_string()
        } else {
            format!("Existing project context:\n{context}\n\nRequest: {prompt}")
        };
        let url = format!(
            "https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={}",
            self.key
        );
        let resp = ureq::post(&url)
            .set("content-type", "application/json")
            .send_json(json!({
                "system_instruction": { "parts": [{ "text": SYSTEM }] },
                "contents": [{ "parts": [{ "text": user }] }],
                "generationConfig": { "responseMimeType": "application/json" },
            }))
            .map_err(super::http_err)?;
        let body: serde_json::Value = resp.into_json().context("gemini: bad response body")?;
        let text = body["candidates"][0]["content"]["parts"][0]["text"]
            .as_str()
            .context("gemini: no text in response")?;
        parse_manifest(text)
    }
}
