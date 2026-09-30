import { AboutPreview } from "@/components/home/about-preview";
import { BuildersSection } from "@/components/home/builders-section";
import { ExperienceSection } from "@/components/home/experience-section";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";

export default function Home() {
  return (
    <>
      <div className="relative">
        <Hero />
        <AboutPreview />
      </div>
      <BuildersSection />
      <ExperienceSection />
      <FinalCta />
    </>
  );
}
