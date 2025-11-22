import { Menu, Moon, Sun, Terminal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import darkLogo from "../../images/dark logo.png";
import lightLogo from "../../images/light logo.png";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const THEME_STORAGE_KEY = "bethe-theme-preference";

export const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const [isDevMode, setIsDevMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isManualOverride, setIsManualOverride] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme !== null) {
      const savedIsDark = savedTheme === "dark";
      setIsDark(savedIsDark);
      setIsManualOverride(true);
      if (savedIsDark) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    } else {
      // If no saved preference, detect system theme
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const systemIsDark = mediaQuery.matches;
      setIsDark(systemIsDark);
      if (systemIsDark) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    }
  }, []);

  // Detect system theme preference changes (only if no manual override)
  useEffect(() => {
    if (isManualOverride) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = (e: MediaQueryList | MediaQueryListEvent) => {
      setIsDark(e.matches);
      if (e.matches) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    };

    // Listen for system theme changes
    mediaQuery.addEventListener("change", updateTheme);

    return () => {
      mediaQuery.removeEventListener("change", updateTheme);
    };
  }, [isManualOverride]);

  // Update theme when isDark changes and save to localStorage
  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    // Save to localStorage if manually overridden
    if (isManualOverride) {
      localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
    }
  }, [isDark, isManualOverride]);

  const handleThemeToggle = () => {
    setIsManualOverride(true);
    setIsDark(!isDark);
  };

  useEffect(() => {
    if (isDevMode) {
      document.body.classList.add("dev-mode");
    } else {
      document.body.classList.remove("dev-mode");
    }
  }, [isDevMode]);

  const navItemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.12 * index, duration: 0.35, ease: "easeOut" as const },
    }),
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <motion.a
          href="#"
          className="flex items-center hover:opacity-70 transition-opacity"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <img
            src={isDark ? darkLogo : lightLogo}
            alt="Logo"
            className="h-10 w-10 object-contain"
          />
        </motion.a>

        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <AnimatePresence>
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  custom={index}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </AnimatePresence>
          </nav>

          {/* Mode Toggles */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleThemeToggle}
              title={isDark ? "Light mode" : "Dark mode"}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDevMode(!isDevMode)}
              title="Toggle dev mode"
              className={`transition-all duration-300 ${isDevMode ? 'bg-foreground/10 border-2 border-foreground/30 dev-mode:rounded-none' : ''}`}
            >
              <Terminal className={`h-5 w-5 transition-all duration-300 ${isDevMode ? 'text-foreground' : ''}`} />
            </Button>

            {/* Mobile Navigation */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" aria-label="Toggle menu">
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="border-l border-border bg-background/95 backdrop-blur-lg">
                <motion.nav
                  className="flex flex-col gap-4 mt-10"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { when: "beforeChildren", staggerChildren: 0.12 },
                    },
                  }}
                >
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      className="text-lg font-semibold text-muted-foreground hover:text-foreground transition-colors"
                      variants={{
                        hidden: { opacity: 0, x: 16 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: { duration: 0.3, ease: "easeOut" },
                        },
                      }}
                      custom={index}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </motion.nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
