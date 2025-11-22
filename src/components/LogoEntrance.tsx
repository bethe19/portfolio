import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import darkLogo from "../../images/dark logo.png";
import lightLogo from "../../images/light logo.png";

const THEME_STORAGE_KEY = "bethe-theme-preference";

export const LogoEntrance = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference first
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    let initialIsDark = false;

    if (savedTheme !== null) {
      initialIsDark = savedTheme === "dark";
    } else {
      // If no saved preference, detect system theme
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      initialIsDark = mediaQuery.matches;
    }

    setIsDark(initialIsDark);

    // Also watch for dark mode class changes
    const checkDarkMode = () => {
      setIsDark(document.body.classList.contains("dark"));
    };
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Hide entrance after animation completes
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500); // 2.5 seconds total animation to accommodate name animation

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ 
              scale: [0, 1.2, 1],
              opacity: [0, 1, 1],
              rotate: [-180, 10, 0]
            }}
            exit={{ 
              scale: 1.5,
              opacity: 0,
              transition: { duration: 0.3 }
            }}
            transition={{ 
              duration: 1.5,
              ease: [0.34, 1.56, 0.64, 1], // Custom easing for bounce effect
              times: [0, 0.6, 1]
            }}
            className="relative"
          >
            <motion.img
              src={isDark ? darkLogo : lightLogo}
              alt="Logo"
              className="h-24 w-24 md:h-32 md:w-32 object-contain"
              animate={{
                filter: [
                  "brightness(1) drop-shadow(0 0 0px rgba(0,0,0,0))",
                  "brightness(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.3))",
                  "brightness(1) drop-shadow(0 0 0px rgba(0,0,0,0))",
                ],
              }}
              transition={{
                duration: 1.5,
                times: [0, 0.5, 1],
              }}
            />
            {/* Pulsing ring effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-foreground/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.8, 1.5, 2],
                opacity: [0.5, 0.3, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </motion.div>
          
          {/* Name Animation */}
          <motion.h1
            className="text-2xl md:text-3xl font-bold text-foreground mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: [0, 0, 1],
              y: [20, 20, 0]
            }}
            transition={{
              duration: 1.5,
              delay: 1,
              ease: "easeOut",
              times: [0, 0.5, 1]
            }}
          >
            Welcome!
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

