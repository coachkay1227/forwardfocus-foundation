import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const CallToActionSection = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-osu-gray/10 via-secondary/10 to-accent/10">
      <div className="container px-4 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Want to Get Involved?
        </h3>
        <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Whether you're a family, nonprofit, or mentor — there's a place for you here.
        </p>
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg h-12 px-8 text-base font-semibold hover:shadow-xl transition-all duration-300" 
          asChild
        >
          <Link to="/partners">Join the Movement</Link>
        </Button>
      </div>
    </section>
  );
};