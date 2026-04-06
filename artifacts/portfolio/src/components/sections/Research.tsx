import { Section, SectionHeader } from "../ui/section";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Finding Misinformation Inside Language Models",
    date: "May 2025–Present",
    category: "Current Research",
    description: "Evaluating Llama model's ability to distinguish true from false claims. Comparing the consistency and reliability of internal representations and explanations using advanced XAI methods on the LIAR dataset.",
    tags: ["LLMs", "XAI", "Llama", "Misinformation"]
  },
  {
    title: "AI Safety Toolkit",
    date: "July 2025–Present",
    category: "Engineering",
    description: "A small-scale, production-ready toolkit demonstrating real-world AI governance. Implements defenses and audits for prompt injection, fairness metrics, goal hijacking, and sensitive data leakage.",
    tags: ["Security", "Governance", "Python"]
  },
  {
    title: "Biases in Human Mobility Data",
    date: "Jan–July 2022",
    category: "Master's Thesis",
    description: "Comprehensive statistical analysis of sampling biases inherent in large-scale human mobility datasets, proposing novel mitigation strategies for downstream ML models.",
    tags: ["Data Bias", "Statistics", "Thesis"]
  },
  {
    title: "Sampling Biases Research Series",
    date: "2021",
    category: "Publication",
    description: "A series of investigative research papers analyzing the impact of biased sampling methodologies across various domain-specific datasets.",
    tags: ["Research", "Methodology"]
  }
];

export function Research() {
  return (
    <Section id="research" className="bg-card">
      <SectionHeader 
        title="Research & Implementations" 
        subtitle="Applied Intelligence" 
      />
      
      <div className="space-y-0 border-t border-border/50">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group block relative border-b border-border/50 hover:bg-white/5 transition-colors"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300" />
            
            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-6 md:gap-12 md:items-start">
              <div className="w-full md:w-48 shrink-0 flex flex-col gap-2">
                <span className="font-mono text-xs text-primary uppercase tracking-widest">{project.category}</span>
                <span className="text-sm text-muted-foreground">{project.date}</span>
              </div>
              
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl md:text-3xl font-serif text-white group-hover:text-primary transition-colors flex items-center justify-between">
                  {project.title}
                  <ArrowUpRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary hidden md:block" />
                </h3>
                <p className="text-muted-foreground text-lg font-light leading-relaxed max-w-3xl">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-4">
                  {project.tags.map(tag => (
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
