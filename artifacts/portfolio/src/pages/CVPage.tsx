import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Download, GraduationCap, Briefcase, FlaskConical, Wrench, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import cvPdfUrl from "@assets/Daria_Zahaleanu_CV_Aug25.pdf?url";

const education = [
  {
    degree: "MSc in Computer Science",
    institution: "University — Computer Science Department",
    period: "2020 – 2022",
    details: "Thesis: Biases in Human Mobility Data. Research focus on data sampling methodologies, statistical analysis, and machine learning applications."
  },
  {
    degree: "BSc in Computer Engineering",
    institution: "University — Engineering Department",
    period: "2016 – 2020",
    details: "Capstone project: Machine learning application for real-world engineering problem. Strong foundation in algorithms, systems architecture, and software engineering."
  }
];

const experience = [
  {
    title: "Lead Software Engineer",
    company: "Netcompany",
    period: "Feb 2023 – Present",
    points: [
      "Architected and delivered backend systems supporting data-intensive and AI-enabled workflows, including LLM-driven components, used by 3M+ users.",
      "Led end-to-end system design spanning API development, data ingestion, service orchestration, and AI execution flows.",
      "Built scalable backend services and data pipelines for large-scale distributed systems.",
      "Led a 10-person cross-functional team, acting as technical decision-maker on architecture and delivery."
    ]
  },
  {
    title: "AI Engineer (part-time)",
    company: "Stealth Start-up",
    period: "Oct 2025 – Present",
    points: [
      "Developed internal tooling and experimentation frameworks for building and evaluating LLM-powered applications.",
      "Built modular pipelines for prompt orchestration, retrieval augmentation, and evaluation of model outputs.",
      "Contributed to the development of an online platform providing implementation frameworks for AI adoption.",
      "Designed benchmarking utilities and evaluation workflows to analyze model behavior."
    ]
  },
  {
    title: "Product & Engineering Intern",
    company: "Microsoft",
    period: "Apr 2022 – Jan 2023",
    points: [
      "Researched and identified new customer experience enhancement features in the Dynamics 365 platform.",
      "Collaborated with engineering, product, and design teams to translate platform capabilities into customer-facing features."
    ]
  },
  {
    title: "Machine Learning Engineer Intern",
    company: "Brooklyn Investment Group",
    period: "May – Jul 2019",
    points: [
      "Built and evaluated classical ML models (logistic regression, tree-based models) alongside NLP pipelines for forecasting.",
      "Designed training and validation workflows using cross-validation and precision/recall metrics.",
      "Deployed early-stage models to cloud environments (AWS, GCP), balancing accuracy with operational constraints."
    ]
  }
];

const research = [
  {
    title: "Finding Misinformation Inside Language Models: Comparative XAI Methods on LIAR",
    period: "May 2025 – Present",
    description: "Evaluating Llama model's ability to distinguish true from false claims in the LIAR dataset. Comparing consistency, depth, and reliability of XAI explanations (SHAP, LIME, CoT)."
  },
  {
    title: "AI Safety Toolkit",
    period: "July 2025 – Present",
    description: "Small-scale toolkit demonstrating real-world AI governance: prompt injection detection, fairness auditing, goal hijacking prevention, sensitive data leakage checks."
  },
  {
    title: "Biases in Human Mobility Data (Master's Thesis)",
    period: "Jan – July 2022",
    description: "Comprehensive analysis of sampling biases in large-scale human mobility datasets. Developed statistical methods for bias detection and correction."
  },
  {
    title: "Sampling Biases Research Series",
    period: "Sept 2021 – May 2021",
    description: "Two-part research series exploring systematic and random sampling biases in real-world data collection."
  }
];

const skills = {
  "AI & Machine Learning": ["PyTorch", "TensorFlow", "Scikit-learn", "Hugging Face Transformers", "LLM Fine-tuning", "Reinforcement Learning"],
  "AI Safety & Governance": ["SHAP", "LIME", "Chain-of-Thought Prompting", "Mechanistic Interpretability", "Prompt Injection Defense", "Fairness Evaluation"],
  "Engineering": ["Python", "MLOps", "API Design", "System Architecture", "Statistical Analysis", "Data Engineering"],
  "Research Methods": ["Experimental Design", "Literature Review", "Quantitative Analysis", "Technical Writing", "Academic Publishing"]
};

