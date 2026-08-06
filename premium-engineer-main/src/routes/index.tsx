import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import portrait from "@/assets/portrait.png";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
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
      { title: "Anal Joseph — AI Engineer, Data Scientist & Machine Learning Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Anal Joseph — an AI Engineer, Data Scientist and Machine Learning Engineer building intelligent products and enterprise software.",
      },
      { property: "og:title", content: "Anal Joseph — AI Engineer, Data Scientist & Machine Learning Engineer" },
      {
        property: "og:description",
        content:
          "AI engineering, machine learning, data science and product-focused software engineering. Selected work, experience and certifications.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
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

    let tx = 0, ty = 0, rx = 0, ry = 0;
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
  ["Timeline", "timeline"],
  ["Skills", "skills"],
  ["Certifications", "writing"],
  ["Contact", "contact"],
] as const;

const PROJECTS = [
  {
    n: "01",
    year: "2026",
    title: "AI CRM & Learning Platform",
    tagline: "Enterprise SaaS platform integrating CRM, role-based management, secure authentication, AI-powered learning workflows, streaming capabilities, analytics dashboards, and modern UI.",
    image: project1,
    problem:
      "Teams needed one platform that could manage customer relationships, learning content and secure role-based access without fragmented tooling.",
    solution:
      "Built an AI-ready SaaS architecture with secure authentication, role-based management, streaming capability and dashboard analytics.",
    stack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS"],
    impact: ["Role Based Architecture", "Secure Authentication", "AI Ready Infrastructure", "Dashboard Analytics"],
    links: { github: "#", demo: "#" },
  },
  {
    n: "02",
    year: "2026",
    title: "Attend Ease",
    tagline: "Enterprise HR Management System designed for modern organizations.",
    image: project2,
    problem:
      "Organizations needed a clean, role-aware workforce platform for tracking attendance, leave and internal tasks.",
    solution:
      "Delivered a full-stack HRMS with email automation, reports, dashboards and a responsive workflow-first interface.",
    stack: ["React", "TypeScript", "Node.js", "MongoDB", "Express", "Tailwind"],
    impact: ["Attendance Management", "Leave Management", "Work From Home Tracking", "Role Based Dashboards"],
    links: { github: "#", demo: "#" },
  },
  {
    n: "03",
    year: "2025",
    title: "AI & Data Science Projects",
    tagline: "Collection of machine learning models solving business problems.",
    image: project3,
    problem:
      "Businesses needed predictive models that could support customer, sentiment and recommendation use cases with measurable outcomes.",
    solution:
      "Built models for classification, regression, sentiment analysis, customer prediction and predictive analytics.",
    stack: ["Python", "Scikit-Learn", "Pandas", "NumPy", "XGBoost", "TensorFlow", "PyTorch"],
    impact: ["Customer Prediction", "Sentiment Analysis", "Classification Models", "Recommendation Systems"],
    links: { github: "#", demo: "#" },
  },
  {
    n: "04",
    year: "2025",
    title: "Conversational AI",
    tagline: "Built intelligent chatbot prototypes using modern retrieval and prompt workflows.",
    image: project1,
    problem:
      "Users needed faster access to structured information through conversational interfaces instead of complex navigation.",
    solution:
      "Prototyped assistants with LangChain, OpenAI APIs and Hugging Face for document retrieval and answer generation.",
    stack: ["LangChain", "OpenAI API", "Hugging Face", "Prompt Engineering", "Document Retrieval", "Semantic Search"],
    impact: ["Conversational AI", "Document Retrieval", "Semantic Search"],
    links: { github: "#", demo: "#" },
  },
  {
    n: "05",
    year: "2024",
    title: "Trineo Smart Tasks",
    tagline: "VS Code extension focused on developer productivity.",
    image: project2,
    problem:
      "Developers needed lightweight workflow automation directly inside their editor.",
    solution:
      "Built a productivity-focused VS Code extension with task shortcuts and a streamlined developer experience.",
    stack: ["TypeScript", "VS Code Extension", "Developer UX"],
    impact: ["600+ Downloads", "Developer workflow enhancement"],
    links: { github: "#", demo: "#" },
  },
] as const;

