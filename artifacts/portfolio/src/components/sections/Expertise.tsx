import { Section, SectionHeader } from "../ui/section";
import { motion } from "framer-motion";
import { Shield, BrainCircuit, Activity, Cpu, Network, Code2 } from "lucide-react";

const expertise = [
  {
    title: "AI Safety & Alignment",
    description: "Designing systems that remain safe, controllable, and aligned with human intent under scale and pressure.",
    icon: Shield,
  },
  {
    title: "Mechanistic Interpretability",
    description: "Reverse-engineering neural networks to understand the algorithms encoded in their weights.",
    icon: BrainCircuit,
  },
  {
    title: "Explainability Methods",
    description: "Implementing SHAP, LIME, and Chain-of-Thought approaches to make opaque models auditable.",
    icon: Activity,
  },
  {
    title: "Production MLOps",
    description: "Architecting end-to-end ML pipelines from data ingestion to deployment, monitoring, and governance.",
    icon: Network,
  },
  {
    title: "AI Control Strategies",
    description: "Developing robust mitigation strategies against prompt injection, goal hijacking, and data leakage.",
    icon: Cpu,
  },
  {
    title: "Core Engineering",
    description: "Writing performant, production-grade Python, PyTorch, and TensorFlow code.",
    icon: Code2,
  }
];

export function Expertise() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <Section id="expertise">
      <SectionHeader 
        title="Domain Expertise" 
        subtitle="Capabilities & Stack" 
      />
      
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
              <span className="w-4 h-[1px] bg-current mr-2" />
              CAPABILITY_0{index + 1}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
