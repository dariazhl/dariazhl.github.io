import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight, Star, GitFork, Calendar, Code2, Loader2 } from "lucide-react";

const GITHUB_USERNAME = "dariazhl";

// Category definitions
type Category = "Agentic AI" | "Enterprise AI Infrastructure" | "AI Safety & Research";

const CATEGORIES: Category[] = ["Agentic AI", "Enterprise AI Infrastructure", "AI Safety & Research"];

const CATEGORY_META: Record<Category, { index: string; description: string; accent: string }> = {
  "Agentic AI": {
    index: "01",
    description: "Autonomous agents, LLM orchestration pipelines, and multi-step reasoning systems.",
    accent: "#00f5c4",
  },
  "Enterprise AI Infrastructure": {
    index: "02",
    description: "Production-grade ML pipelines, data systems, cloud architecture, and scalable model deployment.",
    accent: "#4f8ef7",
  },
  "AI Safety & Research": {
    index: "03",
    description: "Interpretability, alignment, hallucination detection, fairness auditing, and AI governance toolkits.",
    accent: "#c084fc",
  },
};

// Manual categorisation map — repos not listed are excluded from the portfolio view
const REPO_CATEGORIES: Record<string, Category> = {
  "agent-experiments":                                       "Agentic AI",
  "CV-Scanner-App---Langchain":                             "Agentic AI",
  "policy-risk-analyzer":                                   "Agentic AI",
  "amoc-v4-persona-age-experiments":                        "AI Safety & Research",
  "stratum":                                                "Enterprise AI Infrastructure",
  "azure-ai-102":                                           "Enterprise AI Infrastructure",
  "Sparse-Transformers-Prototype":                          "Enterprise AI Infrastructure",
  "TLCTaxiData":                                            "Enterprise AI Infrastructure",
  "Oxford-Summit-Loan-Application":                         "Enterprise AI Infrastructure",
  "Predict-Bike-Demand-in-Montreal-Using-Neural-Network-using-LSTM": "Enterprise AI Infrastructure",
  "Autonomous-Car-Project-Udacity":                         "Enterprise AI Infrastructure",
  "llm-hallucination-and-reasoning-replications":           "AI Safety & Research",
  "ai-toolkit-demo":                                        "AI Safety & Research",
  "AISafetyToolkit":                                        "AI Safety & Research",
  "SocialGraphs":                                           "AI Safety & Research",
};

// Nicer display names for repos
const REPO_DISPLAY: Record<string, { title: string; description: string }> = {
  "agent-experiments":           { title: "Agent Experiments", description: "Experimental multi-agent architectures and autonomous task execution frameworks." },
  "CV-Scanner-App---Langchain":  { title: "CV Scanner — LangChain", description: "Intelligent CV parsing and candidate analysis pipeline built with LangChain agents." },
  "policy-risk-analyzer":        { title: "Policy Risk Analyzer", description: "Automated policy document risk assessment using LLM-based reasoning chains." },
  "amoc-v4-persona-age-experiments": { title: "AMOC Persona Experiments", description: "Agent-based simulation experiments exploring persona modelling and age-based behaviour patterns." },
  "stratum":                     { title: "Stratum", description: "Infrastructure-as-code configurations for scalable AI workload deployment on cloud environments." },
  "azure-ai-102":                { title: "Azure AI-102 Labs", description: "Production-ready implementations from the Azure AI Engineer certification, covering Cognitive Services and ML pipelines." },
  "Sparse-Transformers-Prototype": { title: "Sparse Transformers Prototype", description: "Prototype implementation of sparse attention mechanisms for efficient large-scale transformer training." },
  "TLCTaxiData":                 { title: "TLC Taxi Data Pipeline", description: "End-to-end ML pipeline for NYC taxi demand forecasting using large-scale mobility datasets." },
  "Oxford-Summit-Loan-Application": { title: "Oxford Summit Loan Model", description: "Credit risk scoring model developed during an Oxford executive programme — data preprocessing to deployment." },
  "Predict-Bike-Demand-in-Montreal-Using-Neural-Network-using-LSTM": { title: "Montreal Bike Demand — LSTM", description: "Deep learning model predicting city-wide bike-sharing demand using LSTM networks on time-series data." },
  "Autonomous-Car-Project-Udacity": { title: "Autonomous Car — Udacity", description: "Self-driving car simulation project implementing behavioural cloning and sensor fusion pipelines." },
  "llm-hallucination-and-reasoning-replications": { title: "LLM Hallucination & Reasoning", description: "Systematic replication of hallucination benchmarks and chain-of-thought reasoning evaluations across frontier LLMs." },
  "ai-toolkit-demo":             { title: "AI Toolkit Demo", description: "Demonstration suite showcasing modular AI governance components for enterprise deployment." },
  "AISafetyToolkit":             { title: "AI Safety Toolkit", description: "Production-ready toolkit covering prompt injection defences, fairness metrics, goal hijacking detection, and data leakage auditing." },
  "SocialGraphs":                { title: "Social Graph Analysis", description: "Network analysis of social structures using graph algorithms and community detection methods." },
};

