import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, ExternalLink } from "lucide-react";
import { useSubstackPosts } from "@/hooks/useSubstackPosts";

const SUBSTACK_FEED = "https://dariaerynz.substack.com/feed";

export default function BlogPage() {
  const { posts, loading, error } = useSubstackPosts(SUBSTACK_FEED);

  useEffect(() => {
    document.title = "Blog | Daria Zahaleanu";

    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("description", "Writing on AI safety, interpretability, and the architecture of responsible machine learning systems — by Daria Zahaleanu, AI Architect / Engineer.");
    setMeta("og:title", "Blog | Daria Zahaleanu", true);
    setMeta("og:description", "Writing on AI safety, interpretability, and the architecture of responsible machine learning systems.", true);
    setMeta("og:type", "website", true);
  }, []);

  useEffect(() => {
    if (posts.length === 0) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Daria Zahaleanu — Writing",
      description: "Writing on AI safety, interpretability, and responsible machine learning architecture.",
      author: {
        "@type": "Person",
        name: "Daria Zahaleanu",
        jobTitle: "AI Architect / Engineer",
      },
      blogPost: posts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        description: p.excerpt,
        datePublished: p.dateISO,
        url: p.link,
      })),
    };

    let schemaEl = document.getElementById("blog-list-schema") as HTMLScriptElement | null;
    if (!schemaEl) {
      schemaEl = document.createElement("script");
      schemaEl.id = "blog-list-schema";
      schemaEl.type = "application/ld+json";
      document.head.appendChild(schemaEl);
    }
    schemaEl.textContent = JSON.stringify(schema);

    return () => {
      document.getElementById("blog-list-schema")?.remove();
    };
  }, [posts]);

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">
            <span className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest mb-12 cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </span>
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-primary" />
            <span className="font-mono text-primary text-xs uppercase tracking-widest">Writing</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-4">Blog</h1>
          <p className="text-muted-foreground font-light text-lg mb-16 max-w-2xl">
            Thoughts on AI safety, interpretability, and the architecture of responsible machine learning systems.
          </p>
        </motion.div>

        {loading && (
          <div className="space-y-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="border border-border/50 bg-card/20 p-8 md:p-10 animate-pulse"
              >
                <div className="flex gap-4 mb-5">
                  <div className="h-5 w-24 bg-muted/30 rounded" />
                  <div className="h-5 w-32 bg-muted/30 rounded" />
                </div>
                <div className="h-8 w-3/4 bg-muted/30 rounded mb-4" />
                <div className="h-4 w-full bg-muted/20 rounded mb-2" />
                <div className="h-4 w-5/6 bg-muted/20 rounded" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="border border-border/50 bg-card/20 p-8 text-center">
            <p className="text-muted-foreground font-mono text-sm mb-4">{error}</p>
            <a
              href="https://dariaerynz.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs text-primary uppercase tracking-widest hover:underline"
            >
              Read on Substack <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <p className="text-muted-foreground font-mono text-sm">No posts found.</p>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="space-y-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.link}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <a href={post.link} target="_blank" rel="noopener noreferrer">
                  <article className="group block border border-border/50 bg-card/20 hover:bg-card/70 hover:border-primary/30 transition-all duration-300 p-8 md:p-10 cursor-pointer">
                    <div className="flex flex-wrap items-center gap-4 mb-5">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-primary uppercase tracking-widest border border-primary/30 px-3 py-1">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-serif text-white mb-4 leading-snug group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground font-light leading-relaxed text-base">
                          {post.excerpt}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                    </div>

                    <div className="mt-6 pt-6 border-t border-border/30">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-primary/70 uppercase tracking-widest group-hover:text-primary transition-colors">
                        Read on Substack <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </article>
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
