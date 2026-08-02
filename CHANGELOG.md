# Changelog

All notable changes to this project are documented here.
Format loosely follows [Keep a Changelog](https://keepachangelog.com).

## [Unreleased]

### Changed
- **Rebrand + rewrite.** Project reborn as **blueprint** (`bp`): an AI scaffolder
  that turns one prompt into a runnable project via a **plan → preview → apply** flow,
  not just an empty folder tree.
- Repo restructured into a monorepo: Rust CLI in `cli/`, landing page in `web/`.

### Added
- Rust CLI (`bp gen`) with:
  - Multi-provider BYOK support — Claude (default), OpenAI, Groq, Gemini — keys from env.
  - Manifest schema (files + commands) as the AI↔apply contract, with path-escape validation.
  - Dry-run preview showing new/overwrite file markers and commands before touching disk.
  - Apply engine that writes files and runs setup commands in the target dir.
  - Existing-project snapshot so re-runs patch idempotently instead of clobbering.
  - Confirmation prompts for overwrites and command execution.

### Removed
- Legacy Python CLI (source lost) and its prebuilt `ai-gen` executables.
- Hosted-backend Gemini proxy model (replaced by BYOK; backend can slot in later as a provider).
