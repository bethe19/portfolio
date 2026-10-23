import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isLight, setIsLight] = useState(false);

  const applyTheme = (light: boolean) => {
    setIsLight(light);
    document.documentElement.classList.toggle("light", light);
    document.documentElement.classList.toggle("dark", !light);
    document.documentElement.setAttribute("data-theme", light ? "light" : "dark");
    localStorage.setItem("theme", light ? "light" : "dark");
    window.dispatchEvent(new CustomEvent("themechange", { detail: { theme: light ? "light" : "dark" } }));
  };

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    const light = stored === "light";
    setIsLight(light);
    document.documentElement.classList.toggle("light", light);
    document.documentElement.classList.toggle("dark", !light);
    document.documentElement.setAttribute("data-theme", light ? "light" : "dark");
  }, []);

  const toggle = () => {
    applyTheme(!isLight);
  };

  return (
    <button
      onClick={toggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className="glass-panel inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/80 transition-all hover:text-foreground hover:scale-105 shadow-xs cursor-pointer"
    >
      {mounted && isLight ? <Moon size={15} /> : <Sun size={15} />}
    </button>
  );
}

export default ThemeToggle;

