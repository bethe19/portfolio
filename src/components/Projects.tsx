import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Code2, FileCode, Database, Zap, Brain, Atom, Palette, Server, Info, Terminal, Folder, GitBranch } from "lucide-react";
import { CarouselWithAutoplay, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { useDevMode } from "@/hooks/useDevMode";
import { useState } from "react";
import fintrackImage from "../../images/fintrackimgs/1.png";
import moodieImage from "../../images/Screenshot 2025-11-09 182951.png";
import notieImage from "../../images/image.png";
import scoutaiImage from "../../images/1.webp";
import checkmateImage from "../../images/photo_2025-11-20_11-44-04.jpg";
import nextstopImage from "../../images/nextstop/nextstop.png";

type TechStack = {
  name: string;
  icon: React.ReactNode;
};

const techStacks: Record<string, TechStack[]> = {
  fintrack: [
    { name: "React", icon: <Atom className="w-4 h-4" /> },
    { name: "TypeScript", icon: <Code2 className="w-4 h-4" /> },
    { name: "Node.js", icon: <Server className="w-4 h-4" /> },
    { name: "Database", icon: <Database className="w-4 h-4" /> },
  ],
  moodie: [
    { name: "React", icon: <Atom className="w-4 h-4" /> },
    { name: "Tailwind CSS", icon: <Palette className="w-4 h-4" /> },
    { name: "JavaScript", icon: <Code2 className="w-4 h-4" /> },
    { name: "TMDB API", icon: <Server className="w-4 h-4" /> },
  ],
  notie: [
    { name: "HTML", icon: <FileCode className="w-4 h-4" /> },
    { name: "CSS", icon: <FileCode className="w-4 h-4" /> },
    { name: "JavaScript", icon: <Code2 className="w-4 h-4" /> },
    { name: "localStorage", icon: <Database className="w-4 h-4" /> },
  ],
  scoutai: [
    { name: "AI/ML", icon: <Brain className="w-4 h-4" /> },
    { name: "JavaScript", icon: <Code2 className="w-4 h-4" /> },
    { name: "Data Analytics", icon: <Database className="w-4 h-4" /> },
  ],
  checkmate: [
    { name: "React", icon: <Atom className="w-4 h-4" /> },
    { name: "Node.js", icon: <Server className="w-4 h-4" /> },
    { name: "JavaScript", icon: <Code2 className="w-4 h-4" /> },
    { name: "Database", icon: <Database className="w-4 h-4" /> },
  ],
  nextstop: [
    { name: "Node.js", icon: <Server className="w-4 h-4" /> },
    { name: "Express.js", icon: <Server className="w-4 h-4" /> },
    { name: "MongoDB", icon: <Database className="w-4 h-4" /> },
    { name: "JWT", icon: <Zap className="w-4 h-4" /> },
    { name: "Stripe", icon: <Zap className="w-4 h-4" /> },
  ],
};

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: TechStack[];
  github: string;
  live: string;
  inProgress?: boolean;
  detail?: boolean;
}

export const featuredProjects: Project[] = [
  {
    id: "fintrack",
    title: "FinTrack – Personal Finance Manager",
    description: "A comprehensive finance tracking application to manage expenses, income, and budgets. Features real-time analytics and financial insights.",
    image: fintrackImage,
    techStack: techStacks.fintrack,
    github: "https://github.com/bethe19/fintrack",
    live: "https://fin-track-eth.vercel.app",
    detail: true,
  },
  {
    id: "moodie",
    title: "Moodie – Mood-Based Movie Discovery",
    description: "A sleek web app for movie lovers to discover films based on mood. Built with HTML, CSS, and JavaScript.",
    image: moodieImage,
    techStack: techStacks.moodie,
    github: "https://github.com/bethe19/moodie-movie-site",
    live: "https://moodie-neon.vercel.app",
  },
  {
    id: "notie",
    title: "Notie – Simple Note-Taking App",
    description: "A lightweight, user-friendly app to create and manage notes efficiently with localStorage integration.",
    image: notieImage,
    techStack: techStacks.notie,
    github: "https://github.com/bethe19/notie",
    live: "https://notie-ashen.vercel.app/",
  },
  {
    id: "checkmate",
    title: "CheckMate – Task Management App",
    description: "A full-stack todo application with both frontend and backend. Features task management, progress tracking, and reminders.",
    image: checkmateImage,
    techStack: techStacks.checkmate,
    github: "https://github.com/bethe19/checkmate",
    live: "#",
  },
  {
    id: "scoutai",
    title: "ScoutAI – Football Talent Analysis",
    description: "An AI-powered platform designed to analyze football talent and performance metrics. Currently in development.",
    image: scoutaiImage,
    techStack: techStacks.scoutai,
    github: "#",
    live: "#",
    inProgress: true,
  },
  {
    id: "nextstop",
    title: "NextStop – Tour Booking Backend API",
    description: "A comprehensive RESTful API backend for a tour booking platform. Built with Node.js, Express, and MongoDB, featuring JWT authentication, Stripe payments, and role-based access control.",
    image: nextstopImage,
    techStack: techStacks.nextstop,
    github: "https://github.com/bethe19/next-stop",
    live: "#",
    detail: true,
  },
];

