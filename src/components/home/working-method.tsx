import { workingMethod } from "@/data/journey";
import { SectionHeading } from "@/components/ui/section-heading";
import { Lightbulb, ArrowRight, CheckCircle2 } from "lucide-react";

export function WorkingMethod() {
  return (
    <section className="relative py-16 sm:py-24 md:py-28 overflow-hidden">
      {/* Background ambient glow */}
      <div 
        className="pointer-events-none absolute -bottom-32 left-1/3 w-[600px] h-[400px] rounded-full blur-[140px] opacity-20 dark:opacity-10"
        style={{ background: "radial-gradient(circle, var(--brand), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeading
          label="工作方法论"
          title="我的工作方式：从真实问题逆向倒推。"
          description="不搞花哨功能，不为了技术而技术。四步法确保每一个产品都直击要害。"
          className="mb-12 sm:mb-16"
        />

        {/* Bento Grid 布局 (2x2 大网格带有序逻辑递进) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 mb-10">
          {workingMethod.map((step, idx) => (
            <div
              key={step.step}
              className="relative p-7 sm:p-9 rounded-3xl border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-lg hover:shadow-2xl hover:border-[var(--brand)]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="text-4xl sm:text-5xl font-mono font-black text-[var(--brand)]/30 group-hover:text-[var(--brand)] transition-colors">
                    {step.step}
                  </span>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20 shadow-2xs">
                    PHASE 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-[var(--text-primary)] tracking-tight">
                  {step.title}
                </h3>

                <p className="text-sm leading-relaxed text-[var(--text-secondary)] font-normal mb-6">
                  {step.description}
                </p>
              </div>

              {/* 实例注解 Bento 子卡 */}
              <div className="p-4 rounded-2xl border border-[var(--border-glass)] bg-[var(--surface)] flex items-start gap-3 shadow-2xs">
                <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Lightbulb size={13} />
                </div>
                <div className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  <span className="font-bold text-[var(--text-primary)] mr-1">实战例证:</span>
                  {step.example}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 底部哲学信条 Bento 横幅 */}
        <div className="relative rounded-3xl p-7 sm:p-9 border border-[var(--border-glass)] bg-gradient-to-r from-[var(--surface-glass)] via-[var(--surface-elevated)] to-[var(--surface-glass)] backdrop-blur-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-12 rounded-full bg-[var(--brand)] shrink-0" />
            <div>
              <p className="text-lg sm:text-xl font-black text-[var(--text-primary)] tracking-tight">
                “AI 不是商业的起点，它只是解决现实问题的一种高效率工具。”
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1 font-mono">
                PRAGMATIC FIRST · 先见人与生意，再写代码
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-4 py-2 rounded-full bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20 shadow-xs shrink-0 self-start sm:self-auto">
            SALIN PHILOSOPHY
          </span>
        </div>
      </div>
    </section>
  );
}
