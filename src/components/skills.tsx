import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiC,
  SiCplusplus,
  SiGo,
  SiDart,
  SiFlutter,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiFastapi,
  SiApachekafka,
  SiRabbitmq,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiRedis,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiDocker,
  SiNginx,
  SiLinux,
  SiNumpy,
  SiPytorch,
  SiScikitlearn,
} from "react-icons/si";
import { FaCss3Alt, FaHtml5 } from "react-icons/fa";
import { TbApi, TbNetwork, TbDatabase, TbBrain, TbRobot, TbSparkles } from "react-icons/tb";
import type { IconType } from "react-icons";
import { skills } from "../data";
import { Section } from "./section";

// Skills without a matching brand icon render as text only
const icons: Record<string, IconType> = {
  Go: SiGo,
  Python: SiPython,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Dart: SiDart,
  "C++": SiCplusplus,
  C: SiC,
  SQL: TbDatabase,
  gRPC: TbApi,
  "REST API": TbApi,
  Kafka: SiApachekafka,
  Redis: SiRedis,
  RabbitMQ: SiRabbitmq,
  Microservices: TbNetwork,
  FastAPI: SiFastapi,
  "Express.js": SiExpress,
  "Machine Learning": TbBrain,
  LLMs: TbSparkles,
  RAG: TbDatabase,
  "AI Agents": TbRobot,
  NumPy: SiNumpy,
  PyTorch: SiPytorch,
  "Scikit-Learn": SiScikitlearn,
  "Prompt Engineering": TbSparkles,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  Docker: SiDocker,
  Git: SiGit,
  GitHub: SiGithub,
  "CI/CD": SiGithubactions,
  Linux: SiLinux,
  Nginx: SiNginx,
  React: SiReact,
  "Next.js": SiNextdotjs,
  Flutter: SiFlutter,
  "Tailwind CSS": SiTailwindcss,
  HTML5: FaHtml5,
  CSS3: FaCss3Alt,
};

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <dl className="space-y-4 rounded border border-border p-4">
        {skills.map(({ group, items }) => (
          <div key={group} className="flex flex-col gap-2 sm:flex-row sm:items-start">
            <dt className="w-36 shrink-0 pt-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {group}
            </dt>
            <dd className="flex flex-wrap gap-2">
              {items.map((skill) => {
                const Icon = icons[skill];
                return (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 border border-border px-3 py-1 text-sm transition-all hover:rounded-lg hover:bg-foreground hover:text-background"
                  >
                    {Icon && <Icon aria-hidden className="size-3.5" />}
                    {skill}
                  </span>
                );
              })}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
