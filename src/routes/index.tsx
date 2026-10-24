import { createFileRoute } from "@tanstack/react-router";
import { profile } from "@/data";
import { Intro } from "@/components/intro";
import { Experience } from "@/components/experience";
import { Education } from "@/components/education";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";

const siteUrl = "https://bethebayou.me";
const title = "Bethe Bayou | Backend-Focused Full-Stack Engineer";
const description =
  "Bethe Bayou is a backend-focused full-stack engineer based in Addis Ababa, Ethiopia, who builds fast, reliable microservices, distributed systems, and modern web applications.";

export const Route = createFileRoute("/")({
  head: () => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": `${siteUrl}/#person`,
          name: "Bethe Bayou",
          givenName: "Bethe",
          familyName: "Bayou",
          url: `${siteUrl}/`,
          email: "mailto:bethebayou@gmail.com",
          jobTitle: "Backend-Focused Full-Stack Engineer",
          description,
          hasOccupation: {
            "@type": "Occupation",
            name: "Software Engineer",
            occupationLocation: { "@type": "City", name: "Addis Ababa, Ethiopia" },
          },
          image: {
            "@type": "ImageObject",
            url: `${siteUrl}/hero-light.png`,
            width: 800,
            height: 800,
          },
          sameAs: [
            "https://github.com/bethe19",
            "https://www.linkedin.com/in/bethe-bayou",
            "https://t.me/bethe19",
          ],
          knowsAbout: [
            "Software Engineering",
            "Backend Development",
            "Distributed Systems",
            "Microservices",
            "Go",
            "Python",
            "TypeScript",
            "gRPC",
            "Apache Kafka",
            "PostgreSQL",
            "Redis",
            "Docker",
          ],
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "Addis Ababa University",
            url: "https://www.aau.edu.et/",
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Addis Ababa",
            addressCountry: "ET",
          },
        },
        {
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          name: "Bethe Bayou",
          alternateName: ["Bethe Bayou Portfolio", "bethebayou.me"],
          url: `${siteUrl}/`,
          description,
          inLanguage: "en",
          author: { "@id": `${siteUrl}/#person` },
        },
        {
          "@type": "ProfilePage",
          "@id": `${siteUrl}/#profilepage`,
          url: `${siteUrl}/`,
          name: title,
          description,
          dateModified: new Date().toISOString(),
          isPartOf: { "@id": `${siteUrl}/#website` },
          mainEntity: { "@id": `${siteUrl}/#person` },
        },
      ],
    };

    return {
      meta: [
        { title },
        { name: "description", content: description },
        {
          name: "keywords",
          content:
            "Bethe Bayou, Software Engineer, Software Engineer Ethiopia, Backend Engineer, Distributed Systems, Go Developer, Addis Ababa, Ethiopia, AAiT, A2SV, Kafka, gRPC, Docker, PostgreSQL",
        },
        { name: "author", content: profile.name },
        { property: "og:type", content: "profile" },
        { property: "og:site_name", content: "Bethe Bayou" },
        { property: "og:url", content: `${siteUrl}/` },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: `${siteUrl}/hero-light.png` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: `${siteUrl}/hero-light.png` },
      ],
      links: [{ rel: "canonical", href: `${siteUrl}/` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        },
      ],
    };
  },
  component: Portfolio,
});

export default function Portfolio() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-10 sm:px-6 md:pt-16">
      <main>
        <Intro />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="mt-16 flex flex-wrap justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>{profile.location}</p>
      </footer>
    </div>
  );
}
