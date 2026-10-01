import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import portrait from "@/assets/portrait.png";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import resumePdf from "../pdf/Anal_Joseph_Resume 3 (1).pdf?url";
import {
  BlurText,
  CountUp,
  DrawLine,
  Magnet,
  ScrollReveal,
  ShinyText,
  SplitText,
  TiltedCard,
} from "@/components/anim";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anal Joseph — Data Scientist & Machine Learning Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Anal Joseph — Data Scientist & Machine Learning Engineer based in Bengaluru, India. Hands-on experience across predictive modeling, conversational AI prototypes, NLP pipelines, and interactive BI dashboards.",
      },
      {
        name: "keywords",
        content:
          "Anal Joseph, Data Scientist, Machine Learning Engineer, AI Engineer Bengaluru, Generative AI, NLP, Predictive Modeling, Power BI, Python, Scikit-learn, PyTorch, Google Cloud, MongoDB, Luminar Technolab, Ziuke Infotech",
      },
      { name: "author", content: "Anal Joseph" },
      { name: "creator", content: "Anal Joseph" },
      { name: "publisher", content: "Anal Joseph" },
      {
        name: "robots",
        content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      { name: "geo.region", content: "IN-KA" },
      { name: "geo.placename", content: "Bengaluru" },
      { name: "geo.position", content: "12.9716;77.5946" },
      { name: "ICBM", content: "12.9716, 77.5946" },
      { property: "og:site_name", content: "Anal Joseph Portfolio" },
      { property: "og:title", content: "Anal Joseph — Data Scientist & Machine Learning Engineer" },
      {
        property: "og:description",
        content:
          "Explore the Data Science & ML portfolio of Anal Joseph. Featuring predictive analytics, generative AI prototypes, interactive BI dashboards, and end-to-end machine learning engineering.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "https://anal-joseph.vercel.app/" },
      { property: "og:image", content: "https://anal-joseph.vercel.app/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Anal Joseph — Data Scientist & Machine Learning Engineer Portfolio",
      },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Anal Joseph — Data Scientist & Machine Learning Engineer",
      },
      {
        name: "twitter:description",
        content:
          "Explore the Data Science & ML portfolio of Anal Joseph. Featuring predictive analytics, generative AI prototypes, interactive BI dashboards, and end-to-end machine learning engineering.",
      },
      { name: "twitter:image", content: "https://anal-joseph.vercel.app/og-image.png" },
      {
        name: "twitter:image:alt",
        content: "Anal Joseph — Data Scientist & Machine Learning Engineer Portfolio",
      },
    ],
    links: [{ rel: "canonical", href: "https://anal-joseph.vercel.app/" }],
  }),
  component: Portfolio,
});

/* ---------------------------------------------------------- hooks */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCursor() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className =
      "pointer-events-none fixed z-[100] top-0 left-0 h-1.5 w-1.5 rounded-full bg-accent -translate-x-1/2 -translate-y-1/2";
    ring.className =
      "pointer-events-none fixed z-[100] top-0 left-0 h-9 w-9 rounded-full border border-platinum/40 -translate-x-1/2 -translate-y-1/2 transition-[width,height,border-color,background-color] duration-300 ease-out";
    ring.style.transitionProperty = "width,height,border-color,background-color,opacity";
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let tx = 0,
      ty = 0,
      rx = 0,
      ry = 0;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      dot.style.transform = `translate(${tx}px, ${ty}px) translate(-50%,-50%)`;
    };
    const loop = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a,button,[data-cursor='hover']")) {
        ring.style.width = "56px";
        ring.style.height = "56px";
        ring.style.borderColor = "var(--accent)";
        ring.style.backgroundColor = "color-mix(in oklab, var(--accent) 8%, transparent)";
      } else {
        ring.style.width = "36px";
        ring.style.height = "36px";
        ring.style.borderColor = "color-mix(in oklab, var(--platinum) 40%, transparent)";
        ring.style.backgroundColor = "transparent";
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      dot.remove();
      ring.remove();
    };
  }, []);
}

function useCounter(target: number, start: boolean, duration = 1600) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return n;
}

/* ---------------------------------------------------------- data */

const ACCENTS = [
  { name: "Gold", value: "oklch(0.78 0.115 78)", soft: "oklch(0.78 0.115 78 / 0.16)" },
  { name: "Cyan", value: "oklch(0.74 0.13 220)", soft: "oklch(0.74 0.13 220 / 0.16)" },
  { name: "Rose", value: "oklch(0.75 0.14 24)", soft: "oklch(0.75 0.14 24 / 0.16)" },
] as const;

const NAV = [
  ["Work", "work"],
  ["Experience", "timeline"],
  ["Skills", "skills"],
  ["Certifications", "writing"],
  ["Contact", "contact"],
] as const;