export const Projects = () => {
  const isDevMode = useDevMode();
  const [selectedProject, setSelectedProject] = useState(0);

  // Normal Mode: Carousel layout
  if (!isDevMode) {
    return (
      <section id="projects" className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2 uppercase tracking-wider">
              Featured Projects
            </h2>
            <p className="text-sm text-muted-foreground">
              Showcase of my latest work and development
            </p>
          </div>

          <CarouselWithAutoplay className="w-full max-w-6xl mx-auto" autoplayInterval={5000}>
          <CarouselContent className="-ml-4">
            {featuredProjects.map((project) => (
              <CarouselItem
                key={project.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div className="group relative h-full flex flex-col">
                  {project.image && (
                    <div className="rounded-2xl overflow-hidden shadow-lg mb-3 group-hover:shadow-2xl transition-all duration-300 dev-mode:rounded-none dev-mode:border-2 dev-mode:border-foreground/10 dev-mode:group-hover:border-foreground/30 dev-mode:group-hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] bg-background">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 dev-mode:group-hover:scale-[1.08] dev-mode:group-hover:translate-y-[-2%]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 dev-mode:opacity-0" />
                      </div>
                    </div>
                  )}

                  <div className="flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors dev-mode:transition-all dev-mode:duration-300 dev-mode:group-hover:translate-x-1">
                      {project.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2 dev-mode:group-hover:text-foreground/80 dev-mode:transition-colors dev-mode:duration-300">
                      {project.description}
                    </p>

                    {/* Tech Stack Icons */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.techStack.map((tech, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-secondary/50 text-xs font-medium text-foreground/80 hover:bg-secondary transition-colors dev-mode:rounded-none dev-mode:border dev-mode:border-foreground/10 dev-mode:hover:bg-foreground dev-mode:hover:text-background dev-mode:hover:border-foreground dev-mode:transition-all dev-mode:duration-300 dev-mode:hover:scale-105 dev-mode:hover:-translate-y-0.5"
                          style={{ transitionDelay: `${index * 50}ms` }}
                          title={tech.name}
                        >
                          <div className="dev-mode:group-hover:rotate-12 dev-mode:transition-transform dev-mode:duration-300">
                            {tech.icon}
                          </div>
                          <span>{tech.name}</span>
                        </div>
                      ))}
                    </div>

                    {/* GitHub and Live Links */}
                    <div className="flex flex-wrap gap-2 mt-auto justify-between items-end">
                      {!project.inProgress ? (
                        <>
                          <div className="flex flex-wrap gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-border hover:bg-foreground hover:text-background text-xs dev-mode:border-2 dev-mode:border-foreground/20 dev-mode:hover:border-foreground dev-mode:transition-all dev-mode:duration-300 dev-mode:hover:scale-105 dev-mode:hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] dev-mode:hover:-translate-y-0.5"
                              asChild
                            >
                              <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                <Github className="w-3.5 h-3.5 mr-1.5 dev-mode:transition-transform dev-mode:duration-300 dev-mode:group-hover:rotate-12" />
                                GitHub
                              </a>
                            </Button>
                            <Button
                              size="sm"
                              className="bg-foreground text-background hover:bg-foreground/90 text-xs dev-mode:transition-all dev-mode:duration-300 dev-mode:hover:scale-105 dev-mode:hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] dev-mode:hover:-translate-y-0.5"
                              asChild
                            >
                              <a href={project.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                <ExternalLink className="w-3.5 h-3.5 mr-1.5 dev-mode:transition-transform dev-mode:duration-300 dev-mode:group-hover:rotate-12" />
                                Live Preview
                              </a>
                            </Button>
                          </div>
                          {project.detail && (
                            <Button
                              size="sm"
                              variant="default"
                              className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs dev-mode:transition-all dev-mode:duration-300 dev-mode:hover:scale-105 dev-mode:hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] dev-mode:hover:-translate-y-0.5"
                              asChild
                            >
                              <Link to={`/project/${project.id}`} onClick={(e) => e.stopPropagation()}>
                                <Info className="w-3.5 h-3.5 mr-1.5 dev-mode:transition-transform dev-mode:duration-300 dev-mode:group-hover:rotate-12" />
                                Details
                              </Link>
                            </Button>
                          )}
                        </>
                      ) : (
                        <Button size="sm" variant="secondary" disabled className="text-xs dev-mode:border-2 dev-mode:border-foreground/10">
                          In Progress
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Animated border effect - only in dev mode */}
                  <div className="absolute inset-0 border-2 border-foreground/0 group-hover:border-foreground/10 transition-all duration-500 pointer-events-none dev-mode:block hidden" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselDots className="mt-8" />
        </CarouselWithAutoplay>
      </div>
    </section>
    );
  }

  // Dev Mode: File browser/terminal style
  return (
    <section id="projects" className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Terminal Header */}
        <div className="mb-4 border-2 border-foreground/20 p-3 bg-background max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-mono">
            <Terminal className="w-4 h-4" />
            <span className="text-muted-foreground">$</span>
            <span>ls projects/ --details</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="border-2 border-foreground/30 overflow-hidden bg-background">
            {/* File Browser Header */}
            <div className="bg-foreground/10 px-4 py-3 border-b-2 border-foreground/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4" />
                <span className="text-xs font-mono">PROJECTS DIRECTORY</span>
              </div>
              <div className="text-xs font-mono text-green-500">
                {featuredProjects.length} projects found
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 p-4">
              {/* Project List */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-muted-foreground mb-2">[PROJECTS]</div>
                {featuredProjects.map((project, index) => (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProject(index)}
                    className={`w-full text-left p-3 border-2 transition-all font-mono text-xs ${
                      selectedProject === index
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background border-foreground/20 hover:border-foreground/40"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Folder className="w-3 h-3" />
                      <span className="font-bold">{project.id}/</span>
                      {project.inProgress && (
                        <span className="text-yellow-500">[IN PROGRESS]</span>
                      )}
                    </div>
                    <div className="text-muted-foreground ml-5 truncate">
                      {project.title}
                    </div>
                  </button>
                ))}
              </div>

              {/* Project Details */}
              <div className="border-2 border-foreground/20 p-4 bg-background">
                <div className="text-xs font-mono text-muted-foreground mb-3">[DETAILS]</div>
                {featuredProjects[selectedProject] && (() => {
                  const project = featuredProjects[selectedProject];
                  return (
                    <div className="space-y-4">
                      {/* Project Image */}
                      {project.image && (
                        <div className="border-2 border-foreground/20">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      )}

                      {/* Project Info */}
                      <div>
                        <h3 className="text-lg font-bold font-mono mb-2">{project.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                      </div>

                      {/* Tech Stack */}
                      <div>
                        <div className="text-xs font-mono text-muted-foreground mb-2">[TECH STACK]</div>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech, idx) => (
                            <div
                              key={idx}
                              className="px-2 py-1 border-2 border-foreground/20 bg-background text-xs font-mono"
                            >
                              {tech.icon}
                              <span className="ml-1">{tech.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div>
                        <div className="text-xs font-mono text-muted-foreground mb-2">[ACTIONS]</div>
                        <div className="flex flex-wrap gap-2">
                          {!project.inProgress ? (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-2 border-foreground/20 hover:border-foreground hover:bg-foreground hover:text-background text-xs font-mono"
                                asChild
                              >
                                <a href={project.github} target="_blank" rel="noopener noreferrer">
                                  <GitBranch className="w-3 h-3 mr-1" />
                                  GIT
                                </a>
                              </Button>
                              <Button
                                size="sm"
                                className="bg-foreground text-background hover:opacity-90 text-xs font-mono"
                                asChild
                              >
                                <a href={project.live} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  LIVE
                                </a>
                              </Button>
                              {project.detail && (
                                <Button
                                  size="sm"
                                  variant="default"
                                  className="text-xs font-mono"
                                  asChild
                                >
                                  <Link to={`/project/${project.id}`}>
                                    <Info className="w-3 h-3 mr-1" />
                                    INFO
                                  </Link>
                                </Button>
                              )}
                            </>
                          ) : (
                            <div className="px-3 py-1 border-2 border-yellow-500/50 bg-yellow-500/10 text-xs font-mono text-yellow-500">
                              IN PROGRESS
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-foreground/5 px-4 py-2 border-t-2 border-foreground/10 flex items-center justify-between text-xs font-mono">
              <div className="text-muted-foreground">
                Selected: {featuredProjects[selectedProject]?.id || 'none'}
              </div>
              <div className="text-muted-foreground">
                Status: ACTIVE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
