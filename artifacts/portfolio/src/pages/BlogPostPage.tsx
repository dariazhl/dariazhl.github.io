import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { ArrowLeft, Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import { getPost, posts } from "@/data/posts";

function renderContent(content: string) {
  const blocks = content.trim().split(/\n\n+/);
  return blocks.map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="text-2xl md:text-3xl font-serif text-white mt-12 mb-5 leading-tight"
        >
          {block.replace("## ", "")}
        </h2>
      );
    }
    if (/^\*\*\d+\./.test(block)) {
      const label = block.replace(/\*\*/g, "");
      return (
        <h3 key={i} className="text-lg font-semibold text-white/90 mt-8 mb-3">
          {label}
        </h3>
      );
    }
    if (block.startsWith("- ")) {
      const items = block.split("\n").filter((l) => l.startsWith("- "));
      return (
        <ul key={i} className="space-y-3 my-6 pl-2">
          {items.map((item, j) => (
            <li
              key={j}
              className="flex gap-3 text-muted-foreground font-light leading-relaxed"
            >
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/70 flex-shrink-0" />
              <span
                dangerouslySetInnerHTML={{
                  __html: item
                    .replace("- ", "")
                    .replace(
                      /\*\*(.*?)\*\*/g,
                      '<strong class="text-white/80 font-medium">$1</strong>'
                    ),
                }}
              />
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} className="text-muted-foreground font-light leading-relaxed text-lg mb-0">
        {block}
      </p>
    );
  });
}

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const post = getPost(params.slug);

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} | Daria Zahaleanu`;

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

    setMeta("description", post.excerpt);
    setMeta("og:type", "article", true);
    setMeta("og:title", post.title, true);
    setMeta("og:description", post.excerpt, true);
    setMeta("article:published_time", post.dateISO, true);
    setMeta("article:author", "Daria Zahaleanu", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", post.title);
    setMeta("twitter:description", post.excerpt);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}/blog/${post.slug}`;

    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.dateISO,
      author: {
        "@type": "Person",
        name: "Daria Zahaleanu",
        jobTitle: "AI Architect / Engineer",
        url: window.location.origin,
      },
      publisher: {
        "@type": "Person",
        name: "Daria Zahaleanu",
      },
      keywords: post.category,
    };

    let schemaEl = document.getElementById("blog-post-schema") as HTMLScriptElement | null;
    if (!schemaEl) {
      schemaEl = document.createElement("script");
      schemaEl.id = "blog-post-schema";
      schemaEl.type = "application/ld+json";
      document.head.appendChild(schemaEl);
    }
    schemaEl.textContent = JSON.stringify(schema);

    return () => {
      document.getElementById("blog-post-schema")?.remove();
    };
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground pt-40 pb-24 px-6 md:px-12 flex flex-col items-center justify-center">
        <p className="font-mono text-muted-foreground mb-6">Post not found.</p>
        <Link href="/blog">
          <span className="font-mono text-xs text-primary uppercase tracking-widest hover:underline cursor-pointer">
            Back to Blog
          </span>
        </Link>
      </div>
    );
  }

  const otherPosts = posts.filter((p) => p.slug !== post.slug);

  return (
    <article className="min-h-screen bg-background text-foreground pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/blog">
            <span className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest mb-12 cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              All Posts
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-4 mb-8">
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

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-8">
            {post.title}
          </h1>

          <p className="text-xl text-muted-foreground font-light leading-relaxed border-l-2 border-primary/50 pl-6 mb-16">
            {post.excerpt}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border-t border-border/50 pt-12 space-y-6"
        >
          {renderContent(post.content)}
        </motion.div>

        {otherPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-24 pt-12 border-t border-border/50"
          >
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-8">
              More Writing
            </p>
            <div className="space-y-4">
              {otherPosts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`}>
                  <div className="group flex items-center justify-between p-6 border border-border/50 bg-card/20 hover:bg-card/60 hover:border-primary/30 transition-all duration-300 cursor-pointer">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-xs text-primary uppercase tracking-widest">{p.category}</span>
                      <span className="font-serif text-lg text-white group-hover:text-primary transition-colors">{p.title}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        <div className="mt-16 pt-8 border-t border-border/50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <span className="font-serif text-primary text-sm font-bold">DZ</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Daria Zahaleanu</p>
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">AI Architect / Engineer</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
