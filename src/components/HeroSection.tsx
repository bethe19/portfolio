import { useState, useEffect } from "react";
import { ArrowDownRight } from "lucide-react";
import { PROFILE } from "@/lib/constants";
import heroDark from "@/assets/hero-dark.png";
import heroLight from "@/assets/hero-light.png";

export function HeroSection() {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsLightMode(document.documentElement.classList.contains("light"));
    };
    checkTheme();

    const observer = new MutationObserver(() => {
      checkTheme();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" className="landing-section">
      {/* Full-section bottom fade — spans 100vw, no container clipping */}
      <div className="hero-bottom-fade" aria-hidden="true" />

      <div className="landing-container">
        {/* Top-left: Name */}
        <div className="landing-intro">
          <h2>Hello! I'm</h2>
          <h1>
            {PROFILE.givenName.toUpperCase()}
            <br />
            <span>{PROFILE.familyName.toUpperCase()}</span>
          </h1>
        </div>

        {/* Photo — desktop center with bottom glow */}
        <div className="landing-image" aria-label={`Portrait of ${PROFILE.name}`}>
          {/* Ambient bottom glow aura */}
          <div className="hero-bottom-glow" aria-hidden="true" />

          <img
            src={heroDark}
            alt={PROFILE.name}
            className={`hero-image-dark ${isLightMode ? "opacity-0" : "opacity-100"}`}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <img
            src={heroLight}
            alt={PROFILE.name}
            className={`hero-image-light ${isLightMode ? "opacity-100" : "opacity-0"}`}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        {/* Mobile photo fallback with bottom glow */}
        <div className="mobile-photo" aria-label={`Portrait of ${PROFILE.name}`}>
          <div className="mobile-bottom-glow" aria-hidden="true" />

          <img
            src={heroDark}
            alt={PROFILE.name}
            className={`hero-image-dark ${isLightMode ? "opacity-0" : "opacity-100"}`}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <img
            src={heroLight}
            alt={PROFILE.name}
            className={`hero-image-light ${isLightMode ? "opacity-100" : "opacity-0"}`}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        {/* Bottom-right: Role & Quick Actions */}
        <div className="landing-info">
          <h3>A</h3>
          <h2 className="landing-info-h2">
            <div className="landing-h2-1">Backend-Focused</div>
          </h2>
          <h2>
            <div className="landing-h2-info">Full-Stack Engineer</div>
          </h2>

          {/* Quick CTA Actions */}
          <div className="hero-actions">
            <a href="#work" className="hero-action-btn primary">
              <span>Explore Projects</span>
              <ArrowDownRight size={15} />
            </a>
            <a href="#contact" className="hero-action-btn secondary">
              <span>Get in Touch</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
