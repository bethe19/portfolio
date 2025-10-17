import { Button } from "@/components/ui/button";
import { Github, Linkedin, Instagram, Facebook, Send, Phone } from "lucide-react";

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/bethe19", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/bethe19", label: "Facebook" },
  { icon: Phone, href: "https://wa.me/251920420134", label: "WhatsApp" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/bethe-bayou", label: "LinkedIn" },
  { icon: Send, href: "https://t.me/bethe19", label: "Telegram" },
  { icon: Github, href: "https://github.com/bethe19", label: "GitHub" },
];

export const Hero = () => {
  return (
    <section id="about" className="min-h-screen flex items-center pt-16">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-card border-2 border-border rounded-lg p-8 md:p-12 transition-transform hover:scale-[1.01] duration-300">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img
                  src="./20240822_200310.jpg"
                  alt="Bethe Bayou"
                  className="w-48 md:w-52 h-auto rounded-md"
                />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">Hi, I'm Bethe Bayou</h1>
                  <p className="text-base text-muted-foreground leading-relaxed text-justify">
                  I’m a Software Engineering student at AAiT, currently gaining hands-on experience as an AI and software development intern. My journey started with learning the foundations of programming, and now I’m exploring Java, C++, AI fundamentals, and UI/UX design while applying them to real-world projects. I focus on building practical software solutions that solve real problems, learning from every challenge, and continuously improving my skills. This path is about growth, experimentation, and turning ideas into functional, meaningful applications, one project at a time.                  </p>

                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Button 
                    className="bg-background text-black dark:text-white hover:bg-foreground hover:text-background border border-border transition-colors"
                    asChild
                  >
                    <a href="#contact">Get in touch</a>
                  </Button>
                  <Button 
                    className="bg-background text-black dark:text-white hover:bg-foreground hover:text-background border border-border transition-colors"
                    asChild
                  >
                    <a href="https://drive.google.com/file/d/1vaYTPM0yCS-HPQ5FDMcsVEMQvZBg-j2o/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                      Resume
                    </a>
                  </Button>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex md:flex-col gap-4 flex-wrap justify-center">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-muted-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-7 h-7" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
