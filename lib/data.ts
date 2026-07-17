import type { LucideIcon } from "lucide-react";
import {
  Layout,
  Layers,
  Gauge,
  Plug,
  Wrench,
  ServerCog,
  Github,
  Linkedin,
  Mail,
  Braces,
  Database,
  Cloud,
  Search,
  ShieldCheck,
  LineChart,
  Globe,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Identity                                                            */
/* ------------------------------------------------------------------ */
export const identity = {
  name: "Sonu Kachhap",
  role: "Full-Stack Web Developer",
  location: "India · Remote-friendly",
  availability: "Available for freelance projects",
  email: "sonukachhap77@gmail.com", // TODO: replace with real address
  github: "https://github.com/Sonu-77", // TODO: replace with real profile
  linkedin: "https://www.linkedin.com/in/sonu77", // TODO: replace
  resumeUrl: "/resume-sonu-kachhap.pdf", // place the PDF in /public
  siteUrl: "https://sonukachhap.dev", // TODO: replace with deployed domain
};

export const rotatingTitles = [
  "React & Next.js Developer",
  "Frontend Specialist",
  "Django Developer",
  "SaaS Product Developer",
  "UI Animation Developer",
  "API Integration Specialist",
];

export const heroDescription =
  "I build responsive, scalable, and high-performance web applications using React, Next.js, TypeScript, Tailwind CSS, Django, REST APIs, and modern development practices. I specialize in SaaS platforms, dashboards, authentication systems, API integrations, SEO optimization, and production-ready digital products.";

export const socials = [
  { label: "GitHub", href: identity.github, icon: Github },
  { label: "LinkedIn", href: identity.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${identity.email}`, icon: Mail },
];

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */
export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
] as const;

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */
export const aboutStats: { value: number; suffix: string; label: string }[] = [
  { value: 2, suffix: "+", label: "Years of Experience" },
  { value: 5, suffix: "+", label: "Production Projects Shipped" },
  { value: 20, suffix: "+", label: "Technologies in Daily Use" },
  { value: 90, suffix: "+", label: "Target Lighthouse Score" },
];

export const aboutCards = [
  "2+ Years of Experience",
  "Full-Stack Development",
  "Production-Ready Applications",
  "Responsive and SEO-Friendly Solutions",
];

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */
export type SkillGroup = { title: string; icon: LucideIcon; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    icon: Layout,
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Material UI",
      "Framer Motion",
      "GSAP",
      "Zustand",
      "React Context",
      "Chart.js",
      "Lightweight Charts",
    ],
  },
  {
    title: "Backend",
    icon: ServerCog,
    skills: [
      "Python",
      "Django",
      "Django REST Framework",
      "FastAPI",
      "Node.js",
      "Express.js",
      "REST API Development",
      "JWT Authentication",
    ],
  },
  {
    title: "Database",
    icon: Database,
    skills: ["MySQL", "SQLite", "Database Design", "API Data Handling"],
  },
  {
    title: "Tools & Deployment",
    icon: Cloud,
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "NGINX",
      "Vercel",
      "Hostinger",
      "Postman",
      "Figma",
      "Google OAuth",
      "PostHog",
      "EmailJS",
      "Zoho SMTP Integration",
    ],
  },
  {
    title: "Additional Knowledge",
    icon: Braces,
    skills: [
      "Responsive Web Design",
      "SaaS Development",
      "Role-Based Access Control",
      "SEO Optimization",
      "Performance Optimization",
      "Cross-Browser Compatibility",
      "Mobile-First Development",
      "Subscription Workflows",
      "Payment Integration",
      "Third-Party API Integration",
    ],
  },
];

// Compact set used by the orbiting "skill universe" on desktop
export const orbitSkills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Django",
  "Python",
  "MySQL",
  "Docker",
  "GSAP",
  "Zustand",
  "FastAPI",
  "Node.js",
];

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */
export const experience = {
  role: "Frontend / Full-Stack Developer",
  company: "DreamWave Innovation LLP",
  period: "2023 — Present",
  points: [
    "Built responsive and reusable interfaces using React, Next.js, TypeScript, and Tailwind CSS",
    "Developed SaaS dashboards and administration interfaces",
    "Integrated REST APIs and authentication workflows",
    "Implemented role-based access for administrators, operators, auditors, and viewers",
    "Built forms, user-management flows, subscription interfaces, and interactive data visualizations",
    "Fixed UI, state-management, streaming, and API integration issues",
    "Improved performance, accessibility, mobile responsiveness, and user experience",
    "Collaborated on production products and client requirements",
    "Supported deployment and environment configuration",
  ],
};

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */
export type Project = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  contributions: string[];
  technologies: string[];
  challenge: string;
  solution: string;
  result: string;
  accent: string; // tailwind gradient classes for the preview window
  liveUrl?: string;
  sourceUrl?: string;
  caseStudyUrl?: string;
};

export const projects: Project[] = [
  {
    id: "disaster-recovery",
    liveUrl: "http://3.110.178.15:2009/",
    index: "01",
    title: "Cloud Disaster Recovery Management Platform",
    subtitle: "Genesys Cloud Disaster Recovery SaaS",
    description:
      "A multi-tenant SaaS platform designed to manage disaster recovery workflows for cloud contact-center environments. The platform supports organization onboarding, primary and destination region configuration, role-based users, synchronization workflows, restore operations, authentication, and administrative controls.",
    contributions: [
      "Multi-tenant dashboard development",
      "Tenant onboarding",
      "Primary and destination region selection",
      "Role-based user management",
      "Operator, auditor, viewer, and administrator workflows",
      "Synchronization and restore actions",
      "Password setup and reset flows",
      "REST API integration",
      "Responsive admin UI",
      "Dynamic product and pricing pages",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Django REST Framework",
      "MySQL",
      "JWT Authentication",
    ],
    challenge:
      "Coordinating tenant-scoped data, four distinct user roles, and long-running sync/restore operations inside one coherent admin experience.",
    solution:
      "Designed a role-aware component system with guarded routes, optimistic status polling for sync jobs, and clear state feedback for every destructive action.",
    result:
      "A production admin platform where operators run recovery workflows confidently, with role boundaries enforced end to end.",
    accent: "from-primary/40 via-cyan/25 to-transparent",
  },
  {
    id: "Draconic-Trading-AI",
    liveUrl: "https://hunt.draconic.ai/",
    index: "02",
    title: "Real-Time AI Trading Analysis Platform",
    subtitle: "Draconic AI-Powered Trading Terminal",
    description:
      "An interactive trading terminal featuring AI-generated insights, streamed responses, financial chart visualization, broker integrations, subscription plans, alert management, chat history, and responsive terminal experiences.",
    contributions: [
      "Server-sent event streaming",
      "Multi-tab chat management",
      "Real-time message updates",
      "Financial chart integration",
      "Broker account connections",
      "Trading order workflows",
      "Credit and subscription management",
      "Referral and usage-limit workflows",
      "Authentication and Google OAuth",
      "Responsive desktop and mobile terminal interfaces",
      "State synchronization and UI error handling",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Zustand",
      "Tailwind CSS",
      "Lightweight Charts",
      "REST APIs",
      "SSE Streaming",
    ],
    challenge:
      "Keeping streamed AI responses, live chart data, and multi-tab chat state synchronized without dropped messages or UI jank.",
    solution:
      "Centralized terminal state in Zustand with per-tab stream controllers, reconnect handling for SSE, and defensive rendering for partial messages.",
    result:
      "A responsive terminal that streams insights in real time across desktop and mobile, with reliable session and subscription handling.",
    accent: "from-cyan/40 via-violet/25 to-transparent",
  },
  {
    id: "racube",
    liveUrl:"https://racube.com/",
    index: "03",
    title: "Modern Corporate Product Website",
    subtitle: "RACube Corporate Website",
    description:
      "A responsive business website developed for a technology company, featuring dynamic product pages, contact forms, partner sections, resource pages, modern animations, SEO-friendly structure, and optimized deployment.",
    contributions: [
      "Dynamic product-page architecture",
      "Seven product categories",
      "Responsive navigation and menus",
      "EmailJS contact-form integration",
      "Zoho email workflow planning",
      "SEO-friendly metadata",
      "Performance optimization",
      "Dark and light themes",
      "Modern gradient design",
      "Deployment preparation",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "EmailJS",
      "Framer Motion",
      "Vercel",
      "Hostinger",
    ],
    challenge:
      "Presenting seven product categories through one flexible page architecture while keeping metadata, themes, and performance consistent.",
    solution:
      "Built a data-driven product-page template with shared layout primitives, per-page SEO metadata, and theme-aware gradient design tokens.",
    result:
      "A polished corporate site that ships new product pages from data alone and scores well on speed and search visibility.",
    accent: "from-violet/40 via-primary/25 to-transparent",
  },
  {
    id: "user-management",
    index: "04",
    title: "Role-Based User Management Dashboard",
    subtitle: "Authentication and User Management System",
    description:
      "A secure dashboard for managing tenant users, invitations, roles, permissions, password setup, account statuses, and authentication workflows.",
    contributions: [
      "User invitation flows",
      "Password setup and reset",
      "Role-based access control",
      "Active and pending account states",
      "Form validation",
      "API integration",
      "Secure token handling",
      "Responsive user-management tables",
      "Toast notifications",
      "Error and loading states",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Django REST Framework",
      "JWT",
      "MySQL",
    ],
    challenge:
      "Handling invitation, pending, and active account states securely while keeping token flows airtight across setup and reset paths.",
    solution:
      "Modeled account lifecycle explicitly in the UI, validated every form against API contracts, and isolated token handling behind a single auth layer.",
    result:
      "An admin dashboard where user lifecycle actions are safe, auditable, and clearly communicated through consistent feedback states.",
    accent: "from-primary/40 via-violet/25 to-transparent",
  },
  {
    id: "seo-performance",
    index: "05",
    title: "Business Website Performance and SEO Improvements",
    subtitle: "SEO and Performance Optimization",
    description:
      "Website optimization services focused on improving page speed, Core Web Vitals, mobile usability, search visibility, local SEO, user experience, and conversion performance.",
    contributions: [
      "GTmetrix and performance analysis",
      "Lighthouse optimization",
      "Image optimization",
      "Code splitting",
      "Technical SEO",
      "Metadata optimization",
      "Local SEO structure",
      "Responsive improvements",
      "Conversion-focused UI enhancements",
    ],
    technologies: [
      "Lighthouse",
      "GTmetrix",
      "Next.js",
      "Image Optimization",
      "Code Splitting",
      "Structured Data",
    ],
    challenge:
      "Improving Core Web Vitals on existing sites without rewrites, where layout shift and heavy assets were baked into the pages.",
    solution:
      "Audited with Lighthouse and GTmetrix, reserved space for dynamic content, converted media to modern formats, and split noncritical code.",
    result:
      "Measurable gains in page speed, mobile usability, and search visibility, translated into better engagement and conversion.",
    accent: "from-cyan/40 via-primary/25 to-transparent",
  },
];

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */
export type Service = { title: string; description: string; icon: LucideIcon };

export const services: Service[] = [
  {
    title: "Frontend Development",
    description:
      "Modern, responsive, reusable interfaces using React, Next.js, TypeScript, and Tailwind CSS.",
    icon: Layout,
  },
  {
    title: "Full-Stack Web Development",
    description:
      "Complete web applications with frontend, backend, authentication, APIs, and database integration.",
    icon: Layers,
  },
  {
    title: "SaaS Dashboard Development",
    description:
      "Admin panels, analytics dashboards, tenant management, subscription systems, and role-based workflows.",
    icon: LineChart,
  },
  {
    title: "API Integration",
    description:
      "REST APIs, authentication, payment services, email services, analytics tools, and third-party integrations.",
    icon: Plug,
  },
  {
    title: "Website Performance and SEO",
    description:
      "Page-speed improvements, technical SEO, mobile optimization, and conversion-focused improvements.",
    icon: Gauge,
  },
  {
    title: "Bug Fixing and Product Improvement",
    description:
      "Debugging UI issues, API problems, state-management errors, responsive layout issues, and performance bottlenecks.",
    icon: Wrench,
  },
];

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */
export const processSteps = [
  {
    title: "Requirement Understanding",
    detail:
      "Clarify goals, users, constraints, and success criteria before any code is written.",
  },
  {
    title: "Planning and Architecture",
    detail:
      "Define the data model, component structure, API contracts, and delivery milestones.",
  },
  {
    title: "UI and Component Development",
    detail:
      "Build reusable, typed components with responsive layouts and accessible interactions.",
  },
  {
    title: "API and Database Integration",
    detail:
      "Connect frontend to backend with authentication, validation, and reliable error handling.",
  },
  {
    title: "Testing and Optimization",
    detail:
      "Verify flows across devices, then tune performance, Core Web Vitals, and SEO.",
  },
  {
    title: "Deployment and Support",
    detail:
      "Ship to production, configure environments, and keep improving after launch.",
  },
];

/* ------------------------------------------------------------------ */
/* Freelance requirement cards → prefill contact form                  */
/* ------------------------------------------------------------------ */
export const requirementOptions = [
  { label: "Build a new website", icon: Globe },
  { label: "Develop a SaaS dashboard", icon: LineChart },
  { label: "Improve an existing application", icon: Layers },
  { label: "Fix frontend or API issues", icon: Wrench },
  { label: "Optimize website performance", icon: Gauge },
  { label: "Integrate third-party services", icon: Plug },
];

export const projectTypes = [
  "Build a new website",
  "Develop a SaaS dashboard",
  "Improve an existing application",
  "Fix frontend or API issues",
  "Optimize website performance",
  "Integrate third-party services",
  "Something else",
];

export const budgetRanges = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000+",
  "Not sure yet",
];

export const trustIcons = { ShieldCheck, Search };
