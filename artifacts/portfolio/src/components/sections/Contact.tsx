import { Section } from "../ui/section";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Contact() {
  return (
    <Section id="contact" className="bg-primary/5 min-h-[70vh] flex items-center border-t border-border/50">
      <div className="max-w-4xl mx-auto w-full text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="font-mono text-sm text-primary uppercase tracking-widest flex items-center justify-center gap-4">
            <span className="w-8 h-[1px] bg-primary" />
            Contact
            <span className="w-8 h-[1px] bg-primary" />
          </div>

  
          <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
            Currently exploring AI Engineer/Architect roles at organizations shipping production AI in regulated environments.
          </p>

          <p className="text-sm text-muted-foreground/70 font-mono uppercase tracking-widest">
            If you would like to see my CV, please get in touch.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a href="mailto:daria.zahaleanu@gmail.com" className="inline-block group">
            <div className="relative px-12 py-6 border border-primary/30 bg-primary/10 hover:bg-primary/20 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 w-0 bg-primary group-hover:w-full transition-all duration-700 ease-out z-0 opacity-10" />
              <div className="relative z-10 flex items-center gap-4">
                <Mail className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-xl md:text-2xl font-mono text-white tracking-wide">
                  daria.zahaleanu@gmail.com
                </span>
              </div>
            </div>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-12 flex justify-center gap-8"
        >
          <a
            href="https://www.linkedin.com/in/daria-zahaleanu-01a9b6113/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-white transition-colors flex flex-col items-center gap-2 group"
          >
            <div className="p-4 border border-border rounded-full group-hover:border-primary/50 group-hover:bg-primary/5 transition-colors">
              <Linkedin className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs uppercase tracking-wider">LinkedIn</span>
          </a>
          <a
            href="https://github.com/dariazhl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-white transition-colors flex flex-col items-center gap-2 group"
          >
            <div className="p-4 border border-border rounded-full group-hover:border-primary/50 group-hover:bg-primary/5 transition-colors">
              <Github className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs uppercase tracking-wider">GitHub</span>
          </a>
          <a
            href="/resume"
            className="text-muted-foreground hover:text-white transition-colors flex flex-col items-center gap-2 group"
          >
            <div className="p-4 border border-border rounded-full group-hover:border-primary/50 group-hover:bg-primary/5 transition-colors">
              <Terminal className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs uppercase tracking-wider">CV</span>
          </a>
        </motion.div>
      </div>
    </Section>
  );
}
