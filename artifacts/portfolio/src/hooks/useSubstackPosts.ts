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

export function useSubstackPosts(feedUrl: string) {
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchFeed() {
      try {
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`;
        const res = await fetch(proxyUrl, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        const text: string = json.contents;
        const xml = new DOMParser().parseFromString(text, "application/xml");

        const parseError = xml.querySelector("parsererror");
        if (parseError) throw new Error("Invalid RSS feed");

        const items = Array.from(xml.querySelectorAll("item"));

        const parsed: SubstackPost[] = items.map((item) => {
          const title = item.querySelector("title")?.textContent?.trim() ?? "Untitled";
          const link = item.querySelector("link")?.textContent?.trim() ?? "";
          const pubDate = item.querySelector("pubDate")?.textContent?.trim() ?? "";
          const description = item.querySelector("description")?.textContent?.trim() ?? "";
          const contentEncoded =
            item.getElementsByTagNameNS("http://purl.org/rss/1.0/modules/content/", "encoded")[0]
              ?.textContent ?? description;
          const category =
            item.querySelector("category")?.textContent?.trim() || "Writing";

          const excerptText = stripHtml(description || contentEncoded);

          return {
            title,
            link,
            date: formatDate(pubDate),
            dateISO: formatDateISO(pubDate),
            excerpt: truncate(excerptText),
            category,
            readTime: estimateReadTime(contentEncoded),
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
