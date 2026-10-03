import { credibilityStats } from "@/data/journey";
import { TrendingUp, Users, Award, ShieldCheck, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

const statIcons = [Users, Award, TrendingUp, ShieldCheck];

export function CredibilityStrip() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Ambient background glow */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full blur-[130px] opacity-25 dark:opacity-15"
        style={{ background: "radial-gradient(ellipse at center, var(--brand), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header with Pill */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase mb-3 bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] animate-pulse" />
              SECTION 01 · CREDIBILITY & IMPACT
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
              真实经营沉淀，用数字说话
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal max-w-md">
            不谈虚无概念，每一个数字背后都是亲自踩过的实体店铺坑位、真实资金流水与现场代码交付。
          </p>
        </div>

        {/* Bento Grid 布局 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5">
          {/* Bento Item 1 (Span 4) - 主力数字 1: 商家服务 */}
          <div className="lg:col-span-4 relative rounded-3xl p-6 sm:p-7 border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-lg hover:shadow-2xl hover:border-[var(--brand)]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[var(--brand)]/10 text-[var(--brand)] flex items-center justify-center border border-[var(--brand)]/20">
                  <Users size={19} />
                </div>
                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  真实服务
                </span>
              </div>
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-4xl sm:text-5xl font-mono font-black tracking-tight text-[var(--brand)]">
                  {credibilityStats[0]?.number ?? "2000+"}
                </span>
                <span className="text-lg font-bold text-[var(--text-primary)]">
                  {credibilityStats[0]?.unit ?? "家"}
                </span>
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">
                {credibilityStats[0]?.label ?? "服务餐饮商家"}
              </h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-4 pt-4 border-t border-[var(--border-glass)]">
              {credibilityStats[0]?.sublabel ?? "深度一线运营、菜单产品研发与实战营销"}
            </p>
          </div>

          {/* Bento Item 2 (Span 4) - 主力数字 2: 商业经验 */}
          <div className="lg:col-span-4 relative rounded-3xl p-6 sm:p-7 border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-lg hover:shadow-2xl hover:border-[var(--brand)]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center border border-[var(--accent)]/20">
                  <Award size={19} />
                </div>
                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-lime-500/10 text-lime-600 dark:text-lime-400 border border-lime-500/20">
                  实战跨度
                </span>
              </div>
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-4xl sm:text-5xl font-mono font-black tracking-tight text-[var(--text-primary)]">
                  {credibilityStats[1]?.number ?? "10+"}
                </span>
                <span className="text-lg font-bold text-[var(--text-primary)]">
                  {credibilityStats[1]?.unit ?? "年"}
                </span>
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">
                {credibilityStats[1]?.label ?? "商业与内容经验"}
              </h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-4 pt-4 border-t border-[var(--border-glass)]">
              {credibilityStats[1]?.sublabel ?? "兼具技术开发与真实门店盈亏自负经验"}
            </p>
          </div>

          {/* Bento Item 3 (Span 4) - 主力数字 3 & 4 组合右侧卡片 */}
          <div className="lg:col-span-4 grid grid-rows-2 gap-4">
            {/* 上半部分：核心自研项目 */}
            <div className="relative rounded-2xl p-5 border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-md hover:border-[var(--brand)]/30 hover:bg-[var(--surface-elevated)] transition-all duration-200 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-1 mb-0.5">
                  <span className="text-2xl sm:text-3xl font-mono font-black text-[var(--brand)]">
                    {credibilityStats[2]?.number ?? "4+"}
                  </span>
                  <span className="text-xs font-bold text-[var(--text-primary)]">
                    {credibilityStats[2]?.unit ?? "个"}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                  {credibilityStats[2]?.label ?? "核心自研产品矩阵"}
                </h4>
                <p className="text-[11px] text-[var(--text-muted)]">
                  FoodOps / 饿狸 / 悦颜智店 / 狗哥资源库
                </p>
              </div>
              <Link
                href="/projects"
                className="w-8 h-8 rounded-full border border-[var(--border-glass)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--brand)] hover:border-[var(--brand)]/40 flex items-center justify-center shrink-0 transition-colors"
              >
                <ArrowUpRight size={14} />
              </Link>
            </div>

            {/* 下半部分：全国 FDE 驻场 */}
            <div className="relative rounded-2xl p-5 border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-md hover:border-[var(--brand)]/30 hover:bg-[var(--surface-elevated)] transition-all duration-200 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-1 mb-0.5">
                  <span className="text-2xl sm:text-3xl font-mono font-black text-[var(--text-primary)]">
                    {credibilityStats[3]?.number ?? "全国"}
                  </span>
                  <span className="text-xs font-bold text-[var(--brand)]">
                    {credibilityStats[3]?.unit ?? "出差驻场"}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                  {credibilityStats[3]?.label ?? "FDE 现场实施与落地交付"}
                </h4>
                <p className="text-[11px] text-[var(--text-muted)]">
                  常驻临沂 · 深入企业一线直击断点
                </p>
              </div>
              <Link
                href="/contact"
                className="w-8 h-8 rounded-full border border-[var(--border-glass)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--brand)] hover:border-[var(--brand)]/40 flex items-center justify-center shrink-0 transition-colors"
              >
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
