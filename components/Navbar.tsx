"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { navItems, identity } from "@/lib/data";
import { scrollToSection } from "@/lib/site";
import Image from "next/image";

export default function Navbar() {
  const [active, setActive] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  // Shrink + blur on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll while the mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [menuOpen]);

  // Active-section highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        aria-label="Primary"
        className="glass w-full max-w-wrap rounded-2xl"
        animate={{
          paddingTop: scrolled ? 8 : 14,
          paddingBottom: scrolled ? 8 : 14,
          backdropFilter: scrolled ? "blur(24px)" : "blur(14px)",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between px-4 sm:px-6">
          <button
            type="button"
            onClick={() => go("home")}
            className="flex shrink-0 cursor-pointer items-center rounded-lg transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60"
            aria-label="Go to home section"
          >
            <Image
              src="/assets/logo.png"
              alt="Sonu Kachhap"
              width={150}
              height={68}
              priority
              className="h-9 w-auto object-contain sm:h-10"
            />
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map(({ id, label }) => (
              <li key={id} className="relative">
                <button
                  onClick={() => go(id)}
                  aria-current={active === id ? "true" : undefined}
                  className={`relative cursor-pointer rounded-lg px-3 py-2 text-sm transition-colors ${
                    active === id ? "text-ink" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {label}
                  {active === id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-primary via-cyan to-violet"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="glass grid h-11 w-11 cursor-pointer place-items-center rounded-xl transition-colors hover:border-cyan/50"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              >
                {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
              </button>
            )}

            {/* <a
              href={identity.resumeUrl}
              download
              className="glass hidden h-11 cursor-pointer items-center gap-2 rounded-xl px-4 text-sm font-medium transition-colors hover:border-cyan/50 lg:inline-flex"
            >
              <Download size={15} /> Résumé
            </a> */}

            <button
              onClick={() => go("contact")}
              className="btn-primary hidden !min-h-[44px] !px-5 !py-2.5 md:inline-flex"
            >
              Hire Me
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="glass grid h-11 w-11 cursor-pointer place-items-center rounded-xl md:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="overflow-hidden md:hidden"
            >
              <ul className="max-h-[calc(100dvh-7rem)] space-y-1 overflow-y-auto px-4 pb-4 pt-2">
                {navItems.map(({ id, label }, i) => (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <button
                      onClick={() => go(id)}
                      className={`block w-full cursor-pointer rounded-lg px-3 py-3 text-left text-sm ${
                        active === id ? "bg-cyan/10 text-cyan" : "text-ink-2"
                      }`}
                    >
                      {label}
                    </button>
                  </motion.li>
                ))}
                <li className="flex gap-2 pt-2">
                  <button
                    onClick={() => go("contact")}
                    className="btn-primary flex-1"
                  >
                    Hire Me
                  </button>
                  {/* <a
                    href={identity.resumeUrl}
                    download
                    className="btn-ghost flex-1"
                  >
                    <Download size={15} /> Résumé
                  </a> */}
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
