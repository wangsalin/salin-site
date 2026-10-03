"use client";

import Image from "next/image";
import { ArrowRight, GitFork, Sparkles, Layers, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

export function FlagshipFoodops() {
  return (
    <section className="py-16 sm:py-24 md:py-28 border-t border-[var(--border)] relative overflow-hidden bg-[var(--background)]">
      {/* 柔光弥散背景 */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-500/8 blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* 旗舰徽章 */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20">
            SECTION 05
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[var(--surface)] border border-[var(--border)] text-[var(--brand)] shadow-xs flex items-center gap-1.5 uppercase backdrop-blur-md">
            <Sparkles size={13} className="text-emerald-500" />
            FLAGSHIP CASE STUDY · 旗舰案例
          </span>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            持续迭代 / 开源验证
          </span>
        </div>

        {/* 旗舰案例大卡片布局 */}
        <div className="p-6 sm:p-10 md:p-12 rounded-3xl border border-[var(--border)] bg-[var(--surface)] backdrop-blur-2xl shadow-[var(--shadow-card)] space-y-8 relative overflow-hidden">
          {/* 卡片内部环境微光 */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-emerald-500/6 blur-[90px] pointer-events-none" />

          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-14 items-center relative z-10">
            {/* 左侧：40% 介绍文案 */}
            <div className="space-y-6">
              <div>
                <div className="text-xs font-mono font-bold text-[var(--brand)] tracking-widest uppercase mb-1.5">
                  FLAGSHIP PROJECT · 旗舰案例
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em]" style={{ color: "var(--text-primary)" }}>
                  FoodOps
                </h2>
                <p className="text-base sm:text-lg font-bold text-[var(--brand)] mt-1.5">
                  面向餐饮企业的 AI 运营与内容协同系统
                </p>
              </div>

              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                FoodOps 不是从“AI 能做什么”出发，而是从餐饮企业长期存在的经营割裂、营销内容生产低效与跨部门协同成本高出发。尝试将散落在工具与沟通中的工作，逐步收敛为可理解、可执行、可复用的 AI 工作流。
              </p>

              {/* 狗哥的角色履历 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface-muted)]/70 backdrop-blur-md border border-[var(--border)] space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
                  <Layers size={14} className="text-[var(--brand)]" /> 狗哥在 FoodOps 中的角色：
                </p>
                <div className="flex flex-wrap gap-1.5 text-xs font-medium">
                  {["产品定义", "需求分析", "业务流程拆解", "AI 能力规划", "原型设计", "开发推进"].map((role) => (
                    <span key={role} className="px-3 py-1 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] font-semibold shadow-2xs">
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* 核心行动入口 */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Button href="/projects/foodops" size="lg" variant="primary" className="justify-center shadow-lg shadow-[var(--brand)]/25">
                  查看完整案例与复盘
                  <ArrowRight size={18} />
                </Button>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-muted)] transition-all text-sm font-bold flex items-center justify-center gap-2 shadow-xs hover:border-[var(--border-hover)]"
                  style={{ color: "var(--text-primary)" }}
                >
                  <GitFork size={16} /> 访问 GitHub 仓库
                </a>
              </div>
            </div>

            {/* 右侧：60% 真实界面与架构大图 preview (Mac 视窗风格) */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 p-2 sm:p-3 shadow-2xl backdrop-blur-md">
              <div className="px-3.5 py-2.5 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/90 text-xs text-slate-300 font-mono rounded-t-xl">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  <span className="ml-1 text-[11px] opacity-80">FoodOps System Console v1.2</span>
                </div>
                <span className="text-emerald-400 font-bold flex items-center gap-1.5 text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ACTIVE MVP
                </span>
              </div>

              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-slate-900">
                <Image
                  src="/images/projects/foodops-cover.webp"
                  alt="FoodOps 旗舰案例界面截图"
                  fill
                  className="object-cover hover:scale-102 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>

              <div className="p-3 bg-slate-900/90 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400 rounded-b-xl">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Cpu size={13} /> AI Agent Workflow Integrated
                </span>
                <span className="text-[11px]">核心模块: 知识库 / 内容日历 / 任务协同</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
