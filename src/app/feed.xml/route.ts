import { getAllNotes } from "@/lib/content";
import { siteConfig } from "@/data/site";

export async function GET() {
  const notes = getAllNotes();
  const base = siteConfig.url;

  const items = notes
    .map(
      (note) => `
    <item>
      <title><![CDATA[${note.title}]]></title>
      <description><![CDATA[${note.description}]]></description>
      <link>${base}/notes/${note.slug}</link>
      <guid isPermaLink="true">${base}/notes/${note.slug}</guid>
      <pubDate>${new Date(note.publishedAt).toUTCString()}</pubDate>
      <category><![CDATA[${note.category}]]></category>
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${siteConfig.title}]]></title>
    <description><![CDATA[${siteConfig.description}]]></description>
    <link>${base}</link>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
