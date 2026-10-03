"use client";

import Link from "next/link";
import { Clock, ArrowUpRight, Sparkles, CheckCircle2, Code2, Building, Wrench, Radio, Layers, ChevronRight } from "lucide-react";
import { siteConfig } from "@/data/site";

export function NowSection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-28 overflow-hidden">
      {/* Background ambient glow */}
      <div 
        className="pointer-events-none absolute top-1/2 right-10 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 dark:opacity-10"
        style={{ background: "radial-gradient(circle, var(--brand), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20 shadow-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] animate-pulse" />
                SECTION 02 · NOW FOCUS
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-mono text-[var(--text-muted)]">
                <Clock size={12} className="text-[var(--brand)]" />
                最后更新：{siteConfig.nowUpdatedAt}
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight">
              我现在重点推进的的事情
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal max-w-md">
            拒绝盲目铺开，专注在有明确真实需求、能验证出可量化商业结果的 3 个核心方向上持续倾注精力。
          </p>
        </div>

        {/* Bento Grid 布局 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento Item 1: 旗舰 FoodOps (Span 7) - 宽幅主打卡片 */}
          <div className="md:col-span-7 relative rounded-3xl p-7 sm:p-9 border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-xl hover:shadow-2xl hover:border-[var(--brand)]/40 transition-all duration-300 flex flex-col justify-between group overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[var(--brand)]/15 text-[var(--brand)] flex items-center justify-center border border-[var(--brand)]/20">
                    <Code2 size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--brand)] block">
                      FLAGSHIP PROJECT · 旗舰自研
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)] font-mono">
                      开源可实测验证
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-2xs">
                  <CheckCircle2 size={13} />
                  持续迭代 / 真实试用中
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black mb-3 text-[var(--text-primary)] group-hover:text-[var(--brand)] transition-colors tracking-tight">
                FoodOps 餐饮 AI 运营协同
              </h3>

              <p className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] font-normal mb-6">
                围绕餐饮连锁运营、私域内容协同和本地数字化工作流，打造直接帮经营者省工时、出内容的专有 Agent 套件。拒绝玩具式聊天，直击排班、复盘与营销断点。
              </p>

              {/* 核心亮点 Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
                <div className="p-3 rounded-2xl border border-[var(--border-glass)] bg-[var(--surface)] text-xs">
                  <span className="text-[10px] font-mono text-[var(--text-muted)] block">模块一</span>
                  <span className="font-bold text-[var(--text-primary)]">多平台经营协同</span>
                </div>
                <div className="p-3 rounded-2xl border border-[var(--border-glass)] bg-[var(--surface)] text-xs">
                  <span className="text-[10px] font-mono text-[var(--text-muted)] block">模块二</span>
                  <span className="font-bold text-[var(--text-primary)]">AI 内容工坊</span>
                </div>
                <div className="p-3 rounded-2xl border border-[var(--border-glass)] bg-[var(--surface)] text-xs col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-mono text-[var(--text-muted)] block">模块三</span>
                  <span className="font-bold text-[var(--text-primary)]">本地化轻量部署</span>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-[var(--border-glass)] flex items-center justify-between">
              <Link
                href="/projects/foodops"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[var(--brand)] hover:opacity-80 transition-opacity"
              >
                <span>查看 FoodOps 架构与实战大屏</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                Next.js + Fastify + AI Agents
              </span>
            </div>
          </div>

          {/* Bento Item 2: FDE 驻场落地 (Span 5) */}
          <div className="md:col-span-5 relative rounded-3xl p-7 sm:p-9 border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-xl hover:shadow-2xl hover:border-[var(--brand)]/40 transition-all duration-300 flex flex-col justify-between group overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center border border-[var(--accent)]/20">
                    <Building size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] block">
                      FDE DEPLOYMENT · 现场交付
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)] font-mono">
                      深入企业第一现场
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-lime-500/10 text-lime-600 dark:text-lime-400 border border-lime-500/20 shadow-2xs">
                  驻场试点中
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black mb-3 text-[var(--text-primary)] group-hover:text-[var(--brand)] transition-colors tracking-tight">
                临沂本地企业 AI 驻场试点
              </h3>

              <p className="text-sm leading-relaxed text-[var(--text-secondary)] font-normal mb-6">
                从餐饮、商贸和内容场景切入，不先建设庞大虚幻的“全知 AI 架构”，而是优先驻场 1-2 周解决单个能精准计算 ROI 的工时浪费与流程断点。
              </p>

              {/* 交付承诺小卡 */}
              <div className="p-4 rounded-2xl border border-[var(--border-glass)] bg-[var(--surface)] mb-6 space-y-2">
                <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-primary)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)]" />
                  <span>以真实业务数据与员工实际采用度验收</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-primary)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  <span>提供源码、私有化环境与团队 SOP 培训</span>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-[var(--border-glass)]">
              <Link
                href="/contact"
                className="inline-flex items-center justify-between w-full p-3 rounded-2xl bg-[var(--surface)] hover:bg-[var(--surface-elevated)] border border-[var(--border-glass)] text-xs font-bold text-[var(--text-primary)] transition-all group/btn"
              >
                <span>预约 30 分钟现场断点诊断</span>
                <ChevronRight size={15} className="group-hover/btn:translate-x-1 text-[var(--brand)] transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bento Item 3: 转化落地方法论与快速链接 (Span 12 - 全宽补充卡片) */}
          <div className="md:col-span-12 relative rounded-3xl p-6 sm:p-8 border border-[var(--border-glass)] bg-gradient-to-r from-[var(--surface-glass)] via-[var(--surface-elevated)] to-[var(--surface-glass)] backdrop-blur-xl shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-[var(--brand)]/10 text-[var(--brand)] flex items-center justify-center shrink-0 border border-[var(--brand)]/20 shadow-xs">
                <Wrench size={22} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase text-[var(--brand)]">
                    MVP PRAGMATISM · 实战信条
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                  把真实需求转化为可验证产品，不空谈技术参数
                </h4>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal max-w-2xl">
                  从问题识别、产品定义、高保真原型设计，直接推进到最小可行性产品 (MVP) 开发，并在真实业务场景中获取真实用户反馈。
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
              <Link
                href="/projects"
                className="w-full md:w-auto px-5 py-2.5 rounded-full text-xs font-semibold border border-[var(--border-glass)] bg-[var(--surface)] text-[var(--text-primary)] hover:border-[var(--brand)]/40 hover:text-[var(--brand)] transition-all text-center shadow-xs"
              >
                查看全部 4+ 项目矩阵
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
