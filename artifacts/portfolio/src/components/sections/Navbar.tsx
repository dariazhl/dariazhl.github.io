import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const scrollLinks = [
  { name: "About", href: "#about" },
  { name: "Expertise", href: "#expertise" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

const projectSubtabs = [
  { name: "All Projects", cat: null,          accent: "#ffffff" },
  { name: "Agentic AI",   cat: "agentic-ai",  accent: "#00f5c4" },
  { name: "Enterprise AI Infrastructure", cat: "enterprise", accent: "#4f8ef7" },
  { name: "AI Safety & Research",         cat: "ai-safety",  accent: "#c084fc" },
];

const otherPageLinks = [
  { name: "Blog", href: "/blog" },
  { name: "CV",   href: "/cv"   },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();
  const isHome = location === "/" || location === "";
  const isProjects = location.startsWith("/projects");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (projectsRef.current && !projectsRef.current.contains(e.target as Node)) {
        setProjectsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    if (!isHome) { window.location.href = "/" + href; return; }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const projectHref = (cat: string | null) =>
    cat ? `/projects?cat=${cat}` : "/projects";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent",
          scrolled || !isHome
            ? "bg-background/80 backdrop-blur-md border-border/50 py-4"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/">
            <div className="font-serif text-xl font-bold text-white tracking-tight cursor-pointer hover:text-primary transition-colors">
              DZ<span className="text-primary">.</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {scrollLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
              </button>
            ))}

            <div className="w-px h-4 bg-border/50" />

            {/* Projects with dropdown */}
            <div
              ref={projectsRef}
              className="relative"
              onMouseEnter={() => setProjectsOpen(true)}
              onMouseLeave={() => setProjectsOpen(false)}
            >
              <Link href="/projects">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest transition-colors relative group cursor-pointer",
                    isProjects ? "text-primary" : "text-muted-foreground hover:text-white"
                  )}
                >
                  Projects
                  <ChevronDown
                    className={cn(
                      "w-3 h-3 transition-transform duration-200",
                      projectsOpen ? "rotate-180" : "rotate-0"
                    )}
                  />
                  <span className={cn(
                    "absolute -bottom-2 left-0 h-[1px] bg-primary transition-all duration-300",
                    isProjects ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </span>
              </Link>

              <AnimatePresence>
                {projectsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-64 bg-background/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/60 overflow-hidden"
                  >
                    {/* pointer triangle */}
                    <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-background/95 border-l border-t border-white/10 rotate-45" />

                    <div className="py-2">
                      {projectSubtabs.map((tab, i) => {
                        const href = projectHref(tab.cat);
                        const isCurrent =
                          isProjects &&
                          (tab.cat
                            ? window.location.search.includes(tab.cat)
                            : !window.location.search.includes("cat="));
                        return (
                          <motion.div
                            key={tab.name}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                          >
                            <div
                              onClick={() => {
                                setProjectsOpen(false);
                                window.history.pushState({}, "", href);
                                window.dispatchEvent(new CustomEvent("projects:filter", { detail: tab.cat }));
                              }}
                              className={cn(
                                "flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors group/item",
                                isCurrent ? "bg-white/5" : "hover:bg-white/5"
                              )}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-opacity"
                                style={{ backgroundColor: tab.accent, opacity: isCurrent ? 1 : 0.4 }}
                              />
                              <span
                                className={cn(
                                  "font-mono text-xs uppercase tracking-widest transition-colors",
                                  isCurrent ? "text-white" : "text-white/40 group-hover/item:text-white/80"
                                )}
                              >
                                {tab.name}
                              </span>
                              {isCurrent && (
                                <span className="ml-auto w-1 h-4 rounded-full" style={{ backgroundColor: tab.accent }} />
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {otherPageLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <span
                  className={cn(
                    "font-mono text-xs uppercase tracking-widest transition-colors relative group cursor-pointer",
                    location === link.href ? "text-primary" : "text-muted-foreground hover:text-white"
                  )}
                >
                  {link.name}
                  <span className={cn(
                    "absolute -bottom-2 left-0 h-[1px] bg-primary transition-all duration-300",
                    location === link.href ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </span>
              </Link>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <button className="absolute top-6 right-6 text-white p-2" onClick={() => setMobileMenuOpen(false)}>
              <X className="w-8 h-8" />
            </button>

            <nav className="flex flex-col items-center gap-6 w-full px-8">
              {scrollLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => scrollTo(link.href)}
                  className="font-serif text-3xl text-white hover:text-primary transition-colors"
                >
                  {link.name}
                </motion.button>
              ))}

              <div className="w-16 h-px bg-border/50 my-1" />

              {/* Projects group in mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: scrollLinks.length * 0.08 }}
                className="w-full"
              >
                <p className="font-mono text-xs text-white/30 uppercase tracking-widest text-center mb-3">Projects</p>
                <div className="flex flex-col items-center gap-2">
                  {projectSubtabs.map((tab) => (
                    <Link key={tab.name} href={projectHref(tab.cat)}>
                      <span
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 font-serif text-xl text-white/70 hover:text-white transition-colors cursor-pointer"
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tab.accent }} />
                        {tab.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>

              <div className="w-16 h-px bg-border/50 my-1" />

              {otherPageLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (scrollLinks.length + 1 + i) * 0.08 }}
                >
                  <Link href={link.href}>
                    <span
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-serif text-3xl text-primary hover:text-white transition-colors cursor-pointer block"
                    >
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
