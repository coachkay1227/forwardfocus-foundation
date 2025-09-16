import { useEffect, useState } from "react";
import { BookOpen, CheckCircle, Users, MessageSquare, MapPin, Phone, FileText, DollarSign, Heart, Brain, GraduationCap, Home, Briefcase, Scale, HeartHandshake, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CommunityApplication } from "@/components/learn/CommunityApplication";
import ReentryNavigatorAI from "@/components/ai/ReentryNavigatorAI";

export default function CommunityLearning() {
  const [showApplication, setShowApplication] = useState(false);
  const [showReentryAI, setShowReentryAI] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState<{
    name: string;
    specialty: string;
    description: string;
  } | undefined>(undefined);

  useEffect(() => {
    // SEO optimization
    document.title = "The Collective | Forward Focus Collective";
    const desc = "Access your Reentry Navigator and comprehensive learning community designed for justice impacted individuals and families.";
    
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

  const supportCoaches = [
    {
      name: "Coach Dana",
      specialty: "Housing Transition",
      description: "I help you find safe, stable housing and navigate the rental process with confidence",
      icon: Home
    },
    {
      name: "Coach Malik", 
      specialty: "Employment Support",
      description: "From resume building to interview prep, I'm here to help you land meaningful work",
      icon: Briefcase
    },
    {
      name: "Coach Rivera",
      specialty: "Legal Guidance",
      description: "Let's tackle court obligations, expungement, and legal paperwork together",
      icon: Scale
    },
    {
      name: "Coach Taylor",
      specialty: "Family Support",
      description: "Rebuilding relationships takes time. I'll guide you through every conversation",
      icon: HeartHandshake
    },
    {
      name: "Coach Jordan",
      specialty: "Financial Stability",
      description: "Banking, budgeting, credit repair - we'll build your financial foundation step by step",
      icon: PiggyBank
    },
    {
      name: "Coach Sam",
      specialty: "Mental Wellness",
      description: "Your mental health matters. I'm here to support your healing journey",
      icon: Brain
    }
  ];

  const learningGroups = {
    "Mind & Healing": [
      {
        title: "Welcome Rest Your Path",
        description: "Begin your healing journey with trauma informed practices and community connection",
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
        title: "Credit Confidence",
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
        title: "Purpose Planning & Pathways",
        description: "Goal setting, life planning, and creating sustainable pathways forward",
        icon: MapPin
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 font-sans">
      <main className="container py-16 font-body">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          
          {/* Welcome Section */}
          <section className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight tracking-tight">
              Welcome to the Collective
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              Whether you're rebuilding, reconnecting, or just figuring it out day by day, you don't have to do it alone.
            </p>
            
            {/* Access Navigator Button */}
            <div className="flex justify-center">
              <Button onClick={() => setShowReentryAI(true)} className="bg-[hsl(var(--osu-scarlet))] hover:bg-[hsl(var(--osu-scarlet-dark))] text-white">
                Access Your Reentry Navigator
              </Button>
            </div>
          </section>

          {/* Reentry Navigator Section */}
          <section className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                Your Reentry Success Navigator
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
                Personalized guidance specifically designed for reentry challenges. Get support for housing, employment, legal matters, and family reconnection available 24/7.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {supportCoaches.map((coach, index) => {
                const Icon = coach.icon;
                return (
                  <Card 
                    key={index} 
                    className="text-left hover:shadow-lg transition-all duration-300 border-l-4 border-l-[hsl(var(--osu-scarlet))] cursor-pointer hover:scale-105"
                    onClick={() => {
                      setSelectedCoach({
                        name: coach.name,
                        specialty: coach.specialty,
                        description: coach.description
                      });
                      setShowReentryAI(true);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-[hsl(var(--osu-scarlet))] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{coach.name}</h3>
                          <p className="text-sm text-[hsl(var(--osu-scarlet))] font-medium mb-2">{coach.specialty}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {coach.description}
                          </p>
                          <div className="mt-3">
                            <Button size="sm" variant="outline" className="text-xs">
                              Chat with {coach.name.split(' ')[1]}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Tools for Your Journey Section */}
          <section className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground flex items-center justify-center gap-3">
                <BookOpen className="h-8 w-8 text-[hsl(var(--osu-scarlet))]" />
                Tools for Your Journey
              </h2>
              <p className="text-lg text-muted-foreground font-body">
                8 guided learning modules to help you rebuild your life at your pace
              </p>
              <div className="flex items-center justify-center gap-2">
                <Badge variant="secondary" className="text-xs bg-[hsl(var(--osu-gray))] text-white">100% Free</Badge>
                <Badge variant="secondary" className="text-xs bg-[hsl(var(--osu-gray))] text-white">Educational Only</Badge>
              </div>
            </div>

            <div className="space-y-10">
              {Object.entries(learningGroups).map(([groupName, modules]) => (
                <div key={groupName} className="space-y-6">
                  <h3 className="text-xl md:text-2xl font-heading font-semibold text-[hsl(var(--osu-scarlet))]">
                    {groupName}
                  </h3>
                  <div className={`grid gap-4 justify-center ${modules.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto'}`}>
                    {modules.map((module, index) => {
                      const Icon = module.icon;
                      return (
                        <Card key={index} className="text-left hover:shadow-lg transition-all duration-300 hover:scale-105">
                          <CardHeader className="pb-3">
                            <div className="w-10 h-10 bg-[hsl(var(--osu-scarlet))]/10 rounded-lg flex items-center justify-center mb-3">
                              <Icon className="h-5 w-5 text-[hsl(var(--osu-scarlet))]" />
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

            <Button 
              onClick={() => setShowApplication(true)} 
              size="lg"
              className="bg-[hsl(var(--osu-scarlet))] hover:bg-[hsl(var(--osu-scarlet-dark))] text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Users className="h-5 w-5 mr-2" />
              Join the Collective Now
            </Button>
          </section>

          {/* Emergency Help Section */}
          <section className="bg-[hsl(var(--osu-gray))]/10 rounded-xl p-8 space-y-6">
            <h2 className="text-2xl font-heading font-semibold text-foreground">
              Need Help Right Now?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <Button variant="outline" size="lg" className="h-auto p-4 flex flex-col gap-2 border-[hsl(var(--osu-gray))]">
                <Phone className="h-5 w-5 text-[hsl(var(--osu-scarlet))]" />
                <div>
                  <div className="font-semibold">911</div>
                  <div className="text-xs text-muted-foreground">Emergency</div>
                </div>
              </Button>
              
              <Button variant="outline" size="lg" className="h-auto p-4 flex flex-col gap-2 border-[hsl(var(--osu-gray))]">
                <MessageSquare className="h-5 w-5 text-[hsl(var(--osu-scarlet))]" />
                <div>
                  <div className="font-semibold">988</div>
                  <div className="text-xs text-muted-foreground">Mental Health Support</div>
                </div>
              </Button>
              
              <Button variant="outline" size="lg" className="h-auto p-4 flex flex-col gap-2 border-[hsl(var(--osu-gray))]">
                <Users className="h-5 w-5 text-[hsl(var(--osu-scarlet))]" />
                <div>
                  <div className="font-semibold">Quick Exit</div>
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
      
      {/* Reentry Navigator AI */}
      <ReentryNavigatorAI 
        isOpen={showReentryAI} 
        onClose={() => {
          setShowReentryAI(false);
          setSelectedCoach(undefined);
        }}
        selectedCoach={selectedCoach}
      />
    </div>
  );
}