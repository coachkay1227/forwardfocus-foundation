import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Phone, Bot, X, Send, AlertTriangle, CheckCircle, ArrowRight, 
  Shield, Heart, BookOpen, Users, GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

// AI Assistant Component
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
      content: "Welcome! I'm your AI Resource Navigator with access to comprehensive support services across all 88 Ohio counties. I specialize in crisis intervention, reentry support, mental health resources, educational opportunities, employment assistance, and victim services. I provide intelligent, personalized guidance to connect you with exactly what you need. What type of support would be most helpful for you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const getSuggestedResources = (q: string) => {
    const lower = q.toLowerCase();
    if (lower.includes("crisis") || lower.includes("emergency") || lower.includes("suicide")) {
      return [
        { title: "National Suicide & Crisis Lifeline", phone: "988", available: "24/7" },
        { title: "Crisis Text Line", action: "Text HOME to 741741", available: "24/7" },
        { title: "211 Ohio Crisis Support", phone: "211", available: "24/7" },
      ];
    }
    if (lower.includes("reentry") || lower.includes("prison") || lower.includes("jail") || lower.includes("formerly incarcerated")) {
      return [
        { title: "Ohio Reentry Resources", action: "State-coordinated reentry support programs" },
        { title: "Comprehensive Reentry Support", action: "Housing, employment, and education assistance" },
        { title: "Second Chance Programs", action: "Career training and placement services" },
      ];
    }
    if (lower.includes("mental health") || lower.includes("counseling") || lower.includes("therapy")) {
      return [
        { title: "Ohio Mental Health Services", action: "Statewide mental health resources and support" },
        { title: "Trauma-Informed Care", action: "Specialized counseling for justice-impacted individuals" },
        { title: "SAMHSA Helpline", phone: "1-800-662-4357", available: "24/7" },
      ];
    }
    if (lower.includes("education") || lower.includes("scholarship") || lower.includes("college")) {
      return [
        { title: "Justice-Impacted Scholarships", action: "Educational funding for individuals and families" },
        { title: "Second Chance Education Programs", action: "Certificate and degree programs" },
        { title: "Career Development Pathways", action: "Skills training and professional development" },
      ];
    }
    if (lower.includes("job") || lower.includes("employment") || lower.includes("work")) {
      return [
        { title: "Ohio Career Services", action: "Employment assistance and job training" },
        { title: "Second Chance Employment", action: "Fair-chance hiring partnerships" },
        { title: "Entrepreneurship Support", action: "Business development and mentorship" },
      ];
    }
    if (lower.includes("victim") || lower.includes("crime") || lower.includes("assault")) {
      return [
        { title: "Healing & Safety Hub", url: "/victim-services", action: "Specialized trauma-informed support" },
        { title: "National Domestic Violence Hotline", phone: "1-800-799-7233", available: "24/7" },
        { title: "Sexual Assault Hotline", phone: "1-800-656-4673", available: "24/7" },
      ];
    }
    return [
      { title: "211 Ohio", phone: "211", action: "Comprehensive resource navigation" },
      { title: "Forward Focus Community", url: "/learn", action: "Join our supportive learning community" },
    ];
  };

  const generateAIResponse = (q: string) => {
    const lower = q.toLowerCase();
    if (lower.includes("crisis") || lower.includes("emergency") || lower.includes("suicide")) {
      return "I understand you may be in crisis right now. Your safety is the top priority. If you're in immediate danger, please call 911. For 24/7 crisis support, call 988 or text HOME to 741741. I can help you find additional crisis resources in your area - what location would be most helpful?";
    }
    if (lower.includes("victim") || lower.includes("crime") || lower.includes("assault")) {
      return "I hear that you may be seeking support as a crime victim. We have a dedicated Healing & Safety Hub with specialized trauma-informed resources, compensation programs, and personal support services. Would you like me to direct you there, or are there specific services you're looking for right now?";
    }
    if (lower.includes("reentry") || lower.includes("prison") || lower.includes("jail") || lower.includes("formerly incarcerated")) {
      return "I can connect you with comprehensive reentry support! Our resources include housing assistance, employment programs, mental health services, and educational opportunities. Are you looking for immediate needs like housing and employment, or longer-term support like education and career development? What location in Ohio would be most helpful?";
    }
    if (lower.includes("mental health") || lower.includes("counseling") || lower.includes("therapy")) {
      return "Mental health support is incredibly important. I can help you find trauma-informed counseling, support groups, and crisis resources throughout Ohio. Are you looking for individual therapy, group support, or crisis intervention? I can also connect you with specialized programs designed for justice-impacted individuals and families.";
    }
    if (lower.includes("education") || lower.includes("scholarship") || lower.includes("college")) {
      return "There are excellent educational opportunities available! I can help you find scholarships specifically designed for justice-impacted individuals and families, career training programs, and educational pathways. Are you looking for yourself or a family member? What type of education or training interests you most?";
    }
    if (lower.includes("job") || lower.includes("employment") || lower.includes("work")) {
      return "Employment support is available throughout Ohio! I can help you find job training programs, career coaching, fair-chance employers, and professional development opportunities. Are you looking for immediate employment, skills training, or career advancement? What's your location and what type of work interests you?";
    }
    return "Welcome! I'm your Ohio Community Resource Navigator. I can help you access crisis support, reentry services, mental health resources, educational opportunities, employment assistance, victim services, and more. I have comprehensive knowledge of resources across all 88 Ohio counties. What type of support would be most helpful for you today?";
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
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/50 p-4">
      <div className="flex h-[600px] w-full max-w-md flex-col rounded-lg bg-card shadow-xl">
        <div className="flex items-center justify-between rounded-t-lg border-b bg-primary p-4 text-primary-foreground">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <div>
              <h3 className="font-semibold">AI Resource Navigator</h3>
              <p className="text-xs opacity-90">Intelligent guidance for Ohio resources</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded p-1 hover:bg-primary/80">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-lg p-3 ${m.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                <p className="text-sm">{m.content}</p>
                {m.type === "ai" && m.resources && m.resources.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs font-medium text-foreground/70">Suggested Resources:</p>
                    {m.resources.map((r, idx) => (
                      <div key={idx} className="rounded border bg-card p-2 text-xs">
                        <div className="font-medium text-foreground">{r.title}</div>
                        {r.phone && (
                          <a href={`tel:${r.phone}`} className="text-primary hover:underline">
                            Call: {r.phone}
                          </a>
                        )}
                        {r.action && <div className="text-muted-foreground">{r.action}</div>}
                        {r.url && (
                          <Link to={r.url} className="text-primary hover:underline">
                            Learn more →
                          </Link>
                        )}
                        {r.available && <div className="font-medium text-secondary">{r.available}</div>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-lg bg-muted p-3">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0.1s" }} />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What type of help do you need?"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend} size="sm">
              <Send className="mr-2 h-4 w-4" />
              Send
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Free guidance • Confidential • No judgment</p>
        </div>
      </div>
    </div>
  );
};

export default function GetHelpNow() {
  const [activeSection, setActiveSection] = useState<string>("crisis");
  const [showAIAssistant, setShowAIAssistant] = useState(false);

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
    { id: "ai-guide", label: "AI Guidance", icon: Bot },
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
      {/* Support Banner */}
      <div className="bg-destructive text-destructive-foreground py-3 text-center font-medium shadow-sm">
        <div className="container flex items-center justify-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          <span>Emergency? Call 911 | Crisis Support: 988 | Safe Text: HOME to 741741</span>
        </div>
      </div>

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b">
        <div className="container py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              Get Personalized Support
            </h1>
            <p className="text-2xl text-muted-foreground mb-8 leading-relaxed">
              Access intelligent AI guidance for crisis support, reentry services, mental health resources, 
              educational opportunities, and employment assistance across all 88 Ohio counties.
            </p>
            <div className="flex items-center justify-center gap-6 text-lg text-muted-foreground mb-10">
              <span className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-secondary" />
                24/7 AI Guidance
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-secondary" />
                Statewide Coverage
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-secondary" />
                Confidential Support
              </span>
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={() => setShowAIAssistant(true)}
                size="lg"
                variant="premium"
                className="h-16 px-12 text-xl"
              >
                <Bot className="h-6 w-6 mr-3" />
                Get Personalized Guidance
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Clean Navigation */}
      <nav className="bg-card border-b sticky top-[64px] z-40 shadow-sm">
        <div className="container py-4">
          <div className="grid grid-cols-3 gap-4">
            {navigationSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
                    activeSection === section.id 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-border hover:border-primary/30 hover:bg-primary/5'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="bg-muted/30">
        {/* Crisis Support Section */}
        <section id="crisis" className="py-16 bg-card">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-destructive rounded-xl flex items-center justify-center">
                  <Phone className="h-8 w-8 text-destructive-foreground" />
                </div>
                <div>
                  <h2 className="font-heading text-3xl font-bold text-foreground">Crisis Support</h2>
                  <p className="text-xl text-muted-foreground">Immediate help when you need it most</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-2 border-destructive">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-5 w-5" />
                      Emergency
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-muted-foreground">Life-threatening emergency</p>
                    <Button asChild variant="destructive" size="lg" className="w-full">
                      <a href="tel:911">Call 911 Now</a>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <Heart className="h-5 w-5" />
                      Crisis Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-muted-foreground">24/7 suicide & crisis lifeline</p>
                    <Button asChild variant="premium" size="lg" className="w-full">
                      <a href="tel:988">Call 988</a>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-secondary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-secondary">
                      <Shield className="h-5 w-5" />
                      Local Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-muted-foreground">Find local services & support</p>
                    <Button asChild variant="secondary" size="lg" className="w-full">
                      <a href="tel:211">Call 211</a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* AI Guidance Section */}
        <section id="ai-guide" className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-8">
                <Bot className="h-12 w-12 text-primary-foreground" />
              </div>
              <h2 className="font-heading text-4xl font-bold text-foreground mb-6">
                AI-Powered Resource Navigation
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                Our intelligent AI assistant knows about resources across all 88 Ohio counties. Get personalized guidance 
                for reentry support, mental health services, educational opportunities, employment assistance, victim services, 
                and crisis intervention - all through simple conversation.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="p-6 rounded-lg border bg-card">
                  <Shield className="h-8 w-8 text-primary mb-4 mx-auto" />
                  <h3 className="font-semibold text-foreground mb-2">Crisis Response</h3>
                  <p className="text-sm text-muted-foreground">Immediate crisis resources and emergency support</p>
                </div>
                <div className="p-6 rounded-lg border bg-card">
                  <ArrowRight className="h-8 w-8 text-primary mb-4 mx-auto" />
                  <h3 className="font-semibold text-foreground mb-2">Reentry Support</h3>
                  <p className="text-sm text-muted-foreground">Housing, employment, and reintegration assistance</p>
                </div>
                <div className="p-6 rounded-lg border bg-card">
                  <Heart className="h-8 w-8 text-primary mb-4 mx-auto" />
                  <h3 className="font-semibold text-foreground mb-2">Mental Health</h3>
                  <p className="text-sm text-muted-foreground">Trauma-informed care and counseling services</p>
                </div>
                <div className="p-6 rounded-lg border bg-card">
                  <GraduationCap className="h-8 w-8 text-primary mb-4 mx-auto" />
                  <h3 className="font-semibold text-foreground mb-2">Education & Jobs</h3>
                  <p className="text-sm text-muted-foreground">Scholarships, training, and fair-chance employment</p>
                </div>
              </div>

              <div className="bg-card border rounded-lg p-8 mb-8">
                <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
                  How It Works
                </h3>
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">1</div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Describe Your Situation</h4>
                      <p className="text-muted-foreground text-sm">Tell our AI what type of support you need</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">2</div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Get Personalized Resources</h4>
                      <p className="text-muted-foreground text-sm">Receive targeted recommendations for your location</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">3</div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Take Action</h4>
                      <p className="text-muted-foreground text-sm">Connect directly with services and next steps</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => setShowAIAssistant(true)}
                size="lg"
                variant="premium"
                className="h-14 px-8 text-lg"
              >
                <Bot className="h-5 w-5 mr-2" />
                Start AI Guidance
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">Free to use • Available 24/7 • Completely confidential</p>
            </div>
          </div>
        </section>

        {/* Growth Pathways Section */}
        <section id="pathways" className="py-16 bg-card">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-heading text-4xl font-bold text-foreground mb-6">
                  Your Growth Pathways
                </h2>
                <p className="text-xl text-muted-foreground">
                  Explore specialized programs designed for your journey forward
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 hover:border-primary/50 transition-all">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mb-4">
                      <BookOpen className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl text-foreground">Learning & Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      Access educational programs, skill development, career training, and personal growth 
                      opportunities with supportive community and AI learning companion.
                    </p>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-secondary" />
                        <span>Educational scholarships and funding</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-secondary" />
                        <span>Career certification programs</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-secondary" />
                        <span>AI learning companion</span>
                      </div>
                    </div>
                    <Button asChild variant="premium" className="w-full">
                      <Link to="/learn">Explore Learning Programs</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-primary/50 transition-all">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl flex items-center justify-center mb-4">
                      <Heart className="h-8 w-8 text-secondary-foreground" />
                    </div>
                    <CardTitle className="text-2xl text-foreground">Healing & Safety</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      Specialized trauma-informed support for crime victims, including compensation programs, 
                      counseling services, and safety planning with dignity and respect.
                    </p>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-secondary" />
                        <span>Victim compensation programs</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-secondary" />
                        <span>Trauma-informed counseling</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-secondary" />
                        <span>Safety planning support</span>
                      </div>
                    </div>
                    <Button asChild variant="secondary" className="w-full">
                      <Link to="/victim-services">Access Healing Hub</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Get personalized guidance and support tailored to your unique situation and goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => setShowAIAssistant(true)}
                  size="lg"
                  variant="premium"
                  className="h-14 px-8 text-lg"
                >
                  <Bot className="h-5 w-5 mr-2" />
                  Get AI Guidance
                </Button>
                <Button asChild size="lg" variant="secondary" className="h-14 px-8 text-lg">
                  <Link to="/auth">
                    <Users className="h-5 w-5 mr-2" />
                    Join Community
                  </Link>
                </Button>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                All services are free, confidential, and provided with dignity and respect.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* AI Assistant Modal */}
      <AIAssistant 
        isOpen={showAIAssistant} 
        onClose={() => setShowAIAssistant(false)} 
      />
    </>
  );
}