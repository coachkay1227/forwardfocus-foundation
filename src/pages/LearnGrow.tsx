import { useEffect, useState } from "react";
import { BookOpen, CheckCircle, Users, MessageSquare, MapPin, Phone, FileText, DollarSign, Heart, Brain, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CommunityApplication } from "@/components/learn/CommunityApplication";
import AICompanion from "@/components/learn/AICompanion";

export default function CommunityLearning() {
  const [showApplication, setShowApplication] = useState(false);

  useEffect(() => {
    // SEO optimization
    document.title = "Learning & Growth Community | Forward Focus Collective";
    const desc = "Access your AI-powered Reentry Navigator and 8 comprehensive learning modules designed for justice-impacted individuals and families.";
    
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
    
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", `${window.location.origin}/learn`);
  }, []);

  const learningTopics = [
    {
      title: "Welcome Rest Your Path",
      description: "Begin your healing journey with trauma-informed practices and community connection",
      icon: Heart
    },
    {
      title: "Financial Foundations", 
      description: "Banking basics, budgeting strategies, and financial literacy for stability",
      icon: DollarSign
    },
    {
      title: "Clarity Support & Wellness",
      description: "Mental health resources, mindfulness practices, and emotional wellness tools", 
      icon: Brain
    },
    {
      title: "AI Basics Training",
      description: "Learn how AI can support your reentry journey and daily life navigation",
      icon: GraduationCap
    },
    {
      title: "Credit Confidence Starter",
      description: "Build and repair credit, understand credit reports, and establish financial trust",
      icon: CheckCircle
    },
    {
      title: "Business Essentials", 
      description: "Entrepreneurship fundamentals, business planning, and creating your own opportunities",
      icon: Users
    },
    {
      title: "Reentry & Life Tools Vault",
      description: "Practical resources for housing, employment, documentation, and system navigation",
      icon: FileText
    },
    {
      title: "Purpose, Planning & Pathways",
      description: "Goal setting, life planning, and creating sustainable pathways forward",
      icon: MapPin
    }
  ];

  const navigatorCapabilities = [
    "Housing & Accommodation Support",
    "Employment & Career Guidance", 
    "Legal Documentation Assistance",
    "Healthcare Access & Benefits",
    "Family Reunification Support",
    "Financial Stability Planning"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <main className="container py-16">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          
          {/* Reentry Navigator Section */}
          <section className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Access Your Reentry Navigator
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                AI-powered guidance specifically designed for reentry challenges. Available 24/7 to help you succeed.
              </p>
            </div>
            
            <AICompanion />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              {navigatorCapabilities.map((capability, index) => (
                <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{capability}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Learning Modules Section */}
          <section className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground flex items-center justify-center gap-3">
                <BookOpen className="h-8 w-8" />
                8 Learning Modules
              </h2>
              <p className="text-lg text-muted-foreground">
                Comprehensive education designed for the Forward Focus Collective community
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {learningTopics.map((topic, index) => {
                const Icon = topic.icon;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardHeader className="pb-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg leading-tight text-left">
                        {topic.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground text-left">
                        {topic.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Button 
              onClick={() => setShowApplication(true)} 
              size="lg"
              className="shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Users className="h-5 w-5 mr-2" />
              Join Forward Focus Collective
            </Button>
          </section>

        </div>
      </main>

      {/* Application Modal */}
      <CommunityApplication 
        isOpen={showApplication} 
        onClose={() => setShowApplication(false)} 
      />
    </div>
  );
}