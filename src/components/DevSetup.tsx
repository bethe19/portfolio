import { Card } from "@/components/ui/card";
import { Monitor, Terminal, Code2, Palette, Package, Settings, FileJson } from "lucide-react";
import { useDevMode } from "@/hooks/useDevMode";
import { useState } from "react";

const setupCategories = [
  {
    title: "Editor & IDE",
    icon: Code2,
    items: ["VS Code", "Extensions: Prettier, ESLint, GitLens", "Theme: One Dark Pro"]
  },
  {
    title: "Terminal",
    icon: Terminal,
    items: ["Windows Terminal", "PowerShell", "Oh My Posh", "Git Bash"]
  },
  {
    title: "Development Tools",
    icon: Monitor,
    items: ["Node.js", "Git", "Docker", "Postman", "MongoDB Compass"]
  },
  {
    title: "Design & Prototyping",
    icon: Palette,
    items: ["Figma", "Canva", "ColorPick"]
  }
];

export const DevSetup = () => {
  const isDevMode = useDevMode();
  const [selectedCategory, setSelectedCategory] = useState(0);

  // Normal Mode: Grid layout
  if (!isDevMode) {
    return (
      <section id="dev-setup" className="py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 uppercase tracking-wider">
                Development Setup
              </h2>
              <p className="text-sm text-muted-foreground">
                Tools and environment I use daily
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {setupCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card
                    key={index}
                    className="border-2 border-border rounded-lg p-6 bg-card transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="w-6 h-6" />
                      <h3 className="text-lg font-semibold">{category.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {category.items.map((item, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex items-center gap-2"
                        >
                          <span className="text-foreground/60">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Dev Mode: Config file style with tree structure
  return (
    <section id="dev-setup" className="py-6">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* File System Header */}
          <div className="mb-4 border-2 border-foreground/20 p-3 bg-background">
            <div className="flex items-center gap-2 text-xs font-mono">
              <FileJson className="w-4 h-4" />
              <span className="text-muted-foreground">$</span>
              <span>cat dev-setup.json</span>
            </div>
          </div>

          <Card className="border-2 border-foreground/30 overflow-hidden">
            {/* File Header */}
            <div className="bg-foreground/10 px-4 py-2 border-b-2 border-foreground/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                <span className="text-xs font-mono">dev-setup.json</span>
                <span className="text-xs text-muted-foreground">(CONFIG)</span>
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-green-500"></div>
                <span className="text-xs font-mono text-muted-foreground">ACTIVE</span>
              </div>
            </div>

            {/* Config Content */}
            <div className="p-6 font-mono text-xs bg-background">
              <div className="mb-4">
                <span className="text-purple-500">{"{"}</span>
                <div className="ml-4">
                  {/* Category Tabs */}
                  <div className="mb-4 flex gap-2 flex-wrap">
                    {setupCategories.map((cat, idx) => {
                      const Icon = cat.icon;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedCategory(idx)}
                          className={`px-3 py-1 border-2 transition-all text-xs ${
                            selectedCategory === idx
                              ? "bg-foreground text-background border-foreground"
                              : "bg-background border-foreground/20 hover:border-foreground/40"
                          }`}
                        >
                          <Icon className="w-3 h-3 inline mr-1" />
                          {cat.title}
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Category Details */}
                  <div className="ml-4">
                    <span className="text-blue-500">"{setupCategories[selectedCategory].title.toLowerCase().replace(/\s+/g, "_")}"</span>
                    <span className="text-foreground">: </span>
                    <span className="text-purple-500">{"{"}</span>
                    <div className="ml-4 space-y-2 mt-2">
                      <div>
                        <span className="text-green-500">"tools"</span>
                        <span className="text-foreground">: </span>
                        <span className="text-purple-500">[</span>
                        <div className="ml-4">
                          {setupCategories[selectedCategory].items.map((item, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="text-yellow-500">"{item}"</span>
                              {i < setupCategories[selectedCategory].items.length - 1 && (
                                <span className="text-foreground">,</span>
                              )}
                            </div>
                          ))}
                        </div>
                        <span className="text-purple-500">]</span>
                      </div>
                      <div>
                        <span className="text-green-500">"icon"</span>
                        <span className="text-foreground">: </span>
                        <span className="text-yellow-500">"{setupCategories[selectedCategory].icon.name}"</span>
                      </div>
                      <div>
                        <span className="text-green-500">"status"</span>
                        <span className="text-foreground">: </span>
                        <span className="text-green-500">"installed"</span>
                      </div>
                    </div>
                    <span className="text-purple-500">{"}"}</span>
                  </div>
                </div>
                <span className="text-purple-500">{"}"}</span>
              </div>
            </div>

            {/* File Footer */}
            <div className="bg-foreground/5 px-4 py-2 border-t-2 border-foreground/10 flex items-center justify-between text-xs font-mono">
              <div className="flex gap-4 text-muted-foreground">
                <span>JSON</span>
                <span>Categories: {setupCategories.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="w-3 h-3" />
                <span>CONFIG LOADED</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
