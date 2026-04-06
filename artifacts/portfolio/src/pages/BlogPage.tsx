import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";

const posts = [
  {
    slug: "minicheck-llm-fact-checking",
    title: "The MiniCheck Method for Efficient and Verifiable LLM Fact-Checking",
    date: "August 14, 2025",
    readTime: "8 min read",
    category: "AI Safety",
    excerpt: "In an era of increasingly complex misinformation, fact-checking a single claim can be a painstaking process. The MiniCheck method automates this human-like workflow using a multi-stage, Chain-of-Thought (CoT) reasoning process powered by large language models.",
    content: `
In an era of increasingly complex and nuanced misinformation, fact-checking a single claim can be a painstaking process. The MiniCheck method is a novel approach that automates this human-like workflow by using a multi-stage, Chain-of-Thought (CoT) reasoning process powered by large language models (LLMs). Rather than simply assigning a label, MiniCheck deconstructs a claim, verifies its components, and then synthesizes a final verdict.

This methodology demonstrates a practical application of LLMs for high-stakes tasks, showing how they can be orchestrated in a pipeline to produce more transparent and verifiable results.

## The Three Stages of MiniCheck

**1. Claim Decomposition**

The process begins by feeding an original claim to a powerful LLM, which acts as a "decomposer." The model's sole task is to break the complex claim into a list of simple, verifiable sub-claims. For example, the claim "A new jobs report shows unemployment is at a 50-year low due to growth in manufacturing" would be broken into two sub-claims:

- "Unemployment has fallen to a 50-year low."
- "The decline is driven by growth in the manufacturing sector."

This step is critical because it isolates individual facts that can be checked independently.

**2. Sub-Claim Verification**

In this stage, a separate model (the "verifier") analyzes each sub-claim against a provided piece of evidence, such as a news article or official report. Using a specific prompt structure, the verifier determines whether the evidence supports, contradicts, or provides insufficient information to verify the sub-claim. Crucially, this stage can be performed in a batch, making it highly efficient.

**3. Verdict Aggregation**

The final verdict is an aggregation of the verifier's results. The logic mirrors the principle of burden of proof: a claim is only fully supported if all its sub-claims are supported by the evidence. If even one is contradicted or unverifiable, the overall claim is flagged accordingly.

## Why This Matters for AI Architecture

From an architectural standpoint, MiniCheck represents a powerful pattern for high-stakes AI pipelines: decompose → verify in parallel → aggregate with logic. This same structure can be applied to content moderation, regulatory compliance checking, and real-time audit trails in production ML systems. The key insight is that chain-of-thought reasoning isn't just about accuracy — it's about auditability.

For teams building responsible AI systems, MiniCheck offers a blueprint for creating pipelines where every decision can be traced, explained, and challenged.
    `
  },
  {
    slug: "nrfe-fake-news-detection",
    title: "The NRFE Method for Fake News Detection",
    date: "August 14, 2025",
    readTime: "12 min read",
    category: "XAI",
    excerpt: "The Negative Reasoning for Fake News Detection (NRFE) method proposes a revolutionary approach: purposefully using LLM hallucinations as a tool to train more robust and accurate fact-checking models.",
    content: `
In the world of AI, "hallucination" is a term for a serious flaw — when a large language model (LLM) generates false or fabricated information with high confidence. But what if this flaw could be turned into a strength? The Negative Reasoning for Fake News Detection (NRFE) method proposes a revolutionary approach: purposefully using LLM hallucinations as a tool to train more robust and accurate fact-checking models.

This method, developed in a research paper on XAI (Explainable AI), operates on a sophisticated principle: if a model can be taught the difference between sound logic and absurd, fabricated logic, it can become an expert at detecting fake news.

## How It Works: A Teacher-Student Paradigm

The NRFE method is built around a two-stage process:

**1. The Reasoning Generator**

The process begins with a capable LLM that acts as an initial data augmenter. For a given news statement, this LLM is prompted to generate two types of explanations:

- **Positive Reasoning (R+):** A plausible, logical reason why the statement could be true.
- **Negative Reasoning (R-):** A fabricated, illogical, or outright false reason that still sounds convincing. This is where the model's "hallucination" is deliberately triggered.

**2. The NRFE Model (The Teacher)**

A custom-built, dual-encoder model is then trained on this augmented dataset. It has two separate encoders — one for the original news statement and one for the generated reasoning. A crucial cross-attention layer forces these two encoders to communicate and learn the semantic relationship between a statement and its reasoning quality.

## Implications for Responsible AI

What makes NRFE architecturally significant is how it reframes a liability (hallucination) as a training signal. From an AI safety perspective, this is a powerful pattern: use adversarial data generation not just for robustness, but as a form of supervised contrastive learning.

For organizations building content moderation or misinformation detection systems, NRFE points toward a new generation of models that don't just classify — they reason, and they can explain that reasoning in human-understandable terms.

The NRFE approach aligns well with emerging AI governance frameworks that require models to provide justifiable, auditable decisions rather than opaque probabilistic outputs. As regulatory pressure around AI transparency increases, methods like NRFE represent the kind of explainable-by-design architecture that forward-looking organizations should be building toward.
    `
  }
];

