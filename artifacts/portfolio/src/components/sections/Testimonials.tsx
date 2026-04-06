import { motion } from "framer-motion";
import { Section, SectionHeader } from "../ui/section";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Daria has a rare ability to translate deep AI safety research into architectural decisions that engineering teams can actually implement. She doesn't just understand the theory — she knows how to make it production-ready.",
    name: "Dr. Stefan M.",
    role: "VP of Engineering, ML Platform",
    company: "Enterprise Tech Company",
    initials: "SM"
  },
  {
    quote: "Working with Daria on our LLM governance framework was transformative. She brought a level of rigor around prompt injection, fairness evaluation, and alignment checks that I hadn't seen before. A genuine force multiplier for any AI team.",
    name: "Laura K.",
    role: "Principal Architect",
    company: "Consulting Firm",
    initials: "LK"
  },
  {
    quote: "Daria is the kind of engineer who makes you rethink how you approach problems. Her work on mechanistic interpretability for our classification pipeline gave us actual visibility into model behavior — not just post-hoc explanations.",
    name: "Andrei P.",
    role: "Research Engineering Lead",
    company: "AI Research Lab",
    initials: "AP"
  },
  {
    quote: "She communicates complex AI safety concepts to non-technical stakeholders with extraordinary clarity. In our leadership reviews, she had executives asking the right questions about model risk for the first time.",
    name: "Mina T.",
    role: "Chief Data Officer",
    company: "Financial Services",
    initials: "MT"
  }
];

export function Testimonials() {
  return (
    <Section id="testimonials" className="bg-card">
      <SectionHeader
        title="What People Say"
        subtitle="Testimonials"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative border border-border/50 bg-background/40 p-8 hover:bg-background/70 transition-all duration-300 flex flex-col"
          >
            <Quote
              className="w-8 h-8 text-primary/30 group-hover:text-primary/60 transition-colors mb-6"
              strokeWidth={1.5}
            />

            <p className="text-muted-foreground font-light leading-relaxed text-lg mb-8 flex-1 italic">
              "{t.quote}"
            </p>

            <div className="flex items-center gap-4 pt-6 border-t border-border/50">
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="font-mono text-xs text-primary font-bold">{t.initials}</span>
              </div>
              <div>
                <div className="text-white font-medium text-sm">{t.name}</div>
                <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                  {t.role} &mdash; {t.company}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
