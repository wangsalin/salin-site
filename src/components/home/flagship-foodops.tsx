"use client";

import Image from "next/image";
import { ArrowRight, GitFork, Sparkles, Layers, Cpu, CheckCircle2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

export function FlagshipFoodops() {
  return (
    <section className="relative py-16 sm:py-24 md:py-28 overflow-hidden">
      {/* 柔光弥散背景 */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/3 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[140px] opacity-25 dark:opacity-15"
        style={{ background: "radial-gradient(circle, var(--brand), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        {/* 旗舰徽章 */}
        <div className="flex flex-wrap items-center gap-2.5 mb-8">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20 shadow-xs flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] animate-pulse" />
            SECTION 05 · FLAGSHIP CASE STUDY
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[var(--surface-glass)] border border-[var(--border-glass)] text-[var(--text-primary)] shadow-2xs backdrop-blur-md">
            开源可实测验证
          </span>
        </div>

        {/* 旗舰案例 Bento Studio 布局 */}
        <div className="relative rounded-3xl sm:rounded-[36px] p-7 sm:p-10 md:p-14 border border-[var(--border-glass)] bg-gradient-to-br from-[var(--surface-elevated)] via-[var(--surface)] to-[var(--surface-muted)] backdrop-blur-2xl shadow-2xl shadow-emerald-950/10 overflow-hidden">
          {/* 卡片内部环境微光 */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />

          <div className="grid lg:grid-cols-[1fr_1.25fr] gap-10 lg:gap-14 items-center relative z-10">
            {/* 左侧：45% 介绍文案与角色芯片 */}
            <div className="space-y-6">
              <div>
                <div className="text-xs font-mono font-bold text-[var(--brand)] tracking-widest uppercase mb-2 flex items-center gap-1.5">
                  <Sparkles size={14} />
                  <span>FLAGSHIP ENTERPRISE AGENT SYSTEM</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[var(--text-primary)]">
                  FoodOps
                </h2>
                <p className="text-base sm:text-lg font-bold text-[var(--brand)] mt-2">
                  面向餐饮连锁企业的 AI 运营与内容协同工作台
                </p>
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] font-normal">
                FoodOps 不是从“AI 能做什么”出发，而是从餐饮企业长期存在的经营割裂、营销内容生产低效与跨部门协同成本高出发。尝试将散落在工具与沟通中的工作，逐步收敛为可理解、可执行、可复用的 AI 工作流。
              </p>

              {/* 角色与负责范围 Bento 嵌套卡 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[var(--surface-glass)] backdrop-blur-md border border-[var(--border-glass)] space-y-3 shadow-xs">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                  <Layers size={14} className="text-[var(--brand)]" />
                  <span>Salin 在 FoodOps 中的核心职责：</span>
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {["产品定义", "需求场景拆解", "AI 工作流规划", "高保真原型设计", "全栈研发推进"].map((role) => (
                    <span key={role} className="px-3 py-1 rounded-xl bg-[var(--surface)] border border-[var(--border-glass)] text-[var(--text-primary)] font-medium shadow-2xs">
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* 核心行动入口 */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button href="/projects/foodops" size="lg" variant="primary" className="shadow-lg shadow-emerald-500/20">
                  <span>查看完整架构复盘</span>
                  <ArrowRight size={16} />
                </Button>
                {siteConfig.github && (
                  <Button
                    href={siteConfig.github}
                    external
                    size="lg"
                    variant="glass"
                    className="gap-2"
                  >
                    <GitFork size={16} />
                    <span>GitHub 源码</span>
                  </Button>
                )}
              </div>
            </div>

            {/* 右侧：55% macOS 风格视窗控制台 */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 p-2 sm:p-3 shadow-2xl backdrop-blur-md">
              <div className="px-4 py-3 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/90 text-xs text-slate-300 font-mono rounded-t-2xl">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  <span className="ml-2 text-[11px] text-slate-400 font-medium">FoodOps Console v1.2</span>
                </div>
                <span className="text-emerald-400 font-mono font-bold flex items-center gap-1.5 text-[11px] bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ACTIVE SYSTEM
                </span>
              </div>

              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-900">
                <Image
                  src="/images/projects/foodops-cover.webp"
                  alt="FoodOps 旗舰案例界面截图"
                  fill
                  className="object-cover hover:scale-102 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>

              <div className="p-3.5 bg-slate-900/90 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400 rounded-b-2xl">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Cpu size={14} />
                  <span>Agent Workflow Orchestrated</span>
                </span>
                <span className="text-[11px] text-slate-400">
                  核心模块: 品牌知识库 / 内容日历 / 跨端协同
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
