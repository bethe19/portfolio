import { Card } from "@/components/ui/card";
import { Github, Code, Users, FolderGit2, Terminal, GitBranch, Target, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { useDevMode } from "@/hooks/useDevMode";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeInUp, staggerContainer, staggerItem, cardHover, pulseAnimation } from "@/lib/animations";

interface GitHubUserData {
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  avatar_url: string;
  html_url: string;
  location: string | null;
  blog: string | null;
  company: string | null;
}


interface GitHubRepo {
  name: string;
  size: number;
  language: string | null;
  description: string | null;
  topics: string[];
  fork: boolean;
  default_branch: string;
}

interface StatsData {
  linesOfCode: number;
  gitCommits: number;
  projectsCompleted: number;
  reposContributed: number;
}

const statsConfig = [
  { icon: Code, label: "Lines of Code", color: "text-blue-500", key: "linesOfCode" as keyof StatsData },
  { icon: GitBranch, label: "Git Commits", color: "text-green-500", key: "gitCommits" as keyof StatsData },
  { icon: Target, label: "Projects Completed", color: "text-orange-500", key: "projectsCompleted" as keyof StatsData },
  { icon: BookOpen, label: "Repos Contributed", color: "text-red-500", key: "reposContributed" as keyof StatsData },
  { icon: Users, label: "Followers", color: "text-purple-500", key: "followers" as any },
  { icon: FolderGit2, label: "Following", color: "text-green-500", key: "following" as any }
];

