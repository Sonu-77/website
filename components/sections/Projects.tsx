'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ChevronDown, ExternalLink, FileText, Github, Lightbulb, Target, TrendingUp,
} from 'lucide-react';
import { projects, type Project } from '@/lib/data';
import { gsap } from '@/lib/site';
import { Magnetic, SectionHeading, TiltCard } from '@/components/ui/primitives';

/* ------------------------------------------------------------------ */
/* Mock browser preview window                                         */
/* ------------------------------------------------------------------ */
function BrowserPreview({ project }: { project: Project }) {
  const displayUrl = project.liveUrl
    ? project.liveUrl
        .replace(/^https?:\/\//, '')
        .replace(/\/$/, '')
    : `${project.id}.app`;

  return (
    <TiltCard max={5} className="w-full">
      <div className="card overflow-hidden !rounded-xl" data-cursor="view">
        {/* Browser top bar */}
        <div className="flex items-center gap-2 border-b border-line/10 bg-surface/80 px-3 py-2.5 sm:px-4">
          {/* Browser controls */}
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>

          {/* Deployed website URL */}
          <span
            title={project.liveUrl ?? displayUrl}
            className="ml-1 min-w-0 flex-1 truncate rounded-md border border-line/10 bg-base/60 px-3 py-1.5 font-mono text-[10px] text-ink-2 sm:ml-3"
          >
            {displayUrl}
          </span>

          {/* Open deployed project */}
         {project.liveUrl && (
  <button
    type="button"
    aria-label={`Open ${project.title} website in a new tab`}
    onClick={(event) => {
      event.stopPropagation();

      const projectWindow = window.open(
        project.liveUrl,
        '_blank',
        'noopener,noreferrer',
      );

      if (projectWindow) {
        projectWindow.opener = null;
      }
    }}
    className="group relative z-20 flex h-8 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-cyan/30 bg-cyan/10 px-2.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-cyan transition-all duration-200 hover:border-cyan/60 hover:bg-cyan/20 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:px-3"
  >
    <span className="pointer-events-none">Enter</span>

    <ExternalLink
      size={12}
      aria-hidden="true"
      className="pointer-events-none transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    />
  </button>
)}
        </div>

        {/* Browser website preview */}
        <div
          className={`relative aspect-[16/10] bg-gradient-to-br ${project.accent} bg-surface`}
        >
          <div className="absolute inset-0 p-5">
            <div className="flex h-full gap-3">
              <div className="hidden w-1/5 flex-col gap-2 sm:flex">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-2.5 rounded bg-ink/10"
                    style={{ width: `${85 - i * 9}%` }}
                  />
                ))}
              </div>

              <div className="flex flex-1 flex-col gap-3">
                <div className="h-8 rounded-lg bg-ink/10" />

                <div className="grid flex-1 grid-cols-3 gap-3">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-ink/10 bg-ink/5 p-2"
                    >
                      <div className="h-2 w-2/3 rounded bg-ink/15" />
                      <div className="mt-2 h-6 w-1/2 rounded bg-cyan/25" />
                    </div>
                  ))}
                </div>

                <div className="h-1/3 rounded-lg border border-ink/10 bg-ink/5" />
              </div>
            </div>
          </div>

          <span className="absolute bottom-3 right-4 font-mono text-[10px] uppercase tracking-widest text-ink-2/70">
            production preview
          </span>
        </div>
      </div>
    </TiltCard>
  );
}

/* ------------------------------------------------------------------ */
/* Expandable case-study details: challenge / solution / result        */
/* ------------------------------------------------------------------ */
function CaseNotes({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const rows = [
    { icon: Target, label: 'Challenge', text: project.challenge },
    { icon: Lightbulb, label: 'Solution', text: project.solution },
    { icon: TrendingUp, label: 'Result', text: project.result },
  ];
  return (
    <div className="mt-5">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-cyan transition-colors hover:text-ink"
      >
        Challenge · Solution · Result
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-3 border-l border-line/15 pl-4">
              {rows.map(({ icon: Icon, label, text }) => (
                <div key={label}>
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-ink">
                    <Icon size={12} className="text-violet" /> {label}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-2">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Single cinematic project block                                      */
/* ------------------------------------------------------------------ */
function ProjectBlock({ project, flip }: { project: Project; flip: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Preview window slides in with 3D perspective; horizontal-only movement
  // inside the block while the page keeps scrolling vertically.
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        previewRef.current,
        { xPercent: flip ? -16 : 16, rotateY: flip ? 10 : -10, opacity: 0.4 },
        {
          xPercent: 0,
          rotateY: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            end: 'top 30%',
            scrub: 0.6,
          },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [flip, reduced]);

  const buttons = [
    { label: 'Live Demo', href: project.liveUrl, icon: ExternalLink, primary: true },
    { label: 'Source Code', href: project.sourceUrl, icon: Github, primary: false },
    { label: 'Case Study', href: project.caseStudyUrl, icon: FileText, primary: false },
  ].filter((b) => !!b.href); // hidden automatically when the URL is unavailable

  return (
    <div
      ref={ref}
      className={`grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 ${
        flip ? 'lg:[&>*:first-child]:order-2' : ''
      }`}
      style={{ perspective: 1200 }}
    >
      {/* Preview */}
      <div ref={previewRef} style={{ transformStyle: 'preserve-3d' }}>
        <BrowserPreview project={project} />
      </div>

      {/* Copy */}
      <div>
        <p className="eyebrow mb-2">
          {project.index} — {project.subtitle}
        </p>
        <h3 className="font-display text-2xl font-bold leading-tight sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-ink-2">{project.description}</p>

        {/* Contributions */}
        <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
          {project.contributions.slice(0, 8).map((c, i) => (
            <motion.li
              key={c}
              className="flex items-start gap-2 text-xs text-ink-2"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan" />
              {c}
            </motion.li>
          ))}
        </ul>

        {/* Tech tags, staggered */}
        <ul className="mt-5 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
          {project.technologies.map((tech, i) => (
            <motion.li
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
              className="min-w-0 rounded-md border border-line/15 bg-surface/70 px-2.5 py-1 text-center font-mono text-[11px] text-cyan sm:text-left"
            >
              {tech}
            </motion.li>
          ))}
        </ul>

        <CaseNotes project={project} />

        {/* {buttons.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {buttons.map(({ label, href, icon: Icon, primary }) => (
              <Magnetic key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={primary ? 'btn-primary' : 'btn-ghost'}
                >
                  <Icon size={15} /> {label}
                </a>
              </Magnetic>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function Projects() {
  return (
    <section id="projects" className="relative overflow-x-hidden py-28">
      <div
        data-shared-anchor="projects"
        aria-hidden
        className="pointer-events-none absolute right-72 top-32 hidden h-1 w-1 lg:block"
      />

      <div className="mx-auto max-w-wrap px-5">
        <SectionHeading eyebrow="Projects" title="Selected Projects" />

        <div className="relative divide-y divide-line/10">
          {projects.map((project, i) => (
            <ProjectBlock
              key={project.id}
              project={project}
              flip={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
