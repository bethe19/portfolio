export const RESUME_URL =
  "https://drive.google.com/file/d/1VKc7u8Ffdal_BR1NBieaXFP7xqkMAomv/view?usp=drive_link";

export const SITE_URL = "https://bethebayou.me";

export const PROFILE = {
  name: "Bethe Bayou",
  givenName: "Bethe",
  familyName: "Bayou",
  gender: "Male",
  title: "Backend & Distributed Systems Engineer",
  tagline: "Building resilient microservices, high-throughput pipelines, and distributed systems with Go, Python, and TypeScript.",
  university: "Addis Ababa University (AAiT)",
  universityFull: "Addis Ababa University — Addis Ababa Institute of Technology (AAiT)",
  department: "College of Technology & Built Environments",
  degree: "B.Sc. in Software Engineering",
  graduationRange: "2023 — 2028",
  location: "Addis Ababa, Ethiopia",
  country: "Ethiopia",
  countryCode: "ET",
  coordinates: {
    latitude: 9.0192,
    longitude: 38.7525,
  },
  email: "bethebayou@gmail.com",
  socials: {
    github: "https://github.com/bethe19",
    linkedin: "https://www.linkedin.com/in/bethe-bayou",
    telegram: "https://t.me/bethe19",
  },
  languages: [
    { name: "English", level: "Fluent / Professional Working Proficiency", code: "en" },
    { name: "Amharic", level: "Native / Bilingual Proficiency", code: "am" },
  ],
  organizations: {
    university: {
      name: "Addis Ababa University",
      alternateName: ["AAU", "AAiT", "Addis Ababa Institute of Technology"],
      url: "https://www.aau.edu.et",
    },
    a2sv: {
      name: "A2SV (Africa to Silicon Valley)",
      url: "https://a2sv.org",
      role: "Software Engineering Trainee",
    },
    riftronix: {
      name: "Riftronix",
      role: "AI & Software Engineering Intern",
    },
    icogLabs: {
      name: "iCog Labs",
      role: "AI Research Intern",
    },
    revelo: {
      name: "Revelo",
      role: "AI Training Expert",
    },
  },
} as const;
