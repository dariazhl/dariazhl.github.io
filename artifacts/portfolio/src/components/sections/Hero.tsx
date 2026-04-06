import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal } from "lucide-react";
import dariaPhoto from "@assets/daria-photo.jpg";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center w-full px-6 md:px-12 pt-20 overflow-hidden">
      <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-5xl z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-24">
        <div className="flex-1 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-[1px] bg-primary"></div>
            <span className="font-mono text-primary text-sm uppercase tracking-widest">
              Daria Zahaleanu
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[1.1] text-white mb-6"
          >
            Senior <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
              AI Architect
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground font-light max-w-xl mb-10 leading-relaxed border-l border-border pl-6"
          >
            Building production-ready AI systems. Leading teams that shape what's next. Bridging the gap between mechanistic interpretability and executive strategy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-sm uppercase tracking-wider font-mono"
              onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Experience
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 text-sm uppercase tracking-wider font-mono border-border hover:bg-white/5 hover:text-white"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Terminal className="mr-2 h-4 w-4" />
              Get in Touch
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 w-full max-w-md hidden md:block"
        >
          <div className="relative aspect-[3/4] w-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent border border-white/10 z-10 pointer-events-none" />
            <img
              src={dariaPhoto}
              alt="Daria Zahaleanu"
              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 opacity-90"
            />
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-primary/50 z-20" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-primary/50 z-20" />
            <div className="absolute bottom-6 -right-12 font-mono text-xs text-primary rotate-90 origin-bottom-left uppercase tracking-widest z-20">
              SYS_ARCH_v2.0
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
