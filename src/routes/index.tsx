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
} from "react-icons/si";
import { ThemeToggle } from "@/components/ThemeToggle";
import { projects } from "@/lib/projects";
import bethe from "@/assets/bethe.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bethe Bayou — Software Engineer" },
      {
        name: "description",
        content:
          "Bethe Bayou — software engineer & AI researcher based in Addis Ababa. Building end-to-end with Python, Go, TypeScript.",
      },
      { property: "og:title", content: "Bethe Bayou — Software Engineer" },
      {
        property: "og:description",
        content:
          "Software engineer & AI researcher building products and studying models end-to-end.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const experience = [
  { role: "AI & Software Engineer Intern", org: "Riftronix", when: "2025 Dec — 2026 Apr" },
  { role: "AI Research Intern", org: "iCog Labs", when: "2025 Sep — 2026 Mar" },
  { role: "Software Engineering Trainee", org: "A2SV", when: "2025 Dec — Now" },
  { role: "AI Training Expert", org: "Revelo", when: "2025 Contractual" },
];


const education = [
  {
    school: "Addis Ababa University",
    detail: "B.Sc. Software Engineering — College of Technology & Built Environments",
    when: "2023 — 2028",
  },
  {
    school: "DeepLearning.AI · Stanford (Coursera)",
    detail: "Supervised Machine Learning: Regression and Classification",
    when: "2025",
  },
];


const stack = [
  { name: "Go", Icon: SiGo },
  { name: "Python", Icon: SiPython },
  { name: "FastAPI", Icon: SiFastapi },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "React", Icon: SiReact },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Docker", Icon: SiDocker },
  { name: "Git", Icon: SiGit },
];

const socials = [
  { label: "github", href: "https://github.com/bethe19" },
  { label: "linkedin", href: "https://www.linkedin.com/in/bethe-bayou" },
  { label: "telegram", href: "https://t.me/bethe19" },
  { label: "email", href: "mailto:bethebayou@gmail.com" },
];

function Home() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-6 py-16 sm:py-24">
      {/* Header */}
      <header className="flex items-start gap-5">
        <img
          src={bethe}
          alt="Bethe Bayou"
          className="h-16 w-16 shrink-0 rounded-2xl object-cover ring-1 ring-border"
        />
        <div className="min-w-0 flex-1">
          <h1 className="text-lg font-semibold tracking-tight">Bethe Bayou</h1>
          <p className="text-sm text-muted-foreground">
            Software engineer & AI researcher, Addis Ababa
          </p>
        </div>
        <div className="flex items-center gap-1">
          <a
            href="https://drive.google.com/file/d/1G6Oy6_xe8ISf73onA3d1STxED3fLGX0m/view"
            target="_blank"
            rel="noreferrer"
            className="hidden text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline sm:inline"
          >
            resume ↗
          </a>
          <ThemeToggle />
        </div>
      </header>

      {/* Intro */}
      <section className="mt-14 space-y-5 text-[15px] leading-relaxed text-foreground/90">
        <p>
          I'm a software engineering student at Addis Ababa University. I'm
          primarily a backend engineer, but I happen to have a good eye for
          frontend design when building things end-to-end.
        </p>
        <p>
          These days, I spend my time drilling algorithms with{" "}
          <span className="text-foreground">A2SV</span> and building as an AI & Software intern at{" "}
          <span className="text-foreground">Riftronix</span>. Previously, I researched AGI at iCog Labs and evaluated LLMs at Revelo. I care
          about the layer where research becomes a working system.
        </p>
      </section>

      {/* Experience */}
      <section className="mt-16">
        <p className="mb-5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Experience
        </p>
        <ul className="space-y-3">
          {experience.map((e) => (
            <li
              key={e.org}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-b border-border/60 pb-3 text-[15px]"
            >
              <span className="min-w-0 truncate">
                <span className="text-foreground">{e.role}</span>
                <span className="text-muted-foreground"> · {e.org}</span>
              </span>
              <span className="shrink-0 font-mono text-xs text-muted-foreground">
                {e.when}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Projects */}
      <section className="mt-16">
        <p className="mb-5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Projects
        </p>
        <ul className="space-y-4">
          {projects.map((p) => (
            <li
              key={p.slug}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-b border-border/60 pb-4 text-[15px]"
            >
              <span className="min-w-0">
                <Link
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="font-medium text-foreground hover:underline"
                >
                  {p.name} <span className="text-muted-foreground ml-0.5">→</span>
                </Link>
                <span className="block mt-1 text-muted-foreground text-[14px] line-clamp-3">
                  {p.tagline}
                </span>
                <span className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px]">
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
                      live ↗
                    </a>
                  )}
                </span>
              </span>
              <span className="shrink-0 font-mono text-xs text-muted-foreground">
                {p.year}
              </span>
            </li>
          ))}
        </ul>
      </section>


      {/* Education */}
      <section className="mt-16">
        <p className="mb-5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Education
        </p>
        <ul className="space-y-3">
          {education.map((ed) => (
            <li
              key={ed.school}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-b border-border/60 pb-3 text-[15px]"
            >
              <span className="min-w-0">
                <span className="text-foreground">{ed.school}</span>
                <span className="block text-muted-foreground text-[13px]">{ed.detail}</span>
              </span>
              <span className="shrink-0 font-mono text-xs text-muted-foreground">
                {ed.when}
              </span>
            </li>
          ))}
        </ul>
      </section>


      {/* Stack */}
      <section className="mt-16">
        <p className="mb-5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Stack
        </p>
        <ul className="flex flex-wrap gap-2">
          {stack.map(({ name, Icon }) => (
            <li
              key={name}
              className="inline-flex items-center gap-2 rounded-md border border-border/70 bg-muted/40 px-2.5 py-1.5 text-[13px] text-foreground/90"
            >
              <Icon size={14} className="text-muted-foreground" />
              {name}
            </li>
          ))}
        </ul>
      </section>

      {/* Footer / socials */}
      <footer className="mt-20 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border/60 pt-6 text-sm">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            {s.label}
          </a>
        ))}
        <span className="ml-auto font-mono text-[11px] text-muted-foreground">
          © {new Date().getFullYear()}
        </span>
      </footer>
    </main>
  );
}
