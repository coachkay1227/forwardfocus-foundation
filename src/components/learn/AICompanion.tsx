import { Button } from "@/components/ui/button";

const AICompanion = () => {
  return (
    <section aria-labelledby="ai-companion" className="scroll-mt-16">
      <h2 id="ai-companion" className="font-heading text-2xl md:text-3xl font-semibold">Meet Your Free AI Learning Companion</h2>
      <p className="mt-3 text-muted-foreground max-w-3xl">Personalized, trauma-informed support that adapts to how you learn. Available 24/7 and completely free.</p>
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        <li className="rounded-md border bg-card p-4"><div className="font-medium">Personalized study plans</div><p className="text-sm text-muted-foreground">Custom learning paths based on your goals</p></li>
        <li className="rounded-md border bg-card p-4"><div className="font-medium">24/7 homework help</div><p className="text-sm text-muted-foreground">Get unstuck anytime with supportive guidance</p></li>
        <li className="rounded-md border bg-card p-4"><div className="font-medium">Progress celebration</div><p className="text-sm text-muted-foreground">Recognizes milestones and encourages momentum</p></li>
        <li className="rounded-md border bg-card p-4"><div className="font-medium">Gentle accountability</div><p className="text-sm text-muted-foreground">Check‑ins that honor your pace and privacy</p></li>
        <li className="rounded-md border bg-card p-4"><div className="font-medium">Learning style adaptation</div><p className="text-sm text-muted-foreground">Adjusts to visual, audio, or hands‑on preferences</p></li>
      </ul>
      <div className="mt-6">
        <Button asChild>
          <a href="/help#learn-assistant">Open free AI assistant</a>
        </Button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Completely free for all learners — because support shouldn’t cost money.</p>
    </section>
  );
};

export default AICompanion;
