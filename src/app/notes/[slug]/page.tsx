import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getNoteBySlug, getAllNoteSlugs, getAllNotes } from "@/lib/content";
import { siteConfig } from "@/data/site";
import { ContactCta } from "@/components/home/contact-cta";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllNoteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = getNoteBySlug(slug);
  if (!result) return {};
  return {
    title: `${result.meta.title}｜Salin 的实践记录`,
    description: result.meta.description,
    alternates: { canonical: `${siteConfig.url}/notes/${slug}` },
  };
}

export default async function NoteDetailPage({ params }: Props) {
  const { slug } = await params;
  const result = getNoteBySlug(slug);
  if (!result) notFound();

  const { meta, content } = result;
  const allNotes = getAllNotes();
  const currentIndex = allNotes.findIndex((n) => n.slug === slug);
  const prev = currentIndex < allNotes.length - 1 ? allNotes[currentIndex + 1] : null;
  const next = currentIndex > 0 ? allNotes[currentIndex - 1] : null;

  return (
    <>
      <article className="relative max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-20 md:py-28 overflow-hidden">
        {/* Ambient glow */}
        <div 
          className="pointer-events-none absolute -top-40 right-10 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 dark:opacity-10"
          style={{ background: "radial-gradient(circle, var(--brand), transparent 70%)" }}
          aria-hidden="true"
        />

        {/* 返回胶囊 */}
        <Link
          href="/notes"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-glass)] bg-[var(--surface-glass)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--brand)]/30 backdrop-blur-md mb-10 transition-all duration-200 shadow-2xs group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>返回实践记录</span>
        </Link>

        {/* 文章头部 */}
        <div className="max-w-3xl mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full border border-[var(--brand)]/20 bg-[var(--brand)]/10 text-[var(--brand)]">
              {meta.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-mono">
              <Clock size={12} />
              {meta.readingTime}
            </span>
            <span className="text-xs text-[var(--text-muted)] font-mono">
              {meta.publishedAt}
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.18] tracking-tight mb-6 text-[var(--text-primary)]"
            style={{ letterSpacing: "-0.03em" }}
          >
            {meta.title}
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-[var(--text-secondary)] font-normal">
            {meta.description}
          </p>
        </div>

        {/* 分割线 */}
        <div className="border-t border-[var(--border-glass)] mb-12 max-w-3xl" />

        {/* 文章正文 */}
        <div className="prose-article max-w-3xl">
          <MDXRemote source={content} />
        </div>

        {/* 上下篇导航 */}
        <div className="grid md:grid-cols-2 gap-4 mt-16 pt-10 border-t border-[var(--border-glass)] max-w-3xl">
          {prev ? (
            <Link
              href={`/notes/${prev.slug}`}
              className="group flex items-start gap-3.5 p-5 rounded-2xl border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl hover:border-[var(--brand)]/40 hover:bg-[var(--surface-elevated)]/80 transition-all duration-200"
            >
              <ArrowLeft size={16} className="mt-1 shrink-0 text-[var(--text-muted)] group-hover:text-[var(--brand)] transition-colors" />
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider mb-1 text-[var(--text-muted)]">上一篇</p>
                <p className="text-sm font-bold group-hover:text-[var(--brand)] transition-colors line-clamp-2 text-[var(--text-primary)]">
                  {prev.title}
                </p>
              </div>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              href={`/notes/${next.slug}`}
              className="group flex items-start justify-end gap-3.5 p-5 rounded-2xl border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl hover:border-[var(--brand)]/40 hover:bg-[var(--surface-elevated)]/80 transition-all duration-200 text-right"
            >
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider mb-1 text-[var(--text-muted)]">下一篇</p>
                <p className="text-sm font-bold group-hover:text-[var(--brand)] transition-colors line-clamp-2 text-[var(--text-primary)]">
                  {next.title}
                </p>
              </div>
              <ArrowRight size={16} className="mt-1 shrink-0 text-[var(--text-muted)] group-hover:text-[var(--brand)] transition-colors" />
            </Link>
          ) : <div />}
        </div>
      </article>

      <ContactCta />
    </>
  );
}
