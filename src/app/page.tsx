import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { FreefallJourney } from "@/components/freefall/freefall-journey";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
};

export default function HomePage() {
  return <FreefallJourney />;
}