export default function CVPage() {
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

          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-primary" />
                <span className="font-mono text-primary text-xs uppercase tracking-widest">Curriculum Vitae</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif text-white">
                Daria Zahaleanu
              </h1>
              <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest mt-2">
                AI Architect / Engineer
              </p>
            </div>
            <a href={cvPdfUrl} download="Daria_Zahaleanu_CV.pdf">
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 text-xs uppercase tracking-wider font-mono gap-2 hidden md:flex"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </a>
          </div>
        </motion.div>

        {/* PDF Embed */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16 border border-border/50 bg-card/30"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">CV Document</span>
            <a href={cvPdfUrl} download="Daria_Zahaleanu_CV.pdf">
              <Button variant="ghost" size="sm" className="h-8 font-mono text-xs uppercase tracking-wider gap-1.5 text-primary hover:text-primary hover:bg-primary/10">
                <Download className="w-3 h-3" />
                Download
              </Button>
            </a>
          </div>
          <div className="w-full" style={{ height: "800px" }}>
            <iframe
              src={cvPdfUrl + "#toolbar=0"}
              className="w-full h-full"
              title="Daria Zahaleanu CV"
            />
          </div>
        </motion.div>

        {/* Education */}
        <Section icon={<GraduationCap className="w-5 h-5" />} title="Education" delay={0.2}>
          <div className="space-y-8">
            {education.map((item, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
                <div className="md:col-span-1">
                  <span className="font-mono text-xs text-primary uppercase tracking-widest">{item.period}</span>
                </div>
                <div className="md:col-span-3">
                  <h3 className="text-lg font-serif text-white mb-1">{item.degree}</h3>
                  <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">{item.institution}</p>
                  <p className="text-muted-foreground font-light text-sm leading-relaxed">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Experience */}
        <Section icon={<Briefcase className="w-5 h-5" />} title="Experience" delay={0.3}>
          <div className="space-y-10">
            {experience.map((item, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
                <div className="md:col-span-1">
                  <span className="font-mono text-xs text-primary uppercase tracking-widest">{item.period}</span>
                </div>
                <div className="md:col-span-3">
                  <h3 className="text-lg font-serif text-white mb-1">{item.title}</h3>
                  <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-4">{item.company}</p>
                  <ul className="space-y-2">
                    {item.points.map((point, j) => (
                      <li key={j} className="flex gap-3 text-muted-foreground font-light text-sm leading-relaxed">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Research */}
        <Section icon={<FlaskConical className="w-5 h-5" />} title="Research" delay={0.4}>
          <div className="space-y-8">
            {research.map((item, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
                <div className="md:col-span-1">
                  <span className="font-mono text-xs text-primary uppercase tracking-widest">{item.period}</span>
                </div>
                <div className="md:col-span-3">
                  <h3 className="text-base font-serif text-white mb-2 leading-snug">{item.title}</h3>
                  <p className="text-muted-foreground font-light text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section icon={<Wrench className="w-5 h-5" />} title="Skills & Tools" delay={0.5}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, items], i) => (
              <div key={i}>
                <h3 className="font-mono text-xs text-primary uppercase tracking-widest mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, j) => (
                    <span key={j} className="font-mono text-xs text-muted-foreground border border-border/50 px-3 py-1.5 hover:border-primary/50 hover:text-white transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 pt-12 border-t border-border/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div>
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-1">Get in touch</p>
            <a
              href="mailto:daria.zahaleanu@gmail.com"
              className="inline-flex items-center gap-2 text-white hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              daria.zahaleanu@gmail.com
            </a>
          </div>
          <a href={cvPdfUrl} download="Daria_Zahaleanu_CV.pdf">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 text-xs uppercase tracking-wider font-mono gap-2">
              <Download className="w-4 h-4" />
              Download Full CV (PDF)
            </Button>
          </a>
        </motion.div>
      </div>
    </div>
  );
}

function Section({ icon, title, delay, children }: { icon: React.ReactNode; title: string; delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="mb-12 pt-12 border-t border-border/50"
    >
      <div className="flex items-center gap-3 mb-8">
        <span className="text-primary">{icon}</span>
        <h2 className="text-2xl font-serif text-white">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}
