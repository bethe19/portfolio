import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { LogoEntrance } from "@/components/LogoEntrance";

import { ScrollToTop } from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen">
      <LogoEntrance />
      <Header />
      <main id="main-content">
        <Hero />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <ScrollToTop />
    </div>
  );
};

export default Index;
