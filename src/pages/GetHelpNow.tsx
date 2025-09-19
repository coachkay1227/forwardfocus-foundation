import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Phone, Bot, AlertTriangle, CheckCircle, ArrowRight, 
  Shield, Heart, BookOpen, Users, GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CrisisSupportAI from "@/components/ai/CrisisSupportAI";


export default function GetHelpNow() {
  const [activeSection, setActiveSection] = useState<string>("crisis");
  const [showCrisisAI, setShowCrisisAI] = useState(false);

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
                onClick={() => setShowCrisisAI(true)}
                size="lg"
                variant="premium"
                className="h-16 px-12 text-xl"
              >
                <Bot className="h-6 w-6 mr-3" />
                Get Crisis Support Now
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
                onClick={() => setShowCrisisAI(true)}
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
                  onClick={() => setShowCrisisAI(true)}
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

      {/* Crisis Support AI */}
      <CrisisSupportAI 
        isOpen={showCrisisAI} 
        onClose={() => setShowCrisisAI(false)} 
      />
    </>
  );
}