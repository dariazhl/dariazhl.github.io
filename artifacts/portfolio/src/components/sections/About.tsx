import { Section, SectionHeader } from "../ui/section";
import { motion } from "framer-motion";

export function About() {
  return (
    <Section id="about" className="bg-card">
      <SectionHeader 
        title="Executive Summary" 
        subtitle="Bridging Depth & Vision" 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-5 space-y-6">
          <div className="text-4xl font-serif text-white/90 leading-tight">
            Transforming complex data into <span className="text-primary italic">production-ready</span> platforms.
          </div>
          <div className="font-mono text-sm text-muted-foreground uppercase tracking-widest pt-4 border-t border-border/50">
            MSc Computer Science <br/>
            BSc Computer Engineering
          </div>
        </div>
        
        <div className="lg:col-span-7 space-y-8 text-muted-foreground leading-relaxed text-lg font-light">
          <p>
            I operate at the intersection of deep technical rigor and strategic architecture. As an AI Architect transitioning into Managing Architecture, my focus is on designing scalable, robust machine learning systems that survive contact with the real world.
          </p>
          <p>
            My specialization lies in AI Safety, Interpretability, and Alignment. I don't just build models; I build systems that can be understood, controlled, and governed. From deploying LLMs that resist prompt injection to architecting MLOps pipelines for continuous evaluation, I ensure technical excellence translates into organizational capability.
          </p>
          <p>
            I lead cross-functional teams to tackle ambiguity. Whether evaluating Llama models using XAI methods like SHAP and LIME, or designing governance toolkits, my work is defined by precision, responsibility, and an uncompromising standard of engineering.
          </p>
          
          <div className="pt-8 flex gap-8 border-t border-border/50">
            <div>
              <div className="text-3xl font-serif text-white mb-1">01</div>
              <div className="font-mono text-xs uppercase tracking-wider">AI Safety</div>
            </div>
            <div>
              <div className="text-3xl font-serif text-white mb-1">02</div>
              <div className="font-mono text-xs uppercase tracking-wider">Architecture</div>
            </div>
            <div>
              <div className="text-3xl font-serif text-white mb-1">03</div>
              <div className="font-mono text-xs uppercase tracking-wider">Leadership</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
