import { Section, SectionHeader } from "../ui/section";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const jobs = [
  {
    company: "Netcompany",
    title: "Senior Lead Software Engineer",
    period: "Feb 2023 – Present",
    location: "Copenhagen, Denmark",
    category: "Current",
    description: "Fastest growing and most successful IT service company in Northern Europe",
    highlights: [
      "Backend systems and data workflows at scale, used by 3M+ users",
      "Led system design and a cross-functional engineering team",
    ],
    tags: ["Python", "LLMs", "Backend", "API Design", "Data Engineering", "Team Lead"]
  },
  {
    company: "Stealth Start-up",
    title: "AI Engineer (part-time)",
    period: "Oct 2025 – Apr 2025",
    location: "Remote, United States",
    category: "Industry",
    description: "Start-up building tools and educational resources that help organizations implement responsible AI",
    highlights: [
      "Developed internal tooling and experimentation frameworks for building and evaluating LLM-powered applications",
      "Contributed to the development of an online platform providing implementation frameworks for AI adoption",
    ],
    tags: ["LLM Evaluation", "RAG", "Prompt Engineering", "GenAI", "Python", "Responsible AI"]
  },
  {
    company: "Microsoft",
    title: "Product & Engineering Intern",
    period: "Apr 2022 – Jan 2023",
    location: "Copenhagen, Denmark",
    category: "Industry",
    description: "",
    highlights: [
      "Researched and identified new customer experience enhancement features in the Dynamics 365 platform",
      "Collaborated with engineering, product, and design teams to translate platform capabilities into customer-facing features"
    ],
    tags: ["NLP", "Dynamics 365", "Data Pipelines", "Backend", "Python"]
  },
  {
    company: "Brooklyn Investment Group",
    title: "Machine Learning Engineer Intern",
    period: "May – Jul 2019",
    location: "New York City, NY",
    category: "Industry",
    description: "Company using AI models to forecast legal and regulatory risk affecting markets",
    highlights: [
      "Built and evaluated classical ML models alongside NLP pipelines for forecasting",
      "Designed training and validation workflows using cross-validation and precision/recall metrics",
    ],
    tags: ["ML Models", "Evaluation", "Risk Forecasting"]
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
