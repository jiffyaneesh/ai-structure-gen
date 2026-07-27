//! blueprint (`bp`) — AI scaffolder: plan → preview → apply.

mod apply;
mod context;
mod manifest;
mod preview;
mod provider;

use anyhow::Result;
use clap::{Parser, Subcommand};
use std::io::{self, Write};
use std::path::PathBuf;

#[derive(Parser)]
#[command(name = "bp", version, about = "AI scaffolder: plan → preview → apply")]
struct Cli {
    #[command(subcommand)]
    cmd: Cmd,
}

#[derive(Subcommand)]
enum Cmd {
    /// Generate a project (or patch an existing one) from a natural-language prompt.
    Gen {
        /// What to build, e.g. "a Next.js app with TypeScript and Tailwind".
        prompt: String,
        /// Target directory (created if missing). Defaults to current dir.
        #[arg(short, long, default_value = ".")]
        dir: PathBuf,
        /// AI provider: claude (default), openai, gemini.
        #[arg(short, long, default_value = "claude")]
        provider: String,
        /// Show the plan and exit without writing anything.
        #[arg(long)]
        dry_run: bool,
        /// Apply without the confirmation prompt.
        #[arg(short = 'y', long)]
        yes: bool,
        /// Skip running commands; only write files.
        #[arg(long)]
        no_commands: bool,
    },
}

fn main() {
    if let Err(e) = run() {
        eprintln!("\x1b[31merror:\x1b[0m {e:#}");
        std::process::exit(1);
    }
}

fn run() -> Result<()> {
    let cli = Cli::parse();
    match cli.cmd {
        Cmd::Gen { prompt, dir, provider, dry_run, yes, no_commands } => {
            gen(prompt, dir, provider, dry_run, yes, no_commands)
        }
    }
}

fn gen(
    prompt: String,
    dir: PathBuf,
    provider_name: String,
    dry_run: bool,
    yes: bool,
    no_commands: bool,
) -> Result<()> {
    let provider = provider::resolve(&provider_name)?;

    // Existing project? Snapshot it so the AI patches instead of clobbering.
    let ctx = if dir.exists() { context::snapshot(&dir) } else { String::new() };
    let mode = if ctx.is_empty() { "generating" } else { "patching existing project" };
    println!("\x1b[2m{mode} via {provider_name}...\x1b[0m");

    let m = provider.generate(&prompt, &ctx)?;
    preview::render(&m, &dir);

    if dry_run {
        println!("\x1b[2mdry run — nothing written.\x1b[0m");
        return Ok(());
    }

    // Confirm before touching disk. Two things need consent: overwrites and
    // arbitrary command execution. Make both explicit.
    if !yes {
        let overwrites = preview::overwrite_count(&m, &dir);
        if overwrites > 0 {
            println!("\x1b[33m⚠ {overwrites} existing file(s) will be overwritten.\x1b[0m");
        }
        if !no_commands && !m.commands.is_empty() {
            println!(
                "\x1b[33m⚠ {} shell command(s) will run on your machine.\x1b[0m",
                m.commands.len()
            );
        }
        if !confirm("Apply this plan?")? {
            println!("aborted.");
            return Ok(());
        }
    }

    std::fs::create_dir_all(&dir)?;
    println!("\n\x1b[1mWriting files...\x1b[0m");
    let n = apply::write_files(&m, &dir)?;

    if !no_commands && !m.commands.is_empty() {
        println!("\n\x1b[1mRunning commands...\x1b[0m");
        apply::run_commands(&m, &dir)?;
    }

    println!("\n\x1b[32m✓ done\x1b[0m — {n} file(s) in {}", dir.display());
    Ok(())
}

/// Yes/no prompt on stdin. Returns false on EOF or anything not starting with 'y'.
fn confirm(question: &str) -> Result<bool> {
    print!("{question} [y/N] ");
    io::stdout().flush()?;
    let mut line = String::new();
    if io::stdin().read_line(&mut line)? == 0 {
        return Ok(false);
    }
    Ok(matches!(line.trim().chars().next(), Some('y') | Some('Y')))
}
