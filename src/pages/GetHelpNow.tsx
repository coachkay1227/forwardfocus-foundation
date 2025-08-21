import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronRight, Phone, MessageSquare, Home, Briefcase, Scale, Activity, 
  CheckCircle, Shield, Heart, ArrowRight, Clock, Users, AlertTriangle,
  Bot, X, Send, MapPin, DollarSign, BookOpen, GraduationCap, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
      content: "Welcome! I'm your personal guide to opportunities and resources in Ohio. Whether you're seeking growth, education, fresh starts, or community support, I'm here to help you find the right path forward. What would you like to explore today?",
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
        { title: "NAMI Franklin County", phone: "614-221-6462", available: "Crisis support" },
      ];
    }
    if (lower.includes("reentry") || lower.includes("prison") || lower.includes("jail") || lower.includes("formerly incarcerated")) {
      return [
        { title: "Relink.org", url: "https://relink.org", action: "Free reentry resource tool" },
        { title: "CAP4Kids", action: "Document assistance, job training, housing support" },
        { title: "Alvis Reentry Programs", action: "Comprehensive reentry support in Ohio" },
      ];
    }
    if (lower.includes("mental health") || lower.includes("counseling") || lower.includes("therapy")) {
      return [
        { title: "NAMI Franklin County", action: "Free mental health resources and support groups" },
        { title: "Franklin County ADAMH", action: "Sliding scale mental health services" },
        { title: "SAMHSA Helpline", phone: "1-800-662-4357", available: "24/7" },
      ];
    }
    if (lower.includes("education") || lower.includes("scholarship") || lower.includes("college")) {
      return [
        { title: "ScholarCHIPS", action: "$3,500 tuition + books for children of incarcerated parents" },
        { title: "Venus Morris Griffin Scholarship", action: "$10,000 annual for students with incarcerated parents" },
        { title: "Ohio Access to Justice Foundation", action: "Legal aid funding" },
      ];
    }
    if (lower.includes("job") || lower.includes("employment") || lower.includes("work")) {
      return [
        { title: "OhioMeansJobs", action: "Free career coaching and job placement" },
        { title: "Goodwill Columbus", action: "Free life coaching for self-sufficiency" },
        { title: "Ohio DRC Workforce Development", action: "Free vocational training" },
      ];
    }
    if (lower.includes("victim") || lower.includes("crime") || lower.includes("assault")) {
      return [
        { title: "Victim Services Hub", url: "/victim-services", action: "Specialized support for crime victims" },
        { title: "National Domestic Violence Hotline", phone: "1-800-799-7233", available: "24/7" },
        { title: "Sexual Assault Hotline", phone: "1-800-656-4673", available: "24/7" },
      ];
    }
    return [
      { title: "211 Ohio", phone: "211", action: "General resource navigation" },
      { title: "Forward Focus Community", url: "/learn", action: "Join our learning community for ongoing support" },
    ];
  };

  const generateAIResponse = (q: string) => {
    const lower = q.toLowerCase();
    if (lower.includes("crisis") || lower.includes("emergency") || lower.includes("suicide")) {
      return "I understand you may be in crisis. Your safety is the top priority. If you're in immediate danger, please call 911. For crisis support, call 988 or text HOME to 741741. Would you like me to help you find additional crisis resources in your area?";
    }
    if (lower.includes("victim") || lower.includes("crime") || lower.includes("assault")) {
      return "I hear that you may be a crime victim seeking support. We have a dedicated Victim Services hub with specialized trauma-informed resources, compensation programs, and personal support. Would you like me to direct you there, or are there specific victim services you're looking for?";
    }
    if (lower.includes("reentry") || lower.includes("prison") || lower.includes("jail") || lower.includes("formerly incarcerated")) {
      return "I can help you find reentry resources! We have comprehensive programs for housing, employment, mental health, and education. Are you looking for immediate needs like housing and jobs, or longer-term support like education and coaching? Our learning community also provides ongoing peer support.";
    }
    if (lower.includes("mental health") || lower.includes("counseling") || lower.includes("therapy")) {
      return "Mental health support is so important. I can help you find free and low-cost counseling, support groups, and crisis resources in Ohio. Are you looking for individual therapy, group support, or crisis intervention? I can also connect you with specialized programs for justice-impacted individuals.";
    }
    if (lower.includes("education") || lower.includes("scholarship") || lower.includes("college")) {
      return "There are great education opportunities available! I can help you find scholarships specifically for justice-impacted individuals and families, including some that provide $3,500-$10,000 annually. Are you looking for yourself or a family member? What level of education interests you?";
    }
    if (lower.includes("job") || lower.includes("employment") || lower.includes("work")) {
      return "Employment support is available! I can help you find job training, career coaching, and employment programs that work with justice-impacted individuals. Are you looking for immediate employment, job training, or career development? Some programs also offer entrepreneurship support.";
    }
    return "I'm here to help you find the right resources! I can assist with reentry support, mental health services, education/scholarships, employment, crisis support, and more. What type of help would be most useful for you right now?";
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
      <div className="flex h-[600px] w-full max-w-md flex-col rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between rounded-t-lg border-b bg-primary p-4 text-primary-foreground">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <div>
              <h3 className="font-semibold">Ohio Resource Navigator</h3>
              <p className="text-xs opacity-90">Personalized guidance for your situation</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded p-1 hover:bg-primary/80">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-lg p-3 ${m.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                <p className="text-sm">{m.content}</p>
                {m.type === "ai" && m.resources && m.resources.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs font-medium text-gray-600">Suggested Resources:</p>
                    {m.resources.map((r, idx) => (
                      <div key={idx} className="rounded border bg-white p-2 text-xs">
                        <div className="font-medium text-gray-900">{r.title}</div>
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
                        {r.available && <div className="font-medium text-accent">{r.available}</div>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-lg bg-gray-100 p-3">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0.1s" }} />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0.2s" }} />
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
          <p className="mt-2 text-xs text-gray-500">💙 Free guidance • Confidential • No judgment</p>
        </div>
      </div>
    </div>
  );
};

export default function GetHelpNow() {
  const [activeSection, setActiveSection] = useState<string>("support");
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.title = "Start Your Journey Forward | Forward Focus Elevation";
    const desc = "Empowering resources, personalized guidance, and community support to help you rise above challenges and achieve your highest potential. Ohio's premier platform for forward-thinking growth.";
    
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
    { id: "support", label: "🤝 Immediate Support", icon: Phone, color: "bg-primary" },
    { id: "ohio-resources", label: "🏠 Ohio Opportunities", icon: Home, color: "bg-warm-blue" },
    { id: "pathways", label: "🚀 Growth Pathways", icon: ArrowRight, color: "bg-accent" },
    { id: "toolkit", label: "📧 Success Toolkit", icon: CheckCircle, color: "bg-secondary" }
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = /.+@.+\..+/.test(email);
    if (!isValid) {
      toast({ 
        title: "Please enter a valid email", 
        description: "We'll send your complete Ohio resource toolkit instantly." 
      });
      return;
    }
    toast({ 
      title: "Resource toolkit sent!", 
      description: "Check your inbox for your complete Ohio resource guide with direct links and application tips." 
    });
    setEmail("");
  };

  return (
    <>
      {/* Support Banner */}
      <div className="bg-primary text-primary-foreground py-2 text-center font-medium">
        🚨 Emergency? Call 911 | Crisis Support: 988 | Safe Text: HOME to 741741
      </div>

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-cream via-white to-primary/5 border-b">
        <div className="container py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Start Your Journey Forward
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Access empowering resources, personalized guidance, and community support to rise above challenges and achieve your highest potential. 
              Your path to growth starts here.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-secondary" />
                24/7 Support Available
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-secondary" />
                No Barriers to Access
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-secondary" />
                AI-Powered Guidance
              </span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={() => scrollToSection('support')}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                <Phone className="h-4 w-4 mr-2" />
                Get Immediate Support
              </Button>
              <Button 
                onClick={() => setShowAIAssistant(true)}
                variant="outline"
                size="lg"
                className="border-accent text-accent hover:bg-accent/10"
              >
                <Bot className="h-4 w-4 mr-2" />
                Start with AI Guide
              </Button>
              <Button 
                onClick={() => scrollToSection('ohio-resources')}
                variant="outline"
                size="lg"
                className="border-secondary text-secondary hover:bg-secondary/10"
              >
                <Home className="h-4 w-4 mr-2" />
                Explore Opportunities
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Smart Navigation Hub */}
      <nav className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {navigationSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                    activeSection === section.id 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium hidden sm:block">{section.label}</span>
                  <ChevronRight className="h-3 w-3 ml-auto" />
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="bg-gray-50">
        {/* Immediate Support Section */}
        <section id="support" className="py-12 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Need Support Right Now?</h2>
                  <p className="text-muted-foreground">24/7 support available nationwide - you're never alone in this journey</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="font-semibold text-red-900 mb-3">Emergency Situations</h3>
                  <a href="tel:911" className="flex items-center gap-3 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    <Phone className="h-5 w-5" />
                    <span className="font-medium">Call 911 Now</span>
                  </a>
                </div>

                <div className="bg-warm-blue/10 border border-warm-blue/30 rounded-lg p-6">
                  <h3 className="font-semibold text-warm-blue mb-3">Crisis Support Lines</h3>
                  <div className="space-y-3">
                    <a href="tel:988" className="flex items-center gap-3 p-2 hover:bg-warm-blue/10 rounded transition-colors">
                      <Phone className="h-4 w-4 text-warm-blue" />
                      <div className="text-sm">
                        <div className="font-medium">Call 988</div>
                        <div className="text-muted-foreground">Suicide & Crisis Lifeline - 24/7</div>
                      </div>
                    </a>
                    <a href="sms:741741?&body=HOME" className="flex items-center gap-3 p-2 hover:bg-warm-blue/10 rounded transition-colors">
                      <MessageSquare className="h-4 w-4 text-warm-blue" />
                      <div className="text-sm">
                        <div className="font-medium">Text HOME to 741741</div>
                        <div className="text-muted-foreground">Crisis Text Line - 24/7</div>
                      </div>
                    </a>
                    <a href="tel:211" className="flex items-center gap-3 p-2 hover:bg-warm-blue/10 rounded transition-colors">
                      <Phone className="h-4 w-4 text-warm-blue" />
                      <div className="text-sm">
                        <div className="font-medium">Call 211</div>
                        <div className="text-muted-foreground">Resource navigation & support</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-accent/10 border border-accent/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Bot className="h-6 w-6 text-accent" />
                  <h3 className="font-semibold text-accent">Ready to Explore Your Options?</h3>
                </div>
                <p className="text-accent/80 mb-4">
                  Our AI guide is loaded with Ohio resources and can help you discover opportunities based on your unique situation and goals.
                </p>
                <Button onClick={() => setShowAIAssistant(true)} className="bg-accent hover:bg-accent/90">
                  <Bot className="mr-2 h-4 w-4" />
                  Start Your Journey with AI
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Ohio Opportunities Section */}
        <section id="ohio-resources" className="py-12">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-warm-blue rounded-lg flex items-center justify-center">
                  <Home className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Discover Ohio Opportunities by Focus Area</h2>
                  <p className="text-muted-foreground">Comprehensive pathways organized to accelerate your progress</p>
                </div>
              </div>

              {/* Resource Categories */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="hover:border-warm-blue/30 hover:bg-warm-blue/5 transition-all">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Activity className="h-5 w-5 text-warm-blue" />
                      Fresh Start Programs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-3">Housing, career development, wellness, and transition support</p>
                    <div className="space-y-2 text-xs">
                      <div>• Relink.org - Comprehensive resource tool</div>
                      <div>• CAP4Kids - Document & housing assistance</div>
                      <div>• Alvis Programs - Holistic reentry support</div>
                      <div>• Community Transition Program</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:border-secondary/30 hover:bg-secondary/5 transition-all">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Heart className="h-5 w-5 text-secondary" />
                      Wellness & Growth
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-3">Mental wellness, counseling, and personal development</p>
                    <div className="space-y-2 text-xs">
                      <div>• NAMI Franklin County - Peer support</div>
                      <div>• Franklin County ADAMH - Sliding scale</div>
                      <div>• Healing Together - Family wellness</div>
                      <div>• Mindfulness & resilience programs</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:border-accent/30 hover:bg-accent/5 transition-all">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <GraduationCap className="h-5 w-5 text-accent" />
                      Education & Scholarships
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-3">Scholarships and funding for justice-impacted families</p>
                    <div className="space-y-2 text-xs">
                      <div>• ScholarCHIPS - $3,500 + books</div>
                      <div>• Venus Morris Griffin - $10,000 annually</div>
                      <div>• Transform Business - $1,000 grants</div>
                      <div>• Ohio Access to Justice Foundation</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:border-primary/30 hover:bg-primary/5 transition-all">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="h-5 w-5 text-primary" />
                      Personal Elevation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-3">Life coaching and goal achievement support</p>
                    <div className="space-y-2 text-xs">
                      <div>• Goodwill Columbus - Free coaching</div>
                      <div>• OhioMeansJobs - Career development</div>
                      <div>• Franklin County Community Coach</div>
                      <div>• Forward Focus - Income-based</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* County Focus */}
              <div className="bg-warm-blue/10 border border-warm-blue/30 rounded-lg p-6">
                <h3 className="font-semibold text-warm-blue mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Franklin County Deep Dive
                </h3>
                <p className="text-warm-blue/80 mb-4">
                  We've curated comprehensive opportunities for Franklin County (Columbus area) with detailed program information, 
                  eligibility requirements, and success strategies.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-warm-blue">🏠 Housing & Stability</div>
                    <div className="text-warm-blue/80">• CAP4Kids housing assistance</div>
                    <div className="text-warm-blue/80">• Emergency shelter programs</div>
                  </div>
                  <div>
                    <div className="font-medium text-warm-blue">💼 Career & Training</div>
                    <div className="text-warm-blue/80">• OhioMeansJobs career services</div>
                    <div className="text-warm-blue/80">• Goodwill job readiness</div>
                  </div>
                  <div>
                    <div className="font-medium text-warm-blue">🧠 Wellness & Growth</div>
                    <div className="text-warm-blue/80">• 14 specialized programs</div>
                    <div className="text-warm-blue/80">• Family support services</div>
                  </div>
                </div>
                <Button 
                  onClick={() => setShowAIAssistant(true)} 
                  className="mt-4 bg-warm-blue hover:bg-warm-blue/90"
                >
                  <Bot className="mr-2 h-4 w-4" />
                  Get Your Personalized Franklin County Guide
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Growth Pathways Section */}
        <section id="pathways" className="py-12 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <ArrowRight className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Choose Your Growth Pathway</h2>
                  <p className="text-muted-foreground">Tailored journeys designed for lasting transformation</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 border-secondary/30 bg-secondary/5">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Users className="h-8 w-8 text-secondary" />
                      <div>
                        <CardTitle className="text-foreground">Justice-Impacted Individuals & Families</CardTitle>
                        <p className="text-muted-foreground text-sm">Fresh start support, family resources, personal elevation</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Join our empowering learning community for education, peer connections, and income-based life coaching. 
                      Designed to elevate justice-impacted individuals and families toward their highest potential.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-secondary" />
                        7 transformational learning modules
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-secondary" />
                        Peer elevation groups
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-secondary" />
                        Income-based personal coaching
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-secondary" />
                        Opportunity navigation & strategy
                      </li>
                    </ul>
                    <Button asChild className="w-full bg-secondary hover:bg-secondary/90">
                      <Link to="/learn">
                        <Users className="h-4 w-4 mr-2" />
                        Start Your Growth Journey
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-warm-blue/30 bg-warm-blue/5">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Shield className="h-8 w-8 text-warm-blue" />
                      <div>
                        <CardTitle className="text-foreground">Survivors & Victim Service Seekers</CardTitle>
                        <p className="text-muted-foreground text-sm">Specialized trauma-informed support and empowerment</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Access our comprehensive survivor services hub with specialized empowerment programs, compensation guidance, 
                      and trauma-informed personal coaching designed to help you reclaim your power.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-warm-blue" />
                        Crisis support & safety planning
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-warm-blue" />
                        Compensation program navigation
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-warm-blue" />
                        Rights advocacy & information
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-warm-blue" />
                        Healing & resilience resources
                      </li>
                    </ul>
                    <Button asChild className="w-full bg-warm-blue hover:bg-warm-blue/90">
                      <Link to="/victim-services">
                        <Shield className="h-4 w-4 mr-2" />
                        Access Survivor Services
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 bg-cream/50 border border-cream rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-3">💡 Uncertain Which Path Fits Your Vision?</h3>
                <p className="text-muted-foreground mb-4">
                  Our AI guide can help you discover the optimal resources and growth pathway aligned with your unique situation, goals, and aspirations.
                </p>
                <Button 
                  onClick={() => setShowAIAssistant(true)} 
                  variant="outline" 
                  className="border-accent text-accent hover:bg-accent/10"
                >
                  <Bot className="mr-2 h-4 w-4" />
                  Discover Your Optimal Path
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Success Toolkit Section */}
        <section id="toolkit" className="py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Get Your Ohio Success Toolkit</h2>
                  <p className="text-muted-foreground">Comprehensive guide with direct access and strategic tips</p>
                </div>
              </div>

              <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-6">
                <h3 className="font-semibold text-secondary mb-4">📧 What You'll Receive Instantly:</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-secondary/80">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    Complete Ohio opportunity directory (PDF)
                  </div>
                  <div className="flex items-center gap-2 text-sm text-secondary/80">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    Direct application links & contact info
                  </div>
                  <div className="flex items-center gap-2 text-sm text-secondary/80">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    Eligibility & readiness checklists
                  </div>
                  <div className="flex items-center gap-2 text-sm text-secondary/80">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    Application success strategies
                  </div>
                  <div className="flex items-center gap-2 text-sm text-secondary/80">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    Emergency support quick reference
                  </div>
                  <div className="flex items-center gap-2 text-sm text-secondary/80">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    Your first 30 days elevation plan
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your-email@example.com"
                    className="h-12 flex-1"
                    required
                  />
                  <Button type="submit" className="h-12 bg-secondary hover:bg-secondary/90">
                    Send My Toolkit
                  </Button>
                </form>

                <p className="text-xs text-secondary/80 mt-3">
                  ✨ Completely free • No spam • Unsubscribe anytime • Direct access included
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Elevation Call to Action */}
        <section className="py-16 bg-gradient-to-br from-primary via-primary/90 to-warm-blue text-primary-foreground">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Your Journey Forward Starts Here</h2>
              <p className="text-xl mb-8 opacity-90">
                Whether you need immediate support, transformational resources, or ongoing empowerment - 
                we're here to help you elevate to your highest potential.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  onClick={() => scrollToSection('support')}
                  className="bg-white text-primary hover:bg-cream"
                  size="lg"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Get Immediate Support
                </Button>
                <Button 
                  onClick={() => setShowAIAssistant(true)}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  size="lg"
                >
                  <Bot className="h-4 w-4 mr-2" />
                  Start with AI Guide
                </Button>
                <Button 
                  onClick={() => scrollToSection('ohio-resources')}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  size="lg"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Explore Opportunities
                </Button>
              </div>

              <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
                <div className="flex items-center justify-center gap-2 text-sm opacity-90">
                  <Shield className="h-4 w-4" />
                  Safe & confidential
                </div>
                <div className="flex items-center justify-center gap-2 text-sm opacity-90">
                  <Heart className="h-4 w-4" />
                  Empowerment-focused approach
                </div>
                <div className="flex items-center justify-center gap-2 text-sm opacity-90">
                  <CheckCircle className="h-4 w-4" />
                  Always accessible
                </div>
              </div>
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