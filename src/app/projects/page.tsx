import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Layers } from "lucide-react";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "项目矩阵",
  description: "Salin 正在开发和迭代的产品与项目，包括 FDE 驻场落地、餐饮 AI 运营工具、商家 SaaS 和个人 CRM 平台。",
  alternates: { canonical: `${siteConfig.url}/projects` },
};

const statusColors: Record<string, string> = {
  "持续迭代": "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold",
  "开发中": "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 font-bold",
  "内部验证": "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-bold",
  "概念验证": "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-bold",
  "已开源": "bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30 font-bold",
};

const categoryLabels: Record<string, string> = {
  "ai-product": "FDE 驻场 AI 落地",
  "restaurant-business": "美业 / 餐饮 SaaS",
  "content-tool": "餐饮 AI 服务",
  "brand-project": "个人 CRM / 关系网络",
};

export default function ProjectsPage() {
  return (
    <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-20 md:py-28 overflow-hidden">
      {/* Background ambient glows */}
      <div 
        className="pointer-events-none absolute -top-40 right-20 w-[500px] h-[500px] rounded-full blur-[140px] opacity-25 dark:opacity-15"
        style={{ background: "radial-gradient(circle, var(--brand), transparent 70%)" }}
        aria-hidden="true"
      />

      {/* 页面标题 */}
      <SectionHeading
        label="真实项目矩阵"
        title="项目不是履历包装，它们是我理解业务与攻坚的方式。"
        description="这里记录正在研发、内部验证与 FDE 驻场交付的产品。每个项目均配备真实 3D Logo 标识、完成度及核心解决攻坚痛点。"
        className="mb-8"
      />

      {/* 元叙事卡片 */}
      <div className="relative mb-14 p-6 sm:p-7 rounded-3xl border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-md">
        <div className="flex items-start gap-4">
          <div className="w-1.5 self-stretch rounded-full bg-gradient-to-b from-[var(--brand)] to-[var(--accent)] shrink-0" />
          <p className="text-sm sm:text-base font-medium leading-relaxed text-[var(--text-primary)]">
            这些项目有一个共同的出发点：我不相信空中楼阁式的“AI + 行业”。我只关心一个真实的业务流程中，哪里在浪费工时、哪里在流失顾客，然后用 FDE 驻场落地和专用 Agent 将断点打通。
          </p>
        </div>
      </div>

      {/* 项目列表 */}
      <div className="space-y-6">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group relative flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8 p-6 sm:p-8 rounded-3xl border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl hover:border-[var(--brand)]/40 hover:bg-[var(--surface-elevated)]/80 hover:shadow-2xl transition-all duration-300"
          >
            {/* 专属 3D Logo Icon */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-[var(--border-glass)] bg-slate-950 shrink-0 shadow-lg group-hover:scale-105 group-hover:shadow-emerald-500/20 transition-all duration-300">
              <Image
                src={project.logo || project.cover}
                alt={`${project.name} Logo`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>

            {/* 主内容 */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                <span className={cn("text-xs px-3 py-1 rounded-full font-mono text-[11px] shadow-2xs", statusColors[project.status] ?? statusColors["概念验证"])}>
                  {project.status}
                </span>
                <span className="text-xs px-3 py-1 rounded-full border border-[var(--border-glass)] bg-[var(--surface)] text-[var(--text-secondary)] font-medium">
                  {categoryLabels[project.category] || project.category}
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  {project.year}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black mb-1.5 text-[var(--text-primary)] group-hover:text-[var(--brand)] transition-colors tracking-tight">
                {project.name}
              </h2>
              <p className="text-xs sm:text-sm font-bold text-[var(--brand)] mb-3">
                {project.subtitle}
              </p>
              <p className="text-xs sm:text-sm leading-relaxed mb-4 text-[var(--text-secondary)] font-normal">
                {project.summary}
              </p>

              {/* 核心解决痛点 */}
              <div className="grid sm:grid-cols-2 gap-2 p-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--border-glass)] mb-4 shadow-2xs">
                {project.problem.slice(0, 2).map((p, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[var(--text-primary)]">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-1 font-medium">{p}</span>
                  </div>
                ))}
              </div>

              {/* 技术栈与功能模块 */}
              <div className="flex flex-wrap gap-2">
                {project.modules.slice(0, 3).map((m, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-3 py-1 rounded-full border border-[var(--border-glass)] bg-[var(--surface)] font-medium text-[var(--text-secondary)] flex items-center gap-1.5 shadow-2xs"
                  >
                    <Layers size={11} className="text-[var(--brand)]" />
                    <span>{m.title}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* 悬停箭头 */}
            <div className="w-10 h-10 rounded-full border border-[var(--border-glass)] bg-[var(--surface)] text-[var(--text-secondary)] group-hover:text-[var(--brand)] group-hover:border-[var(--brand)]/30 group-hover:translate-x-1 flex items-center justify-center shrink-0 transition-all duration-300 hidden md:flex">
              <ArrowRight size={17} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
