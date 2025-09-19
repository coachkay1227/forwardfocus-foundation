import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, AlertTriangle, Heart, Users, BookOpen, Shield, ArrowDown, MessageCircle, ChevronRight, ExternalLink, Bot, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CrisisSupportAI from "@/components/ai/CrisisSupportAI";
import AIResourceDiscovery from "@/components/ai/AIResourceDiscovery";
import { CommunityApplication } from "@/components/learn/CommunityApplication";
import diverseWomenSupport from "@/assets/diverse-women-support.jpg";


export default function GetHelpNow() {
  const [activeSection, setActiveSection] = useState<string>("crisis");
  const [showCrisisAI, setShowCrisisAI] = useState(false);
  const [showAIDiscovery, setShowAIDiscovery] = useState(false);
  const [showCommunityApplication, setShowCommunityApplication] = useState(false);

  useEffect(() => {
    document.title = "Get Personalized Support & Resources | Forward Focus";
    const desc = "Access AI-powered resource navigation across Ohio. Get personalized guidance for crisis support, reentry services, mental health, education, employment, and victim services. Available 24/7.";
    
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

  const navigationSections = [
    { id: "crisis", label: "Crisis Support", icon: Phone },
    { id: "pathways", label: "Growth Pathways", icon: ArrowRight }
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <main id="main">
      {/* Hero Section */}
      <header className="relative bg-gradient-osu-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/90 via-osu-scarlet/80 to-osu-scarlet-dark/70"></div>
        <div className="relative container py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
                <AlertTriangle className="h-8 w-8 text-white" />
                <span className="text-sm uppercase tracking-wider font-medium bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">Crisis Support Available</span>
              </div>
              <h1 className="font-heading text-5xl md:text-7xl font-bold mb-8 leading-tight">
                You Are Not Alone.<br />
                <span className="text-white/80">Help Is Here Now.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed">
                Immediate crisis support, trauma-informed guidance, and pathways to healing. 
                Our AI-powered tools and human support are available 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto lg:mx-0">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="bg-white text-osu-scarlet hover:bg-white/90"
                  onClick={() => setShowCrisisAI(true)}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Get Immediate AI Support
                </Button>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img src={diverseWomenSupport} alt="Diverse women supporting each other in crisis" className="w-full h-80 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/90 to-transparent flex items-end">
                <div className="p-8 text-accent-foreground w-full text-center">
                  <p className="text-2xl font-semibold">
                    Strength in community, healing in connection
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-24 space-y-32">
        {/* Crisis Support Section */}
        <section id="crisis-support" className="scroll-mt-16 bg-secondary/5 py-24 rounded-2xl">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                Immediate Crisis Support
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed mb-8">
                If you're in immediate danger or experiencing a crisis, these resources are available right now
              </p>
              <div className="bg-muted/50 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-sm text-muted-foreground">
                  <strong>Need to exit quickly?</strong> Use the "Exit" button in the top right corner or press Ctrl+Shift+Q to go to a safe website
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-4">
              <div className="bg-background rounded-xl p-6 border shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center gap-4 mb-6 justify-center">
                  <div className="w-12 h-12 bg-destructive rounded-xl flex items-center justify-center shadow-md">
                    <Phone className="h-6 w-6 text-destructive-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground text-center mb-4">Emergency Services</h3>
                <p className="text-foreground/70 text-base leading-relaxed text-center mb-6">For immediate life-threatening emergencies</p>
                <Button 
                  size="lg" 
                  className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground h-12"
                  onClick={() => window.location.href = 'tel:911'}
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call 911
                </Button>
              </div>

              <div className="bg-background rounded-xl p-6 border shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center gap-4 mb-6 justify-center">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-md">
                    <Heart className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground text-center mb-4">Mental Health Crisis</h3>
                <p className="text-foreground/70 text-base leading-relaxed text-center mb-6">24/7 suicide & crisis lifeline support</p>
                <Button 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90 h-12"
                  onClick={() => window.location.href = 'tel:988'}
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Call or Text 988
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Growth Pathways Section */}
        <section id="growth-pathways" className="scroll-mt-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                Pathways to Growth & Healing
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                Beyond crisis support, we offer long-term resources and community for your journey forward
              </p>
            </div>

            {/* Unified 4-Box Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
              {/* Learning & Growth */}
              <div className="bg-background rounded-xl p-6 md:p-8 border shadow-lg hover:shadow-xl transition-all h-full flex flex-col min-h-[320px] md:min-h-[350px]">
                <div className="flex items-center gap-4 mb-6 justify-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-primary rounded-xl flex items-center justify-center shadow-md">
                    <BookOpen className="h-6 w-6 md:h-7 md:w-7 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-foreground text-center mb-3">Learning & Growth</h3>
                <p className="text-foreground/70 text-sm md:text-base leading-relaxed text-center mb-6 flex-grow">
                  Access educational resources, skill-building programs, and personal development tools 
                  designed for justice-impacted individuals and families.
                </p>
                <Button asChild size="lg" className="w-full mt-auto h-11 md:h-12">
                  <Link to="/learn">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Explore Learning Resources
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>

              {/* Healing & Safety */}
              <div className="bg-background rounded-xl p-6 md:p-8 border shadow-lg hover:shadow-xl transition-all h-full flex flex-col min-h-[320px] md:min-h-[350px]">
                <div className="flex items-center gap-4 mb-6 justify-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-secondary rounded-xl flex items-center justify-center shadow-md">
                    <Shield className="h-6 w-6 md:h-7 md:w-7 text-secondary-foreground" />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-foreground text-center mb-3">Healing & Safety</h3>
                <p className="text-foreground/70 text-sm md:text-base leading-relaxed text-center mb-6 flex-grow">
                  Find trauma-informed support services, safety resources, and healing-centered 
                  approaches for survivors and their families.
                </p>
                <Button asChild size="lg" variant="outline" className="w-full mt-auto border-secondary text-secondary hover:bg-secondary/10 h-11 md:h-12">
                  <Link to="/victim-services">
                    <Shield className="h-4 w-4 mr-2" />
                    Access Healing Hub
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>

              {/* 24/7 AI + Human-Powered Guidance */}
              <div className="bg-background rounded-xl p-6 md:p-8 border shadow-lg hover:shadow-xl transition-all h-full flex flex-col min-h-[320px] md:min-h-[350px]">
                <div className="flex items-center gap-4 mb-6 justify-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-primary rounded-xl flex items-center justify-center shadow-md">
                    <Bot className="h-6 w-6 md:h-7 md:w-7 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-foreground text-center mb-3">
                  24/7 AI + Human-Powered Guidance
                </h3>
                <p className="text-foreground/70 text-sm md:text-base leading-relaxed text-center mb-6 flex-grow">
                  Trauma recovery, reentry support, and growth resources available whenever you need them. 
                  Technology enhances support, it never replaces human connection.
                </p>
                <Button 
                  size="lg" 
                  className="w-full mt-auto h-11 md:h-12"
                  onClick={() => setShowAIDiscovery(true)}
                >
                  <Bot className="h-4 w-4 mr-2" />
                  AI Resource Navigator
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              {/* Safe, Judgment-Free Community */}
              <div className="bg-background rounded-xl p-6 md:p-8 border shadow-lg hover:shadow-xl transition-all h-full flex flex-col min-h-[320px] md:min-h-[350px]">
                <div className="flex items-center gap-4 mb-6 justify-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-secondary rounded-xl flex items-center justify-center shadow-md">
                    <Users className="h-6 w-6 md:h-7 md:w-7 text-secondary-foreground" />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-foreground text-center mb-3">
                  Safe, Judgment-Free Community
                </h3>
                <p className="text-foreground/70 text-sm md:text-base leading-relaxed text-center mb-6 flex-grow">
                  Peer and professional support in an environment where you're understood, 
                  valued, and empowered to thrive on your own terms.
                </p>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full mt-auto border-secondary text-secondary hover:bg-secondary/10 h-11 md:h-12"
                  onClick={() => setShowCommunityApplication(true)}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Join Our Community
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
               </div>
             </div>
           </div>
         </section>

        {/* Call to Action */}
        <section className="scroll-mt-16 bg-gradient-to-br from-primary via-accent to-secondary text-primary-foreground rounded-2xl overflow-hidden shadow-2xl">
          <div className="px-8 py-24 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading text-4xl md:text-6xl font-bold mb-12">
                Don't Wait. Take the Next Step Today.
              </h2>
              <div className="space-y-8 text-lg md:text-xl leading-relaxed">
                <p className="text-primary-foreground/95 max-w-2xl mx-auto">
                  Whether you need immediate crisis support or are ready to begin your growth journey, 
                  we're here to help you move forward.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mt-12">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="flex-1 bg-white text-osu-scarlet hover:bg-white/90"
                  onClick={() => setShowCrisisAI(true)}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Get Help Now
                </Button>
                <Button asChild size="lg" className="bg-osu-gray hover:bg-osu-gray-dark text-white flex-1">
                  <Link to="/learn">
                    <Users className="h-5 w-5 mr-2" />
                    Join Our Community
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    {/* Crisis Support AI */}
    <CrisisSupportAI 
      isOpen={showCrisisAI} 
      onClose={() => setShowCrisisAI(false)} 
    />

    {/* AI Resource Discovery */}
    <AIResourceDiscovery 
      isOpen={showAIDiscovery} 
      onClose={() => setShowAIDiscovery(false)} 
    />

    {/* Community Application */}
    <CommunityApplication 
      isOpen={showCommunityApplication} 
      onClose={() => setShowCommunityApplication(false)} 
    />
    </>
  );
}