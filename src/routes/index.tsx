import { createFileRoute, Link } from "@tanstack/react-router";
import {
  SiPython,
  SiTypescript,
  SiGo,
  SiReact,
  SiNodedotjs,
  SiFastapi,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiApachekafka,
  SiRedis,
  SiLinux,
  SiJavascript,
  SiCplusplus,
  SiGin,
  SiTailwindcss,
  SiJsonwebtokens,
  SiExpress,
} from "react-icons/si";
import {
  Github,
  Linkedin,
  Send,
  Mail,
  FileText,
  ExternalLink,
  Database,
  Network,
  Workflow,
  Globe,
  Shield,
  Layers,
  Code2,
  Brain,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import type { IconType } from "react-icons";
import { ThemeToggle } from "@/components/ThemeToggle";
import { projects } from "@/lib/projects";
import bethe from "@/assets/bethe.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Bethe Bayou — Backend & Distributed Systems Engineer | Go, Python, TypeScript",
      },
      {
        name: "description",
        content:
          "Bethe Bayou is a backend and distributed systems engineer building high-throughput microservices with Go, gRPC, Apache Kafka, and PostgreSQL. AAiT Software Engineering student & A2SV trainee in Addis Ababa, Ethiopia. Open to backend engineering roles.",
      },
      {
        name: "keywords",
        content:
          "Bethe Bayou, Backend Engineer, Go Developer, Distributed Systems, Microservices, gRPC, Kafka, Python, TypeScript, AAiT, A2SV, Software Engineer Ethiopia, Addis Ababa",
      },
      {
        property: "og:title",
        content:
          "Bethe Bayou — Backend & Distributed Systems Engineer",
      },
      {
        property: "og:description",
        content:
          "Backend engineer building high-throughput distributed systems with Go, gRPC, Kafka, and PostgreSQL. AAiT student & A2SV trainee.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bethebayou.me/" },
      {
        property: "og:image",
        content: "https://bethebayou.me/og-image.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content:
          "Bethe Bayou — Backend & Distributed Systems Engineer",
      },
      {
        name: "twitter:description",
        content:
          "Backend engineer building high-throughput distributed systems with Go, gRPC, Kafka, and PostgreSQL.",
      },
      {
        name: "twitter:image",
        content: "https://bethebayou.me/og-image.png",
      },
    ],
  }),
  component: Home,
});

/* ─── Data ─── */

const experience = [
  {
    role: "AI & Software Engineer Intern",
    org: "Riftronix",
    when: "Dec 2025 — Apr 2026",
    location: "Addis Ababa, Ethiopia",
    description:
      "Engineered backend services and integration pipelines bridging hardware IoT sensor telemetry with real-time data processing and analytics APIs.",
    skills: ["Go", "Python", "IoT Telemetry", "REST APIs"],
  },
  {
    role: "AI Research Intern",
    org: "iCog Labs",
    when: "Sep 2025 — Mar 2026",
    location: "Addis Ababa, Ethiopia",
    description:
      "Researched AGI cognitive architectures and implemented foundational ML algorithms (Perceptron, SVM) from mathematical first principles in pure NumPy.",
    skills: ["NumPy", "First-Principles ML", "AGI Research", "Python"],
  },
  {
    role: "Software Engineering Trainee",
    org: "A2SV (Africa to Silicon Valley)",
    when: "Dec 2025 — Present",
    location: "Addis Ababa, Ethiopia",
    description:
      "Selected for elite training program; solved 400+ complex problems covering advanced data structures, graph theory, dynamic programming, and system design.",
    skills: [
      "Data Structures & Algorithms",
      "System Design",
      "Competitive Programming",
    ],
  },
  {
    role: "AI Training Expert",
    org: "Revelo",
    when: "2025 · Contractual",
    location: "Remote",
    description:
      "Evaluated, debugged, and benchmarked LLM-generated code for complex software challenges, verifying algorithmic efficiency, edge-case safety, and code quality.",
    skills: ["LLM Code Evaluation", "Benchmark Analysis", "Code Correctness"],
  },
];

type SkillItem = {
  name: string;
  icon: IconType | LucideIcon;
};

