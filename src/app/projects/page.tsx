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
  "持续迭代": "bg-[var(--brand)] text-[var(--brand-foreground)] font-bold",
  "开发中": "bg-blue-500/10 text-blue-600 border border-blue-500/20 font-bold",
  "内部验证": "bg-amber-500/10 text-amber-600 border border-amber-500/20 font-bold",
  "概念验证": "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-bold",
  "已开源": "bg-purple-500/10 text-purple-600 border border-purple-500/20 font-bold",
};

const categoryLabels: Record<string, string> = {
  "ai-product": "FDE 驻场 AI 落地",
  "restaurant-business": "美业 / 餐饮 SaaS",
  "content-tool": "餐饮 AI 服务",
  "brand-project": "个人 CRM / 关系网络",
};

export default function ProjectsPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24">
      {/* 页面标题 */}
      <SectionHeading
        label="真实项目矩阵"
        title="项目不是履历包装，它们是我理解业务与攻坚的方式。"
        description="这里记录正在研发、内部验证与 FDE 驻场交付的产品。每个项目均配备真实 3D Logo 标识、完成度及核心解决攻坚痛点。"
        className="mb-6"
      />

      {/* 元叙事 */}
      <div
        className="border-l-4 pl-5 py-2 mb-12 bg-[var(--surface-muted)]/50 rounded-r-2xl border-[var(--brand)]"
      >
        <p className="text-sm sm:text-base font-medium leading-relaxed" style={{ color: "var(--text-primary)" }}>
          这些项目有一个共同的出发点：我不相信空中楼阁式的“AI + 行业”。我只关心一个真实的业务流程中，哪里在浪费工时、哪里在流失顾客，然后用 FDE 驻场落地和专用 Agent 将断点打通。
        </p>
      </div>

      {/* 项目列表 */}
      <div className="space-y-6">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group flex flex-col md:flex-row items-start md:items-center gap-6 p-6 sm:p-7 rounded-3xl border border-[var(--border)] hover:border-[var(--brand)] transition-all duration-300 glass-card-hover"
            style={{ background: "var(--surface)" }}
          >
            {/* 专属 3D Logo Icon */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-[var(--border)] bg-slate-900 shrink-0 shadow-md group-hover:scale-105 transition-transform">
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
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={cn("text-xs px-2.5 py-0.5 rounded-full font-mono", statusColors[project.status] ?? statusColors["概念验证"])}>
                  {project.status}
                </span>
                <span
                  className="text-xs px-2.5 py-0.5 rounded-full border border-[var(--border)] font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {categoryLabels[project.category] || project.category}
                </span>
                <span className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
                  {project.year}
                </span>
              </div>

              <h2
                className="text-xl sm:text-2xl font-extrabold mb-1 group-hover:text-[var(--brand)] transition-colors"
                style={{ color: "var(--text-primary)" }}
              >
                {project.name}
              </h2>
              <p
                className="text-xs font-bold text-[var(--brand)] mb-3"
              >
                {project.subtitle}
              </p>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "var(--text-secondary)" }}
              >
                {project.summary}
              </p>

              {/* 核心解决痛点 */}
              <div className="grid sm:grid-cols-2 gap-2 p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] mb-4">
                {project.problem.slice(0, 2).map((p, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-xs text-[var(--text-primary)]">
                    <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{p}</span>
                  </div>
                ))}
              </div>

              {/* 技术栈与功能模块 */}
              <div className="flex flex-wrap gap-1.5">
                {project.modules.slice(0, 3).map((m, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-0.5 rounded-md border border-[var(--border)] bg-[var(--surface-muted)] font-medium text-[var(--text-secondary)] flex items-center gap-1"
                  >
                    <Layers size={11} className="text-[var(--brand)]" /> {m.title}
                  </span>
                ))}
              </div>
            </div>

            {/* 箭头 */}
            <div className="shrink-0 self-center opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all hidden md:block" style={{ color: "var(--brand)" }}>
              <ArrowRight size={22} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
