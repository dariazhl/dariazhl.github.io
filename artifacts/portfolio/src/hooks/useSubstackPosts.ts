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

export function useSubstackPosts(_feedUrl: string) {
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPosts() {
      try {
        const res = await fetch("/posts.json", { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: SubstackPost[] = await res.json();
        setPosts(data);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("Could not load posts from Substack.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
    return () => controller.abort();
  }, []);

  return { posts, loading, error };
}
