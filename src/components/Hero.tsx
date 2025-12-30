import { Button } from "@/components/ui/button";
import profileImage from "../../images/20240822_200310.jpg";
import devModeImage from "../../images/image for dev mode.jpg";
import { Github, Linkedin, Instagram, Facebook, Send, Phone, Terminal, User, Code, Mail } from "lucide-react";
import { useDevMode } from "@/hooks/useDevMode";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem } from "@/lib/animations";
import { MusicPlayer } from "@/components/MusicPlayer";

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/bethe.19", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/bethe19", label: "Facebook" },
  { icon: Phone, href: "https://wa.me/251920420134", label: "WhatsApp" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/bethe-bayou", label: "LinkedIn" },
  { icon: Send, href: "https://t.me/bethe19", label: "Telegram" },
  { icon: Github, href: "https://github.com/bethe19", label: "GitHub" },
];

export const Hero = () => {
  const isDevMode = useDevMode();
  const currentImage = isDevMode ? devModeImage : profileImage;
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  // Normal Mode: Standard hero layout
  if (!isDevMode) {
    return (
      <motion.section 
        id="about" 
        className="pt-16"
        ref={sectionRef as any}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="bg-card border-2 border-border rounded-lg p-6 md:p-8"
              whileHover={{ scale: 1.01, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Profile Image */}
                <motion.div 
                  className="flex-shrink-0"
                  variants={fadeInLeft}
                >
                  <motion.img
                    src={currentImage}
                    alt="Bethe Bayou"
                    loading="lazy"
                    className="w-48 md:w-52 h-auto rounded-md border-2 border-transparent"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Content */}
                <motion.div 
                  className="flex-1 space-y-4"
                  variants={fadeInRight}
                >
                  <div>
                    <motion.h1 
                      className="text-3xl md:text-4xl font-bold mb-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      Hi, I'm Bethe Bayou
                    </motion.h1>
                    <motion.p 
                      className="text-base text-muted-foreground leading-relaxed text-justify"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      Software Engineering student at Addis Ababa University with hands-on expertise in full-stack development. I specialize in architecting scalable backend services using Node.js, Express, PostgreSQL, and MongoDB, while crafting intuitive, responsive frontends with modern frameworks like React and TypeScript. Currently contributing to cutting-edge AI Research & Development at iCog Labs. Passionate about transforming complex problems into elegant, production-ready solutions that drive real-world impact.
                    </motion.p>
                  </div>

                  <motion.div 
                    className="flex flex-wrap gap-3 pt-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        className="bg-background text-foreground hover:bg-foreground hover:text-background border border-border transition-all duration-300 rounded-lg"
                        asChild
                      >
                        <a href="#contact">Get in touch</a>
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        className="bg-background text-foreground hover:bg-foreground hover:text-background border border-border transition-all duration-300 rounded-lg"
                        asChild
                      >
                        <a href="https://drive.google.com/file/d/1G6Oy6_xe8ISf73onA3d1STxED3fLGX0m/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                          Resume
                        </a>
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Social Links */}
                <motion.div 
                  className="flex md:flex-col gap-4 flex-wrap justify-center"
                  variants={staggerContainer}
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                >
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-muted-foreground"
                      aria-label={social.label}
                      variants={staggerItem}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <social.icon className="w-7 h-7" />
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    );
  }

  // Dev Mode: Terminal-style info display
  return (
    <motion.section 
      id="about" 
      className="pt-16"
      ref={sectionRef as any}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={fadeInUp}
    >
      <div className="container mx-auto px-6 py-6">
        <div className="max-w-6xl mx-auto">
          {/* ASCII Art Banner */}
          <motion.div 
            className="mb-6 text-center font-mono text-xs"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            <motion.pre 
              className="text-muted-foreground"
              animate={{ 
                textShadow: [
                  "0 0 0px rgba(0, 255, 0, 0)",
                  "0 0 5px rgba(0, 255, 0, 0.3)",
                  "0 0 0px rgba(0, 255, 0, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
{`╔═══════════════════════════════════════════════╗
║         DEVELOPER PROFILE v2.0.1 [DEV]        ║
╚═══════════════════════════════════════════════╝`}
            </motion.pre>
          </motion.div>

          <motion.div 
            className="border-2 border-foreground/30 overflow-hidden bg-background relative"
            variants={fadeInUp}
            whileHover={{ borderColor: "hsl(var(--foreground) / 0.5)" }}
          >
            {/* Scanline effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent pointer-events-none z-10"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ height: "30%" }}
            />
            
            {/* Terminal Header */}
            <div className="bg-foreground/10 px-4 py-2 flex items-center justify-between border-b-2 border-foreground/20 relative z-20">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Terminal className="w-4 h-4" />
                </motion.div>
                <span className="text-xs font-mono">profile.sh</span>
              </div>
              <div className="flex gap-2 items-center">
                <motion.div 
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.span 
                  className="text-xs font-mono text-green-500"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  RUNNING
                </motion.span>
              </div>
            </div>

            <div className="p-6 md:p-8 relative z-20">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Left: Profile Image */}
                <motion.div 
                  className="md:col-span-1"
                  variants={fadeInLeft}
                >
                  <motion.div 
                    className="border-2 border-foreground/30 p-2 bg-background"
                    whileHover={{ 
                      borderColor: "hsl(var(--foreground) / 0.6)",
                      boxShadow: "0 0 20px rgba(0, 255, 0, 0.2)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.img
                      src={currentImage}
                      alt="Bethe Bayou"
                      loading="lazy"
                      className="w-full h-auto border-2 border-foreground/20"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  {/* Social Links in Dev Mode */}
                  <motion.div 
                    className="mt-4 border-2 border-foreground/20 p-3 bg-background"
                    whileHover={{ borderColor: "hsl(var(--foreground) / 0.4)" }}
                  >
                    <div className="text-xs font-mono text-muted-foreground mb-2">[CONNECTIONS]</div>
                    <motion.div 
                      className="grid grid-cols-3 gap-2"
                      variants={staggerContainer}
                      initial="hidden"
                      animate={isVisible ? "visible" : "hidden"}
                    >
                      {socialLinks.map((social) => (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 border-2 border-foreground/20"
                          aria-label={social.label}
                          variants={staggerItem}
                          whileHover={{ 
                            scale: 1.1, 
                            borderColor: "hsl(var(--foreground) / 0.6)",
                            backgroundColor: "hsl(var(--foreground) / 0.1)",
                            rotate: [0, -5, 5, 0]
                          }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                        >
                          <social.icon className="w-5 h-5 mx-auto" />
                        </motion.a>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Right: Info Panel */}
                <motion.div 
                  className="md:col-span-2 space-y-4"
                  variants={fadeInRight}
                >
                  {/* Header Info */}
                  <motion.div 
                    className="border-2 border-foreground/20 p-4 bg-background"
                    whileHover={{ borderColor: "hsl(var(--foreground) / 0.4)" }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      >
                        <User className="w-5 h-5" />
                      </motion.div>
                      <div>
                        <motion.h1 
                          className="text-2xl font-bold font-mono"
                          animate={{ 
                            textShadow: [
                              "0 0 0px rgba(0, 255, 0, 0)",
                              "0 0 3px rgba(0, 255, 0, 0.3)",
                              "0 0 0px rgba(0, 255, 0, 0)"
                            ]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          bethe-bayou
                        </motion.h1>
                        <div className="text-xs font-mono text-muted-foreground">Software Engineer | Full-Stack Developer</div>
                      </div>
                    </div>
                    <motion.div 
                      className="flex gap-2 flex-wrap"
                      variants={staggerContainer}
                      initial="hidden"
                      animate={isVisible ? "visible" : "hidden"}
                    >
                      {["STUDENT", "DEVELOPER", "RESEARCHER"].map((badge, idx) => (
                        <motion.div 
                          key={badge}
                          className="px-2 py-1 border-2 border-foreground/20 text-xs font-mono"
                          variants={staggerItem}
                          whileHover={{ 
                            scale: 1.1, 
                            borderColor: "hsl(var(--foreground) / 0.5)",
                            backgroundColor: "hsl(var(--foreground) / 0.1)"
                          }}
                        >
                          {badge}
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>

                  {/* Description */}
                  <motion.div 
                    className="border-2 border-foreground/20 p-4 bg-background"
                    whileHover={{ borderColor: "hsl(var(--foreground) / 0.4)" }}
                  >
                    <div className="text-xs font-mono text-muted-foreground mb-2">[BIO]</div>
                    <div className="text-sm leading-relaxed font-mono">
                      <p>Software Engineering student at Addis Ababa University with hands-on expertise in full-stack development. I specialize in architecting scalable backend services using Node.js, Express, PostgreSQL, and MongoDB, while crafting intuitive, responsive frontends with modern frameworks like React and TypeScript. Currently contributing to cutting-edge AI Research & Development at iCog Labs. Passionate about transforming complex problems into elegant, production-ready solutions that drive real-world impact.</p>
                    </div>
                  </motion.div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.div
                      whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        className="w-full border-2 border-foreground/30 hover:border-foreground hover:bg-foreground hover:text-background transition-all font-mono text-sm py-3"
                        asChild
                      >
                        <a href="#contact" className="flex items-center justify-center gap-2">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Mail className="w-4 h-4" />
                          </motion.div>
                          CONTACT
                        </a>
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        className="w-full border-2 border-foreground/30 hover:border-foreground hover:bg-foreground hover:text-background transition-all font-mono text-sm py-3"
                        asChild
                      >
                        <a href="https://drive.google.com/file/d/1G6Oy6_xe8ISf73onA3d1STxED3fLGX0m/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Code className="w-4 h-4" />
                          </motion.div>
                          RESUME
                        </a>
                      </Button>
                    </motion.div>
                  </div>

                  {/* Stark Theme Music Player */}
                  <MusicPlayer 
                    audioSrc="/Manleve_House_Stark_Theme_Goodbye_Brother_᜵_The_Tower_Emotional.mp3" 
                    isDevMode={true}
                  />
                </motion.div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-foreground/5 px-4 py-2 border-t-2 border-foreground/10 flex items-center justify-between text-xs font-mono relative z-20">
              <motion.div 
                className="text-muted-foreground flex items-center gap-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span>Status:</span>
                <span className="text-green-500">ONLINE</span>
              </motion.div>
              <motion.div 
                className="text-muted-foreground"
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(0, 255, 0, 0)",
                    "0 0 5px rgba(0, 255, 0, 0.5)",
                    "0 0 0px rgba(0, 255, 0, 0)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Mode: DEV
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
