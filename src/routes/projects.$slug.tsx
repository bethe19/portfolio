import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getProject, projects, type Project } from "@/lib/projects";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Layers,
  Workflow,
  Lightbulb,
  Box,
  ChevronRight,
  FileText,
} from "lucide-react";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const title = p
      ? `${p.name} — Case Study | Bethe Bayou`
      : "Project — Bethe Bayou";
    const desc = p
      ? `${p.tagline} Built with ${p.tech.join(", ")}. Architecture case study by Bethe Bayou.`
      : "Project case study by Bethe Bayou.";
    const url = p
      ? `https://bethebayou.vercel.app/projects/${p.slug}`
      : "https://bethebayou.vercel.app";
    const keywords = p
      ? `${p.name}, ${p.tech.join(", ")}, Bethe Bayou, case study, backend project, ${p.stack}`
      : "Bethe Bayou, project";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: keywords },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        {
          property: "og:image",
          content: "https://bethebayou.vercel.app/og-image.png",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        {
          name: "twitter:image",
          content: "https://bethebayou.vercel.app/og-image.png",
        },
      ],
    };
  },
  notFoundComponent: () => (
    <main className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="text-sm text-muted-foreground">Project not found.</p>
      <Link to="/" className="mt-4 inline-block text-sm underline">
        ← Back home
      </Link>
    </main>
  ),
  errorComponent: ({ error }) => (
    <main className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="text-sm text-muted-foreground">
        Something went wrong: {error.message}
      </p>
    </main>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData() as { project: Project };
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-6 py-12 sm:py-20">
      {/* ── Sticky Header ── */}
      <header className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={15} />
          Back
        </Link>
        <div className="flex items-center gap-2">
          <a
            href="https://drive.google.com/file/d/12fQlLoHU8imw-gk6fSV9PQEKMktzndQB/view?usp=drive_link"
            target="_blank"
            rel="noreferrer"
            className="glass-chip inline-flex items-center gap-1.5 rounded-full border border-black/[0.06] px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:scale-105"
          >
            <FileText size={13} />
            Resume
          </a>
          <ThemeToggle />
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="mt-12">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-muted/60 px-3 py-1 text-[11px] font-semibold text-muted-foreground">
            {project.year}
          </span>
          <span className="text-[11px] text-muted-foreground/50">·</span>
          <span className="text-[12px] font-medium text-muted-foreground">
            {project.stack}
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {project.name}
        </h1>
        <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
          {project.tagline}
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            <Github size={15} />
            View Source
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-muted/30 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/60"
            >
              <ExternalLink size={15} />
              Live Demo
            </a>
          )}
        </div>
      </section>

      {/* ── Divider ── */}
      <hr className="mt-12 border-black/[0.06]" />

      {/* ── About (Two-column on desktop) ── */}
      <section className="mt-12">
        <SectionHeading icon={<Lightbulb size={16} />} title="Overview" />
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          {project.about.map((para, i) => (
            <p
              key={i}
              className="text-[15px] leading-relaxed text-foreground/85"
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* ── Key Highlights ── */}
      <section className="mt-14">
        <SectionHeading icon={<Layers size={16} />} title="Key Highlights" />
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {project.highlights.map((h, i) => (
            <div
              key={i}
              className="flex gap-3 rounded-xl border border-black/[0.06] bg-muted/15 p-4 transition-colors hover:bg-muted/30"
            >
              <span className="mt-0.5 shrink-0 text-accent">
                <ChevronRight size={14} />
              </span>
              <span className="text-[14px] leading-relaxed text-foreground/85">
                {h}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Architecture Overview ── */}
      <section className="mt-14">
        <SectionHeading
          icon={<Workflow size={16} />}
          title="Architecture & Design"
        />
        <div className="mt-5 rounded-2xl border border-black/[0.06] bg-muted/10 p-6">
          <p className="text-[15px] leading-relaxed text-foreground/85">
            {project.architecture.overview}
          </p>
        </div>
      </section>

      {/* ── Architectural Decisions ── */}
      <section className="mt-10">
        <p className="mb-4 text-sm font-semibold text-foreground/90">
          Key Architectural Decisions
        </p>
        <div className="space-y-4">
          {project.architecture.decisions.map((d, i) => (
            <div
              key={i}
              className="rounded-xl border border-black/[0.06] bg-card/40 p-5 transition-colors hover:bg-card/70"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-[11px] font-bold text-foreground/70">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-semibold text-foreground">
                    {d.title}
                  </p>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                    {d.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── System Components ── */}
      {project.architecture.components &&
        project.architecture.components.length > 0 && (
          <section className="mt-10">
            <p className="mb-4 text-sm font-semibold text-foreground/90">
              System Components
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {project.architecture.components.map((c, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-1.5 rounded-xl border border-black/[0.06] bg-muted/15 p-4 transition-colors hover:bg-muted/30"
                >
                  <div className="flex items-center gap-2">
                    <Box
                      size={13}
                      className="shrink-0 text-muted-foreground"
                    />
                    <p className="text-[13px] font-semibold text-foreground">
                      {c.name}
                    </p>
                  </div>
                  <p className="text-[12.5px] leading-relaxed text-muted-foreground">
                    {c.role}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

      {/* ── Data Flow ── */}
      {project.architecture.dataFlow &&
        project.architecture.dataFlow.length > 0 && (
          <section className="mt-10">
            <p className="mb-4 text-sm font-semibold text-foreground/90">
              Request / Data Flow
            </p>
            <div className="rounded-2xl border border-black/[0.06] bg-muted/10 p-5">
              <ol className="space-y-0">
                {project.architecture.dataFlow.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 py-2.5">
                    <span className="mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-[11px] font-bold text-background">
                      {i + 1}
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="text-[13.5px] leading-relaxed text-foreground/85">
                        {step}
                      </span>
                      {i <
                        (project.architecture.dataFlow?.length ?? 0) - 1 && (
                        <div className="ml-[3px] mt-1 h-4 border-l-2 border-dashed border-black/[0.08]" />
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

      {/* ── Built With ── */}
      <section className="mt-14">
        <SectionHeading icon={<Box size={16} />} title="Built With" />
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-black/[0.06] bg-muted/30 px-3.5 py-1.5 text-[12.5px] font-medium text-foreground/80"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ── Navigation Footer ── */}
      <footer className="mt-16 flex items-center justify-between border-t border-black/[0.06] pt-6">
        <Link
          to="/projects/$slug"
          params={{ slug: prev.slug }}
          className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          {prev.name}
        </Link>
        <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
          all projects
        </Link>
        <Link
          to="/projects/$slug"
          params={{ slug: next.slug }}
          className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {next.name}
          <ChevronRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </footer>
    </main>
  );
}

/* ── Reusable Section Heading ── */
function SectionHeading({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground">{icon}</span>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </p>
    </div>
  );
}
