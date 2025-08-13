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
      content: "Hi! I'm here to help you find the right resources and support. I can help with reentry programs, mental health services, education grants, and more. What type of help are you looking for today?",
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
        <div className="flex items-center justify-between rounded-t-lg border-b bg-blue-600 p-4 text-white">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <div>
              <h3 className="font-semibold">Ohio Resource Navigator</h3>
              <p className="text-xs opacity-90">Personalized guidance for your situation</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded p-1 hover:bg-blue-700">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-lg p-3 ${m.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"}`}>
                <p className="text-sm">{m.content}</p>
                {m.type === "ai" && m.resources && m.resources.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs font-medium text-gray-600">Suggested Resources:</p>
                    {m.resources.map((r, idx) => (
                      <div key={idx} className="rounded border bg-white p-2 text-xs">
                        <div className="font-medium text-gray-900">{r.title}</div>
                        {r.phone && (
                          <a href={`tel:${r.phone}`} className="text-blue-600 hover:underline">
                            Call: {r.phone}
                          </a>
                        )}
                        {r.action && <div className="text-gray-600">{r.action}</div>}
                        {r.url && (
                          <Link to={r.url} className="text-blue-600 hover:underline">
                            Learn more →
                          </Link>
                        )}
                        {r.available && <div className="font-medium text-green-600">{r.available}</div>}
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
  const [activeSection, setActiveSection] = useState<string>("crisis");
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.title = "Get Help Now | Forward Focus Collective";
    const desc = "Immediate crisis support, comprehensive Ohio resources, and personalized guidance for justice-impacted individuals, families, and crime victims. 24/7 support available.";
    
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
    { id: "crisis", label: "🆘 Crisis Help", icon: Phone, color: "bg-red-500" },
    { id: "ohio-resources", label: "🏠 Ohio Resources", icon: Home, color: "bg-blue-500" },
    { id: "pathways", label: "🛤️ Choose Your Path", icon: ArrowRight, color: "bg-purple-500" },
    { id: "toolkit", label: "📧 Resource Toolkit", icon: CheckCircle, color: "bg-green-500" }
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
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-2 text-center font-medium">
        🆘 IMMEDIATE DANGER? CALL 911 NOW | Crisis Support: 988 | Text HOME to 741741
      </div>

      {/* Hero Section */}
      <header className="bg-gradient-to-b from-blue-50 to-white border-b">
        <div className="container py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get Help Now
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Immediate crisis support and comprehensive Ohio resources for justice-impacted individuals, families, and crime victims. 
              Find the help you need, when you need it most.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                24/7 Crisis Support
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                No Signup Required
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                AI-Powered Guidance
              </span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={() => scrollToSection('crisis')}
                size="lg"
                className="bg-red-600 hover:bg-red-700"
              >
                <Phone className="h-4 w-4 mr-2" />
                Crisis Contacts
              </Button>
              <Button 
                onClick={() => setShowAIAssistant(true)}
                variant="outline"
                size="lg"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <Bot className="h-4 w-4 mr-2" />
                Ask AI Assistant
              </Button>
              <Button 
                onClick={() => scrollToSection('ohio-resources')}
                variant="outline"
                size="lg"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                <Home className="h-4 w-4 mr-2" />
                Ohio Resources
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
        {/* Crisis Help Section */}
        <section id="crisis" className="py-12 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Need Help Right Now?</h2>
                  <p className="text-gray-600">24/7 crisis support available nationwide - you're not alone</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="font-semibold text-red-900 mb-3">Immediate Danger</h3>
                  <a href="tel:911" className="flex items-center gap-3 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    <Phone className="h-5 w-5" />
                    <span className="font-medium">Call 911 Now</span>
                  </a>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-3">Crisis Support Lines</h3>
                  <div className="space-y-3">
                    <a href="tel:988" className="flex items-center gap-3 p-2 hover:bg-blue-100 rounded transition-colors">
                      <Phone className="h-4 w-4 text-blue-600" />
                      <div className="text-sm">
                        <div className="font-medium">Call 988</div>
                        <div className="text-gray-600">Suicide & Crisis Lifeline - 24/7</div>
                      </div>
                    </a>
                    <a href="sms:741741?&body=HOME" className="flex items-center gap-3 p-2 hover:bg-blue-100 rounded transition-colors">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                      <div className="text-sm">
                        <div className="font-medium">Text HOME to 741741</div>
                        <div className="text-gray-600">Crisis Text Line - 24/7</div>
                      </div>
                    </a>
                    <a href="tel:211" className="flex items-center gap-3 p-2 hover:bg-blue-100 rounded transition-colors">
                      <Phone className="h-4 w-4 text-blue-600" />
                      <div className="text-sm">
                        <div className="font-medium">Call 211</div>
                        <div className="text-gray-600">General crisis support & resources</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Bot className="h-6 w-6 text-purple-600" />
                  <h3 className="font-semibold text-purple-900">Need Help Finding Resources?</h3>
                </div>
                <p className="text-purple-800 mb-4">
                  Our AI assistant is loaded with Ohio resources and can help you find exactly what you need based on your specific situation.
                </p>
                <Button onClick={() => setShowAIAssistant(true)} className="bg-purple-600 hover:bg-purple-700">
                  <Bot className="mr-2 h-4 w-4" />
                  Ask AI Assistant
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Ohio Resources Section */}
        <section id="ohio-resources" className="py-12">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Home className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Ohio Resources by Category</h2>
                  <p className="text-gray-600">Comprehensive directory organized for easy navigation</p>
                </div>
              </div>

              {/* Resource Categories */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="hover:border-blue-300 hover:bg-blue-50 transition-all">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Activity className="h-5 w-5 text-blue-600" />
                      Reentry Programs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 mb-3">Housing, employment, mental health, and transition support</p>
                    <div className="space-y-2 text-xs">
                      <div>• Relink.org - Free resource tool</div>
                      <div>• CAP4Kids - Document assistance</div>
                      <div>• Alvis Programs - Comprehensive support</div>
                      <div>• Community Transition Program</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:border-green-300 hover:bg-green-50 transition-all">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Heart className="h-5 w-5 text-green-600" />
                      Mental Health
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 mb-3">Counseling, support groups, and crisis intervention</p>
                    <div className="space-y-2 text-xs">
                      <div>• NAMI Franklin County - Free support</div>
                      <div>• Franklin County ADAMH - Sliding scale</div>
                      <div>• Healing Together - Family support</div>
                      <div>• Mindfulness programs</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:border-purple-300 hover:bg-purple-50 transition-all">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <GraduationCap className="h-5 w-5 text-purple-600" />
                      Education & Grants
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 mb-3">Scholarships and funding for justice-impacted families</p>
                    <div className="space-y-2 text-xs">
                      <div>• ScholarCHIPS - $3,500 + books</div>
                      <div>• Venus Morris Griffin - $10,000</div>
                      <div>• Transform Business - $1,000 grants</div>
                      <div>• Ohio Access to Justice</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:border-orange-300 hover:bg-orange-50 transition-all">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="h-5 w-5 text-orange-600" />
                      Life Coaching
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 mb-3">Personal development and goal achievement support</p>
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
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Franklin County Deep Dive
                </h3>
                <p className="text-blue-700 mb-4">
                  We've mapped comprehensive resources for Franklin County (Columbus area) with detailed program information, 
                  eligibility requirements, and application guidance.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-blue-900">🏠 Housing & Emergency</div>
                    <div className="text-blue-700">• CAP4Kids housing assistance</div>
                    <div className="text-blue-700">• Emergency shelter programs</div>
                  </div>
                  <div>
                    <div className="font-medium text-blue-900">💼 Employment & Training</div>
                    <div className="text-blue-700">• OhioMeansJobs career services</div>
                    <div className="text-blue-700">• Goodwill job readiness</div>
                  </div>
                  <div>
                    <div className="font-medium text-blue-900">🧠 Mental Health & Wellness</div>
                    <div className="text-blue-700">• 14 specialized programs</div>
                    <div className="text-blue-700">• Family support services</div>
                  </div>
                </div>
                <Button 
                  onClick={() => setShowAIAssistant(true)} 
                  className="mt-4 bg-blue-600 hover:bg-blue-700"
                >
                  <Bot className="mr-2 h-4 w-4" />
                  Get Personalized Franklin County Guide
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Choose Your Path Section */}
        <section id="pathways" className="py-12 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <ArrowRight className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Choose Your Path for Ongoing Support</h2>
                  <p className="text-gray-600">Different paths for different journeys</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 border-green-200 bg-green-50">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Users className="h-8 w-8 text-green-600" />
                      <div>
                        <CardTitle className="text-green-900">Justice-Impacted Individuals & Families</CardTitle>
                        <p className="text-green-700 text-sm">Reentry support, family resources, personal growth</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-green-800 mb-4">
                      Join our learning community for free education, peer support, and income-based life coaching. 
                      Designed specifically for justice-impacted individuals and families.
                    </p>
                    <ul className="space-y-2 text-sm text-green-700 mb-4">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        7 self-paced learning modules
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Peer support groups
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Income-based life coaching
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Application and resource guidance
                      </li>
                    </ul>
                    <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                      <Link to="/learn">
                        <Users className="h-4 w-4 mr-2" />
                        Join Learning Community
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-200 bg-purple-50">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Shield className="h-8 w-8 text-purple-600" />
                      <div>
                        <CardTitle className="text-purple-900">Crime Victims & Survivors</CardTitle>
                        <p className="text-purple-700 text-sm">Specialized trauma-informed support and resources</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-purple-800 mb-4">
                      Access our comprehensive victim services hub with specialized support, compensation programs, 
                      and trauma-informed personal coaching.
                    </p>
                    <ul className="space-y-2 text-sm text-purple-700 mb-4">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Crisis support and safety planning
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Compensation program guidance
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Legal rights information
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Trauma recovery resources
                      </li>
                    </ul>
                    <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                      <Link to="/victim-services">
                        <Shield className="h-4 w-4 mr-2" />
                        Access Victim Services
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-semibold text-yellow-800 mb-3">💡 Not Sure Which Path Is Right for You?</h3>
                <p className="text-yellow-700 mb-4">
                  Our AI assistant can help you determine the best resources and support path based on your specific situation and needs.
                </p>
                <Button 
                  onClick={() => setShowAIAssistant(true)} 
                  variant="outline" 
                  className="border-yellow-600 text-yellow-600 hover:bg-yellow-100"
                >
                  <Bot className="mr-2 h-4 w-4" />
                  Get Personalized Guidance
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Resource Toolkit Section */}
        <section id="toolkit" className="py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Get Your Complete Ohio Resource Toolkit</h2>
                  <p className="text-gray-600">Comprehensive guide with direct links and application tips</p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-800 mb-4">📧 What You'll Receive Instantly:</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <CheckCircle className="h-4 w-4" />
                    Complete Ohio resource directory (PDF)
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <CheckCircle className="h-4 w-4" />
                    Direct application links and contact info
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <CheckCircle className="h-4 w-4" />
                    Eligibility checklists for each program
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <CheckCircle className="h-4 w-4" />
                    Application tips and success strategies
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <CheckCircle className="h-4 w-4" />
                    Crisis contact quick reference card
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <CheckCircle className="h-4 w-4" />
                    First 30 days action plan
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
                  <Button type="submit" className="h-12 bg-green-600 hover:bg-green-700">
                    Send Toolkit
                  </Button>
                </form>

                <p className="text-xs text-green-600 mt-3">
                  ✨ Completely free • No spam • Unsubscribe anytime • Direct links included
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">You Don't Have to Navigate This Alone</h2>
              <p className="text-xl mb-8 opacity-90">
                Whether you need immediate crisis support, comprehensive resources, or ongoing guidance - 
                we're here to help you find the right path forward.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  onClick={() => scrollToSection('crisis')}
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  size="lg"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Get Crisis Help
                </Button>
                <Button 
                  onClick={() => setShowAIAssistant(true)}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  size="lg"
                >
                  <Bot className="h-4 w-4 mr-2" />
                  Ask AI Assistant
                </Button>
                <Button 
                  onClick={() => scrollToSection('ohio-resources')}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  size="lg"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Browse Resources
                </Button>
              </div>

              <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
                <div className="flex items-center justify-center gap-2 text-sm opacity-90">
                  <Shield className="h-4 w-4" />
                  Safe & confidential
                </div>
                <div className="flex items-center justify-center gap-2 text-sm opacity-90">
                  <Heart className="h-4 w-4" />
                  Trauma-informed approach
                </div>
                <div className="flex items-center justify-center gap-2 text-sm opacity-90">
                  <CheckCircle className="h-4 w-4" />
                  Always available
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