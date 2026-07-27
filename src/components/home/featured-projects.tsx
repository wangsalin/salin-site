import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Layers } from "lucide-react";
import { getFeaturedProjects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const statusColors: Record<string, string> = {
  "持续迭代": "bg-[var(--brand)] text-[var(--brand-foreground)] font-bold",
  "开发中": "bg-blue-500/10 text-blue-600 border border-blue-500/20 font-bold",
  "内部验证": "bg-amber-500/10 text-amber-600 border border-amber-500/20 font-bold",
  "概念验证": "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-bold",
  "已开源": "bg-purple-500/10 text-purple-600 border border-purple-500/20 font-bold",
};

export function FeaturedProjects() {
  const projects = getFeaturedProjects();

  return (
    <section className="py-24 md:py-32 bg-grid-pattern">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            label="真实项目矩阵"
            title="不是 PPT 概念，是正在运行的生产力项目。"
          />
          <Button href="/projects" variant="outline" size="sm" className="hover:scale-105 transition-transform">
            查看全部项目矩阵
            <ArrowRight size={14} />
          </Button>
        </div>

        {/* 项目双列/单列响应式重构 */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block p-6 sm:p-7 rounded-3xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--brand)] transition-all duration-300 glass-card-hover flex flex-col justify-between"
            >
              <div>
                {/* 顶部：项目 3D Logo Icon + 状态标签 + 年份 */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3.5">
                    {/* 专属 3D Logo Icon */}
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border border-[var(--border)] bg-slate-900 shrink-0 shadow-md group-hover:scale-105 transition-transform">
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
                        className="text-xl sm:text-2xl font-extrabold group-hover:text-[var(--brand)] transition-colors"
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
                      "text-xs px-2.5 py-1 rounded-full shrink-0 font-mono",
                      statusColors[project.status] ?? statusColors["概念验证"]
                    )}
                  >
                    {project.status}
                  </span>
                </div>

                {/* 项目丰富描述 Summary 填补空白 */}
                <p
                  className="text-sm leading-relaxed mb-4 text-pretty"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {project.summary}
                </p>

                {/* 核心解决痛点列表 (填补充实度) */}
                <div className="space-y-1.5 p-3.5 rounded-2xl bg-[var(--background)] border border-[var(--border)] mb-5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 flex items-center gap-1">
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
                      className="text-[11px] px-2.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--background)] font-medium text-[var(--text-secondary)] flex items-center gap-1"
                    >
                      <Layers size={11} className="text-[var(--brand)]" /> {m.title}
                    </span>
                  ))}
                </div>
              </div>

              {/* 底部按钮指示器 */}
              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs font-bold text-[var(--brand)]">
                <span>了解完整 FDE 落地 SOP 与技术架构</span>
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
