"use client";

import { CheckCircle2, XCircle, ArrowRight, Sparkles, Handshake, Star } from "lucide-react";
import { cooperationItems, unsuitableItems } from "@/data/cooperation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function CooperationSection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-28 overflow-hidden">
      {/* 柔光弥散背景 */}
      <div 
        className="pointer-events-none absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 dark:opacity-10"
        style={{ background: "radial-gradient(circle, var(--brand), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        {/* 标题 */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase mb-4 bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20 shadow-xs">
            <Handshake size={14} />
            <span>SECTION 08 · COOPERATION MODES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-[var(--text-primary)]">
            不是所有问题都需要 AI，
            <br />
            但有些断点值得一起拆。
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] font-normal">
            不先承诺建设庞大的“企业 AI 大脑”，也不套用空洞概念。基于真实业务痛点与可量化验证结果，提供三种务实的推进方式。
          </p>
        </div>

        {/* 3 大合作方向 Bento 网格 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 mb-14 items-stretch">
          {cooperationItems.map((item, idx) => {
            const isFeatured = idx === 1; // 突出展示 FDE 驻场
            return (
              <div
                key={item.id}
                className={cn(
                  "relative rounded-3xl p-7 sm:p-9 border backdrop-blur-xl flex flex-col justify-between space-y-6 transition-all duration-300 group overflow-hidden",
                  isFeatured
                    ? "border-[var(--brand)]/50 bg-[var(--surface-elevated)]/90 shadow-2xl shadow-emerald-950/15 ring-1 ring-[var(--brand)]/30 lg:-translate-y-2"
                    : "border-[var(--border-glass)] bg-[var(--surface-glass)] shadow-lg hover:shadow-2xl hover:border-[var(--brand)]/40 hover:-translate-y-1"
                )}
              >
                {isFeatured && (
                  <div className="absolute top-0 right-0 px-4 py-1 rounded-bl-2xl bg-gradient-to-r from-[var(--brand)] to-[var(--accent)] text-white text-[10px] font-mono font-black tracking-wider uppercase shadow-xs flex items-center gap-1">
                    <Star size={10} fill="currentColor" />
                    RECOMMENDED · 核心交付
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20 shadow-2xs">
                      {item.tag}
                    </span>
                    <Sparkles size={16} className="text-emerald-500" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                    {item.title}
                  </h3>

                  <div className="space-y-1 p-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--border-glass)]">
                    <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">适合场景与团队：</p>
                    <p className="text-xs leading-relaxed font-medium text-[var(--text-primary)]">
                      {item.suitableFor}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono">
                      可以一起完成并交付：
                    </p>
                    <ul className="space-y-2">
                      {item.deliverables.map((d) => (
                        <li key={d} className="text-xs flex items-start gap-2.5 text-[var(--text-secondary)]">
                          <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-relaxed font-medium">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-5 border-t border-[var(--border-glass)] space-y-3">
                  <p className="text-[11px] leading-relaxed text-[var(--text-muted)] font-mono">
                    💡 启动方式：{item.startMethod}
                  </p>
                  <Button
                    href="/contact"
                    variant={isFeatured ? "primary" : "glass"}
                    size="md"
                    className="w-full justify-center shadow-md"
                  >
                    <span>聊聊你的具体问题</span>
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 不适合的情况双向选择警示 Bento Card */}
        <div className="relative rounded-3xl p-7 sm:p-9 border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-lg space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-xl bg-rose-500/10 text-rose-500 font-bold flex items-center justify-center text-xs shrink-0 border border-rose-500/20">
              ✕
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                暂不适合的合作类型 (双向筛选，节约彼此时间)
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                提前说清楚不接什么，比盲目承诺更有价值。
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {unsuitableItems.map((u) => (
              <div key={u.title} className="p-4 rounded-2xl border border-[var(--border-glass)] bg-[var(--surface)] space-y-1.5 shadow-2xs hover:border-rose-500/30 transition-colors">
                <div className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <XCircle size={13} className="shrink-0" />
                  <span>{u.title}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[var(--text-secondary)]">
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
