'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { gsap } from '@/lib/site';

const CODE_SYMBOLS = ['</>', '{ }', '=>', 'fn()', '&&', '::', '[ ]', 'API'];

/**
 * Layered ambient background, fixed behind all content:
 *  1. blurred gradient orbs (CSS keyframes, GPU-cheap)
 *  2. technical grid (pure CSS)
 *  3. canvas: drifting particles + thin connection lines
 *  4. mouse-following radial spotlight
 *  5. floating code symbols at different parallax depths
 * Everything is skipped with prefers-reduced-motion, and the canvas
 * pauses when the tab is hidden.
 */
export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const symbolsRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  /* Particle field + connection lines --------------------------------- */
  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    let particles: P[] = [];

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = window.innerWidth < 768 ? 26 : 54;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 0.5,
      }));
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      if (!running) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 211, 238, 0.35)';
        ctx.fill();
      }

      // thin connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 130 * 130) {
            const alpha = 0.09 * (1 - d2 / (130 * 130));
            ctx.strokeStyle = `rgba(99, 132, 246, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onVisibility = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(draw);
      else cancelAnimationFrame(raf);
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduced]);

  /* Mouse spotlight (very soft) --------------------------------------- */
  useEffect(() => {
    if (reduced) return;
    const spot = spotRef.current;
    if (!spot) return;
    const qx = gsap.quickTo(spot, 'x', { duration: 0.9, ease: 'power3.out' });
    const qy = gsap.quickTo(spot, 'y', { duration: 0.9, ease: 'power3.out' });
    const onMove = (e: MouseEvent) => {
      qx(e.clientX - 300);
      qy(e.clientY - 300);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduced]);

  /* Floating code symbols with scroll parallax depth ------------------ */
  useEffect(() => {
    if (reduced) return;
    const wrap = symbolsRef.current;
    if (!wrap) return;
    const nodes = Array.from(wrap.children) as HTMLElement[];
    const tweens = nodes.map((node, i) => {
      const depth = 0.15 + (i % 4) * 0.12; // different speeds → layered depth
      return gsap.to(node, {
        y: () => -window.innerHeight * depth,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      });
    });
    return () => tweens.forEach((t) => t.kill());
  }, [reduced]);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      {/* Blurred gradient orbs */}
      <div className="absolute -left-[15%] top-[-10%] h-[46rem] w-[46rem] rounded-full bg-primary/20 blur-[140px] motion-safe:animate-orb-a" />
      <div className="absolute right-[-12%] top-[22%] h-[38rem] w-[38rem] rounded-full bg-violet/20 blur-[150px] motion-safe:animate-orb-b" />
      <div className="absolute bottom-[-18%] left-[28%] h-[40rem] w-[40rem] rounded-full bg-cyan/15 blur-[150px] motion-safe:animate-orb-c" />

      {/* Technical grid */}
      <div className="bg-grid absolute inset-0" />

      {/* Particles + connection lines */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Mouse spotlight */}
      <div
        ref={spotRef}
        className="absolute h-[600px] w-[600px] rounded-full opacity-60 max-md:hidden"
        style={{
          background:
            'radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 65%)',
        }}
      />

      {/* Floating code symbols */}
      <div ref={symbolsRef} className="absolute inset-0 max-sm:hidden">
        {CODE_SYMBOLS.map((s, i) => (
          <span
            key={s}
            className="absolute select-none font-mono text-sm text-ink-2/15"
            style={{
              left: `${8 + ((i * 13) % 84)}%`,
              top: `${12 + ((i * 29) % 160)}%`,
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
