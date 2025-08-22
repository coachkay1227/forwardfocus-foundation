import { useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Heart, Users, Shield, CheckCircle, Target, Brain,
  MessageSquare, BookOpen, Home, Phone, ArrowRight, Star 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-secondary/90"></div>
        <div className="relative container py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
              About Forward Focus Elevation
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 leading-relaxed">
              We exist to empower justice-impacted individuals and families to rebuild, thrive, and rise — with dignity, hope, and community.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm mb-8">
              <span className="flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full">
                <Shield className="h-4 w-4" />
                Dignity
              </span>
              <span className="flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full">
                <Heart className="h-4 w-4" />
                Hope
              </span>
              <span className="flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full">
                <Users className="h-4 w-4" />
                Community
              </span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/victim-services">
                  <Shield className="h-4 w-4 mr-2" />
                  Explore the Healing Hub
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/learn">
                  <Users className="h-4 w-4 mr-2" />
                  Join the Reentry Community
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-16 space-y-20">
        {/* Our Story */}
        <section aria-labelledby="story" className="scroll-mt-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 id="story" className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Our Story
                </h2>
                <div className="space-y-6 text-foreground/80">
                  <p className="text-lg leading-relaxed">
                    Forward Focus Elevation was born from lived experience. We saw firsthand how hard it is for 
                    justice-impacted individuals and their families to access real support. Traditional systems 
                    were fragmented, outdated, and often left people behind.
                  </p>
                  <p className="text-lg leading-relaxed">
                    So, we built something different — a trauma-informed, AI-powered platform that's available 
                    anytime, anywhere. A community designed not just to provide resources, but to empower transformation.
                  </p>
                </div>
              </div>
              <div className="bg-accent/10 rounded-lg p-8 text-center">
                <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-12 w-12 text-accent-foreground" />
                </div>
                <p className="text-lg font-medium text-accent-foreground">
                  Built by community, for community
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section aria-labelledby="different" className="scroll-mt-16 bg-secondary/5 py-16 -mx-4 px-4 rounded-lg">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="different" className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                We're Not Just Another Resource — We're a Movement
              </h2>
              <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
                Experience the difference of a platform built with your journey in mind
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-background rounded-lg p-8 border shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Brain className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    24/7 AI + Human-Powered Guidance
                  </h3>
                </div>
                <p className="text-foreground/80 mb-4">
                  Trauma recovery, reentry support, and growth resources available whenever you need them. 
                  Technology enhances support—it never replaces human connection.
                </p>
              </div>

              <div className="bg-background rounded-lg p-8 border shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Safe, Judgment-Free Community
                  </h3>
                </div>
                <p className="text-foreground/80 mb-4">
                  Peer and professional support in an environment where you're understood, 
                  valued, and empowered to thrive on your own terms.
                </p>
              </div>

              <div className="bg-background rounded-lg p-8 border shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Built for Diverse Communities
                  </h3>
                </div>
                <p className="text-foreground/80 mb-4">
                  Accessible, inclusive, and designed for real life. We understand that every 
                  journey is unique and every person deserves dignity and respect.
                </p>
              </div>

              <div className="bg-background rounded-lg p-8 border shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Interactive Tools That Create Action
                  </h3>
                </div>
                <p className="text-foreground/80 mb-4">
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
            <div className="text-center mb-12">
              <h2 id="values" className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Values Guide Everything We Do
              </h2>
              <p className="text-xl text-foreground/80">
                These principles shape every interaction, every resource, and every decision we make
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Dignity</h3>
                <p className="text-foreground/80">
                  Everyone deserves respect and humanity
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-10 w-10 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Hope</h3>
                <p className="text-foreground/80">
                  Every story can be rewritten
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-10 w-10 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Action</h3>
                <p className="text-foreground/80">
                  Tools that create real, measurable change
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Community</h3>
                <p className="text-foreground/80">
                  Stronger together, always
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision */}
        <section aria-labelledby="vision" className="scroll-mt-16 bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground rounded-lg overflow-hidden">
          <div className="px-8 py-16 md:py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 id="vision" className="font-heading text-3xl md:text-5xl font-bold mb-8">
                Forward is the Only Direction
              </h2>
              <div className="space-y-6 text-lg md:text-xl leading-relaxed">
                <p>
                  We see a future where every justice-impacted person and family has access to the tools, 
                  people, and opportunities needed to thrive — no matter where they are or what challenges they face.
                </p>
                <p className="font-medium">
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
            <div className="text-center mb-12">
              <h2 id="belong" className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6">
                Join Us. This Is Your Community Too.
              </h2>
              <p className="text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
                Your voice, your journey, and your future matter here. Forward Focus Elevation is a place to 
                learn, heal, grow, and connect — together. Whether you're starting fresh, supporting a loved one, 
                or simply seeking guidance, you belong here.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center bg-primary/5 rounded-lg p-8">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Healing & Safety Hub</h3>
                <p className="text-foreground/80 mb-6">
                  Trauma recovery resources, victim services, and personalized support for your healing journey
                </p>
                <Button asChild size="lg" variant="default">
                  <Link to="/victim-services">
                    Explore the Healing Hub
                  </Link>
                </Button>
              </div>

              <div className="text-center bg-accent/5 rounded-lg p-8">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-10 w-10 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Reentry Community</h3>
                <p className="text-foreground/80 mb-6">
                  Learning modules, peer support, and guided pathways designed specifically for justice-impacted families
                </p>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link to="/learn">
                    Join the Reentry Community
                  </Link>
                </Button>
              </div>

              <div className="text-center bg-secondary/5 rounded-lg p-8">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="h-10 w-10 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">AI Assistant</h3>
                <p className="text-foreground/80 mb-6">
                  24/7 guidance to help you navigate resources, find support, and take the next step forward
                </p>
                <Button asChild size="lg" variant="secondary">
                  <Link to="/help">
                    Open the AI Assistant
                  </Link>
                </Button>
              </div>
            </div>

            <div className="text-center bg-muted rounded-lg p-8">
              <p className="text-lg text-foreground/80 mb-4">
                Have questions about our services or want to learn more about how we can support you?
              </p>
              <Button asChild size="lg" variant="outline">
                <Link to="/support">
                  <MessageSquare className="h-4 w-4 mr-2" />
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