const skillCategories: { category: string; items: SkillItem[] }[] = [
  {
    category: "Languages",
    items: [
      { name: "Go", icon: SiGo },
      { name: "Python", icon: SiPython },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "SQL", icon: Database },
      { name: "C++", icon: SiCplusplus },
    ],
  },
  {
    category: "Backend & Systems",
    items: [
      { name: "gRPC & Protobuf", icon: Network },
      { name: "Apache Kafka", icon: SiApachekafka },
      { name: "Docker & Compose", icon: SiDocker },
      { name: "PostgreSQL (pgx)", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Redis", icon: SiRedis },
      { name: "Gin", icon: SiGin },
      { name: "Node.js / Express", icon: SiExpress },
      { name: "FastAPI", icon: SiFastapi },
    ],
  },
  {
    category: "Architecture & Practices",
    items: [
      { name: "Microservices", icon: Layers },
      { name: "Event-Driven Architecture", icon: Workflow },
      { name: "Saga Pattern Rollback", icon: Shield },
      { name: "RESTful API Design", icon: Globe },
      { name: "Reverse Proxy & Gateway", icon: Network },
      { name: "Clean Architecture", icon: Code2 },
    ],
  },
  {
    category: "Foundations & Tools",
    items: [
      { name: "Data Structures & Algorithms", icon: Brain },
      { name: "System Design", icon: Workflow },
      { name: "Git / GitHub", icon: SiGit },
      { name: "Linux / Bash", icon: Terminal },
      { name: "React", icon: SiReact },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
];

const education = [
  {
    school: "Addis Ababa University (AAiT)",
    detail:
      "B.Sc. Software Engineering — College of Technology & Built Environments. Focus on Distributed Systems, OS, DBMS, and Algorithm Design.",
    when: "2023 — 2028",
  },
  {
    school: "DeepLearning.AI · Stanford (Coursera)",
    detail:
      "Supervised Machine Learning: Regression, Classification, Cost Functions, and Regularization.",
    when: "2025",
  },
];

const primaryStack = [
  { name: "Go", Icon: SiGo },
  { name: "Python", Icon: SiPython },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Kafka", Icon: SiApachekafka },
  { name: "Docker", Icon: SiDocker },
  { name: "Redis", Icon: SiRedis },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "FastAPI", Icon: SiFastapi },
  { name: "React", Icon: SiReact },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "Linux", Icon: SiLinux },
  { name: "Git", Icon: SiGit },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/bethe19",
    Icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bethe-bayou",
    Icon: Linkedin,
  },
  {
    label: "Telegram",
    href: "https://t.me/bethe19",
    Icon: Send,
  },
  {
    label: "Email",
    href: "mailto:bethebayou@gmail.com",
    Icon: Mail,
  },
];

/* ─── Component ─── */

