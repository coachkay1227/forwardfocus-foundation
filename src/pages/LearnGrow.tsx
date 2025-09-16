import { useEffect, useState } from "react";
import { BookOpen, CheckCircle, Users, MessageSquare, MapPin, Phone, FileText, DollarSign, Heart, Brain, GraduationCap, Home, Briefcase, Scale, HeartHandshake, PiggyBank, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

  const quickHelpOptions = [
    { label: "Housing", icon: Home, color: "bg-blue-50 hover:bg-blue-100 border-blue-200" },
    { label: "Employment", icon: Briefcase, color: "bg-green-50 hover:bg-green-100 border-green-200" },
    { label: "Legal Help", icon: Scale, color: "bg-purple-50 hover:bg-purple-100 border-purple-200" },
    { label: "Rebuilding Trust", icon: HeartHandshake, color: "bg-pink-50 hover:bg-pink-100 border-pink-200" },
    { label: "Mental Wellness", icon: Brain, color: "bg-indigo-50 hover:bg-indigo-100 border-indigo-200" },
    { label: "Just Trying to Survive", icon: Heart, color: "bg-red-50 hover:bg-red-100 border-red-200" }
  ];

  const supportCoaches = [
    {
      name: "Coach Dana",
      role: "Housing Transition",
      description: "Let's find safe housing and understand your rights as you move forward.",
      icon: Home,
      emoji: "🏠"
    },
    {
      name: "Coach Malik", 
      role: "Employment",
      description: "We'll work on your resume, interviews, and finding employers that hire returning citizens.",
      icon: Briefcase,
      emoji: "💼"
    },
    {
      name: "Coach Rivera",
      role: "Legal Guidance", 
      description: "Navigate legal requirements, documentation, and understand your rights and responsibilities.",
      icon: Scale,
      emoji: "⚖️"
    },
    {
      name: "Coach Taylor",
      role: "Family Support",
      description: "Rebuild relationships, communicate with loved ones, and strengthen family bonds.",
      icon: HeartHandshake,
      emoji: "💝"
    },
    {
      name: "Coach Jordan",
      role: "Financial Stability",
      description: "Build budgets, manage money, access benefits, and create financial security.", 
      icon: PiggyBank,
      emoji: "💰"
    },
    {
      name: "Coach Sam",
      role: "Mental Wellness",
      description: "Process trauma, manage stress, build resilience, and prioritize your mental health.",
      icon: Brain,
      emoji: "🧠"
    }
  ];

  const learningGroups = {
    "Mind & Healing": [
      {
        title: "Welcome Rest Your Path",
        description: "Begin your healing journey with trauma-informed practices and community connection",
        icon: Heart
      },
      {
        title: "Clarity Support & Wellness",
        description: "Mental health resources, mindfulness practices, and emotional wellness tools", 
        icon: Brain
      }
    ],
    "Money & Business": [
      {
        title: "Financial Foundations", 
        description: "Banking basics, budgeting strategies, and financial literacy for stability",
        icon: DollarSign
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
      }
    ],
    "Skills for Life After Release": [
      {
        title: "AI Basics Training",
        description: "Learn how AI can support your reentry journey and daily life navigation",
        icon: GraduationCap
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
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <main className="container py-16">
        <div className="max-w-5xl mx-auto space-y-20">
          
          {/* Trauma-Informed Welcome Section */}
          <section className="text-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Welcome, we're so glad you're here
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Whether you're rebuilding, reconnecting, or just figuring it out day by day, you don't have to do it alone.
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                This Reentry Navigator is built just for you—free, 24/7 support for housing, employment, legal guidance, healing, and more. Start wherever feels right.
              </p>
            </div>
          </section>

          {/* Personalized Entry Point Selector */}
          <section className="space-y-6">
            <div className="text-center space-y-3">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                What's the biggest challenge today?
              </h2>
              <p className="text-muted-foreground">
                Choose what you need help with right now
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
              {quickHelpOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className={`p-4 h-auto flex flex-col items-center gap-2 text-sm hover:scale-105 transition-all duration-200 ${option.color}`}
                    onClick={() => {/* This could trigger the AI companion with specific context */}}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-center leading-tight">{option.label}</span>
                  </Button>
                );
              })}
            </div>
          </section>

          {/* AI Navigator Access */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Access Your Reentry Navigator
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                AI-powered guidance available 24/7 to help you succeed
              </p>
            </div>
            
            <AICompanion />
          </section>

          {/* Support Coaches Section */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Meet Your Support Guides
              </h2>
              <p className="text-lg text-muted-foreground">
                Human-centered AI coaches trained to understand your journey
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportCoaches.map((coach, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:scale-105 text-left">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">{coach.emoji}</div>
                      <div>
                        <CardTitle className="text-lg">{coach.name}</CardTitle>
                        <p className="text-sm text-primary font-medium">{coach.role}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {coach.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Tools for Your Journey Section */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground flex items-center justify-center gap-3">
                <BookOpen className="h-8 w-8" />
                Tools for Your Journey
              </h2>
              <p className="text-lg text-muted-foreground">
                8 guided learning modules to help you rebuild your life—at your pace
              </p>
              <div className="flex items-center justify-center gap-2">
                <Badge variant="secondary" className="text-xs">100% Free</Badge>
                <Badge variant="secondary" className="text-xs">Educational Only</Badge>
              </div>
            </div>

            <div className="space-y-10">
              {Object.entries(learningGroups).map(([groupName, modules]) => (
                <div key={groupName} className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground text-center">
                    {groupName}
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {modules.map((module, index) => {
                      const Icon = module.icon;
                      return (
                        <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:scale-105 text-left">
                          <CardHeader className="pb-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <CardTitle className="text-lg leading-tight">
                              {module.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {module.description}
                            </p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button 
                onClick={() => setShowApplication(true)} 
                size="lg"
                className="shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Users className="h-5 w-5 mr-2" />
                Join the Collective Now
              </Button>
            </div>
          </section>

          {/* Emergency Help Section */}
          <section className="space-y-6 bg-muted/30 rounded-xl p-8 text-center">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground flex items-center justify-center gap-2">
                🛟 Need Help Right Now?
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <Button variant="outline" size="lg" className="h-auto p-4 flex flex-col gap-2">
                <Phone className="h-5 w-5" />
                <div>
                  <div className="font-semibold">📞 911</div>
                  <div className="text-xs text-muted-foreground">Emergency</div>
                </div>
              </Button>
              
              <Button variant="outline" size="lg" className="h-auto p-4 flex flex-col gap-2">
                <MessageSquare className="h-5 w-5" />
                <div>
                  <div className="font-semibold">📱 988</div>
                  <div className="text-xs text-muted-foreground">Mental Health Support</div>
                </div>
              </Button>
              
              <Button variant="outline" size="lg" className="h-auto p-4 flex flex-col gap-2">
                <Users className="h-5 w-5" />
                <div>
                  <div className="font-semibold">🧭 Quick Exit</div>
                  <div className="text-xs text-muted-foreground">Top Corner</div>
                </div>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground italic">
              You're safe here. Take what you need, when you're ready.
            </p>
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