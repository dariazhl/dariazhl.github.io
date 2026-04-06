import { useState, useEffect } from "react";

export interface SubstackPost {
  title: string;
  link: string;
  date: string;
  dateISO: string;
  excerpt: string;
  category: string;
  readTime: string;
}

function estimateReadTime(text: string): string {
  const words = text.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function formatDateISO(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0];
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function truncate(text: string, max = 220): string {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(" ", max)) + "…";
}

interface Rss2JsonItem {
  title: string;
  pubDate: string;
  link: string;
  description: string;
  content: string;
  categories: string[];
}

export function useSubstackPosts(feedUrl: string) {
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchFeed() {
      try {
        const apiUrl = `https://rss2json.com/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
        const res = await fetch(apiUrl, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        if (json.status !== "ok") throw new Error("Feed error: " + json.message);

        const parsed: SubstackPost[] = (json.items as Rss2JsonItem[]).map((item) => {
          const content = item.content || item.description || "";
          const excerptText = stripHtml(item.description || content);
          const category = item.categories?.[0] || "Writing";

          return {
            title: item.title,
            link: item.link,
            date: formatDate(item.pubDate),
            dateISO: formatDateISO(item.pubDate),
            excerpt: truncate(excerptText),
            category,
            readTime: estimateReadTime(content),
          };
        });

        setPosts(parsed);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("Could not load posts from Substack.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchFeed();
    return () => controller.abort();
  }, [feedUrl]);

  return { posts, loading, error };
}
