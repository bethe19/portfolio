import { PROFILE, RESUME_URL, SITE_URL } from "./constants";
import { projects } from "./projects";

export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: PROFILE.name,
    givenName: PROFILE.givenName,
    familyName: PROFILE.familyName,
    gender: PROFILE.gender,
    jobTitle: PROFILE.title,
    description: `${PROFILE.name} is a male backend and distributed systems engineer and Software Engineering student at ${PROFILE.universityFull} based in ${PROFILE.location}. Specializes in Go, Python, TypeScript, microservices, gRPC, and Apache Kafka.`,
    url: SITE_URL,
    image: `${SITE_URL}/og-image.png`,
    email: `mailto:${PROFILE.email}`,
    nationality: {
      "@type": "Country",
      name: PROFILE.country,
      sameAs: "https://en.wikipedia.org/wiki/Ethiopia",
    },
    birthPlace: {
      "@type": "Place",
      name: PROFILE.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Addis Ababa",
        addressCountry: PROFILE.countryCode,
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Addis Ababa",
      addressRegion: "Addis Ababa",
      addressCountry: PROFILE.countryCode,
    },
    alumniOf: [
      {
        "@type": ["EducationalOrganization", "CollegeOrUniversity"],
        name: PROFILE.organizations.university.name,
        alternateName: PROFILE.organizations.university.alternateName,
        url: PROFILE.organizations.university.url,
        department: PROFILE.department,
        sameAs: "https://en.wikipedia.org/wiki/Addis_Ababa_University",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Addis Ababa",
          addressCountry: PROFILE.countryCode,
        },
      },
      {
        "@type": "EducationalOrganization",
        name: PROFILE.organizations.a2sv.name,
        url: PROFILE.organizations.a2sv.url,
        description:
          "Africa to Silicon Valley — elite data structures, algorithms, and system design academy.",
      },
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: PROFILE.degree,
        credentialCategory: "degree",
        educationalLevel: "Bachelor's Degree",
        recognizedBy: {
          "@type": "CollegeOrUniversity",
          name: PROFILE.organizations.university.name,
          url: PROFILE.organizations.university.url,
        },
      },
    ],
    worksFor: [
      {
        "@type": "Organization",
        name: PROFILE.organizations.riftronix.name,
        description: PROFILE.organizations.riftronix.role,
      },
      {
        "@type": "Organization",
        name: PROFILE.organizations.icogLabs.name,
        description: PROFILE.organizations.icogLabs.role,
      },
      {
        "@type": "Organization",
        name: PROFILE.organizations.revelo.name,
        description: PROFILE.organizations.revelo.role,
      },
    ],
    knowsLanguage: PROFILE.languages.map((l) => ({
      "@type": "Language",
      name: l.name,
      alternateName: l.code,
    })),
    knowsAbout: [
      "Go (Programming Language)",
      "Distributed Systems",
      "Microservices Architecture",
      "Apache Kafka",
      "gRPC & Protocol Buffers",
      "Docker & Containerization",
      "PostgreSQL",
      "Redis",
      "Python",
      "TypeScript",
      "RESTful API Design",
      "Saga Pattern",
      "System Design",
      "Data Structures and Algorithms",
      "Clean Architecture",
    ],
    sameAs: [
      PROFILE.socials.github,
      PROFILE.socials.linkedin,
      PROFILE.socials.telegram,
      RESUME_URL,
    ],
    mainEntityOfPage: SITE_URL,
  };
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Bethe Bayou Portfolio",
    url: SITE_URL,
    description: `Official portfolio of ${PROFILE.name} — Backend & Distributed Systems Engineer, Addis Ababa University (AAiT).`,
    author: {
      "@id": `${SITE_URL}/#person`,
    },
    publisher: {
      "@id": `${SITE_URL}/#person`,
    },
    hasPart: [
      {
        "@type": "WebPage",
        name: "Home",
        url: `${SITE_URL}/`,
      },
      ...projects.map((p) => ({
        "@type": "WebPage",
        name: `${p.name} — Architecture Case Study`,
        url: `${SITE_URL}/projects/${p.slug}`,
      })),
    ],
  };
}

export function getProfilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: `${SITE_URL}/`,
    name: `${PROFILE.name} — Backend & Distributed Systems Engineer | ${PROFILE.university}`,
    description: `Portfolio and profile of ${PROFILE.name} (Male), software engineering student at ${PROFILE.universityFull} and A2SV trainee.`,
    mainEntity: {
      "@id": `${SITE_URL}/#person`,
    },
    dateModified: "2026-09-29",
  };
}
