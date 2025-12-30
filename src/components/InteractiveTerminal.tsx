import { Card } from "@/components/ui/card";
import { Terminal, Play, Command, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useDevMode } from "@/hooks/useDevMode";

const commands = [
  { command: "whoami", output: "bethe-bayou\nSoftware Engineer | Full-Stack Developer", delay: 500 },
  { command: "cat skills.txt", output: "React, TypeScript, Node.js, MongoDB, PostgreSQL, Python", delay: 600 },
  { command: "ls projects/", output: "fintrack/\nmoodie/\ncheckmate/\nscoutai/\nnextstop/", delay: 400 },
  { command: "git status", output: "On branch: main\nLatest commit: Always learning, always building", delay: 700 },
  { command: "echo $PATH", output: "/usr/bin:/usr/local/bin\n/opt/homebrew/bin", delay: 500 },
  { command: "date", output: new Date().toLocaleString(), delay: 300 }
];

export const InteractiveTerminal = () => {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [displayedOutput, setDisplayedOutput] = useState("");
  const [inputCommand, setInputCommand] = useState("");
  const isDevMode = useDevMode();

  const executeCommand = () => {
    setIsTyping(true);
    setDisplayedOutput("");
    const cmd = commands[currentCommand];
    
    // Type command
    let charIndex = 0;
    const typeCommand = setInterval(() => {
      if (charIndex < cmd.command.length) {
        setDisplayedOutput(cmd.command.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeCommand);
        setTimeout(() => {
          setDisplayedOutput(cmd.command);
          // Then show output
          setTimeout(() => {
            setDisplayedOutput(cmd.output);
            setIsTyping(false);
          }, 200);
        }, 300);
      }
    }, 50);
  };

  const handleCustomCommand = (cmd: string) => {
    if (!cmd.trim()) return;
    
    setCommandHistory(prev => [...prev, cmd]);
    
    // Check if it's a known command
    const knownCmd = commands.find(c => c.command === cmd.toLowerCase().trim());
    if (knownCmd) {
      setIsTyping(true);
      setDisplayedOutput("");
      setTimeout(() => {
        setDisplayedOutput(knownCmd.output);
        setIsTyping(false);
      }, 500);
    } else {
      setIsTyping(true);
      setDisplayedOutput("");
      setTimeout(() => {
        setDisplayedOutput(`Command not found: ${cmd}\nType 'help' for available commands.`);
        setIsTyping(false);
      }, 500);
    }
    setInputCommand("");
  };

  // Normal Mode: Simple interactive terminal
  if (!isDevMode) {
    return (
      <section id="terminal" className="py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 uppercase tracking-wider flex items-center justify-center gap-3">
                <Terminal className="w-6 h-6" />
                Interactive Terminal
              </h2>
              <p className="text-sm text-muted-foreground">
                Explore developer info via terminal commands
              </p>
            </div>

            <Card className="border-2 border-border rounded-lg bg-background overflow-hidden">
              <div className="bg-foreground/10 px-4 py-2 flex items-center gap-2 border-b border-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-xs text-muted-foreground ml-4 font-mono">terminal</span>
              </div>

              <div className="p-4 font-mono text-sm bg-background min-h-[200px]">
                <div className="mb-2">
                  <span className="text-green-500">$</span>
                  <span className="ml-2 text-foreground">{commands[currentCommand].command}</span>
                  {isTyping && <span className="animate-pulse">▊</span>}
                </div>
                {!isTyping && (
                  <div className="text-muted-foreground whitespace-pre-line mt-2">
                    {displayedOutput || commands[currentCommand].output}
                  </div>
                )}
              </div>

              <div className="px-4 pb-4">
                <button
                  onClick={executeCommand}
                  className="w-full bg-foreground text-background hover:opacity-90 transition-all duration-300 rounded-lg py-2 flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Run Next Command
                </button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  // Dev Mode: Full-featured terminal with command input and history
  return (
    <section id="terminal" className="py-6">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* ASCII Banner */}
          <div className="mb-4 text-center font-mono text-xs">
            <pre className="text-muted-foreground">
{`╔═══════════════════════════════════════╗
║  INTERACTIVE TERMINAL v3.0 [DEV MODE] ║
╚═══════════════════════════════════════╝`}
            </pre>
          </div>

          <Card className="border-2 border-foreground/30 overflow-hidden bg-background">
            {/* Terminal Header with Info */}
            <div className="bg-foreground/10 px-4 py-2 flex items-center justify-between border-b-2 border-foreground/20">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 bg-red-500"></div>
                  <div className="w-3 h-3 bg-yellow-500"></div>
                  <div className="w-3 h-3 bg-green-500"></div>
                </div>
                <div className="text-xs font-mono">
                  <span className="text-muted-foreground">user@portfolio</span>
                  <span className="text-green-500 mx-1">:</span>
                  <span className="text-blue-500">~/terminal</span>
                  <span className="text-green-500">$</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <span>●</span>
                <span>DEV</span>
              </div>
            </div>

            {/* Terminal Body with History */}
            <div className="p-4 font-mono text-sm bg-background min-h-[300px] max-h-[400px] overflow-y-auto">
              {/* Welcome Message */}
              {commandHistory.length === 0 && (
                <div className="mb-4 text-muted-foreground text-xs">
                  <div>Welcome to Interactive Terminal v3.0</div>
                  <div>Type 'help' for available commands or try:</div>
                  <div className="mt-2">
                    {commands.slice(0, 3).map((cmd, i) => (
                      <div key={i} className="text-blue-500">
                        $ {cmd.command}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Command History */}
              {commandHistory.map((cmd, idx) => {
                const knownCmd = commands.find(c => c.command === cmd.toLowerCase().trim());
                return (
                  <div key={idx} className="mb-2">
                    <div>
                      <span className="text-green-500">$</span>
                      <span className="ml-2 text-foreground">{cmd}</span>
                    </div>
                    <div className="text-muted-foreground whitespace-pre-line mt-1 ml-4">
                      {knownCmd?.output || `Command not found: ${cmd}`}
                    </div>
                  </div>
                );
              })}

              {/* Current Output */}
              {!isTyping && displayedOutput && commandHistory.length === 0 && (
                <div className="mb-2">
                  <div>
                    <span className="text-green-500">$</span>
                    <span className="ml-2 text-foreground">{commands[currentCommand].command}</span>
                  </div>
                  <div className="text-muted-foreground whitespace-pre-line mt-1 ml-4">
                    {displayedOutput}
                  </div>
                </div>
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="mb-2">
                  <span className="text-green-500">$</span>
                  <span className="ml-2 text-foreground">{displayedOutput}</span>
                  <span className="animate-pulse text-green-500">▊</span>
                </div>
              )}

              {/* Input Line */}
              <div className="flex items-center gap-2 mt-4">
                <span className="text-green-500">$</span>
                <input
                  type="text"
                  value={inputCommand}
                  onChange={(e) => setInputCommand(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleCustomCommand(inputCommand);
                    }
                  }}
                  placeholder="Type a command..."
                  className="flex-1 bg-transparent border-none outline-none font-mono text-sm"
                  autoFocus
                />
                <button
                  onClick={() => handleCustomCommand(inputCommand)}
                  className="px-3 py-1 border-2 border-foreground/20 hover:border-foreground/40 hover:bg-foreground/10 transition-all text-xs"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Terminal Footer */}
            <div className="bg-foreground/5 px-4 py-2 border-t-2 border-foreground/10 flex items-center justify-between text-xs font-mono">
              <div className="flex gap-4 text-muted-foreground">
                <span>Commands: {commands.length}</span>
                <span>History: {commandHistory.length}</span>
              </div>
              <button
                onClick={executeCommand}
                className="px-3 py-1 border-2 border-foreground/20 hover:border-foreground/40 hover:bg-foreground/10 transition-all flex items-center gap-1"
              >
                <Play className="w-3 h-3" />
                AUTO RUN
              </button>
            </div>
          </Card>

          {/* Quick Command Buttons */}
          <div className="mt-3 flex flex-wrap gap-2">
            {commands.map((cmd, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentCommand(idx);
                  executeCommand();
                }}
                className="px-3 py-1 text-xs font-mono border-2 border-foreground/20 hover:border-foreground/40 hover:bg-foreground/10 transition-all"
              >
                <Command className="w-3 h-3 inline mr-1" />
                {cmd.command}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
