import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Check,
  Copy,
  EyeOff,
  Github,
  Gitlab,
  GraduationCap,
  KeyRound,
  LayoutGrid,
  Linkedin,
  Mail,
  Newspaper,
  QrCode,
  Sparkles,
  Terminal,
} from 'lucide-react';
import ProjectCard from './components/ProjectCard.jsx';

const EMAIL = 'costinmatei.cernea@gmail.com';

const PROJECTS = [
  {
    title: 'Universal RAG Framework',
    description:
      'A production-ready Retrieval-Augmented Generation Discord bot framework. Feed it any knowledge base for grounded, hallucination-free answers — built to learn how retrieval and LLMs fit together end-to-end.',
    tags: ['Python', 'LLMs', 'Vector DB'],
    github: 'https://github.com/costin-cernea/universal-rag-framework',
    href: 'https://github.com/costin-cernea/universal-rag-framework',
    featured: true,
    icon: Brain,
    meta: 'Flagship · AI',
  },
  {
    title: 'DevOps Portfolio',
    description:
      'A collection of projects built to master modern infrastructure and deployment pipelines. Features hands-on implementations of GitLab CI/CD, Docker containerization, and Kubernetes orchestration.',
    tags: ['GitLab CI/CD', 'Docker', 'Kubernetes'],
    github: 'https://github.com/costin-cernea/devops-portfolio',
    href: 'https://github.com/costin-cernea/devops-portfolio',
    icon: Terminal,
    meta: 'Infrastructure',
  },
  {
    title: 'news-ai-bot',
    description:
      'An RSS feed monitor that summarizes articles with Gemini and publishes them to Discord and Telegram, grouped and deduplicated by category.',
    tags: ['Python', 'Gemini API'],
    github: 'https://github.com/costin-cernea/news-ai-bot',
    icon: Newspaper,
    meta: 'AI · Automation',
  },
  {
    title: 'youtube-stealth-mode',
    description:
      'A browser extension to reclaim YouTube focus — blocks tracking and hides toxic content from history so the feed stops pulling attention.',
    tags: ['JavaScript'],
    github: 'https://github.com/costin-cernea/youtube-stealth-mode-extension',
    icon: EyeOff,
    meta: 'Browser extension',
  },
  {
    title: 'Password Generator',
    description:
      'A secure, fully client-side strong password generator. Part of the QuickTools suite I build to practice scripting fundamentals.',
    tags: ['JavaScript', 'CSS'],
    github: 'https://github.com/costin-cernea/password-generator',
    icon: KeyRound,
    meta: 'QuickTools',
  },
  {
    title: 'QR Code Generator',
    description:
      'A fast, privacy-focused QR code generator with download support. Another piece of the QuickTools suite.',
    tags: ['JavaScript', 'CSS'],
    github: 'https://github.com/costin-cernea/qr-code-generator',
    icon: QrCode,
    meta: 'QuickTools',
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
              href="https://github.com/costin-cernea"
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted ring-1 ring-white/10 transition hover:bg-white/5 hover:text-ink"
              aria-label="GitHub"
            >
              <Github className="h-3.5 w-3.5" strokeWidth={1.75} />
            </a>
            <a
              href="https://gitlab.com/costin-cernea"
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted ring-1 ring-white/10 transition hover:bg-white/5 hover:text-ink"
              aria-label="GitLab"
            >
              <Gitlab className="h-3.5 w-3.5" strokeWidth={1.75} />
            </a>
            <a
              href="https://www.linkedin.com/in/costin-cernea"
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
              <GraduationCap className="h-3.5 w-3.5 text-ink-muted" strokeWidth={1.75} />
              <span className="font-mono tracking-tight">Student · DevOps & Infrastructure Enthusiast</span>
            </motion.div>

            <motion.h1
              variants={item}
              className="max-w-4xl text-display-sm md:text-display lg:text-display-lg"
            >
              Learning by <span className="text-ink-muted">building</span> — exploring infrastructure, automation, and DevOps.
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-base text-ink-muted md:text-lg"
            >
              I'm a student fascinated by how software is deployed and maintained. I'm currently focused on learning DevOps fundamentals by building hands-on projects and automating my own workflows.
            </motion.p>

            <motion.div variants={item} className="mt-8">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
                Tech Stack & Core Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {['Linux', 'Docker', 'Kubernetes', 'GitLab CI/CD', 'Bash Scripting', 'Python', 'Cloud / VPS', 'Networking', 'Security'].map(skill => (
                  <span key={skill} className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 font-mono text-xs text-ink-muted transition-all duration-300 hover:bg-accent-glow/10 hover:text-ink hover:border-accent-glow/30 hover:shadow-[0_0_16px_rgba(139,92,246,0.15)] cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

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
            href="https://github.com/costin-cernea"
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
              Curious about infrastructure, automation, and how things work under the hood.
            </h2>
          </div>
          <div className="space-y-4 text-base text-ink-muted md:col-span-3 md:text-lg">
            <p>
              Most of what I know comes from curiosity and getting my hands dirty. My main focus right now is building a strong foundation in DevOps — experimenting with Linux environments, containerizing applications with Docker, and setting up my first CI/CD pipelines.
            </p>
            <p>
              Alongside my infrastructure practice, I built the <span className="text-ink">Universal RAG Framework</span> to understand how AI and retrieval work end-to-end. My goal is to bridge these interests: writing useful code and learning how to deploy it reliably.
            </p>
            <p>
              Always happy to chat about DevOps, CI/CD, infrastructure, or any challenging engineering project.
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
            Let's build reliable systems together.
          </h2>
          <p className="mt-4 max-w-xl text-ink-muted">
            I'm open to internships, junior roles, and collaborations — especially around DevOps, Cloud infrastructure, or AI. Always eager to dive into complex systems and learn together.
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
