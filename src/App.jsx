import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Boxes,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  Network,
  Sparkles,
  Terminal,
  Workflow,
} from 'lucide-react';
import ProjectCard from './components/ProjectCard.jsx';

const EMAIL = 'costinmatei.cernea@gmail.com';

const PROJECTS = [
  {
    title: 'Universal RAG Framework',
    description:
      'A modular system for LLM context optimization — pluggable retrievers, rerankers, and chunking strategies behind a single contract. Benchmarked across multiple vector stores and embedding models.',
    tags: ['Python', 'Gemini', 'FAISS', 'LangChain', 'Pydantic'],
    github: 'https://github.com/costin5',
    href: 'https://github.com/costin5',
    featured: true,
    icon: Brain,
    meta: 'Flagship · 2025',
  },
  {
    title: 'Agentic Workflow Engine',
    description: 'Graph-based orchestration for multi-step agents with deterministic replay.',
    tags: ['TypeScript', 'LangGraph', 'Redis'],
    github: 'https://github.com/costin5',
    icon: Workflow,
    meta: 'OSS',
  },
  {
    title: 'Semantic Cache Layer',
    description: 'Embedding-based cache that cuts LLM spend by routing near-duplicate prompts.',
    tags: ['Go', 'pgvector', 'OpenTelemetry'],
    github: 'https://github.com/costin5',
    icon: Network,
    meta: 'Infra',
  },
  {
    title: 'Eval Harness',
    description: 'Declarative evaluation suite for prompts with regression gates in CI.',
    tags: ['Python', 'Pytest', 'GitHub Actions'],
    github: 'https://github.com/costin5',
    icon: Terminal,
    meta: 'Tooling',
  },
  {
    title: 'Context Compiler',
    description: 'Static analysis for prompt templates — type-checks variables before they ship.',
    tags: ['Rust', 'Tree-sitter'],
    github: 'https://github.com/costin5',
    icon: Boxes,
    meta: 'Experiment',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function HeroBackground({ heroRef }) {
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, [heroRef]);

  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-radial-glow transition-opacity duration-300"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
    </>
  );
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <>
      <motion.button
        onClick={handleCopy}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-ink backdrop-blur-sm transition hover:bg-white/[0.06] hover:border-white/20"
      >
        <Mail className="h-3.5 w-3.5 text-ink-muted" strokeWidth={1.75} />
        <span className="font-mono text-xs tracking-tight">{EMAIL}</span>
        <span className="ml-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.04] ring-1 ring-white/10 transition group-hover:bg-white/[0.08]">
          {copied ? (
            <Check className="h-3 w-3 text-emerald-400" strokeWidth={2.5} />
          ) : (
            <Copy className="h-3 w-3 text-ink-muted" strokeWidth={2} />
          )}
        </span>
      </motion.button>

      {/* Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2"
          >
            <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300 shadow-2xl backdrop-blur-xl">
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              <span className="font-medium">Email copied to clipboard</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  const heroRef = useRef(null);

  return (
    <div className="min-h-screen bg-surface font-sans text-ink">
      {/* ——— NAV ——— */}
      <nav className="sticky top-0 z-40 border-b border-white/[0.04] bg-surface/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5 ring-1 ring-white/10">
              <Sparkles className="h-3.5 w-3.5 text-ink" strokeWidth={2} />
            </span>
            <span className="text-sm">Costin Cernea</span>
          </a>
          <div className="hidden items-center gap-7 text-sm text-ink-muted md:flex">
            <a href="#work" className="transition hover:text-ink">Work</a>
            <a href="#about" className="transition hover:text-ink">About</a>
            <a href="#contact" className="transition hover:text-ink">Contact</a>
          </div>
          <div className="flex items-center gap-1">
            <a
              href="https://github.com/costin5"
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted ring-1 ring-white/10 transition hover:bg-white/5 hover:text-ink"
              aria-label="GitHub"
            >
              <Github className="h-3.5 w-3.5" strokeWidth={1.75} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted ring-1 ring-white/10 transition hover:bg-white/5 hover:text-ink"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-3.5 w-3.5" strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </nav>

      {/* ——— HERO ——— */}
      <section ref={heroRef} className="relative overflow-hidden">
        <HeroBackground heroRef={heroRef} />

        <div className="relative mx-auto max-w-6xl px-6 py-28 md:py-40">
          <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="flex flex-col items-start"
          >
            <motion.div variants={item} className="glass mb-8 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-ink-muted">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono tracking-tight">Available for senior IC & tech-lead roles</span>
            </motion.div>

            <motion.h1
              variants={item}
              className="max-w-4xl text-display-sm md:text-display lg:text-display-lg"
            >
              Crafting <span className="text-ink-muted">intelligent systems</span> & scalable architectures.
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-base text-ink-muted md:text-lg"
            >
              I design retrieval pipelines, agent frameworks, and the infrastructure that keeps them honest in production.
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
              <CopyEmailButton />
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-surface transition hover:bg-ink/90"
              >
                View work
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ——— WORK / BENTO ——— */}
      <section id="work" className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
              ¬ Selected Work
            </p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Projects & systems</h2>
          </div>
          <a
            href="https://github.com/costin5"
            target="_blank"
            rel="noreferrer"
            className="hidden text-sm text-ink-muted transition hover:text-ink md:inline-flex"
          >
            All projects on GitHub →
          </a>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid auto-rows-[minmax(220px,1fr)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </motion.div>
      </section>

      {/* ——— ABOUT ——— */}
      <section id="about" className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
              ¬ About
            </p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Senior full-stack engineer with a bias for the model layer.
            </h2>
          </div>
          <div className="space-y-4 text-base text-ink-muted md:col-span-3 md:text-lg">
            <p>
              I work at the seam between application code and large language models — designing the retrieval,
              evaluation, and orchestration primitives that keep intelligent systems predictable under load.
            </p>
            <p>
              Recent focus: the <span className="text-ink">Universal RAG Framework</span>, a modular toolkit
              that decouples context construction from model choice so teams can iterate on either
              independently.
            </p>
          </div>
        </div>
      </section>

      {/* ——— CONTACT ——— */}
      <section id="contact" className="relative mx-auto max-w-6xl px-6 pb-28">
        <div className="glass overflow-hidden rounded-3xl p-10 md:p-14">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
            ¬ Contact
          </p>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
            Have a hard problem in the model layer?
          </h2>
          <p className="mt-4 max-w-xl text-ink-muted">
            I'm open to tech-lead and staff-level IC roles. Async chats welcome.
          </p>
          <div className="mt-8">
            <CopyEmailButton />
          </div>
        </div>
      </section>

      {/* ——— FOOTER ——— */}
      <footer className="border-t border-white/[0.04]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-ink-subtle md:flex-row">
          <span className="font-mono">© {new Date().getFullYear()} Costin Cernea. All rights reserved.</span>
          <span className="font-mono">Built with React · Tailwind · Framer Motion</span>
        </div>
      </footer>
    </div>
  );
}