const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#2b7489",
  Java: "#b07219",
  "Jupyter Notebook": "#DA5B0B",
  HTML: "#e34c26",
  CSS: "#563d7c",
  HCL: "#844FBA",
  "Objective-C": "#438eff",
};

interface Repo {
  id: number;
  name: string;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  fork: boolean;
  archived: boolean;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

function RepoCard({ repo, index, accent }: { repo: Repo; index: number; accent: string }) {
  const display = REPO_DISPLAY[repo.name];
  const title = display?.title ?? repo.name.replace(/-/g, " ");
  const description = display?.description ?? null;
  const langColor = repo.language ? (LANGUAGE_COLORS[repo.language] ?? "#8b949e") : null;

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group relative flex flex-col border border-white/8 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 p-7 overflow-hidden cursor-pointer"
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
      />

      {/* Index number */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
          {String(index + 1).padStart(2, "0")}
        </span>
        <ArrowUpRight
          className="w-4 h-4 text-white/20 group-hover:text-white/70 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0"
        />
      </div>

      {/* Title */}
      <h3
        className="text-base font-serif text-white/90 group-hover:text-white leading-snug mb-3 transition-colors"
      >
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-white/40 font-light text-sm leading-relaxed mb-5 flex-1 group-hover:text-white/60 transition-colors">
          {description}
        </p>
      )}

