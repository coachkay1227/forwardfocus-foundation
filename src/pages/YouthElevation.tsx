import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Code, Rocket, Heart, Users, Laptop } from "lucide-react";
import { SEOHead } from "@/components/seo/SEOHead";

const YouthElevation = () => {
  return (
    <>
      <SEOHead
        title="Youth Elevation Program | Forward Focus"
        description="Empowering justice-impacted youth with AI literacy, coding skills, and emotional resilience tools."
        path="/youth"
      />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-osu-scarlet/20 text-white">
          <div className="container relative z-10 px-4 mx-auto text-center">
            <Badge variant="outline" className="mb-6 text-white border-white/30 bg-white/10 backdrop-blur-sm">
              Future Leaders Initiative
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
              Youth <span className="text-osu-scarlet">Elevation</span> Program
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Equipping the next generation with the tools to rewrite their stories through technology, mentorship, and emotional intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-osu-scarlet hover:bg-osu-scarlet-dark text-white border-0">
                Join the Program
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>

          {/* Abstract Background Shapes */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
            <div className="absolute top-10 left-10 w-64 h-64 bg-osu-scarlet rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="py-16 bg-white dark:bg-slate-950">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold font-heading mb-4">Our Three Pillars</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We believe in a holistic approach to youth development, combining technical skills with personal growth.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-t-4 border-t-osu-scarlet shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-osu-scarlet/10 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-osu-scarlet" />
                  </div>
                  <CardTitle>AI Literacy</CardTitle>
                  <CardDescription>Understanding the Future</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Demystifying Artificial Intelligence. Learn how to use AI tools responsibly for creativity, problem-solving, and career advantage.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-blue-600 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Tech Skills</CardTitle>
                  <CardDescription>Building Real Solutions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Hands-on coding workshops. From web development to basic app creation, turning consumers into creators.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-green-600 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-600/10 rounded-lg flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Resilience</CardTitle>
                  <CardDescription>Emotional Intelligence</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Mental health support and mentorship. Developing the inner strength to navigate life's challenges with confidence.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
          <div className="container px-4 mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold font-heading mb-6">Why It Matters</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Breaking the Cycle</h3>
                      <p className="text-sm text-muted-foreground">Providing positive pathways and role models for justice-impacted youth.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Laptop className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Digital Equity</h3>
                      <p className="text-sm text-muted-foreground">Ensuring access to modern technology and skills for underserved communities.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Rocket className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Career Readiness</h3>
                      <p className="text-sm text-muted-foreground">Preparing youth for the jobs of tomorrow, not just today.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-tr from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-700 overflow-hidden shadow-2xl">
                  {/* Placeholder for youth tech image */}
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <span className="flex flex-col items-center gap-4">
                      <Code className="h-16 w-16 opacity-20" />
                      <span className="text-sm uppercase tracking-widest opacity-50">Future Innovators</span>
                    </span>
                  </div>
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-border">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-bold text-osu-scarlet">100+</div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Youth<br/>Empowered
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-osu-gray-dark text-white text-center">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Level Up?</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-8">
              Join a community of creators, dreamers, and future leaders. Your journey starts here.
            </p>
            <Button size="lg" variant="default" className="bg-white text-slate-900 hover:bg-slate-100 font-semibold">
              Get Started Today
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default YouthElevation;