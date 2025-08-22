import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmergencyBar = () => {
  return (
    <div className="sticky top-0 z-[70] w-full bg-destructive text-destructive-foreground">
      <div className="container flex items-center justify-between py-2 text-sm">
        <p className="font-medium">Need help now? Call 211 for local services or dial 988 for the Suicide & Crisis Lifeline.</p>
        <div className="hidden sm:flex gap-2">
          <Button asChild size="sm" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
            <a href="tel:211" aria-label="Call 211 now">Call 211</a>
          </Button>
          <Button asChild size="sm" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
            <a href="https://www.211.org/" target="_blank" rel="noreferrer">Find services</a>
          </Button>
        </div>
      </div>
      {/* Mobile FAB */}
      <div className="sm:hidden">
        <a
          href="tel:211"
          aria-label="Call 211 now"
          className="fixed bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-destructive text-destructive-foreground shadow-lg px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring z-50"
        >
          <Phone className="h-4 w-4" />
          <span>Call 211</span>
        </a>
      </div>
    </div>
  );
};

export default EmergencyBar;
