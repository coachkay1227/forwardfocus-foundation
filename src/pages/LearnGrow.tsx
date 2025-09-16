import { useEffect, useState } from "react";
import { ChevronRight, Users, BookOpen, Heart, CheckCircle, GraduationCap, Shield, Clock, Star, ArrowRight, Award, UserCheck, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CommunityApplication } from "@/components/learn/CommunityApplication";
import AICompanion from "@/components/learn/AICompanion";

// Import optimized community images  
import learningCommunityDiverse from "@/assets/learning-community-diverse.jpg";
import peerSupportCircle from "@/assets/peer-support-circle.jpg";
export default function CommunityLearning() {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [showApplication, setShowApplication] = useState(false);
  useEffect(() => {
    // SEO optimization
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
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  const navigationSections = [{
    id: "overview",
    label: "Community Overview",
    icon: Users
  }, {
    id: "learning",
    label: "Learning Modules",
    icon: BookOpen
  }, {
    id: "apply",
    label: "Join Today",
    icon: ArrowRight
  }];
  const learningTopics = [{
    title: "Welcome Rest Your Path",
    description: "Begin your healing journey with trauma-informed practices and community connection"
  }, {
    title: "Financial Foundations",
    description: "Banking basics, budgeting strategies, and financial literacy for stability"
  }, {
    title: "Clarity Support & Wellness",
    description: "Mental health resources, mindfulness practices, and emotional wellness tools"
  }, {
    title: "AI Basics Training",
    description: "Learn how AI can support your reentry journey and daily life navigation"
  }, {
    title: "Credit Confidence Starter",
    description: "Build and repair credit, understand credit reports, and establish financial trust"
  }, {
    title: "Business Essentials",
    description: "Entrepreneurship fundamentals, business planning, and creating your own opportunities"
  }, {
    title: "Reentry & Life Tools Vault",
    description: "Practical resources for housing, employment, documentation, and system navigation"
  }, {
    title: "Purpose, Planning & Pathways",
    description: "Goal setting, life planning, and creating sustainable pathways forward"
  }];
  return <div className="min-h-screen bg-gradient-to-b from-osu-gray-light/20 to-background">
      {/* Hero Section with Ohio State Branding */}
      <header className="relative bg-gradient-osu-subtle border-b border-osu-gray-light/30">
        <div className="absolute inset-0 bg-gradient-to-br from-osu-scarlet/5 via-transparent to-osu-gray/5"></div>
        <div className="relative container py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-osu-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <GraduationCap className="h-10 w-10 text-osu-scarlet-foreground" />
            </div>
            
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
              Your Learning &amp; Growth Community
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Free education, peer support, and guidance designed specifically for justice-impacted individuals and families. 
              Learn at your pace, connect with others who understand, and build the future you deserve.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium mb-10">
              {[{
              icon: CheckCircle,
              text: "100% Free Education"
            }, {
              icon: Heart,
              text: "Trauma-Informed"
            }, {
              icon: Users,
              text: "Peer Support"
            }].map((item, index) => <div key={index} className="flex items-center gap-2 bg-osu-scarlet/10 px-4 py-2 rounded-full border border-osu-scarlet/20">
                  <item.icon className="h-4 w-4 text-osu-scarlet" />
                  <span className="text-foreground">{item.text}</span>
                </div>)}
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={() => setShowApplication(true)} variant="osu-scarlet" size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300">
                
                Apply to Join Community
              </Button>
              <Button onClick={() => scrollToSection('learning')} variant="osu-gray" size="lg" className="shadow-md hover:shadow-lg transition-all duration-300">
                <BookOpen className="h-5 w-5 mr-2" />
                Explore Learning Modules
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Community Visual Banner */}
      <section className="py-8 bg-osu-gray-light/10 border-b border-osu-gray-light/20">
        <div className="container">
          <div className="max-w-5xl mx-auto relative rounded-2xl overflow-hidden shadow-2xl">
            <img src={learningCommunityDiverse} alt="Diverse community members engaged in collaborative learning activities" className="w-full h-72 md:h-96 object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-osu-scarlet/90 via-osu-scarlet/80 to-osu-scarlet/70 flex items-center justify-center">
              <div className="text-center text-osu-scarlet-foreground p-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Building Stronger Families Through Learning</h2>
                <p className="text-xl text-osu-scarlet-foreground/90 max-w-2xl mx-auto">Real community. Real support. Real results.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Optimized Sticky Navigation */}
      <nav className="bg-card/95 backdrop-blur-sm border-b border-osu-gray-light/30 sticky top-0 z-40 shadow-sm">
        <div className="container py-4">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl">
              {navigationSections.map(section => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return <button key={section.id} onClick={() => scrollToSection(section.id)} className={`flex items-center gap-3 px-6 py-3 rounded-lg border-2 transition-all duration-300 font-medium ${isActive ? 'border-osu-scarlet bg-gradient-to-r from-osu-scarlet/20 to-osu-scarlet/10 text-osu-scarlet shadow-lg scale-105' : 'border-osu-gray-light/40 bg-gradient-to-r from-background to-osu-gray-light/5 hover:border-osu-scarlet/40 hover:text-osu-scarlet hover:scale-102 shadow-md'}`}>
                    <div className={`p-2 rounded-md ${isActive ? 'bg-osu-scarlet/20' : 'bg-osu-gray-light/30'}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm">{section.label}</span>
                    <ChevronRight className="h-3 w-3 ml-auto" />
                  </button>;
            })}
            </div>
          </div>
        </div>
      </nav>

      <main className="bg-gradient-to-b from-osu-gray-light/10 to-background">
        {/* Community Overview Section */}
        <section id="overview" className="py-16 bg-gradient-to-br from-background to-osu-gray-light/5">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-osu-primary rounded-xl flex items-center justify-center shadow-lg">
                    <Users className="h-8 w-8 text-osu-scarlet-foreground" />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">How Our Community Works</h2>
                    <p className="text-lg text-muted-foreground mt-2">A safe space for learning, healing, and growth</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <Card className="border-osu-scarlet/20 bg-gradient-to-br from-osu-scarlet/5 to-background shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-osu-scarlet">
                      <Shield className="h-5 w-5" />
                      Application-Based Access
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-foreground/80">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-osu-scarlet mt-0.5 flex-shrink-0" />
                        Careful vetting for community safety
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-osu-scarlet mt-0.5 flex-shrink-0" />
                        24-48 hour review process
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-osu-scarlet mt-0.5 flex-shrink-0" />
                        Background questions ensure alignment
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-osu-scarlet mt-0.5 flex-shrink-0" />
                        Creating a trusted environment
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-osu-gray/20 bg-gradient-to-br from-osu-gray/5 to-background shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-osu-gray">
                      <BookOpen className="h-5 w-5" />
                      Self-Paced Learning
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-foreground/80">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-osu-gray mt-0.5 flex-shrink-0" />
                        No deadlines or pressure
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-osu-gray mt-0.5 flex-shrink-0" />
                        Progress at your own speed
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-osu-gray mt-0.5 flex-shrink-0" />
                        Mobile-optimized content
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-osu-gray mt-0.5 flex-shrink-0" />
                        Multiple learning formats
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-osu-scarlet/20 bg-gradient-to-br from-osu-scarlet/8 to-background shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-osu-scarlet">
                      <Heart className="h-5 w-5" />
                      Peer Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-foreground/80">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-osu-scarlet mt-0.5 flex-shrink-0" />
                        Connect with people who understand
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-osu-scarlet mt-0.5 flex-shrink-0" />
                        Shared experiences and wisdom
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-osu-scarlet mt-0.5 flex-shrink-0" />
                        Mutual encouragement
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-osu-scarlet mt-0.5 flex-shrink-0" />
                        Trauma-informed interactions
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-osu-gray-light/30 bg-gradient-to-r from-osu-gray-light/10 to-background shadow-lg">
                <CardHeader>
                  <CardTitle className="text-center text-2xl text-foreground flex items-center justify-center gap-2">
                    <Users className="h-6 w-6 text-osu-gray" />
                    Who This Community Serves
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {["Formerly incarcerated individuals", "Family members of incarcerated individuals", "People preparing for reentry", "Recently released individuals", "Long-term reentry support seekers", "Supporters and advocates"].map((item, index) => <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-osu-scarlet/5 border border-osu-scarlet/10">
                        <CheckCircle className="h-5 w-5 text-osu-scarlet flex-shrink-0" />
                        <span className="text-foreground font-medium">{item}</span>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Learning Modules Section */}
        <section id="learning" className="py-16 bg-gradient-to-br from-osu-gray-light/5 to-background">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-osu-primary rounded-xl flex items-center justify-center shadow-lg">
                    <BookOpen className="h-8 w-8 text-osu-scarlet-foreground" />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">Learning Topics & Modules</h2>
                    <p className="text-lg text-muted-foreground mt-2">Preview the key areas we focus on - full modules available after joining</p>
                  </div>
                </div>
              </div>

              {/* AI Assistant Integration */}
              <div className="mb-12">
                <AICompanion />
              </div>

              {/* Learning Topic Cards - Optimized Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {learningTopics.map((topic, index) => <Card key={index} className="group border-osu-gray-light/30 bg-gradient-to-br from-background to-osu-gray-light/5 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-osu-scarlet/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-foreground group-hover:text-osu-scarlet transition-colors duration-300">
                        {topic.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 mb-4">
                        {topic.description}
                      </CardDescription>
                      <div className="text-xs font-semibold text-osu-scarlet bg-osu-scarlet/10 px-3 py-1 rounded-full inline-block">
                        Available in Community
                      </div>
                    </CardContent>
                  </Card>)}
              </div>

              <Card className="border-osu-scarlet/20 bg-gradient-to-r from-osu-scarlet/5 to-background shadow-lg">
                <CardHeader>
                  <CardTitle className="text-center text-2xl text-foreground flex items-center justify-center gap-2">
                    <Shield className="h-6 w-6 text-osu-scarlet" />
                    Full Access After Community Approval
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-foreground/80 leading-relaxed">
                    These topic previews give you a taste of what's covered in our private Skool community. 
                    Once approved, you'll get access to full interactive modules, video content, downloadable resources, 
                    progress tracking, and direct peer discussions with CoachKay and community members.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Peer Support Section */}
        <section className="py-16 bg-gradient-to-br from-background to-osu-scarlet/5">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-osu-primary rounded-xl flex items-center justify-center shadow-lg">
                    <Heart className="h-8 w-8 text-osu-scarlet-foreground" />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">Peer Support &amp; Connection</h2>
                    <p className="text-lg text-muted-foreground mt-2">Learn alongside people who understand your journey</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-osu-scarlet/20 bg-gradient-to-br from-osu-scarlet/8 to-background shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-osu-scarlet">Discussion Groups</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {[{
                      icon: MessageSquare,
                      text: "Module-specific discussions"
                    }, {
                      icon: Users,
                      text: "Peer mentorship opportunities"
                    }, {
                      icon: Heart,
                      text: "Success story sharing"
                    }].map((item, index) => <li key={index} className="flex items-start gap-3">
                          <item.icon className="h-5 w-5 mt-0.5 text-osu-scarlet flex-shrink-0" />
                          <span className="text-foreground/80">{item.text}</span>
                        </li>)}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-osu-gray/20 bg-gradient-to-br from-osu-gray/5 to-background shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-osu-gray">Community Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {["Respect and dignity for all members", "Trauma-informed communication", "Supportive, judgment-free zone"].map((item, index) => <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-osu-gray mt-0.5 flex-shrink-0" />
                          <span className="text-foreground/80">{item}</span>
                        </li>)}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Join Today Section */}
        <section id="apply" className="py-16 bg-gradient-to-br from-osu-gray-light/10 to-background">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-gradient-osu-primary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Award className="h-10 w-10 text-osu-scarlet-foreground" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Ready to Join Our Community?
              </h2>
              
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Take the first step towards connection, growth, and healing. Our application process ensures 
                you're matched with a supportive community that understands your journey.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Button onClick={() => setShowApplication(true)} variant="osu-scarlet" size="lg" className="shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <UserCheck className="h-5 w-5 mr-2" />
                  Apply Now - It's Free!
                </Button>
                <Button variant="osu-gray" size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300">
                  <Clock className="h-5 w-5 mr-2" />
                  Learn About Process
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-center">
                {[{
                number: "1",
                title: "Apply",
                desc: "Complete our simple application form"
              }, {
                number: "2",
                title: "Review",
                desc: "24-48 hour approval process"
              }, {
                number: "3",
                title: "Join",
                desc: "Access community and start learning"
              }].map((step, index) => <div key={index} className="p-6 rounded-xl bg-gradient-to-br from-osu-scarlet/5 to-background border border-osu-scarlet/10 shadow-md">
                    <div className="w-12 h-12 bg-gradient-osu-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold text-osu-scarlet-foreground">
                      {step.number}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>)}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Application Modal */}
      <CommunityApplication isOpen={showApplication} onClose={() => setShowApplication(false)} />
    </div>;
}