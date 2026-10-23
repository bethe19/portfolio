import { PROFILE } from "@/lib/constants";

export function ContactSection() {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>{PROFILE.name}</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            </p>
            <h4>Location</h4>
            <p>
              <span>{PROFILE.location}</span>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href={PROFILE.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social"
            >
              Github ↗
            </a>
            <a
              href={PROFILE.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social"
            >
              LinkedIn ↗
            </a>
            <a
              href={PROFILE.socials.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social"
            >
              Telegram ↗
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br />
              by <span>{PROFILE.name}</span>
            </h2>
            <h5>© {new Date().getFullYear()}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
