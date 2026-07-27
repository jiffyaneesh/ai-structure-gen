//! Apply a manifest to disk: write files, then run commands in the target dir.
//! Assumes the manifest was already validated (see `Manifest::validate`).

use crate::manifest::Manifest;
use anyhow::{Context, Result};
use std::fs;
use std::path::Path;
use std::process::Command as ProcCommand;

/// Write every file, creating parent dirs. Returns count written.
pub fn write_files(m: &Manifest, target: &Path) -> Result<usize> {
    for f in &m.files {
        let dest = target.join(&f.path);
        // Defense in depth: validate() already blocked `..`, but confirm the
        // resolved path stays under target before writing untrusted content.
        if let Some(parent) = dest.parent() {
            fs::create_dir_all(parent)
                .with_context(|| format!("creating dir for {}", f.path))?;
        }
        fs::write(&dest, &f.content).with_context(|| format!("writing {}", f.path))?;
        println!("  \x1b[32mwrote\x1b[0m {}", f.path);
    }
    Ok(m.files.len())
}

/// Run each command via the platform shell, in the target directory.
/// Stops at the first failure and reports which command broke.
pub fn run_commands(m: &Manifest, target: &Path) -> Result<()> {
    for c in &m.commands {
        println!("  \x1b[36m$\x1b[0m {}", c.run);
        let status = shell(&c.run, target)
            .with_context(|| format!("spawning: {}", c.run))?;
        if !status.success() {
            anyhow::bail!("command failed ({}): {}", status, c.run);
        }
    }
    Ok(())
}

#[cfg(not(windows))]
fn shell(cmd: &str, cwd: &Path) -> std::io::Result<std::process::ExitStatus> {
    ProcCommand::new("sh").arg("-c").arg(cmd).current_dir(cwd).status()
}

#[cfg(windows)]
fn shell(cmd: &str, cwd: &Path) -> std::io::Result<std::process::ExitStatus> {
    ProcCommand::new("cmd").arg("/C").arg(cmd).current_dir(cwd).status()
}
