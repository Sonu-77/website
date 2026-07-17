'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { gsap } from '@/lib/site';
import { useSite } from '@/lib/site';

const PARTICLES = Array.from({ length: 26 }, (_, i) => i);

/**
 * ~1.6s premium loader:
 *  1. "SK" initials fade in
 *  2. thin loading line sweeps left → right
 *  3. initials burst into glowing particles that drift outward
 *  4. overlay fades + scales away, revealing the hero
 * Skipped instantly when reduced motion is preferred.
 */
export default function Loader() {
  const [show, setShow] = useState(true);
  const [burst, setBurst] = useState(false);
  const reduced = useReducedMotion();
  const { setLoaderDone } = useSite();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) {
      setShow(false);
      setLoaderDone(true);
      return;
    }
    const t1 = setTimeout(() => setBurst(true), 950);
    const t2 = setTimeout(() => {
      setShow(false);
      setLoaderDone(true);
    }, 1650);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduced, setLoaderDone]);

  useEffect(() => {
    if (!burst || !rootRef.current) return;
    const dots = rootRef.current.querySelectorAll('.loader-particle');
    gsap.to(dots, {
      x: () => gsap.utils.random(-180, 180),
      y: () => gsap.utils.random(-140, 140),
      opacity: 0,
      scale: () => gsap.utils.random(0.2, 1.4),
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.008,
    });
  }, [burst]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          ref={rootRef}
          className="fixed inset-0 z-[100] grid place-items-center bg-base"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Loading portfolio"
          role="status"
        >
          <div className="relative">
            <motion.span
              className="font-display text-6xl font-bold tracking-tight text-gradient"
              initial={{ opacity: 0, y: 14 }}
              animate={burst ? { opacity: 0, scale: 0.85 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              SK
            </motion.span>

            {/* particle burst layer */}
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              {burst &&
                PARTICLES.map((i) => (
                  <span
                    key={i}
                    className="loader-particle absolute h-1.5 w-1.5 rounded-full"
                    style={{
                      background: i % 3 === 0 ? '#22D3EE' : i % 3 === 1 ? '#2563EB' : '#8B5CF6',
                      boxShadow: '0 0 8px currentColor',
                    }}
                  />
                ))}
            </div>

            {/* loading line */}
            <motion.div
              className="mt-6 h-px w-40 overflow-hidden rounded bg-ink-2/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: burst ? 0 : 1 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-cyan to-violet"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
