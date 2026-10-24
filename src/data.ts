// All portfolio content lives here so it can be edited without touching the layout.

export const profile = {
  name: "Bethe Bayou",
  tagline: "Backend-Focused Full-Stack Engineer | Addis Ababa, Ethiopia",
  email: "bethebayou@gmail.com",
  phone: "+251 920 420 134",
  phoneHref: "tel:+251920420134",
  location: "Addis Ababa, Ethiopia",
  resume: "https://drive.google.com/file/d/1VKc7u8Ffdal_BR1NBieaXFP7xqkMAomv/view?usp=drive_link",
  github: "https://github.com/bethe19",
  linkedin: "https://www.linkedin.com/in/bethe-bayou",
  telegram: "https://t.me/bethe19",
  upwork: "https://www.upwork.com/freelancers/bethebayou",
};

export const bio = [
  "Hi, I'm Bethe. I'm a backend-focused full-stack engineer and software engineering student at Addis Ababa University (AAiT) & A2SV trainee based in Addis Ababa, Ethiopia.",
  "I specialize in architecting high-throughput microservices, distributed systems, and modern web applications with Go, Python, TypeScript, and React — leveraging gRPC, Apache Kafka, PostgreSQL, and Redis for scalable, resilient architectures.",
];

export type Job = {
  role: string;
  company: string;
  url?: string;
  // Square logo in /public/logos; jobs without one show a fallback icon
  logo?: string;
  description?: string;
  // Shown in the timeline pill, e.g. "May 2024 - October 2025"
  period: string;
  points?: string[];
};

export const experience: Job[] = [
  {
    role: "Software Engineering Trainee",
    company: "A2SV (Africa to Silicon Valley)",
    url: "https://a2sv.org",
    logo: "/logos/a2sv.png",
    period: "2026 - Present",
    points: [
      "Selected for elite training program; solved 400+ complex algorithmic challenges covering advanced graph theory, dynamic programming, tree traversals, and distributed system design.",
      "Engineered scalable data structures and participated in deep system design sessions and rigorous technical mock interviews.",
    ],
  },
  {
    role: "AI and Software Engineer",
    company: "Riftronix",
    logo: "/logos/riftronix.png",
    period: "2025 - 2026",
    points: [
      "Engineered backend services and integration pipelines bridging hardware IoT sensor telemetry with real-time data processing, ingest pipelines, and analytics APIs.",
      "Built resilient event ingestion flows to handle high-frequency sensor readings with low latency.",
    ],
  },
  {
    role: "AI Research Intern",
    company: "iCog Labs",
    url: "https://icog-labs.com",
    logo: "/logos/icoglabs.png",
    period: "2025 - 2026",
    points: [
      "Researched AGI cognitive architectures and implemented foundational machine learning algorithms (Perceptron, SVM dual form) from mathematical first principles in pure NumPy.",
      "Benchmarked algorithmic convergence rates and memory efficiency against standard scientific computing libraries.",
    ],
  },
  {
    role: "AI Training Expert",
    company: "Revelo",
    url: "https://www.revelo.com",
    logo: "/logos/revelo.png",
    period: "2025",
    points: [
      "Evaluated, debugged, and benchmarked LLM-generated code for complex software challenges, verifying algorithmic efficiency, edge-case safety, and code correctness.",
    ],
  },
];

export type Project = {
  title: string;
  description: string;
  tech: string[];
  // Without an image the card shows a placeholder with the project title
  image?: string;
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    title: "Mini-Order",
    description:
      "A modular Go microservices e-commerce system with dual REST & gRPC protocols, Kafka event streaming, and distributed Saga transaction rollback for atomic order-stock coordination.",
    tech: ["Go", "gRPC", "Apache Kafka", "Docker", "PostgreSQL", "REST API"],
    image: "/images/mini-order.png",
    github: "https://github.com/bethe19/mini-order",
  },
    {
    title: "Goom CRM",
    description:
      "A modular monolith customer relationship management system engineered in Go with structured logging, RBAC, domain-driven clean architecture, and responsive UI.",
    tech: ["Go", "PostgreSQL", "Docker", "REST API", "Tailwind CSS"],
    image: "/images/goom-crm.png",
    github: "https://github.com/bethe19/goom-crm",
    live: "https://goom-crm.vercel.app",
  },
  {
    title: "Event Booking System",
    description:
      "A high-concurrency ticket reservation engine preventing race conditions and overbooking through Redis distributed locks and transactional isolation under burst traffic.",
    tech: ["Go", "Redis", "PostgreSQL", "Docker", "REST API"],
    image: "/images/event-booking.png",
    github: "https://github.com/bethe19/event-booking",
  },
  {
    title: "NextStop",
    description:
      "Real-time municipal bus telemetry and transit tracking platform streaming live GPS coordinates over WebSockets to interactive route maps with low latency updates.",
    tech: ["TypeScript", "Node.js", "WebSocket", "React", "PostgreSQL"],
    image: "/images/nextstop.png",
    github: "https://github.com/bethe19/nextstop",
  },
  {
    title: "FinTrack",
    description:
      "A high-performance personal finance and budget analytics API with automated recurring transaction categorization, ledger reconciliations, and secure JWT auth.",
    tech: ["Python", "FastAPI", "PostgreSQL", "Docker", "JWT"],
    image: "/images/fintrack.jpg",
    github: "https://github.com/bethe19/fintrack",
    live: "https://fin-track-eth.vercel.app",
  },

  {
    title: "Perceptron & SVM Dual Form",
    description:
      "Mathematical first-principles implementation of the Perceptron algorithm and Support Vector Machine dual formulation using quadratic programming in pure NumPy without frameworks.",
    tech: ["Python", "NumPy", "Linear Algebra", "Optimization", "Machine Learning"],
    github: "https://github.com/bethe19/perceptron-svm",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Go", "Python", "TypeScript", "JavaScript", "Dart", "C++", "C", "SQL"] },
  { group: "Backend & Systems", items: ["gRPC", "REST API", "Kafka", "Redis", "RabbitMQ", "Microservices", "FastAPI", "Express.js"] },
  {
    group: "AI & Machine Learning",
    items: ["Machine Learning", "LLMs", "RAG", "AI Agents", "NumPy", "PyTorch", "Scikit-Learn", "Prompt Engineering"],
  },
  { group: "Databases", items: ["PostgreSQL", "MongoDB", "MySQL", "Redis"] },
  { group: "DevOps & Tools", items: ["Docker", "Git", "GitHub", "Linux", "Nginx", "CI/CD"] },
  { group: "Architecture", items: ["Distributed Systems", "Saga Pattern", "Event-Driven", "Clean Architecture", "Concurrency"] },
  { group: "Frontend & Mobile", items: ["React", "Next.js", "Flutter", "Tailwind CSS", "HTML5", "CSS3"] },
];

export const education = [
  {
    school: "Addis Ababa University",
    college: "Addis Ababa Institute of Technology (AAiT)",
    url: "https://www.aau.edu.et/",
    degree: "BSc in Software Engineering",
    period: "2023 - 2028",
    summary:
      "Core coursework in Data Structures & Algorithms, Distributed Systems, Database Systems, Computer Networks, Operating Systems, Computer Architecture, Machine Learning, and System Design. Designing and building distributed backends and high-performance services applying rigorous software engineering principles.",
  },
];
