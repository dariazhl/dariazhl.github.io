import { motion } from "framer-motion";

const highlights = [
  {
    stat: "35%",
    label: "System Performance Gain",
    context: "Netcompany, 2022"
  },
  {
    stat: "10+",
    label: "Engineers Led",
    context: "Digital Transformation"
  },
  {
    stat: "MSc",
    label: "Computer Science",
    context: "AI & Systems Research"
  },
  {
    stat: "3+",
    label: "AI Safety Projects",
    context: "Governance & XAI"
  }
];

export function CareerHighlights() {
  return (
    <section className="w-full border-y border-border/50 bg-card/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/50">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="px-8 py-8 md:py-10 flex flex-col gap-1"
            >
              <div className="text-3xl md:text-4xl font-serif text-primary">{item.stat}</div>
              <div className="text-sm text-white font-medium">{item.label}</div>
              <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest">{item.context}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
