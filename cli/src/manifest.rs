//! The manifest is the contract between the AI and the apply engine.
//! Providers must return JSON that deserializes into `Manifest`.

use serde::{Deserialize, Serialize};

/// A full scaffold plan returned by the AI.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Manifest {
    /// Human-readable name for the thing being built.
    #[serde(default)]
    pub name: String,
    /// One-line summary shown in the preview.
    #[serde(default)]
    pub summary: String,
    /// Files to create or overwrite. Directories are implied by paths.
    #[serde(default)]
    pub files: Vec<FileEntry>,
    /// Shell commands to run after files are written (deps install, git init, ...).
    #[serde(default)]
    pub commands: Vec<Command>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FileEntry {
    /// Relative path from the target directory. Never absolute, never `..`.
    pub path: String,
    /// Full file contents.
    #[serde(default)]
    pub content: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Command {
    /// The shell command line, e.g. "npm install".
    pub run: String,
    /// Why this command is needed (shown in preview).
    #[serde(default)]
    pub reason: String,
}

impl Manifest {
    /// Reject anything that would write outside the target dir.
    /// Trust boundary: AI output is untrusted input.
    pub fn validate(&self) -> anyhow::Result<()> {
        for f in &self.files {
            let p = f.path.trim();
            if p.is_empty() {
                anyhow::bail!("manifest has a file entry with an empty path");
            }
            if p.starts_with('/') || p.starts_with('~') {
                anyhow::bail!("absolute path not allowed: {p}");
            }
            // reject `..` as a path component (not just substring, to allow "..foo")
            if p.split(['/', '\\']).any(|c| c == "..") {
                anyhow::bail!("path escapes target directory: {p}");
            }
            if p.contains('\0') {
                anyhow::bail!("path contains null byte: {p}");
            }
        }
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn m(paths: &[&str]) -> Manifest {
        Manifest {
            name: "t".into(),
            summary: String::new(),
            files: paths
                .iter()
                .map(|p| FileEntry { path: p.to_string(), content: String::new() })
                .collect(),
            commands: vec![],
        }
    }

    #[test]
    fn accepts_normal_paths() {
        assert!(m(&["src/main.rs", "a/b/c.txt", "..foo/bar"]).validate().is_ok());
    }

    #[test]
    fn rejects_escapes() {
        assert!(m(&["../etc/passwd"]).validate().is_err());
        assert!(m(&["a/../../b"]).validate().is_err());
        assert!(m(&["/etc/passwd"]).validate().is_err());
        assert!(m(&["~/.ssh/key"]).validate().is_err());
        assert!(m(&[""]).validate().is_err());
    }
}
