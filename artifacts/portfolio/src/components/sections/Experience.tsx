import { Section, SectionHeader } from "../ui/section";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const jobs = [
  {
    company: "Independent AI Research",
    title: "Senior AI Architect",
    period: "2023 – Present",
    location: "Remote",
    category: "Current",
    description: "Designing and building production-ready AI governance systems with a focus on safety, interpretability, and alignment. Leading independent research on LLM evaluation and explainability.",
    highlights: [
      "Built AI Safety Toolkit covering prompt injection, fairness, goal hijacking, and data leakage detection",
      "Evaluated Llama models on LIAR dataset using comparative XAI methods (SHAP, LIME, Chain-of-Thought)",
      "Authored technical publications on MiniCheck fact-checking and NRFE fake news detection methods",
      "Designed multi-stage LLM pipelines with auditability and explainable-by-default architecture"
    ],
    tags: ["AI Safety", "XAI", "LLMs", "MLOps", "Python", "PyTorch"]
  },
  {
    company: "Netcompany",
    title: "IT Consultant",
    period: "Feb 2022 – 2023",
    location: "Copenhagen, Denmark",
    category: "Industry",
    description: "Delivered large-scale software architecture and digital transformation engagements for enterprise clients across Northern Europe. Worked within one of the fastest-growing IT service companies in the region.",
    highlights: [
      "Designed and deployed scalable web platform features using Java and TypeScript, improving system performance by 35%",
      "Architected high-traffic systems applying design patterns that reduced data processing time by 30%",
      "Led a team of 10 engineers on a 6-month digital transformation project, delivering $50k under budget",
      "Applied SE best practices across the full development lifecycle on mission-critical client systems"
    ],
    tags: ["Java", "TypeScript", "System Architecture", "Digital Transformation", "Team Lead"]
  },
  {
    company: "Academic Research",
    title: "MSc Researcher",
    period: "2020 – 2022",
    location: "University",
    category: "Research",
    description: "Graduate research in machine learning and data science, with a focus on sampling bias in large-scale mobility datasets. Developed novel statistical mitigation strategies with downstream ML applications.",
    highlights: [
      "Master's thesis: Biases in Human Mobility Data — novel bias detection and correction methodologies",
      "Published two-part sampling bias research series covering systematic and random data collection biases",
      "Applied Python, statistical analysis, and ML evaluation frameworks throughout research lifecycle"
    ],
    tags: ["Machine Learning", "Statistics", "Data Science", "Python", "Research"]
  }
];

export function Experience() {
  return (
    <Section id="experience" className="bg-card">
      <SectionHeader
        title="Work Experience"
        subtitle="Career & Impact"
      />

      <div className="space-y-0 border-t border-border/50">
        {jobs.map((job, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative border-b border-border/50 hover:bg-white/5 transition-colors"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300" />

            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-6 md:gap-12 md:items-start">
              <div className="w-full md:w-52 shrink-0 flex flex-col gap-2">
                <span className="font-mono text-xs text-primary uppercase tracking-widest">{job.category}</span>
                <span className="text-sm text-muted-foreground">{job.period}</span>
                <span className="text-xs text-muted-foreground/60 font-mono">{job.location}</span>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-serif text-white group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <p className="font-mono text-sm text-muted-foreground uppercase tracking-wider mt-1">{job.company}</p>
                  </div>
                  <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-primary hidden md:block mt-1" />
                </div>

                <p className="text-muted-foreground text-base font-light leading-relaxed max-w-3xl">
                  {job.description}
                </p>

                <ul className="space-y-2 pt-2">
                  {job.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted-foreground/80 font-light leading-relaxed">
                      <span className="mt-2 w-1 h-1 rounded-full bg-primary/60 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-4">
                  {job.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-white/70">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
