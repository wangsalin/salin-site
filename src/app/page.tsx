import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { CosmicJourney } from "@/components/cosmic/cosmic-journey";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
};

export default function HomePage() {
  return <CosmicJourney />;
}
