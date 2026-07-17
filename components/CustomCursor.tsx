'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { gsap } from '@/lib/site';

/**
 * Additive custom cursor: a dot that tracks instantly and a ring that
 * lags behind. The ring expands over interactive elements and shows a
 * "View" label over project cards (any element with data-cursor="view").
 * Hidden entirely on touch devices and with reduced motion — the native
 * cursor is never removed.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'default' | 'link' | 'view'>('default');
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    setVisible(true);
    const dot = dotRef.current!;
    const ring = ringRef.current!;

    const dx = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
    const dy = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });
    const rx = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const ry = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      dx(e.clientX - 4);
      dy(e.clientY - 4);
      rx(e.clientX - (ring.offsetWidth / 2));
      ry(e.clientY - (ring.offsetHeight / 2));

      const t = e.target as HTMLElement;
      if (t.closest('[data-cursor="view"]')) setMode('view');
      else if (t.closest('a, button, [role="button"], input, textarea, select, label')) {
        setMode('link');
      } else setMode('default');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduced]);

  if (!visible) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" data-mode={mode} aria-hidden>
        {mode === 'view' ? 'VIEW' : ''}
      </div>
    </>
  );
}
