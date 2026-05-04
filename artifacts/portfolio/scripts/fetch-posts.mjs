#!/usr/bin/env node
/**
 * Fetches the latest posts from Substack RSS and writes public/posts.json.
 * Run: node scripts/fetch-posts.mjs
 */

import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const FEED_URL = "https://dariaerynz.substack.com/feed";
const OUT_PATH = resolve(dirname(fileURLToPath(import.meta.url)), "../public/posts.json");

function extractCdata(xml, tag) {
  const re = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([\\s\\S]*?))<\\/${tag}>`, "i");
  const m = xml.match(re);
  if (!m) return "";
  return (m[1] ?? m[2] ?? "").trim();
}

function extractAll(xml, tag) {
  const re = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([\\s\\S]*?))<\\/${tag}>`, "gi");
  const results = [];
  let m;
  while ((m = re.exec(xml)) !== null) {
    results.push((m[1] ?? m[2] ?? "").trim());
  }
  return results;
}

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").replace(/\s+/g, " ").trim();
}

function formatDate(pubDate) {
  const d = new Date(pubDate);
  if (isNaN(d)) return { date: pubDate, dateISO: "" };
  const date = d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const dateISO = d.toISOString().slice(0, 10);
  return { date, dateISO };
}

function estimateReadTime(text) {
  const words = text.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

function getExcerpt(html, maxLen = 160) {
  const text = stripHtml(html);
  return text.length > maxLen ? text.slice(0, maxLen).replace(/\s+\S*$/, "") + "…" : text;
}

async function main() {
  console.log(`Fetching ${FEED_URL} …`);
  let res;
  try {
    res = await fetch(FEED_URL);
  } catch (err) {
    console.warn(`⚠ Network error fetching feed: ${err.message}. Keeping existing posts.json.`);
    return;
  }
  if (!res.ok) {
    console.warn(`⚠ Feed returned HTTP ${res.status}. Keeping existing posts.json.`);
    return;
  }
  const xml = await res.text();

  // Split into <item> blocks
  const itemBlocks = xml.match(/<item>([\s\S]*?)<\/item>/gi) ?? [];
  if (!itemBlocks.length) throw new Error("No <item> elements found in feed.");

  const posts = itemBlocks.map((block) => {
    const title = stripHtml(extractCdata(block, "title"));

    // <link> in RSS is often a bare text node between tags (not CDATA)
    const linkMatch = block.match(/<link>([^<]+)<\/link>/i);
    const link = linkMatch ? linkMatch[1].trim() : "";

    const pubDate = extractCdata(block, "pubDate") || extractCdata(block, "dc:date");
    const { date, dateISO } = formatDate(pubDate);

    const content = extractCdata(block, "content:encoded") || extractCdata(block, "description");
    const description = extractCdata(block, "description");
    const excerptSource = description || content;
    const excerpt = getExcerpt(excerptSource);

    const readTime = estimateReadTime(stripHtml(content || description));

    const categories = extractAll(block, "category");
    const category = categories[0] || "Writing";

    return { title, link, date, dateISO, excerpt, category, readTime };
  });

  writeFileSync(OUT_PATH, JSON.stringify(posts, null, 2) + "\n");
  console.log(`✓ Wrote ${posts.length} posts to ${OUT_PATH}`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
