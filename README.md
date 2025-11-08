# ⚙️ AI Project Structure Generator

> 🚀 Instantly generate full, production-ready project folder structures using natural language prompts — powered by **Google Gemini AI**.

[![Built with Python](https://img.shields.io/badge/Built%20With-Python-blue?logo=python)](https://www.python.org/)
[![AI Powered](https://img.shields.io/badge/Powered%20By-Gemini%20AI-orange?logo=google)](https://ai.google.dev)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

---

## 🌍 Live Website

🔗 **Visit the landing page:** [https://ai-structure-gen.vercel.app](https://your-site.vercel.app)

Download the CLI executable, explore usage examples, and read documentation.

---

## 💡 What It Does

Tired of creating boilerplate folder structures manually?  
This tool uses AI to generate entire project layouts (folders, files, and starter code) from a single natural language command.

Example:

```bash
ai-gen ai-generate "A Laravel project for an e-commerce app"
```

🧠 The AI will create a structured folder layout like:

```
ecommerce-app/
 ├── src/
 │   ├── controllers/
 │   ├── models/
 │   └── views/
 ├── .env.example
 ├── requirements.txt
 └── README.md
```

---

## ⚡ Quick Start

### 🪄 1. Install the CLI

Download the standalone executable from the [Releases](https://github.com/yourusername/yourrepo/releases) page
or directly from the website.

Once downloaded, add it to your system PATH to use globally.

### 🚀 2. Generate a Project Structure

```bash
ai-generate "A Next.js app with TypeScript and Tailwind CSS"
```

Your AI-generated project folder will appear in the current directory within seconds.

---

## 🧩 Features

✅ AI-powered folder and file generation
✅ Works offline (after build)
✅ Instant, clean, and minimal output
✅ Safe JSON validation and sanitization
✅ Built-in security to prevent prompt injection
✅ Cross-platform executable (Windows / macOS / Linux)

---

## 🔒 Security

This project includes:

- Strict AI output validation
- Filename and content sanitization
- No sensitive data or code execution allowed
- Server-side Gemini key protection

---

## 🧠 How It Works

1. The CLI sends your natural language prompt to the backend.
2. The backend uses **Gemini AI** to generate a valid JSON structure.
3. The CLI parses the JSON and builds the directory tree locally.

> Every response is sanitized and validated before being written to disk.

---

## 💬 Connect & Support

If you enjoy this tool, please consider giving it a ⭐ on GitHub!
It helps more developers discover it.

- 🐦 [Twitter](https://x.com/aneeshdev03?t=Ka6U0JeLJ7Wfi70Sy3Vf2w&s=09)
- 💼 [LinkedIn](https://linkedin.com/in/helloaneesh)
- 🌐 [Website](https://aneesh-dev.vercel.app)

