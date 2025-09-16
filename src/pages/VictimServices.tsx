import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ChevronRight,
  Phone,
  MessageSquare,
  Shield,
  Heart,
  Scale,
  DollarSign,
  Users,
  Bot,
  Calendar,
  CheckCircle,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  ExternalLink,
  LogIn,
  Eye,
  EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import SignupModal from "@/components/healing/SignupModal";
import VictimSupportAI from "@/components/ai/VictimSupportAI";
import diverseFamiliesImage from "@/assets/diverse-families-healing.jpg";
import healingCommunityImage from "@/assets/healing-community.jpg";

// SEO helpers
const ensureMeta = (name: string, content: string) => {
  let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const ensureCanonical = () => {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", window.location.href);
};


// Resource Card Component  
const ResourceCard = ({ resource, isPreview = false }: { resource: any; isPreview?: boolean }) => (
  <Card className="transition-all hover:shadow-lg duration-300 border-l-4 border-l-osu-scarlet shadow-md">
    <CardContent className="p-6">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-bold text-lg text-foreground">{resource.title}</h4>
          <p className="text-base text-foreground/80 mt-2">{resource.description}</p>
        </div>
        <Badge variant={
          resource.type === 'Government Resource' ? 'default' :
          resource.type === 'Crisis Support' ? 'destructive' :
          resource.type === 'Legal Aid' ? 'secondary' :
          'outline'
        } className="ml-3 font-medium bg-osu-scarlet text-white">
          {resource.type}
        </Badge>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {resource.url && (
            <Button asChild size="sm" className="shadow-sm bg-gradient-osu-accent text-white">
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit Resource
              </a>
            </Button>
          )}
          {resource.phone && (
            <Button asChild size="sm" variant="secondary" className="shadow-sm bg-osu-gray text-white hover:bg-osu-gray-dark">
              <a href={`tel:${resource.phone}`}>
                <Phone className="mr-2 h-4 w-4" />
                Call
              </a>
            </Button>
          )}
        </div>
        {resource.available && (
          <Badge variant="outline" className="text-xs font-medium border-osu-scarlet text-osu-scarlet-dark">
            {resource.available}
          </Badge>
        )}
      </div>
    </CardContent>
  </Card>
);

export default function VictimServices() {
  const [showVictimAI, setShowVictimAI] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  useEffect(() => {
    document.title = "Healing & Safety Hub | Forward Focus Elevation";
    ensureMeta("description", "Comprehensive support for crime victims: crisis intervention, advocacy, legal aid, and trauma-informed healing resources. Find immediate help and long-term recovery support.");
    ensureCanonical();

    // JSON-LD structured data
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Healing & Safety Hub",
      description: "Comprehensive support for crime victims: crisis intervention, advocacy, legal aid, and trauma-informed healing resources.",
      url: window.location.href,
      provider: {
        "@type": "Organization",
        name: "Forward Focus Elevation"
      }
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleSignup = () => {
    setIsSignedUp(true);
    toast({ title: "Welcome!", description: "You now have access to all resources and features." });
  };

  const supportPaths = [
    {
      icon: MessageSquare,
      title: "Crisis Intervention",
      description: "24/7 crisis support, safety planning, and immediate intervention services",
      color: "bg-red-50 border-red-200 text-red-800",
      resources: [
        { title: "National Domestic Violence Hotline", description: "24/7 confidential support for domestic violence survivors", type: "Crisis Support", phone: "1-800-799-7233", available: "24/7" },
        { title: "Crisis Text Line", description: "Free crisis support via text message", type: "Crisis Support", action: "Text HOME to 741741", available: "24/7" },
        { title: "National Suicide & Crisis Lifeline", description: "24/7 suicide prevention and crisis support", type: "Crisis Support", phone: "988", available: "24/7" },
        { title: "RAINN National Sexual Assault Hotline", description: "Confidential support for sexual assault survivors", type: "Crisis Support", phone: "1-800-656-4673", available: "24/7" }
      ]
    },
    {
      icon: Scale,
      title: "Legal Advocacy",
      description: "Navigate the legal system with victim-centered advocacy and support",
      color: "bg-blue-50 border-blue-200 text-blue-800",
      resources: [
        { title: "Legal Aid Society", description: "Free legal assistance for crime victims", type: "Legal Aid", url: "https://www.legalaid.org", phone: "1-800-LEGAL-AID" },
        { title: "Victim Rights Law Center", description: "Legal services for sexual assault survivors", type: "Legal Aid", url: "https://www.victimrights.org" },
        { title: "Court Advocacy Program", description: "Support navigating court proceedings", type: "Legal Aid", phone: "Local courthouse" }
      ]
    },
    {
      icon: DollarSign,
      title: "Financial Recovery",
      description: "Access compensation programs and financial assistance resources",
      color: "bg-green-50 border-green-200 text-green-800",
      resources: [
        { title: "Ohio Victim Compensation Program", description: "Financial assistance for crime-related expenses", type: "Government Resource", url: "https://www.ohioattorneygeneral.gov/Individuals-and-Families/Victims/Victims-Compensation-Application" },
        { title: "Federal Victim Compensation", description: "Information about federal compensation programs", type: "Government Resource", url: "https://ovc.ojp.gov/topics/victim-compensation" },
        { title: "Emergency Financial Assistance", description: "Immediate financial help for basic needs", type: "Financial Aid", phone: "211" }
      ]
    },
    {
      icon: Heart,
      title: "Healing & Wellness",
      description: "Trauma-informed therapy, support groups, and wellness programs",
      color: "bg-purple-50 border-purple-200 text-purple-800",
      resources: [
        { title: "Trauma Recovery Network", description: "Specialized trauma therapy and counseling", type: "Mental Health", url: "https://www.traumarecoverynetwork.org" },
        { title: "Support Groups for Survivors", description: "Peer support and group therapy sessions", type: "Mental Health", phone: "Local community center" },
        { title: "Mindfulness & Wellness Programs", description: "Holistic healing approaches and wellness resources", type: "Wellness", url: "https://www.mindfulness.org" }
      ]
    }
  ];

  return (
    <>
      <main id="main" className="min-h-screen">
        {/* Skip to content link */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg focus:font-medium"
        >
          Skip to main content
        </a>

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-heading text-6xl font-bold mb-8">Healing & Safety Hub</h1>
              <p className="text-2xl text-foreground/80 mb-12 leading-relaxed">
                You are not alone. Find immediate crisis support, legal advocacy, financial assistance, 
                and healing resources designed specifically for crime victims and survivors.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg" 
                  className="text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => setShowVictimAI(true)}
                >
                  <Bot className="mr-3 h-6 w-6" />
                  Get Personalized Help
                </Button>
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <a href="tel:988">
                    <Phone className="mr-3 h-6 w-6" />
                    Crisis Support: 988
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Community Visual Banner */}
        <section className="py-16">
          <div className="container">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={diverseFamiliesImage}
                alt="Diverse families healing together in supportive community environment"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 flex items-center">
                <div className="container">
                  <div className="max-w-2xl">
                    <h2 className="font-heading text-4xl font-bold text-white mb-4">
                      Healing happens in community
                    </h2>
                    <p className="text-xl text-white/90 leading-relaxed">
                      Access comprehensive support designed by survivors, for survivors. Every resource 
                      is trauma-informed and respects your journey to healing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support Path Cards */}
        <section id="main-content" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="font-heading text-5xl font-bold mb-6">Choose Your Support Path</h2>
              <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                Every survivor's journey is unique. Select the type of support that feels right 
                for where you are today.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {supportPaths.map((path, index) => {
                const IconComponent = path.icon;
                return (
                  <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg group cursor-pointer h-full flex flex-col">
                    <CardHeader className="text-center pb-4">
                      <div className={`inline-flex p-6 rounded-2xl ${path.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-10 w-10" />
                      </div>
                      <CardTitle className="text-2xl font-bold mb-3">{path.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {path.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-center">
                      <div className="space-y-3">
                        {path.resources.slice(0, 2).map((resource, resourceIndex) => (
                          <div key={resourceIndex} className="p-3 rounded-lg bg-muted/50 text-center">
                            <div className="font-semibold text-sm">{resource.title}</div>
                            <div className="text-xs text-foreground/70">{resource.description}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <div className="text-center mt-12">
              <Button 
                size="lg" 
                className="text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setShowSignupModal(true)}
              >
                Choose Your Support Path
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="font-heading text-5xl font-bold mb-8">You deserve support and healing</h2>
              <p className="text-xl mb-12 opacity-90 leading-relaxed">
                Take the first step toward recovery. Our AI assistant can help you find the right 
                resources, or connect with a real person who understands your journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg" 
                  variant="hero"
                  className="text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => setShowVictimAI(true)}
                >
                  <Bot className="mr-3 h-6 w-6" />
                  Open AI Assistant
                </Button>
                <Button 
                  size="lg" 
                  variant="hero"
                  className="text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => setShowSignupModal(true)}
                >
                  <Users className="mr-3 h-6 w-6" />
                  Join Our Community
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modals */}
      <VictimSupportAI isOpen={showVictimAI} onClose={() => setShowVictimAI(false)} />
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSignup={handleSignup}
      />
    </>
  );
}