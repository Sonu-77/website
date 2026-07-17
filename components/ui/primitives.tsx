'use client';

import {
  useRef, useState, type ReactNode, type MouseEvent, type ComponentPropsWithoutRef,
} from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/* MagneticButton — pulls gently toward the cursor on desktop          */
/* ------------------------------------------------------------------ */
type MagneticProps = { children: ReactNode; strength?: number } & ComponentPropsWithoutRef<'div'>;

export function Magnetic({ children, strength = 0.25, ...rest }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  const onMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setOffset({
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * strength,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 16, mass: 0.4 }}
      className="inline-block"
      {...(rest as any)}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* TiltCard — subtle 3D tilt following the cursor                      */
/* ------------------------------------------------------------------ */
type TiltProps = { children: ReactNode; className?: string; max?: number };

export function TiltCard({ children, className = '', max = 7 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0 });
  const reduced = useReducedMotion();

  const onMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: -py * max, ry: px * max });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setT({ rx: 0, ry: 0 })}
      animate={{ rotateX: t.rx, rotateY: t.ry }}
      transition={{ type: 'spring', stiffness: 180, damping: 18 }}
      style={{ transformStyle: 'preserve-3d', perspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* SectionHeading — eyebrow + display heading with masked reveal       */
/* ------------------------------------------------------------------ */
export function SectionHeading({
  eyebrow,
  title,
  align = 'left',
}: {
  eyebrow: string;
  title: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : ''}`}>
      <motion.p
        className="eyebrow mb-3"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        {eyebrow}
      </motion.p>
      <div className="overflow-hidden">
        <motion.h2
          className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
          initial={{ y: '110%' }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h2>
      </div>
    </div>
  );
}
