import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { journeyStages, aboutSkills, aboutPrinciples, toolBoxItems } from "@/data/journey";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ContactCta } from "@/components/home/contact-cta";
import { CheckCircle2, Wrench } from "lucide-react";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "关于我",
  description:
    "Salin 的完整故事——从本地内容运营，到餐饮经营一线，再到 AI 产品实践。",
  alternates: { canonical: `${siteConfig.url}/about` },
};

export default function AboutPage() {
  return (
    <>
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-24">
        {/* 开头故事 */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "var(--text-secondary)" }}
            >
              ABOUT SALIN
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-8"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            我叫 Salin，是一个反复进入真实生意现场的创业者。
          </h1>
          <div className="space-y-6 text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            <p>
              大学学的是计算机应用，毕业后没有直接去大厂做一名单纯的程序员。2014 年开始，我扎入本地生活和美食内容行业，那段时间让我深度接触了临沂及周边城市的各类餐饮老板、门店营销与消费场景——累计服务过 <strong style={{ color: "var(--text-primary)" }}>2000 多家餐饮商家</strong>。
            </p>
            <p>
              2021 年，我做了一个重要的决定：从幕后的服务商转变为亲自下场的餐饮创业者。亲自负责产品研发、选址施工、供应链采购、外卖平台运营及每日现金流结算。这段经营实体店的经历让我真正理解了什么叫&quot;一线痛苦&quot;：<strong style={{ color: "var(--text-primary)" }}>老板不是不需要系统，而是每天被无数杂务缠身，根本没有精力去学习复杂的系统。</strong>
            </p>
            <p>
              随着大模型时代的到来，我发现生成式 AI 具备重构线下商业流程的巨大潜力。现在，我将十余年积累的商业逻辑、内容功底与技术能力结合，专注于打造能够直接帮商家省时、省钱、减少决策疲劳的 AI 工具与工作流。
            </p>
            <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
              我做事的原则始终如一：从真实问题出发，以商业结果为导向。AI 是工具，解决问题才是目的。
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-10">
            <Button href="/projects" variant="primary" size="md">
              查看实测项目
            </Button>
            <Button href="/contact" variant="outline" size="md">
              联系交流合作
            </Button>
          </div>
        </div>

        {/* 分割线 */}
        <div className="border-t border-[var(--border)] mb-20" />

        {/* 经历时间线与沉淀 */}
        <div className="mb-20">
          <SectionHeading
            label="履历与里程碑"
            title="三个阶段，一条主线。"
            description="从流量内容到实体经营，再到技术研发，每一个阶段都在为今天解决商业问题积蓄力量。"
            className="mb-12"
          />
          <div className="space-y-12">
            {journeyStages.map((stage) => (
              <div
                key={stage.period}
                className="grid md:grid-cols-[180px_1fr] gap-4 md:gap-12 p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
              >
                <div className="flex items-center gap-3 md:flex-col md:items-start">
                  <span
                    className={cn(
                      "text-lg font-extrabold tracking-wide",
                      stage.isCurrent ? "text-[var(--brand)]" : "text-[var(--text-secondary)]"
                    )}
                  >
                    {stage.period}
                  </span>
                  {stage.isCurrent && (
                    <span
                      className="text-xs px-2.5 py-0.5 rounded-full font-bold"
                      style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
                    >
                      NOW
                    </span>
                  )}
                </div>
                <div>
                  <h3
                    className="text-2xl font-bold mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {stage.title}
                  </h3>
                  <p className="text-sm font-semibold mb-3" style={{ color: "var(--brand)" }}>
                    {stage.subtitle}
                  </p>
                  <p
                    className="text-base leading-relaxed mb-4"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {stage.description}
                  </p>
                  <div className="space-y-1.5 mb-4">
                    {stage.achievements.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-primary)" }}>
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[var(--brand)]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {stage.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--background)]"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 分割线 */}
        <div className="border-t border-[var(--border)] mb-20" />

        {/* 每日使用的技术与工具箱 (Toolbox Grid) */}
        <div className="mb-20">
          <SectionHeading
            label="技术与工具"
            title="日常使用的工具箱"
            description="全栈开发与 AI 工作流落地依赖的稳定技术堆栈。"
            className="mb-10"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {toolBoxItems.map((box) => (
              <div
                key={box.category}
                className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
              >
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: "var(--brand)" }}>
                  <Wrench size={15} /> {box.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {box.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs font-semibold px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--background)]"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 分割线 */}
        <div className="border-t border-[var(--border)] mb-20" />

        {/* 核心原则与信条 */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* 能力组合 */}
          <div>
            <SectionHeading
              label="核心能力"
              title="我能带来什么价值"
              className="mb-8"
            />
            <div className="space-y-3">
              {aboutSkills.map((skill, i) => (
                <div
                  key={skill}
                  className="flex items-center gap-4 py-3.5 border-b border-[var(--border)]"
                >
                  <span
                    className="text-xs font-mono font-bold w-6 shrink-0"
                    style={{ color: "var(--brand)" }}
                    aria-hidden="true"
                  >
                    0{i + 1}
                  </span>
                  <span
                    className="text-base font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 个人原则 */}
          <div>
            <SectionHeading
              label="做事原则"
              title="我的四条坚守原则"
              className="mb-8"
            />
            <div className="space-y-4">
              {aboutPrinciples.map((item) => (
                <div
                  key={item.title}
                  className="p-4 rounded-xl border-l-4 border-y border-r border-[var(--border)] bg-[var(--surface)]"
                  style={{ borderColor: "var(--accent)" }}
                >
                  <h4 className="font-bold text-base mb-1" style={{ color: "var(--text-primary)" }}>
                    {item.title}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 当前状态卡片 */}
        <div
          className="rounded-2xl p-8 border border-[var(--border)] bg-[var(--surface)]"
        >
          <div className="flex items-start gap-4">
            <div
              className="w-3 h-3 rounded-full mt-1.5 shrink-0 bg-[var(--accent)] animate-pulse"
              aria-hidden="true"
            />
            <div>
              <p
                className="text-xs font-bold tracking-widest uppercase mb-2"
                style={{ color: "var(--text-secondary)" }}
              >
                CURRENT STATUS · {siteConfig.nowUpdatedAt}
              </p>
              <p className="text-xl font-bold leading-relaxed mb-2" style={{ color: "var(--text-primary)" }}>
                {siteConfig.nowStatus}
              </p>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                欢迎有垂直餐饮场景、商家知识库需求或同频创业者交流合作。
              </p>
            </div>
          </div>
        </div>
      </div>

      <ContactCta />
    </>
  );
}