export const GitHubStats = () => {
  const [githubData, setGithubData] = useState<GitHubUserData | null>(null);
  const [statsData, setStatsData] = useState<StatsData & { followers: number; following: number }>({
    linesOfCode: 0,
    gitCommits: 0,
    projectsCompleted: 0,
    reposContributed: 0,
    followers: 0,
    following: 0
  });
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isDevMode = useDevMode();
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  useEffect(() => {
    if (!isDevMode) return;

    const username = "bethe19";

    // Fetch all data using REST API only
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setStatsLoading(true);
        setError(null);

        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData: GitHubUserData = await userResponse.json();
        setGithubData(userData);
        setLoading(false);

        // Fetch repos and calculate stats
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
        if (!reposResponse.ok) throw new Error('Failed to fetch repos');
        const repos: GitHubRepo[] = await reposResponse.json();

        const originalRepos = repos.filter(repo => !repo.fork);
        const totalRepos = repos.length;

        // Calculate lines of code estimate
        const totalSizeKB = repos.reduce((sum, repo) => sum + repo.size, 0);
        const estimatedLinesOfCode = Math.round(totalSizeKB * 50);

        // Fetch commit counts from repos (sample first 10 to avoid rate limits)
        let totalCommits = 0;
        const reposToCheck = originalRepos.slice(0, 10);
        
        for (const repo of reposToCheck) {
          try {
            const commitsResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1`, {
              headers: {
                'Accept': 'application/vnd.github.v3+json',
              }
            });
            
            if (commitsResponse.ok) {
              const linkHeader = commitsResponse.headers.get('Link');
              if (linkHeader) {
                const lastPageMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
                if (lastPageMatch) {
                  totalCommits += parseInt(lastPageMatch[1]);
                } else {
                  totalCommits += 1;
                }
              } else {
                const commits = await commitsResponse.json();
                if (commits.length > 0) totalCommits += 1;
              }
            }
            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 100));
          } catch (error) {
            // Continue if one repo fails
            console.error(`Error fetching commits for ${repo.name}:`, error);
          }
        }

        // Extrapolate for remaining repos
        if (originalRepos.length > reposToCheck.length) {
          const avgCommitsPerRepo = reposToCheck.length > 0 ? totalCommits / reposToCheck.length : 0;
          totalCommits += Math.round(avgCommitsPerRepo * (originalRepos.length - reposToCheck.length));
        }

        // Set stats data
        setStatsData({
          linesOfCode: estimatedLinesOfCode,
          gitCommits: totalCommits,
          projectsCompleted: originalRepos.length,
          reposContributed: totalRepos,
          followers: userData.followers,
          following: userData.following
        });

        setStatsLoading(false);
      } catch (error: any) {
        console.error('Error fetching GitHub data:', error);
        setError('Failed to load GitHub statistics');
        setLoading(false);
        setStatsLoading(false);
      }
    };

    fetchAllData();
  }, [isDevMode]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };


  if (!isDevMode) {
    return null;
  }

  const isLoading = loading || statsLoading;

  return (
    <motion.section 
      id="github-stats" 
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
              <span className="text-green-500">$</span>
              <span>gh api user --username bethe19 --stats</span>
              {isLoading && (
                <motion.span 
                  className="text-yellow-500"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ...
                </motion.span>
              )}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                _
              </motion.span>
            </div>
            <AnimatePresence mode="wait">
              {!isLoading && !error && (
                <motion.div 
                  className="text-xs font-mono text-green-500"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  ✓ GitHub data and statistics loaded successfully
                </motion.div>
              )}
              {error && (
                <motion.div 
                  className="text-xs font-mono text-red-500"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  ✗ {error}
                </motion.div>
              )}
            </AnimatePresence>
            {/* Scanline effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-transparent pointer-events-none"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ height: "50%" }}
            />
          </motion.div>

          {loading ? (
            <Card className="border-2 border-foreground/30 p-6 bg-background">
              <div className="flex items-center justify-center h-32">
                <div className="text-sm font-mono text-muted-foreground">Loading GitHub data...</div>
              </div>
            </Card>
          ) : error ? (
            <Card className="border-2 border-foreground/30 p-6 bg-background">
              <div className="text-center text-destructive font-mono">{error}</div>
            </Card>
          ) : githubData ? (
            <Card className="border-2 border-foreground/30 overflow-hidden">
              {/* Card Header */}
              <div className="bg-foreground/10 px-4 py-3 border-b-2 border-foreground/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  <span className="text-xs font-mono">GITHUB_STATS.json</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-green-500"></div>
                  <span className="text-xs font-mono text-green-500">ACTIVE</span>
                </div>
              </div>

              {/* Main Content */}
              <div className="p-3 bg-background">
                {/* Profile and Stats Combined Layout - No free spaces */}
                <div className="grid md:grid-cols-5 gap-3">
                  {/* Avatar and Info - Compact */}
                  <div className="md:col-span-1">
                    <div className="border-2 border-foreground/20 p-1.5 bg-background mb-2">
                      <img
                        src={githubData.avatar_url}
                        alt={githubData.name || githubData.login}
                        className="w-full h-auto border-2 border-foreground/10"
                      />
                    </div>
                    <div className="space-y-1 text-xs font-mono">
                      <div className="flex justify-between border-b border-foreground/10 pb-1">
                        <span className="text-muted-foreground">@</span>
                        <span className="text-foreground font-bold text-xs">{githubData.login}</span>
                      </div>
                      {githubData.location && (
                        <div className="flex justify-between text-[10px]">
                          <span className="text-muted-foreground">Loc:</span>
                          <span className="text-foreground truncate ml-1">{githubData.location}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-[10px] border-t border-foreground/10 pt-1">
                        <span className="text-muted-foreground">Joined:</span>
                        <span className="text-foreground">{formatDate(githubData.created_at)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bio - Compact */}
                  <div className="md:col-span-2 flex flex-col">
                    <div className="text-[10px] font-mono text-muted-foreground mb-1.5">[BIO]</div>
                    <div className="border-2 border-foreground/20 p-2.5 bg-background flex-1 flex flex-col">
                      <p className="text-xs font-mono leading-relaxed mb-2.5 flex-1">
                        {githubData.bio || "No bio available"}
                      </p>
                      <motion.a
                        href={githubData.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 border-2 border-foreground/20 text-[10px] font-mono self-start"
                        whileHover={{ 
                          scale: 1.05,
                          borderColor: "hsl(var(--foreground) / 0.6)",
                          backgroundColor: "hsl(var(--foreground) / 0.1)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <GitBranch className="w-2.5 h-2.5" />
                        </motion.div>
                        VIEW PROFILE
                      </motion.a>
                    </div>
                  </div>

                  {/* Stats Grid - Compact, fills space */}
                  <div className="md:col-span-2 flex flex-col">
                    <div className="text-[10px] font-mono text-muted-foreground mb-1.5">[STATISTICS]</div>
                    <motion.div 
                      className="grid grid-cols-2 gap-2 flex-1"
                      variants={staggerContainer}
                      initial="hidden"
                      animate={isVisible ? "visible" : "hidden"}
                    >
                    {statsConfig.map((stat, index) => {
                      const Icon = stat.icon;
                      const value = statsData[stat.key as keyof typeof statsData];
                      const displayValue = statsLoading ? 0 : (value || 0);
                      
                      const getMaxValue = (key: string) => {
                        switch (key) {
                          case 'linesOfCode': return 100000;
                          case 'gitCommits': return 2000;
                          case 'projectsCompleted': return 50;
                          case 'reposContributed': return 50;
                          case 'followers': return 1000;
                          case 'following': return 500;
                          default: return 1000;
                        }
                      };

                      const maxValue = getMaxValue(stat.key);
                      const progressPercent = Math.min((displayValue / maxValue) * 100, 100);

                      return (
                        <motion.div
                          key={index}
                          className="border-2 border-foreground/20 p-2 bg-background flex flex-col relative overflow-hidden"
                          variants={staggerItem}
                          whileHover={{ 
                            scale: 1.05,
                            borderColor: "hsl(var(--foreground) / 0.4)",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {/* Hover glow effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-transparent via-green-500/5 to-transparent pointer-events-none"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                          
                          <div className="flex items-center gap-1 mb-1.5 relative z-10">
                            <motion.div
                              whileHover={{ rotate: 360, scale: 1.2 }}
                              transition={{ duration: 0.5 }}
                            >
                              <Icon className={`w-3 h-3 ${stat.color}`} />
                            </motion.div>
                            <span className="text-[10px] font-mono uppercase">{stat.label}</span>
                          </div>

                          <div className="mb-1.5 flex-1 flex items-center relative z-10">
                            {statsLoading ? (
                              <motion.span 
                                className="text-lg font-bold font-mono text-muted-foreground"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                ---
                              </motion.span>
                            ) : (
                              <motion.span 
                                className="text-lg font-bold font-mono"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                              >
                                {displayValue.toLocaleString()}
                              </motion.span>
                            )}
                          </div>

                          {!statsLoading && (
                            <div className="w-full bg-foreground/10 border border-foreground/20 mb-1 overflow-hidden relative z-10" style={{ height: '3px' }}>
                              <motion.div
                                className={`h-full ${
                                  stat.color.includes('blue') ? 'bg-blue-500' :
                                  stat.color.includes('green') ? 'bg-green-500' :
                                  stat.color.includes('purple') ? 'bg-purple-500' :
                                  stat.color.includes('orange') ? 'bg-orange-500' :
                                  stat.color.includes('yellow') ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                initial={{ width: 0 }}
                                animate={isVisible ? { width: `${progressPercent}%` } : { width: 0 }}
                                transition={{ duration: 1.5, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                              />
                            </div>
                          )}

                          <div className="text-[9px] font-mono text-muted-foreground relative z-10">
                            ID: {String(index + 1).padStart(2, '0')}
                          </div>
                        </motion.div>
                      );
                    })}
                    </motion.div>
                  </div>
                </div>

              </div>

              {/* Card Footer */}
              <div className="bg-foreground/5 px-4 py-2 border-t-2 border-foreground/10 flex items-center justify-between text-xs font-mono">
                <div className="text-muted-foreground">
                  Last updated: {githubData ? formatDate(githubData.updated_at) : 'N/A'} | Source: GitHub API
                </div>
                <div className="text-muted-foreground">
                  Status: {isLoading ? 'LOADING...' : error ? 'ERROR' : 'ONLINE'}
                </div>
              </div>
            </Card>
          ) : null}
        </div>
      </div>
    </motion.section>
  );
};
