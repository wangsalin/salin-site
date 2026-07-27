import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { NoteMeta } from "@/types/note";

const NOTES_DIR = path.join(process.cwd(), "src/content/notes");

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 300; // 中文阅读速度
  const charCount = content.replace(/\s/g, "").length;
  const minutes = Math.ceil(charCount / wordsPerMinute);
  return `约 ${minutes} 分钟`;
}

export function getAllNoteSlugs(): string[] {
  if (!fs.existsSync(NOTES_DIR)) return [];
  return fs
    .readdirSync(NOTES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getNoteBySlug(slug: string): {
  meta: NoteMeta;
  content: string;
} | null {
  const filePath = path.join(NOTES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const meta: NoteMeta = {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    category: data.category ?? "",
    publishedAt: data.publishedAt ?? "",
    readingTime: data.readingTime ?? calculateReadingTime(content),
    featured: data.featured ?? false,
    cover: data.cover,
  };

  return { meta, content };
}

export function getAllNotes(): NoteMeta[] {
  const slugs = getAllNoteSlugs();
  return slugs
    .map((slug) => {
      const note = getNoteBySlug(slug);
      return note?.meta ?? null;
    })
    .filter((n): n is NoteMeta => n !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getFeaturedNotes(): NoteMeta[] {
  return getAllNotes().filter((n) => n.featured);
}

export function getNotesByCategory(category: string): NoteMeta[] {
  if (category === "all") return getAllNotes();
  return getAllNotes().filter((n) => n.category === category);
}

export const noteCategories = [
  { value: "all", label: "全部" },
  { value: "AI 与商业", label: "AI 与商业" },
  { value: "餐饮经营", label: "餐饮经营" },
  { value: "产品与创业", label: "产品与创业" },
  { value: "内容与创意", label: "内容与创意" },
  { value: "工具与工作流", label: "工具与工作流" },
  { value: "项目复盘", label: "项目复盘" },
];