const PROJECTS = [
  {
    n: "01",
    year: "2026",
    title: "Predictive Analytics Model Development",
    tagline:
      "High-accuracy predictive machine learning models built to forecast business metrics and optimize decision-making at scale.",
    image: project3,
    problem:
      "Enterprise business operations required predictive analytics solutions capable of anticipating trends accurately rather than relying on static estimations.",
    solution:
      "Built and tuned machine learning models using Python, Scikit-learn, and XGBoost; applied structured data pipelines with Pandas, NumPy, and SQL to clean data and cut prep time by 20%.",
    stack: ["Python", "Scikit-Learn", "XGBoost", "Pandas", "NumPy", "SQL", "Feature Engineering"],
    impact: [
      "90% Prediction Accuracy",
      "12% Improvement Over Baseline",
      "20% Reduction In Data Prep Time",
      "Structured Multi-Model Validation",
    ],
    links: { github: "https://github.com/anal96", demo: "#" },
  },
  {
    n: "02",
    year: "2026",
    title: "NLP & Conversational AI Prototype",
    tagline:
      "End-to-end NLP classification and conversational AI system integrating Hugging Face transformer models, LangChain, and OpenAI API.",
    image: project1,
    problem:
      "Automated analysis was needed to classify unstructured user text feedback, analyze sentiment, and provide conversational query assistance quickly.",
    solution:
      "Developed NLP prototypes with Hugging Face and LangChain for text classification and sentiment analysis; integrated OpenAI API to enable real-world conversational workflows.",
    stack: ["Hugging Face", "LangChain", "OpenAI API", "Python", "Transformers", "NLP"],
    impact: [
      "85% - 87% Classification Accuracy",
      "Evaluated Across 500+ Test Samples",
      "20% Cut In Average Response Handling Time",
      "Context-Aware Conversational Pipelines",
    ],
    links: { github: "https://github.com/anal96", demo: "#" },
  },
  {
    n: "03",
    year: "2026",
    title: "Interactive BI & Analytics Dashboards",
    tagline:
      "Enterprise intelligence dashboards transforming 10,000 to 100,000+ records into executive insights and automated reporting.",
    image: project2,
    problem:
      "Fragmented data across teams caused manual reporting delays, making it challenging for leaders to surface actionable insights in real time.",
    solution:
      "Performed structured data analysis using Pandas, NumPy, and SQL, and engineered interactive, visually rich dashboards in Tableau and Power BI.",
    stack: ["Tableau", "Power BI", "SQL", "Pandas", "NumPy", "EDA", "Data Visualization"],
    impact: [
      "30% Reduction In Manual Reporting Time",
      "10k to 100k+ Records Analyzed",
      "Used By 15+ Stakeholders",
      "Real-Time Business KPI Visibility",
    ],
    links: { github: "https://github.com/anal96", demo: "#" },
  },
  {
    n: "04",
    year: "2026",
    title: "AI CRM & Learning Platform",
    tagline:
      "Enterprise SaaS platform integrating CRM, role-based management, secure JWT authentication, and AI-powered learning workflows.",
    image: project1,
    problem:
      "Teams needed one platform that could manage customer relationships, learning content, and secure role-based access without fragmented tooling.",
    solution:
      "Built an AI-ready SaaS architecture with secure authentication, role-based management, streaming capabilities, and dashboard analytics.",
    stack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS"],
    impact: [
      "Role-Based Architecture",
      "Secure JWT Authentication",
      "AI-Ready Infrastructure",
      "Dashboard Analytics",
    ],
    links: { github: "https://github.com/anal96", demo: "#" },
  },
  {
    n: "05",
    year: "2026",
    title: "Attend Ease — Enterprise HRMS",
    tagline:
      "Full-stack workforce management system featuring automated attendance, leave tracking, and executive analytics.",
    image: project2,
    problem:
      "Organizations needed a clean, role-aware workforce platform for tracking attendance, leave, and internal team workflows.",
    solution:
      "Delivered a full-stack HRMS with email automation, reports, role-based dashboards, and a responsive workflow-first interface.",
    stack: ["React", "TypeScript", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    impact: [
      "Attendance & Leave Management",
      "Work-From-Home Tracking",
      "Email Automation & Alerts",
      "Role-Based Dashboards",
    ],
    links: { github: "https://github.com/anal96", demo: "#" },
  },
] as const;

const CAPABILITIES = [
  {
    group: "Machine Learning & DL",
    items: [
      "Scikit-learn & XGBoost",
      "TensorFlow & PyTorch",
      "Predictive Modeling",
      "Model Evaluation & Tuning",
    ],
  },
  {
    group: "NLP & Generative AI",
    items: [
      "Hugging Face & Transformers",
      "LangChain Workflows",
      "OpenAI API Integration",
      "Sentiment & Text Classification",
    ],
  },
  {
    group: "Data Analysis & BI",
    items: [
      "Pandas & NumPy",
      "Tableau & Power BI",
      "Exploratory Data Analysis (EDA)",
      "Interactive Dashboards",
    ],
  },
  {
    group: "Programming & SQL",
    items: ["Python", "SQL (Query Optimization)", "TypeScript & JavaScript", "Git-Based Workflows"],
  },
  {
    group: "Cloud & Storage",
    items: [
      "Google Cloud Platform (GCP)",
      "Amazon Web Services (AWS)",
      "Cloud Model Training",
      "Data Storage Pipelines",
    ],
  },
  {
    group: "Databases & Backends",
    items: ["MongoDB", "Relational Databases", "RESTful APIs", "Database Monitoring"],
  },
  {
    group: "Full-Stack Development",
    items: ["React & Vite", "Node.js & Express", "Tailwind CSS", "Enterprise UI/UX"],
  },
  {
    group: "Engineering Discipline",
    items: [
      "Lifecycle Data Preprocessing",
      "Feature Engineering",
      "Ticket Resolution & Bug Triage",
      "Stakeholder Decision Support",
    ],
  },
];

const TECH = [
  "Python",
  "SQL",
  "Scikit-Learn",
  "XGBoost",
  "TensorFlow",
  "PyTorch",
  "Hugging Face",
  "LangChain",
  "OpenAI API",
  "Pandas",
  "NumPy",
  "Tableau",
  "Power BI",
  "Exploratory Data Analysis (EDA)",
  "Google Cloud (GCP)",
  "AWS",
  "MongoDB",
  "TypeScript",
  "Git",
  "GitHub",
  "Figma",
  "React",
  "Node.js",
  "Express",
  "Tailwind CSS",
  "Docker",
];

const EXPERIENCE = [
  {
    year: "April 2026 — Present",
    role: "Data Science Intern",
    company: "Luminar Technolab",
    location: "Thrissur (Onsite)",
    note: "Worked across the full data science lifecycle — data preprocessing, feature engineering, model building, analytics, and dashboard development to support business decision-making.",
    tools: [
      "Python",
      "SQL",
      "Scikit-learn",
      "XGBoost",
      "Hugging Face",
      "LangChain",
      "Tableau",
      "Pandas",
      "Git",
      "AWS",
      "GCP",
    ],
    metric: "+9% model accuracy • 30% reporting time cut • 15+ stakeholders",
    highlights: [
      "Built and optimized 3-4 machine learning models for predictive analytics using Python, Scikit-learn, and XGBoost, improving prediction accuracy by 9% over baseline models.",
      "Performed structured data analysis on datasets of 10,000-100,000+ records using Pandas, NumPy, and SQL, and designed interactive dashboards in Tableau and Power BI, reducing manual reporting time by 30% for 15+ stakeholders.",
      "Built NLP and conversational AI prototypes with Hugging Face, LangChain, and OpenAI API for sentiment analysis and text classification, reaching 87% classification accuracy across 500+ test samples.",
      "Used Git for version control across model iterations and collaborated using AWS/GCP cloud environments for model training and data storage.",
    ],
  },
  {
    year: "January 2026 — April 2026",
    role: "Project Associate",
    company: "Ziuke Infotech Pvt. Ltd.",
    location: "Thrissur (Onsite)",
    note: "Contributed to a live development team on a contract basis, supporting feature delivery, bug resolution across assigned project modules, and Git-based collaborative workflows.",
    tools: ["Git", "Module Delivery", "Bug Resolution", "Team Collaboration", "Code Quality"],
    metric: "20+ tickets resolved • 15% bug backlog reduction",
    highlights: [
      "Contributed to a live development team on a contract basis, supporting feature delivery and bug resolution across assigned project modules, resolving 20+ tickets and reducing bug backlog by 15%.",
      "Collaborated cross-functionally with developers and project stakeholders using Git-based workflows to deliver assigned project work on schedule.",
    ],
  },
];

const WRITING = [
  {
    kind: "Google Cloud",
    title: "A Tour of Google Cloud — Hands-on Labs",
    venue: "Hands-on Labs Certification",
    description:
      "Completed hands-on labs covering core Google Cloud Platform (GCP) services, cloud infrastructure, and data workflows.",
  },
  {
    kind: "MongoDB",
    title: "Monitoring MongoDB with Built-in Tools",
    venue: "Database Certification",
    description:
      "Certification covering database performance monitoring, query diagnostics, and system optimization using MongoDB's built-in tooling.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Technology should not simply automate tasks. It should amplify human intelligence, improve decision-making, and create measurable business value.",
    name: "Philosophy",
    role: "Build with purpose",
  },
  {
    quote:
      "Every product I build begins with one question: How can AI make this simpler, faster, and smarter?",
    name: "Principle",
    role: "Measure the outcome",
  },
  {
    quote:
      "I enjoy combining data science with software engineering to build products that people actually use.",
    name: "Approach",
    role: "Practical AI delivery",
  },
];

/* ---------------------------------------------------------- component */

function Portfolio() {
  useReveal();
  useCursor();

  const [accent, setAccent] = useState<(typeof ACCENTS)[number]>(ACCENTS[0]);
  const [loading, setLoading] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 1600);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
      if (event.key === "Escape") setPaletteOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const accentStyle = {
    ["--accent" as string]: accent.value,
    ["--accent-soft" as string]: accent.soft,
  } as CSSProperties;

  return (
    <div
      className="relative min-h-screen overflow-x-clip bg-background text-foreground selection:bg-accent selection:text-background"
      style={accentStyle}
    >
      <LoadingScreen visible={loading} />
      <ScrollProgress />
      <BackgroundLights />
      <Nav accent={accent} onAccentChange={setAccent} onOpenPalette={() => setPaletteOpen(true)} />
      <main className="relative z-10">
        <Hero onOpenPalette={() => setPaletteOpen(true)} />
        <Marquee />
        <Work />
        <Timeline />
        <TechWall />
        <Skills />
        <Stats />
        <Writing />
        <Testimonials />
        <Education />
        <Contact onToast={setToast} />
      </main>
      <DockNavigation />
      <FloatingActionButton onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <Footer />
      {toast ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          className="fixed bottom-6 left-1/2 z-[120] -translate-x-1/2 rounded-full border border-white/10 bg-black/70 px-4 py-2 text-[12px] uppercase tracking-[0.24em] text-bone shadow-[0_20px_60px_-25px_rgba(0,0,0,0.8)] backdrop-blur-xl"
        >
          {toast}
        </motion.div>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------- background */

function BackgroundLights() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute -top-40 -left-40 h-[42rem] w-[42rem] rounded-full drift-light"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--accent) 18%, transparent), transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="absolute top-1/3 -right-60 h-[38rem] w-[38rem] rounded-full drift-light"
        style={{
          animationDelay: "-6s",
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--platinum) 12%, transparent), transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full drift-light"
        style={{
          animationDelay: "-3s",
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--accent) 10%, transparent), transparent 70%)",
          filter: "blur(110px)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_30%)]" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)",
        }}
      />
      {[
        "top-[8%] left-[14%]",
        "top-[28%] left-[72%]",
        "bottom-[18%] left-[21%]",
        "bottom-[10%] right-[12%]",
      ].map((position, index) => (
        <span
          key={position}
          className={`ambient-dot ${position}`}
          style={{ animationDelay: `${index * 1.2}s`, opacity: 0.4 + index * 0.1 }}
        />
      ))}
    </div>
  );
}

