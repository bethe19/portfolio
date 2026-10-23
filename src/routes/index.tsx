import { createFileRoute } from "@tanstack/react-router";
import { projects } from "@/lib/projects";
import { PROFILE, SITE_URL } from "@/lib/constants";
import { getPersonJsonLd, getWebSiteJsonLd, getProfilePageJsonLd } from "@/lib/seo";

import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { WhatIDoSection } from "@/components/WhatIDoSection";
import { CareerSection } from "@/components/CareerSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { TechStackSection } from "@/components/TechStackSection";
import { ContactSection } from "@/components/ContactSection";

export const Route = createFileRoute("/")({
  head: () => {
    const personLd = getPersonJsonLd();
    const websiteLd = getWebSiteJsonLd();
    const profilePageLd = getProfilePageJsonLd();
    const projectsItemListLd = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Featured Engineering Case Studies",
      itemListElement: projects.map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${SITE_URL}/projects/${p.slug}`,
        name: p.name,
        description: p.tagline,
      })),
    };

    const structuredData = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [personLd, websiteLd, profilePageLd, projectsItemListLd],
    });

    return {
      meta: [
        {
          title: `${PROFILE.name} — Backend & Distributed Systems Engineer | ${PROFILE.university}`,
        },
        {
          name: "description",
          content: `${PROFILE.name} is a backend and distributed systems engineer building high-throughput microservices with Go, gRPC, Apache Kafka, and PostgreSQL. ${PROFILE.degree} student at ${PROFILE.universityFull} & A2SV trainee in ${PROFILE.location}. Open to backend engineering roles.`,
        },
        {
          name: "keywords",
          content: `${PROFILE.name}, software engineer, Addis Ababa University, AAiT, AAU Ethiopia, Backend Engineer, Go Developer, Distributed Systems, Microservices, gRPC, Kafka, Python, TypeScript, A2SV, Riftronix, iCog Labs, Software Engineer Addis Ababa`,
        },
        { name: "author", content: PROFILE.name },
        { name: "gender", content: PROFILE.gender },
        {
          property: "og:title",
          content: `${PROFILE.name} — Backend & Distributed Systems Engineer | AAiT`,
        },
        {
          property: "og:description",
          content: `Backend engineer building high-throughput distributed systems with Go, gRPC, Kafka, and PostgreSQL. ${PROFILE.university} student & A2SV trainee.`,
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${SITE_URL}/` },
        { property: "og:image", content: `${SITE_URL}/og-image.png` },
        { property: "profile:first_name", content: PROFILE.givenName },
        { property: "profile:last_name", content: PROFILE.familyName },
        { property: "profile:gender", content: PROFILE.gender.toLowerCase() },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: `${PROFILE.name} — Backend & Distributed Systems Engineer`,
        },
        {
          name: "twitter:description",
          content: `Backend engineer building high-throughput distributed systems with Go, gRPC, Kafka, and PostgreSQL. ${PROFILE.university} & A2SV.`,
        },
        { name: "twitter:image", content: `${SITE_URL}/og-image.png` },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/` }],
      scripts: [{ type: "application/ld+json", children: structuredData }],
    };
  },
  component: Home,
});

function Home() {
  return (
    <div className="main-body">
      {/* Cursor */}
      <CustomCursor />

      {/* Navbar + circles */}
      <Navbar />

      {/* Main page flow */}
      <main className="container-main">
        <HeroSection />
        <WhatIDoSection />
        <CareerSection />
        <ProjectsSection />
        <TechStackSection />
        <ContactSection />
      </main>
    </div>
  );
}
