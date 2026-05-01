import { motion } from "framer-motion";
import { Link } from "wouter";

export default function CVPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-8 h-[1px] bg-primary" />
          <span className="font-mono text-primary text-xs uppercase tracking-widest">CV</span>
          <div className="w-8 h-[1px] bg-primary" />
        </div>

        <p className="text-xl font-serif text-white leading-relaxed">
          If you would like to see my CV, please{" "}
          <Link href="/#contact" className="text-primary hover:underline underline-offset-4 transition-colors">
            contact me
          </Link>
          .
        </p>
      </motion.div>
    </div>
  );
}