/* ---------------------------------------------------------- nav */

function Nav({
  accent,
  onAccentChange,
  onOpenPalette,
}: {
  accent: (typeof ACCENTS)[number];
  onAccentChange: (accent: (typeof ACCENTS)[number]) => void;
  onOpenPalette: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "border-b border-white/10 bg-background/70 backdrop-blur-2xl" : "bg-transparent",
      ].join(" ")}
    >
      <div className="container-lux flex h-16 items-center justify-between gap-3">
        <a href="#top" className="group flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-[10px] font-mono text-accent backdrop-blur-xl">
            AJ
          </span>
          <span className="hidden sm:block text-sm tracking-wide text-bone">
            Anal Joseph
            <span className="ml-2 text-muted-foreground">/ Data Scientist</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-[13px] tracking-wide text-platinum transition-colors hover:text-bone magnetic"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenPalette}
            className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] uppercase tracking-[0.24em] text-platinum backdrop-blur-xl"
          >
            ⌘K
          </button>
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-2 backdrop-blur-xl md:flex">
            {ACCENTS.map((option) => (
              <button
                key={option.name}
                type="button"
                aria-label={`Accent ${option.name}`}
                onClick={() => onAccentChange(option)}
                className={`h-5 w-5 rounded-full border transition-all ${accent.name === option.name ? "scale-110 border-bone" : "border-transparent"}`}
                style={{ backgroundColor: option.value }}
              />
            ))}
          </div>
          <a
            href="#contact"
            className="magnetic hidden md:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[12px] tracking-wider uppercase text-bone backdrop-blur-xl hover:border-accent hover:text-accent"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Contact Me
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------- hero */

