import { useState, useEffect } from "react";
import { PROFILE, RESUME_URL } from "@/lib/constants";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, FileText, ArrowUpRight, Mail } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "What I Do", href: "#what-i-do" },
  { label: "Career", href: "#career" },
  { label: "Work", href: "#work" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("what-i-do");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

      // Section scroll spy
      const sections = NAV_ITEMS.map((item) => item.href.slice(1));
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetId = href.replace("#", "");
    const target = document.getElementById(targetId);
    if (target) {
      const navOffset = 90;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      window.history.pushState(null, "", href);
      setActiveSection(targetId);
    }
  };

  return (
    <>
      <header className="modern-navbar-wrapper" aria-label="Main navigation">
        <nav className={`modern-navbar ${isScrolled ? "scrolled" : ""}`}>
          {/* Left: Brand logo + status badge */}
          <div className="modern-nav-left">
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, "#about")}
              className="modern-nav-brand"
              aria-label={`${PROFILE.name} - Back to top`}
            >
              <span className="modern-nav-logo">
                BB<span className="accent-dot">.</span>
              </span>
            </a>

            <div className="modern-nav-status" title="Open to backend & distributed systems engineering opportunities">
              <span className="modern-nav-status-dot" aria-hidden="true" />
              <span>Available for hire</span>
            </div>
          </div>

          {/* Center: Desktop Nav Links */}
          <ul className="modern-nav-links" role="menubar">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.slice(1);
              const isActive = activeSection === sectionId;
              return (
                <li
                  key={item.href}
                  className={`modern-nav-item ${isActive ? "active" : ""}`}
                  role="none"
                >
                  <a
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    role="menuitem"
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                    {isActive && <span className="active-glow-pill" aria-hidden="true" />}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right: Resume CTA + Theme Toggle + Mobile Menu Trigger */}
          <div className="modern-nav-actions">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="modern-nav-resume-btn"
              title="Open Bethe Bayou's Resume (PDF)"
            >
              <FileText size={13} aria-hidden="true" />
              <span>Resume</span>
              <ArrowUpRight size={12} className="opacity-70" aria-hidden="true" />
            </a>

            <ThemeToggle />

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="modern-nav-mobile-toggle"
              aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Sheet & Backdrop */}
        {mobileMenuOpen && (
          <>
            <div
              className="modern-mobile-backdrop"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <div
              className="modern-mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
            >
              <div className="modern-mobile-status">
                <span className="modern-nav-status-dot" aria-hidden="true" />
                <span>Available for backend opportunities</span>
              </div>

              <ul className="modern-mobile-list">
                {NAV_ITEMS.map((item) => {
                  const sectionId = item.href.slice(1);
                  const isActive = activeSection === sectionId;
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={(e) => scrollToSection(e, item.href)}
                        className={`modern-mobile-link ${isActive ? "active" : ""}`}
                      >
                        <span>{item.label}</span>
                        <ArrowUpRight size={14} className="opacity-50" />
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="modern-mobile-footer">
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modern-mobile-resume-btn"
                >
                  <FileText size={14} />
                  <span>View Resume</span>
                </a>

                <a
                  href={`mailto:${PROFILE.email}`}
                  className="modern-mobile-email-btn"
                >
                  <Mail size={14} />
                  <span>Get in touch</span>
                </a>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Ambient background glowing circles & top fade */}
      <div className="landing-circle1" aria-hidden="true" />
      <div className="landing-circle2" aria-hidden="true" />
      <div className="nav-fade" aria-hidden="true" />
    </>
  );
}

export default Navbar;
