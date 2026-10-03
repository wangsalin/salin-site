import { journeyStages } from "@/data/journey";
import { SectionHeading } from "@/components/ui/section-heading";
import { CheckCircle2, Sparkles, MapPin, Calendar } from "lucide-react";
import { cn } from "@/lib/cn";

export function JourneySection() {
  const currentStage = journeyStages.find((s) => s.isCurrent) ?? journeyStages[journeyStages.length - 1];
  const pastStages = journeyStages.filter((s) => !s.isCurrent);

  return (
    <section className="relative py-16 sm:py-24 md:py-28 overflow-hidden">
      {/* 柔光背景 */}
      <div 
        className="pointer-events-none absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 dark:opacity-10"
        style={{ background: "radial-gradient(circle, var(--brand), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeading
          label="经历履历"
          title="我不是从 AI 开始的。"
          description="先在内容传播中理解消费者，再下场实体经营经历血与火，最后才用技术把所有断点串起来。"
          className="mb-12 sm:mb-16"
        />

        {/* Bento Timeline 布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
          {/* Bento Item 1: 当前进行中里程碑 (Span 7) - 大号主打展示卡 */}
          <div className="lg:col-span-7 relative rounded-3xl p-7 sm:p-10 border border-[var(--brand)]/40 bg-[var(--surface-elevated)]/90 backdrop-blur-2xl shadow-2xl shadow-emerald-950/15 ring-1 ring-[var(--brand)]/20 flex flex-col justify-between group overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-mono font-black text-[var(--brand)] tracking-tight">
                    {currentStage.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    NOW · 正在进行中
                  </span>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  PHASE 03
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black mb-2 text-[var(--text-primary)] tracking-tight">
                {currentStage.title}
              </h3>
              <p className="text-sm font-bold text-[var(--brand)] mb-5">
                {currentStage.subtitle}
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] font-normal mb-8">
                {currentStage.description}
              </p>

              {/* 核心成就列表 */}
              <div className="p-5 sm:p-6 rounded-2xl border border-[var(--border-glass)] bg-[var(--surface)] mb-6 space-y-3 shadow-xs">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2">
                  <Sparkles size={14} className="text-[var(--brand)]" />
                  <span>核心攻坚沉淀与交付指标</span>
                </p>
                {currentStage.achievements.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-primary)]">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                    <span className="leading-relaxed font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border-glass)]">
              {currentStage.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-3 py-1 rounded-full border border-[var(--brand)]/20 bg-[var(--brand)]/10 text-[var(--brand)] font-medium shadow-2xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bento Item 2 & 3: 过往实体与内容积累阶段 (Span 5) - 双层垂直 Bento */}
          <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-7">
            {pastStages.map((stage, idx) => (
              <div
                key={stage.period}
                className="flex-1 relative rounded-3xl p-6 sm:p-8 border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-lg hover:shadow-xl hover:border-[var(--brand)]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-base sm:text-lg font-mono font-bold text-[var(--text-secondary)] tracking-tight">
                      {stage.period}
                    </span>
                    <span className="text-xs font-mono text-[var(--text-muted)]">
                      PHASE 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-1 text-[var(--text-primary)] group-hover:text-[var(--brand)] transition-colors tracking-tight">
                    {stage.title}
                  </h3>
                  <p className="text-xs font-semibold text-[var(--brand)] mb-3">
                    {stage.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)] font-normal line-clamp-3 mb-5">
                    {stage.description}
                  </p>

                  <div className="space-y-2 mb-5">
                    {stage.achievements.slice(0, 2).map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                        <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-500/70" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border-glass)]">
                  {stage.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-[var(--border-glass)] bg-[var(--surface)] text-[var(--text-muted)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
