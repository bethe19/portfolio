import { Card } from "@/components/ui/card";
import { Code2, Copy, Check, Terminal, FileCode } from "lucide-react";
import { useState, useEffect } from "react";
import { useDevMode } from "@/hooks/useDevMode";

interface CodeSnippet {
  title: string;
  description: string;
  code: string;
  language: string;
}

const snippets: CodeSnippet[] = [
  {
    title: "Efficient API Handler",
    description: "Type-safe API wrapper with error handling",
    language: "typescript",
    code: `async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }
  return response.json();
}`
  },
  {
    title: "Custom React Hook",
    description: "Reusable state management hook",
    language: "typescript",
    code: `function useLocalStorage<T>(key: string, initial: T) {
  const [stored, setStored] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initial;
  });
  
  const setValue = (value: T) => {
    setStored(value);
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  return [stored, setValue] as const;
}`
  },
  {
    title: "Express Middleware",
    description: "Error handling middleware for Node.js",
    language: "javascript",
    code: `const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};`
  },
  {
    title: "MongoDB Query Helper",
    description: "Optimized database query function",
    language: "javascript",
    code: `async function findDocuments(collection, query, options = {}) {
  const { limit = 10, skip = 0, sort = {} } = options;
  return await collection
    .find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .toArray();
}`
  },
];

export const CodeSnippets = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isDevMode = useDevMode();

  const copyToClipboard = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getLineNumbers = (code: string) => {
    return code.split('\n').length;
  };

  // Normal Mode: Clean card grid layout
  if (!isDevMode) {
    return (
      <section id="code-snippets" className="py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 uppercase tracking-wider flex items-center justify-center gap-3">
                <Code2 className="w-6 h-6" />
                Code Snippets
              </h2>
              <p className="text-sm text-muted-foreground">
                Favorite code snippets and solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {snippets.map((snippet, index) => (
                <Card
                  key={index}
                  className="border-2 border-border rounded-lg p-4 bg-card transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{snippet.title}</h3>
                      <p className="text-xs text-muted-foreground">{snippet.description}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(snippet.code, index)}
                      className="p-2 hover:bg-foreground/10 transition-colors rounded-lg"
                      title="Copy code"
                    >
                      {copiedIndex === index ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <pre className="bg-background p-4 overflow-x-auto border border-border rounded-lg text-xs font-mono">
                    <code>{snippet.code}</code>
                  </pre>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Dev Mode: Terminal-style code editor with line numbers
  return (
    <section id="code-snippets" className="py-6">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* ASCII Art Header in Dev Mode */}
          <div className="mb-6 text-center font-mono text-xs">
            <pre className="text-muted-foreground">
{`╔═══════════════════════════════════════╗
║    CODE SNIPPETS REPOSITORY v2.0    ║
╚═══════════════════════════════════════╝`}
            </pre>
          </div>

          {/* File Navigator */}
          <div className="mb-4 border-2 border-foreground/20 p-2 bg-background">
            <div className="flex items-center gap-2 text-xs font-mono">
              <Terminal className="w-4 h-4" />
              <span className="text-muted-foreground">$</span>
              <span>cd snippets/</span>
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              {snippets.map((snippet, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`px-3 py-1 text-xs font-mono border-2 transition-all ${
                    selectedIndex === index
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background border-foreground/20 hover:border-foreground/40"
                  }`}
                >
                  <FileCode className="w-3 h-3 inline mr-1" />
                  {snippet.title.toLowerCase().replace(/\s+/g, "_")}.{snippet.language}
                </button>
              ))}
            </div>
          </div>

          {/* Code Editor View */}
          <Card className="border-2 border-foreground/30 overflow-hidden">
            {/* Editor Header */}
            <div className="bg-foreground/10 px-4 py-2 flex items-center justify-between border-b-2 border-foreground/20">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 bg-red-500"></div>
                  <div className="w-3 h-3 bg-yellow-500"></div>
                  <div className="w-3 h-3 bg-green-500"></div>
                </div>
                <span className="text-xs font-mono text-muted-foreground ml-2">
                  {snippets[selectedIndex].title.toLowerCase().replace(/\s+/g, "_")}.{snippets[selectedIndex].language}
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(snippets[selectedIndex].code, selectedIndex)}
                className="px-3 py-1 text-xs font-mono border-2 border-foreground/20 hover:border-foreground/40 hover:bg-foreground/10 transition-all"
              >
                {copiedIndex === selectedIndex ? (
                  <span className="text-green-500">✓ COPIED</span>
                ) : (
                  "COPY"
                )}
              </button>
            </div>

            {/* Code with Line Numbers */}
            <div className="flex bg-background">
              {/* Line Numbers */}
              <div className="bg-foreground/5 px-3 py-4 text-right text-xs font-mono text-muted-foreground border-r-2 border-foreground/10 select-none">
                {Array.from({ length: getLineNumbers(snippets[selectedIndex].code) }, (_, i) => (
                  <div key={i} className="leading-6">
                    {String(i + 1).padStart(3, "0")}
                  </div>
                ))}
              </div>

              {/* Code Content */}
              <div className="flex-1 overflow-x-auto">
                <pre className="p-4 text-xs font-mono leading-6">
                  <code>{snippets[selectedIndex].code}</code>
                </pre>
              </div>
            </div>

            {/* Editor Footer */}
            <div className="bg-foreground/5 px-4 py-2 border-t-2 border-foreground/10 flex items-center justify-between text-xs font-mono">
              <div className="flex gap-4 text-muted-foreground">
                <span>Ln {getLineNumbers(snippets[selectedIndex].code)}, Col {snippets[selectedIndex].code.length}</span>
                <span>{snippets[selectedIndex].language.toUpperCase()}</span>
              </div>
              <div className="text-muted-foreground">
                {snippets[selectedIndex].description}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
