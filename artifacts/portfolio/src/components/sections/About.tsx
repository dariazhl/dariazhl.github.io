import { Section, SectionHeader } from "../ui/section";
import { motion } from "framer-motion";

export function About() {
  return (
    <Section id="about" className="bg-background">
      <SectionHeader
        title="About"
        subtitle="The Profile"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-5 space-y-6">
          <div className="text-3xl md:text-4xl font-serif text-white/90 leading-tight">
            Deep technical expertise. <span className="text-primary italic">Strategic</span> architectural vision.
          </div>
          <div className="font-mono text-sm text-muted-foreground uppercase tracking-widest pt-4 border-t border-border/50 space-y-1">
            <div>MSc Computer Science</div>
            <div>BSc Computer Engineering</div>
            <div className="text-primary/70">Copenhagen, Denmark</div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6 text-muted-foreground leading-relaxed text-lg font-light">
          <p>
            Computer engineer with a proven track record delivering production-ready AI and data systems at enterprise scale.
          </p>
          <p>
            Specializing in AI Safety, Interpretability, and Alignment — building systems that are not just performant, but governable. From XAI-driven LLM evaluation to AI governance toolkits, my work is defined by rigor, responsibility, and the ability to translate technical decisions into organizational impact.
          </p>

          <div className="pt-6 flex gap-8 border-t border-border/50">
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
