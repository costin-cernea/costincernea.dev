import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ProjectCard({
  title,
  description,
  tags = [],
  href,
  github,
  featured = false,
  icon: Icon,
  meta,
}) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.article
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={[
        'group relative overflow-hidden rounded-2xl',
        'bg-surface-raised/60 backdrop-blur-sm',
        'border border-white/[0.06] hover:border-white/[0.12]',
        'shadow-card hover:shadow-card-hover',
        'transition-colors duration-300',
        featured ? 'md:col-span-2 md:row-span-1' : '',
      ].join(' ')}
    >
      {/* Cursor-follow spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-card-glow opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Featured gradient wash */}
      {featured && (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent-glow/20 blur-3xl"
        />
      )}

      <div className="relative flex h-full flex-col p-6 md:p-7">
        {/* Header: icon + external link */}
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
                <Icon className="h-4 w-4 text-ink" strokeWidth={1.75} />
              </div>
            )}
            {meta && (
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-subtle">
                {meta}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${title} on GitHub`}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted ring-1 ring-white/10 transition hover:bg-white/5 hover:text-ink"
              >
                <Github className="h-3.5 w-3.5" strokeWidth={1.75} />
              </a>
            )}
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${title}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted ring-1 ring-white/10 transition hover:bg-white/5 hover:text-ink"
              >
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
              </a>
            )}
          </div>
        </div>

        {/* Title + description */}
        <h3 className={[
          'font-semibold tracking-tight text-ink',
          featured ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl',
        ].join(' ')}>
          {title}
        </h3>

        <p className={[
          'mt-2 text-ink-muted',
          featured ? 'text-base md:max-w-xl' : 'text-sm',
        ].join(' ')}>
          {description}
        </p>

        {/* Tech badges */}
        {tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
