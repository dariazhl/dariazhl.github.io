#!/usr/bin/env node
// Fetches the Substack RSS feed and writes posts.json to the portfolio public folder.
// Run before the build so the static file is included in the output.

import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const FEED_URL = "https://dariaerynz.substack.com/feed";
const OUT_PATH = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../artifacts/portfolio/public/posts.json"
);

function extractTag(xml, tag, ns = "") {
  const open = ns ? `<${ns}:${tag}>` : `<${tag}>`;
  const close = ns ? `</${ns}:${tag}>` : `</${tag}>`;
  const start = xml.indexOf(open);
  if (start === -1) return "";
  const end = xml.indexOf(close, start);
  return xml.slice(start + open.length, end).replace(/<!\[CDATA\[|\]\]>/g, "").trim();
}

function extractAttr(xml, tag, attr) {
  const re = new RegExp(`<${tag}[^>]*\\s${attr}="([^"]*)"`, "i");
  const m = xml.match(re);
  return m ? m[1] : "";
}

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function truncate(text, max = 220) {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(" ", max)) + "…";
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function formatDateISO(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0];
}

function estimateReadTime(text) {
  const words = text.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

async function main() {
  const res = await fetch(FEED_URL, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; RSS reader)",
      "Accept": "application/rss+xml, application/xml, text/xml, */*",
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch feed: HTTP ${res.status}`);
  const xml = await res.text();

  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  const posts = [];
  let match;

  while ((match = itemRe.exec(xml)) !== null) {
    const item = match[1];
    const title = extractTag(item, "title");
    const pubDate = extractTag(item, "pubDate");
    const description = extractTag(item, "description");
    const contentEncoded = extractTag(item, "encoded", "content") || description;
    const category = extractTag(item, "category") || "Writing";

    // <link> in RSS 2.0 is a text node, not an element with children
    const linkMatch = item.match(/<link>(.*?)<\/link>/s) || item.match(/<link\/>(.*?)(?=<)/s);
    const link = linkMatch ? linkMatch[1].trim() : extractAttr(item, "guid", "isPermaLink") !== "false"
      ? extractTag(item, "guid")
      : "";

    const excerptText = stripHtml(description || contentEncoded);

    posts.push({
      title,
      link: link || extractTag(item, "guid"),
      date: formatDate(pubDate),
      dateISO: formatDateISO(pubDate),
      excerpt: truncate(excerptText),
      category,
      readTime: estimateReadTime(contentEncoded),
    });
  }

  writeFileSync(OUT_PATH, JSON.stringify(posts, null, 2));
  console.log(`Wrote ${posts.length} posts to ${OUT_PATH}`);
}

main().catch((err) => {
  console.error("Warning: could not fetch posts, keeping existing posts.json.", err.message);
  process.exit(0);
});
