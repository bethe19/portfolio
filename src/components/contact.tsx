import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { FaTelegram } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import { profile } from "../data";
import { Section } from "./section";

const details = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: "Phone", value: profile.phone, href: profile.phoneHref, icon: Phone },
  { label: "Telegram", value: "@bethe19", href: profile.telegram, icon: FaTelegram },
  { label: "Location", value: profile.location, icon: MapPin },
];

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <div className="flex flex-col gap-6 rounded border border-border p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-4">
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Have a project in mind, a backend architecture to scale, or an engineering role to fill? Feel free to reach out directly or hire me on Upwork.
          </p>
          <ul className="space-y-3 text-sm">
            {details.map(({ label, value, href, icon: Icon }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border">
                  <Icon aria-hidden className="size-3.5" />
                </span>
                <span className="sr-only">{label}: </span>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {value}
                  </a>
                ) : (
                  <span className="text-muted-foreground">{value}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 sm:items-end shrink-0">
          <a
            href={profile.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85 shadow-sm"
          >
            <SiUpwork className="size-4" />
            Hire me on Upwork
            <ArrowUpRight className="size-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
          >
            <Mail className="size-4" />
            Send an Email
          </a>
        </div>
      </div>
    </Section>
  );
}
