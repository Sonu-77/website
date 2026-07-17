'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Briefcase, CheckCircle2 } from 'lucide-react';
import { experience } from '@/lib/data';
import { gsap } from '@/lib/site';
import { SectionHeading } from '@/components/ui/primitives';

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Glowing timeline line draws itself with scroll progress
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            end: 'bottom 60%',
            scrub: 0.6,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="experience" ref={sectionRef} className="relative py-28">
      <div className="mx-auto max-w-wrap px-5">
        <SectionHeading eyebrow="Experience" title="My Development Journey" />

        <div className="relative grid gap-10 lg:grid-cols-[auto_1fr]">
          {/* Timeline rail */}
          <div className="relative hidden w-10 justify-center sm:flex">
            <div className="h-full w-px bg-line/15" />
            <div
              ref={lineRef}
              className="absolute top-0 h-full w-px bg-gradient-to-b from-primary via-cyan to-violet"
              style={{ boxShadow: '0 0 12px rgba(34,211,238,0.6)' }}
            />
            <motion.span
              className="absolute top-2 grid h-10 w-10 place-items-center rounded-full border border-cyan/40 bg-base"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            >
              <Briefcase size={15} className="text-cyan" />
            </motion.span>
          </div>

          {/* Experience card with active-item spotlight */}
          <motion.article
            className="gradient-border card relative overflow-hidden p-6 sm:p-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* subtle spotlight behind the active card */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cyan/10 blur-3xl"
            />

            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h3 className="font-display text-xl font-bold sm:text-2xl">
                  {experience.role}
                </h3>
                <p className="mt-1 text-sm font-medium text-cyan">{experience.company}</p>
              </div>
              <span className="font-mono text-xs text-ink-2">{experience.period}</span>
            </div>

            <ul className="mt-6 space-y-3">
              {experience.points.map((point, i) => (
                <motion.li
                  key={point}
                  className="flex items-start gap-3 text-sm leading-relaxed text-ink-2"
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                >
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-cyan" />
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>

            <div data-shared-anchor="experience" className="pointer-events-none absolute right-6 top-6 hidden h-1 w-1 lg:block" aria-hidden />
          </motion.article>
        </div>
      </div>
    </section>
  );
}
