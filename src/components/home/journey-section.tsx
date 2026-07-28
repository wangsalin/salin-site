import { journeyStages } from "@/data/journey";
import { SectionHeading } from "@/components/ui/section-heading";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/cn";

export function JourneySection() {
  return (
    <section className="py-16 sm:py-24 md:py-28 border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded bg-[var(--brand)] text-[var(--brand-foreground)]">
            SECTION 03
          </span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--brand)]">
            CAREER & JOURNEY · 狗哥的真实经历
          </span>
        </div>

        <SectionHeading
          label="经历履历"
          title="我不是从 AI 开始的。"
          description="先在内容传播中理解消费者，再下场实体经营经历血与火，最后才用技术把所有断点串起来。"
          className="mb-12 sm:mb-16"
        />

        <div className="relative">
          {/* 连接线 */}
          <div
            className="hidden md:block absolute left-[140px] top-0 bottom-0 w-px"
            style={{ background: "var(--border)" }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-0">
            {journeyStages.map((stage, i) => (
              <div
                key={stage.period}
                className={cn(
                  "md:grid md:grid-cols-[160px_1fr] gap-8 md:gap-12 pb-12",
                  i < journeyStages.length - 1 && "border-b border-[var(--border)] mb-12"
                )}
              >
                {/* 时间 */}
                <div className="flex md:flex-col items-start gap-3 mb-4 md:mb-0">
                  <div className="relative md:pr-4">
                    {/* 时间线圆点 */}
                    <div
                      className="hidden md:block absolute right-[-6px] top-1.5 w-3 h-3 rounded-full border-2"
                      style={{
                        background: stage.isCurrent ? "var(--accent)" : "var(--background)",
                        borderColor: stage.isCurrent ? "var(--accent)" : "var(--brand)",
                        zIndex: 1,
                      }}
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        "text-base font-bold tracking-wide",
                        stage.isCurrent ? "text-[var(--brand)]" : "text-[var(--text-secondary)]"
                      )}
                    >
                      {stage.period}
                    </span>
                  </div>
                  {stage.isCurrent && (
                    <span
                      className="text-xs px-2.5 py-0.5 rounded-full font-bold"
                      style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
                    >
                      进行中
                    </span>
                  )}
                </div>

                {/* 内容 */}
                <div>
                  <h3
                    className="text-2xl font-bold mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {stage.title}
                  </h3>
                  <p
                    className="text-sm font-semibold mb-4"
                    style={{ color: "var(--brand)" }}
                  >
                    {stage.subtitle}
                  </p>
                  <p
                    className="text-base leading-relaxed mb-5"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {stage.description}
                  </p>

                  {/* 核心成就列表 */}
                  <div className="p-4 rounded-xl border border-[var(--border)] mb-5 space-y-2 bg-[var(--surface)]">
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">核心实践沉淀</p>
                    {stage.achievements.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-primary)" }}>
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {stage.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] font-medium"
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
      </div>
    </section>
  );
}