function Hero({ onOpenPalette }: { onOpenPalette: () => void }) {
  return (
    <section id="top" className="relative pt-28 pb-20 sm:pt-36 lg:pt-52 lg:pb-40">
      <div className="container-lux">
        <div className="flex flex-col gap-12 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-end">
          <div className="w-full min-w-0 lg:col-span-8">
            <ScrollReveal className="flex items-center gap-3 eyebrow mb-10">
              <span className="h-px w-10 bg-accent" />
              <ShinyText speed={6}>Data Scientist • ML, Generative AI & BI</ShinyText>
            </ScrollReveal>
            <h1 className="font-display text-[11vw] leading-[0.9] tracking-[-0.035em] text-bone sm:text-[9vw] lg:text-[7.5vw]">
              <SplitText text="My work" />
              <br />
              <SplitText text="transforms" delay={0.1} />{" "}
              <em className="italic text-accent font-light">
                <SplitText text="raw data" delay={0.25} />
              </em>
              <br />
              <SplitText text="into intelligent" delay={0.4} />
              <br />
              <SplitText text="products." delay={0.6} />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 1.4 }}
                className="ml-2 inline-block h-[0.85em] w-[0.06em] translate-y-[0.05em] bg-accent align-baseline"
              />
            </h1>

            <ScrollReveal delay={0.2} className="mt-14 flex flex-col gap-6 max-w-3xl md:grid md:grid-cols-12">
              <p className="w-full min-w-0 md:col-span-8 text-[15px] leading-relaxed text-platinum">
                I'm <span className="text-bone">Anal Joseph</span>, a Data Scientist based in
                Bengaluru with hands-on experience in Machine Learning, Generative AI, NLP, and
                Business Intelligence. Skilled in Python, SQL, Scikit-learn, XGBoost, TensorFlow,
                PyTorch, Hugging Face, and LangChain, building high-accuracy models and interactive
                dashboards for 15+ stakeholders.
              </p>
              <div className="w-full min-w-0 md:col-span-4 space-y-2 text-[12px] font-mono text-muted-foreground">
                <div className="flex justify-between border-b border-line pb-1">
                  <span>Based</span>
                  <span className="text-bone">Bengaluru, KA</span>
                </div>
                <div className="flex justify-between border-b border-line pb-1">
                  <span>Phone</span>
                  <span className="text-bone">+91 7558056329</span>
                </div>
                <div className="flex justify-between border-b border-line pb-1">
                  <span>Focus</span>
                  <span className="text-bone">Data Science & ML</span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="text-accent">Open to Work</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal
              delay={0.35}
              className="mt-10 flex flex-col flex-wrap items-start gap-3 sm:mt-12 sm:flex-row sm:items-center sm:gap-4"
            >
              <Magnet>
                <a
                  href="#work"
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-bone px-6 py-3.5 text-[13px] font-medium tracking-wider uppercase text-background transition-colors duration-300 hover:bg-accent sm:w-auto"
                >
                  Explore My Work
                  <span className="transition-transform group-hover:translate-x-1">↗</span>
                </a>
              </Magnet>
              <Magnet>
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-[13px] tracking-wider uppercase text-bone backdrop-blur-xl transition-colors duration-300 hover:border-accent hover:text-accent sm:w-auto"
                >
                  View Case Studies
                </a>
              </Magnet>
              <Magnet>
                <a
                  href={resumePdf}
                  download="Anal_Joseph_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-[13px] tracking-wider uppercase text-platinum backdrop-blur-xl transition-colors duration-300 hover:border-accent hover:text-accent sm:w-auto"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Download Resume
                </a>
              </Magnet>
              <button
                type="button"
                onClick={onOpenPalette}
                className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-[13px] tracking-wider uppercase text-platinum backdrop-blur-xl transition-colors duration-300 hover:border-accent hover:text-accent sm:w-auto"
              >
                Quick Links (⌘K)
              </button>
            </ScrollReveal>
          </div>

          <div className="w-full min-w-0 lg:col-span-4">
            <ScrollReveal delay={0.15}>
              <TiltedCard className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-graphite shadow-[0_30px_120px_-50px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
                <img
                  src={portrait}
                  alt="Portrait of Anal Joseph"
                  width={1024}
                  height={1280}
                  fetchPriority="high"
                  className="h-full w-full object-cover object-center grayscale transition-all duration-[1200ms] hover:scale-[1.04] hover:grayscale-0 sm:object-[50%_18%]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/20" />
                <div className="pointer-events-none absolute inset-4 rounded-[1.4rem] border border-white/10" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 font-mono text-[10px] uppercase tracking-[0.24em] text-platinum">
                  <span>Studio Portrait</span>
                  <span>N°014</span>
                </figcaption>
              </TiltedCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- marquee */

function Marquee() {
  const words = [
    "Data Science",
    "Predictive Modeling",
    "Machine Learning",
    "Generative AI",
    "NLP & Transformers",
    "Business Intelligence",
    "Tableau & Power BI",
    "Feature Engineering",
  ];
  const track = [...words, ...words];
  return (
    <section aria-hidden className="relative border-y border-line py-8 overflow-hidden">
      <div className="flex marquee-track whitespace-nowrap">
        {track.map((w, i) => (
          <span
            key={i}
            className="flex items-center gap-10 pr-10 font-display text-[3rem] lg:text-[4.5rem] tracking-[-0.03em] text-titanium/70"
          >
            {w}
            <span className="h-2 w-2 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- work */

function Work() {
  return (
    <section id="work" className="relative py-24 sm:py-28 lg:py-44">
      <div className="container-lux">
        <SectionHeader
          eyebrow="§ 01 — Selected Work"
          title={
            <>
              Featured builds from
              <br />
              <em className="italic text-accent font-light">real data & product work.</em>
            </>
          }
          right="Predictive analytics, conversational AI prototypes, interactive BI dashboards, and enterprise platforms shaped around measurable business results."
        />

        <div className="mt-14 space-y-16 sm:mt-20 lg:mt-24 lg:space-y-40">
          {PROJECTS.map((p, i) => (
            <ProjectCase key={p.n} p={p} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCase({ p, flip }: { p: (typeof PROJECTS)[number]; flip: boolean }) {
  return (
    <article className="reveal flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-12">
      <div className={`w-full min-w-0 lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <TiltedCard
          max={6}
          className="group relative aspect-[16/10] overflow-hidden rounded-sm border border-line bg-graphite shadow-[var(--shadow-elevated)]"
        >
          <img
            src={p.image}
            alt={p.title}
            width={1600}
            height={1000}
            loading="lazy"
            data-cursor="hover"
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-background/40 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-4 border border-bone/10" />
          <span className="absolute left-5 top-5 font-mono text-[10px] tracking-widest uppercase text-platinum">
            Case Study — {p.n}
          </span>
          <span className="absolute right-5 top-5 font-mono text-[10px] tracking-widest uppercase text-accent">
            {p.year}
          </span>
        </TiltedCard>
      </div>

      <div
        className={`w-full min-w-0 lg:col-span-5 flex flex-col ${
          flip ? "lg:order-1 lg:pr-6" : "lg:pl-6"
        }`}
      >
        <h3 className="font-display text-3xl leading-[1] tracking-[-0.03em] text-bone sm:text-4xl lg:text-5xl">
          {p.title}
        </h3>
        <p className="mt-6 text-[15px] leading-relaxed text-platinum">{p.tagline}</p>

        <dl className="mt-10 space-y-6 text-sm">
          <Row label="Problem">{p.problem}</Row>
          <Row label="Solution">{p.solution}</Row>
          <Row label="Stack">
            <div className="flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-line px-2.5 py-0.5 text-[11px] font-mono text-platinum"
                >
                  {s}
                </span>
              ))}
            </div>
          </Row>
          <Row label="Impact">
            <ul className="space-y-1.5">
              {p.impact.map((it) => (
                <li key={it} className="flex items-center gap-3 text-bone">
                  <span className="h-px w-4 bg-accent" />
                  {it}
                </li>
              ))}
            </ul>
          </Row>
        </dl>

        <div className="mt-10 flex flex-wrap items-center gap-4 text-[12px] tracking-widest uppercase sm:gap-6">
          <a
            href={p.links.demo}
            className="magnetic group inline-flex items-center gap-2 text-bone hover:text-accent"
          >
            Live Demo
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href={p.links.github}
            className="magnetic inline-flex items-center gap-2 text-platinum hover:text-accent"
          >
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[6rem_1fr] gap-1.5 sm:gap-4 border-t border-line pt-4">
      <dt className="eyebrow pt-1">{label}</dt>
      <dd className="text-platinum leading-relaxed min-w-0">{children}</dd>
    </div>
  );
}

/* ---------------------------------------------------------- timeline */

function Timeline() {
  return (
    <section id="timeline" className="relative py-24 sm:py-28 lg:py-44 border-t border-line">
      <div className="container-lux">
        <SectionHeader
          eyebrow="§ 02 — Experience"
          title={
            <>
              Experience delivering
              <br />
              <em className="italic text-accent font-light">data science in production.</em>
            </>
          }
          right="Hands-on experience across the entire data science lifecycle, predictive modeling, NLP prototypes, BI dashboards, and agile software delivery."
        />

        <div className="relative mt-24">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-line md:-translate-x-1/2" />
          <ol className="space-y-16 md:space-y-24">
            {EXPERIENCE.map((e, i) => (
              <li
                key={e.company}
                className={`reveal relative grid grid-cols-1 gap-8 items-start md:grid-cols-2 ${
                  i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
                }`}
              >
                <div
                  className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-16" : "md:pl-16"}`}
                >
                  <div className="eyebrow text-accent">{e.year}</div>
                  <h4 className="mt-3 font-display text-2xl leading-[1.05] tracking-[-0.02em] text-bone sm:text-3xl lg:text-4xl">
                    {e.role}
                  </h4>
                  <div className="mt-2 text-sm text-platinum">
                    {e.company} <span className="text-muted-foreground">— {e.location}</span>
                  </div>
                  <p
                    className={`mt-5 text-[14px] leading-relaxed text-platinum max-w-xl ${
                      i % 2 === 0 ? "md:ml-auto" : ""
                    }`}
                  >
                    {e.note}
                  </p>

                  {e.highlights && (
                    <ul
                      className={`mt-4 space-y-2 text-[13px] text-platinum/90 max-w-xl ${
                        i % 2 === 0 ? "md:ml-auto md:text-left" : ""
                      }`}
                    >
                      {e.highlights.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                          <span className="leading-relaxed">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {e.tools && (
                    <div
                      className={`mt-5 flex flex-wrap gap-1.5 ${
                        i % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      {e.tools.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-line bg-card/60 px-2.5 py-0.5 text-[11px] font-mono text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div
                    className={`mt-6 inline-flex items-center gap-3 rounded-full border border-accent/40 bg-accent-soft px-4 py-1.5 text-[12px] font-mono text-accent`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {e.metric}
                  </div>
                </div>
                <div className="hidden md:block" />
                <span className="absolute left-4 md:left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-background ring-1 ring-accent">
                  <span className="absolute inset-1 rounded-full bg-accent" />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- tech wall */

function TechWall() {
  const row = [...TECH, ...TECH];
  return (
    <section className="relative overflow-hidden border-t border-line py-20 sm:py-24">
      <div className="container-lux mb-10">
        <div className="eyebrow">§ 03 — Featured Technologies</div>
      </div>
      <div className="space-y-6">
        <div className="flex marquee-track gap-4 whitespace-nowrap">
          {row.map((t, i) => (
            <TechChip key={`a${i}`} label={t} />
          ))}
        </div>
        <div
          className="flex marquee-track gap-4 whitespace-nowrap"
          style={{ animationDirection: "reverse", animationDuration: "55s" }}
        >
          {row.map((t, i) => (
            <TechChip key={`b${i}`} label={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TechChip({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-3 rounded-sm border border-line bg-card px-5 py-3 text-[13px] tracking-wide text-platinum shadow-[var(--shadow-inset-line)]">
      <span className="h-1 w-1 rounded-full bg-accent" />
      {label}
    </span>
  );
}

/* ---------------------------------------------------------- skills */

function Skills() {
  return (
    <section id="skills" className="relative border-t border-line py-24 sm:py-28 lg:py-44">
      <div className="container-lux">
        <SectionHeader
          eyebrow="§ 04 — Core Expertise"
          title={
            <>
              Built to solve
              <br />
              <em className="italic text-accent font-light">real business problems.</em>
            </>
          }
          right="Artificial intelligence, machine learning, data science and product engineering skills arranged around practical delivery rather than tool collecting."
        />
        <div className="mt-14 grid grid-cols-1 gap-px border border-line bg-line sm:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((c, i) => (
            <div
              key={c.group}
              className="reveal group bg-background p-8 lg:p-10 transition-colors hover:bg-card"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px w-6 bg-line group-hover:bg-accent transition-colors" />
              </div>
              <h4 className="mt-6 font-display text-2xl text-bone tracking-[-0.02em]">{c.group}</h4>
              <ul className="mt-6 space-y-2 text-[13px] text-platinum">
                {c.items.map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-accent/70" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- stats */

function Stats() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setOn(true)),
      { threshold: 0.3 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const stats = [
    { label: "Predictive Model Accuracy", value: 90, suffix: "%" },
    { label: "Reporting Time Reduced", value: 30, suffix: "%" },
    { label: "Records Analyzed & Modeled", value: 100, suffix: "K+" },
    { label: "NLP Classification Accuracy", value: 87, suffix: "%" },
    { label: "Stakeholders Supported", value: 15, suffix: "+" },
    { label: "Production Tickets Resolved", value: 20, suffix: "+" },
  ];

  return (
    <section ref={ref} className="relative border-t border-line bg-ink/40 py-24 sm:py-28">
      <div className="container-lux">
        <div className="eyebrow mb-16">§ 05 — Impact & Metrics</div>
        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) => (
            <Stat key={s.label} {...s} on={on} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  suffix,
  on,
}: {
  label: string;
  value: number;
  suffix: string;
  on: boolean;
}) {
  const n = useCounter(value, on);
  return (
    <div className="bg-background p-8 lg:p-10">
      <div className="font-display text-5xl lg:text-6xl text-bone tracking-[-0.04em]">
        {n.toLocaleString()}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="mt-4 eyebrow">{label}</div>
    </div>
  );
}

/* ---------------------------------------------------------- writing */

function Writing() {
  return (
    <section id="writing" className="relative border-t border-line py-24 sm:py-28 lg:py-44">
      <div className="container-lux">
        <SectionHeader
          eyebrow="§ 06 — Certifications"
          title={
            <>
              Learning,
              <br />
              <em className="italic text-accent font-light">validated.</em>
            </>
          }
          right="Selected certifications that back up practical data science and database engineering with formal credentialing."
        />
        <div className="mt-20 border-t border-line">
          {WRITING.map((w, i) => (
            <div
              key={i}
              className="reveal group grid grid-cols-1 items-start gap-4 border-b border-line py-8 transition-colors hover:bg-card/50 sm:grid-cols-12 sm:items-center sm:gap-6"
            >
              <div className="sm:col-span-3 md:col-span-3 eyebrow text-accent">{w.kind}</div>
              <div className="sm:col-span-9 md:col-span-6">
                <h4 className="font-display text-2xl tracking-[-0.02em] text-bone transition-colors group-hover:text-accent md:text-3xl">
                  {w.title}
                </h4>
                <p className="mt-2 text-sm text-platinum leading-relaxed">{w.description}</p>
              </div>
              <div className="sm:col-span-12 md:col-span-3 text-[12px] font-mono text-muted-foreground md:text-right">
                {w.venue}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- testimonials */

function Testimonials() {
  return (
    <section className="relative border-t border-line py-24 sm:py-28">
      <div className="container-lux">
        <div className="eyebrow mb-14">§ 07 — Philosophy</div>
        <div className="-mx-6 overflow-x-auto no-scrollbar">
          <div className="flex gap-6 px-6 min-w-max">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={i}
                className="reveal w-[19rem] shrink-0 rounded-[1.5rem] border border-line bg-card p-8 shadow-[var(--shadow-inset-line)] sm:w-[22rem] sm:p-10 md:w-[28rem]"
              >
                <span className="font-display text-6xl text-accent leading-none">"</span>
                <blockquote className="mt-4 font-display text-2xl leading-[1.2] text-bone tracking-[-0.015em]">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-10 flex items-center justify-between border-t border-line pt-5 text-[12px]">
                  <span className="text-bone">{t.name}</span>
                  <span className="font-mono uppercase tracking-widest text-muted-foreground">
                    {t.role}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- education */

function Education() {
  return (
    <section className="relative border-t border-line py-24 sm:py-28 lg:py-44">
      <div className="container-lux">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-12 lg:gap-8 items-start lg:items-center">
          <div className="w-full min-w-0 lg:col-span-5">
            <div className="eyebrow mb-8">§ 08 — Education</div>
            <h2 className="font-display text-4xl leading-[0.95] tracking-[-0.035em] text-bone sm:text-5xl lg:text-7xl">
              Trained to build
              <br />
              <em className="italic text-accent font-light">practical intelligence</em>.
            </h2>
            <p className="mt-8 text-[15px] text-platinum leading-relaxed max-w-md">
              Bachelor of Computer Applications (BCA) in Computer Programming from Indira Gandhi
              National Open University, providing a solid foundation in programming, software
              engineering, databases, and applied data science.
            </p>
          </div>
          <div className="w-full min-w-0 lg:col-span-7 space-y-6">
            {[
              {
                year: "January 2023 — December 2025",
                degree: "BCA — Computer Programming",
                school: "Indira Gandhi National Open University",
                note: "Curriculum focused on Computer Programming, Data Structures, Software Engineering, Database Systems, Machine Learning, and Data Science.",
              },
            ].map((e, i) => (
              <div
                key={i}
                className="reveal group flex flex-col gap-4 border-t border-line pt-6 sm:grid sm:grid-cols-12 sm:gap-6"
              >
                <div className="w-full min-w-0 sm:col-span-4 eyebrow text-accent">{e.year}</div>
                <div className="w-full min-w-0 sm:col-span-8">
                  <div className="font-display text-2xl sm:text-3xl text-bone tracking-[-0.02em]">
                    {e.degree}
                  </div>
                  <div className="mt-2 text-sm text-platinum">{e.school}</div>
                  <p className="mt-3 text-[13px] text-muted-foreground">{e.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- contact */

function SentAnimationTick() {
  return (
    <div className="relative mb-6 flex items-center justify-center">
      {/* Outer ambient glow pulse */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [1, 1.3, 1.05], opacity: [0.3, 0.65, 0.25] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-28 w-28 rounded-full bg-accent/25 blur-2xl"
      />

      {/* Pulsing ripple rings */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0.8 }}
        animate={{ scale: 1.6, opacity: 0 }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.1 }}
        className="absolute h-20 w-20 rounded-full border border-accent/40"
      />
      <motion.div
        initial={{ scale: 0.7, opacity: 0.6 }}
        animate={{ scale: 2.1, opacity: 0 }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
        className="absolute h-20 w-20 rounded-full border border-accent/25"
      />

      {/* Main check badge */}
      <motion.div
        initial={{ scale: 0, rotate: -25, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 18,
          delay: 0.05,
        }}
        className="relative grid h-20 w-20 place-items-center rounded-full border border-accent/70 bg-gradient-to-b from-accent/20 via-card to-card shadow-[0_0_40px_rgba(208,245,71,0.25)]"
      >
        <svg
          viewBox="0 0 64 64"
          className="h-14 w-14 text-accent"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Animated circular outline drawing */}
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          />
          {/* Animated checkmark ticking stroke */}
          <motion.path
            d="M20 32.5L28.5 41L44 23"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 0.45,
              delay: 0.45,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
        </svg>

        {/* Orbiting sparkles / particles */}
        {[
          { x: 26, y: -24, delay: 0.7 },
          { x: 28, y: 22, delay: 0.8 },
          { x: -28, y: 20, delay: 0.9 },
          { x: -24, y: -26, delay: 0.75 },
        ].map((pt, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
            animate={{ scale: [0, 1.2, 0.8], opacity: [0, 1, 0.6], x: pt.x, y: pt.y }}
            transition={{ delay: pt.delay, duration: 0.6, ease: "easeOut" }}
            className="absolute h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_#d0f547]"
          />
        ))}
      </motion.div>
    </div>
  );
}

function Contact({ onToast }: { onToast: (message: string) => void }) {
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    engagement: "Full Build",
    brief: "",
  });

  const email = "analjoseph9744@gmail.com";
  const phone = "+91 7558056329";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      onToast("Email copied: analjoseph9744@gmail.com");
    } catch {
      onToast("Copy failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.brief.trim()) {
      onToast("Please complete your Name, Email, and Brief");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/mzezwqgj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || "Not specified",
          engagement: formData.engagement,
          message: formData.brief,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        onToast("Enquiry sent to analjoseph9744@gmail.com!");
        setFormData({
          name: "",
          email: "",
          company: "",
          engagement: "Full Build",
          brief: "",
        });
      } else {
        const result = await response.json().catch(() => null);
        const errorMsg =
          result?.errors?.map((err: { message: string }) => err.message).join(", ") ||
          "Failed to send message. Please try again.";
        onToast(errorMsg);
      }
    } catch {
      onToast("Network error. Please try again or email directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative border-t border-line py-20 sm:py-28 lg:py-44 overflow-hidden">
      <div className="container-lux">
        <div className="flex flex-col gap-12 lg:grid lg:grid-cols-12 lg:gap-10">
          <div className="w-full min-w-0 lg:col-span-6">
            <div className="eyebrow">§ 09 — Contact</div>
            <h2 className="mt-8 font-display text-4xl leading-[0.95] tracking-[-0.04em] text-bone sm:text-6xl lg:text-8xl">
              Let's build
              <br />
              intelligent solutions
              <br />
              <em className="italic text-accent font-light">together.</em>
            </h2>
            <p className="mt-10 max-w-md text-[15px] text-platinum leading-relaxed">
              I'm open to Data Science roles, Machine Learning Engineering, Generative AI &amp; NLP
              initiatives, BI Dashboard development, and high-impact analytics projects.
            </p>

            <dl className="mt-14 space-y-4 text-[13px]">
              {[
                { label: "Email", value: email, href: `mailto:${email}` },
                { label: "Phone", value: phone, href: "tel:+917558056329" },
                { label: "Location", value: "Bengaluru, Karnataka", href: undefined },
                {
                  label: "LinkedIn",
                  value: "linkedin.com/in/anal-joseph",
                  href: "https://linkedin.com/in/anal-joseph",
                },
                { label: "GitHub", value: "github.com/anal96", href: "https://github.com/anal96" },
              ].map(({ label, value, href }) => (
                <div
                  key={label}
                  className="flex flex-col gap-1 border-b border-line pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <dt className="eyebrow shrink-0">{label}</dt>
                  <dd className="text-bone min-w-0 break-words">
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="hover:text-accent transition-colors break-all sm:break-normal"
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={copyEmail}
                className="magnetic inline-flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-[12px] uppercase tracking-[0.24em] text-bone backdrop-blur-xl hover:border-accent hover:text-accent w-full sm:w-auto"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {copied ? "Copied" : "Copy Email"}
              </button>
              <a
                href={`mailto:${email}`}
                className="magnetic inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-[12px] uppercase tracking-[0.24em] text-platinum backdrop-blur-xl hover:border-accent hover:text-accent w-full sm:w-auto text-center"
              >
                Send Email ↗
              </a>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="submitted-card"
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="w-full min-w-0 flex flex-col items-center justify-center rounded-[1.5rem] border border-accent/40 bg-card p-8 text-center shadow-[var(--shadow-elevated)] sm:p-12 lg:col-span-6"
              >
                <SentAnimationTick />

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.35 }}
                  className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-widest text-accent"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  Delivered Directly
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.4 }}
                  className="mt-5 font-display text-3xl text-bone"
                >
                  Message Sent Successfully
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.4 }}
                  className="mt-4 max-w-md text-[14px] leading-relaxed text-platinum"
                >
                  Thank you! Your enquiry has been delivered directly to{" "}
                  <span className="font-semibold text-accent">{email}</span>. I will review it and
                  get back to you shortly.
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85, duration: 0.4 }}
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="magnetic mt-8 rounded-full border border-line bg-white/5 px-6 py-3 text-[12px] uppercase tracking-wider text-bone hover:border-accent hover:text-accent transition-colors"
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                action="https://formspree.io/f/mzezwqgj"
                method="POST"
                onSubmit={handleSubmit}
                className="reveal w-full min-w-0 rounded-[1.5rem] border border-line bg-card p-5 sm:p-8 lg:col-span-6 lg:p-12 shadow-[var(--shadow-elevated)]"
              >
                <div className="space-y-8">
                  <Field
                    label="Name"
                    name="name"
                    placeholder="Your full name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  />
                  <Field
                    label="Company"
                    name="company"
                    placeholder="Where you build (optional)"
                    value={formData.company}
                    onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                  />
                  <div>
                    <label className="eyebrow block mb-3">Engagement</label>
                    <div className="flex flex-wrap gap-2">
                      {["Advisory", "Prototype", "Full Build", "Research"].map((k) => (
                        <button
                          key={k}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, engagement: k }))}
                          className={`magnetic rounded-full border px-3.5 py-2 text-[11px] sm:text-[12px] sm:px-4 tracking-wider uppercase transition-all ${
                            formData.engagement === k
                              ? "border-accent bg-accent text-background font-medium"
                              : "border-line text-platinum hover:border-accent hover:text-accent"
                          }`}
                        >
                          {k}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="eyebrow block mb-3">Brief</label>
                    <textarea
                      rows={5}
                      required
                      value={formData.brief}
                      onChange={(e) => setFormData((prev) => ({ ...prev, brief: e.target.value }))}
                      placeholder="A paragraph is enough. What problem are you aiming to solve?"
                      className="w-full resize-none border-b border-line bg-transparent pb-3 text-[15px] text-bone placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="magnetic group inline-flex w-full items-center justify-between rounded-full bg-bone px-7 py-4 text-[12px] font-medium tracking-[0.2em] uppercase text-background transition-opacity hover:bg-accent disabled:opacity-60"
                  >
                    <span className="flex items-center gap-2">
                      {submitting && (
                        <svg
                          className="h-4 w-4 animate-spin text-background"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      )}
                      <span>{submitting ? "Transmitting..." : "Send Enquiry"}</span>
                    </span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow block mb-3">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border-b border-line bg-transparent pb-3 text-[15px] text-bone placeholder:text-muted-foreground focus:border-accent focus:outline-none"
      />
    </div>
  );
}

/* ---------------------------------------------------------- progress / dock / palette */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(0, { stiffness: 110, damping: 24 });
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => scaleX.set(value));
    return () => unsubscribe();
  }, [scaleX, scrollYProgress]);

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[120] h-[2px] origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}

function LoadingScreen({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 0.8, delay: 1.1 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.65 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl"
        >
          <div className="h-3 w-3 rounded-full bg-accent" />
        </motion.div>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-6 font-mono text-[11px] uppercase tracking-[0.32em] text-muted-foreground"
        >
          Initializing premium experience
        </motion.p>
      </div>
    </motion.div>
  );
}

function DockNavigation() {
  const items = [
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#timeline" },
    { label: "Skills", href: "#skills" },
    { label: "Certifications", href: "#writing" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 hidden md:block">
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-2xl">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="magnetic rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] uppercase tracking-[0.24em] text-platinum transition-colors hover:border-accent hover:text-accent"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function FloatingActionButton({ onOpenPalette }: { onOpenPalette: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpenPalette}
      className="fixed bottom-24 right-6 z-[90] hidden rounded-full border border-white/10 bg-white/10 p-4 text-bone shadow-[0_20px_60px_-25px_rgba(0,0,0,0.8)] backdrop-blur-2xl md:block"
    >
      ⌘
    </button>
  );
}

function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-start justify-center bg-background/70 px-3 pt-20 backdrop-blur-xl sm:px-4 sm:pt-24">
      <div className="w-full max-w-2xl rounded-[1.5rem] border border-white/10 bg-black/70 p-3 shadow-[0_30px_120px_-40px_rgba(0,0,0,0.95)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-4">
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-platinum">
          <span className="text-accent">⌘K</span>
          <input
            autoFocus
            placeholder="Jump to work, experience, skills, certifications..."
            className="w-full bg-transparent text-bone outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground"
          >
            Esc
          </button>
        </div>
        <div className="mt-4 grid gap-2">
          {[
            ["Work", "#work"],
            ["Experience", "#timeline"],
            ["Skills", "#skills"],
            ["Certifications", "#writing"],
            ["Education", "#contact"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => onOpenChange(false)}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-platinum transition-colors hover:border-accent hover:text-bone"
            >
              <span>{label}</span>
              <span className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                {href}
              </span>
            </a>
          ))}
          <a
            href={resumePdf}
            download="Anal_Joseph_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onOpenChange(false)}
            className="flex items-center justify-between rounded-2xl border border-accent/40 bg-accent-soft px-4 py-3 text-sm text-accent transition-colors hover:border-accent hover:text-bone"
          >
            <span>Download Resume (PDF)</span>
            <span className="text-[11px] uppercase tracking-[0.24em] font-mono">PDF ↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- footer */

function Footer() {
  return (
    <footer className="relative z-10 border-t border-line py-10 sm:py-12">
      <div className="container-lux flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-line text-[10px] font-mono text-accent">
            AJ
          </span>
          <span className="text-[12px] font-mono text-muted-foreground tracking-widest uppercase">
            Anal Joseph — Data Scientist • Bengaluru, Karnataka
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-[12px] font-mono tracking-widest uppercase text-platinum sm:gap-6">
          <a
            href="https://github.com/anal96"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/anal-joseph"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={resumePdf}
            download="Anal_Joseph_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline transition-colors"
          >
            Resume (PDF)
          </a>
          <a href="mailto:analjoseph9744@gmail.com" className="hover:text-accent transition-colors">
            Email
          </a>
          <a href="tel:+917558056329" className="hover:text-accent transition-colors">
            +91 7558056329
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------- helpers */

function SectionHeader({
  eyebrow,
  title,
  right,
}: {
  eyebrow: string;
  title: React.ReactNode;
  right: string;
}) {
  return (
    <div className="flex flex-col items-start gap-6 sm:gap-8 lg:grid lg:grid-cols-12 lg:items-end">
      <div className="w-full min-w-0 lg:col-span-8">
        <div className="reveal eyebrow mb-6 sm:mb-8">{eyebrow}</div>
        <h2 className="reveal font-display text-4xl leading-[0.95] tracking-[-0.035em] text-bone sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h2>
      </div>
      <p className="reveal w-full min-w-0 max-w-md text-[14px] leading-relaxed text-platinum lg:col-span-4">
        {right}
      </p>
    </div>
  );
}
