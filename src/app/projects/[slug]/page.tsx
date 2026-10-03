import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, GitFork, CheckCircle2, Sparkles, Layers, Lightbulb } from "lucide-react";
import { getProjectBySlug, projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { ContactCta } from "@/components/home/contact-cta";
import { cn } from "@/lib/cn";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.name}｜Salin 的项目实践`,
    description: project.summary,
    alternates: { canonical: `${siteConfig.url}/projects/${slug}` },
  };
}

const statusColors: Record<string, string> = {
  "持续迭代": "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30",
  "开发中": "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30",
  "内部验证": "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30",
  "概念验证": "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
  "已开源": "bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30",
};

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <>
      <article className="relative max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-20 md:py-28 overflow-hidden">
        {/* Ambient background glow */}
        <div 
          className="pointer-events-none absolute -top-40 right-20 w-[500px] h-[500px] rounded-full blur-[140px] opacity-25 dark:opacity-15"
          style={{ background: "radial-gradient(circle, var(--brand), transparent 70%)" }}
          aria-hidden="true"
        />

        {/* 返回胶囊按钮 */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-glass)] bg-[var(--surface-glass)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--brand)]/30 backdrop-blur-md mb-10 transition-all duration-200 shadow-2xs group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>全部项目矩阵</span>
        </Link>

        {/* 标题区 */}
        <div className="max-w-3xl mb-10">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className={cn("text-xs font-mono font-bold px-3 py-1 rounded-full border shadow-2xs", statusColors[project.status] ?? statusColors["概念验证"])}>
              {project.status}
            </span>
            <span className="text-xs font-mono text-[var(--text-muted)]">
              {project.year}
            </span>
            {project.lastUpdated && (
              <span className="text-xs font-mono text-[var(--text-muted)]">
                · 更新于 {project.lastUpdated}
              </span>
            )}
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4 text-[var(--text-primary)]"
            style={{ letterSpacing: "-0.03em" }}
          >
            {project.name}
          </h1>
          <p className="text-lg sm:text-xl font-medium leading-relaxed text-[var(--brand)]">
            {project.subtitle}
          </p>
        </div>

        {/* 角色与能力标签 */}
        <div className="flex flex-wrap gap-2 mb-12">
          {project.role.map((r) => (
            <span
              key={r}
              className="text-xs font-medium px-3.5 py-1 rounded-full border border-[var(--border-glass)] bg-[var(--surface-glass)] text-[var(--text-secondary)] backdrop-blur-md shadow-2xs"
            >
              {r}
            </span>
          ))}
        </div>

        {/* 封面图 */}
        <div className="relative w-full aspect-[16/7] rounded-3xl overflow-hidden mb-16 border border-[var(--border-glass)] shadow-2xl shadow-emerald-950/5">
          <Image
            src={project.cover}
            alt={`${project.name} 封面`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>

        {/* 正文网格 */}
        <div className="grid md:grid-cols-[1fr_300px] gap-12 md:gap-16 items-start">
          {/* 主内容 */}
          <div className="space-y-14">
            {/* 项目背景 */}
            <section className="p-6 sm:p-8 rounded-3xl border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-md">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[var(--text-primary)] tracking-tight">
                项目背景
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] font-normal">
                {project.description}
              </p>
            </section>

            {/* 真实问题 */}
            <section className="p-6 sm:p-8 rounded-3xl border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-md">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 text-[var(--text-primary)] tracking-tight">
                真实问题
              </h2>
              <ul className="space-y-4">
                {project.problem.map((p, i) => (
                  <li key={i} className="flex items-start gap-3.5">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20"
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] font-normal">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 分析与判断 */}
            <section className="p-6 sm:p-8 rounded-3xl border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-md">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 text-[var(--text-primary)] tracking-tight flex items-center gap-2">
                <Lightbulb size={22} className="text-[var(--accent)]" />
                <span>分析与判断</span>
              </h2>
              <div className="space-y-4">
                {project.insight.map((insight, i) => (
                  <div
                    key={i}
                    className="border-l-2 border-[var(--brand)] pl-4 py-2 bg-[var(--brand)]/5 rounded-r-2xl"
                  >
                    <p className="text-sm sm:text-base leading-relaxed text-[var(--text-primary)] font-medium">
                      {insight}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 解决方案 */}
            <section className="p-6 sm:p-8 rounded-3xl border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-md">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 text-[var(--text-primary)] tracking-tight">
                解决方案
              </h2>
              <ul className="space-y-3">
                {project.solution.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 核心模块 */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-6 text-[var(--text-primary)] tracking-tight">
                核心模块架构
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.modules.map((mod) => (
                  <div
                    key={mod.title}
                    className="p-5 sm:p-6 rounded-3xl border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl hover:border-[var(--brand)]/30 hover:bg-[var(--surface-elevated)]/80 transition-all duration-200"
                  >
                    <h3 className="font-bold text-base mb-2 text-[var(--text-primary)] flex items-center gap-2">
                      <Layers size={16} className="text-[var(--brand)]" />
                      <span>{mod.title}</span>
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
                      {mod.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 关键反思 */}
            <section className="p-6 sm:p-8 rounded-3xl border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-md">
              <h2 className="text-xl sm:text-2xl font-bold mb-5 text-[var(--text-primary)] tracking-tight">
                关键反思与复盘
              </h2>
              <div className="space-y-3.5">
                {project.learnings.map((l, i) => (
                  <p key={i} className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                    <span className="font-mono font-bold text-[var(--brand)] mr-2">{i + 1}.</span>
                    {l}
                  </p>
                ))}
              </div>
            </section>
          </div>

          {/* 侧边栏 */}
          <aside>
            <div className="p-6 sm:p-7 rounded-3xl border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-2xl shadow-xl sticky top-24 space-y-6">
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider mb-3 text-[var(--text-muted)]">
                  CURRENT PROGRESS · 当前进度
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-primary)] font-medium">
                  {project.progress}
                </p>
              </div>

              {project.technologies && project.technologies.length > 0 && (
                <div className="border-t border-[var(--border-glass)] pt-5">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider mb-3 text-[var(--text-muted)]">
                    TECH STACK · 技术栈
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono px-3 py-1 rounded-full border border-[var(--border-glass)] bg-[var(--surface)] text-[var(--text-secondary)] shadow-2xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-[var(--border-glass)] pt-5 space-y-3">
                {project.externalUrl && (
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full text-xs font-semibold bg-[var(--brand)] text-[var(--brand-foreground)] shadow-md shadow-emerald-500/20 hover:opacity-95 transition-opacity"
                  >
                    <span>在线查看项目</span>
                    <ExternalLink size={13} />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full text-xs font-semibold border border-[var(--border-glass)] bg-[var(--surface)] text-[var(--text-primary)] hover:border-[var(--brand)]/30 transition-colors"
                  >
                    <GitFork size={13} />
                    <span>查看 GitHub 仓库</span>
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>

        {/* 上下篇导航 */}
        <div className="grid md:grid-cols-2 gap-4 mt-20 pt-12 border-t border-[var(--border-glass)]">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group flex items-center gap-3.5 p-5 rounded-2xl border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl hover:border-[var(--brand)]/40 hover:bg-[var(--surface-elevated)]/80 transition-all duration-200"
            >
              <ArrowLeft size={16} className="text-[var(--text-muted)] group-hover:text-[var(--brand)] group-hover:-translate-x-0.5 transition-all" />
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider mb-1 text-[var(--text-muted)]">上一个项目</p>
                <p className="text-sm font-bold group-hover:text-[var(--brand)] transition-colors text-[var(--text-primary)]">
                  {prev.name}
                </p>
              </div>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex items-center justify-end gap-3.5 p-5 rounded-2xl border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl hover:border-[var(--brand)]/40 hover:bg-[var(--surface-elevated)]/80 transition-all duration-200 text-right"
            >
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider mb-1 text-[var(--text-muted)]">下一个项目</p>
                <p className="text-sm font-bold group-hover:text-[var(--brand)] transition-colors text-[var(--text-primary)]">
                  {next.name}
                </p>
              </div>
              <ArrowRight size={16} className="text-[var(--text-muted)] group-hover:text-[var(--brand)] group-hover:translate-x-0.5 transition-all" />
            </Link>
          ) : <div />}
        </div>
      </article>

      <ContactCta />
    </>
  );
}
