import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Layers, ArrowUpRight, ExternalLink } from "lucide-react";
import { getFeaturedProjects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const statusColors: Record<string, string> = {
  "持续迭代": "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold",
  "开发中": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-bold",
  "内部验证": "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold",
  "概念验证": "bg-[var(--surface-muted)] text-[var(--text-secondary)] border border-[var(--border-glass)] font-bold",
  "已开源": "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-bold",
};

export function FeaturedProjects() {
  const projects = getFeaturedProjects();
  const heroProject = projects[0]; // 主力精选项目
  const secondaryProjects = projects.slice(1);

  return (
    <section className="relative py-16 sm:py-24 md:py-28 overflow-hidden">
      {/* 柔光弥散背景 */}
      <div 
        className="pointer-events-none absolute -top-40 right-20 w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 dark:opacity-15"
        style={{ background: "radial-gradient(circle, var(--brand), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            label="真实项目矩阵"
            title="不是 PPT 概念，是正在运行的生产力项目。"
            description="每一个项目均配备可跑通的源码、真实场景数据沉淀与 3D 品牌标识。"
          />
          <Button href="/projects" variant="glass" size="md">
            <span>查看完整项目库</span>
            <ArrowRight size={15} />
          </Button>
        </div>

        {/* Bento Grid 布局 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-7">
          {/* 主推 Hero Bento 卡片 (Span 12 或 8) */}
          {heroProject && (
            <div className="md:col-span-12 relative rounded-3xl p-7 sm:p-10 border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-2xl shadow-xl hover:shadow-2xl hover:border-[var(--brand)]/40 transition-all duration-300 group overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-center">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20 shadow-2xs">
                      FLAGSHIP SHOWCASE · 主力项目
                    </span>
                    <span className={cn("text-xs px-3 py-1 rounded-full font-mono", statusColors[heroProject.status] ?? statusColors["概念验证"])}>
                      {heroProject.status}
                    </span>
                    <span className="text-xs font-mono text-[var(--text-muted)]">
                      {heroProject.year}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-primary)] group-hover:text-[var(--brand)] transition-colors tracking-tight">
                    {heroProject.name}
                  </h3>

                  <p className="text-sm font-semibold text-[var(--brand)]">
                    {heroProject.subtitle}
                  </p>

                  <p className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] font-normal max-w-2xl">
                    {heroProject.summary}
                  </p>

                  {/* 核心痛点 */}
                  <div className="grid sm:grid-cols-2 gap-3 pt-2">
                    {heroProject.problem.slice(0, 2).map((p, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--text-primary)] p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border-glass)]">
                        <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{p}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-wrap gap-3">
                    <Link
                      href={`/projects/${heroProject.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[var(--brand)] text-[var(--brand-foreground)] hover:opacity-95 shadow-md shadow-emerald-500/20 transition-all"
                    >
                      <span>深入查看项目详情</span>
                      <ArrowRight size={14} />
                    </Link>
                    {heroProject.externalUrl && (
                      <a
                        href={heroProject.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold border border-[var(--border-glass)] bg-[var(--surface)] text-[var(--text-primary)] hover:border-[var(--brand)]/30 transition-all"
                      >
                        <span>在线访问站点</span>
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>

                {/* 右侧：3D Logo 与大图预览 */}
                <div className="relative w-full aspect-square max-w-[280px] mx-auto rounded-3xl overflow-hidden border border-[var(--border-glass)] bg-slate-950 p-2 shadow-2xl group-hover:scale-105 group-hover:shadow-emerald-500/20 transition-all duration-300">
                  <Image
                    src={heroProject.logo || heroProject.cover}
                    alt={`${heroProject.name} Logo`}
                    fill
                    className="object-cover rounded-2xl"
                    sizes="280px"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 次要项目 Bento 模块 (Span 4 每列一个，共 3 列) */}
          {secondaryProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="md:col-span-4 relative rounded-3xl p-6 sm:p-7 border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-lg hover:shadow-2xl hover:border-[var(--brand)]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* 顶部图标与状态 */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-[var(--border-glass)] bg-slate-950 shrink-0 shadow-md group-hover:scale-105 transition-transform">
                    <Image
                      src={project.logo || project.cover}
                      alt={`${project.name} Logo`}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <span className={cn("text-[11px] px-2.5 py-0.5 rounded-full font-mono font-bold", statusColors[project.status] ?? statusColors["概念验证"])}>
                    {project.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-1.5 text-[var(--text-primary)] group-hover:text-[var(--brand)] transition-colors tracking-tight">
                  {project.name}
                </h3>
                <p className="text-xs font-semibold text-[var(--brand)] mb-3">
                  {project.subtitle}
                </p>
                <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)] font-normal line-clamp-3 mb-5">
                  {project.summary}
                </p>

                {/* 模块标签 */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.modules.slice(0, 2).map((m, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-0.5 rounded-full border border-[var(--border-glass)] bg-[var(--surface)] text-[var(--text-secondary)] font-medium"
                    >
                      {m.title}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-glass)] flex items-center justify-between text-xs font-bold text-[var(--brand)]">
                <span className="text-[11px] text-[var(--text-muted)] font-mono">
                  {project.year}
                </span>
                <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>查看详情</span>
                  <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