const CAPABILITIES = [
  {
    group: "Artificial Intelligence",
    items: ["AI Product Design", "Automation", "Decision Systems", "Applied Intelligence"],
  },
  {
    group: "Machine Learning",
    items: ["Supervised Learning", "Unsupervised Learning", "Prediction", "Model Evaluation"],
  },
  {
    group: "Generative AI",
    items: ["LangChain", "OpenAI APIs", "Prompt Engineering", "Retrieval"],
  },
  {
    group: "NLP",
    items: ["Information Extraction", "Semantic Search", "Summarisation", "Speech"],
  },
  {
    group: "Business Intelligence",
    items: ["Dashboards", "Analytics", "Reporting", "Insights"],
  },
  {
    group: "Python Development",
    items: ["Python", "Scikit-Learn", "Pandas", "NumPy"],
  },
  {
    group: "Backend Engineering",
    items: ["Node.js", "Express", "MongoDB", "MySQL"],
  },
  {
    group: "Frontend Engineering",
    items: ["React", "TypeScript", "Tailwind CSS", "Vite"],
  },
];

const TECH = [
  "Python", "SQL", "JavaScript", "TypeScript", "HTML", "CSS",
  "React", "Node.js", "Express", "Tailwind CSS", "Scikit-Learn", "TensorFlow",
  "PyTorch", "XGBoost", "Pandas", "NumPy", "LangChain", "OpenAI API",
  "Hugging Face", "Transformers", "Vector Databases", "MongoDB", "MySQL", "Git",
  "GitHub", "Figma", "VS Code", "Docker", "Google Cloud", "Render", "Vercel",
];

const EXPERIENCE = [
  {
    year: "2026 — Present",
    role: "Data Science Intern",
    company: "Luminar Technolab",
    location: "Bengaluru",
    note: "Worked across the complete AI development lifecycle.",
    metric: "AI prototyping",
  },
];

