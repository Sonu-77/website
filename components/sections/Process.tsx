'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { processSteps } from '@/lib/data';
import { gsap, ScrollTrigger } from '@/lib/site';
import { SectionHeading } from '@/components/ui/primitives';

/**
 * "From Idea to Production": a vertical glowing pathway with a small light
 * that travels along it as you scroll. The step nearest the light becomes
 * active, expands its detail, and the previous one collapses.
 */
export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setActive(-1); // show all steps expanded when motion is reduced
      return;
    }
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 70%',
            scrub: 0.5,
          },
        });
      }

      // Travelling light + active step from overall progress
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'bottom 70%',
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          if (lightRef.current) {
            gsap.set(lightRef.current, { top: `${p * 100}%` });
          }
          setActive(Math.min(
            processSteps.length - 1,
            Math.floor(p * processSteps.length),
          ));
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="relative py-28">
      <div
    data-shared-anchor="process"
    aria-hidden
    className="pointer-events-none absolute right-72 top-32 hidden h-1 w-1 lg:block"
  />
      <div className="mx-auto max-w-wrap px-5">
        <SectionHeading eyebrow="Process" title="From Idea to Production" />

        <div className="relative mx-auto max-w-3xl">
          {/* Pathway */}
          <div className="absolute bottom-4 left-5 top-4 w-px sm:left-6">
            <svg className="h-full w-full overflow-visible" aria-hidden>
              <path
                ref={pathRef}
                d="M 0.5 0 L 0.5 4000"
                stroke="url(#process-grad)"
                strokeWidth="2"
                fill="none"
                style={{ filter: 'drop-shadow(0 0 6px rgba(34,211,238,0.7))' }}
              />
              <defs>
                <linearGradient id="process-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="50%" stopColor="#22D3EE" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
            {/* Travelling light */}
            {!reduced && (
              <div
                ref={lightRef}
                className="absolute -left-[5px] h-3 w-3 rounded-full bg-cyan"
                style={{ boxShadow: '0 0 16px 4px rgba(34,211,238,0.8)' }}
              />
            )}
          </div>

          {/* Steps */}
          <ol className="space-y-4">
            {processSteps.map((step, i) => {
              const isActive = active === -1 || i === active;
              return (
                <motion.li
                  key={step.title}
                  className="relative pl-14 sm:pl-16"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <span
                    className={`absolute left-0 grid h-10 w-10 place-items-center rounded-full border font-mono text-xs transition-all duration-300 sm:h-12 sm:w-12 ${
                      isActive
                        ? 'border-cyan/60 bg-cyan/10 text-cyan'
                        : 'border-line/20 bg-surface text-ink-2'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div
                    className={`card p-4 transition-all duration-300 sm:p-5 ${
                      isActive ? 'border-cyan/30' : ''
                    }`}
                  >
                    <h3 className="font-display text-base font-semibold">{step.title}</h3>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.p
                          className="overflow-hidden text-sm leading-relaxed text-ink-2"
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: 'auto', opacity: 1, marginTop: 6 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {step.detail}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
