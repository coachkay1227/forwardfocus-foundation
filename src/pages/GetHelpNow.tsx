import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, AlertTriangle, MessageCircle, Bot, Shield, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CrisisSupportAI from "@/components/ai/CrisisSupportAI";
import AIResourceDiscovery from "@/components/ai/AIResourceDiscovery";

export default function GetHelpNow() {
  const [showCrisisAI, setShowCrisisAI] = useState(false);
  const [showAIDiscovery, setShowAIDiscovery] = useState(false);

  useEffect(() => {
    document.title = "Get Help Now | Immediate Crisis Support | Forward Focus Elevation";
    const desc = "Immediate crisis support and emergency resources. Get help now with 24/7 crisis lines, AI-powered guidance, and direct connections to emergency services.";
    
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
    link.setAttribute("href", `${window.location.origin}/help`);
  }, []);

  return (
    <>
      <main id="main" className="min-h-screen">
        {/* Hero Section */}
        <header className="relative bg-gradient-osu-primary text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-osu-gray/90 via-osu-scarlet/80 to-osu-scarlet-dark/70"></div>
          <div className="relative container py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <AlertTriangle className="h-8 w-8 text-white animate-pulse" />
                <span className="text-sm uppercase tracking-wider font-medium bg-white/20 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">
                  Crisis Support Available 24/7
                </span>
              </div>
              
              <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Need Help Right Now?
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
                You're not alone. Get immediate crisis support, emergency resources, or personalized guidance to find the help you need.
              </p>

              <div className="bg-osu-gray/20 backdrop-blur-sm border border-white/20 rounded-lg p-4 mb-8 max-w-md mx-auto">
                <p className="text-sm text-white/90">
                  <strong>Need to exit quickly?</strong> Press Ctrl+Shift+Q for a safe exit
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="container py-16 space-y-16">
          {/* Emergency Crisis Support */}
          <section className="scroll-mt-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Emergency Crisis Support
                </h2>
                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                  If you're in immediate danger or having thoughts of self-harm
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-l-4 border-l-destructive">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-destructive rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Phone className="h-6 w-6 text-destructive-foreground" />
                    </div>
                    <CardTitle className="text-xl">Life-Threatening Emergency</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-foreground/70 mb-6">For immediate life-threatening emergencies</p>
                    <Button 
                      size="lg" 
                      className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                      onClick={() => window.location.href = 'tel:911'}
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      Call 911 Now
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-primary">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">Crisis & Suicide Prevention</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-foreground/70 mb-6">24/7 mental health crisis support</p>
                    <Button 
                      size="lg" 
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() => window.location.href = 'tel:988'}
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Call or Text 988
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* AI-Powered Help */}
          <section className="scroll-mt-16 bg-secondary/5 py-16 rounded-2xl">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                Get Personalized Help with AI
              </h2>
              <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
                Not sure what kind of help you need? Our AI can assess your situation and connect you with the right resources.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Crisis Support AI</h3>
                    <p className="text-foreground/70 mb-6">
                      Immediate AI support for crisis situations, safety planning, and emotional support
                    </p>
                    <Button 
                      size="lg" 
                      className="w-full"
                      onClick={() => setShowCrisisAI(true)}
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Start Crisis Chat
                    </Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Bot className="h-8 w-8 text-secondary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Resource Discovery</h3>
                    <p className="text-foreground/70 mb-6">
                      Find specific resources for housing, legal aid, healthcare, employment, and more
                    </p>
                    <Button 
                      size="lg" 
                      variant="secondary"
                      className="w-full"
                      onClick={() => setShowAIDiscovery(true)}
                    >
                      <Bot className="h-5 w-5 mr-2" />
                      Find Resources
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* Quick Access to Specialized Support */}
          <section className="scroll-mt-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Find Specialized Support
                </h2>
                <p className="text-lg text-foreground/70">
                  Looking for something specific? Jump directly to specialized support areas
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                      <Shield className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Healing & Safety Hub</h3>
                      <p className="text-foreground/70">Trauma recovery and victim services</p>
                    </div>
                  </div>
                  <Button asChild size="lg" variant="outline" className="w-full">
                    <Link to="/victim-services">
                      <Shield className="h-5 w-5 mr-2" />
                      Access Healing Hub
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">The Collective</h3>
                      <p className="text-foreground/70">Community support and growth programs</p>
                    </div>
                  </div>
                  <Button asChild size="lg" variant="outline" className="w-full">
                    <Link to="/learn">
                      <Users className="h-5 w-5 mr-2" />
                      Join Community
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Modals */}
      <CrisisSupportAI 
        isOpen={showCrisisAI} 
        onClose={() => setShowCrisisAI(false)} 
      />
      <AIResourceDiscovery 
        isOpen={showAIDiscovery} 
        onClose={() => setShowAIDiscovery(false)} 
        initialQuery=""
        location="Ohio"
      />
    </>
  );
}