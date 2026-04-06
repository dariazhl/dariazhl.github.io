import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Mail } from "lucide-react";

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3 justify-center">
            <div className="w-8 h-[1px] bg-primary" />
            <span className="font-mono text-primary text-xs uppercase tracking-widest">Resume</span>
            <div className="w-8 h-[1px] bg-primary" />
          </div>

          <h1 className="text-4xl md:text-5xl font-serif text-white leading-tight">
            Let's get in touch!
          </h1>

          <p className="text-lg text-muted-foreground font-light leading-relaxed">
            If interested in collaborating, please send me an email at{" "}
            <a
              href="mailto:daria.zahaleanu@gmail.com"
              className="text-primary hover:underline"
            >
              daria.zahaleanu@gmail.com
            </a>
          </p>

          <a
            href="mailto:daria.zahaleanu@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 border border-primary/30 bg-primary/10 hover:bg-primary/20 transition-all duration-300 font-mono text-sm text-white uppercase tracking-wider"
          >
            <Mail className="w-4 h-4 text-primary" />
            Send an email
          </a>

          <div className="pt-4">
            <Link href="/">
              <span className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
                Back to Portfolio
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
