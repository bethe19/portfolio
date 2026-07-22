import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getProject, projects, type Project } from "@/lib/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const title = p ? `${p.name} — Bethe Bayou` : "Project — Bethe Bayou";
    const desc = p?.tagline ?? "Project by Bethe Bayou.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
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
  const next = projects[(idx + 1) % projects.length];

  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-6 py-16 sm:py-24">
      <header className="flex items-center justify-between">
        <Link
          to="/"
          className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          ← Bethe Bayou
        </Link>
        <ThemeToggle />
      </header>

      <section className="mt-14">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {project.year} · {project.stack}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          {project.name}
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          {project.tagline}
        </p>
      </section>

      <section className="mt-12 space-y-5 text-[15px] leading-relaxed text-foreground/90">
        {project.about.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </section>

      <section className="mt-14">
        <p className="mb-5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Highlights
        </p>
        <ul className="space-y-3">
          {project.highlights.map((h) => (
            <li
              key={h}
              className="flex gap-3 border-b border-border/60 pb-3 text-[15px]"
            >
              <span className="font-mono text-xs text-muted-foreground">
                ◇
              </span>
              <span className="text-foreground/90">{h}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <p className="mb-5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Built with
        </p>
        <ul className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-md border border-border/70 bg-muted/40 px-2.5 py-1.5 font-mono text-[12px] text-foreground/90"
            >
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="text-foreground underline-offset-4 hover:underline"
        >
          view on github ↗
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline-offset-4 hover:underline"
          >
            live site ↗
          </a>
        )}
      </section>

      <footer className="mt-20 flex items-center justify-between border-t border-border/60 pt-6 text-sm">
        <Link
          to="/"
          className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          ← all projects
        </Link>
        <Link
          to="/projects/$slug"
          params={{ slug: next.slug }}
          className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          {next.name} →
        </Link>
      </footer>
    </main>
  );
}
