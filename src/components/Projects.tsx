import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Moodie - Mood based Movie Discovery Web App",
    description: "Built with HTML, CSS, and JavaScript, integrated with the TMDB API. Features real-time movie search and interactive card hover animations. Moodie is a web platform built for movie enthusiasts to discover, browse, and keep track of films in a seamless way. Users can explore new releases, search for specific titles, read details, and curate personalized watchlists. The site focuses on providing a simple, intuitive interface that makes movie discovery easy and enjoyable, while helping users organize their movie interests in one place. The goal is to combine functionality with a clean design, making the experience smooth and engaging for anyone who loves films.",
    image: "/Screenshot 2025-09-08 231345.png",
    github: "https://github.com/bethe19/moodie-movie-site",
    live: "https://moodie-neon.vercel.app",
  },
  {
    title: "Notie - Simple Note Taking App",
    description: "This is a small note-taking app I built using HTML, CSS, and JavaScript. I made it just to practice DOM manipulation, localStorage, and overall how to make something useful from scratch. Notie is a lightweight, user-friendly note-taking application designed to help users capture ideas, tasks, and reminders efficiently. It allows for creating, editing, and organizing notes across different categories, making information easy to access and manage. The focus of Notie is on simplicity and speed, reducing friction in jotting down thoughts while maintaining a clean and organized interface. It’s intended for students, professionals, and anyone looking to streamline how they manage their notes and ideas.",
    image: "/image.png",
    github: "https://github.com/bethe19/notie",
    live: "https://notie-ashen.vercel.app/",
  },
  {
    title: "ScoutAI – Football Talent Analysis (In Progress)",
    description: "Custom AI project concept to analyze football talent. Aimed at building a mid-level AI model for practical scouting applications. ScoutAI is an AI-driven platform aimed at analyzing football talent and performance in a data-driven way. The idea is to help scouts, coaches, and players gain insights into player abilities, track progress over time, and make more informed decisions. Using AI models and real-world football data, ScoutAI intends to turn raw performance metrics into actionable insights. Though still in development, the project combines sports knowledge, data analysis, and software engineering to create a tool that bridges the gap between talent evaluation and measurable performance.",
    image: "/1.webp",
    github: "#",
    live: "#",
    inProgress: true,
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-medium mb-12 text-center uppercase tracking-wider">
            Projects
          </h2>

          <div className="space-y-6">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="group border border-border rounded-md overflow-hidden bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-80 flex-shrink-0">
                    <div className="relative aspect-video md:aspect-[4/3.5] overflow-hidden bg-secondary">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex gap-3 mt-4">
                      {!project.inProgress ? (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-border hover:bg-foreground hover:text-background"
                            asChild
                          >
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-2" />
                              GitHub
                            </a>
                          </Button>
                          <Button
                            size="sm"
                            className="bg-foreground text-background hover:bg-foreground/90"
                            asChild
                          >
                            <a href={project.live} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Live Preview
                            </a>
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          variant="secondary"
                          disabled
                        >
                          In Progress
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
