import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { GitHubStats } from "@/components/GitHubStats";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";
import { DevSetup } from "@/components/DevSetup";
import { Education } from "@/components/Education";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";
import { LogoEntrance } from "@/components/LogoEntrance";
import { useDevMode } from "@/hooks/useDevMode";
import { ScrollToTop } from "@/components/ScrollToTop";

const Index = () => {
  const isDevMode = useDevMode();

  return (
    <div className="min-h-screen">
      <LogoEntrance />
      <Header />
      <main id="main-content">
        <Hero />
        <Skills />
        <Projects />
        {/* Normal Mode Only Sections */}
        {!isDevMode && (
          <>
            <Education />
          </>
        )}
        {/* Dev Mode Only Sections */}
        {isDevMode && (
          <>
            <GitHubStats />
            <InteractiveTerminal />
            <DevSetup />
            <Achievements />
          </>
        )}
        <Contact />
      </main>
      <ScrollToTop />
    </div>
  );
};

export default Index;
