import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Layers, Sparkles, ExternalLink, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
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
  const featured = projects[0];
  const gridProjects = projects.slice(1);

  return (
    <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-20 md:py-28 overflow-hidden">
      {/* Background ambient glows */}
      <div 
        className="pointer-events-none absolute -top-40 right-20 w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 dark:opacity-15"
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

      {/* 元叙事 Bento 横幅 */}
      <div className="relative mb-14 p-7 rounded-3xl border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-1.5 self-stretch rounded-full bg-gradient-to-b from-[var(--brand)] to-[var(--accent)] shrink-0" />
          <p className="text-sm sm:text-base font-medium leading-relaxed text-[var(--text-primary)]">
            这些项目有一个共同的出发点：我不相信空中楼阁式的“AI + 行业”。我只关心一个真实的业务流程中，哪里在浪费工时、哪里在流失顾客，然后用 FDE 驻场落地和专用 Agent 将断点打通。
          </p>
        </div>
      </div>

      {/* Bento Gallery 布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 mb-14">
        {/* Bento Hero Item (Span 12) - 大幅旗舰项目 */}
        {featured && (
          <div className="lg:col-span-12 relative rounded-3xl p-8 sm:p-11 border border-[var(--border-glass)] bg-gradient-to-br from-[var(--surface-elevated)] via-[var(--surface)] to-[var(--surface-muted)] backdrop-blur-2xl shadow-xl hover:shadow-2xl hover:border-[var(--brand)]/40 transition-all duration-300 group overflow-hidden">
            <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-center">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20 shadow-2xs">
                    FLAGSHIP PROJECT · 旗舰自研
                  </span>
                  <span className={cn("text-xs px-3 py-1 rounded-full font-mono text-[11px]", statusColors[featured.status] ?? statusColors["概念验证"])}>
                    {featured.status}
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    {categoryLabels[featured.category] || featured.category} · {featured.year}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-primary)] group-hover:text-[var(--brand)] transition-colors tracking-tight">
                  {featured.name}
                </h2>
                <p className="text-sm sm:text-base font-bold text-[var(--brand)]">
                  {featured.subtitle}
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] font-normal max-w-2xl">
                  {featured.summary}
                </p>

                {/* 痛点解法与模块 */}
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  {featured.problem.slice(0, 2).map((p, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-primary)] p-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--border-glass)]">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-2 font-medium">{p}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/projects/${featured.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[var(--brand)] text-[var(--brand-foreground)] hover:opacity-95 shadow-md shadow-emerald-500/20 transition-all"
                  >
                    <span>查看完整架构与复盘</span>
                    <ArrowRight size={15} />
                  </Link>
                  {featured.externalUrl && (
                    <a
                      href={featured.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold border border-[var(--border-glass)] bg-[var(--surface)] text-[var(--text-primary)] hover:border-[var(--brand)]/30 transition-all"
                    >
                      <span>在线直达</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>

              {/* 专属 3D Logo Icon 大视窗 */}
              <div className="relative w-full aspect-square max-w-[280px] mx-auto rounded-3xl overflow-hidden border border-[var(--border-glass)] bg-slate-950 p-2 shadow-2xl group-hover:scale-105 group-hover:shadow-emerald-500/25 transition-all duration-300">
                <Image
                  src={featured.logo || featured.cover}
                  alt={`${featured.name} Logo`}
                  fill
                  className="object-cover rounded-2xl"
                  sizes="280px"
                />
              </div>
            </div>
          </div>
        )}

        {/* 次要项目 2 列错落 Bento 栅格 (Span 6 各占半宽) */}
        {gridProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="lg:col-span-6 relative rounded-3xl p-7 sm:p-9 border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-lg hover:shadow-2xl hover:border-[var(--brand)]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-[var(--border-glass)] bg-slate-950 shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <Image
                    src={project.logo || project.cover}
                    alt={`${project.name} Logo`}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn("text-xs px-2.5 py-0.5 rounded-full font-mono font-bold", statusColors[project.status] ?? statusColors["概念验证"])}>
                    {project.status}
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    {project.year}
                  </span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-black mb-1 text-[var(--text-primary)] group-hover:text-[var(--brand)] transition-colors tracking-tight">
                {project.name}
              </h3>
              <p className="text-xs sm:text-sm font-bold text-[var(--brand)] mb-3">
                {project.subtitle}
              </p>
              <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)] font-normal line-clamp-3 mb-6">
                {project.summary}
              </p>

              {/* 核心解决痛点 */}
              <div className="p-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--border-glass)] mb-5 space-y-1.5 shadow-2xs">
                {project.problem.slice(0, 2).map((p, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[var(--text-primary)]">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-1 font-medium">{p}</span>
                  </div>
                ))}
              </div>

              {/* 模块标签 */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.modules.slice(0, 3).map((m, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-3 py-1 rounded-full border border-[var(--border-glass)] bg-[var(--surface)] text-[var(--text-secondary)] font-medium flex items-center gap-1 shadow-2xs"
                  >
                    <Layers size={11} className="text-[var(--brand)]" />
                    <span>{m.title}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-glass)] flex items-center justify-between text-xs font-bold text-[var(--brand)]">
              <span className="text-[11px] text-[var(--text-muted)] font-mono font-normal">
                {categoryLabels[project.category] || project.category}
              </span>
              <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>查看项目全景</span>
                <ArrowRight size={13} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* 底部定制共创 Bento Banner */}
      <div className="relative rounded-3xl p-8 sm:p-10 border border-[var(--border-glass)] bg-gradient-to-r from-[var(--surface-glass)] via-[var(--surface-elevated)] to-[var(--surface-glass)] backdrop-blur-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase text-[var(--brand)] block mb-1">
            CUSTOM FDE INQUIRY · 按需驻场定制
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
            没有在列表中找到您的行业场景？
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal mt-1 max-w-xl">
            支持针对您的特定业务痛点，提供 1-2 周的驻场现场断点梳理、ROI 测算与专属工作流原型构建。
          </p>
        </div>
        <Button href="/contact" variant="primary" size="lg" className="shrink-0 shadow-md">
          <span>预约 FDE 方案沟通</span>
          <ArrowRight size={15} />
        </Button>
      </div>
    </div>
  );
}
