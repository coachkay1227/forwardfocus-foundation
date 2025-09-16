import { useState } from "react";
import { BookOpen, CheckCircle, Users, MessageSquare, MapPin, Phone, FileText, DollarSign, Heart, Brain, GraduationCap, Home, Briefcase, Scale, HeartHandshake, PiggyBank, Shield, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CommunityApplication } from "@/components/learn/CommunityApplication";
import { PathwayVisual } from "@/components/learn/PathwayVisual";
import ReentryNavigatorAI from "@/components/ai/ReentryNavigatorAI";

export default function CommunityLearning() {
  const [showApplication, setShowApplication] = useState(false);
  const [showReentryAI, setShowReentryAI] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState<{
    name: string;
    specialty: string;
    description: string;
  } | undefined>(undefined);

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
    <div className="min-h-screen bg-background font-sans">
      {/* Hero Section with Premium Branding */}
      <header className="relative bg-gradient-osu-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/90 via-osu-scarlet/80 to-osu-scarlet-dark/70"></div>
        <div className="relative container py-24 md:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Users className="h-8 w-8 text-white" />
              <span className="text-sm uppercase tracking-wider font-medium bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">The Collective</span>
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Welcome to the Collective
            </h1>
            <p className="text-lg md:text-xl mb-12 text-white/90 leading-relaxed max-w-3xl mx-auto">
              Whether you're rebuilding, reconnecting, or just figuring it out day by day, you don't have to do it alone.
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm mb-12 flex-wrap">
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full">
                <Shield className="h-5 w-5" />
                Safe Space
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full">
                <Heart className="h-5 w-5" />
                Support
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full">
                <Users className="h-5 w-5" />
                Community
              </span>
            </div>

            <div className="flex justify-center">
              <Button onClick={() => setShowReentryAI(true)} variant="secondary" size="lg" className="bg-white text-osu-scarlet hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300">
                <Bot className="h-5 w-5 mr-2" />
                Access Your Reentry Navigator
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-24 space-y-32 font-body">
        <div className="max-w-6xl mx-auto">
          
          {/* Community Visual */}
          <section className="mb-16">
            <PathwayVisual pathway="community" />
          </section>

          {/* Reentry Navigator Section */}
          <section className="bg-gradient-to-r from-osu-gray/10 via-cream/20 to-osu-gray/10 rounded-2xl p-12 shadow-xl">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                  Your Reentry Success Navigator
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Personalized guidance specifically designed for reentry challenges. Get support for housing, employment, legal matters, and family reconnection available 24/7.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {supportCoaches.map((coach, index) => {
                  const Icon = coach.icon;
                  return (
                    <Card 
                      key={index} 
                      className="text-left hover:shadow-xl transition-all duration-300 border-l-4 border-l-osu-scarlet cursor-pointer hover:scale-105 bg-white/80 backdrop-blur-sm"
                      onClick={() => {
                        setSelectedCoach({
                          name: coach.name,
                          specialty: coach.specialty,
                          description: coach.description
                        });
                        setShowReentryAI(true);
                      }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-osu-scarlet rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                            <Icon className="h-6 w-6 text-osu-scarlet-foreground" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-foreground mb-2">{coach.name}</h3>
                            <p className="text-sm text-osu-scarlet font-medium mb-3">{coach.specialty}</p>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                              {coach.description}
                            </p>
                            <div className="mt-3">
                              <Button size="sm" variant="outline" className="text-xs border-osu-scarlet text-osu-scarlet hover:bg-osu-scarlet hover:text-white">
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
            </div>
          </section>

          {/* Tools for Your Journey Section */}
          <section className="space-y-16">
            <div className="text-center space-y-6">
              <PathwayVisual pathway="learning" />
              <div className="bg-gradient-to-r from-osu-gray/5 via-cream/10 to-osu-gray/5 rounded-2xl p-8">
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground flex items-center justify-center gap-4 mb-6">
                  <BookOpen className="h-10 w-10 text-osu-scarlet" />
                  Tools for Your Journey
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  8 guided learning modules to help you rebuild your life at your pace
                </p>
                <div className="flex items-center justify-center gap-4">
                  <Badge variant="secondary" className="text-sm bg-osu-gray text-osu-gray-foreground px-4 py-2">100% Free</Badge>
                  <Badge variant="secondary" className="text-sm bg-osu-gray text-osu-gray-foreground px-4 py-2">Educational Only</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-16">
              {Object.entries(learningGroups).map(([groupName, modules]) => (
                <div key={groupName} className="bg-gradient-to-r from-cream/20 via-background to-cream/20 rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl md:text-3xl font-heading font-semibold text-osu-scarlet mb-8 text-center">
                    {groupName}
                  </h3>
                  <div className={`grid gap-6 ${modules.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto'}`}>
                    {modules.map((module, index) => {
                      const Icon = module.icon;
                      return (
                        <Card key={index} className="text-left hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm border border-osu-gray/20">
                          <CardHeader className="pb-4">
                            <div className="w-12 h-12 bg-osu-scarlet/10 rounded-xl flex items-center justify-center mb-4 shadow-inner">
                              <Icon className="h-6 w-6 text-osu-scarlet" />
                            </div>
                            <CardTitle className="text-xl leading-tight font-semibold">
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

            <div className="text-center bg-gradient-to-r from-osu-scarlet/5 via-osu-scarlet/10 to-osu-scarlet/5 rounded-2xl p-12">
              <Button 
                onClick={() => setShowApplication(true)} 
                size="lg"
                variant="osu-gradient"
                className="text-lg px-12 py-6 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Users className="h-6 w-6 mr-3" />
                Join the Collective Now
              </Button>
            </div>
          </section>

          {/* Emergency Help Section */}
          <section className="bg-gradient-to-r from-osu-gray/10 via-osu-gray/5 to-osu-gray/10 rounded-2xl p-12 shadow-xl text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-8">
              Need Help Right Now?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
              <Button asChild variant="outline" size="lg" className="h-auto p-6 flex flex-col gap-3 border-osu-gray hover:bg-osu-gray hover:text-white transition-all duration-300 shadow-lg">
                <a href="tel:911">
                  <Phone className="h-6 w-6 text-osu-scarlet" />
                  <div>
                    <div className="font-bold text-lg">911</div>
                    <div className="text-xs text-muted-foreground">Emergency</div>
                  </div>
                </a>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="h-auto p-6 flex flex-col gap-3 border-osu-gray hover:bg-osu-gray hover:text-white transition-all duration-300 shadow-lg">
                <a href="tel:988">
                  <MessageSquare className="h-6 w-6 text-osu-scarlet" />
                  <div>
                    <div className="font-bold text-lg">988</div>
                    <div className="text-xs text-muted-foreground">Mental Health Support</div>
                  </div>
                </a>
              </Button>
              
              <Button variant="outline" size="lg" className="h-auto p-6 flex flex-col gap-3 border-osu-gray hover:bg-osu-gray hover:text-white transition-all duration-300 shadow-lg">
                <Users className="h-6 w-6 text-osu-scarlet" />
                <div>
                  <div className="font-bold text-lg">Quick Exit</div>
                  <div className="text-xs text-muted-foreground">Top Corner</div>
                </div>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground italic bg-white/50 backdrop-blur-sm rounded-lg p-4 inline-block">
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