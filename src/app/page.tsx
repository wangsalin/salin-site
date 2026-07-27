import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { HeroSection } from "@/components/home/hero-section";
import { CredibilityStrip } from "@/components/home/credibility-strip";
import { JourneySection } from "@/components/home/journey-section";
import { FocusSection } from "@/components/home/focus-section";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { FdeRoiCalculator } from "@/components/home/fde-roi-calculator";
import { AiPlaygroundSimulator } from "@/components/home/ai-playground-simulator";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { WorkingMethod } from "@/components/home/working-method";
import { FaqSection } from "@/components/home/faq-section";
import { LatestNotes } from "@/components/home/latest-notes";
import { ContactCta } from "@/components/home/contact-cta";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CredibilityStrip />
      <JourneySection />
      <FocusSection />
      <FeaturedProjects />
      <FdeRoiCalculator />
      <AiPlaygroundSimulator />
      <TestimonialsSection />
      <WorkingMethod />
      <FaqSection />
      <LatestNotes />
      <ContactCta />
    </>
  );
}
