"use client";

import { CheckCircle2, XCircle, ArrowRight, Sparkles, Handshake } from "lucide-react";
import { cooperationItems, unsuitableItems } from "@/data/cooperation";
import { Button } from "@/components/ui/button";

export function CooperationSection() {
  return (
    <section className="py-16 sm:py-24 md:py-28 border-t border-[var(--border)] relative overflow-hidden bg-[var(--background)]">
      {/* 柔光弥散背景 */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* 标题 */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20">
              SECTION 08
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--brand)] flex items-center gap-1.5">
              <Handshake size={14} />
              HOW WE CAN WORK TOGETHER · 合作方式与双向选择
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[-0.025em] mb-4" style={{ color: "var(--text-primary)" }}>
            不是所有问题都需要 AI，但有些问题值得一起拆。
          </h2>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            不先承诺建设庞大的“企业 AI 大脑”，也不套用空洞概念。基于真实业务痛点与验证结果，提供三种务实的合作推进方式。
          </p>
        </div>

        {/* 3 大合作方向网格 */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {cooperationItems.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--border-hover)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20">
                    {item.tag}
                  </span>
                  <Sparkles size={16} className="text-emerald-500" />
                </div>

                <h3 className="text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                  {item.title}
                </h3>

                <div className="space-y-1.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">适合团队：</p>
                  <p className="text-xs leading-relaxed font-medium" style={{ color: "var(--text-primary)" }}>
                    {item.suitableFor}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-[var(--border)]">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">可以一起完成：</p>
                  <ul className="space-y-2">
                    {item.deliverables.map((d) => (
                      <li key={d} className="text-xs flex items-start gap-2" style={{ color: "var(--text-secondary)" }}>
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border)] space-y-3">
                <p className="text-[11px] leading-relaxed text-[var(--text-muted)] italic">
                  💡 启动方式：{item.startMethod}
                </p>
                <Button href="/contact" variant="primary" size="sm" className="w-full justify-center">
                  聊聊你的问题 <ArrowRight size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* 不适合的情况双向选择警示 */}
        <div className="p-6 sm:p-8 rounded-3xl border border-[var(--border)] bg-[var(--surface-muted)]/60 backdrop-blur-xl shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-red-500/10 text-red-500 font-bold flex items-center justify-center text-xs shrink-0 border border-red-500/20">
              ✕
            </span>
            <h3 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
              暂不适合的合作类型 (请提前关注)
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {unsuitableItems.map((u) => (
              <div key={u.title} className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-1.5 shadow-2xs">
                <div className="text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-1.5">
                  <XCircle size={13} className="shrink-0" /> {u.title}
                </div>
                <p className="text-[11.5px] leading-relaxed text-[var(--text-secondary)]">
                  {u.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
