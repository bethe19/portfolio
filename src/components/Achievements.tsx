import { Card } from "@/components/ui/card";
import { Award, Code2, Trophy, Badge, FileText } from "lucide-react";
import { useDevMode } from "@/hooks/useDevMode";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeInUp, staggerContainer, staggerItem, cardHover } from "@/lib/animations";

const achievements = [
  {
    icon: Award,
    title: "AI Research Intern",
    org: "iCog Labs",
    year: "2025",
    description: "Contributing to cutting-edge AI research",
    badge: "RESEARCH",
    level: "ADVANCED"
  },
  {
    icon: Code2,
    title: "Full-Stack Developer",
    org: "Professional",
    year: "Ongoing",
    description: "Building production-ready applications",
    badge: "DEVELOPER",
    level: "PROFESSIONAL"
  },
  {
    icon: Trophy,
    title: "Software Engineering Student",
    org: "AAiT",
    year: "2024-2028",
    description: "Pursuing B.Sc. in Software Engineering",
    badge: "STUDENT",
    level: "ACTIVE"
  }
];

export const Achievements = () => {
  const isDevMode = useDevMode();
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  // Normal Mode: Grid of achievement cards
  if (!isDevMode) {
    return (
      <motion.section 
        id="achievements" 
        className="py-6"
        ref={sectionRef as any}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-6"
              variants={fadeInUp}
            >
              <h2 className="text-2xl font-bold mb-2 uppercase tracking-wider">
                Achievements & Certifications
              </h2>
              <p className="text-sm text-muted-foreground">
                Milestones and recognition
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              variants={staggerContainer}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    whileHover={cardHover}
                  >
                    <Card className="border-2 border-border rounded-lg p-6 bg-card h-full">
                      <div className="flex items-start gap-4">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon className="w-8 h-8 flex-shrink-0 text-yellow-500" />
                        </motion.div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {achievement.org} • {achievement.year}
                          </p>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </motion.section>
    );
  }

  // Dev Mode: Badge system with metadata
  return (
    <motion.section 
      id="achievements" 
      className="py-6"
      ref={sectionRef as any}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={fadeInUp}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Terminal Header */}
          <motion.div 
            className="mb-4 border-2 border-foreground/20 p-3 bg-background overflow-hidden relative"
            variants={fadeInUp}
            whileHover={{ borderColor: "hsl(var(--foreground) / 0.4)" }}
          >
            <div className="flex items-center gap-2 text-xs font-mono">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <FileText className="w-4 h-4" />
              </motion.div>
              <span className="text-muted-foreground">$</span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                ls achievements/ --badges
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                _
              </motion.span>
            </div>
            {/* Scanline effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-transparent pointer-events-none"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ height: "50%" }}
            />
          </motion.div>

          {/* Badge Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                    borderColor: "hsl(var(--foreground) / 0.5)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-2 border-foreground/30 overflow-hidden bg-background relative">
                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent pointer-events-none"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8 }}
                    />
                    
                    {/* Badge Header */}
                    <div className="bg-foreground/10 px-4 py-3 border-b-2 border-foreground/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <motion.div 
                            className="p-2 border-2 border-foreground/30 bg-background"
                            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Icon className="w-6 h-6 text-yellow-500" />
                          </motion.div>
                          <div>
                            <div className="text-sm font-bold font-mono">{achievement.title}</div>
                            <div className="text-xs text-muted-foreground font-mono">{achievement.org}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <motion.div 
                            className="px-2 py-1 border-2 border-foreground/30 bg-background text-xs font-mono mb-1"
                            whileHover={{ scale: 1.1, borderColor: "hsl(var(--foreground) / 0.6)" }}
                          >
                            {achievement.badge}
                          </motion.div>
                          <motion.div 
                            className="text-xs font-mono text-green-500"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {achievement.level}
                          </motion.div>
                        </div>
                      </div>
                    </div>

                  {/* Badge Body */}
                  <div className="p-4">
                    <div className="mb-3 text-xs text-muted-foreground">
                      {achievement.description}
                    </div>

                    {/* Metadata */}
                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between border-t-2 border-foreground/10 pt-2">
                        <span className="text-muted-foreground">Year:</span>
                        <span className="text-foreground">{achievement.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="text-green-500">● ACTIVE</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ID:</span>
                        <span className="text-foreground">ACH_{String(index + 1).padStart(3, '0')}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3 pt-3 border-t-2 border-foreground/10">
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-foreground">{achievement.year === "Ongoing" ? "100%" : "100%"}</span>
                      </div>
                      <div className="w-full bg-foreground/10 border-2 border-foreground/20 overflow-hidden" style={{ height: '6px' }}>
                        <motion.div 
                          className="h-full bg-green-500"
                          initial={{ width: 0 }}
                          animate={isVisible ? { width: '100%' } : { width: 0 }}
                          transition={{ duration: 1.5, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Footer Stats */}
          <motion.div 
            className="mt-4 border-2 border-foreground/20 p-3 bg-background"
            variants={fadeInUp}
            whileHover={{ borderColor: "hsl(var(--foreground) / 0.4)" }}
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-4 text-muted-foreground">
                <span>Total Achievements: {achievements.length}</span>
                <span>Active: {achievements.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Badge className="w-4 h-4" />
                </motion.div>
                <motion.span 
                  className="text-green-500"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ALL VERIFIED
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
