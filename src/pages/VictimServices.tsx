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
      <div className="flex h-[600px] w-full max-w-md flex-col rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-lg border-b bg-primary p-4 text-primary-foreground">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <div>
              <h3 className="font-semibold">Hi, I'm here to help you find resources and next steps that fit your unique journey. Let's do this together.</h3>
              <p className="text-xs opacity-90">Trauma-informed healing companion</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded p-1 hover:bg-primary/80">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
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
                            {r.phone}
                          </a>
                        )}
                        {r.action && <div className="text-muted-foreground">{r.action}</div>}
                        {r.url && (
                          <a href={r.url} target="_blank" rel="noopener" className="text-primary hover:underline">
                            Learn more →
                          </a>
                        )}
                        {r.available && <div className="font-medium text-green-600">Available {r.available}</div>}
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

        {/* Quick Actions */}
        <div className="border-t bg-muted/50 p-4">
          <p className="mb-3 text-sm font-medium text-foreground">Quick options to get started:</p>
          <div className="mb-4 grid gap-2">
            <button
              onClick={() => setInput("Help me find financial aid")}
              className="rounded bg-accent p-2 text-left text-sm text-accent-foreground hover:bg-accent/80"
            >
              "Help me find financial aid"
            </button>
            <button
              onClick={() => setInput("I need a recovery plan")}
              className="rounded bg-accent p-2 text-left text-sm text-accent-foreground hover:bg-accent/80"
            >
              "I need a recovery plan"
            </button>
            <button
              onClick={() => setInput("I don't know where to start")}
              className="rounded bg-accent p-2 text-left text-sm text-accent-foreground hover:bg-accent/80"
            >
              "I don't know where to start"
            </button>
            <button
              onClick={() => setInput("Connect me to emotional support")}
              className="rounded bg-accent p-2 text-left text-sm text-accent-foreground hover:bg-accent/80"
            >
              "Connect me to emotional support"
            </button>
          </div>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Or type your own question..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend} size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Send className="mr-2 h-4 w-4" />
              Send
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">💚 This conversation is private and confidential</p>
        </div>
      </div>
    </div>
  );
};

