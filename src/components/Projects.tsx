import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import moodieImage from "../../images/Screenshot 2025-11-09 182951.png";
import notieImage from "../../images/image.png";
import scoutaiImage from "../../images/1.webp";

const projects = [
  {
    title: "Moodie – Mood-Based Movie Discovery Web App",
    description: "Moodie is a sleek web app for movie lovers to discover films based on mood. Built with HTML, CSS, and JavaScript, it uses the TMDB API to provide real-time search, interactive card hover effects, and personalized watchlists. Users can explore releases, search titles, read details, and organize favorites, combining clean design with smooth functionality for an intuitive, engaging experience.",
    image: moodieImage,
    github: "https://github.com/bethe19/moodie-movie-site",
    live: "https://moodie-neon.vercel.app",
  },
  {
    title: "Notie – Simple Note-Taking App",
    description: "Notie is a lightweight, user-friendly app to create and manage notes efficiently. Built with HTML, CSS, and JavaScript, it leverages DOM manipulation and localStorage to allow users to add, edit, and organize notes seamlessly. Designed for speed and clarity, Notie is perfect for students or professionals, combining a clean interface with simple functionality to keep ideas and tasks organized and accessible.",
    image: notieImage,
    github: "https://github.com/bethe19/notie",
    live: "https://notie-ashen.vercel.app/",
  },
  {
    title: "ScoutAI – Football Talent Analysis (In Progress)",
    description: "ScoutAI is an AI-powered platform designed to analyze football talent and performance metrics. Using AI models and real-world football data, it helps scouts, coaches, and players gain actionable insights, track progress, and make informed decisions. Currently in development, ScoutAI combines sports knowledge, data analytics, and software engineering to create a practical tool bridging performance evaluation with measurable player insights.",
    image: scoutaiImage,
    github: "#",
    live: "#",
    inProgress: true,
  },
];


const ProjectCard = ({
  project,
  index,
  className = "",
}: {
  project: (typeof projects)[number];
  index: number;
  className?: string;
}) => (
  <div
    className={`group h-full rounded-2xl overflow-hidden bg-card/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-slide-up backdrop-blur-sm ${className}`}
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="flex h-full flex-col md:flex-row">
      {/* Image */}
      <div className="md:w-80 flex-shrink-0">
        <div className="relative aspect-video md:h-full md:aspect-[4/3.5] overflow-hidden bg-secondary">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
        <div className="space-y-2">
          <h3 className="text-lg md:text-xl font-semibold leading-tight">{project.title}</h3>
          <p className="text-sm text-muted-foreground text-justify">{project.description}</p>
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-2">
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
            <Button size="sm" variant="secondary" disabled>
              In Progress
            </Button>
          )}
        </div>
      </div>
    </div>
  </div>
);

export const Projects = () => {
  const carouselOptions = useMemo(
    () => ({
      loop: true,
      align: "center" as const,
      skipSnaps: false,
    }),
    []
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(carouselOptions);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;

    let intervalId: number | null = null;

    const scrollNext = () => {
      if (!emblaApi) return;
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    };

    const startAutoplay = () => {
      if (intervalId) window.clearInterval(intervalId);
      intervalId = window.setInterval(scrollNext, 5000);
    };

    const stopAutoplay = () => {
      if (intervalId) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
    };

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    const onReInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
      startAutoplay();
    };

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    startAutoplay();

    emblaApi.on("pointerDown", stopAutoplay);
    emblaApi.on("pointerUp", startAutoplay);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onReInit);

    return () => {
      stopAutoplay();
      emblaApi.off?.("pointerDown", stopAutoplay);
      emblaApi.off?.("pointerUp", startAutoplay);
      emblaApi.off?.("select", onSelect);
      emblaApi.off?.("reInit", onReInit);
    };
  }, [emblaApi]);

  const handleDotClick = (index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  };

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-medium mb-12 text-center uppercase tracking-wider">
            Projects
          </h2>

          {/* Mobile carousel */}
          <div className="md:hidden">
            <div ref={emblaRef} className="overflow-hidden px-6">
              <div className="flex -ml-3 -mr-3 py-4">
                {projects.map((project, index) => (
                  <div
                    key={project.title}
                    className={`pl-3 pr-3 flex-[0_0_82%] min-w-0 transition-all duration-300 ${
                      index === selectedIndex ? "opacity-100" : "opacity-60"
                    }`}
                  >
                    <ProjectCard
                      project={project}
                      index={index}
                      className=""
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {scrollSnaps.map((_, index) => (
                <button
                  key={`project-dot-${index}`}
                  type="button"
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    index === selectedIndex ? "bg-primary scale-110" : "bg-muted opacity-40"
                  }`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop layout */}
          <div className="hidden md:flex flex-col gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
