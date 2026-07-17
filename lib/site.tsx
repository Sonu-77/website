'use client';

import {
  createContext, useContext, useMemo, useState, type ReactNode,
} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/* ------------------------------------------------------------------ */
/* Site context: loader completion + contact-form project-type prefill */
/* ------------------------------------------------------------------ */
type SiteContextValue = {
  loaderDone: boolean;
  setLoaderDone: (v: boolean) => void;
  projectType: string;
  setProjectType: (v: string) => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [loaderDone, setLoaderDone] = useState(false);
  const [projectType, setProjectType] = useState('');

  const value = useMemo(
    () => ({ loaderDone, setLoaderDone, projectType, setProjectType }),
    [loaderDone, projectType],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside SiteProvider');
  return ctx;
}

/** Smooth-scroll to a section id, respecting Lenis when active. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as any).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: -72, duration: 1.4 });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
