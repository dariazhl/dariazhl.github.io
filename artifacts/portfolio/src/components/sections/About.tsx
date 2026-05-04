import { Section, SectionHeader } from "../ui/section";
import { motion } from "framer-motion";
import { Shield, BrainCircuit, Activity, Cpu, Network, Code2 } from "lucide-react";

const expertise = [
  {
    title: "NLP & LLM Systems",
    description: "Building NLP systems for language understanding tasks, LLM evaluation frameworks, task benchmarks, and prompt evaluation pipelines.",
    icon: BrainCircuit,
  },
  {
    title: "Generative AI & Agents",
    description: "Designing RAG pipelines with vector search and embedding layers, agent orchestration patterns, tool-calling agents, and prompt engineering.",
    icon: Network,
  },
  {
    title: "Backend & Data Engineering",
    description: "Python, FastAPI services, REST API design, SQL and relational data modeling, data ingestion pipelines for ML workflows, event-driven architectures (Kafka).",
    icon: Code2,
  },
  {
    title: "Cloud & MLOps",
    description: "AWS, Azure, GCP, containerization (Docker), orchestration (Kubernetes), CI/CD pipelines, model deployment and serving, monitoring, drift detection.",
    icon: Cpu,
  },
  {
    title: "AI Evaluation",
    description: "Designing benchmarking utilities, evaluation workflows, and model behavior analysis frameworks for production LLM and agentic systems.",
    icon: Activity,
  },
  {
    title: "AI Safety & Governance",
    description: "Implementing responsible AI practices — prompt injection defense, fairness evaluation, and measurable behavior in production AI models.",
    icon: Shield,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function About() {
  return (
    <Section id="about" className="bg-background">
      <SectionHeader title="About" subtitle="The Profile" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-5 space-y-6">
          <div className="font-mono text-base lg:text-lg text-muted-foreground uppercase tracking-wide pt-4 space-y-1">
            <div>MSc Computer Science</div>
            <div>BSc Computer Engineering</div>
            <div className="text-primary/70">Copenhagen, Denmark</div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6 text-muted-foreground leading-relaxed text-lg font-light">
          <p>
            AI engineer working on production LLM systems: evaluation infrastructure, agentic architectures, and the reliability and governance practices that make them deployable.
          </p>
        </div>
      </div>

      {/* Expertise */}
      <div className="mt-20 pt-16 border-t border-border/50">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-[1px] bg-primary" />
          <span className="font-mono text-primary text-xs uppercase tracking-widest">Capabilities & Stack</span>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {expertise.map((skill, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative p-8 border border-border/50 bg-card/30 hover:bg-card/80 transition-colors duration-500 flex flex-col"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/50 group-hover:via-primary group-hover:to-primary/50 transition-all duration-700" />

              <div className="mb-6 p-3 bg-white/5 inline-flex self-start border border-white/10">
                <skill.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>

              <h3 className="text-xl font-serif text-white mb-3">{skill.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-light">
                {skill.description}
              </p>

              <div className="mt-auto pt-8 flex items-center text-xs font-mono text-primary/50 group-hover:text-primary transition-colors">
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