// Coaching Inquiry (client-only)
const CoachingInquiry = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    incomeRange: "",
    goals: "",
    urgency: "",
    preferredContact: "email",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Coaching inquiry submitted",
      description: "We'll reach out within 24 hours to schedule your consultation.",
    });
    onClose();
    setFormData({ name: "", email: "", phone: "", incomeRange: "", goals: "", urgency: "", preferredContact: "email" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl">
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Trauma-Informed Life Coaching</h3>
              <p className="text-gray-600">Income-based pricing • Compassionate support</p>
            </div>
            <button onClick={onClose} className="rounded p-2 hover:bg-gray-100">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Pricing Tiers */}
          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border bg-green-50 p-4">
              <h4 className="font-semibold text-green-800">Community Support</h4>
              <p className="text-2xl font-bold text-green-600">$25-50</p>
              <p className="mb-3 text-sm text-gray-600">Under $30k income</p>
              <ul className="space-y-1 text-xs">
                <li>• 60-minute sessions</li>
                <li>• Resource navigation</li>
                <li>• Goal setting support</li>
                <li>• Crisis support</li>
              </ul>
            </div>

            <div className="rounded-lg border bg-blue-50 p-4">
              <h4 className="font-semibold text-blue-800">Growth Partnership</h4>
              <p className="text-2xl font-bold text-blue-600">$75-125</p>
              <p className="mb-3 text-sm text-gray-600">$30k-60k income</p>
              <ul className="space-y-1 text-xs">
                <li>• 90-minute sessions</li>
                <li>• Action planning</li>
                <li>• Resource advocacy</li>
                <li>• Text check-ins</li>
              </ul>
            </div>

            <div className="rounded-lg border bg-purple-50 p-4">
              <h4 className="font-semibold text-purple-800">Transformation</h4>
              <p className="text-2xl font-bold text-purple-600">$150-200</p>
              <p className="mb-3 text-sm text-gray-600">$60k+ income</p>
              <ul className="space-y-1 text-xs">
                <li>• 2-hour intensives</li>
                <li>• Complete life mapping</li>
                <li>• Network connections</li>
                <li>• 24/7 crisis support</li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Name</label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Phone (optional)</label>
                <Input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Income Range</label>
                <select
                  className="w-full rounded border p-2"
                  value={formData.incomeRange}
                  onChange={(e) => setFormData({ ...formData, incomeRange: e.target.value })}
                  required
                >
                  <option value="">Select range</option>
                  <option value="under-30k">Under $30k - Community Support ($25-50)</option>
                  <option value="30k-60k">$30k-60k - Growth Partnership ($75-125)</option>
                  <option value="over-60k">$60k+ - Transformation ($150-200)</option>
                  <option value="hardship">Financial hardship - Scholarship needed</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">What would you like coaching support with?</label>
              <Textarea
                value={formData.goals}
                onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                placeholder="For example: healing from trauma, rebuilding relationships, career goals, financial stability, personal growth..."
                required
                rows={3}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Timeline</label>
              <select
                className="w-full rounded border p-2"
                value={formData.urgency}
                onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                required
              >
                <option value="">When would you like to start?</option>
                <option value="asap">As soon as possible (within 1 week)</option>
                <option value="soon">Soon (within 2-3 weeks)</option>
                <option value="flexible">Flexible (within a month)</option>
                <option value="exploring">Just exploring options</option>
              </select>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-sm font-medium">Preferred contact:</span>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="email"
                  checked={formData.preferredContact === "email"}
                  onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                />
                Email
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="phone"
                  checked={formData.preferredContact === "phone"}
                  onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                />
                Phone
              </label>
            </div>

            <div className="rounded-lg bg-purple-50 p-4">
              <p className="text-sm text-purple-800">
                <Heart className="mr-2 inline h-4 w-4" />
                <strong>Our commitment:</strong> All coaching is trauma-informed, judgment-free, and designed to honor your pace and privacy. Payment plans and some scholarship spots available for financial hardship.
              </p>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1">
                <Calendar className="mr-2 h-4 w-4" />
                Request Consultation
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Resource Data and Components
const resourceSections = [
  {
    id: "financial-help",
    title: "Get Financial Compensation",
    description: "Federal and state programs to help with expenses from crime",
    icon: DollarSign,
    color: "secondary",
    expandable: true,
    preview: [
      { title: "Ohio Crime Victim Compensation", description: "State application for compensation", type: "Government Resource" },
      { title: "Federal Victim Compensation Info", description: "National compensation programs", type: "Government Resource" },
      { title: "Medical Expenses Coverage", description: "Help with medical bills and therapy", type: "Financial Aid" }
    ],
    resources: [
      {
        title: "Office for Victims of Crime",
        description: "Federal resource for victim compensation programs across all states",
        url: "https://ovc.ojp.gov/topics/victim-compensation",
        type: "Government Resource",
        available: "24/7"
      },
      {
        title: "VOCA Victim Compensation Directory",
        description: "Directory of state victim compensation programs",
        url: "https://ovc.ojp.gov/states",
        type: "Government Resource",
        available: "24/7"
      },
      {
        title: "Ohio Crime Victim Compensation",
        description: "Application for Ohio state victim compensation program",
        url: "https://www.ohioattorneygeneral.gov/Individuals-and-Families/Victims/Victims-Compensation-Application",
        type: "State Resource",
        available: "Business Hours"
      },
      {
        title: "Federal Crime Victim Rights",
        description: "Information about federal rights and compensation",
        url: "https://www.justice.gov/usao/resources/crime-victims-rights",
        type: "Government Resource",
        available: "24/7"
      }
    ]
  },
  {
    id: "legal-rights",
    title: "Know Your Rights",
    description: "Understand legal protections and find free legal aid",
    icon: Scale,
    color: "primary",
    expandable: true,
    preview: [
      { title: "Federal Victim Rights", description: "Your legal protections under federal law", type: "Legal Resource" },
      { title: "Legal Aid Locator", description: "Find free legal help in your area", type: "Legal Aid" },
      { title: "Victim Impact Statements", description: "How to make your voice heard in court", type: "Court Resource" }
    ],
    resources: [
      {
        title: "Federal Victim Rights",
        description: "Comprehensive guide to federal victim rights and protections",
        url: "https://www.justice.gov/usao/resources/crime-victims-rights",
        type: "Legal Resource",
        available: "24/7"
      },
      {
        title: "Crime Victims' Rights Act (CVRA)",
        description: "Federal law establishing rights for crime victims in federal cases",
        url: "https://www.justice.gov/criminal/vns/crime-victims-rights-act-cvra",
        type: "Legal Resource",
        available: "24/7"
      },
      {
        title: "Legal Aid Locator",
        description: "Find free and low-cost legal services in your area",
        url: "https://www.lsc.gov/about-lsc/what-legal-aid/find-legal-aid",
        type: "Legal Aid",
        available: "Business Hours"
      },
      {
        title: "Victim Impact Statements",
        description: "Resources for preparing and delivering victim impact statements",
        url: "https://ovc.ojp.gov/topics/victim-impact-statements",
        type: "Court Resource",
        available: "24/7"
      }
    ]
  },
  {
    id: "healing-recovery",
    title: "Trauma Recovery",
    description: "Find mental health resources and trauma-informed care",
    icon: Heart,
    color: "accent",
    expandable: true,
    preview: [
      { title: "SAMHSA National Helpline", description: "24/7 mental health and substance abuse help", type: "Crisis Support" },
      { title: "Trauma Recovery Network", description: "Specialized trauma therapy resources", type: "Therapy" },
      { title: "National Child Traumatic Stress Network", description: "Resources for trauma in children", type: "Specialized Care" }
    ],
    resources: [
      {
        title: "SAMHSA National Helpline",
        description: "24/7 treatment referral and information service for mental health and substance use disorders",
        url: "https://www.samhsa.gov/find-help/national-helpline",
        phone: "1-800-662-4357",
        type: "Crisis Support",
        available: "24/7"
      },
      {
        title: "Trauma Recovery Network",
        description: "Network providing pro bono and reduced-fee trauma therapy",
        url: "https://www.emdrhap.org/content/training/trn/",
        type: "Therapy",
        available: "Varies by Location"
      },
      {
        title: "National Child Traumatic Stress Network",
        description: "Resources and treatments for children who have experienced trauma",
        url: "https://www.nctsn.org/",
        type: "Specialized Care",
        available: "24/7"
      },
      {
        title: "International Society for Traumatic Stress Studies",
        description: "Research-based resources for trauma treatment and recovery",
        url: "https://www.istss.org/",
        type: "Research Resource",
        available: "24/7"
      }
    ]
  },
  {
    id: "safety-planning",
    title: "Safety Planning",
    description: "Plan for safety with trusted tools and guides",
    icon: Shield,
    color: "secondary",
    expandable: true,
    preview: [
      { title: "Personal Safety Planning", description: "Create a personalized safety plan", type: "Safety Tool" },
      { title: "Technology Safety", description: "Protect yourself online and with devices", type: "Digital Safety" },
      { title: "Stalking Prevention", description: "Resources for stalking victims", type: "Specialized Safety" }
    ],
    resources: [
      {
        title: "Personal Safety Planning",
        description: "Interactive tools to create a personalized safety plan for various situations",
        url: "https://www.thehotline.org/plan-for-safety/",
        type: "Safety Tool",
        available: "24/7"
      },
      {
        title: "Technology Safety",
        description: "Resources for digital privacy, tech abuse, and online safety",
        url: "https://www.techsafety.org/",
        type: "Digital Safety",
        available: "24/7"
      },
      {
        title: "Stalking Prevention",
        description: "Comprehensive resources for stalking victims and safety planning",
        url: "https://www.stalkingprevention.org/",
        type: "Specialized Safety",
        available: "24/7"
      },
      {
        title: "Legal Protection Orders",
        description: "Information about restraining orders and legal protections by state",
        url: "https://www.womenslaw.org/",
        type: "Legal Protection",
        available: "24/7"
      }
    ]
  },
  {
    id: "specialized-support",
    title: "Specialized Support",
    description: "Find organizations tailored to your specific situation",
    icon: Users,
    color: "accent",
    expandable: true,
    preview: [
      { title: "Domestic Violence Coalition", description: "Specialized domestic violence support", type: "DV Support" },
      { title: "Sexual Assault Network", description: "RAINN and sexual assault resources", type: "SA Support" },
      { title: "Human Trafficking Resources", description: "Support for trafficking survivors", type: "HT Support" }
    ],
    resources: [
      {
        title: "National Coalition Against Domestic Violence",
        description: "Comprehensive resources and advocacy for domestic violence survivors",
        url: "https://ncadv.org/",
        type: "DV Support",
        available: "24/7"
      },
      {
        title: "RAINN - National Sexual Assault Network",
        description: "Largest anti-sexual violence organization with hotline and resources",
        url: "https://www.rainn.org/",
        phone: "1-800-656-4673",
        type: "SA Support",
        available: "24/7"
      },
      {
        title: "Polaris Project - Human Trafficking",
        description: "Leading organization fighting human trafficking with survivor services",
        url: "https://polarisproject.org/",
        type: "HT Support",
        available: "24/7"
      },
      {
        title: "National Child Welfare Information Gateway",
        description: "Resources for child abuse survivors and child welfare services",
        url: "https://www.childwelfare.gov/",
        type: "Child Protection",
        available: "24/7"
      },
      {
        title: "National Center on Elder Abuse",
        description: "Resources and support for elder abuse victims",
        url: "https://ncea.acl.gov/",
        type: "Elder Protection",
        available: "Business Hours"
      },
      {
        title: "Anti-Violence Project (LGBTQ+)",
        description: "Support for LGBTQ+ survivors of violence and harassment",
        url: "https://avp.org/",
        type: "LGBTQ+ Support",
        available: "24/7"
      },
      {
        title: "Legal Aid at Work - Immigrant Victims",
        description: "Legal support for immigrant crime victims and workers",
        url: "https://legalaidatwork.org/",
        type: "Immigration Support",
        available: "Business Hours"
      }
    ]
  }
];

// Sign In Component
const SignInModal = ({ isOpen, onClose, onSignIn }: { isOpen: boolean; onClose: () => void; onSignIn: (data: { email: string; password: string }) => void }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn(formData);
    onClose();
    setFormData({ email: "", password: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Welcome Back</h3>
              <p className="text-gray-600">Sign in to access your personalized resources</p>
            </div>
            <button onClick={onClose} className="rounded p-2 hover:bg-gray-100">
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <Input 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                required 
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Password</label>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  value={formData.password} 
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account? <button onClick={() => { onClose(); }} className="text-primary hover:underline">Sign up here</button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Resource Card Component  
const ResourceCard = ({ resource, isPreview = false }: { resource: any; isPreview?: boolean }) => (
  <Card className="transition-all hover:shadow-md">
    <CardContent className="p-4">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-medium text-card-foreground">{resource.title}</h4>
          <p className="text-sm text-muted-foreground">{resource.description}</p>
        </div>
        <span className={`ml-2 rounded-full px-2 py-1 text-xs font-medium ${
          resource.type === 'Government Resource' ? 'bg-blue-100 text-blue-800' :
          resource.type === 'Crisis Support' ? 'bg-red-100 text-red-800' :
          resource.type === 'Legal Aid' ? 'bg-purple-100 text-purple-800' :
          'bg-green-100 text-green-800'
        }`}>
          {resource.type}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {resource.url && (
            <Button asChild size="sm" className="h-8">
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1 h-3 w-3" />
                Visit Resource
              </a>
            </Button>
          )}
          {resource.phone && (
            <Button asChild size="sm" variant="outline" className="h-8">
              <a href={`tel:${resource.phone}`}>
                <Phone className="mr-1 h-3 w-3" />
                Call
              </a>
            </Button>
          )}
        </div>
        {resource.available && (
          <span className="text-xs text-green-600 font-medium">
            {resource.available}
          </span>
        )}
      </div>
    </CardContent>
  </Card>
);

export default function VictimServices() {
  const [activeSection, setActiveSection] = useState<string>("support-tiles");
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showCoachingInquiry, setShowCoachingInquiry] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  useEffect(() => {
    document.title = "Healing & Safety Hub | Forward Focus Elevation";
    ensureMeta(
      "description",
      "Your personalized healing and safety hub. Compassionate, trauma-informed support built for survivors of crime and violence. Confidential tools, personalized guidance, and community support."
    );
    ensureCanonical();
  }, []);

  const handleTileClick = (requiresAuth: boolean = false) => {
    if (requiresAuth && !isSignedUp) {
      setShowSignupModal(true);
    }
  };

  const handleSignup = (data: { name: string; email: string }) => {
    setIsSignedUp(true);
    toast({
      title: "Welcome to your Healing & Safety Hub!",
      description: "Your account has been created. You now have access to all personalized resources."
    });
  };

  const handleSignIn = (data: { email: string; password: string }) => {
    setIsSignedUp(true);
    toast({
      title: "Welcome back!",
      description: "You're now signed in and can access all your saved resources."
    });
  };

  const supportTiles = [
    {
      id: "financial-help",
      title: "Financial Help",
      description: "Learn how to access compensation, medical bill relief, and emergency assistance.",
      icon: DollarSign,
      buttonText: "Get Financial Support",
      requiresAuth: true,
    },
    {
      id: "know-rights",
      title: "Know Your Rights", 
      description: "Find your legal protections and understand what justice means for you.",
      icon: Scale,
      buttonText: "See Legal Support Options",
      requiresAuth: true,
    },
    {
      id: "healing-recovery",
      title: "Healing & Recovery",
      description: "Explore mental health, coaching, and trauma recovery tailored to your needs.",
      icon: Heart, 
      buttonText: "Start Recovery Plan",
      requiresAuth: true,
    },
    {
      id: "safety-planning",
      title: "Safety Planning",
      description: "Protect yourself with tools, checklists, and secure personal plans.",
      icon: Shield,
      buttonText: "Create My Safety Plan", 
      requiresAuth: true,
    },
    {
      id: "specialized-support", 
      title: "Specialized Support",
      description: "Connect to organizations based on your specific identity or need.",
      icon: Users,
      buttonText: "Explore Custom Support",
      requiresAuth: true,
    },
    {
      id: "ai-assistant",
      title: "Not Sure Where to Start?",
      description: "Let our AI assistant walk you through options that fit your situation.",
      icon: HelpCircle,
      buttonText: "Ask AI Assistant", 
      requiresAuth: false,
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleTileAction = (tileId: string, requiresAuth: boolean) => {
    if (requiresAuth && !isSignedUp) {
      setShowSignupModal(true);
      return;
    }

    // Show signup prompt for certain actions
    const showSignupPrompt = () => {
      toast({
        title: "Want to save your plan or come back later?",
        description: "Sign up for a free account to personalize your support.",
        action: (
          <Button onClick={() => setShowSignupModal(true)} size="sm">
            Sign Up Free
          </Button>
        ),
      });
    };

    if (tileId === "ai-assistant") {
      setShowAIAssistant(true);
    } else if (tileId === "financial-help") {
      scrollToSection("financial-help");
      if (!isSignedUp) showSignupPrompt();
    } else if (tileId === "know-rights") {
      scrollToSection("legal-rights");
      if (!isSignedUp) showSignupPrompt();
    } else if (tileId === "healing-recovery") {
      scrollToSection("healing-recovery");
      if (!isSignedUp) showSignupPrompt();
    } else if (tileId === "safety-planning") {
      scrollToSection("safety-planning");
      if (!isSignedUp) showSignupPrompt();
    } else if (tileId === "specialized-support") {
      scrollToSection("specialized-support");
      if (!isSignedUp) showSignupPrompt();
    }
  };

  return (
    <>
      {/* Emergency Banner */}
      <div className="bg-primary py-2 text-center font-medium text-primary-foreground">
        🆘 IMMEDIATE DANGER? CALL 911 NOW | Domestic Violence: 1-800-799-7233 | Crisis Text: 741741
      </div>

      {/* Hero */}
      <header className="border-b bg-gradient-to-b from-accent/20 to-background">
        <div className="container py-12 md:py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-4 font-heading text-4xl font-bold text-foreground md:text-5xl">Your Healing & Safety Hub</h1>
            <p className="mb-6 text-xl text-muted-foreground">
              Compassionate, trauma-informed support built for survivors of crime and violence. Confidential tools, personalized guidance, and your community — all in one place.
            </p>
            <div className="mb-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" /> Free Support
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" /> No Judgment
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" /> Privacy Protected
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" /> Always Available
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={() => setShowAIAssistant(true)} className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Bot className="mr-2 h-4 w-4" /> Ask AI Assistant
              </Button>
              <Button onClick={() => handleTileClick(true)} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Heart className="mr-2 h-4 w-4" /> Start Personal Recovery Plan
              </Button>
              <Button onClick={() => document.getElementById('crisis')?.scrollIntoView({ behavior: 'smooth' })} variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <Phone className="mr-2 h-4 w-4" /> Crisis Resources
              </Button>
            </div>

            {/* Auth Actions */}
            <div className="mt-6 flex items-center justify-center gap-4 text-sm">
              {isSignedUp ? (
                <span className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  Signed in - Access all resources below
                </span>
              ) : (
                <>
                  <Button onClick={() => setShowSignupModal(true)} variant="link" className="p-0 h-auto text-primary hover:underline">
                    Create free account
                  </Button>
                  <span className="text-muted-foreground">|</span>
                  <Button onClick={() => setShowSignInModal(true)} variant="link" className="p-0 h-auto text-primary hover:underline">
                    Already a member? Sign in
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Support Path Tiles */}
      <section id="support-tiles" className="py-16 bg-background">
        <div className="container">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-heading text-3xl font-bold text-foreground">Choose Your Support Path</h2>
              <p className="text-lg text-muted-foreground">Select the area where you need help most. We'll guide you to the right resources.</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {supportTiles.map((tile) => {
                const Icon = tile.icon;
                return (
                  <div
                    key={tile.id}
                    className="group relative rounded-lg border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="mb-6 flex items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-3 font-semibold text-card-foreground">{tile.title}</h3>
                        <p className="text-sm text-muted-foreground">{tile.description}</p>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => handleTileAction(tile.id, tile.requiresAuth)}
                      className="w-full justify-between bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <span>{tile.buttonText}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Diverse Visual Banner */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="relative overflow-hidden rounded-lg">
                <img 
                  src={diverseFamiliesImage} 
                  alt="Diverse families healing together showing resilience and strength" 
                  className="h-64 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-lg font-medium">You're not alone</p>
                  <p className="text-sm opacity-90">Strength comes from community</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg">
                <img 
                  src={healingCommunityImage} 
                  alt="People engaged in healing activities showing community support and recovery" 
                  className="h-64 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-lg font-medium">Your healing matters</p>
                  <p className="text-sm opacity-90">Recovery is possible</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="bg-muted/20">
        {/* Crisis Section */}
        <section id="crisis" className="bg-card py-16 pt-12">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Need Help Right Now?</h2>
                  <p className="text-gray-600">24/7 crisis support available nationwide - you're not alone</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-red-200 bg-red-50 p-6">
                  <h3 className="mb-3 font-semibold text-red-900">Immediate Danger</h3>
                  <div className="space-y-2">
                    <a href="tel:911" className="flex items-center gap-3 rounded-lg bg-red-600 p-3 font-medium text-white transition-colors hover:bg-red-700">
                      <Phone className="h-5 w-5" />
                      <span>Call 911 Now</span>
                    </a>
                  </div>
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                  <h3 className="mb-3 font-semibold text-blue-900">Crisis Support</h3>
                  <div className="space-y-3">
                    <a href="tel:1-800-799-7233" className="flex items-center gap-3 rounded p-2 transition-colors hover:bg-blue-100">
                      <Phone className="h-4 w-4 text-blue-600" />
                      <div className="text-sm">
                        <div className="font-medium">Domestic Violence Hotline</div>
                        <div className="text-gray-600">1-800-799-7233</div>
                      </div>
                    </a>
                    <a href="tel:1-800-656-4673" className="flex items-center gap-3 rounded p-2 transition-colors hover:bg-blue-100">
                      <Phone className="h-4 w-4 text-blue-600" />
                      <div className="text-sm">
                        <div className="font-medium">Sexual Assault Hotline</div>
                        <div className="text-gray-600">1-800-656-4673</div>
                      </div>
                    </a>
                    <a href="sms:741741?&body=HOME" className="flex items-center gap-3 rounded p-2 transition-colors hover:bg-blue-100">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                      <div className="text-sm">
                        <div className="font-medium">Crisis Text Line</div>
                        <div className="text-gray-600">Text HOME to 741741</div>
                      </div>
                    </a>
                    <a href="tel:988" className="flex items-center gap-3 rounded p-2 transition-colors hover:bg-blue-100">
                      <Phone className="h-4 w-4 text-blue-600" />
                      <div className="text-sm">
                        <div className="font-medium">Suicide Prevention</div>
                        <div className="text-gray-600">988</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-lg border border-accent/20 bg-accent/10 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Bot className="h-6 w-6 text-accent" />
                  <h3 className="font-semibold text-card-foreground">Need Help Finding Resources?</h3>
                </div>
                <p className="mb-4 text-muted-foreground">
                  Our AI assistant is trained to understand the unique challenges faced by crime victims. Get personalized resource recommendations and guidance 24/7.
                </p>
                <Button onClick={() => setShowAIAssistant(true)} className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Bot className="mr-2 h-4 w-4" /> Ask AI Assistant
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Collapsible Resource Hub */}
        <section className="py-16 pt-12">
          <div className="container">
            <div className="mx-auto max-w-6xl">
              <div className="mb-8 text-center">
                <h2 className="mb-4 font-heading text-3xl font-bold text-foreground">Your Resource Hub</h2>
                <p className="text-lg text-muted-foreground">
                  Organized, trusted resources for your healing journey. {!isSignedUp && "Sign up to unlock personalized features."}
                </p>
              </div>

              <div className="mb-6 rounded-lg border bg-card p-6">
                <h3 className="mb-4 font-semibold text-accent">✨ What You Can Get Help With:</h3>
                <div className="grid gap-4 text-sm md:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Medical expenses
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Counseling/therapy
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Lost wages
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Funeral costs
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Relocation & safety
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Medical equipment
                  </div>
                </div>
              </div>

              <Accordion type="multiple" value={expandedSections} onValueChange={setExpandedSections} className="space-y-4">
                {resourceSections.map((section) => {
                  const Icon = section.icon;
                  const isExpanded = expandedSections.includes(section.id);
                  const showPreview = !isExpanded && !isSignedUp;
                  const resourcesToShow = showPreview ? section.preview : section.resources;

                  return (
                    <AccordionItem key={section.id} value={section.id} className="border rounded-lg bg-card">
                      <AccordionTrigger 
                        className="px-6 py-4 hover:no-underline hover:bg-muted/50 rounded-t-lg data-[state=open]:rounded-b-none"
                        id={section.id}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-${section.color}/10`}>
                            <Icon className={`h-6 w-6 text-${section.color}`} />
                          </div>
                          <div className="text-left">
                            <h3 className="font-semibold text-card-foreground">{section.title}</h3>
                            <p className="text-sm text-muted-foreground">{section.description}</p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      
                      <AccordionContent className="px-6 pb-6">
                        <div className="space-y-4">
                          {showPreview && (
                            <div className="mb-4 rounded-lg border border-orange-200 bg-orange-50 p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-orange-800">Preview - {resourcesToShow.length} resources shown</p>
                                  <p className="text-sm text-orange-600">Sign up to see all {section.resources.length} resources and save your favorites</p>
                                </div>
                                <Button onClick={() => setShowSignupModal(true)} size="sm" className="bg-accent text-accent-foreground">
                                  Sign Up Free
                                </Button>
                              </div>
                            </div>
                          )}
                          
                          <div className="grid gap-4 md:grid-cols-2">
                            {resourcesToShow.map((resource, index) => (
                              <ResourceCard key={index} resource={resource} isPreview={showPreview} />
                            ))}
                          </div>
                          
                          {!isSignedUp && isExpanded && section.resources.length > section.preview.length && (
                            <div className="mt-4 rounded-lg border border-accent/20 bg-accent/10 p-4 text-center">
                              <p className="mb-2 font-medium text-accent">Want to see {section.resources.length - section.preview.length} more resources?</p>
                              <Button onClick={() => setShowSignupModal(true)} size="sm" className="bg-accent text-accent-foreground">
                                Sign Up Free - It's Quick!
                              </Button>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 bg-muted/50">
          <div className="container">
            <div className="mx-auto max-w-4xl rounded-lg border bg-card p-8 text-center shadow-lg">
              <h2 className="mb-3 text-2xl font-semibold text-card-foreground">Need a Personal Guide?</h2>
              <p className="mb-6 text-lg text-muted-foreground">
                You don't have to go through this alone. Talk to a real coach or let our digital assistant guide your first step.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button onClick={() => setShowAIAssistant(true)} className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Bot className="mr-2 h-4 w-4" /> Open Assistant
                </Button>
                <Button onClick={() => setShowCoachingInquiry(true)} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Calendar className="mr-2 h-4 w-4" /> Request a Coach
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modals */}
      <AIAssistant isOpen={showAIAssistant} onClose={() => setShowAIAssistant(false)} />
      <CoachingInquiry isOpen={showCoachingInquiry} onClose={() => setShowCoachingInquiry(false)} />
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSignup={handleSignup}
      />
      <SignInModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        onSignIn={handleSignIn}
      />
    </>
  );
}
