import { PROFILE } from "@/lib/constants";
import { Github, Linkedin, Send, Mail } from "lucide-react";

export function SocialRail() {
  const socials = [
    { label: "GitHub", href: PROFILE.socials.github, Icon: Github },
    { label: "LinkedIn", href: PROFILE.socials.linkedin, Icon: Linkedin },
    { label: "Telegram", href: PROFILE.socials.telegram, Icon: Send },
    { label: "Email", href: `mailto:${PROFILE.email}`, Icon: Mail },
  ];

  return (
    <aside
      className="hidden lg:flex fixed left-6 xl:left-8 bottom-0 z-40 flex-col items-center gap-4 text-muted-foreground"
      aria-label="Social links"
    >
      <div className="flex flex-col items-center gap-3">
        {socials.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            title={label}
            aria-label={label}
            className="p-2 rounded-xl transition-all duration-200 text-muted-foreground/80 hover:text-foreground hover:bg-muted/50 hover:scale-110 hover:-translate-y-0.5"
          >
            <Icon size={18} />
          </a>
        ))}
      </div>
      <div className="w-[1.5px] h-20 bg-gradient-to-b from-muted-foreground/40 to-transparent" />
    </aside>
  );
}

export default SocialRail;
