import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    period: "2026 - Present",
    displayYear: "NOW",
    role: "Software Engineering Trainee",
    company: "A2SV (Africa to Silicon Valley)",
    description:
      "Selected for elite training program; solved 400+ complex algorithmic challenges covering advanced graph theory, dynamic programming, tree traversals, and distributed system design.",
  },
  {
    period: "2025 - 2026",
    displayYear: "2025",
    role: "AI & Software Engineer Intern",
    company: "Riftronix",
    description:
      "Engineered backend services and integration pipelines bridging hardware IoT sensor telemetry with real-time data processing, ingest pipelines, and analytics APIs.",
  },
  {
    period: "2025 - 2026",
    displayYear: "2025",
    role: "AI Research Intern",
    company: "iCog Labs",
    description:
      "Researched AGI cognitive architectures and implemented foundational machine learning algorithms (Perceptron, SVM dual form) from mathematical first principles in pure NumPy.",
  },
  {
    period: "2025",
    displayYear: "2025",
    role: "AI Training Expert",
    company: "Revelo",
    description:
      "Evaluated, debugged, and benchmarked LLM-generated code for complex software challenges, verifying algorithmic efficiency, edge-case safety, and code correctness.",
  },
  {
    period: "2023",
    displayYear: "2023",
    role: "B.Sc. Software Engineering",
    company: "Addis Ababa University (AAiT)",
    description:
      "Enrolled in the B.Sc. Software Engineering program at Addis Ababa Institute of Technology — building a strong foundation in algorithms, systems, and distributed computing.",
  },
];

const getDisplayYear = (period: string) => {
  if (period.includes("Present")) return "NOW";
  if (period.includes(" - ")) return period.split(" - ")[0];
  return period;
};

export function CareerSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const careerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".career-section",
          start: "top 55%",
          end: "bottom 30%",
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });

      careerTimeline
        .fromTo(
          ".career-timeline",
          { maxHeight: "0%" },
          { maxHeight: "100%", duration: 1, ease: "none" },
          0
        )
        .fromTo(
          ".career-timeline",
          { opacity: 0 },
          { opacity: 1, duration: 0.2 },
          0
        )
        .fromTo(
          ".career-info-box",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: "power2.out" },
          0
        )
        .fromTo(
          ".career-dot",
          { animationIterationCount: "infinite" },
          {
            animationIterationCount: "1",
            delay: 0.3,
            duration: 0.1,
          },
          0
        );

      if (window.innerWidth > 1024) {
        careerTimeline.fromTo(
          ".career-section",
          { y: 0 },
          { y: "15%", duration: 0.5, delay: 0.2 },
          0
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="career-section section-container" id="career" ref={sectionRef}>
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br />
          experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot" />
          </div>
          {experiences.map((exp, index) => (
            <div key={index} className="career-info-box">
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{exp.role}</h4>
                  <h5>{exp.company}</h5>
                </div>
                <h3>{getDisplayYear(exp.period)}</h3>
              </div>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CareerSection;
