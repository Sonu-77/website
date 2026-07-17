'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { gsap, ScrollTrigger } from '@/lib/site';

type Stage =
  | 'hero'
  | 'about'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'services'
  | 'process'
  | 'clientCta'
  | 'contact';

const STAGE_CONTENT: Record<Stage, { title: string; lines: string[] }> = {
  hero: {
    title: '~/sonu — zsh',
    lines: ['$ whoami', 'full-stack developer', '$ █'],
  },

  about: {
    title: 'about.ts',
    lines: [
      'const years = 2;',
      'const focus = "SaaS";',
      'ship(production);',
    ],
  },

  skills: {
    title: 'stack.json',
    lines: [
      '"react": "✓"',
      '"next": "✓"',
      '"django": "✓"',
    ],
  },

  experience: {
    title: 'journey.log',
    lines: [
      '> DreamWave LLP',
      '> dashboards, APIs',
      '> RBAC, streaming',
    ],
  },

  projects: {
    title: 'projects — build',
    lines: [
      '▲ next build',
      '✓ compiled',
      '→ production ready',
    ],
  },

  services: {
    title: 'services.ts',
    lines: [
      'frontend();',
      'fullStack();',
      'optimize();',
    ],
  },

  process: {
    title: 'workflow.yml',
    lines: [
      'plan → build',
      'test → optimize',
      'deploy → support',
    ],
  },

  clientCta: {
    title: 'project.init',
    lines: [
      '$ start new-project',
      'requirements ready',
      'let’s build →',
    ],
  },

  contact: {
    title: 'connect.sh',
    lines: [
      '$ send --project',
      'awaiting your idea…',
      '$ █',
    ],
  },
};

/**
 * The signature element of the page: one small glowing terminal window,
 * fixed to the viewport, that travels between anchor points as you scroll
 * and rewrites its contents per section — hero prompt → skill readout →
 * journey log → build preview — then dissolves into particles at Contact.
 *
 * Position is driven by ScrollTrigger tweens between per-section anchors
 * (elements with [data-shared-anchor]). Desktop-only; hidden on mobile
 * and with reduced motion.
 */
export default function SharedElement() {
  const ref = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<Stage>('hero');
  const [dissolved, setDissolved] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
  if (reduced) return;
  if (window.innerWidth < 1024) return;

  const el = ref.current;
  const main = document.getElementById('main');

  if (!el || !main) return;

  const anchors = Array.from(
    document.querySelectorAll<HTMLElement>('[data-shared-anchor]'),
  );

  if (anchors.length < 2) return;

  /**
   * SharedElement is positioned absolutely inside <main>.
   * Therefore, all anchor positions must be calculated
   * relative to <main>, not relative to the full document.
   */
  const place = (anchor: HTMLElement) => {
    const anchorRect = anchor.getBoundingClientRect();
    const mainRect = main.getBoundingClientRect();

    return {
      x: anchorRect.left - mainRect.left,
      y: anchorRect.top - mainRect.top,
    };
  };

  const ctx = gsap.context(() => {
    const firstAnchor = anchors[0];
    const firstPosition = place(firstAnchor);

    /**
     * Force the shared terminal to be visible at the Hero anchor
     * immediately when the page first loads.
     */
    gsap.set(el, {
      x: firstPosition.x,
      y: firstPosition.y,
      rotate: -3,
      opacity: 1,
      scale: 1,
    });

    setStage('hero');
    setDissolved(false);

    anchors.forEach((anchor, index) => {
      const nextAnchor = anchors[index + 1];
      const stageName = anchor.dataset.sharedAnchor as Stage;

      const currentSection =
        anchor.closest<HTMLElement>('section') ?? anchor;

      const nextSection =
        nextAnchor?.closest<HTMLElement>('section') ?? nextAnchor;

      const isHero = stageName === 'hero';

      /**
       * Update terminal content when a section becomes active.
       */
      ScrollTrigger.create({
        trigger: currentSection,

        /**
         * Hero begins exactly at the top.
         * Other sections keep the original 60% behavior.
         */
        start: isHero ? 'top top' : 'top 60%',

        onEnter: () => {
          setStage(stageName);
        },

        onEnterBack: () => {
          setStage(stageName);
        },
      });

      if (!nextAnchor || !nextSection) return;

      /**
       * Move the shared terminal from the current anchor
       * to the next section's anchor.
       */
      gsap.to(el, {
        x: () => place(nextAnchor).x,
        y: () => place(nextAnchor).y,
        rotate: index % 2 === 0 ? 4 : -4,
        ease: 'none',

        /**
         * Prevent later tweens from overriding the initial
         * Hero position when the page loads.
         */
        immediateRender: false,

        scrollTrigger: {
          trigger: currentSection,

          /**
           * Important Hero fix:
           * Hero movement begins at scroll position zero,
           * instead of starting before the page loads.
           */
          start: isHero ? 'top top' : 'top 40%',

          endTrigger: nextSection,
          end: 'top 55%',

          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    /**
     * Keep the terminal visible throughout Contact.
     * It dissolves only when the user reaches the end
     * of the Contact section.
     */
    ScrollTrigger.create({
      trigger: '#contact',
      start: 'bottom top',

      onEnter: () => {
        setDissolved(true);

        gsap.to(el, {
          opacity: 0,
          scale: 0.6,
          duration: 0.6,
          ease: 'power2.in',
        });
      },

      onLeaveBack: () => {
        setDissolved(false);

        gsap.to(el, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
        });
      },
    });
  });

  /**
   * Refresh positions after the initial browser layout.
   * This handles fonts, images and Hero animations.
   */
  const refreshFrame = window.requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });

  document.fonts?.ready.then(() => {
    ScrollTrigger.refresh();
  });

  return () => {
    window.cancelAnimationFrame(refreshFrame);
    ctx.revert();
  };
}, [reduced]);

  if (reduced) return null;

  const content = STAGE_CONTENT[stage];

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-40 hidden w-64 lg:block"
      style={{ willChange: 'transform' }}
    >
      <div className="gradient-border card overflow-hidden !rounded-xl">
        <div className="flex items-center gap-1.5 border-b border-line/10 bg-surface/80 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[10px] text-ink-2">{content.title}</span>
        </div>
        <div className="space-y-1 bg-base/70 px-3 py-3 font-mono text-[11px] leading-relaxed text-cyan/90">
          {content.lines.map((line, i) => (
            <p key={`${stage}-${i}`} className={i === 0 ? 'text-ink' : ''}>
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* dissolve particles */}
      {dissolved && (
        <div className="absolute inset-0 grid place-items-center">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="se-dot absolute h-1 w-1 rounded-full bg-cyan"
              style={{ boxShadow: '0 0 6px #22D3EE' }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
