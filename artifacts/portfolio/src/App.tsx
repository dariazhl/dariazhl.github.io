import { Switch, Route, Router as WouterRouter } from "wouter";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { Navbar } from "./components/sections/Navbar";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Expertise } from "./components/sections/Expertise";
import { Research } from "./components/sections/Research";
import { Publications } from "./components/sections/Publications";
import { Contact } from "./components/sections/Contact";

const queryClient = new QueryClient();

function Portfolio() {
  // Add SEO Meta tags dynamically (since we can't easily edit index.html metadata directly without an HTML parser tool here, doing it via JS is robust)
  useEffect(() => {
    document.title = "Daria Zahaleanu | Senior AI Architect";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Portfolio of Daria Zahaleanu, Senior AI Architect transitioning into Managing Architect roles. Specializing in AI Safety, Interpretability, and Alignment.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Portfolio of Daria Zahaleanu, Senior AI Architect transitioning into Managing Architect roles. Specializing in AI Safety, Interpretability, and Alignment.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans relative">
      <div className="bg-noise" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Research />
        <Publications />
        <Contact />
      </main>
      
      <footer className="py-8 text-center border-t border-border/50 bg-background">
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
          © {new Date().getFullYear()} Daria Zahaleanu. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Portfolio} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
