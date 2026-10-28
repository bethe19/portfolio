import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { projects } from "@/lib/projects";
import orderSystemImg from "@/assets/order-system.png";
import goomcrmImg from "@/assets/goomcrm-image.png";
import eventBookingImg from "@/assets/event-booking.png";
import nextstopImg from "@/assets/nextstop.png";
import fintrackImg from "@/assets/fintrack.jpg";

const PROJECT_IMAGE_MAP: Record<string, string> = {
  "mini-order": orderSystemImg,
  "order-system": orderSystemImg,
  "goom-crm": goomcrmImg,
  "goomcrm": goomcrmImg,
  "event-booking": eventBookingImg,
  "event-booking-api": eventBookingImg,
  "nextstop": nextstopImg,
  "fintrack": fintrackImg,
};

export function ProjectsSection() {
  useEffect(() => {
    // Disable horizontal scroll pinning on mobile
    if (window.innerWidth <= 768) return;

    let translateX = 0;

    const setTranslateX = () => {
      const boxes = document.getElementsByClassName("work-box");
      if (boxes.length === 0) return;
      const containerLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const box = boxes[0];
      const rect = box.getBoundingClientRect();
      const parentWidth = box.parentElement!.getBoundingClientRect().width;
      const padding = parseInt(window.getComputedStyle(box as HTMLElement).padding) / 2;
      translateX = rect.width * boxes.length - (containerLeft + parentWidth) + padding;
    };

    setTranslateX();

    let startX = 0;
    let isDragging = false;
    let scrollLeft = 0;
    const workFlex = document.querySelector(".work-flex") as HTMLElement;
    const workSection = document.querySelector(".work-section") as HTMLElement;
    if (!workFlex || !workSection) return;

    // Simple CSS scroll on desktop — let browser handle it via overflow-x
    workFlex.style.overflowX = "auto";
    workFlex.style.scrollBehavior = "smooth";

    return () => {};
  }, []);

  const displayProjects = projects.slice(0, 5);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {displayProjects.map((project, index) => {
            const imgSrc = PROJECT_IMAGE_MAP[project.slug] || `/images/${project.slug}.png`;
            return (
              <div className="work-box" key={project.slug}>
                <div className="work-info">
                  <div className="work-title">
                    <h3>0{index + 1}</h3>
                    <div>
                      <h4>{project.name}</h4>
                      <p>{project.stack}</p>
                    </div>
                  </div>
                  <h4>Tools and features</h4>
                  <p>{project.tech.slice(0, 4).join(" · ")}</p>
                </div>
                <div className="work-image">
                  <div className="work-image-in">
                    <a href={project.live || project.github} target="_blank" rel="noopener noreferrer" className="work-img-link">
                      {project.video ? (
                        <video
                          src={project.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="work-project-img object-cover w-full h-full"
                        />
                      ) : (
                        <img
                          src={imgSrc}
                          alt={project.name}
                          loading="lazy"
                          className="work-project-img"
                          onError={(e) => {
                            const el = e.currentTarget as HTMLImageElement;
                            el.style.display = "none";
                            const placeholder = el.parentElement?.parentElement?.querySelector(".work-placeholder") as HTMLElement;
                            if (placeholder) placeholder.style.display = "flex";
                          }}
                        />
                      )}
                      <div className="work-link" aria-label="Open project repository">↗</div>
                    </a>
                    {/* Fallback: styled card only if image fails */}
                    <div className="work-placeholder" style={{ display: "none" }}>
                      <p>{project.tagline}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* CTA box */}
          <div className="work-box work-box-cta">
            <div className="see-all-works">
              <h3>Want to see more?</h3>
              <p>Explore all of my projects and case studies</p>
              <Link to="/projects/$slug" params={{ slug: projects[0].slug }} className="see-all-btn">
                View Case Studies →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsSection;
