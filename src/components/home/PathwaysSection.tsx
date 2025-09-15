import { Users, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const PathwaysSection = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-osu-gray/5 to-background">
      <div className="container px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Choose Your Path Forward
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          <Card className="border-2 border-osu-scarlet/20 bg-card/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:border-osu-scarlet/40 group">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-osu-scarlet to-osu-scarlet-dark rounded-lg group-hover:shadow-lg transition-shadow duration-300">
                  <Users className="h-6 w-6 text-white" aria-hidden />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl font-bold mb-2 text-foreground">
                    Justice-Impacted Families
                  </CardTitle>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Free learning community, peer support, and life coaching.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Free learning community, peer support, and income-based life coaching designed
                specifically for justice-impacted individuals and families.
              </p>
              <Button 
                asChild 
                size="lg" 
                className="w-full bg-gradient-to-r from-osu-scarlet to-osu-scarlet-dark hover:from-osu-scarlet-dark hover:to-osu-scarlet text-white font-semibold h-12 shadow-md hover:shadow-lg transition-all duration-300" 
                aria-label="Join learning community"
              >
                <Link to="/learn">Join Learning Community →</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-osu-scarlet/20 bg-card/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:border-osu-scarlet/40 group">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-osu-scarlet to-osu-scarlet-dark rounded-lg group-hover:shadow-lg transition-shadow duration-300">
                  <Shield className="h-6 w-6 text-white" aria-hidden />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl font-bold mb-2 text-foreground">
                    Crime Victims &amp; Survivors
                  </CardTitle>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Specialized trauma-informed support and crisis tools.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Comprehensive healing &amp; safety hub with crisis support, compensation guidance,
                and specialized trauma-informed coaching.
              </p>
              <Button 
                asChild 
                size="lg" 
                className="w-full bg-gradient-to-r from-osu-scarlet to-osu-scarlet-dark hover:from-osu-scarlet-dark hover:to-osu-scarlet text-white font-semibold h-12 shadow-md hover:shadow-lg transition-all duration-300" 
                aria-label="Access Healing and Safety Hub"
              >
                <Link to="/victim-services">Access Healing &amp; Safety Hub →</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};