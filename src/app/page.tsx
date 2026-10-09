import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { ModernFounderHome } from "@/components/home/modern-founder-home";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
};

export default function HomePage() {
  return <ModernFounderHome />;
}
