"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { identity, rotatingTitles, heroDescription, socials } from "@/lib/data";
import { gsap, scrollToSection, useSite } from "@/lib/site";
import { Magnetic } from "@/components/ui/primitives";

const HeroObject = dynamic(() => import("@/components/three/HeroObject"), {
  ssr: false,
  loading: () => <div className="h-full w-full" aria-hidden />,
});

export default function Hero() {
  const { loaderDone } = useSite();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [titleIndex, setTitleIndex] = useState(0);
  const [show3d, setShow3d] = useState(false);

  // Rotating secondary titles
  useEffect(() => {
    const t = setInterval(
      () => setTitleIndex((i) => (i + 1) % rotatingTitles.length),
      2600,
    );
    return () => clearInterval(t);
  }, []);

  // Load 3D only on capable desktop screens, after the loader
  useEffect(() => {
    if (!loaderDone) return;
    if (reduced) return;
    if (window.innerWidth >= 1024) setShow3d(true);
  }, [loaderDone, reduced]);

  // Camera-like push-back: hero scales down and recedes as you scroll away
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.to(innerRef.current, {
        scale: 0.92,
        opacity: 0.35,
        yPercent: -6,
        filter: "blur(2px)",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom 30%",
          scrub: 0.8,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  const nameWords = identity.name.split(" ");
  const visible = loaderDone || !!reduced;

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      <div
        data-shared-anchor="hero"
        aria-hidden
        className="pointer-events-none absolute left-8 top-28 hidden h-1 w-1 lg:block xl:left-14 xl:top-32"
      />

      <div
        ref={innerRef}
        className="mx-auto grid w-full max-w-wrap items-center gap-12 px-5 lg:grid-cols-[1.15fr_0.85fr]"
      >
        {/* Copy column */}
        <div>
          <motion.p
            className="eyebrow mb-4"
            initial={{ opacity: 0, y: 14 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Hello, I&rsquo;m
          </motion.p>

          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {nameWords.map((word, i) => (
              <span key={word} className="inline-block overflow-hidden pb-1">
                <motion.span
                  className={`inline-block ${i === 1 ? "text-gradient" : ""}`}
                  initial={{ y: "110%" }}
                  animate={visible ? { y: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + i * 0.14,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                  {i < nameWords.length - 1 && "\u00A0"}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-3 font-display text-xl font-semibold text-ink sm:text-2xl"
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ delay: 0.55 }}
          >
            Full-Stack Web Developer
          </motion.p>

          {/* Rotating titles */}
          <div className="mt-2 h-7 overflow-hidden" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.p
                key={titleIndex}
                className="font-mono text-sm text-cyan"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                {">"} {rotatingTitles[titleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-ink-2"
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={visible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {heroDescription}
          </motion.p>

          {/* Buttons + socials, staggered */}
          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial="hidden"
            animate={visible ? "show" : "hidden"}
            variants={{
              show: {
                transition: { staggerChildren: 0.08, delayChildren: 0.9 },
              },
            }}
          >
            {[
              <Magnetic key="work">
                <button
                  onClick={() => scrollToSection("projects")}
                  className="btn-primary"
                >
                  View My Work
                </button>
              </Magnetic>,
              <Magnetic key="hire">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="btn-ghost gradient-border"
                >
                  Hire Me
                </button>
              </Magnetic>,
              // <a
              //   key="cv"
              //   href={identity.resumeUrl}
              //   download
              //   className="btn-ghost"
              // >
              //   Download Résumé
              // </a>,
            ].map((node, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
                }}
              >
                {node}
              </motion.div>
            ))}

            <motion.div
              className="ml-1 flex items-center gap-2"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { duration: 0.5 } },
              }}
            >
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="glass grid h-11 w-11 cursor-pointer place-items-center rounded-xl text-ink-2 transition-all duration-200 hover:-translate-y-0.5 hover:text-cyan"
                >
                  <Icon size={17} />
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* 3D object column (desktop) — also hosts the shared element's start anchor */}
        <div className="relative hidden h-[26rem] lg:block">
          {show3d && <HeroObject />}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer text-ink-2 transition-colors hover:text-cyan"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ delay: 1.6 }}
      >
        <motion.span
          animate={reduced ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="block"
        >
          <ArrowDown size={20} />
        </motion.span>
      </motion.button>
    </section>
  );
}
