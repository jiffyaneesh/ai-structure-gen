# 📐 blueprint

> One prompt to a **runnable** project. blueprint plans your scaffold, shows you the diff, then applies it — writing real starter code, installing deps, and wiring config that actually agrees. Not empty folders.

[![Built with Rust](https://img.shields.io/badge/Built%20With-Rust-orange?logo=rust)](https://www.rust-lang.org/)
[![BYOK](https://img.shields.io/badge/AI-Bring%20Your%20Own%20Key-4da3ff)](#providers)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

---

## What it does

Most "AI project generators" hand you an empty folder tree. blueprint hands you a project you can `run`.

Give it a prompt. It asks an AI for a **manifest** — every file with real starter code, plus the commands to bring the project to life — then walks a **Plan → Preview → Apply** flow:

1. **Plan** — the AI returns files + setup commands as a validated manifest.
2. **Preview** — see the whole plan before anything touches disk: a file tree marking `+` new vs `~` overwrite, and every command that will run.
3. **Apply** — confirm, and blueprint writes the files, installs dependencies, and runs setup in the target directory.

Re-run it inside an existing project (`add auth`, `add Docker`, `add CI`) and it patches in place instead of clobbering.

```bash
bp gen "a Next.js 15 app with TypeScript and Tailwind"
```

---

## Quick start

```bash
# 1. install (from source — not yet on crates.io)
git clone https://github.com/jiffyaneesh/ai-structure-gen
cd ai-structure-gen/cli && cargo install --path .   # provides the `bp` binary

# 2. set your key (Claude is the default provider)
export ANTHROPIC_API_KEY=sk-...

# 3. build something
bp gen "a Rust CLI with clap and tests"
```

### Common flags

```bash
bp gen "<prompt>" [OPTIONS]

  -d, --dir <DIR>            Target directory (created if missing) [default: .]
  -p, --provider <NAME>      claude (default) | openai | groq | gemini
      --dry-run              Show the plan and exit, write nothing
  -y, --yes                  Apply without the confirmation prompt
      --no-commands          Write files only, skip running commands
```

---

## Providers

Bring your own key — blueprint calls the provider directly, no proxy in the middle, no per-call bill from us.

| Provider | Flag             | Env var             |
| -------- | ---------------- | ------------------- |
| Claude   | `-p claude` (default) | `ANTHROPIC_API_KEY` |
| OpenAI   | `-p openai`      | `OPENAI_API_KEY`    |
| Groq     | `-p groq`        | `GROQ_API_KEY`      |
| Gemini   | `-p gemini`      | `GEMINI_API_KEY`    |

---

## Safety

AI output is treated as untrusted input:

- **Path validation** — any file path that is absolute or escapes the target dir (`..`) is rejected before writing.
- **Explicit consent** — overwriting existing files and running shell commands each require your `y` (skip with `--yes`).
- **Dry run** — `--dry-run` shows the full plan without touching disk.

---

## Repository layout

```
.
├── cli/          # the Rust CLI (`bp`)
│   └── src/
│       ├── main.rs        # clap entrypoint, plan→preview→apply flow
│       ├── manifest.rs    # AI↔apply contract + path validation
│       ├── provider/      # claude | openai | groq | gemini (BYOK)
│       ├── context.rs     # existing-project snapshot for idempotent re-runs
│       ├── preview.rs     # human-reviewable plan rendering
│       └── apply.rs       # write files + run commands
└── web/          # landing page (Vite + React + Tailwind)
```

Build the CLI locally:

```bash
cd cli && cargo build --release   # binary at target/release/bp
```

---

## Connect

- 🐦 [Twitter](https://x.com/aneeshdev03)
- 💼 [LinkedIn](https://linkedin.com/in/helloaneesh)
- 🌐 [Website](https://aneesh-dev.vercel.app)

MIT · built by Aneesh
