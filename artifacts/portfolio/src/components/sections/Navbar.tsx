import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const scrollLinks = [
  { name: "About", href: "#about" },
  { name: "Expertise", href: "#expertise" },
  { name: "Research", href: "#research" },
  { name: "Publications", href: "#publications" },
  { name: "Contact", href: "#contact" },
];

const pageLinks = [
  { name: "Blog", href: "/blog" },
  { name: "CV", href: "/cv" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/" || location === "";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    if (!isHome) {
      window.location.href = "/" + href;
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent",
          scrolled || !isHome ? "bg-background/80 backdrop-blur-md border-border/50 py-4" : "bg-transparent py-6"
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

            {pageLinks.map((link) => (
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
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
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
            <button
              className="absolute top-6 right-6 text-white p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>

            <nav className="flex flex-col items-center gap-6">
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

              <div className="w-16 h-px bg-border/50 my-2" />

              {pageLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (scrollLinks.length + i) * 0.08 }}
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
