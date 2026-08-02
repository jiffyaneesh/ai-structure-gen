import { motion } from 'motion/react'
import {
  Terminal,
  GitBranch,
  ShieldCheck,
  Boxes,
  Eye,
  PlayCircle,
  Github,
  Zap,
  RefreshCw,
} from 'lucide-react'

const GITHUB = 'https://github.com/jiffyaneesh/ai-structure-gen'

/* ---------- small building blocks ---------- */

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-blueprint/30 bg-blueprint/5 px-3 py-1 font-mono text-xs text-blueprint">
      {children}
    </span>
  )
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-12 text-center">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-blueprint-dim">
        {kicker}
      </p>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
    </div>
  )
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5 },
}

/* ---------- terminal demo ---------- */

function TerminalDemo() {
  return (
    <div className="overflow-hidden rounded-xl border border-blueprint/20 bg-ink-2/80 shadow-2xl shadow-blueprint/10 backdrop-blur">
      <div className="flex items-center gap-2 border-b border-blueprint/15 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/70" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
        <span className="h-3 w-3 rounded-full bg-green-400/70" />
        <span className="ml-3 font-mono text-xs text-paper/40">bp — zsh</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
        <span className="text-blueprint">$ </span>
        <span className="text-paper">bp gen </span>
        <span className="text-green-300">"a Next.js 15 app with TypeScript + Tailwind"</span>
        {'\n\n'}
        <span className="text-paper/50">generating via claude...</span>
        {'\n\n'}
        <span className="font-bold text-paper">next-app</span>
        {'\n'}
        <span className="text-paper/60">Next.js 15 App Router, TS strict, Tailwind v4 wired.</span>
        {'\n\n'}
        <span className="font-bold text-paper">Files (7):</span>
        {'\n'}
        <span className="text-green-400">  + </span>package.json{'\n'}
        <span className="text-green-400">  + </span>app/layout.tsx{'\n'}
        <span className="text-green-400">  + </span>app/page.tsx{'\n'}
        <span className="text-green-400">  + </span>app/globals.css{'\n'}
        <span className="text-green-400">  + </span>tailwind.config.ts{'\n'}
        <span className="text-green-400">  + </span>tsconfig.json{'\n'}
        <span className="text-green-400">  + </span>next.config.mjs{'\n\n'}
        <span className="font-bold text-paper">Commands (2):</span>
        {'\n'}
        <span className="text-cyan-400">  $ </span>npm install
        <span className="text-paper/40">  # deps</span>
        {'\n'}
        <span className="text-cyan-400">  $ </span>git init
        <span className="text-paper/40">  # version control</span>
        {'\n\n'}
        <span className="text-yellow-300">⚠ 2 shell command(s) will run on your machine.</span>
        {'\n'}
        <span className="text-paper">Apply this plan? [y/N] </span>
        <span className="animate-pulse text-blueprint">▊</span>
      </pre>
    </div>
  )
}

/* ---------- sections ---------- */

function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-blueprint/10 bg-ink/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 font-mono font-bold">
          <GitBranch className="text-blueprint" size={20} />
          blueprint
        </a>
        <div className="hidden items-center gap-8 text-sm text-paper/70 sm:flex">
          <a href="#how" className="transition hover:text-paper">How it works</a>
          <a href="#features" className="transition hover:text-paper">Features</a>
          <a href="#install" className="transition hover:text-paper">Install</a>
        </div>
        <a
          href={GITHUB}
          className="flex items-center gap-2 rounded-lg border border-blueprint/30 px-3 py-1.5 text-sm transition hover:bg-blueprint/10"
        >
          <Github size={16} /> Star
        </a>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <header className="relative overflow-hidden pt-32 pb-20">
      <div className="grid-paper grid-fade absolute inset-0 -z-10" />
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mx-auto mb-8 flex justify-center">
          <Chip>
            <Zap size={12} /> now written in Rust
          </Chip>
        </motion.div>
        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mx-auto max-w-4xl text-center text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          One prompt to a{' '}
          <span className="bg-gradient-to-r from-blueprint to-cyan-300 bg-clip-text text-transparent">
            runnable project
          </span>
          .
        </motion.h1>
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl text-center text-lg text-paper/60"
        >
          blueprint plans your scaffold, shows you the diff, then applies it —
          writing real starter code, installing deps, and wiring config that
          actually agrees. Not empty folders. A project you can run.
        </motion.p>
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#install"
            className="rounded-lg bg-blueprint px-6 py-3 font-semibold text-ink transition hover:bg-cyan-300"
          >
            Install the CLI
          </a>
          <a
            href={GITHUB}
            className="flex items-center gap-2 rounded-lg border border-blueprint/30 px-6 py-3 font-semibold transition hover:bg-blueprint/10"
          >
            <Github size={18} /> View source
          </a>
        </motion.div>
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-16 max-w-2xl"
        >
          <TerminalDemo />
        </motion.div>
      </div>
    </header>
  )
}

