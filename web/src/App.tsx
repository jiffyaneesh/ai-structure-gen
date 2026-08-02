import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

/*
  The page is a permit application, not a brochure. blueprint's actual
  subject is consent before mutation — the [y/N] pause where a plan
  becomes a change on your disk — so the reader fills out the same form
  the CLI walks them through, and signs it in section C.
*/

const GITHUB = 'https://github.com/jiffyaneesh/ai-structure-gen'

/* ---------- form primitives ---------- */

/** A boxed field with its caption printed above the rule, as on a real form. */
function Field({
  label,
  children,
  className = '',
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <p className="field-label mb-1">{label}</p>
      <div className="field px-4 py-3">{children}</div>
    </div>
  )
}

/** Section rule: a letter in a box, the caption, then a hairline to the margin. */
function SectionRule({ letter, title }: { letter: string; title: string }) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-carbon bg-carbon text-xs font-black text-stock">
        {letter}
      </span>
      <h2 className="text-sm font-black uppercase tracking-[0.18em]">{title}</h2>
      <span className="h-px flex-1 bg-carbon/35" />
    </div>
  )
}

const reveal = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.4, ease: 'easeOut' },
} as const

/* ---------- masthead ---------- */

function Masthead() {
  return (
    <header className="border-b-2 border-carbon">
      <div className="mx-auto max-w-5xl px-6 pt-10 pb-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-carbon/30 pb-3">
          <p className="typed text-[11px] uppercase tracking-widest text-ink">
            Form BP-1 · Application to modify a working directory
          </p>
          <a
            href={GITHUB}
            className="typed text-[11px] uppercase tracking-widest text-ink underline decoration-dotted underline-offset-4 hover:text-stamp"
          >
            Source ↗
          </a>
        </div>

        <h1 className="mt-6 text-[15vw] leading-[0.82] font-black uppercase tracking-tighter sm:text-[8.5rem]">
          blueprint
        </h1>

        <div className="mt-6 grid gap-x-8 gap-y-4 border-t border-carbon/30 pt-5 sm:grid-cols-[1.6fr_1fr]">
          <p className="max-w-lg text-lg leading-snug">
            One sentence in. A project you can actually run out — real code,
            dependencies installed, config that agrees with itself.
          </p>
          <dl className="typed space-y-1 text-xs">
            <div className="flex justify-between border-b border-carbon/20 pb-1">
              <dt className="text-ink">Issued in</dt>
              <dd>Rust · one static binary</dd>
            </div>
            <div className="flex justify-between border-b border-carbon/20 pb-1">
              <dt className="text-ink">Weight</dt>
              <dd>2.8 MB</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink">Writes without asking</dt>
              <dd className="font-bold text-stamp">Never</dd>
            </div>
          </dl>
        </div>
      </div>
    </header>
  )
}

/* ---------- §A: what you're asking for ---------- */

function SectionA() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <SectionRule letter="A" title="Description of proposed works" />
      <motion.div {...reveal} className="grid gap-5 sm:grid-cols-[2fr_1fr]">
        <Field label="Applicant's request — in plain language">
          <p className="typed text-base leading-relaxed sm:text-lg">
            <span className="text-ink-soft">$ </span>bp gen{' '}
            <span className="bg-ink/10 px-1">
              "a Next.js 15 app with TypeScript and Tailwind"
            </span>
            <span className="ml-0.5 inline-block w-2 animate-pulse bg-carbon align-text-bottom">
              &nbsp;
            </span>
          </p>
        </Field>
        <Field label="Site">
          <p className="typed text-base">./my-app</p>
          <p className="typed mt-1 text-xs text-ink-soft">
            existing directory · will be surveyed first
          </p>
        </Field>
      </motion.div>
      <motion.p {...reveal} className="typed mt-4 text-xs leading-relaxed text-ink">
        Filed with an existing project, blueprint reads what is already standing
        before it drafts. "Add Docker" extends the site; it does not level it.
      </motion.p>
    </section>
  )
}

