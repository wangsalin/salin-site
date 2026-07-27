"use client";

import { CheckCircle2, XCircle, ArrowRight, Sparkles, Handshake } from "lucide-react";
import { cooperationItems, unsuitableItems } from "@/data/cooperation";
import { Button } from "@/components/ui/button";

export function CooperationSection() {
  return (
    <section className="py-12 sm:py-20 md:py-28 border-t border-[var(--border)] relative overflow-hidden bg-[var(--surface-muted)]/40">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        {/* 标题 */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="p-1 rounded-md bg-[var(--brand)] text-[var(--brand-foreground)]">
              <Handshake size={14} />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--brand)]">
              HOW WE CAN WORK TOGETHER
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4" style={{ color: "var(--text-primary)" }}>
            不是所有问题都需要 AI，但有些问题值得一起拆。
          </h2>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            不先承诺建设庞大的“企业 AI 大脑”，也不套用空洞概念。基于真实业务痛点与验证结果，提供三种务实的合作推进方式。
          </p>
        </div>

        {/* 3 大合作方向网格 */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {cooperationItems.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-[var(--surface)] flex flex-col justify-between space-y-6 glass-card-hover"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold px-3 py-1 rounded-full bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20">
                    {item.tag}
                  </span>
                  <Sparkles size={16} className="text-[var(--accent)]" />
                </div>

                <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {item.title}
                </h3>

                <div className="space-y-1.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">适合团队：</p>
                  <p className="text-xs leading-relaxed font-medium" style={{ color: "var(--text-primary)" }}>
                    {item.suitableFor}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[var(--border)]">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">可以一起完成：</p>
                  <ul className="space-y-1.5">
                    {item.deliverables.map((d) => (
                      <li key={d} className="text-xs flex items-start gap-1.5" style={{ color: "var(--text-secondary)" }}>
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border)] space-y-3">
                <p className="text-[11px] leading-relaxed italic" style={{ color: "var(--text-secondary)" }}>
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
        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-[var(--background)] space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-red-500/10 text-red-500 font-bold flex items-center justify-center text-xs shrink-0">
              ✕
            </span>
            <h3 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
              暂不适合的合作类型 (请提前关注)
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {unsuitableItems.map((u) => (
              <div key={u.title} className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-1 opacity-80">
                <div className="text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-1">
                  <XCircle size={13} /> {u.title}
                </div>
                <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
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
