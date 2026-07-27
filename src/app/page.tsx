import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { HeroSection } from "@/components/home/hero-section";
import { CredibilityStrip } from "@/components/home/credibility-strip";
import { NowSection } from "@/components/home/now-section";
import { JourneySection } from "@/components/home/journey-section";
import { EvidenceSection } from "@/components/home/evidence-section";
import { FlagshipFoodops } from "@/components/home/flagship-foodops";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { WorkingMethod } from "@/components/home/working-method";
import { CooperationSection } from "@/components/home/cooperation-section";
import { LatestNotes } from "@/components/home/latest-notes";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FaqSection } from "@/components/home/faq-section";
import { ContactCta } from "@/components/home/contact-cta";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
};

export default function HomePage() {
  return (
    <>
      {/* 01 Hero 首屏 */}
      <HeroSection />

      {/* 02 可信数字 */}
      <CredibilityStrip />

      {/* 03 NOW：当前重点推进的事情 */}
      <NowSection />

      {/* 04 狗哥的真实经历 */}
      <JourneySection />

      {/* 05 真实实践证据 */}
      <EvidenceSection />

      {/* 06 FoodOps 旗舰大屏案例 */}
      <FlagshipFoodops />

      {/* 07 其他代表项目 */}
      <FeaturedProjects />

      {/* 08 工作方式 */}
      <WorkingMethod />

      {/* 09 合作方式与双向选择 */}
      <CooperationSection />

      {/* 10 实践记录 (真实文章) */}
      <LatestNotes />

      {/* 11 合作反馈 */}
      <TestimonialsSection />

      {/* 12 常见问题 */}
      <FaqSection />

      {/* 13 联系预约 CTA */}
      <ContactCta />
    </>
  );
}
