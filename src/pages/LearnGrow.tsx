import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronRight, Users, BookOpen, Heart, CheckCircle, GraduationCap, 
  MessageSquare, Shield, Clock, Star, ArrowRight, Award, UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommunityApplication } from "@/components/learn/CommunityApplication";
import AICompanion from "@/components/learn/AICompanion";

// Import community images  
import learningCommunityDiverse from "@/assets/learning-community-diverse.jpg";
import peerSupportCircle from "@/assets/peer-support-circle.jpg";

export default function CommunityLearning() {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [showApplication, setShowApplication] = useState(false);

  useEffect(() => {
    document.title = "Learning & Growth Community | Forward Focus Elevation";
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
            <p className="text-xl text-foreground/90 mb-6">
              Free education, peer support, and guidance designed specifically for justice-impacted individuals and families. 
              Learn at your pace, connect with others who understand, and build the future you deserve.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-foreground/80 mb-8">
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
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                <Users className="h-4 w-4 mr-2" />
                Apply to Join Community
              </Button>
              <Button 
                onClick={() => scrollToSection('learning')}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
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
          <div className="max-w-4xl mx-auto relative rounded-lg overflow-hidden">
            <img 
              src={learningCommunityDiverse} 
              alt="Diverse community members engaged in collaborative learning activities"
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Building Stronger Families Through Learning</h2>
                <p className="text-lg text-white/90">Real community. Real support. Real results.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Smart Navigation Hub */}
        <nav className="bg-card border-b sticky top-0 z-40 shadow-sm">
          <div className="container py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { id: "overview", label: "Community Overview", icon: Users },
                { id: "learning", label: "Learning Modules", icon: BookOpen },
                { id: "apply", label: "Join Today", icon: ArrowRight }
              ].map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center gap-2 p-4 rounded-lg border-2 transition-all shadow-md hover:shadow-lg ${
                      activeSection === section.id 
                        ? 'border-primary bg-gradient-to-r from-primary/20 to-secondary/20 text-primary font-semibold shadow-lg' 
                        : 'border-border bg-gradient-to-r from-background to-muted/30 hover:border-primary/50 hover:from-primary/5 hover:to-secondary/5 hover:text-primary'
                    }`}
                  >
                    <div className={`p-1 rounded-md ${activeSection === section.id ? 'bg-primary/20' : 'bg-muted/50'}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">{section.label}</span>
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
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">How Our Community Works</h2>
                  <p className="text-foreground/80">A safe space for learning, healing, and growth</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-secondary" />
                    Application-Based Access
                  </h3>
                  <ul className="space-y-2 text-sm text-foreground/90">
                    <li>• Careful vetting for community safety</li>
                    <li>• 24-48 hour review process</li>
                    <li>• Background questions ensure alignment</li>
                    <li>• Creating a trusted environment</li>
                  </ul>
                </div>

                <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-accent" />
                    Self-Paced Learning
                  </h3>
                  <ul className="space-y-2 text-sm text-foreground/90">
                    <li>• No deadlines or pressure</li>
                    <li>• Progress at your own speed</li>
                    <li>• Mobile-optimized content</li>
                    <li>• Multiple learning formats</li>
                  </ul>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Peer Support
                  </h3>
                  <ul className="space-y-2 text-sm text-foreground/80">
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

        {/* Learning Topic Previews */}
        <section id="learning" className="py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Topics Covered in Our Skool Community</h2>
                  <p className="text-foreground/80">Preview the key areas we focus on - full modules available after joining</p>
                </div>
              </div>

              {/* AI Assistant Integration */}
              <div className="mb-8 bg-secondary/10 border border-secondary/20 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                  <Star className="h-5 w-5 text-secondary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">Reentry Success Navigator</h3>
              </div>
              <p className="text-foreground/80 mb-4">
                Get personalized help specifically for your reentry journey. Ask about housing, employment, legal questions, or family support strategies.
              </p>
                <AICompanion />
              </div>

              {/* 8 Topic Preview Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  {
                    title: "Welcome Rest Your Path",
                    description: "Begin your healing journey with trauma-informed practices and community connection"
                  },
                  {
                    title: "Financial Foundations", 
                    description: "Banking basics, budgeting strategies, and financial literacy for stability"
                  },
                  {
                    title: "Clarity Support & Wellness",
                    description: "Mental health resources, mindfulness practices, and emotional wellness tools"
                  },
                  {
                    title: "AI Basics Training",
                    description: "Learn how AI can support your reentry journey and daily life navigation"
                  },
                  {
                    title: "Credit Confidence Starter",
                    description: "Build and repair credit, understand credit reports, and establish financial trust"
                  },
                  {
                    title: "Business Essentials",
                    description: "Entrepreneurship fundamentals, business planning, and creating your own opportunities"
                  },
                  {
                    title: "Reentry & Life Tools Vault",
                    description: "Practical resources for housing, employment, documentation, and system navigation"
                  },
                  {
                    title: "Purpose, Planning & Pathways",
                    description: "Goal setting, life planning, and creating sustainable pathways forward"
                  }
                ].map((topic, index) => (
                  <div key={index} className="group relative bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <h3 className="font-semibold text-foreground mb-2">{topic.title}</h3>
                      <p className="text-foreground/80 text-sm group-hover:text-foreground transition-colors duration-300">
                        {topic.description}
                      </p>
                      <div className="mt-3 text-xs text-secondary font-medium">Available in Community</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-secondary" />
                  Full Access After Community Approval
                </h3>
                <p className="text-foreground/80">
                  These topic previews give you a taste of what's covered in our private Skool community. 
                  Once approved, you'll get access to full interactive modules, video content, downloadable resources, 
                  progress tracking, and direct peer discussions with CoachKay and community members.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Peer Support with Visual Enhancement */}
        <section id="support" className="py-12 bg-card">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Peer Support & Connection</h2>
                  <p className="text-foreground/80">Learn alongside people who understand your journey</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4">Discussion Groups</h3>
                  <ul className="space-y-3 text-sm text-foreground/80">
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
                  </ul>
                </div>

                <div className="bg-muted border border-border rounded-lg p-6">
                  <h3 className="font-semibold mb-4 text-foreground">Community Guidelines</h3>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      Respect and dignity for all members
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      Trauma-informed communication
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      Supportive, judgment-free zone
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join Today */}
        <section id="apply" className="py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-osu-accent rounded-lg flex items-center justify-center">
                  <ArrowRight className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Ready to Join Our Community?</h2>
                  <p className="text-foreground/80">Start your free learning journey today</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center text-left">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-center">Application Process</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-osu-scarlet/20 rounded-full flex items-center justify-center text-osu-scarlet font-semibold text-sm">1</div>
                      <div>
                        <h4 className="font-medium text-foreground">Submit Application</h4>
                        <p className="text-sm text-foreground/80">Share basic info about your situation and goals</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-osu-scarlet/20 rounded-full flex items-center justify-center text-osu-scarlet font-semibold text-sm">2</div>
                      <div>
                        <h4 className="font-medium text-foreground">Review Process</h4>
                        <p className="text-sm text-foreground/80">We review within 24-48 hours for community safety</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-osu-scarlet/20 rounded-full flex items-center justify-center text-osu-scarlet font-semibold text-sm">3</div>
                      <div>
                        <h4 className="font-medium text-foreground">Welcome & Onboarding</h4>
                        <p className="text-sm text-foreground/80">Get access to all modules and community features</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-osu-subtle border border-osu-scarlet/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4 text-center">What You Get (Free Forever)</h3>
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
                      <div key={index} className="flex items-center gap-2 text-sm text-foreground/90">
                        <CheckCircle className="h-4 w-4 text-osu-scarlet" />
                        {benefit}
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={() => setShowApplication(true)}
                    className="w-full mt-6 bg-gradient-osu-accent hover:bg-osu-scarlet text-white shadow-md"
                    size="lg"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Apply for Community Access
                  </Button>

                  <p className="text-xs text-foreground/60 text-center mt-3">
                    No credit card required • Always free • Secure application
                  </p>
                </div>
              </div>

              <div className="mt-12 bg-osu-scarlet/5 border border-osu-scarlet/20 rounded-lg p-6">
                <h3 className="font-semibold text-osu-scarlet mb-3 text-center">Not Ready to Apply Yet?</h3>
                <p className="text-foreground/80 mb-4 text-center">
                  That's completely okay. Everyone moves at their own pace. Here are other ways to get support:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <Link to="/help" className="block p-3 bg-card border border-border rounded hover:bg-osu-scarlet/5 transition-colors">
                    <div className="font-medium text-foreground">Get Immediate Help</div>
                    <div className="text-sm text-foreground/80">Crisis resources and immediate support</div>
                  </Link>
                  <Link to="/help#ohio-resources" className="block p-3 bg-card border border-border rounded hover:bg-primary/5 transition-colors">
                    <div className="font-medium text-foreground">Browse Resources</div>
                    <div className="text-sm text-foreground/80">Ohio resource directory</div>
                  </Link>
                  <Link to="/support" className="block p-3 bg-card border border-border rounded hover:bg-primary/5 transition-colors">
                    <div className="font-medium text-foreground">Contact Us</div>
                    <div className="text-sm text-foreground/80">Questions about our community</div>
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
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
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
