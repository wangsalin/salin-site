"use client";

import Image from "next/image";
import { ArrowRight, GitFork, Sparkles, Layers, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

export function FlagshipFoodops() {
  return (
    <section className="py-12 sm:py-20 md:py-28 border-t border-[var(--border)] relative overflow-hidden bg-gradient-to-b from-[var(--surface-muted)]/50 to-[var(--background)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* 旗舰徽章 */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded bg-[var(--brand)] text-[var(--brand-foreground)]">
            SECTION 05
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-extrabold bg-[var(--brand)] text-[var(--brand-foreground)] shadow-md flex items-center gap-1.5 uppercase">
            <Sparkles size={13} />
            FLAGSHIP CASE STUDY · 旗舰案例
          </span>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600">
            持续迭代 / 开源验证
          </span>
        </div>

        {/* 旗舰案例大卡片布局 */}
        <div className="p-6 sm:p-10 rounded-3xl border-2 border-[var(--brand)] bg-[var(--surface)] shadow-2xl space-y-8">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-center">
            {/* 左侧：40% 介绍文案 */}
            <div className="space-y-5">
              <div>
                <div className="text-xs font-mono font-bold text-[var(--brand)] tracking-widest uppercase mb-1">
                  FLAGSHIP PROJECT · 旗舰案例
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
                  FoodOps
                </h2>
                <p className="text-base sm:text-lg font-bold text-[var(--brand)] mt-1">
                  面向餐饮企业的 AI 运营与内容协同系统
                </p>
              </div>

              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                FoodOps 不是从“AI 能做什么”出发，而是从餐饮企业长期存在的经营割裂、营销内容生产低效与跨部门协同成本高出发。尝试将散落在工具与沟通中的工作，逐步收敛为可理解、可执行、可复用的 AI 工作流。
              </p>

              {/* 狗哥的角色履历 */}
              <div className="p-4 rounded-2xl bg-[var(--background)] border border-[var(--border)] space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1">
                  <Layers size={14} className="text-[var(--brand)]" /> 狗哥在 FoodOps 中的角色：
                </p>
                <div className="flex flex-wrap gap-1.5 text-xs font-medium">
                  {["产品定义", "需求分析", "业务流程拆解", "AI 能力规划", "原型设计", "开发推进"].map((role) => (
                    <span key={role} className="px-2.5 py-1 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] font-bold">
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* 核心行动入口 */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Button href="/projects/foodops" size="lg" variant="primary" className="justify-center shadow-lg shadow-[var(--brand)]/20">
                  查看完整案例与复盘
                  <ArrowRight size={18} />
                </Button>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] hover:bg-[var(--surface)] transition-colors text-sm font-bold flex items-center justify-center gap-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  <GitFork size={16} /> 访问 GitHub 仓库
                </a>
              </div>
            </div>

            {/* 右侧：60% 真实界面与架构大图 preview */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-2 shadow-2xl">
              <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="ml-1">FoodOps System Console v1.2</span>
                </div>
                <span className="text-emerald-400 font-bold">● ACTIVE MVP</span>
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

              <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Cpu size={13} /> AI Agent Workflow Integrated
                </span>
                <span>核心模块: 知识库 / 内容日历 / 任务协同</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
