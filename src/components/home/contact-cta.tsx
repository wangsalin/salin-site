import { GitFork, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

export function ContactCta() {
  return (
    <section className="relative py-16 sm:py-24 md:py-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] rounded-full blur-[130px] opacity-30 dark:opacity-20"
        style={{
          background: "radial-gradient(ellipse at center, var(--brand), transparent 70%)"
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="relative overflow-hidden rounded-3xl sm:rounded-[36px] p-8 sm:p-12 md:p-16 border border-[var(--border-glass)] bg-gradient-to-br from-[var(--surface-elevated)] via-[var(--surface)] to-[var(--surface-muted)] backdrop-blur-2xl shadow-2xl shadow-emerald-950/5 dark:shadow-black/50">
          
          {/* Subtle interior decorative glows */}
          <div 
            className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-20 dark:opacity-25"
            style={{ background: "var(--brand)" }}
            aria-hidden="true"
          />
          <div 
            className="pointer-events-none absolute -left-20 -bottom-20 w-80 h-80 rounded-full blur-3xl opacity-20 dark:opacity-20"
            style={{ background: "var(--accent)" }}
            aria-hidden="true"
          />

          {/* Section badge */}
          <div className="relative flex flex-wrap items-center gap-2 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] animate-pulse" />
              SECTION 12
            </span>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              NEXT STEPS · 预约沟通与联系 CTA
            </span>
          </div>

          <div className="relative grid md:grid-cols-[1fr_300px] gap-10 md:gap-14 items-center">
            {/* 左侧主内容 */}
            <div>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.18] tracking-tight mb-6 text-[var(--text-primary)]"
                style={{ letterSpacing: "-0.03em" }}
              >
                有真实问题，
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand)] via-emerald-400 to-[var(--accent)]">
                  我们可以一起拆一拆。
                </span>
              </h2>
              <p
                className="text-base sm:text-lg leading-relaxed mb-8 max-w-lg text-[var(--text-secondary)] font-normal"
              >
                不聊空洞的 AI 概念。适合交流 AI 产品、企业落地、餐饮数字化商业、内容创意与项目共创。
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  href="/contact"
                  size="lg"
                  variant="primary"
                  className="shadow-lg shadow-emerald-600/25 dark:shadow-emerald-500/20"
                >
                  <span>立即联系合作</span>
                  <ArrowUpRight size={17} className="ml-1 -mr-0.5" />
                </Button>
                {siteConfig.github && (
                  <Button
                    href={siteConfig.github}
                    external
                    size="lg"
                    variant="glass"
                    className="gap-2"
                  >
                    <GitFork size={17} />
                    <span>GitHub 开源</span>
                  </Button>
                )}
              </div>
            </div>

            {/* 右侧合作方向卡片 */}
            <div className="p-6 rounded-2xl border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl">
              <p className="text-xs font-mono font-bold tracking-widest uppercase mb-4 text-[var(--text-muted)]">
                COOPERATION · 合作方向
              </p>
              <div className="space-y-2.5">
                {[
                  "AI 产品架构与敏捷共创",
                  "企业内部 AI 知识库与工作流",
                  "餐饮品牌供应链数字化",
                  "本地商业全域获客与内容",
                  "早期创业项目交流与复盘",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)] py-1.5 px-2.5 rounded-xl hover:bg-[var(--surface-elevated)]/60 hover:text-[var(--text-primary)] transition-all duration-200"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0 shadow-xs"
                      style={{ background: "var(--brand)" }}
                      aria-hidden="true"
                    />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