const STEPS = [
  {
    icon: Boxes,
    step: '01',
    title: 'Plan',
    body: 'Describe what you want. blueprint asks the AI for a manifest — every file with real starter code, plus the commands to bring it to life.',
  },
  {
    icon: Eye,
    step: '02',
    title: 'Preview',
    body: 'See the whole plan before anything touches disk: a file tree marking what is new vs overwritten, and every command that will run.',
  },
  {
    icon: PlayCircle,
    step: '03',
    title: 'Apply',
    body: 'Confirm, and blueprint writes the files, installs dependencies, and runs setup. Re-run later to patch an existing project in place.',
  },
]

function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-6 py-24">
      <SectionTitle kicker="the flow" title="Plan → Preview → Apply" />
      <div className="grid gap-6 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.step}
            {...fadeUp}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative rounded-xl border border-blueprint/15 bg-ink-2/40 p-6 transition hover:border-blueprint/40"
          >
            <span className="font-mono text-5xl font-bold text-blueprint/15 transition group-hover:text-blueprint/30">
              {s.step}
            </span>
            <s.icon className="my-4 text-blueprint" size={28} />
            <h3 className="mb-2 text-xl font-semibold">{s.title}</h3>
            <p className="text-sm leading-relaxed text-paper/60">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

const FEATURES = [
  {
    icon: Zap,
    title: 'Rust-fast',
    body: 'A single static binary. No runtime, no node_modules to boot the tool itself. Cold-start to plan in milliseconds.',
  },
  {
    icon: RefreshCw,
    title: 'Idempotent patches',
    body: 'Run it in an existing repo — "add auth", "add Docker", "add CI" — and it extends what is there instead of clobbering it.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe by design',
    body: 'AI output is untrusted. Paths that escape the target are rejected; overwrites and shell commands need your explicit yes.',
  },
  {
    icon: Terminal,
    title: 'Bring your own key',
    body: 'Claude, OpenAI, or Gemini — your key, your account, from an env var. No proxy in the middle, no per-call bill from us.',
  },
]

function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <SectionTitle kicker="why blueprint" title="Built to be trusted with your disk" />
      <div className="grid gap-6 sm:grid-cols-2">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            {...fadeUp}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex gap-4 rounded-xl border border-blueprint/15 bg-ink-2/40 p-6"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blueprint/10 text-blueprint">
              <f.icon size={22} />
            </div>
            <div>
              <h3 className="mb-1 text-lg font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-paper/60">{f.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Install() {
  return (
    <section id="install" className="relative overflow-hidden py-24">
      <div className="grid-paper grid-fade absolute inset-0 -z-10 opacity-60" />
      <div className="mx-auto max-w-3xl px-6">
        <SectionTitle kicker="get started" title="Two commands to your first scaffold" />
        <motion.div {...fadeUp} className="space-y-5">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-blueprint-dim">
              1. install
            </p>
            <pre className="overflow-x-auto rounded-lg border border-blueprint/20 bg-ink-2/80 p-4 font-mono text-sm">
              <span className="text-blueprint">$ </span>git clone {GITHUB.replace('https://', '')}
              {'\n'}
              <span className="text-blueprint">$ </span>cd ai-structure-gen/cli && cargo install --path .
            </pre>
          </div>
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-blueprint-dim">
              2. set your key
            </p>
            <pre className="overflow-x-auto rounded-lg border border-blueprint/20 bg-ink-2/80 p-4 font-mono text-sm">
              <span className="text-blueprint">$ </span>export ANTHROPIC_API_KEY=sk-...
            </pre>
          </div>
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-blueprint-dim">
              3. build something
            </p>
            <pre className="overflow-x-auto rounded-lg border border-blueprint/20 bg-ink-2/80 p-4 font-mono text-sm">
              <span className="text-blueprint">$ </span>bp gen{' '}
              <span className="text-green-300">"a Rust CLI with clap and tests"</span>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-blueprint/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-sm text-paper/50 sm:flex-row sm:justify-between">
        <span className="flex items-center gap-2 font-mono">
          <GitBranch size={16} className="text-blueprint" /> blueprint
        </span>
        <div className="flex gap-6">
          <a href={GITHUB} className="transition hover:text-paper">GitHub</a>
          <a href="https://x.com/aneeshdev03" className="transition hover:text-paper">Twitter</a>
          <a href="https://linkedin.com/in/helloaneesh" className="transition hover:text-paper">LinkedIn</a>
        </div>
        <span>MIT · built by Aneesh</span>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <HowItWorks />
      <Features />
      <Install />
      <Footer />
    </div>
  )
}
