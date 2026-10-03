import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Layers } from "lucide-react";
import { getFeaturedProjects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const statusColors: Record<string, string> = {
  "持续迭代": "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold",
  "开发中": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-bold",
  "内部验证": "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold",
  "概念验证": "bg-[var(--surface-muted)] text-[var(--text-secondary)] border border-[var(--border)] font-bold",
  "已开源": "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-bold",
};

export function FeaturedProjects() {
  const projects = getFeaturedProjects();

  return (
    <section className="py-16 sm:py-24 md:py-28 border-t border-[var(--border)] bg-[var(--surface)] relative overflow-hidden">
      {/* 柔光背景 */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20">
            SECTION 06
          </span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--brand)]">
            PROJECT MATRIX · 代表项目与软件
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            label="真实项目矩阵"
            title="不是 PPT 概念，是正在运行的生产力项目。"
          />
          <Button href="/projects" variant="glass" size="sm">
            查看全部项目矩阵
            <ArrowRight size={14} />
          </Button>
        </div>

        {/* 项目双列/单列响应式重构 */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block p-6 sm:p-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] backdrop-blur-xl hover:border-[var(--border-hover)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 顶部：项目 3D Logo Icon + 状态标签 + 年份 */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3.5">
                    {/* 专属 3D Logo Icon */}
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border border-[var(--border)] bg-slate-900/80 shrink-0 shadow-md group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all">
                      <Image
                        src={project.logo || project.cover}
                        alt={`${project.name} Logo`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <h3
                        className="text-xl sm:text-2xl font-extrabold group-hover:text-[var(--brand)] transition-colors tracking-tight"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {project.name}
                      </h3>
                      <p className="text-xs font-semibold text-[var(--brand)] mt-0.5">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "text-xs px-3 py-1 rounded-full shrink-0 font-mono shadow-2xs",
                      statusColors[project.status] ?? statusColors["概念验证"]
                    )}
                  >
                    {project.status}
                  </span>
                </div>

                {/* 项目描述 Summary */}
                <p
                  className="text-sm leading-relaxed mb-4 text-pretty"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {project.summary}
                </p>

                {/* 核心解决痛点列表 */}
                <div className="space-y-1.5 p-4 rounded-2xl bg-[var(--surface-muted)]/70 backdrop-blur-md border border-[var(--border)] mb-5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 flex items-center gap-1.5">
                    <Sparkles size={12} className="text-[var(--brand)]" /> 核心痛点与攻坚解法:
                  </div>
                  {project.problem.slice(0, 2).map((p, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-primary)" }}>
                      <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{p}</span>
                    </div>
                  ))}
                </div>

                {/* 核心功能模块 Tag Chips */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.modules.slice(0, 3).map((m, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)] font-medium text-[var(--text-secondary)] shadow-2xs flex items-center gap-1"
                    >
                      <Layers size={11} className="text-[var(--brand)]" /> {m.title}
                    </span>
                  ))}
                </div>
              </div>

              {/* 底部按钮指示器 */}
              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs font-bold text-[var(--brand)]">
                <span className="text-[11px] text-[var(--text-muted)] font-normal">
                  {project.externalUrl
                    ? "支持在线直达 (zl.eyu.ink)"
                    : "了解完整落地 SOP 与架构"}
                </span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  查看项目详情 <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
