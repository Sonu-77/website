'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import { orbitSkills, skillGroups } from '@/lib/data';
import { SectionHeading } from '@/components/ui/primitives';

/* ------------------------------------------------------------------ */
/* Desktop: orbiting skill universe                                    */
/* ------------------------------------------------------------------ */
function SkillOrbit() {
  const [hovered, setHovered] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const RADIUS = 190;

  return (
    <div
      className="relative mx-auto hidden h-[30rem] w-[30rem] lg:block"
      onMouseLeave={() => setHovered(null)}
      aria-hidden
    >
      {/* Central code symbol */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <div className="gradient-border card grid h-24 w-24 place-items-center !rounded-2xl">
          <Code2 size={34} className="text-cyan" />
        </div>
      </div>

      {/* Orbit rings */}
      <div className="absolute inset-8 rounded-full border border-line/10" />
      <div className="absolute inset-20 rounded-full border border-line/10" />

      {/* Rotating orbit — pauses on hover */}
      <motion.div
        className="absolute inset-0"
        animate={reduced ? {} : { rotate: 360 }}
        transition={{ repeat: Infinity, duration: hovered ? 160 : 60, ease: 'linear' }}
      >
        {orbitSkills.map((skill, i) => {
          const angle = (i / orbitSkills.length) * Math.PI * 2;
          const x = Math.cos(angle) * RADIUS;
          const y = Math.sin(angle) * RADIUS;
          const depth = 0.85 + 0.3 * Math.abs(Math.sin(angle)); // fake z-depth
          return (
            <div
              key={skill}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              {/* Counter-rotate so labels stay upright */}
              <motion.div
                animate={reduced ? {} : { rotate: -360 }}
                transition={{ repeat: Infinity, duration: hovered ? 160 : 60, ease: 'linear' }}
              >
                <motion.button
                  onMouseEnter={() => setHovered(skill)}
                  whileHover={{ scale: 1.18, y: -4 }}
                  className="glass -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-xl px-3.5 py-2 font-mono text-xs text-ink transition-colors hover:border-cyan/60 hover:text-cyan"
                  style={{
                    opacity: depth,
                    scale: depth,
                    filter: depth < 1 ? 'blur(0.4px)' : 'none',
                  }}
                  tabIndex={-1}
                >
                  {skill}
                </motion.button>
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* Hover readout */}
<div className="absolute -bottom-8 left-1/2 w-max -translate-x-1/2 text-center">
  <p className="whitespace-nowrap font-mono text-xs text-cyan">
    {hovered
      ? `${hovered} — used in production projects`
      : 'hover a technology'}
  </p>
</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function Skills() {
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-wrap px-5">
        <SectionHeading eyebrow="Skills" title="Technologies I Use" />

        <div className="relative grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SkillOrbit />
          <div data-shared-anchor="skills" className="pointer-events-none absolute right-8 top-0 hidden h-1 w-1 lg:block" aria-hidden />

          {/* Category groups — the accessible, always-present representation.
              On mobile this doubles as the animated grid replacing the orbit. */}
          <div className="space-y-5">
            {skillGroups.map((group, gi) => (
              <motion.div
                key={group.title}
                className="card p-5"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: gi * 0.06 }}
              >
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-cyan">
                    <group.icon size={16} />
                  </span>
                  <h3 className="font-display text-base font-semibold">{group.title}</h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill, si) => (
                    <motion.li
                      key={skill}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.15 + si * 0.02 }}
                      className="cursor-default rounded-lg border border-line/15 bg-surface/60 px-3 py-1.5 text-xs text-ink-2 transition-colors duration-200 hover:border-cyan/50 hover:text-ink"
                    >
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
