import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronRight, Users, BookOpen, Heart, CheckCircle, GraduationCap, 
  MessageSquare, Shield, Clock, Star, ArrowRight, Award, UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PathwayList from "@/components/learn/PathwayList";
import { CommunityApplication } from "@/components/learn/CommunityApplication";
import AICompanion from "@/components/learn/AICompanion";

// Import community images
import diverseFathersLearning from "@/assets/diverse-fathers-learning.jpg";
import coachPortrait from "@/assets/coach-portrait.jpg";
import peerSupportCircle from "@/assets/peer-support-circle.jpg";

export default function CommunityLearning() {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [showApplication, setShowApplication] = useState(false);

  useEffect(() => {
    document.title = "Learning & Growth Community | Forward Focus Collective";
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
    { id: "overview", label: "🏠 Community Overview", icon: Users, color: "bg-secondary" },
    { id: "learning", label: "📚 Learning Modules", icon: BookOpen, color: "bg-accent" },
    { id: "support", label: "💜 Peer Support", icon: Heart, color: "bg-primary" },
    { id: "features", label: "✨ Features & Benefits", icon: Star, color: "bg-secondary" },
    { id: "apply", label: "🚀 Join Today", icon: ArrowRight, color: "bg-accent" }
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
      <header className="bg-gradient-to-b from-accent/10 to-background border-b">
        <div className="container py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Your Learning & Growth Community
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Free education, peer support, and guidance designed specifically for justice-impacted individuals and families. 
              Learn at your pace, connect with others who understand, and build the future you deserve.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                100% Free Education
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                Trauma-Informed
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                Peer Support
              </span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={() => setShowApplication(true)}
                size="lg"
                className="bg-secondary hover:bg-secondary/90"
              >
                <Users className="h-4 w-4 mr-2" />
                Apply to Join Community
              </Button>
              <Button 
                onClick={() => scrollToSection('learning')}
                variant="outline"
                size="lg"
                className="border-accent text-accent hover:bg-accent/10"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Explore Learning Modules
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Community Visual Banner */}
      <section className="py-8 bg-card border-b">
        <div className="container">
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src={diverseFathersLearning} 
              alt="Diverse fathers and families engaged in learning activities together"
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/60 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Building Stronger Families Through Learning</h2>
                <p className="text-lg opacity-90">Real community. Real support. Real results.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Navigation Hub */}
      <nav className="bg-card border-b sticky top-0 z-40 shadow-sm">
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
                      : 'border-border hover:border-primary/30 hover:bg-primary/5'
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

      <main className="bg-muted/30">
        {/* Community Overview */}
        <section id="overview" className="py-12 bg-card">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">How Our Community Works</h2>
                  <p className="text-muted-foreground">A safe space for learning, healing, and growth</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-6">
                  <h3 className="font-semibold text-secondary-foreground mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-secondary" />
                    Application-Based Access
                  </h3>
                  <ul className="space-y-2 text-sm text-secondary-foreground/80">
                    <li>• Careful vetting for community safety</li>
                    <li>• 24-48 hour review process</li>
                    <li>• Background questions ensure alignment</li>
                    <li>• Creating a trusted environment</li>
                  </ul>
                </div>

                <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
                  <h3 className="font-semibold text-accent-foreground mb-3 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-accent" />
                    Self-Paced Learning
                  </h3>
                  <ul className="space-y-2 text-sm text-accent-foreground/80">
                    <li>• No deadlines or pressure</li>
                    <li>• Progress at your own speed</li>
                    <li>• Mobile-optimized content</li>
                    <li>• Multiple learning formats</li>
                  </ul>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                  <h3 className="font-semibold text-primary-foreground mb-3 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Peer Support
                  </h3>
                  <ul className="space-y-2 text-sm text-primary-foreground/80">
                    <li>• Connect with people who understand</li>
                    <li>• Shared experiences and wisdom</li>
                    <li>• Mutual encouragement</li>
                    <li>• Trauma-informed interactions</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-muted border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-secondary" />
                  Who This Community Serves
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    Formerly incarcerated individuals
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    Family members of incarcerated individuals
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    People preparing for reentry
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    Recently released individuals
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    Long-term reentry support seekers
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
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
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Free Learning Pathways</h2>
                  <p className="text-muted-foreground">Self-paced education designed for your journey - including AI Basics</p>
                </div>
              </div>

              {/* AI Assistant Integration */}
              <div className="mb-8 bg-secondary/10 border border-secondary/20 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                    <Star className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <h3 className="font-semibold text-secondary-foreground">AI Learning Assistant</h3>
                </div>
                <p className="text-sm text-secondary-foreground/80 mb-4">
                  Get personalized help with your learning journey. Ask questions about modules, get study tips, or practice concepts.
                </p>
                <AICompanion />
              </div>

              {/* Actual Learning Pathways */}
              <PathwayList />

              <div className="mt-8 bg-primary/10 border border-primary/20 rounded-lg p-6">
                <h3 className="font-semibold text-primary mb-3">📚 Full Access After Approval</h3>
                <p className="text-primary/80 text-sm">
                  These are preview descriptions. Approved community members get access to interactive content, 
                  downloadable resources, video lessons, practical exercises, progress tracking, and peer discussions 
                  for all pathways including our new AI Basics module.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Peer Support with Visual Enhancement */}
        <section id="support" className="py-12 bg-card">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Peer Support & Connection</h2>
                  <p className="text-muted-foreground">Learn alongside people who understand your journey</p>
                </div>
              </div>

              {/* Peer Support Visual */}
              <div className="mb-8 relative rounded-lg overflow-hidden">
                <img 
                  src={peerSupportCircle} 
                  alt="Diverse group of people in a supportive discussion circle"
                  className="w-full h-48 md:h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">Real Stories. Real Support. Real Results.</h3>
                    <p className="opacity-90">Join conversations that matter with people who understand.</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                  <h3 className="font-semibold text-primary-foreground mb-4">Discussion Groups</h3>
                  <ul className="space-y-3 text-sm text-primary-foreground/80">
                    <li className="flex items-start gap-2">
                      <MessageSquare className="h-4 w-4 mt-0.5 text-primary" />
                      Module-specific discussions
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="h-4 w-4 mt-0.5 text-primary" />
                      Peer mentorship opportunities
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="h-4 w-4 mt-0.5 text-primary" />
                      Success story sharing
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="h-4 w-4 mt-0.5 text-primary" />
                      Safe, moderated environment
                    </li>
                  </ul>
                </div>

                <div className="bg-muted border border-border rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Community Guidelines</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      Respect and dignity for all members
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      Confidentiality of shared information
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      Trauma-informed communication
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      Supportive, judgment-free zone
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      Encouragement over criticism
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-accent/10 border border-accent/20 rounded-lg p-6">
                <h3 className="font-semibold text-accent-foreground mb-3">Success Stories From Our Community</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <blockquote className="bg-card p-4 rounded border text-sm">
                    <p className="text-muted-foreground mb-2">"The credit module helped me go from a 480 to 650 credit score in 8 months."</p>
                    <cite className="text-accent-foreground font-medium">— Maria, Community Member</cite>
                  </blockquote>
                  <blockquote className="bg-card p-4 rounded border text-sm">
                    <p className="text-muted-foreground mb-2">"I found my people here. Finally, a community that gets it."</p>
                    <cite className="text-accent-foreground font-medium">— James, Community Member</cite>
                  </blockquote>
                  <blockquote className="bg-card p-4 rounded border text-sm">
                    <p className="text-muted-foreground mb-2">"The peer support helped me stay motivated when things got tough."</p>
                    <cite className="text-accent-foreground font-medium">— Sarah, Community Member</cite>
                  </blockquote>
                </div>

                <div className="mt-6 text-center">
                  <Button 
                    onClick={() => setShowApplication(true)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Join Peer Support
                  </Button>
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
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Features & Benefits</h2>
                  <p className="text-muted-foreground">Everything you need for successful learning and growth</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: GraduationCap, title: "Progress Tracking", desc: "Monitor your learning journey and celebrate milestones", color: "accent" },
                  { icon: Users, title: "Peer Connections", desc: "Connect with others on similar journeys for mutual support", color: "primary" },
                  { icon: Clock, title: "Flexible Scheduling", desc: "Learn at your own pace, on your own timeline", color: "secondary" },
                  { icon: Shield, title: "Safe Environment", desc: "Trauma-informed, judgment-free space for healing", color: "primary" },
                  { icon: Award, title: "Completely Free", desc: "All education funded by grants - never pay for content", color: "accent" },
                  { icon: MessageSquare, title: "Community Support", desc: "24/7 access to peer discussions and encouragement", color: "secondary" }
                ].map((feature, index) => {
                  const Icon = feature.icon;
                  const colorClasses = {
                    primary: "bg-primary/10 text-primary",
                    secondary: "bg-secondary/10 text-secondary", 
                    accent: "bg-accent/10 text-accent"
                  };
                  return (
                    <div key={index} className="bg-card border border-border rounded-lg p-6 text-center">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${colorClasses[feature.color as keyof typeof colorClasses]}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Coach & Community Section */}
        <section className="py-12 bg-card">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative">
                  <img 
                    src={coachPortrait} 
                    alt="Community coach - Moroccan mentor with glasses and short hair"
                    className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg shadow-lg">
                    <span className="text-sm font-medium">Your Coach</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Meet Your Community Coach</h2>
                  <p className="text-muted-foreground mb-4">
                    I understand the challenges of reentry because I've walked this path. As someone who has navigated 
                    the system and emerged stronger, I'm here to guide you through your learning journey with compassion, 
                    understanding, and practical wisdom.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-sm">Lived experience with reentry challenges</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-sm">Trauma-informed coaching approach</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-sm">Dedicated to community empowerment</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setShowApplication(true)}
                    className="bg-secondary hover:bg-secondary/90"
                  >
                    <UserCheck className="h-4 w-4 mr-2" />
                    Connect with Our Community
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join Today */}
        <section id="apply" className="py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <ArrowRight className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Ready to Join Our Community?</h2>
                  <p className="text-muted-foreground">Start your free learning journey today</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Application Process</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-accent font-semibold text-sm">1</div>
                      <div>
                        <h4 className="font-medium">Submit Application</h4>
                        <p className="text-sm text-muted-foreground">Share basic info about your situation and goals</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-accent font-semibold text-sm">2</div>
                      <div>
                        <h4 className="font-medium">Review Process</h4>
                        <p className="text-sm text-muted-foreground">We review within 24-48 hours for community safety</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-accent font-semibold text-sm">3</div>
                      <div>
                        <h4 className="font-medium">Welcome & Onboarding</h4>
                        <p className="text-sm text-muted-foreground">Get access to all modules and community features</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-accent-foreground mb-4">What You Get (Free Forever)</h3>
                  <div className="space-y-3">
                    {[
                      "8+ comprehensive learning pathways",
                      "AI Basics for Reentry module", 
                      "Peer support and discussion groups",
                      "Progress tracking and recognition",
                      "24/7 community access",
                      "Resource navigation support",
                      "Trauma-informed environment",
                      "Mobile-optimized learning platform",
                      "Success milestone celebrations"
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-accent-foreground/80">
                        <CheckCircle className="h-4 w-4 text-accent" />
                        {benefit}
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={() => setShowApplication(true)}
                    className="w-full mt-6 bg-secondary hover:bg-secondary/90"
                    size="lg"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Apply for Community Access
                  </Button>

                  <p className="text-xs text-accent-foreground/60 text-center mt-3">
                    No credit card required • Always free • Secure application
                  </p>
                </div>
              </div>

              <div className="mt-12 bg-primary/10 border border-primary/20 rounded-lg p-6">
                <h3 className="font-semibold text-primary mb-3">Not Ready to Apply Yet?</h3>
                <p className="text-primary/80 mb-4">
                  That's completely okay. Everyone moves at their own pace. Here are other ways to get support:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <Link to="/help" className="block p-3 bg-card border border-border rounded hover:bg-primary/5 transition-colors">
                    <div className="font-medium text-foreground">Get Immediate Help</div>
                    <div className="text-sm text-muted-foreground">Crisis resources and immediate support</div>
                  </Link>
                  <Link to="/help#ohio-resources" className="block p-3 bg-card border border-border rounded hover:bg-primary/5 transition-colors">
                    <div className="font-medium text-foreground">Browse Resources</div>
                    <div className="text-sm text-muted-foreground">Ohio resource directory</div>
                  </Link>
                  <Link to="/support" className="block p-3 bg-card border border-border rounded hover:bg-primary/5 transition-colors">
                    <div className="font-medium text-foreground">Contact Us</div>
                    <div className="text-sm text-muted-foreground">Questions about our community</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-primary to-accent text-primary-foreground">
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
                  className="bg-secondary hover:bg-secondary/90"
                  size="lg"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Join Our Community
                </Button>
                <Button 
                  onClick={() => scrollToSection('learning')}
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  size="lg"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Explore Learning Modules
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
