import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight, Star, GitFork, Calendar, Code2, Loader2 } from "lucide-react";

const GITHUB_USERNAME = "daria0406";

const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#2b7489",
  Java: "#b07219",
  "Jupyter Notebook": "#DA5B0B",
  HTML: "#e34c26",
  CSS: "#563d7c",
  R: "#198CE7",
  Shell: "#89e051",
  Go: "#00ADD8",
  Rust: "#dea584",
  "C++": "#f34b7d",
  C: "#555555",
};

interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  fork: boolean;
  archived: boolean;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
}

function SkeletonCard() {
  return (
    <div className="border border-border/40 bg-card/20 p-8 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="h-6 w-1/2 bg-white/5 rounded" />
        <div className="h-5 w-5 bg-white/5 rounded" />
      </div>
      <div className="h-4 w-full bg-white/5 rounded mb-2" />
      <div className="h-4 w-3/4 bg-white/5 rounded mb-6" />
      <div className="flex gap-4">
        <div className="h-3 w-16 bg-white/5 rounded" />
        <div className="h-3 w-12 bg-white/5 rounded" />
      </div>
    </div>
  );
}

function RepoCard({ repo, index }: { repo: Repo; index: number }) {
  const color = repo.language ? (LANGUAGE_COLORS[repo.language] ?? "#8b949e") : "#8b949e";

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="group flex flex-col border border-border/40 bg-card/20 hover:bg-card/70 hover:border-primary/30 transition-all duration-300 p-8 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h2 className="text-lg font-serif text-white group-hover:text-primary transition-colors leading-snug break-all">
          {repo.name}
        </h2>
        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
      </div>

      {repo.description && (
        <p className="text-muted-foreground font-light text-sm leading-relaxed mb-5 flex-1">
          {repo.description}
        </p>
      )}

      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {repo.topics.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary/80 font-mono text-[10px] uppercase tracking-wider"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-5 text-muted-foreground/70 font-mono text-xs mt-auto pt-4 border-t border-border/30">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            {repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1">
            <GitFork className="w-3 h-3" />
            {repo.forks_count}
          </span>
        )}
        <span className="flex items-center gap-1 ml-auto">
          <Calendar className="w-3 h-3" />
          {formatDate(repo.updated_at)}
        </span>
      </div>
    </motion.a>
  );
}

type FilterLang = "All" | string;

export default function ProjectsPage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterLang>("All");

  useEffect(() => {
    document.title = "Projects | Daria Zahaleanu";

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

    setMeta("description", "Open-source projects and research implementations by Daria Zahaleanu — AI Safety, LLMs, MLOps, and more.");
    setMeta("og:title", "Projects | Daria Zahaleanu", true);
    setMeta("og:description", "Open-source AI safety, LLM, and MLOps projects by Daria Zahaleanu.", true);
  }, []);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=50&type=public`
        );
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        const data: Repo[] = await res.json();
        const filtered = data
          .filter((r) => !r.fork && !r.archived)
          .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
        setRepos(filtered);
      } catch (err) {
        setError("Could not load repositories. Check back soon.");
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  const languages = ["All", ...Array.from(new Set(repos.map((r) => r.language).filter(Boolean) as string[]))];
  const visible = filter === "All" ? repos : repos.filter((r) => r.language === filter);

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
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
            <span className="font-mono text-primary text-xs uppercase tracking-widest">Open Source</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-4">Projects</h1>
          <p className="text-muted-foreground font-light text-lg mb-4 max-w-2xl">
            Production implementations, research toolkits, and AI safety experiments. All work is open source.
          </p>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:text-white transition-colors uppercase tracking-widest mb-12"
          >
            <Code2 className="w-4 h-4" />
            github.com/{GITHUB_USERNAME}
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </motion.div>

        {/* Language filter */}
        {!loading && !error && languages.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setFilter(lang)}
                className={`px-4 py-1.5 font-mono text-xs uppercase tracking-widest border transition-all duration-200 ${
                  filter === lang
                    ? "bg-primary text-background border-primary"
                    : "border-border/50 text-muted-foreground hover:border-primary/50 hover:text-white"
                }`}
              >
                {lang}
              </button>
            ))}
          </motion.div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
            <p className="font-mono text-sm text-muted-foreground">{error}</p>
          </div>
        )}

        {/* Repos grid */}
        {!loading && !error && (
          <>
            {visible.length === 0 ? (
              <p className="font-mono text-sm text-muted-foreground py-16">No repositories match this filter.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visible.map((repo, i) => (
                  <RepoCard key={repo.id} repo={repo} index={i} />
                ))}
              </div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mt-12 text-center"
            >
              <a
                href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
              >
                View all on GitHub
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
