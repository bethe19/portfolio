import { useEffect, useRef } from "react";

interface SkillTool {
  name: string;
  icon: string;
}

interface SkillCategory {
  title: string;
  description: string;
  details: string;
  tools: SkillTool[];
}

const skills: SkillCategory[] = [
  {
    title: "DISTRIBUTED SYSTEMS",
    description: "Go · gRPC · Kafka · Microservices",
    details:
      "Architecting distributed Go backends decoupled via Apache Kafka and low-latency gRPC. Implementing Saga transaction compensation patterns for atomic consistency across microservices without 2PC locking bottlenecks.",
    tools: [
      { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
      { name: "gRPC", icon: "https://grpc.io/img/logos/grpc-icon-color.png" },
      { name: "Protobuf", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" },
      { name: "Apache Kafka", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Gin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    ],
  },
  {
    title: "FULL-STACK DEVELOPMENT",
    description: "React · TypeScript · Node.js · Databases",
    details:
      "Building responsive and performant full-stack web applications using React, Next.js, Node.js, and TypeScript. Designing high-reliability PostgreSQL and Redis storage layers with database-per-service isolation and pgx v5.",
    tools: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    ],
  },
  {
    title: "PYTHON & AI",
    description: "400+ Problems · NumPy ML · System Design",
    details:
      "Rooted in rigorous algorithmic foundations at A2SV (Africa to Silicon Valley) and foundational ML research at iCog Labs. Implementing classic algorithms and ML models from mathematical first principles — Perceptron, SVM — in pure NumPy.",
    tools: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      { name: "System Design", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
    ],
  },
];

export function WhatIDoSection() {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouchDevice) return;

    const handlers: (() => void)[] = [];

    containerRef.current.forEach((card, i) => {
      if (!card) return;
      card.classList.remove("wid-notouch");
      const handler = () => {
        const isActive = card.classList.contains("wid-active");
        containerRef.current.forEach((c) => {
          if (c) c.classList.remove("wid-active", "wid-sibling");
        });
        if (!isActive) {
          card.classList.add("wid-active");
          containerRef.current.forEach((c, j) => {
            if (c && j !== i) c.classList.add("wid-sibling");
          });
        }
      };
      card.addEventListener("click", handler);
      handlers.push(() => card.removeEventListener("click", handler));
    });

    return () => handlers.forEach((fn) => fn());
  }, []);

  return (
    <section id="what-i-do" className="wid-section" aria-label="What I Do">
      {/* Left: Big heading */}
      <div className="wid-heading-box">
        <h2 className="wid-heading">
          W<span className="wid-hat">HAT</span>
          <br />
          <span className="wid-i">&nbsp;I</span>
          <span className="wid-do"> DO</span>
        </h2>
      </div>

      {/* Right: Accordion cards */}
      <div className="wid-cards-box">
        <div className="wid-cards-wrap">
          {/* Vertical dashed borders */}
          <div className="wid-vborder" aria-hidden="true">
            <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }}>
              <line x1="0" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="2" strokeDasharray="7,7" />
              <line x1="100%" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="2" strokeDasharray="7,7" />
            </svg>
          </div>

          {skills.map((skill, i) => (
            <div
              key={i}
              className="wid-card wid-notouch"
              ref={(el) => { containerRef.current[i] = el; }}
            >
              {/* Horizontal dashed borders */}
              <div className="wid-hborder" aria-hidden="true">
                <svg height="100%" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", width: "100%" }}>
                  {i === 0 && (
                    <line x1="0" y1="0" x2="100%" y2="0" stroke="currentColor" strokeWidth="2" strokeDasharray="6,6" />
                  )}
                  <line x1="0" y1="100%" x2="100%" y2="100%" stroke="currentColor" strokeWidth="2" strokeDasharray="6,6" />
                </svg>
              </div>

              <div className="wid-corner" aria-hidden="true" />

              <div className="wid-content-inner">
                <h3 className="wid-card-title">{skill.title}</h3>
                <h4 className="wid-card-desc">{skill.description}</h4>
                <p className="wid-card-details">{skill.details}</p>
                <h5 className="wid-skillset-label">Skillset &amp; tools</h5>
                <div className="wid-tags-wrap">
                  {skill.tools.map((tool) => (
                    <span key={tool.name} className="wid-tag">
                      <img src={tool.icon} alt="" className="wid-tag-icon" loading="lazy" />
                      <span>{tool.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="wid-arrow" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhatIDoSection;
