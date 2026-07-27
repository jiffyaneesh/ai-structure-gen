//! Render a manifest as a human-reviewable plan before anything touches disk.

use crate::manifest::Manifest;
use std::path::Path;

/// Print the plan: summary, file tree with new/overwrite markers, commands.
pub fn render(m: &Manifest, target: &Path) {
    if !m.name.is_empty() {
        println!("\n\x1b[1m{}\x1b[0m", m.name);
    }
    if !m.summary.is_empty() {
        println!("{}", m.summary);
    }

    println!("\n\x1b[1mFiles ({}):\x1b[0m", m.files.len());
    let mut paths: Vec<&str> = m.files.iter().map(|f| f.path.as_str()).collect();
    paths.sort_unstable();
    for f in &m.files {
        let exists = target.join(&f.path).exists();
        let (marker, color) = if exists {
            ("~", "33") // yellow: overwrite
        } else {
            ("+", "32") // green: new
        };
        let bytes = f.content.len();
        println!("  \x1b[{color}m{marker}\x1b[0m {}  \x1b[2m({bytes}B)\x1b[0m", f.path);
    }

    if !m.commands.is_empty() {
        println!("\n\x1b[1mCommands ({}):\x1b[0m", m.commands.len());
        for c in &m.commands {
            if c.reason.is_empty() {
                println!("  \x1b[36m$\x1b[0m {}", c.run);
            } else {
                println!("  \x1b[36m$\x1b[0m {}  \x1b[2m# {}\x1b[0m", c.run, c.reason);
            }
        }
    }
    println!();
}

/// Count how many files would be overwritten (used to warn before apply).
pub fn overwrite_count(m: &Manifest, target: &Path) -> usize {
    m.files.iter().filter(|f| target.join(&f.path).exists()).count()
}
