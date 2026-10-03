"use client";

import Link from "next/link";
import { Clock, ArrowUpRight, Sparkles, CheckCircle2, Code2, Building, Wrench } from "lucide-react";
import { siteConfig } from "@/data/site";

const nowItems = [
  {
    id: "foodops",
    icon: Code2,
    tag: "旗舰开源项目",
    title: "FoodOps 餐饮 AI 运营协同",
    desc: "围绕餐饮连锁运营、内容协同和 AI 工作流，持续完善产品结构与真实场景落地验证。开源代码库并推进真实试用。",
    badge: "持续迭代 / 开源验证",
    href: "/projects/foodops",
  },
  {
    id: "linyi-ai",
    icon: Building,
    tag: "FDE 驻场落地",
    title: "临沂本地企业 AI 驻场试点",
    desc: "从餐饮、商贸和内容场景切入，不先建设庞大虚幻的“企业 AI 大脑”，而是优先解决单个能精准计算 ROI 的工时与流程断点。",
    badge: "驻场验证中",
    href: "/contact",
  },
  {
    id: "ai-products",
    icon: Wrench,
    tag: "MVP 产品实践",
    title: "把真实需求转化为可验证产品",
    desc: "从问题识别、产品定义、高保真原型设计，直接推进到最小可行性产品 (MVP) 开发，并在真实业务场景中获取用户反馈。",
    badge: "快速迭代中",
    href: "/projects",
  },
];

export function NowSection() {
  return (
    <section className="py-16 sm:py-24 md:py-28 border-t border-[var(--border)] relative overflow-hidden bg-[var(--background)]">
      {/* 柔光弥散光晕 */}
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-emerald-500/6 blur-[110px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-[320px_1fr] gap-8 lg:gap-14 items-start">
          {/* 左侧：NOW 大号标题 */}
          <div className="space-y-4 lg:sticky lg:top-24">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20">
                SECTION 02
              </span>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-[var(--brand)]">
                <Sparkles size={13} />
                NOW FOCUS
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] leading-tight" style={{ color: "var(--text-primary)" }}>
              我现在重点
              <br className="hidden sm:inline" />
              推进的事情
            </h2>
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: "var(--text-secondary)" }}>
              拒绝盲目铺开，专注在有明确真实需求、能验证出结果的 3 个核心方向上持续倾注精力。
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono font-medium" style={{ color: "var(--text-muted)" }}>
              <Clock size={14} className="text-[var(--brand)]" />
              <span>最后更新：{siteConfig.nowUpdatedAt}</span>
            </div>
          </div>

          {/* 右侧：三条重点推进内容卡片 */}
          <div className="space-y-4 sm:space-y-5">
            {nowItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="p-6 sm:p-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] backdrop-blur-xl shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--border-hover)] hover:-translate-y-1 transition-all duration-300 relative group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
                    <div className="flex items-center gap-3">
                      <span className="p-2.5 rounded-2xl bg-[var(--surface-muted)] text-[var(--brand)] font-bold shrink-0 border border-[var(--border)] shadow-xs">
                        <Icon size={18} />
                      </span>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--brand)]">
                        {item.tag}
                      </span>
                    </div>

                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--text-primary)] shadow-2xs self-start sm:self-auto flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-emerald-500" />
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold mb-2 flex items-center gap-1.5" style={{ color: "var(--text-primary)" }}>
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                    {item.desc}
                  </p>

                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand)] hover:opacity-80 transition-opacity"
                  >
                    <span>了解更多详情</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
