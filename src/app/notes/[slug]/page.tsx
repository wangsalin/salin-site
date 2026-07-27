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
      <article className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-24">
        {/* 返回 */}
        <Link
          href="/notes"
          className="inline-flex items-center gap-2 text-sm mb-10 hover:opacity-70 transition-opacity"
          style={{ color: "var(--text-secondary)" }}
        >
          <ArrowLeft size={15} />
          实践记录
        </Link>

        {/* 文章头部 */}
        <div className="max-w-2xl mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="text-xs px-2 py-0.5 rounded border border-[var(--border)]"
              style={{ color: "var(--text-secondary)" }}
            >
              {meta.category}
            </span>
            <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-secondary)" }}>
              <Clock size={11} />
              {meta.readingTime}
            </span>
            <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
              {meta.publishedAt}
            </span>
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            {meta.title}
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {meta.description}
          </p>
        </div>

        {/* 分割线 */}
        <div className="border-t border-[var(--border)] mb-12 max-w-2xl" />

        {/* 文章正文 */}
        <div className="prose-article">
          <MDXRemote source={content} />
        </div>

        {/* 上下篇导航 */}
        <div className="grid md:grid-cols-2 gap-4 mt-16 pt-10 border-t border-[var(--border)] max-w-2xl">
          {prev ? (
            <Link
              href={`/notes/${prev.slug}`}
              className="group flex items-start gap-3 p-4 rounded-xl border border-[var(--border)] hover:border-[var(--brand)] transition-colors"
              style={{ background: "var(--surface)" }}
            >
              <ArrowLeft size={15} className="mt-0.5 shrink-0" style={{ color: "var(--text-secondary)" }} />
              <div>
                <p className="text-xs mb-0.5" style={{ color: "var(--text-secondary)" }}>上一篇</p>
                <p className="text-sm font-semibold group-hover:text-[var(--brand)] transition-colors line-clamp-2" style={{ color: "var(--text-primary)" }}>
                  {prev.title}
                </p>
              </div>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              href={`/notes/${next.slug}`}
              className="group flex items-start justify-end gap-3 p-4 rounded-xl border border-[var(--border)] hover:border-[var(--brand)] transition-colors text-right"
              style={{ background: "var(--surface)" }}
            >
              <div>
                <p className="text-xs mb-0.5" style={{ color: "var(--text-secondary)" }}>下一篇</p>
                <p className="text-sm font-semibold group-hover:text-[var(--brand)] transition-colors line-clamp-2" style={{ color: "var(--text-primary)" }}>
                  {next.title}
                </p>
              </div>
              <ArrowRight size={15} className="mt-0.5 shrink-0" style={{ color: "var(--text-secondary)" }} />
            </Link>
          ) : <div />}
        </div>
      </article>

      <ContactCta />
    </>
  );
}
