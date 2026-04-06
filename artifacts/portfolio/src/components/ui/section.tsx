import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function Section({ id, children, className, containerClassName }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("w-full py-24 md:py-32 relative flex flex-col items-center", className)}
    >
      <div className={cn("w-full max-w-5xl px-6 md:px-12 z-10", containerClassName)}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-border/50 pb-8 gap-6">
      <h2 className="text-3xl md:text-5xl font-serif text-white">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground font-mono text-sm uppercase tracking-wider max-w-xs md:text-right">
          {subtitle}
        </p>
      )}
    </div>
  );
}
