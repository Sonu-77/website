'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/lib/data';
import { scrollToSection, useSite } from '@/lib/site';
import { SectionHeading } from '@/components/ui/primitives';

/**
 * Desktop: cards stack with position:sticky — as you scroll, the top card
 * recedes (scales down) while the next slides over it, reading like a
 * rotating deck without hijacking scroll. Mobile: a simple staggered grid.
 * Every card is a real button that pre-fills the contact form.
 */
export default function Services() {
  const { setProjectType } = useSite();

  const pick = (title: string) => {
    // Map service → closest requirement option for the form prefill
    const map: Record<string, string> = {
      'Frontend Development': 'Build a new website',
      'Full-Stack Web Development': 'Build a new website',
      'SaaS Dashboard Development': 'Develop a SaaS dashboard',
      'API Integration': 'Integrate third-party services',
      'Website Performance and SEO': 'Optimize website performance',
      'Bug Fixing and Product Improvement': 'Fix frontend or API issues',
    };
    setProjectType(map[title] ?? 'Something else');
    scrollToSection('contact');
  };

  return (
    <section id="services" className="relative py-28">
      <div
    data-shared-anchor="services"
    aria-hidden
    className="pointer-events-none absolute left-8 top-32 hidden h-1 w-1 lg:block xl:left-14"
  />
      <div className="mx-auto max-w-wrap px-5">
        <SectionHeading eyebrow="Services" title="How I Can Help" />

        {/* Mobile / tablet grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
          {services.map((s, i) => (
            <motion.button
              key={s.title}
              onClick={() => pick(s.title)}
              className="card sweep cursor-pointer p-5 text-left"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-cyan">
                <s.icon size={17} />
              </span>
              <h3 className="mt-3 font-display text-base font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-2">{s.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Desktop stacked deck */}
        <div className="hidden lg:block">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="sticky"
              style={{ top: `${120 + i * 14}px`, zIndex: i + 1 }}
            >
              <motion.button
                onClick={() => pick(s.title)}
                className="gradient-border card sweep group mb-6 flex w-full cursor-pointer items-center gap-8 p-8 text-left"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ background: 'rgb(var(--bg-2))' }}
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-primary/15 text-cyan transition-transform duration-300 group-hover:scale-110">
                  <s.icon size={22} />
                </span>
                <span className="flex-1">
                  <span className="font-display text-xl font-semibold">{s.title}</span>
                  <span className="mt-1.5 block max-w-2xl text-sm leading-relaxed text-ink-2">
                    {s.description}
                  </span>
                </span>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line/20 text-ink-2 transition-all duration-200 group-hover:border-cyan/60 group-hover:text-cyan">
                  <ArrowUpRight size={17} />
                </span>
              </motion.button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
