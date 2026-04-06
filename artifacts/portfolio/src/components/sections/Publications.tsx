import { Section, SectionHeader } from "../ui/section";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";

const posts = [
  {
    title: "A Visual Guide to AI Interpretability",
    date: "August 2025",
    description: "Breaking down complex mechanistic interpretability concepts into intuitive visual frameworks for engineering teams and stakeholders.",
    readTime: "8 min read"
  },
  {
    title: "The NRFE Method for Fake News Detection",
    date: "August 2025",
    description: "An architectural deep-dive into implementing Neural-Symbolic Reasoning for fact extraction and verification in production systems.",
    readTime: "12 min read"
  }
];

export function Publications() {
  return (
    <Section id="publications">
      <SectionHeader 
        title="Thought Leadership" 
        subtitle="Writing & Insights" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative border border-border/50 bg-card/30 p-8 md:p-12 hover:bg-card/80 transition-colors flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
              <BookOpen className="w-8 h-8 text-primary" strokeWidth={1} />
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-primary" />
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">{post.readTime}</span>
            </div>
            
            <h3 className="text-2xl font-serif text-white mb-4 leading-snug group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            
            <p className="text-muted-foreground font-light leading-relaxed mb-12">
              {post.description}
            </p>
            
            <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between text-sm font-mono text-white group-hover:text-primary transition-colors cursor-pointer">
              <span className="uppercase tracking-widest">Read Article</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