const WRITING = [
  {
    kind: "Google Cloud",
    title: "A Tour of Google Cloud Hands-on Labs",
    venue: "Certification",
  },
  {
    kind: "MongoDB",
    title: "Monitoring MongoDB with Built-in Tools",
    venue: "Certification",
  },
  {
    kind: "Google Play Academy",
    title: "Store Listing Certificate",
    venue: "Certification",
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

  const [accent, setAccent] = useState(ACCENTS[0]);
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
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 85%)",
        }}
      />
      {["top-[8%] left-[14%]", "top-[28%] left-[72%]", "bottom-[18%] left-[21%]", "bottom-[10%] right-[12%]"].map((position, index) => (
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
            <span className="ml-2 text-muted-foreground">/ AI Engineer</span>
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
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 lg:col-span-8">
            <ScrollReveal className="flex items-center gap-3 eyebrow mb-10">
              <span className="h-px w-10 bg-accent" />
              <ShinyText speed={6}>Machine Learning Engineer</ShinyText>
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

            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-platinum sm:text-[16px]">
              I build scalable AI applications, machine learning solutions, intelligent automation,
              and enterprise-grade software that transform complex data into meaningful business outcomes.
            </p>

            <ScrollReveal delay={0.2} className="mt-14 grid grid-cols-12 gap-6 max-w-3xl">
              <p className="col-span-12 md:col-span-8 text-[15px] leading-relaxed text-platinum">
                I'm <span className="text-bone">Anal Joseph</span>, an AI Engineer and Data Scientist passionate about building intelligent software that combines Machine Learning, Generative AI, Natural Language Processing, and modern software engineering.
              </p>
              <div className="col-span-12 md:col-span-4 space-y-2 text-[12px] font-mono text-muted-foreground">
                <div className="flex justify-between border-b border-line pb-1">
                  <span>Based</span>
                  <span className="text-bone">Bengaluru</span>
                </div>
                <div className="flex justify-between border-b border-line pb-1">
                  <span>Focus</span>
                  <span className="text-bone">AI Products</span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="text-accent">Open to Work</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.35} className="mt-10 flex flex-col flex-wrap items-start gap-3 sm:mt-12 sm:flex-row sm:items-center sm:gap-4">
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
              <button
                type="button"
                onClick={() => {
                  const blob = new Blob([
                    `Anal Joseph\nAI Engineer • Data Scientist • Machine Learning Engineer\n\nLinkedIn: linkedin.com/in/anal-joseph\nGitHub: github.com/anal96\nLocation: Bengaluru, India\n`,
                  ], { type: "text/plain;charset=utf-8" });
                  const url = URL.createObjectURL(blob);
                  const anchor = document.createElement("a");
                  anchor.href = url;
                  anchor.download = "Anal_Joseph_Resume.txt";
                  anchor.click();
                  URL.revokeObjectURL(url);
                }}
                className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-[13px] tracking-wider uppercase text-platinum backdrop-blur-xl transition-colors duration-300 hover:border-accent hover:text-accent sm:w-auto"
              >
                Download Resume
              </button>
              <button
                type="button"
                onClick={onOpenPalette}
                className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-[13px] tracking-wider uppercase text-platinum backdrop-blur-xl transition-colors duration-300 hover:border-accent hover:text-accent sm:w-auto"
              >
                Contact Me
              </button>
            </ScrollReveal>
          </div>

          <div className="col-span-12 lg:col-span-4">
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
    "Machine Learning",
    "Generative AI",
    "Systems Design",
    "Full-stack",
    "Research → Product",
    "Enterprise-grade",
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
          title={<>Featured builds from<br /><em className="italic text-accent font-light">real product work.</em></>}
          right="Enterprise SaaS, HR systems, applied data science and conversational AI projects shaped around practical business outcomes."
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

function ProjectCase({
  p,
  flip,
}: {
  p: (typeof PROJECTS)[number];
  flip: boolean;
}) {
  return (
    <article className="reveal grid grid-cols-12 gap-8 lg:gap-12">
      <div className={`col-span-12 lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
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
        className={`col-span-12 lg:col-span-5 flex flex-col ${
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
    <div className="grid grid-cols-[6rem_1fr] gap-4 border-t border-line pt-4">
      <dt className="eyebrow pt-1">{label}</dt>
      <dd className="text-platinum leading-relaxed">{children}</dd>
    </div>
  );
}

/* ---------------------------------------------------------- timeline */

function Timeline() {
  return (
    <section id="timeline" className="relative py-24 sm:py-28 lg:py-44 border-t border-line">
      <div className="container-lux">
        <SectionHeader
          eyebrow="§ 02 — Career"
          title={<>Experience that moves<br /><em className="italic text-accent font-light">from data to product.</em></>}
          right="A focused internship path centered on the full AI development lifecycle, production thinking and practical delivery."
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
                  className={`pl-12 md:pl-0 ${
                    i % 2 === 0 ? "md:text-right md:pr-16" : "md:pl-16"
                  }`}
                >
                  <div className="eyebrow text-accent">{e.year}</div>
                  <h4 className="mt-3 font-display text-2xl leading-[1.05] tracking-[-0.02em] text-bone sm:text-3xl lg:text-4xl">
                    {e.role}
                  </h4>
                  <div className="mt-2 text-sm text-platinum">
                    {e.company} <span className="text-muted-foreground">— {e.location}</span>
                  </div>
                  <p
                    className={`mt-5 text-[14px] leading-relaxed text-platinum max-w-md ${
                      i % 2 === 0 ? "md:ml-auto" : ""
                    }`}
                  >
                    {e.note}
                  </p>
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
          title={<>Built to solve<br /><em className="italic text-accent font-light">real business problems.</em></>}
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
              <h4 className="mt-6 font-display text-2xl text-bone tracking-[-0.02em]">
                {c.group}
              </h4>
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
    { label: "VS Code Extension Downloads", value: 600, suffix: "+" },
    { label: "Enterprise AI CRM", value: 1, suffix: "" },
    { label: "Full Stack HRMS", value: 1, suffix: "" },
    { label: "Google Cloud Certified", value: 1, suffix: "" },
    { label: "MongoDB Certified", value: 1, suffix: "" },
    { label: "AI Projects", value: 12, suffix: "+" },
  ];

  return (
    <section
      ref={ref}
      className="relative border-t border-line bg-ink/40 py-24 sm:py-28"
    >
      <div className="container-lux">
        <div className="eyebrow mb-16">§ 05 — Achievements</div>
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
          title={<>Learning,<br /><em className="italic text-accent font-light">validated.</em></>}
          right="Selected certifications that back up the engineering and data science practice with formal training and platform knowledge."
        />
        <div className="mt-20 border-t border-line">
          {WRITING.map((w, i) => (
            <a
              key={i}
              href="#"
              className="reveal group grid grid-cols-1 items-start gap-4 border-b border-line py-8 transition-colors hover:bg-card/50 sm:grid-cols-12 sm:items-center sm:gap-6"
            >
              <div className="sm:col-span-3 md:col-span-2 eyebrow text-accent">
                {w.kind}
              </div>
              <h4 className="sm:col-span-9 md:col-span-7 font-display text-2xl tracking-[-0.02em] text-bone transition-colors group-hover:text-accent md:text-3xl">
                {w.title}
              </h4>
              <div className="sm:col-span-12 md:col-span-2 text-[12px] font-mono text-muted-foreground md:text-right">
                {w.venue}
              </div>
              <div className="hidden md:flex col-span-1 justify-end text-platinum group-hover:text-accent transition-all group-hover:translate-x-1">
                →
              </div>
            </a>
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
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 lg:col-span-5">
            <div className="eyebrow mb-8">§ 08 — Education</div>
            <h2 className="font-display text-4xl leading-[0.95] tracking-[-0.035em] text-bone sm:text-5xl lg:text-7xl">
              Trained to build<br />
              <em className="italic text-accent font-light">practical intelligence</em>.
            </h2>
            <p className="mt-8 text-[15px] text-platinum leading-relaxed max-w-md">
              Bachelor of Computer Applications from Indira Gandhi National Open University,
              focused on computer science, programming, software development, artificial
              intelligence and data science.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7 space-y-6">
            {[
              {
                year: "Current",
                degree: "Bachelor of Computer Applications",
                school: "Indira Gandhi National Open University",
                note: "Focused on Computer Science, Programming, Software Development, Artificial Intelligence and Data Science.",
              },
            ].map((e, i) => (
              <div
                key={i}
                className="reveal group grid grid-cols-12 gap-6 border-t border-line pt-6"
              >
                <div className="col-span-4 eyebrow text-accent">{e.year}</div>
                <div className="col-span-8">
                  <div className="font-display text-3xl text-bone tracking-[-0.02em]">
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

function Contact({ onToast }: { onToast: (message: string) => void }) {
  const [copied, setCopied] = useState(false);
  const email = "your-email@example.com";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      onToast("Email copied");
    } catch {
      onToast("Copy failed");
    }
  };

  return (
    <section id="contact" className="relative border-t border-line py-24 sm:py-28 lg:py-44">
      <div className="container-lux">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-6">
            <div className="eyebrow">§ 09 — Contact</div>
            <h2 className="mt-8 font-display text-5xl leading-[0.9] tracking-[-0.04em] text-bone sm:text-6xl lg:text-8xl">
              Let's build<br />
              intelligent products<br />
              <em className="italic text-accent font-light">together.</em>
            </h2>
            <p className="mt-10 max-w-md text-[15px] text-platinum leading-relaxed">
              I&apos;m open to AI Engineering, Machine Learning Engineering, Data Science,
              Generative AI, Software Engineering, Product Development, Research Collaborations,
              and Freelance Projects.
            </p>

            <dl className="mt-14 space-y-4 text-[13px]">
              {[
                ["Email", email],
                ["LinkedIn", "linkedin.com/in/anal-joseph"],
                ["GitHub", "github.com/anal96"],
                ["Location", "Bengaluru, India"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between border-b border-line pb-3"
                >
                  <dt className="eyebrow">{k}</dt>
                  <dd className="text-bone">{v}</dd>
                </div>
              ))}
            </dl>
            <button
              type="button"
              onClick={copyEmail}
              className="magnetic mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-[12px] uppercase tracking-[0.24em] text-bone backdrop-blur-xl"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {copied ? "Copied" : "Copy Email"}
            </button>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="reveal col-span-12 rounded-[1.5rem] border border-line bg-card p-6 shadow-[var(--shadow-elevated)] sm:p-8 lg:col-span-6 lg:p-12"
          >
            <div className="space-y-8">
              <Field label="Name" name="name" placeholder="Your full name" />
              <Field label="Email" name="email" type="email" placeholder="you@company.com" />
              <Field label="Company" name="company" placeholder="Where you build" />
              <div>
                <label className="eyebrow block mb-3">Engagement</label>
                <div className="flex flex-wrap gap-2">
                  {["Advisory", "Prototype", "Full Build", "Research"].map((k) => (
                    <button
                      key={k}
                      type="button"
                      className="magnetic rounded-full border border-line px-4 py-2 text-[12px] tracking-wider uppercase text-platinum hover:border-accent hover:text-accent"
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
                  placeholder="A paragraph is enough. What are you circling?"
                  className="w-full resize-none border-b border-line bg-transparent pb-3 text-[15px] text-bone placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="magnetic group inline-flex w-full items-center justify-between rounded-full bg-bone px-7 py-4 text-[12px] font-medium tracking-[0.2em] uppercase text-background hover:bg-accent"
              >
                Send Enquiry
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </form>
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
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow block mb-3">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
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
    { label: "Skills", href: "#skills" },
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

function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-start justify-center bg-background/70 px-3 pt-20 backdrop-blur-xl sm:px-4 sm:pt-24">
      <div className="w-full max-w-2xl rounded-[1.5rem] border border-white/10 bg-black/70 p-3 shadow-[0_30px_120px_-40px_rgba(0,0,0,0.95)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-4">
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-platinum">
          <span className="text-accent">⌘K</span>
          <input
            autoFocus
            placeholder="Jump to work, timeline, writing..."
            className="w-full bg-transparent text-bone outline-none placeholder:text-muted-foreground"
          />
          <button type="button" onClick={() => onOpenChange(false)} className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            Esc
          </button>
        </div>
        <div className="mt-4 grid gap-2">
          {[
            ["Work", "#work"],
            ["Timeline", "#timeline"],
            ["Skills", "#skills"],
            ["Writing", "#writing"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => onOpenChange(false)}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-platinum transition-colors hover:border-accent hover:text-bone"
            >
              <span>{label}</span>
              <span className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">{href}</span>
            </a>
          ))}
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
            Designed &amp; Engineered by Anal Joseph
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-[12px] font-mono tracking-widest uppercase text-platinum sm:gap-6">
          {["GitHub", "LinkedIn", "Resume", "Contact"].map((l) => (
            <a key={l} href="#" className="hover:text-accent transition-colors">
              {l}
            </a>
          ))}
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
    <div className="grid grid-cols-12 items-end gap-6 sm:gap-8">
      <div className="col-span-12 lg:col-span-8">
        <div className="reveal eyebrow mb-6 sm:mb-8">{eyebrow}</div>
        <h2 className="reveal font-display text-4xl leading-[0.95] tracking-[-0.035em] text-bone sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h2>
      </div>
      <p className="reveal col-span-12 max-w-md text-[14px] leading-relaxed text-platinum lg:col-span-4">
        {right}
      </p>
    </div>
  );
}
