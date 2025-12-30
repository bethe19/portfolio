import { useState, useEffect } from "react";

export const useDevMode = () => {
  const [isDevMode, setIsDevMode] = useState(false);

  useEffect(() => {
    const checkDevMode = () => {
      setIsDevMode(document.body.classList.contains("dev-mode"));
    };

    // Initial check
    checkDevMode();

    // Watch for dev mode changes
    const observer = new MutationObserver(checkDevMode);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return isDevMode;
};

