import { useDevMode } from "@/hooks/useDevMode";
import { Terminal, Package, Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

const skills = [
  { name: "C++", icon: "https://cdn.simpleicons.org/cplusplus/000000", category: "Language", level: 85 },
  { name: "Java", icon: "fab fa-java", category: "Language", level: 80 },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/000000", category: "Language", level: 90 },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/000000", category: "Language", level: 95 },
  { name: "React", icon: "https://cdn.simpleicons.org/react/000000", category: "Frontend", level: 92 },
  { name: "SQL", icon: "https://cdn.simpleicons.org/mysql/000000", category: "Database", level: 85 },
  { name: "HTML", icon: "https://cdn.simpleicons.org/html5/000000", category: "Frontend", level: 98 },
  { name: "CSS", icon: "fab fa-css3", category: "Frontend", level: 95 },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma/000000", category: "Design", level: 75 },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/000000", category: "Backend", level: 90 },
  { name: "Express.js", icon: "https://cdn.simpleicons.org/express/000000", category: "Backend", level: 88 },
  { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/000000", category: "Database", level: 85 },
  { name: "Jupyter", icon: "https://cdn.simpleicons.org/jupyter/000000", category: "Data", level: 80 },
  { name: "Pandas", icon: "https://cdn.simpleicons.org/pandas/000000", category: "Data", level: 75 },
  { name: "NumPy", icon: "https://cdn.simpleicons.org/numpy/000000", category: "Data", level: 70 },
];

const SkillCard = ({ skill, index }: { skill: { name: string; icon: string; category?: string; level?: number }; index: number }) => {
  const isDevMode = useDevMode();
  
  if (!isDevMode) {
    return (
      <motion.div
        className="group relative border border-border rounded-lg p-6 bg-card flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.3, delay: index * 0.03 }}
        whileHover={{ 
          y: -8,
          scale: 1.05,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)"
        }}
      >
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
          transition={{ duration: 0.5 }}
        >
          {skill.icon.startsWith("fab ") ? (
            <i className={`${skill.icon} text-2xl`}></i>
          ) : (
            <img
              src={skill.icon}
              alt={skill.name}
              loading="lazy"
              className="w-8 h-8 dark:invert"
            />
          )}
        </motion.div>
        <motion.span 
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-card border border-border px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap"
          initial={{ opacity: 0, y: -10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {skill.name}
        </motion.span>
      </motion.div>
    );
  }

  // Dev Mode: Skill with progress bar
  return (
    <motion.div
      className="border-2 border-foreground/30 p-2 bg-background relative overflow-hidden"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      whileHover={{ 
        borderColor: "hsl(var(--foreground) / 0.6)",
        backgroundColor: "hsl(var(--foreground) / 0.05)",
        scale: 1.05
      }}
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent pointer-events-none"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />
      
      <div className="flex items-center gap-2 relative z-10">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 0.5 }}
          className="flex-shrink-0"
        >
          {skill.icon.startsWith("fab ") ? (
            <i className={`${skill.icon} text-base`}></i>
          ) : (
            <img
              src={skill.icon}
              alt={skill.name}
              loading="lazy"
              className="w-4 h-4 dark:invert"
            />
          )}
        </motion.div>
        <span className="text-xs font-mono font-bold truncate">{skill.name}</span>
      </div>
      
      <div className="mt-1 text-[10px] font-mono text-muted-foreground uppercase relative z-10 truncate">{skill.category}</div>
    </motion.div>
  );
};

export const Skills = () => {
  const isDevMode = useDevMode();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const categories = Array.from(new Set(skills.map(s => s.category)));

  const filteredSkills = skills.filter(skill => {
    const matchesCategory = !selectedCategory || skill.category === selectedCategory;
    const matchesSearch = !searchTerm || skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Normal Mode: Simple grid
  if (!isDevMode) {
    return (
      <motion.section 
        id="skills" 
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
                Technical Skills
              </h2>
              <p className="text-sm text-muted-foreground">
                Technologies and tools I work with
              </p>
            </motion.div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-6">
              {skills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    );
  }

  // Dev Mode: Package manager style with filtering
  return (
    <motion.section 
      id="skills" 
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
            className="mb-4 border-2 border-foreground/20 p-3 bg-background relative overflow-hidden"
            variants={fadeInUp}
            whileHover={{ borderColor: "hsl(var(--foreground) / 0.4)" }}
          >
            <div className="flex items-center gap-2 text-xs font-mono mb-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Terminal className="w-4 h-4" />
              </motion.div>
              <span className="text-muted-foreground">$</span>
              <span>npm list --skills</span>
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

          {/* Package Manager Interface */}
          <motion.div 
            className="border-2 border-foreground/30 overflow-hidden bg-background"
            variants={fadeInUp}
          >
            {/* Header */}
            <div className="bg-foreground/10 px-4 py-3 border-b-2 border-foreground/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Package className="w-4 h-4" />
                </motion.div>
                <span className="text-xs font-mono">SKILLS PACKAGE MANAGER</span>
              </div>
              <motion.div 
                className="text-xs font-mono text-green-500"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {filteredSkills.length} packages installed
              </motion.div>
            </div>

            {/* Filters */}
            <div className="p-4 border-b-2 border-foreground/10 bg-background">
              <motion.div 
                className="flex flex-wrap gap-3 mb-3"
                variants={staggerContainer}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
              >
                <motion.button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1 text-xs font-mono border-2 ${
                    !selectedCategory
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background border-foreground/20"
                  }`}
                  variants={staggerItem}
                  whileHover={{ scale: 1.05, borderColor: "hsl(var(--foreground) / 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  ALL
                </motion.button>
                {categories.map((cat) => (
                  <motion.button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 text-xs font-mono border-2 ${
                      selectedCategory === cat
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background border-foreground/20"
                    }`}
                    variants={staggerItem}
                    whileHover={{ scale: 1.05, borderColor: "hsl(var(--foreground) / 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {cat}
                  </motion.button>
                ))}
              </motion.div>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border-2 border-foreground/20 bg-background font-mono text-sm focus:outline-none focus:border-foreground/40"
                />
              </div>
            </div>

            {/* Skills Grid */}
            <div className="p-4">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                {filteredSkills.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-foreground/5 px-4 py-2 border-t-2 border-foreground/10 flex items-center justify-between text-xs font-mono">
              <div className="text-muted-foreground">
                Total: {skills.length} | Filtered: {filteredSkills.length}
              </div>
              <motion.div 
                className="text-muted-foreground"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Status: ACTIVE
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
