//! Snapshot an existing project so the AI can patch it instead of clobbering it.
//! Kept deliberately small: a file tree + a few key config files, not everything.

use std::fs;
use std::path::Path;

/// Config files worth sending verbatim so the AI extends them coherently.
const KEY_FILES: &[&str] = &[
    "package.json",
    "Cargo.toml",
    "pyproject.toml",
    "requirements.txt",
    "go.mod",
    "tsconfig.json",
];

// ponytail: flat scan capped at DEPTH/ENTRIES; deep monorepos get a partial view.
// Swap for a walkdir + .gitignore parse if that ever bites.
const DEPTH: usize = 3;
const ENTRIES: usize = 400;

/// Build a compact text snapshot of `dir`. Empty string if dir is empty/new.
pub fn snapshot(dir: &Path) -> String {
    let mut tree = Vec::new();
    walk(dir, dir, 0, &mut tree);
    if tree.is_empty() {
        return String::new();
    }
    tree.sort();
    tree.truncate(ENTRIES);

    let mut out = format!("File tree ({} entries):\n", tree.len());
    for p in &tree {
        out.push_str(p);
        out.push('\n');
    }
    for kf in KEY_FILES {
        let p = dir.join(kf);
        if let Ok(content) = fs::read_to_string(&p) {
            let trimmed: String = content.chars().take(2000).collect();
            out.push_str(&format!("\n--- {kf} ---\n{trimmed}\n"));
        }
    }
    out
}

fn walk(root: &Path, dir: &Path, depth: usize, out: &mut Vec<String>) {
    if depth > DEPTH || out.len() >= ENTRIES {
        return;
    }
    let Ok(entries) = fs::read_dir(dir) else { return };
    for entry in entries.flatten() {
        let path = entry.path();
        let name = entry.file_name();
        let name = name.to_string_lossy();
        // skip noise
        if name.starts_with('.') || name == "node_modules" || name == "target" || name == "dist" {
            continue;
        }
        if let Ok(rel) = path.strip_prefix(root) {
            out.push(rel.to_string_lossy().replace('\\', "/"));
        }
        if path.is_dir() {
            walk(root, &path, depth + 1, out);
        }
    }
}
