import { useState } from "react";
import { Button } from "@/components/ui/button";
import ReentryNavigatorAI from "@/components/ai/ReentryNavigatorAI";
const AICompanion = () => {
  const [showReentryAI, setShowReentryAI] = useState(false);
  return <>
    <section aria-labelledby="ai-companion" className="scroll-mt-16">
      
      <p className="mt-3 text-foreground/80 max-w-3xl">AI-powered guidance specifically designed for reentry challenges. Get personalized support for housing, employment, legal matters, and family reconnection - available 24/7.</p>
      
      
      
      <div className="mt-6">
        <Button onClick={() => setShowReentryAI(true)} className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
          Access Your Reentry Navigator
        </Button>
      </div>

      {/* Reentry Navigator AI */}
      <ReentryNavigatorAI isOpen={showReentryAI} onClose={() => setShowReentryAI(false)} />
      
      <p className="mt-3 text-xs text-foreground/60">Completely free for all community members — because reentry support should be accessible to everyone.</p>
    </section>
    </>;
};
export default AICompanion;