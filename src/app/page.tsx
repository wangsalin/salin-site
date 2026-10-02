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
import { SectionNavigator } from "@/components/ui/section-navigator";
import { ScrollSection } from "@/components/ui/scroll-section";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
};

export default function HomePage() {
  return (
    <>
      {/* 00 全站分区动态滑动交互导航器 */}
      <SectionNavigator />

      {/* 01 Hero 首屏 (内部自带 id="hero") */}
      <HeroSection />

      {/* 02 可信数字 */}
      <ScrollSection id="credibility">
        <CredibilityStrip />
      </ScrollSection>

      {/* 03 NOW：当前重点推进的事情 */}
      <ScrollSection id="now">
        <NowSection />
      </ScrollSection>

      {/* 04 狗哥的真实经历 */}
      <ScrollSection id="journey">
        <JourneySection />
      </ScrollSection>

      {/* 05 真实实践证据 */}
      <ScrollSection id="evidence">
        <EvidenceSection />
      </ScrollSection>

      {/* 06 FoodOps 旗舰大屏案例 */}
      <ScrollSection id="foodops">
        <FlagshipFoodops />
      </ScrollSection>

      {/* 07 其他代表项目 */}
      <ScrollSection id="projects">
        <FeaturedProjects />
      </ScrollSection>

      {/* 08 工作方式 */}
      <ScrollSection id="method">
        <WorkingMethod />
      </ScrollSection>

      {/* 09 合作方式与双向选择 */}
      <ScrollSection id="cooperation">
        <CooperationSection />
      </ScrollSection>

      {/* 10 实践记录 (真实文章) */}
      <ScrollSection id="notes">
        <LatestNotes />
      </ScrollSection>

      {/* 11 合作反馈 */}
      <TestimonialsSection />

      {/* 12 常见问题 */}
      <ScrollSection id="faq">
        <FaqSection />
      </ScrollSection>

      {/* 13 联系预约 CTA */}
      <ScrollSection id="contact">
        <ContactCta />
      </ScrollSection>
    </>
  );
}
