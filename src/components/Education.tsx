import { GraduationCap, Briefcase } from "lucide-react";

export const Education = () => {
  return (
    <section className="py-6">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Education */}
          <div className="space-y-6 animate-slide-up">
            <h2 className="text-2xl font-medium flex items-center gap-3 uppercase tracking-wider">
              <GraduationCap className="w-6 h-6" />
              Education
            </h2>

            <div className="relative border border-border rounded-md dev-mode:rounded-none p-8 bg-card dev-mode:border-2 dev-mode:hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] dev-mode:hover:border-foreground/40 dev-mode:transition-all dev-mode:duration-300 dev-mode:hover:scale-[1.01]">
              {/* Binder rings */}
              <div className="absolute -left-3 top-1/4 w-6 h-6 rounded-full dev-mode:rounded-none border border-border bg-background dev-mode:border-2" />
              <div className="absolute -left-3 top-1/2 w-6 h-6 rounded-full dev-mode:rounded-none border border-border bg-background dev-mode:border-2" />
              
              <h3 className="text-xl font-semibold mb-2">
                Addis Ababa Institute of Technology (AAiT) B.Sc. in Software Engineering
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                <strong>Relevant Coursework:</strong> Data Structures, Algorithms, Database Systems, 
                Web Development, Object-Oriented Programming, Software Engineering Principles
              </p>
              <p className="text-sm text-muted-foreground">
                Expected Graduation: 2028
              </p>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <h2 className="text-2xl font-medium flex items-center gap-3 uppercase tracking-wider">
              <Briefcase className="w-6 h-6" />
              Experience
            </h2>

            <div className="relative border border-border rounded-md dev-mode:rounded-none p-8 bg-card space-y-6 dev-mode:border-2 dev-mode:hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] dev-mode:hover:border-foreground/40 dev-mode:transition-all dev-mode:duration-300 dev-mode:hover:scale-[1.01]">
              {/* Binder rings */}
              <div className="absolute -left-3 top-1/4 w-6 h-6 rounded-full dev-mode:rounded-none border border-border bg-background dev-mode:border-2" />
              <div className="absolute -left-3 top-1/2 w-6 h-6 rounded-full dev-mode:rounded-none border border-border bg-background dev-mode:border-2" />
              
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Open Source Contributor – Moodie Movie Site
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  <strong>Role:</strong> Frontend Developer
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Technologies:</strong> HTML, CSS, JavaScript, Vercel
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Project:</strong>{" "}
                  <a 
                    href="https://github.com/bethe19/moodie-movie-site" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Moodie Movie Site
                  </a>
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Description:</strong> Developed interactive UI components, integrated APIs, 
                  optimized responsiveness, and deployed the project live on{" "}
                  <a 
                    href="https://moodie-neon.vercel.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Vercel
                  </a>.
                </p>
              </div>

              <hr className="border-border" />

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  AI Research Intern — iCog Labs
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  October 2025 – Present
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  Assisting the Pattern Miner Hyperon Team in AI research and development using 
                  the Meta language.
                </p>
                <p className="text-sm text-muted-foreground">
                  Supporting experiments in pattern recognition and knowledge representation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