function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* ════════════ LEFT PANEL ════════════ */}
      <div className="panel-scroll w-full p-6 sm:p-10 lg:h-screen lg:w-[58%] lg:overflow-y-auto lg:p-14">
        {/* Top Header: Avatar with Online Indicator & ThemeToggle */}
        <div className="flex items-start justify-between">
          <div className="relative inline-block">
            <img
              src={bethe}
              alt="Bethe Bayou"
              className="h-20 w-20 rounded-full object-cover ring-2 ring-border shadow-sm"
            />
            <span
              className="absolute bottom-0.5 right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-background ring-2 ring-background shadow-xs"
              title="Online · Available for opportunities"
              aria-label="Online · Available for opportunities"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="status-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
            </span>
          </div>
          <ThemeToggle />
        </div>

        {/* Hero */}
        <section className="mt-5">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Bethe Bayou
          </h1>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            Backend & Systems Engineer · Go, Distributed Systems & Scalable APIs
          </p>
          <p className="mt-2 text-base text-muted-foreground">
            Building scalable distributed systems.
          </p>
        </section>

        {/* Tech Stack Icon Bar */}
        <section className="mt-8">
          <div className="flex flex-wrap gap-2">
            {primaryStack.map(({ name, Icon }) => (
              <span
                key={name}
                title={name}
                className="inline-flex items-center justify-center rounded-lg border border-black/[0.06] bg-muted/30 p-2 text-foreground/80 transition-colors hover:bg-muted/60"
              >
                <Icon size={18} />
              </span>
            ))}
          </div>
        </section>

        {/* Bio Narrative */}
        <section id="about" className="mt-8 space-y-3 text-[15px] leading-relaxed text-foreground/85">
          <p>
            I'm a software engineer at{" "}
            <span className="font-semibold text-foreground">
              Addis Ababa University (AAiT)
            </span>{" "}
            specializing in{" "}
            <span className="font-semibold text-foreground">
              backend engineering, distributed systems, and scalable APIs
            </span>
            , building resilient services with Go, Python, and TypeScript.
          </p>
          <p>
            Currently deepening my foundations in data structures and system
            design at{" "}
            <span className="font-semibold text-foreground">
              A2SV (Africa to Silicon Valley)
            </span>{" "}
            while building backend IoT pipelines at{" "}
            <span className="font-semibold text-foreground">Riftronix</span>.
            Previously researched AGI architectures at{" "}
            <span className="font-semibold text-foreground">iCog Labs</span> and
            evaluated code correctness for LLMs at{" "}
            <span className="font-semibold text-foreground">Revelo</span>.
          </p>
          <p className="text-sm text-muted-foreground">
            I care about the layer where design meets reality: distributed
            consistency, low tail latency, clean architecture, and systems that
            fail gracefully under load.
          </p>
        </section>

        {/* CTAs */}
        <section className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="https://drive.google.com/file/d/12fQlLoHU8imw-gk6fSV9PQEKMktzndQB/view?usp=drive_link"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            <FileText size={15} />
            Download Resume
          </a>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              title={s.label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.06] bg-muted/30 text-muted-foreground transition-all hover:bg-muted/60 hover:text-foreground hover:scale-105"
            >
              <s.Icon size={17} />
            </a>
          ))}
        </section>

        {/* ── Work Experience ── */}
        <section className="mt-14">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Work Experience
          </p>
          <ul className="space-y-0">
            {experience.map((e) => (
              <li
                key={e.org}
                className="border-b border-black/[0.06] py-5 first:pt-0"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-[15px] font-semibold text-foreground">
                      {e.role}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {e.org}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs font-medium text-muted-foreground">
                      {e.when}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground/70">
                      {e.location}
                    </p>
                  </div>
                </div>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted-foreground">
                  {e.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Technical Skills ── */}
        <section className="mt-14">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Technical Skills
          </p>
          <div className="space-y-5">
            {skillCategories.map((group) => (
              <div key={group.category}>
                <p className="mb-2.5 text-[13px] font-semibold text-foreground/90">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <span
                        key={item.name}
                        className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.06] bg-muted/30 px-3 py-1 text-[12px] font-medium text-foreground/80 transition-colors hover:bg-muted/50"
                      >
                        <Icon size={13} className="shrink-0 text-muted-foreground" />
                        {item.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Education ── */}
        <section className="mt-14">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Education
          </p>
          <ul className="space-y-0">
            {education.map((ed) => (
              <li
                key={ed.school}
                className="border-b border-black/[0.06] py-4 first:pt-0"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-[15px] font-semibold text-foreground">
                    {ed.school}
                  </p>
                  <span className="shrink-0 text-xs font-medium text-muted-foreground">
                    {ed.when}
                  </span>
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                  {ed.detail}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Footer ── */}
        <footer className="mt-16 pb-8">
          <p className="text-[11px] text-muted-foreground/60 font-mono">
            © {new Date().getFullYear()} Bethe Bayou · Addis Ababa
          </p>
        </footer>
      </div>

      {/* ════════════ RIGHT PANEL ════════════ */}
      <div id="projects" className="panel-scroll w-full border-t border-black/[0.06] p-6 sm:p-10 lg:h-screen lg:w-[42%] lg:overflow-y-auto lg:border-l lg:border-t-0 lg:p-12">
        {/* Projects Header */}
        <div className="flex items-baseline justify-between">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Featured Projects
          </p>
          <span className="rounded-full bg-muted/50 px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
            {projects.length}
          </span>
        </div>

        {/* Project Cards */}
        <div className="mt-6 space-y-4">
          {projects.map((p) => (
            <div
              key={p.slug}
              className="group rounded-2xl border border-black/[0.06] bg-card/50 p-5 transition-all hover:border-black/[0.12] hover:bg-card/80 hover:shadow-sm"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <Link
                    to="/projects/$slug"
                    params={{ slug: p.slug }}
                    className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-foreground transition-colors hover:text-accent"
                  >
                    {p.logo && (
                      <img
                        src={p.logo}
                        alt={`${p.name} logo`}
                        className="h-5 w-5 object-contain"
                      />
                    )}
                    {p.name}
                    <ExternalLink
                      size={13}
                      className="text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5"
                    />
                  </Link>
                  <p className="mt-0.5 text-xs font-medium text-muted-foreground/70">
                    {p.stack}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-muted/60 px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
                  {p.year}
                </span>
              </div>

              {/* Card Body */}
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground line-clamp-2">
                {p.tagline}
              </p>

              {/* Card Footer — Tech Tags + Links */}
              <div className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-1">
                {p.tech.slice(0, 5).map((t, i) => (
                  <span key={t} className="text-[12px] text-muted-foreground/70">
                    {i > 0 && <span className="mr-1.5">·</span>}
                    {t}
                  </span>
                ))}
              </div>

              {/* Quick Links */}
              <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-black/[0.04] pt-3 text-[12.5px]">
                <Link
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  case study →
                </Link>
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    github ↗
                  </a>
                )}
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    live site ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
