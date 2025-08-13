import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronRight, Users, BookOpen, Heart, CheckCircle, GraduationCap, 
  MessageSquare, Shield, Clock, Star, ArrowRight, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

// Community Application Component
const CommunityApplication = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    situation: "",
    goals: "",
    support: "",
    referral: "",
    agreement: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application submitted successfully!",
      description: "We'll review your application within 24-48 hours and reach out with next steps."
    });
    onClose();
    setFormData({
      name: "",
      email: "",
      phone: "",
      situation: "",
      goals: "",
      support: "",
      referral: "",
      agreement: false
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold">Join Our Learning Community</h3>
              <p className="text-gray-600">Free education • Peer support • Safe space</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-green-800 mb-2">✨ What's Included (Always Free):</h4>
            <div className="grid md:grid-cols-2 gap-2 text-sm text-green-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3" />
                7 self-paced learning modules
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3" />
                Peer support groups
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3" />
                Progress tracking
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3" />
                Resource navigation
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3" />
                24/7 community access
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3" />
                Mobile learning platform
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone (optional)</label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Which best describes your situation? *</label>
              <select 
                className="w-full p-2 border rounded"
                value={formData.situation}
                onChange={(e) => setFormData({...formData, situation: e.target.value})}
                required
              >
                <option value="">Select your situation</option>
                <option value="formerly-incarcerated">Formerly incarcerated seeking support</option>
                <option value="family-member">Family member of incarcerated individual</option>
                <option value="preparing-reentry">Preparing for reentry</option>
                <option value="recently-released">Recently released (within 2 years)</option>
                <option value="long-term-reentry">Long-term reentry (2+ years)</option>
                <option value="supporting-someone">Supporting someone in their journey</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">What are your main learning goals? *</label>
              <Textarea
                value={formData.goals}
                onChange={(e) => setFormData({...formData, goals: e.target.value})}
                placeholder="For example: building credit, finding employment, emotional healing, starting a business, strengthening family relationships..."
                required
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">What type of support would be most helpful?</label>
              <Textarea
                value={formData.support}
                onChange={(e) => setFormData({...formData, support: e.target.value})}
                placeholder="For example: peer support, mentorship, practical guidance, emotional support, accountability..."
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">How did you hear about us? (optional)</label>
              <Input
                value={formData.referral}
                onChange={(e) => setFormData({...formData, referral: e.target.value})}
                placeholder="Friend, organization, website, etc."
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Community Guidelines</h4>
              <ul className="text-sm text-blue-700 space-y-1 mb-3">
                <li>• Treat all members with respect and dignity</li>
                <li>• Keep all shared information confidential</li>
                <li>• Participate in trauma-informed way</li>
                <li>• Support others on their journey</li>
                <li>• No judgment, only encouragement</li>
              </ul>
              <label className="flex items-start gap-2">
                <input 
                  type="checkbox" 
                  checked={formData.agreement}
                  onChange={(e) => setFormData({...formData, agreement: e.target.checked})}
                  className="mt-1"
                  required
                />
                <span className="text-sm text-blue-800">
                  I agree to follow community guidelines and understand this is a safe space for healing and growth
                </span>
              </label>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1">
                <Users className="h-4 w-4 mr-2" />
                Submit Application
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              All education is free. We review applications within 24-48 hours to ensure community safety.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default function CommunityLearning() {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [showApplication, setShowApplication] = useState(false);

  useEffect(() => {
    document.title = "Community & Learning Hub | Forward Focus Collective";
    const desc = "Free education and peer support for justice-impacted individuals and families. Self-paced learning modules, trauma-informed community, progress tracking.";
    
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

  const navigationSections = [
    { id: "overview", label: "🏠 Community Overview", icon: Users, color: "bg-blue-500" },
    { id: "learning", label: "📚 Learning Modules", icon: BookOpen, color: "bg-green-500" },
    { id: "support", label: "💜 Peer Support", icon: Heart, color: "bg-purple-500" },
    { id: "features", label: "✨ Features & Benefits", icon: Star, color: "bg-orange-500" },
    { id: "apply", label: "🚀 Join Today", icon: ArrowRight, color: "bg-teal-500" }
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
      {/* Hero Section */}
      <header className="bg-gradient-to-b from-blue-50 to-white border-b">
        <div className="container py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your Learning & Growth Community
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Free education, peer support, and guidance designed specifically for justice-impacted individuals and families. 
              Learn at your pace, connect with others who understand, and build the future you deserve.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                100% Free Education
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Trauma-Informed
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Peer Support
              </span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={() => setShowApplication(true)}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Users className="h-4 w-4 mr-2" />
                Apply to Join Community
              </Button>
              <Button 
                onClick={() => scrollToSection('learning')}
                variant="outline"
                size="lg"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Explore Learning Modules
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Smart Navigation Hub */}
      <nav className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container py-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
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
        {/* Community Overview */}
        <section id="overview" className="py-12 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">How Our Community Works</h2>
                  <p className="text-gray-600">A safe space for learning, healing, and growth</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Application-Based Access
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• Careful vetting for community safety</li>
                    <li>• 24-48 hour review process</li>
                    <li>• Background questions ensure alignment</li>
                    <li>• Creating a trusted environment</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Self-Paced Learning
                  </h3>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>• No deadlines or pressure</li>
                    <li>• Progress at your own speed</li>
                    <li>• Mobile-optimized content</li>
                    <li>• Multiple learning formats</li>
                  </ul>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Peer Support
                  </h3>
                  <ul className="space-y-2 text-sm text-purple-800">
                    <li>• Connect with people who understand</li>
                    <li>• Shared experiences and wisdom</li>
                    <li>• Mutual encouragement</li>
                    <li>• Trauma-informed interactions</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-gray-50 border rounded-lg p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Who This Community Serves
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    Formerly incarcerated individuals
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    Family members of incarcerated individuals
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    People preparing for reentry
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    Recently released individuals
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    Long-term reentry support seekers
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    Supporters and advocates
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Modules */}
        <section id="learning" className="py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Free Learning Modules</h2>
                  <p className="text-gray-600">Self-paced education designed for your journey</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Welcome & Reset Your Path", description: "Starting fresh with clarity and purpose", icon: "🌟" },
                  { title: "Clarity Support & Wellness", description: "Mental health and emotional resilience", icon: "🧠" },
                  { title: "Mindset & Emotional Reset", description: "Healing trauma and building confidence", icon: "💚" },
                  { title: "Credit Confidence Starter", description: "Building and repairing credit effectively", icon: "💳" },
                  { title: "Reentry & Life Tools Vault", description: "Practical skills for daily life success", icon: "🛠️" },
                  { title: "Purpose, Planning & Pathways", description: "Setting goals and creating action plans", icon: "🎯" },
                  { title: "Activated Alignment", description: "Living authentically and building legacy", icon: "✨" }
                ].map((module, index) => (
                  <div key={index} className="bg-white border rounded-lg p-6 hover:border-green-300 hover:bg-green-50 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{module.icon}</div>
                      <div>
                        <h3 className="font-semibold text-green-900 mb-2">{module.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{module.description}</p>
                        <div className="flex items-center gap-2 text-xs text-green-600">
                          <CheckCircle className="h-3 w-3" />
                          Interactive content
                          <CheckCircle className="h-3 w-3" />
                          Peer discussion
                          <CheckCircle className="h-3 w-3" />
                          Progress tracking
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-semibold text-yellow-800 mb-3">📚 Detailed Curriculum Available After Approval</h3>
                <p className="text-yellow-700 text-sm">
                  Each module includes interactive content, downloadable resources, video lessons, 
                  practical exercises, and community discussions. Full curriculum details are shared 
                  with approved community members during the onboarding process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Peer Support */}
        <section id="support" className="py-12 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Peer Support & Connection</h2>
                  <p className="text-gray-600">Learn alongside people who understand your journey</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="font-semibold text-purple-900 mb-4">Discussion Groups</h3>
                  <ul className="space-y-3 text-sm text-purple-800">
                    <li className="flex items-start gap-2">
                      <MessageSquare className="h-4 w-4 mt-0.5" />
                      Module-specific discussions
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="h-4 w-4 mt-0.5" />
                      Peer mentorship opportunities
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="h-4 w-4 mt-0.5" />
                      Success story sharing
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="h-4 w-4 mt-0.5" />
                      Safe, moderated environment
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 border rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Community Guidelines</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5" />
                      Respect and dignity for all members
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5" />
                      Confidentiality of shared information
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5" />
                      Trauma-informed communication
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5" />
                      Supportive, judgment-free zone
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5" />
                      Encouragement over criticism
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-800 mb-3">Success Stories From Our Community</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <blockquote className="bg-white p-4 rounded border text-sm">
                    <p className="text-gray-700 mb-2">"The credit module helped me go from a 480 to 650 credit score in 8 months."</p>
                    <cite className="text-green-700 font-medium">— Maria, Community Member</cite>
                  </blockquote>
                  <blockquote className="bg-white p-4 rounded border text-sm">
                    <p className="text-gray-700 mb-2">"I found my people here. Finally, a community that gets it."</p>
                    <cite className="text-green-700 font-medium">— James, Community Member</cite>
                  </blockquote>
                  <blockquote className="bg-white p-4 rounded border text-sm">
                    <p className="text-gray-700 mb-2">"The peer support helped me stay motivated when things got tough."</p>
                    <cite className="text-green-700 font-medium">— Sarah, Community Member</cite>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features & Benefits */}
        <section id="features" className="py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Features & Benefits</h2>
                  <p className="text-gray-600">Everything you need for successful learning and growth</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: GraduationCap, title: "Progress Tracking", desc: "Monitor your learning journey and celebrate milestones" },
                  { icon: Users, title: "Peer Connections", desc: "Connect with others on similar journeys for mutual support" },
                  { icon: Clock, title: "Flexible Scheduling", desc: "Learn at your own pace, on your own timeline" },
                  { icon: Shield, title: "Safe Environment", desc: "Trauma-informed, judgment-free space for healing" },
                  { icon: CheckCircle, title: "Completely Free", desc: "All education funded by grants - never pay for content" },
                  { icon: MessageSquare, title: "Community Support", desc: "24/7 access to peer discussions and encouragement" }
                ].map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="bg-white border rounded-lg p-6 text-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-6 w-6 text-orange-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Join Today */}
        <section id="apply" className="py-12 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center">
                  <ArrowRight className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Ready to Join Our Community?</h2>
                  <p className="text-gray-600">Start your free learning journey today</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Application Process</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-semibold text-sm">1</div>
                      <div>
                        <h4 className="font-medium">Submit Application</h4>
                        <p className="text-sm text-gray-600">Share basic info about your situation and goals</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-semibold text-sm">2</div>
                      <div>
                        <h4 className="font-medium">Review Process</h4>
                        <p className="text-sm text-gray-600">We review within 24-48 hours for community safety</p>
                      </div>
                    </div>
                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-teal-900 mb-4">What You Get (Free Forever)</h3>
              <div className="space-y-3">
                {[
                  "7 comprehensive learning modules",
                  "Peer support and discussion groups",
                  "Progress tracking and recognition",
                  "24/7 community access",
                  "Resource navigation support",
                  "Trauma-informed environment",
                  "Mobile-optimized learning platform",
                  "Success milestone celebrations"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-teal-800">
                    <CheckCircle className="h-4 w-4 text-teal-600" />
                    {benefit}
                  </div>
                ))}
              </div>

              <Button 
                onClick={() => setShowApplication(true)}
                className="w-full mt-6 bg-teal-600 hover:bg-teal-700"
                size="lg"
              >
                <Users className="h-4 w-4 mr-2" />
                Apply for Community Access
              </Button>

              <p className="text-xs text-teal-700 text-center mt-3">
                No credit card required • Always free • Secure application
              </p>
            </div>
          </div>
        </div>
      </div>

          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">Not Ready to Apply Yet?</h3>
            <p className="text-blue-800 mb-4">
              That's completely okay. Everyone moves at their own pace. Here are other ways to get support:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/help" className="block p-3 bg-white border rounded hover:bg-blue-50 transition-colors">
                <div className="font-medium text-blue-900">Get Immediate Help</div>
                <div className="text-sm text-blue-700">Crisis resources and immediate support</div>
              </Link>
              <Link to="/help#ohio-resources" className="block p-3 bg-white border rounded hover:bg-blue-50 transition-colors">
                <div className="font-medium text-blue-900">Browse Resources</div>
                <div className="text-sm text-blue-700">Ohio resource directory</div>
              </Link>
              <Link to="/support" className="block p-3 bg-white border rounded hover:bg-blue-50 transition-colors">
                <div className="font-medium text-blue-900">Contact Us</div>
                <div className="text-sm text-blue-700">Questions about our community</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Call to Action */}
    <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Your Journey of Growth Starts Here</h2>
          <p className="text-xl mb-8 opacity-90">
            Join a community that believes in your potential, supports your healing, and celebrates your progress. 
            Every step forward is a victory worth celebrating.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => setShowApplication(true)}
              className="bg-white text-blue-600 hover:bg-gray-100"
              size="lg"
            >
              <Users className="h-4 w-4 mr-2" />
              Join Our Community
            </Button>
            <Button 
              onClick={() => scrollToSection('learning')}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              size="lg"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Explore Modules
            </Button>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-2 text-sm opacity-90">
              <Shield className="h-4 w-4" />
              Safe learning environment
            </div>
            <div className="flex items-center justify-center gap-2 text-sm opacity-90">
              <Heart className="h-4 w-4" />
              Peer support included
            </div>
            <div className="flex items-center justify-center gap-2 text-sm opacity-90">
              <CheckCircle className="h-4 w-4" />
              Always free education
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  {/* Community Application Modal */}
  <CommunityApplication 
    isOpen={showApplication} 
    onClose={() => setShowApplication(false)} 
  />
</>
);
}
