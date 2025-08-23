import { useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Heart, Users, Shield, CheckCircle, Target, Brain,
  MessageSquare, BookOpen, Home, Phone, ArrowRight, Star 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Import hero image
import aboutUsTeamDiverse from "@/assets/about-us-team-diverse.jpg";

export default function AboutUs() {
  useEffect(() => {
    document.title = "About Forward Focus Elevation | Empowering Justice-Impacted Families";
    const desc = "We exist to empower justice-impacted individuals and families to rebuild, thrive, and rise — with dignity, hope, and community. AI-powered platform with human support.";
    
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
    link.setAttribute("href", `${window.location.origin}/about`);

    // JSON-LD Organization structured data
    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Forward Focus Elevation',
      url: window.location.origin,
      description: 'Empowering justice-impacted individuals and families to rebuild, thrive, and rise with dignity, hope, and community.',
      areaServed: 'Ohio',
      serviceType: [
        'Healing & Safety Hub',
        'Reentry Community',
        'AI-Powered Guidance',
        'Trauma Recovery Support'
      ]
    });
    document.head.appendChild(ld);

    return () => {
      if (document.head.contains(ld)) {
        document.head.removeChild(ld);
      }
    };
  }, []);

  return (
    <main id="main">
      {/* Hero Section */}
      <header className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-secondary/70"></div>
        <div className="relative container py-24 md:py-32">
          <div className="max-w-5xl mx-auto">
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-8 leading-tight">
              About Forward Focus Elevation
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-primary-foreground/90 leading-relaxed max-w-3xl">
              We exist to empower justice-impacted individuals and families to rebuild, thrive, and rise — with dignity, hope, and community.
            </p>
            <div className="flex items-center gap-6 text-sm mb-12 flex-wrap">
              <span className="flex items-center gap-2 bg-accent/20 px-6 py-3 rounded-full backdrop-blur-sm">
                <Shield className="h-5 w-5" />
                Dignity
              </span>
              <span className="flex items-center gap-2 bg-accent/20 px-6 py-3 rounded-full backdrop-blur-sm">
                <Heart className="h-5 w-5" />
                Hope
              </span>
              <span className="flex items-center gap-2 bg-accent/20 px-6 py-3 rounded-full backdrop-blur-sm">
                <Users className="h-5 w-5" />
                Community
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
              <Button asChild size="lg" variant="secondary" className="flex-1">
                <Link to="/victim-services">
                  <Shield className="h-5 w-5 mr-2" />
                  Explore the Healing Hub
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground flex-1">
                <Link to="/learn">
                  <Users className="h-5 w-5 mr-2" />
                  Join the Community
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-24 space-y-32">
        {/* Our Story */}
        <section aria-labelledby="story" className="scroll-mt-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 id="story" className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-8">
                  Our Story
                </h2>
                <div className="space-y-8 text-foreground">
                  <p className="text-xl leading-relaxed">
                    Forward Focus Elevation was born from lived experience. We saw firsthand how hard it is for 
                    justice-impacted individuals and their families to access real support. Traditional systems 
                    were fragmented, outdated, and often left people behind.
                  </p>
                  <p className="text-xl leading-relaxed">
                    So, we built something different — a trauma-informed, AI-powered platform that's available 
                    anytime, anywhere. A community designed not just to provide resources, but to empower transformation.
                  </p>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={aboutUsTeamDiverse} 
                  alt="Diverse team of community leaders, counselors, and advocates"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/90 to-transparent flex items-end">
                  <div className="p-8 text-accent-foreground w-full text-center">
                    <p className="text-2xl font-semibold">
                      Built by community, for community
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section aria-labelledby="different" className="scroll-mt-16 bg-secondary/5 py-24 -mx-4 px-4 rounded-2xl">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 id="different" className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                We're Not Just Another Resource — We're a Movement
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                Experience the difference of a platform built with your journey in mind
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-background rounded-xl p-10 border shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-md">
                    <Brain className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    24/7 AI + Human-Powered Guidance
                  </h3>
                </div>
                <p className="text-foreground/70 text-lg leading-relaxed">
                  Trauma recovery, reentry support, and growth resources available whenever you need them. 
                  Technology enhances support—it never replaces human connection.
                </p>
              </div>

              <div className="bg-background rounded-xl p-10 border shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center shadow-md">
                    <Shield className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    Safe, Judgment-Free Community
                  </h3>
                </div>
                <p className="text-foreground/70 text-lg leading-relaxed">
                  Peer and professional support in an environment where you're understood, 
                  valued, and empowered to thrive on your own terms.
                </p>
              </div>

              <div className="bg-background rounded-xl p-10 border shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center shadow-md">
                    <Users className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    Built for Diverse Communities
                  </h3>
                </div>
                <p className="text-foreground/70 text-lg leading-relaxed">
                  Accessible, inclusive, and designed for real life. We understand that every 
                  journey is unique and every person deserves dignity and respect.
                </p>
              </div>

              <div className="bg-background rounded-xl p-10 border shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-md">
                    <Target className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    Interactive Tools That Create Action
                  </h3>
                </div>
                <p className="text-foreground/70 text-lg leading-relaxed">
                  Move beyond just reading information. Our platform helps you take concrete 
                  steps toward your goals with personalized guidance and real-world resources.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section aria-labelledby="values" className="scroll-mt-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 id="values" className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                Our Values Guide Everything We Do
              </h2>
              <p className="text-xl text-foreground/70 leading-relaxed">
                These principles shape every interaction, every resource, and every decision we make
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center bg-primary/5 rounded-2xl p-10 hover:bg-primary/10 transition-all">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <Shield className="h-12 w-12 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Dignity</h3>
                <p className="text-foreground/70 text-lg leading-relaxed">
                  Everyone deserves respect and humanity
                </p>
              </div>

              <div className="text-center bg-secondary/5 rounded-2xl p-10 hover:bg-secondary/10 transition-all">
                <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <Heart className="h-12 w-12 text-secondary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Hope</h3>
                <p className="text-foreground/70 text-lg leading-relaxed">
                  Every story can be rewritten
                </p>
              </div>

              <div className="text-center bg-accent/5 rounded-2xl p-10 hover:bg-accent/10 transition-all">
                <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <Target className="h-12 w-12 text-accent-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Action</h3>
                <p className="text-foreground/70 text-lg leading-relaxed">
                  Tools that create real, measurable change
                </p>
              </div>

              <div className="text-center bg-primary/5 rounded-2xl p-10 hover:bg-primary/10 transition-all">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <Users className="h-12 w-12 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Community</h3>
                <p className="text-foreground/70 text-lg leading-relaxed">
                  Stronger together, always
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision */}
        <section aria-labelledby="vision" className="scroll-mt-16 bg-gradient-to-br from-primary via-accent to-secondary text-primary-foreground rounded-2xl overflow-hidden shadow-2xl">
          <div className="px-8 py-24 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <h2 id="vision" className="font-heading text-4xl md:text-6xl font-bold mb-12">
                Forward is the Only Direction
              </h2>
              <div className="space-y-8 text-lg md:text-xl leading-relaxed">
                <p className="text-primary-foreground/95">
                  We see a future where every justice-impacted person and family has access to the tools, 
                  people, and opportunities needed to thrive — no matter where they are or what challenges they face.
                </p>
                <p className="font-semibold text-xl md:text-2xl">
                  Forward Focus Elevation is more than an organization. It's a digital space, a community, 
                  and a movement of people who believe in second chances and lasting change.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Belong */}
        <section aria-labelledby="belong" className="scroll-mt-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 id="belong" className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-8">
                Join Us. This Is Your Community Too.
              </h2>
              <p className="text-xl text-foreground/70 max-w-4xl mx-auto leading-relaxed">
                Your voice, your journey, and your future matter here. Forward Focus Elevation is a place to 
                learn, heal, grow, and connect — together. Whether you're starting fresh, supporting a loved one, 
                or simply seeking guidance, you belong here.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center bg-primary/5 rounded-2xl p-10 shadow-lg hover:shadow-xl transition-all group">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-md group-hover:scale-110 transition-transform">
                  <Shield className="h-12 w-12 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">Healing & Safety Hub</h3>
                <p className="text-foreground/70 mb-8 text-lg leading-relaxed">
                  Trauma recovery resources, victim services, and personalized support for your healing journey
                </p>
                <Button asChild size="lg" variant="default" className="w-full">
                  <Link to="/victim-services">
                    Explore the Healing Hub
                  </Link>
                </Button>
              </div>

              <div className="text-center bg-accent/5 rounded-2xl p-10 shadow-lg hover:shadow-xl transition-all group">
                <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-8 shadow-md group-hover:scale-110 transition-transform">
                  <Users className="h-12 w-12 text-accent-foreground" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">Reentry Community</h3>
                <p className="text-foreground/70 mb-8 text-lg leading-relaxed">
                  Learning modules, peer support, and guided pathways designed specifically for justice-impacted families
                </p>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">
                  <Link to="/learn">
                    Join the Community
                  </Link>
                </Button>
              </div>

              <div className="text-center bg-secondary/5 rounded-2xl p-10 shadow-lg hover:shadow-xl transition-all group">
                <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-8 shadow-md group-hover:scale-110 transition-transform">
                  <Brain className="h-12 w-12 text-secondary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">AI Assistant</h3>
                <p className="text-foreground/70 mb-8 text-lg leading-relaxed">
                  24/7 guidance to help you navigate resources, find support, and take the next step forward
                </p>
                <Button asChild size="lg" variant="secondary" className="w-full">
                  <Link to="/help">
                    Open the AI Assistant
                  </Link>
                </Button>
              </div>
            </div>

            <div className="text-center bg-background rounded-2xl p-12 shadow-lg border">
              <p className="text-xl text-foreground/70 mb-8">
                Have questions about our services or want to learn more about how we can support you?
              </p>
              <Button asChild size="lg" variant="premium" className="text-lg px-12">
                <Link to="/support">
                  <MessageSquare className="h-5 w-5 mr-3" />
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}