interface PostCardProps {
  post: typeof posts[0];
  index: number;
}

function PostCard({ post, index }: PostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group border border-border/50 bg-card/30 hover:bg-card/80 transition-all duration-300 p-8 md:p-10"
    >
      <div className="flex items-center gap-4 mb-6">
        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-primary uppercase tracking-widest border border-primary/30 px-3 py-1">
          <Tag className="w-3 h-3" />
          {post.category}
        </span>
        <span className="w-1 h-1 rounded-full bg-border" />
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
          <Calendar className="w-3 h-3" />
          {post.date}
        </span>
        <span className="w-1 h-1 rounded-full bg-border" />
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
          <Clock className="w-3 h-3" />
          {post.readTime}
        </span>
      </div>

      <h2 className="text-2xl md:text-3xl font-serif text-white mb-4 leading-snug group-hover:text-primary transition-colors">
        {post.title}
      </h2>

      <p className="text-muted-foreground font-light leading-relaxed text-base mb-8">
        {post.excerpt}
      </p>

      <div className="prose prose-invert prose-sm max-w-none text-muted-foreground font-light leading-relaxed">
        {post.content.trim().split('\n\n').map((para, i) => {
          if (para.startsWith('## ')) {
            return (
              <h3 key={i} className="text-xl font-serif text-white mt-8 mb-4 not-italic">
                {para.replace('## ', '')}
              </h3>
            );
          }
          if (para.startsWith('**') && para.endsWith('**')) {
            return (
              <h4 key={i} className="text-base font-semibold text-white/90 mt-6 mb-2">
                {para.replace(/\*\*/g, '')}
              </h4>
            );
          }
          if (para.includes('- **')) {
            const items = para.split('\n').filter(l => l.startsWith('- '));
            return (
              <ul key={i} className="space-y-2 my-4 pl-4">
                {items.map((item, j) => (
                  <li key={j} className="relative pl-4 before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-primary/50 before:rounded-full">
                    <span dangerouslySetInnerHTML={{ __html: item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white/80">$1</strong>') }} />
                  </li>
                ))}
              </ul>
            );
          }
          return <p key={i} className="mb-4">{para}</p>;
        })}
      </div>
    </motion.article>
  );
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest mb-12">
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-primary" />
            <span className="font-mono text-primary text-xs uppercase tracking-widest">Writing</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-4">
            Blog
          </h1>
          <p className="text-muted-foreground font-light text-lg mb-16 max-w-2xl">
            Thoughts on AI safety, interpretability, and the architecture of responsible machine learning systems.
          </p>
        </motion.div>

        <div className="space-y-8">
          {posts.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
