import { Switch, Route, Router as WouterRouter } from "wouter";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { Navbar } from "./components/sections/Navbar";
import { Hero } from "./components/sections/Hero";
import { CareerHighlights } from "./components/sections/CareerHighlights";
import { About } from "./components/sections/About";
import { Expertise } from "./components/sections/Expertise";
import { Experience } from "./components/sections/Experience";
import { Testimonials } from "./components/sections/Testimonials";
import { Contact } from "./components/sections/Contact";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ProjectsPage from "./pages/ProjectsPage";
import CVPage from "./pages/CVPage";
import ResumePage from "./pages/ResumePage";

const queryClient = new QueryClient();

function Portfolio() {
  useEffect(() => {
    document.title = "Daria (Eryn) H. Zahaleanu | AI Architect / Engineer";
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content =
      "Portfolio of Daria Zahaleanu, AI Architect and Engineer focused on NLP, GenAI systems, and evaluation of production AI models.";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans relative">
      <div className="bg-noise" />
      <Navbar />
      <main>
        <Hero />
        <CareerHighlights />
        <About />
        <Expertise />
        <Experience />
        {/* <Testimonials /> */}
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

function BlogWrapper() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="bg-noise" />
      <Navbar />
      <BlogPage />
      <footer className="py-8 text-center border-t border-border/50 bg-background">
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
          © {new Date().getFullYear()} Daria Zahaleanu. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function BlogPostWrapper() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="bg-noise" />
      <Navbar />
      <BlogPostPage />
      <footer className="py-8 text-center border-t border-border/50 bg-background">
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
          © {new Date().getFullYear()} Daria Zahaleanu. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function ProjectsWrapper() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="bg-noise" />
      <Navbar />
      <ProjectsPage />
      <footer className="py-8 text-center border-t border-border/50 bg-background">
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
          © {new Date().getFullYear()} Daria Zahaleanu. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function ResumeWrapper() {
  useEffect(() => {
    document.title = "CV | Daria Zahaleanu";
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="bg-noise" />
      <Navbar />
      <ResumePage />
    </div>
  );
}

function CVWrapper() {
  useEffect(() => {
    document.title = "CV | Daria Zahaleanu";
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="bg-noise" />
      <Navbar />
      <CVPage />
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
      <Route path="/blog" component={BlogWrapper} />
      <Route path="/blog/:slug" component={BlogPostWrapper} />
      <Route path="/projects" component={ProjectsWrapper} />
      <Route path="/cv" component={CVWrapper} />
      <Route path="/resume" component={ResumeWrapper} />
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
