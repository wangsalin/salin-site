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
    <section className="py-12 sm:py-20 md:py-28 border-t border-[var(--border)] relative overflow-hidden bg-[var(--surface-muted)]/30">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid lg:grid-cols-[320px_1fr] gap-8 lg:gap-14 items-start">
          {/* 左侧：NOW 大号标题 */}
          <div className="space-y-4 lg:sticky lg:top-24">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded bg-[var(--brand)] text-[var(--brand-foreground)]">
                SECTION 02
              </span>
              <div className="inline-flex items-center gap-1 text-[11px] font-mono font-extrabold uppercase text-[var(--brand)]">
                <Sparkles size={12} />
                NOW FOCUS
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
              我现在重点
              <br className="hidden sm:inline" />
              推进的事情
            </h2>
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: "var(--text-secondary)" }}>
              拒绝盲目铺开，专注在有明确真实需求、能验证出结果的 3 个核心方向上持续倾注精力。
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono font-medium" style={{ color: "var(--text-secondary)" }}>
              <Clock size={14} className="text-[var(--brand)]" />
              <span>最后更新：{siteConfig.nowUpdatedAt}</span>
            </div>
          </div>

          {/* 右侧：三条重点推进内容卡片 */}
          <div className="space-y-4">
            {nowItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-[var(--surface)] glass-card-hover transition-all relative group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="p-2 rounded-xl bg-[var(--brand)]/10 text-[var(--brand)] font-bold shrink-0">
                        <Icon size={18} />
                      </span>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--brand)]">
                        {item.tag}
                      </span>
                    </div>

                    <span className="text-xs font-extrabold font-mono px-3 py-1 rounded-full bg-[var(--surface-muted)] border border-[var(--border)] self-start sm:self-auto" style={{ color: "var(--text-primary)" }}>
                      <CheckCircle2 size={12} className="inline mr-1 text-emerald-500" />
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
                    className="inline-flex items-center gap-1 text-xs font-bold text-[var(--brand)] hover:underline"
                  >
                    <span>了解更多详情</span>
                    <ArrowUpRight size={14} />
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
