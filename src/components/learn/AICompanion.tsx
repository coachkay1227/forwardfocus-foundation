import { Button } from "@/components/ui/button";

const AICompanion = () => {
  return (
    <section aria-labelledby="ai-companion" className="scroll-mt-16">
      <h2 id="ai-companion" className="font-heading text-2xl md:text-3xl font-semibold text-foreground">Your Reentry Success Navigator</h2>
      <p className="mt-3 text-foreground/80 max-w-3xl">AI-powered guidance specifically designed for reentry challenges. Get personalized support for housing, employment, legal matters, and family reconnection - available 24/7.</p>
      
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 hover:shadow-md transition-all">
          <div className="font-semibold text-foreground flex items-center gap-2">
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
            Housing Transition Coach
          </div>
          <p className="text-sm text-foreground/70 mt-2">Find transitional housing, navigate rental applications, understand tenant rights</p>
        </div>
        
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 hover:shadow-md transition-all">
          <div className="font-semibold text-foreground flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            Employment Navigator
          </div>
          <p className="text-sm text-foreground/70 mt-2">Resume building, interview prep, felon-friendly employers, job search strategies</p>
        </div>
        
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 hover:shadow-md transition-all">
          <div className="font-semibold text-foreground flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            Legal Document Assistant
          </div>
          <p className="text-sm text-foreground/70 mt-2">Court obligations, record expungement, documentation guidance</p>
        </div>
        
        <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 hover:shadow-md transition-all">
          <div className="font-semibold text-foreground flex items-center gap-2">
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
            Family Reconnection Guide
          </div>
          <p className="text-sm text-foreground/70 mt-2">Communication strategies, boundary setting, rebuilding trust and relationships</p>
        </div>
        
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 hover:shadow-md transition-all">
          <div className="font-semibold text-foreground flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            Financial Stability Coach
          </div>
          <p className="text-sm text-foreground/70 mt-2">Banking basics, budgeting, credit repair, benefit applications</p>
        </div>
        
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 hover:shadow-md transition-all">
          <div className="font-semibold text-foreground flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            Wellness & Trauma Support
          </div>
          <p className="text-sm text-foreground/70 mt-2">Mental health resources, coping strategies, crisis intervention</p>
        </div>
      </div>
      
      <div className="mt-6">
        <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
          <a href="/help#learn-assistant">Access Your Reentry Navigator</a>
        </Button>
      </div>
      
      <p className="mt-3 text-xs text-foreground/60">Completely free for all community members — because reentry support should be accessible to everyone.</p>
    </section>
  );
};

export default AICompanion;