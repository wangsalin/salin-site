import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, GitFork } from "lucide-react";
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
  "持续迭代": "bg-[var(--accent)] text-[var(--accent-foreground)]",
  "开发中": "bg-blue-100 text-blue-700",
  "内部验证": "bg-amber-100 text-amber-700",
  "概念验证": "bg-[var(--surface-muted)] text-[var(--text-secondary)]",
  "已开源": "bg-green-100 text-green-700",
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
      <article className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-24">
        {/* 返回 */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm mb-10 hover:opacity-70 transition-opacity"
          style={{ color: "var(--text-secondary)" }}
        >
          <ArrowLeft size={15} />
          全部项目
        </Link>

        {/* 标题区 */}
        <div className="max-w-3xl mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={cn("text-sm px-3 py-1 rounded-full font-medium", statusColors[project.status] ?? statusColors["概念验证"])}>
              {project.status}
            </span>
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {project.year}
            </span>
            {project.lastUpdated && (
              <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                · 最后更新 {project.lastUpdated}
              </span>
            )}
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            {project.name}
          </h1>
          <p className="text-xl leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {project.subtitle}
          </p>
        </div>

        {/* 角色标签 */}
        <div className="flex flex-wrap gap-2 mb-12">
          {project.role.map((r) => (
            <span
              key={r}
              className="text-sm px-3 py-1 rounded-lg border border-[var(--border)]"
              style={{ color: "var(--text-secondary)" }}
            >
              {r}
            </span>
          ))}
        </div>

        {/* 封面图 */}
        <div className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden mb-16 border border-[var(--border)]">
          <Image
            src={project.cover}
            alt={`${project.name} 封面`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>

        {/* 正文 */}
        <div className="grid md:grid-cols-[1fr_280px] gap-12 md:gap-16">
          {/* 主内容 */}
          <div className="space-y-14">
            {/* 项目背景 */}
            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                项目背景
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {project.description}
              </p>
            </section>

            {/* 真实问题 */}
            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                真实问题
              </h2>
              <ul className="space-y-3">
                {project.problem.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                      style={{ background: "var(--surface-muted)", color: "var(--text-secondary)" }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 分析与判断 */}
            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                分析与判断
              </h2>
              <div className="space-y-3">
                {project.insight.map((insight, i) => (
                  <div
                    key={i}
                    className="border-l-2 pl-4 py-1"
                    style={{ borderColor: "var(--accent)" }}
                  >
                    <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {insight}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 解决方案 */}
            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                解决方案
              </h2>
              <ul className="space-y-2">
                {project.solution.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span style={{ color: "var(--accent)" }} className="mt-1.5 shrink-0">●</span>
                    <span className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 核心模块 */}
            <section>
              <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
                核心模块
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.modules.map((mod) => (
                  <div
                    key={mod.title}
                    className="p-4 rounded-xl border border-[var(--border)]"
                    style={{ background: "var(--surface)" }}
                  >
                    <h3 className="font-semibold mb-1.5" style={{ color: "var(--text-primary)" }}>
                      {mod.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {mod.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 关键反思 */}
            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                关键反思
              </h2>
              <div className="space-y-3">
                {project.learnings.map((l, i) => (
                  <p key={i} className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {i + 1}. {l}
                  </p>
                ))}
              </div>
            </section>
          </div>

          {/* 侧边栏 */}
          <aside>
            <div
              className="p-5 rounded-2xl border border-[var(--border)] sticky top-24"
              style={{ background: "var(--surface)" }}
            >
              <h3 className="text-sm font-semibold mb-4 tracking-wide" style={{ color: "var(--text-secondary)" }}>
                当前进度
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-primary)" }}>
                {project.progress}
              </p>

              {project.technologies && project.technologies.length > 0 && (
                <>
                  <div className="border-t border-[var(--border)] my-4" />
                  <h3 className="text-sm font-semibold mb-3 tracking-wide" style={{ color: "var(--text-secondary)" }}>
                    技术
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded" style={{ background: "var(--surface-muted)", color: "var(--text-secondary)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </>
              )}

              <div className="mt-6 space-y-2">
                {project.externalUrl && (
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium"
                    style={{ color: "var(--brand)" }}
                  >
                    <ExternalLink size={14} />
                    查看项目
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium"
                    style={{ color: "var(--brand)" }}
                  >
                    <GitFork size={14} />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>

        {/* 上下篇导航 */}
        <div className="grid md:grid-cols-2 gap-4 mt-20 pt-12 border-t border-[var(--border)]">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group flex items-center gap-3 p-4 rounded-xl border border-[var(--border)] hover:border-[var(--brand)] transition-colors"
              style={{ background: "var(--surface)" }}
            >
              <ArrowLeft size={16} style={{ color: "var(--text-secondary)" }} />
              <div>
                <p className="text-xs mb-0.5" style={{ color: "var(--text-secondary)" }}>上一个项目</p>
                <p className="text-sm font-semibold group-hover:text-[var(--brand)] transition-colors" style={{ color: "var(--text-primary)" }}>
                  {prev.name}
                </p>
              </div>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex items-center justify-end gap-3 p-4 rounded-xl border border-[var(--border)] hover:border-[var(--brand)] transition-colors text-right"
              style={{ background: "var(--surface)" }}
            >
              <div>
                <p className="text-xs mb-0.5" style={{ color: "var(--text-secondary)" }}>下一个项目</p>
                <p className="text-sm font-semibold group-hover:text-[var(--brand)] transition-colors" style={{ color: "var(--text-primary)" }}>
                  {next.name}
                </p>
              </div>
              <ArrowRight size={16} style={{ color: "var(--text-secondary)" }} />
            </Link>
          ) : <div />}
        </div>
      </article>

      <ContactCta />
    </>
  );
}
