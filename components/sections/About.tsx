"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { aboutCards, aboutStats } from "@/lib/data";
import { SectionHeading, TiltCard } from "@/components/ui/primitives";

/* Animated counter that counts from 0 when scrolled into view */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1200;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduced]);

  return (
    <span ref={ref} className="font-display text-4xl font-bold text-gradient">
      {display}
      {suffix}
    </span>
  );
}

const paragraph1 =
  "I’m a Full-Stack Web Developer with 3+ years of experience creating responsive websites, SaaS applications, admin dashboards, authentication flows, subscription systems, and API-driven products. I enjoy transforming business requirements into clean, scalable, and user-friendly digital experiences.";

const paragraph2 =
  "My work includes frontend architecture, reusable UI systems, REST API integration, authentication, role-based access, database integration, performance optimization, deployment, and ongoing product improvements.";

export default function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-wrap px-5">
        <SectionHeading
          eyebrow="About"
          title="Building Digital Products That Perform"
        />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            {/* Line-by-line sentence reveal */}
            <div className="space-y-2 text-lg leading-relaxed text-ink-2">
              {paragraph1.split(". ").map((sentence, i, arr) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "100%", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {sentence}
                    {i < arr.length - 1 ? "." : ""}
                  </motion.span>
                </span>
              ))}
            </div>

            <motion.p
              className="mt-6 text-base leading-relaxed text-ink-2"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {paragraph2}
            </motion.p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {aboutStats.map((s) => (
                <div key={s.label}>
                  <Counter value={s.value} suffix={s.suffix} />
                  <p className="mt-1 text-xs leading-snug text-ink-2">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Info cards with 3D tilt, staggered upward */}
          <div className="relative">
            <div className="grid gap-4 sm:grid-cols-2">
              {aboutCards.map((card, i) => (
                <motion.div
                  key={card}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                >
                  <TiltCard className="card sweep h-full cursor-default p-5">
                    <span className="font-mono text-xs text-cyan">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-2 font-display text-ink-2 font-semibold leading-snug">
                      {card}
                    </p>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
            {/* Shared-element anchor for this section */}
            <div
              data-shared-anchor="about"
              className="pointer-events-none absolute -left-72 top-8 hidden h-1 w-1 lg:block"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
