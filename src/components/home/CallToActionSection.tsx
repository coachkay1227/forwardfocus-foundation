import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Heart, Users, Sparkles } from "lucide-react";

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

          {/* Community Support Card */}
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/10 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">
                  Support Our Mission
                </h3>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Help us empower more justice-impacted families with resources, support, and hope for a brighter future.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Heart className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>100% of donations support families in need</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Users className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>Join a nationwide network of supporters</span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold h-11"
                asChild
              >
                <Link to="/support">
                  Get Involved
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
