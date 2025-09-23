import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { NewsletterSignup } from "./NewsletterSignup";

export const CallToActionSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-osu-gray/5 via-secondary/5 to-accent/5">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Get Involved Section */}
          <div className="text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Want to Get Involved?
            </h3>
            <p className="text-lg mb-8 text-muted-foreground leading-relaxed">
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

          {/* Newsletter Signup */}
          <div>
            <NewsletterSignup />
          </div>
        </div>
      </div>
    </section>
  );
};