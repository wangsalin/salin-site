import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { journeyStages, aboutSkills, aboutPrinciples, toolBoxItems } from "@/data/journey";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ContactCta } from "@/components/home/contact-cta";
import { CheckCircle2, Wrench, Sparkles, ArrowRight, ShieldCheck, UserCheck, Terminal, Award } from "lucide-react";
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
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-20 md:py-28 overflow-hidden">
        {/* Background ambient glows */}
        <div 
          className="pointer-events-none absolute -top-40 right-10 w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 dark:opacity-15"
          style={{ background: "radial-gradient(circle, var(--brand), transparent 70%)" }}
          aria-hidden="true"
        />

        {/* 开头 Bento 个人档案总览 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 mb-24 items-stretch">
          {/* 左侧个人叙事主卡 (Span 8) */}
          <div className="lg:col-span-8 relative rounded-3xl p-8 sm:p-12 border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-2xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase mb-6 bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] animate-pulse" />
                ABOUT SALIN · 个人历程
              </div>
              
              <h1
                className="text-3xl sm:text-5xl md:text-6xl font-black leading-[1.12] tracking-tight mb-8 text-[var(--text-primary)]"
                style={{ letterSpacing: "-0.03em" }}
              >
                我叫 Salin，
                <br />
                一个反复进入
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand)] via-emerald-400 to-[var(--accent)]">
                  真实生意现场
                </span>
                的创业者。
              </h1>
              
              <div className="space-y-5 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)] font-normal">
                <p>
                  大学学的是计算机应用，毕业后没有直接去大厂做一名单纯的程序员。2014 年开始，我扎入本地生活和美食内容行业，那段时间让我深度接触了临沂及周边城市的各类餐饮老板、门店营销与消费场景——累计服务过 <strong className="text-[var(--text-primary)] font-bold">2000 多家餐饮商家</strong>。
                </p>
                <p>
                  2021 年，我做了一个重要的决定：从幕后的服务商转变为亲自下场的餐饮创业者。亲自负责产品研发、选址施工、供应链采购、外卖平台运营及每日现金流结算。这段经营实体店的经历让我真正理解了什么叫“一线痛苦”：<strong className="text-[var(--text-primary)] font-bold">老板不是不需要系统，而是每天被无数杂务缠身，根本没有精力去学习复杂的系统。</strong>
                </p>
                <p>
                  随着大模型时代的到来，我发现生成式 AI 具备重构线下商业流程的巨大潜力。现在，我将十余年积累的商业逻辑、内容功底与技术能力结合，专注于打造能够直接帮商家省时、省钱、减少决策疲劳的 AI 工具与工作流。
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-10 pt-6 border-t border-[var(--border-glass)]">
              <Button href="/projects" variant="primary" size="lg">
                <span>查看实测项目</span>
                <ArrowRight size={16} />
              </Button>
              <Button href="/contact" variant="glass" size="lg">
                联系交流合作
              </Button>
            </div>
          </div>

          {/* 右侧速览指标 Bento 卡 (Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex-1 relative rounded-3xl p-7 border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-lg flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-3">
                  CORE IDENTITY · 核心标签
                </span>
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--border-glass)]">
                    <span className="text-[11px] font-mono text-[var(--brand)] font-bold block">10+ 年</span>
                    <span className="text-sm font-bold text-[var(--text-primary)]">实体经营与商业操盘</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--border-glass)]">
                    <span className="text-[11px] font-mono text-[var(--brand)] font-bold block">2,000+ 家</span>
                    <span className="text-sm font-bold text-[var(--text-primary)]">深度服务餐饮零售商家</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--border-glass)]">
                    <span className="text-[11px] font-mono text-[var(--brand)] font-bold block">Full-Stack + AI</span>
                    <span className="text-sm font-bold text-[var(--text-primary)]">全栈自研独立开发者</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-[var(--border-glass)]">
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  做事原则：从真实问题出发，以商业结果为导向。AI 是工具，解决问题才是目的。
                </p>
              </div>
            </div>

            {/* 状态徽章小卡 */}
            <div className="p-6 rounded-3xl border border-[var(--border-glass)] bg-gradient-to-br from-[var(--surface-elevated)] to-[var(--surface)] backdrop-blur-xl shadow-md space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-[var(--text-muted)] uppercase">当前驻场交付状态</span>
              </div>
              <p className="text-sm font-bold text-[var(--brand)]">
                {siteConfig.nowStatus}
              </p>
              <p className="text-[11px] text-[var(--text-secondary)]">
                常驻临沂 · 支持全国出差驻场落地
              </p>
            </div>
          </div>
        </div>

        {/* 经历时间线 Bento (3 阶段错落卡) */}
        <div className="relative mb-28">
          <SectionHeading
            label="履历与里程碑"
            title="三个阶段，一条主线。"
            description="从流量内容到实体经营，再到技术研发，每一个阶段都在为今天解决商业问题积蓄力量。"
            className="mb-12"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
            {journeyStages.map((stage) => (
              <div
                key={stage.period}
                className={cn(
                  "relative rounded-3xl p-7 sm:p-9 border transition-all duration-300 flex flex-col justify-between overflow-hidden",
                  stage.isCurrent
                    ? "lg:col-span-12 border-[var(--brand)]/50 bg-[var(--surface-elevated)]/90 backdrop-blur-2xl shadow-xl ring-1 ring-[var(--brand)]/30"
                    : "lg:col-span-6 border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-lg hover:shadow-xl hover:border-[var(--brand)]/30"
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className={cn("text-xl font-mono font-black", stage.isCurrent ? "text-[var(--brand)]" : "text-[var(--text-secondary)]")}>
                      {stage.period}
                    </span>
                    {stage.isCurrent && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded-full bg-[var(--brand)]/15 text-[var(--brand)] border border-[var(--brand)]/30 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] animate-pulse" />
                        NOW · 进行中
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold mb-1 text-[var(--text-primary)] tracking-tight">
                    {stage.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold mb-4 text-[var(--brand)]">
                    {stage.subtitle}
                  </p>
                  <p className="text-sm leading-relaxed mb-6 text-[var(--text-secondary)] font-normal">
                    {stage.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {stage.achievements.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-primary)]">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border-glass)]">
                  {stage.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-3 py-1 rounded-full border border-[var(--border-glass)] bg-[var(--surface)] text-[var(--text-secondary)] shadow-2xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 每日使用的技术与工具箱 (Bento Grid) */}
        <div className="relative mb-28">
          <SectionHeading
            label="技术与工具"
            title="日常使用的工具箱"
            description="全栈开发与 AI 工作流落地依赖的稳定技术堆栈。"
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {toolBoxItems.map((box) => (
              <div
                key={box.category}
                className="relative rounded-3xl p-7 border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-lg hover:border-[var(--brand)]/30 hover:shadow-xl transition-all duration-300 group"
              >
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider mb-5 flex items-center gap-2 text-[var(--brand)]">
                  <div className="w-8 h-8 rounded-xl bg-[var(--brand)]/10 flex items-center justify-center text-[var(--brand)] border border-[var(--brand)]/20">
                    <Wrench size={15} />
                  </div>
                  <span>{box.category}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {box.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs font-medium px-3 py-1.5 rounded-xl border border-[var(--border-glass)] bg-[var(--surface)] text-[var(--text-primary)] shadow-2xs group-hover:border-[var(--brand)]/20 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 核心原则与信条 Bento 对决 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 mb-28">
          {/* 能力组合 (Span 6) */}
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              label="核心能力"
              title="我能带来什么价值"
            />
            <div className="space-y-3.5">
              {aboutSkills.map((skill, i) => (
                <div
                  key={skill}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl hover:bg-[var(--surface-elevated)] transition-all duration-200"
                >
                  <span
                    className="text-xs font-mono font-black w-8 h-8 rounded-xl bg-[var(--brand)]/10 text-[var(--brand)] flex items-center justify-center shrink-0 border border-[var(--brand)]/20"
                    aria-hidden="true"
                  >
                    0{i + 1}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 个人原则 (Span 6) */}
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              label="做事原则"
              title="我的四条坚守原则"
            />
            <div className="space-y-4">
              {aboutPrinciples.map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl hover:border-[var(--accent)]/40 hover:bg-[var(--surface-elevated)] transition-all duration-200"
                >
                  <h4 className="font-bold text-base mb-1.5 text-[var(--text-primary)] flex items-center gap-2">
                    <ShieldCheck size={16} className="text-[var(--accent)] shrink-0" />
                    <span>{item.title}</span>
                  </h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ContactCta />
    </>
  );
}
