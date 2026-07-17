'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from 'framer-motion';
import { gsap, ScrollTrigger } from '@/lib/site';

/**
 * Lenis drives smooth scrolling; GSAP's ticker drives Lenis so
 * ScrollTrigger and Lenis stay perfectly in sync (one rAF loop).
 * With prefers-reduced-motion, native scrolling is used untouched.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    (window as any).__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Pause heavy work when the tab is hidden
    const onVisibility = () => {
      if (document.hidden) {
        lenis.stop();
        gsap.globalTimeline.pause();
      } else {
        lenis.start();
        gsap.globalTimeline.resume();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, [reduced]);

  return <>{children}</>;
}