      {/* Footer meta */}
      <div className="flex items-center gap-4 text-white/25 font-mono text-[11px] mt-auto pt-4 border-t border-white/5 group-hover:text-white/40 transition-colors">
        {langColor && (
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: langColor }} />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            {repo.stargazers_count}
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

function CategorySection({ category, repos }: { category: Category; repos: Repo[] }) {
  const meta = CATEGORY_META[category];
  if (repos.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-20"
    >
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-12 mb-8 pb-6 border-b border-white/8">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-white/20 uppercase tracking-widest">{meta.index}</span>
          <h2 className="text-2xl md:text-3xl font-serif text-white">{category}</h2>
        </div>
        <p className="text-white/40 font-light text-sm max-w-xl md:pb-0.5">{meta.description}</p>
        <div className="md:ml-auto flex-shrink-0">
          <span
            className="inline-block w-12 h-[2px]"
            style={{ backgroundColor: meta.accent }}
          />
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {repos.map((repo, i) => (
          <RepoCard key={repo.id} repo={repo} index={i} accent={meta.accent} />
        ))}
      </div>
    </motion.section>
  );
}

const CAT_PARAM_MAP: Record<string, Category> = {
  "agentic-ai": "Agentic AI",
  "enterprise":  "Enterprise AI Infrastructure",
  "ai-safety":   "AI Safety & Research",
};

function getInitialFilter(): "All" | Category {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat");
  return cat && CAT_PARAM_MAP[cat] ? CAT_PARAM_MAP[cat] : "All";
}

export default function ProjectsPage() {
  const [repos, setRepos] = useState<Record<Category, Repo[]>>({
    "Agentic AI": [],
    "Enterprise AI Infrastructure": [],
    "AI Safety & Research": [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<"All" | Category>(getInitialFilter);

  // Sync filter when navbar subtab is clicked while already on /projects
  useEffect(() => {
    const handler = (e: Event) => {
      const cat = (e as CustomEvent<string | null>).detail;
      setActiveFilter(cat && CAT_PARAM_MAP[cat] ? CAT_PARAM_MAP[cat] : "All");
    };
    window.addEventListener("projects:filter", handler);
    return () => window.removeEventListener("projects:filter", handler);
  }, []);

  useEffect(() => {
    document.title = "Projects | Daria Zahaleanu";
    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", "Open-source AI projects by Daria Zahaleanu — Agentic AI, Enterprise Infrastructure, and AI Safety.");
    setMeta("og:title", "Projects | Daria Zahaleanu", true);
    setMeta("og:description", "Agentic AI, Enterprise AI Infrastructure, and AI Safety projects by Daria Zahaleanu.", true);
  }, []);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=50&type=public`);
        if (!res.ok) throw new Error(`${res.status}`);
        const data: Repo[] = await res.json();

        const grouped: Record<Category, Repo[]> = {
          "Agentic AI": [],
          "Enterprise AI Infrastructure": [],
          "AI Safety & Research": [],
        };

        data
          .filter((r) => !r.fork && !r.archived && REPO_CATEGORIES[r.name])
          .forEach((r) => {
            const cat = REPO_CATEGORIES[r.name];
            grouped[cat].push(r);
          });

        setRepos(grouped);
      } catch {
        setError("Could not load repositories. Check back soon.");
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  const visibleCategories = activeFilter === "All"
    ? CATEGORIES
    : CATEGORIES.filter((c) => c === activeFilter);

  const totalCount = Object.values(repos).reduce((s, r) => s + r.length, 0);

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">

        {/* Page header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/">
            <span className="inline-flex items-center gap-2 font-mono text-xs text-white/30 hover:text-primary transition-colors uppercase tracking-widest mb-14 cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-primary" />
                <span className="font-mono text-primary text-xs uppercase tracking-widest">Open Source</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-serif text-white mb-5 leading-none">Projects</h1>
              <p className="text-white/40 font-light text-lg max-w-xl leading-relaxed">
                Production implementations, research toolkits, and AI safety experiments — all open source.
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:text-white transition-colors uppercase tracking-widest"
              >
                <Code2 className="w-4 h-4" />
                github.com/{GITHUB_USERNAME}
                <ArrowUpRight className="w-3 h-3" />
              </a>
              {!loading && (
                <span className="font-mono text-xs text-white/20 uppercase tracking-widest">
                  {totalCount} repositories
                </span>
              )}
            </div>
          </div>

          {/* Category filter pills */}
          {!loading && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-wrap gap-2 mb-16"
            >
              {(["All", ...CATEGORIES] as ("All" | Category)[]).map((f) => {
                const isActive = activeFilter === f;
                const accent = f !== "All" ? CATEGORY_META[f].accent : undefined;
                return (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`relative px-5 py-2 font-mono text-xs uppercase tracking-widest border transition-all duration-200 ${
                      isActive
                        ? "text-background border-transparent"
                        : "border-white/10 text-white/40 hover:border-white/30 hover:text-white/80"
                    }`}
                    style={isActive ? { backgroundColor: accent ?? "var(--primary)", borderColor: accent ?? "var(--primary)" } : {}}
                  >
                    {f}
                  </button>
                );
              })}
            </motion.div>
          )}
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="border border-white/5 bg-white/[0.02] p-7 animate-pulse h-44" />
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-8 h-8 text-white/20 animate-spin" />
            <p className="font-mono text-sm text-white/30">{error}</p>
          </div>
        )}

        {/* Categorised sections */}
        {!loading && !error && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {visibleCategories.map((cat) => (
                <CategorySection key={cat} category={cat} repos={repos[cat]} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Footer link */}
        {!loading && !error && (
          <div className="text-center mt-4">
            <a
              href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs text-white/25 hover:text-primary transition-colors uppercase tracking-widest"
            >
              View all on GitHub
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
