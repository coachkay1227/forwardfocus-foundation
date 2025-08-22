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
  X,
  Send,
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
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import SignupModal from "@/components/healing/SignupModal";
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

// AI Assistant (client-only, simulated)
const AIAssistant = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [messages, setMessages] = useState<Array<{
    id: number;
    type: "ai" | "user";
    content: string;
    timestamp: Date;
    resources?: Array<{ title: string; phone?: string; url?: string; action?: string; available?: string }>;
  }>>([
    {
      id: 1,
      type: "ai",
      content:
        "Hi, I'm here to help you navigate resources and support. I'm trained to understand the unique challenges faced by crime victims. What can I help you find today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const getSuggestedResources = (q: string) => {
    const lower = q.toLowerCase();
    if (lower.includes("crisis") || lower.includes("emergency") || lower.includes("danger")) {
      return [
        { title: "National Domestic Violence Hotline", phone: "1-800-799-7233", available: "24/7" },
        { title: "Crisis Text Line", action: "Text HOME to 741741", available: "24/7" },
        { title: "National Suicide & Crisis Lifeline", phone: "988", available: "24/7" },
      ];
    }
    if (lower.includes("compensation") || lower.includes("financial") || lower.includes("money")) {
      return [
        {
          title: "Ohio Victim Compensation",
          url: "https://www.ohioattorneygeneral.gov/Individuals-and-Families/Victims/Victims-Compensation-Application",
        },
        { title: "Federal Victim Compensation Info", url: "https://ovc.ojp.gov/topics/victim-compensation" },
      ];
    }
    return [];
  };

  const generateAIResponse = (q: string) => {
    const lower = q.toLowerCase();
    if (lower.includes("crisis") || lower.includes("emergency") || lower.includes("danger")) {
      return "I understand you may be in a crisis situation. Your safety is the top priority. If you're in immediate danger, please call 911. For domestic violence support, call 1-800-799-7233. For crisis text support, text HOME to 741741. Would you like me to help you find additional crisis resources?";
    }
    if (lower.includes("compensation") || lower.includes("money") || lower.includes("financial")) {
      return "There are compensation programs to help with medical bills, lost wages, counseling, and more. I can help you find your state's program and guide you through the application. What expenses do you need help with?";
    }
    if (lower.includes("legal") || lower.includes("rights") || lower.includes("lawyer")) {
      return "You have important legal rights as a crime victim, including the right to be informed and participate in proceedings. I can help you understand your rights and find free legal aid in your area. What specific legal questions do you have?";
    }
    if (lower.includes("counseling") || lower.includes("therapy") || lower.includes("trauma")) {
      return "Healing from trauma takes time, and professional support can help. I can help you find trauma-informed therapists and support groups in your area. Are you looking for individual therapy, group support, or something specific?";
    }
    return "I hear you, and I want to help you find the right resources. Can you share a bit more? For example: crisis support, legal help, counseling, compensation, or safety planning?";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { id: Date.now(), type: "user" as const, content: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const reply = generateAIResponse(userMessage.content);
      const resources = getSuggestedResources(userMessage.content);
      const aiMessage = { id: Date.now() + 1, type: "ai" as const, content: reply, timestamp: new Date(), resources };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 900);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/50 p-4">
      <div className="flex h-[600px] w-full max-w-md flex-col rounded-xl bg-white shadow-2xl border-0">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-xl border-b bg-primary p-6 text-primary-foreground">
          <div className="flex items-center gap-3">
            <Bot className="h-6 w-6" />
            <div>
              <h3 className="font-bold text-lg">Hi, I'm here to help you find resources and next steps that fit your unique journey. Let's do this together.</h3>
              <p className="text-sm opacity-90">Trauma-informed healing companion</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="rounded-lg p-2 hover:bg-primary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-label="Close assistant"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-xl p-4 ${
                m.type === "user" 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "bg-card text-foreground shadow-sm border"
              }`}>
                <p className="text-sm leading-relaxed">{m.content}</p>
                {m.type === "ai" && m.resources && m.resources.length > 0 && (
                  <div className="mt-4 space-y-3">
                    <p className="text-xs font-semibold text-foreground/80">Suggested Resources:</p>
                    {m.resources.map((r, idx) => (
                      <div key={idx} className="rounded-lg border bg-background p-3 text-xs">
                        <div className="font-semibold text-foreground">{r.title}</div>
                        {r.phone && (
                          <a 
                            href={`tel:${r.phone}`} 
                            className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/20 rounded"
                          >
                            {r.phone}
                          </a>
                        )}
                        {r.action && <div className="text-foreground/70">{r.action}</div>}
                        {r.url && (
                          <a 
                            href={r.url} 
                            target="_blank" 
                            rel="noopener" 
                            className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/20 rounded"
                          >
                            Learn more →
                          </a>
                        )}
                        {r.available && <div className="font-semibold text-green-600">Available {r.available}</div>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-xl bg-card p-4 shadow-sm border">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-primary" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: "0.1s" }} />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="border-t bg-muted/50 p-6">
          <p className="mb-4 text-sm font-semibold text-foreground">Quick options to get started:</p>
          <div className="mb-6 grid gap-2">
            <button
              onClick={() => setInput("Help me find financial aid")}
              className="rounded-lg bg-secondary p-3 text-left text-sm text-secondary-foreground hover:bg-secondary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/20"
            >
              "Help me find financial aid"
            </button>
            <button
              onClick={() => setInput("I need a recovery plan")}
              className="rounded-lg bg-secondary p-3 text-left text-sm text-secondary-foreground hover:bg-secondary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/20"
            >
              "I need a recovery plan"
            </button>
            <button
              onClick={() => setInput("I don't know where to start")}
              className="rounded-lg bg-secondary p-3 text-left text-sm text-secondary-foreground hover:bg-secondary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/20"
            >
              "I don't know where to start"
            </button>
            <button
              onClick={() => setInput("Connect me to emotional support")}
              className="rounded-lg bg-secondary p-3 text-left text-sm text-secondary-foreground hover:bg-secondary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/20"
            >
              "Connect me to emotional support"
            </button>
          </div>
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Or type your own question..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend} size="sm" className="shadow-md">
              <Send className="mr-2 h-4 w-4" />
              Send
            </Button>
          </div>
          <p className="mt-3 text-xs text-foreground/60">This conversation is private and confidential</p>
        </div>
      </div>
    </div>
  );
};

// Resource Card Component  
const ResourceCard = ({ resource, isPreview = false }: { resource: any; isPreview?: boolean }) => (
  <Card className="transition-all hover:shadow-lg duration-300 border-0 shadow-md">
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
        } className="ml-3 font-medium">
          {resource.type}
        </Badge>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {resource.url && (
            <Button asChild size="sm" className="shadow-sm">
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit Resource
              </a>
            </Button>
          )}
          {resource.phone && (
            <Button asChild size="sm" variant="secondary" className="shadow-sm">
              <a href={`tel:${resource.phone}`}>
                <Phone className="mr-2 h-4 w-4" />
                Call
              </a>
            </Button>
          )}
        </div>
        {resource.available && (
          <Badge variant="outline" className="text-xs font-medium border-green-200 text-green-700">
            {resource.available}
          </Badge>
        )}
      </div>
    </CardContent>
  </Card>
);

export default function VictimServices() {
  const [showAIAssistant, setShowAIAssistant] = useState(false);
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
                  onClick={() => setShowAIAssistant(true)}
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
                  <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg group cursor-pointer">
                    <CardHeader className="text-center pb-4">
                      <div className={`inline-flex p-6 rounded-2xl ${path.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-10 w-10" />
                      </div>
                      <CardTitle className="text-2xl font-bold mb-3">{path.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {path.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {path.resources.slice(0, 2).map((resource, resourceIndex) => (
                          <div key={resourceIndex} className="p-3 rounded-lg bg-muted/50">
                            <div className="font-semibold text-sm">{resource.title}</div>
                            <div className="text-xs text-foreground/70">{resource.description}</div>
                          </div>
                        ))}
                        <Button 
                          variant="outline" 
                          className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          onClick={() => setShowSignupModal(true)}
                        >
                          View All Resources
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
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
                  onClick={() => setShowAIAssistant(true)}
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
      <AIAssistant isOpen={showAIAssistant} onClose={() => setShowAIAssistant(false)} />
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSignup={handleSignup}
      />
    </>
  );
}