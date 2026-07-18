"use client";

import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  CheckCircle2,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Wifi,
} from "lucide-react";
import {
  budgetRanges,
  identity,
  projectTypes,
  requirementOptions,
} from "@/lib/data";
import { scrollToSection, useSite } from "@/lib/site";
import { Magnetic, SectionHeading } from "@/components/ui/primitives";

/* ------------------------------------------------------------------ */
/* 14. Freelance Client Section                                        */
/* ------------------------------------------------------------------ */
export function ClientCTA() {
  const { setProjectType, projectType } = useSite();

  return (
    <section className="relative py-24">
      <div
        data-shared-anchor="clientCta"
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-20 hidden h-1 w-1 -translate-x-1/2 lg:block"
      />
      <div className="mx-auto max-w-wrap px-5">
        <SectionHeading
          eyebrow="Work With Me"
          title="Have a Website or Product Idea?"
          align="center"
        />
        <p className="mx-auto -mt-6 mb-10 max-w-2xl text-center text-sm leading-relaxed text-ink-2">
          I help businesses build new digital products, improve existing
          applications, integrate APIs, fix technical issues, and create
          responsive, high-performance user experiences.
        </p>

        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3">
          {requirementOptions.map(({ label, icon: Icon }, i) => {
            const selected = projectType === label;
            return (
              <motion.button
                key={label}
                onClick={() => {
                  setProjectType(label);
                  scrollToSection("contact");
                }}
                aria-pressed={selected}
                className={`card sweep min-h-[44px] cursor-pointer p-4 text-left transition-colors duration-200 ${
                  selected ? "border-cyan/60 bg-cyan/5" : "hover:border-cyan/40"
                }`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
              >
                <Icon size={17} className="text-cyan" />
                <span className="mt-2 block text-xs font-semibold leading-snug">
                  {label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Connected-network SVG background for the contact section            */
/* ------------------------------------------------------------------ */
function NetworkBg() {
  const nodes = [
    [8, 20],
    [24, 62],
    [40, 30],
    [55, 70],
    [70, 25],
    [86, 58],
    [92, 18],
    [15, 85],
    [60, 12],
    [78, 82],
  ];
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      {nodes.map(([x, y], i) => {
        const next = nodes[(i + 1) % nodes.length];
        return (
          <g key={i}>
            <line
              x1={x}
              y1={y}
              x2={next[0]}
              y2={next[1]}
              stroke="#22D3EE"
              strokeWidth="0.15"
            />
            <circle cx={x} cy={y} r="0.6" fill="#8B5CF6">
              <animate
                attributeName="opacity"
                values="0.4;1;0.4"
                dur={`${2.4 + i * 0.35}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 15. Contact Section                                                 */
/* ------------------------------------------------------------------ */
type FieldState = Record<string, string>;

const fieldReveal = (i: number) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-30px" },
  transition: { duration: 0.45, delay: i * 0.07 },
});

const inputClass =
  "w-full rounded-xl border border-line/15 bg-surface/70 px-4 py-3 text-sm text-ink placeholder:text-ink-2/60 outline-none transition-all duration-200 focus:border-cyan/60 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.12)]";

export default function Contact() {
  const { projectType, setProjectType } = useSite();

  const formRef = useRef<HTMLFormElement>(null);

  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [values, setValues] = useState<FieldState>({});

  const set = (k: string) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current || sending) return;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS environment variables are missing.");

      setSubmitError(
        "The contact service is temporarily unavailable. Please email me directly.",
      );

      return;
    }

    setSending(true);
    setSubmitError("");

    try {
      const response = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        {
          publicKey,
        },
      );

      if (response.status !== 200) {
        throw new Error(`Unexpected EmailJS status: ${response.status}`);
      }

      setValues({});
      setProjectType("");
      formRef.current.reset();
      setSent(true);
    } catch (error) {
      console.error("EmailJS submission failed:", error);

      setSubmitError(
        "Your message could not be sent. Please try again or email me directly.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-28">
      <NetworkBg />
      <div
        data-shared-anchor="contact"
        aria-hidden
        className="pointer-events-none absolute left-8 top-32 hidden h-1 w-1 lg:block xl:left-14"
      />
      <div className="relative mx-auto max-w-wrap px-5">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s Build Something Valuable"
        />
        <p className="-mt-6 mb-12 max-w-2xl text-sm leading-relaxed text-ink-2">
          Have a project, freelance opportunity, or development requirement?
          Share the details and I&rsquo;ll help turn the idea into a reliable
          digital product.
        </p>

        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Form */}
          <div className="gradient-border card relative p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  className="grid min-h-[26rem] place-items-center text-center"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45 }}
                >
                  <div>
                    <motion.span
                      className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cyan/10 text-cyan"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 16,
                        delay: 0.1,
                      }}
                    >
                      <CheckCircle2 size={30} />
                    </motion.span>
                    <h3 className="mt-5 font-display text-xl font-bold">
                      Message sent successfully
                    </h3>

                    <p className="mx-auto mt-2 max-w-sm text-sm text-ink-2">
                      Thank you for sharing your project details. A confirmation
                      email has been sent to your inbox, and I&rsquo;ll get back
                      to you within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSent(false);
                        setSubmitError("");
                      }}
                      className="btn-ghost mt-6"
                    >
                      Send another message
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  ref={formRef}
                  key="form"
                  onSubmit={onSubmit}
                  className="grid gap-4 sm:grid-cols-2"
                  exit={{ opacity: 0 }}
                >
                  <input
                    type="hidden"
                    name="title"
                    value={`Portfolio inquiry — ${projectType || "New project"}`}
                  />

                  <input
                    type="hidden"
                    name="time"
                    value={new Date().toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  />
                  <motion.div {...fieldReveal(0)}>
                    <label
                      htmlFor="c-name"
                      className="mb-1.5 block text-xs font-medium text-ink-2"
                    >
                      Name
                    </label>
                    <input
                      id="c-name"
                      name="name"
                      required
                      autoComplete="name"
                      className={inputClass}
                      placeholder="Your name"
                      value={values.name ?? ""}
                      onChange={set("name")}
                    />
                  </motion.div>
                  <motion.div {...fieldReveal(1)}>
                    <label
                      htmlFor="c-email"
                      className="mb-1.5 block text-xs font-medium text-ink-2"
                    >
                      Email
                    </label>
                    <input
                      id="c-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={inputClass}
                      placeholder="you@company.com"
                      value={values.email ?? ""}
                      onChange={set("email")}
                    />
                  </motion.div>
                  <motion.div {...fieldReveal(2)}>
                    <label
                      htmlFor="c-company"
                      className="mb-1.5 block text-xs font-medium text-ink-2"
                    >
                      Company
                    </label>
                    <input
                      id="c-company"
                      name="company"
                      autoComplete="organization"
                      className={inputClass}
                      placeholder="Company (optional)"
                      value={values.company ?? ""}
                      onChange={set("company")}
                    />
                  </motion.div>
                  <motion.div {...fieldReveal(3)}>
                    <label
                      htmlFor="c-type"
                      className="mb-1.5 block text-xs font-medium text-ink-2"
                    >
                      Project Type
                    </label>
                    <select
                      id="c-type"
                      name="projectType"
                      required
                      className={inputClass}
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                    >
                      <option value="" disabled>
                        Select a project type
                      </option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                  {/* <motion.div {...fieldReveal(4)}>
                    <label
                      htmlFor="c-budget"
                      className="mb-1.5 block text-xs font-medium text-ink-2"
                    >
                      Budget Range
                    </label>
                    <select
                      id="c-budget"
                      name="budget"
                      
                      className={inputClass}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select a range
                      </option>
                      {budgetRanges.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </motion.div> */}
                  <motion.div {...fieldReveal(5)}>
                    <label
                      htmlFor="c-timeline"
                      className="mb-1.5 block text-xs font-medium text-ink-2"
                    >
                      Expected Timeline
                    </label>
                    <input
                      id="c-timeline"
                      name="timeline"
                      className={inputClass}
                      placeholder="e.g. 4–6 weeks"
                      value={values.timeline ?? ""}
                      onChange={set("timeline")}
                    />
                  </motion.div>
                  <motion.div {...fieldReveal(6)} className="sm:col-span-2">
                    <label
                      htmlFor="c-desc"
                      className="mb-1.5 block text-xs font-medium text-ink-2"
                    >
                      Project Description
                    </label>
                    <textarea
                      id="c-desc"
                      name="message"
                      required
                      rows={5}
                      className={`${inputClass} resize-y`}
                      placeholder="What are you building, and what does success look like?"
                      value={values.description ?? ""}
                      onChange={set("description")}
                    />
                  </motion.div>
                  {submitError && (
                    <motion.p
                      role="alert"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-400 sm:col-span-2"
                    >
                      {submitError}
                    </motion.p>
                  )}
                  <motion.div
                    {...fieldReveal(7)}
                    className="grid grid-cols-2 gap-3 sm:col-span-2 sm:flex sm:flex-wrap sm:items-center"
                  >
                    {/* Full-width submit button on mobile */}
                    <div className="col-span-2 w-full [&>*]:w-full sm:w-auto sm:[&>*]:w-auto">
                      <Magnetic>
                        <button
                          type="submit"
                          disabled={sending}
                          className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                          {sending ? (
                            <>
                              <span
                                aria-hidden
                                className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                              />
                              Sending ...
                            </>
                          ) : (
                            <>
                              <Send size={15} />
                              Let’s Work Together
                            </>
                          )}
                        </button>
                      </Magnetic>
                    </div>

                    {/* Side-by-side on mobile */}
                    <a
                      href={`mailto:${identity.email}`}
                      className="btn-ghost w-full justify-center whitespace-nowrap sm:w-auto"
                    >
                      <Mail size={15} />
                      Email Me
                    </a>

                    <a
                      href={identity.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost w-full justify-center whitespace-nowrap sm:w-auto"
                    >
                      <Linkedin size={15} />
                      <span className="sm:hidden">LinkedIn</span>
                      <span className="hidden sm:inline">
                        Connect on LinkedIn
                      </span>
                    </a>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Details panel */}
          <motion.aside
            className="space-y-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="card p-5">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                {identity.availability}
              </p>
              <ul className="mt-4 space-y-3 text-sm text-ink-2">
                <li className="flex items-center gap-2.5">
                  <MapPin size={15} className="text-cyan" /> {identity.location}
                </li>
                <li className="flex items-center gap-2.5">
                  <Wifi size={15} className="text-cyan" /> Remote work available
                  worldwide
                </li>
                <li>
                  <a
                    href={`mailto:${identity.email}`}
                    className="flex items-center gap-2.5 transition-colors hover:text-cyan"
                  >
                    <Mail size={15} className="text-cyan" /> {identity.email}
                  </a>
                </li>
                <li>
                  <a
                    href={identity.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 transition-colors hover:text-cyan"
                  >
                    <Github size={15} className="text-cyan" /> GitHub profile
                  </a>
                </li>
                <li>
                  <a
                    href={identity.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 transition-colors hover:text-cyan"
                  >
                    <Linkedin size={15} className="text-cyan" /> LinkedIn
                    profile
                  </a>
                </li>
              </ul>
            </div>

            <div className="card p-5">
              <p className="font-mono text-xs leading-relaxed text-ink-2">
                <span className="text-cyan">$</span> typical reply time: within
                24 hours
                <br />
                <span className="text-cyan">$</span> working hours: flexible
                across time zones
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
