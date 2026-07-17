# Sonu Kachhap — Developer Portfolio

Premium single-page portfolio built with Next.js (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, GSAP + ScrollTrigger, Lenis smooth scrolling, and a lightweight React Three Fiber hero object.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Before deploying — replace the placeholders

All personal data lives in one file: **`lib/data.ts`** (`identity` object at the top).

1. `email` — your real contact address
2. `github` / `linkedin` — your real profile URLs
3. `siteUrl` — your deployed domain (drives canonical URL, sitemap, robots, Open Graph)
4. Drop your résumé PDF at `public/resume-sonu-kachhap.pdf` (or change `resumeUrl`)
5. Optional: add `liveUrl` / `sourceUrl` / `caseStudyUrl` to any project in `projects` — buttons appear automatically only when a URL exists

Optionally add an Open Graph image at `public/opengraph-image.png` (1200×630).

## Contact form

The form works with zero backend: submitting opens the visitor's email client with all fields pre-filled (mailto). To send silently instead, replace the `onSubmit` handler in `components/sections/Contact.tsx` with an EmailJS call or your own API route.

## Architecture notes

- **`lib/data.ts`** — every piece of content (skills, projects, services, process). Edit content without touching components.
- **`lib/site.tsx`** — GSAP/ScrollTrigger registration, site context (loader state + contact-form prefill), `scrollToSection` helper that routes through Lenis.
- **`components/providers/SmoothScroll.tsx`** — Lenis driven by GSAP's ticker so smooth scrolling and ScrollTrigger share one rAF loop. Pauses when the tab is hidden.
- **`components/SharedElement.tsx`** — the signature travelling terminal window that moves between `[data-shared-anchor]` points across sections and dissolves into particles at Contact. Desktop-only.
- **`components/Background.tsx`** — layered ambient background: gradient orbs, technical grid, canvas particle network, mouse spotlight, parallax code symbols.
- **Reduced motion** — every animated system (Lenis, GSAP, cursor, loader, 3D, background) checks `prefers-reduced-motion` and degrades to a fully static, fully functional page. CSS animations are also disabled globally via media query.
- **Theming** — dark is default; the toggle switches CSS-variable tokens (`.dark` / `.light` on `<html>` via next-themes).

## Performance choices

- Three.js loads only on desktop (`>=1024px`), only after the loader, via `next/dynamic` with `ssr: false`; capped DPR and `low-power` GPU preference.
- Particle canvas caps device pixel ratio at 2, reduces particle count on mobile, and pauses on `visibilitychange`.
- Fonts loaded through `next/font` with `display: swap` (no layout shift, no render-blocking).
- No images or video backgrounds; previews are lightweight DOM/SVG mockups.
- Heavy cursor/parallax effects are disabled on touch devices.

## Deployment

Works out of the box on Vercel (`vercel deploy`) or any Node host (`npm run build && npm start`). For Hostinger/NGINX, use `output: 'standalone'` in `next.config.mjs` if you prefer a self-contained server bundle.