/* ---------- §B: the schedule — the manifest as a bill of works ---------- */

const WORKS = [
  { qty: '1', item: 'package.json', note: 'deps pinned', state: 'new' },
  { qty: '1', item: 'app/layout.tsx', note: 'root shell', state: 'new' },
  { qty: '1', item: 'app/page.tsx', note: 'entry view', state: 'new' },
  { qty: '1', item: 'app/globals.css', note: 'tailwind directives', state: 'new' },
  { qty: '1', item: 'tsconfig.json', note: 'strict', state: 'amend' },
  { qty: '1', item: 'next.config.mjs', note: '—', state: 'new' },
] as const

const ORDERS = [
  { run: 'npm install', why: 'fetch declared dependencies' },
  { run: 'git init', why: 'place under version control' },
] as const

function SectionB() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <SectionRule letter="B" title="Schedule of works — for review before signature" />

      <motion.div {...reveal} className="field">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-ink/40 bg-ink/5">
              <th className="field-label px-4 py-2 w-12">Qty</th>
              <th className="field-label px-4 py-2">Item to be placed on site</th>
              <th className="field-label hidden px-4 py-2 sm:table-cell">Particulars</th>
              <th className="field-label px-4 py-2 text-right">Disposition</th>
            </tr>
          </thead>
          <tbody className="typed text-sm">
            {WORKS.map((w) => (
              <tr key={w.item} className="border-b border-ink/15 last:border-0">
                <td className="px-4 py-2 text-ink-soft">{w.qty}</td>
                <td className="px-4 py-2">{w.item}</td>
                <td className="hidden px-4 py-2 text-ink-soft sm:table-cell">{w.note}</td>
                <td className="px-4 py-2 text-right">
                  {w.state === 'new' ? (
                    <span className="text-ink">new</span>
                  ) : (
                    <span className="font-bold text-stamp">overwrites</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <motion.div {...reveal} className="mt-5 grid gap-5 sm:grid-cols-[1.4fr_1fr]">
        <Field label="Orders to be executed on your machine">
          <ul className="typed space-y-1.5 text-sm">
            {ORDERS.map((o) => (
              <li key={o.run} className="flex flex-wrap gap-x-3">
                <span className="text-ink-soft">$</span>
                <span>{o.run}</span>
                <span className="text-ink-soft">— {o.why}</span>
              </li>
            ))}
          </ul>
        </Field>
        <Field label="Nothing has been written yet">
          <p className="typed text-sm leading-relaxed">
            This schedule is the whole of it. Run{' '}
            <span className="bg-ink/10 px-1">--dry-run</span> and it is all you
            ever get.
          </p>
        </Field>
      </motion.div>
    </section>
  )
}

/* ---------- §C: the signature. the page's one bold moment ---------- */

function SectionC() {
  const [signed, setSigned] = useState(false)
  const reduced = useReducedMotion()

  return (
    <section className="border-y-2 border-carbon bg-stock-2/60">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <SectionRule letter="C" title="Authorization — required before any write" />

        <div className="grid gap-8 md:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="max-w-md text-2xl leading-tight font-semibold">
              A tool that writes files and runs shell commands should have to ask
              first. This one does, every time.
            </p>
            <p className="typed mt-4 max-w-md text-sm leading-relaxed text-ink">
              Paths that reach outside your target directory are refused before
              they reach disk. Overwrites and commands are counted out loud. The
              default answer is no.
            </p>

            <button
              type="button"
              onClick={() => setSigned((s) => !s)}
              aria-pressed={signed}
              className="typed mt-7 flex items-start gap-3 text-left"
            >
              <span
                aria-hidden
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border-2 border-carbon bg-stock text-lg leading-none"
              >
                {signed ? '✕' : ''}
              </span>
              <span className="text-sm leading-snug">
                I have read the schedule above and authorize these works.
                <span className="mt-0.5 block text-xs text-ink-soft">
                  {signed ? 'Authorized — see stamp.' : 'Tick to sign.'}
                </span>
              </span>
            </button>
          </div>

          <div className="relative flex min-h-[210px] items-center justify-center">
            <div className="field h-full w-full" />
            <p className="field-label absolute top-3 left-4">Official use only</p>

            {signed ? (
              <motion.div
                key="stamp"
                className={`stamp absolute px-6 py-3 text-center ${reduced ? '' : 'stamp-hit'}`}
                style={{ transform: 'rotate(-14deg)' }}
              >
                <span className="block text-2xl leading-none sm:text-3xl">Approved</span>
                <span className="typed mt-1 block text-[10px] tracking-normal">
                  writes permitted · this run only
                </span>
              </motion.div>
            ) : (
              <p className="typed absolute px-8 text-center text-sm text-ink-soft">
                Unsigned. No files written, no commands run.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- §D: how to file one yourself ---------- */

const KEYS = [
  ['claude', 'ANTHROPIC_API_KEY', 'default'],
  ['openai', 'OPENAI_API_KEY', ''],
  ['groq', 'GROQ_API_KEY', ''],
  ['gemini', 'GEMINI_API_KEY', ''],
] as const

function SectionD() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <SectionRule letter="D" title="How to file your own" />

      <div className="grid gap-5 md:grid-cols-[1.3fr_1fr]">
        <motion.div {...reveal}>
          <Field label="Obtain the binary">
            <pre className="typed overflow-x-auto text-sm leading-relaxed">
              <span className="text-ink-soft">$ </span>git clone{' '}
              {GITHUB.replace('https://', '')}
              {'\n'}
              <span className="text-ink-soft">$ </span>cd ai-structure-gen/cli && cargo
              install --path .
            </pre>
          </Field>
          <p className="typed mt-2 text-xs text-ink-soft">
            Not yet on crates.io. Built from source until it is.
          </p>

          <Field label="File an application" className="mt-5">
            <pre className="typed overflow-x-auto text-sm leading-relaxed">
              <span className="text-ink-soft">$ </span>export GROQ_API_KEY=...
              {'\n'}
              <span className="text-ink-soft">$ </span>bp gen{' '}
              <span className="bg-ink/10 px-1">"a Rust CLI with clap and tests"</span>
            </pre>
          </Field>
        </motion.div>

        <motion.div {...reveal}>
          <Field label="Accepted authorities — your key, your account">
            <table className="typed w-full text-left text-xs">
              <tbody>
                {KEYS.map(([flag, env, tag]) => (
                  <tr key={flag} className="border-b border-ink/15 last:border-0">
                    <td className="py-1.5 pr-3">-p {flag}</td>
                    <td className="py-1.5 text-ink-soft">{env}</td>
                    <td className="py-1.5 text-right">
                      {tag && <span className="text-stamp">{tag}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Field>
          <p className="typed mt-2 text-xs leading-relaxed text-ink-soft">
            No proxy in the middle. Requests go from your machine to the provider
            you named, and nowhere else.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- footer: the tear-off stub ---------- */

function Stub() {
  return (
    <footer className="border-t-2 border-dashed border-carbon/50">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-7">
        <p className="typed text-[11px] uppercase tracking-widest text-ink">
          Retain this portion · MIT · built by Aneesh
        </p>
        <nav className="typed flex gap-5 text-[11px] uppercase tracking-widest">
          <a href={GITHUB} className="underline decoration-dotted underline-offset-4 hover:text-stamp">
            GitHub
          </a>
          <a
            href="https://x.com/aneeshdev03"
            className="underline decoration-dotted underline-offset-4 hover:text-stamp"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com/in/helloaneesh"
            className="underline decoration-dotted underline-offset-4 hover:text-stamp"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="stock min-h-screen">
      <Masthead />
      <SectionA />
      <SectionB />
      <SectionC />
      <SectionD />
      <Stub />
    </div>
  )
}
