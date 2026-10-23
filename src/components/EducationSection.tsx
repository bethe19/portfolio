import { GraduationCap, Award, BookOpen } from "lucide-react";

export function EducationSection() {
  const education = [
    {
      institution: "Addis Ababa University (AAiT)",
      degree: "B.Sc. in Software Engineering",
      period: "2023 — 2028",
      location: "Addis Ababa, Ethiopia",
      icon: GraduationCap,
      details:
        "College of Technology & Built Environments. Intensive coursework and hands-on lab focus on Distributed Systems, Operating Systems, Database Management Systems, and Advanced Algorithm Design.",
      highlights: ["Distributed Systems", "Operating Systems", "DBMS & SQL", "Data Structures"],
    },
    {
      institution: "DeepLearning.AI · Stanford (Coursera)",
      degree: "Supervised Machine Learning Certification",
      period: "2025",
      location: "Online",
      icon: Award,
      details:
        "Rigorous training in linear & logistic regression, multi-class classification, cost function derivation, gradient descent optimization, and L1/L2 regularization.",
      highlights: ["Gradient Descent", "Logistic Regression", "Regularization", "Cost Functions"],
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-8 max-w-5xl mx-auto relative z-10">
      <div className="text-center space-y-2 mb-12">
        <p className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-accent">
          Foundations & Academics
        </p>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
          Education & Certifications
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-border bg-card/60 p-6 sm:p-8 backdrop-blur-md transition-all hover:border-accent/40 hover:bg-card/90 hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent border border-accent/20">
                    <Icon size={22} />
                  </div>
                  <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full border border-border bg-muted/40 text-muted-foreground">
                    {item.period}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold tracking-tight text-foreground">
                  {item.institution}
                </h3>
                <p className="text-sm font-semibold text-accent mt-0.5">{item.degree}</p>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">{item.location}</p>

                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {item.details}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex flex-wrap gap-1.5">
                {item.highlights.map((h) => (
                  <span
                    key={h}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md border border-border bg-muted/20 text-foreground/80"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default EducationSection;
