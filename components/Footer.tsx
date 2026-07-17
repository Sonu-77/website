'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { identity, navItems } from '@/lib/data';
import { scrollToSection } from '@/lib/site';

/* Page scroll progress indicator, fixed at the very top */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-primary via-cyan to-violet"
      style={{ scaleX }}
    />
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line/10 py-12">
      <div className="mx-auto flex max-w-wrap flex-col items-center gap-8 px-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="font-display text-lg font-bold">
            <span className="text-gradient">Sonu Kachhap</span>
          </p>
          <p className="mt-1 text-xs text-ink-2">Full-Stack Web Developer</p>

          {/* animated code line */}
          <p className="mt-4 font-mono text-[11px] text-ink-2/80">
            <span className="text-cyan">{'//'}</span>{' '}
            <span
              className="bg-gradient-to-r from-ink-2 via-cyan to-ink-2 bg-[length:200%_100%] bg-clip-text text-transparent motion-safe:animate-shimmer"
            >
              Designed, developed, and continuously improved by Sonu Kachhap.
            </span>
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => scrollToSection(id)}
                  className="cursor-pointer text-xs text-ink-2 transition-colors hover:text-cyan"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {[
            { label: 'GitHub', href: identity.github, icon: Github },
            { label: 'LinkedIn', href: identity.linkedin, icon: Linkedin },
            { label: 'Email', href: `mailto:${identity.email}`, icon: Mail },
          ].map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="glass grid h-11 w-11 cursor-pointer place-items-center rounded-xl text-ink-2 transition-all duration-200 hover:-translate-y-0.5 hover:text-cyan"
            >
              <Icon size={16} />
            </a>
          ))}
          <button
            onClick={() => scrollToSection('home')}
            aria-label="Back to top"
            className="gradient-border glass grid h-11 w-11 cursor-pointer place-items-center rounded-xl text-cyan transition-transform duration-200 hover:-translate-y-1"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <p className="mt-8 text-center text-[11px] text-ink-2/70">
        © {year} Sonu Kachhap. All rights reserved.
      </p>
    </footer>
  );
}
