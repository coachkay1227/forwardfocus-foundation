import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Users, Shield, CheckCircle, Target, Brain, MessageSquare, BookOpen, Home, Phone, ArrowRight, Star, Calendar, Award, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContactForm from "@/components/forms/ContactForm";
import ChatbotPopup from "@/components/ui/ChatbotPopup";


// Import images
import coachKayProfessional from "@/assets/coach-kay-professional.jpg";
import diverseCommunityMeeting from "@/assets/diverse-community-meeting.jpg";
export default function AboutUs() {
  const [showConsultation, setShowConsultation] = useState(false);
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
      serviceType: ['Healing & Safety Hub', 'Reentry Community', 'AI-Powered Guidance', 'Trauma Recovery Support']
    });
    document.head.appendChild(ld);
    return () => {
      if (document.head.contains(ld)) {
        document.head.removeChild(ld);
      }
    };
  }, []);
  return <main id="main">
      {/* Hero Section */}
      <header className="relative bg-gradient-osu-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/90 via-osu-scarlet/80 to-osu-scarlet-dark/70"></div>
        <div className="relative container py-24 md:py-32 flex items-center justify-center text-center">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-8 leading-tight">
              About Forward Focus Elevation
            </h1>
            <p className="text-lg md:text-xl mb-12 text-white/90 leading-relaxed max-w-3xl mx-auto">Real Healing. Smart Tools. Second Chances for Every Story. AI-powered transformation for justice-impacted individuals and families because your next chapter deserves more than survival.</p>
            <div className="flex items-center justify-center gap-6 text-sm mb-12 flex-wrap">
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full">
                <Shield className="h-5 w-5" />
                Dignity
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full">
                <Heart className="h-5 w-5" />
                Hope
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full">
                <Users className="h-5 w-5" />
                Community
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg justify-center mx-auto">
              <Button asChild size="lg" variant="secondary" className="flex-1 bg-white text-osu-scarlet hover:bg-white/90">
                <Link to="/victim-services">
                  <Shield className="h-5 w-5 mr-2" />
                  Explore the Healing Hub
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-osu-gray hover:bg-osu-gray-dark text-white flex-1">
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
        {/* Our Story & Vision Combined */}
        <section aria-labelledby="story" className="scroll-mt-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 id="story" className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-8">
                  Our Story
                </h2>
                <div className="space-y-8 text-foreground">
                  <p className="text-xl leading-relaxed">Forward Focus Elevation was born from lived experiences. We saw firsthand how hard it is for justice-impacted individuals and their families to access real support. Traditional systems were fragmented, outdated, and often left people behind.</p>
                  <p className="text-xl leading-relaxed">
                    So, we built something different — a trauma-informed, AI-powered platform that's available 
                    anytime, anywhere. A community designed not just to provide resources, but to empower transformation.
                  </p>
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-2xl border-l-4 border-primary">
                    <p className="text-lg font-semibold text-foreground mb-4">Forward is the Only Direction</p>
                    <p className="text-foreground/80 leading-relaxed">
                      We see a future where every justice-impacted person and family has access to the tools, people, and opportunities needed to thrive no matter where they are or what challenges they face. Forward Focus Elevation is more than an organization — it's a digital space, a community, and a movement of people who believe in second chances and lasting change.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img src={diverseCommunityMeeting} alt="Diverse community members in supportive meeting environment" className="w-full h-80 object-cover" />
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

        {/* Meet Coach Kay Section - Expanded */}
        <section aria-labelledby="coach-kay" className="scroll-mt-16 bg-gradient-to-br from-secondary/10 to-accent/10 py-24 -mx-4 px-4 rounded-2xl">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h2 id="coach-kay" className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-8">
                  Meet Coach Kay
                </h2>
                <div className="space-y-6 text-foreground">
                  <p className="text-xl leading-relaxed">
                    Behind Forward Focus Elevation is Coach Kay, a passionate advocate with lived proximity to the justice system. As someone who has supported family, friends, and community members through incarceration, reentry, and systemic trauma, she's seen firsthand how generational harm, lack of resources, and broken systems impact entire families not just individuals.
                  </p>
                  <p className="text-lg leading-relaxed">
                    What began as personal support for loved ones evolved into a mission. Coach Kay combined her spiritual practice, trauma-informed education, and deep commitment to equity to create tools that meet people where they are with compassion, clarity, and modern solutions.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Through Forward Focus Elevation and the Collective, a free community peer supported community she now designs AI-powered resources, healing programs, and safe spaces that center justice-impacted individuals and their families. Her belief is simple: everyone deserves dignity, access, and a real chance to rebuild.
                  </p>
                  
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <ChatbotPopup />
                  <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={() => window.open('https://calendly.com/ffe_coach_kay', '_blank')}
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Book Consultation
                  </Button>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img src="/lovable-uploads/fad5cdf5-77d8-4054-93a4-6e6af3cf8099.png" alt="Coach Kay, founder of Forward Focus Elevation, sitting professionally in a modern office setting" className="w-full h-96 lg:h-[500px] object-contain" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end">
                    <div className="p-8 text-white">
                      <p className="text-xl font-semibold mb-2">
                        "We hustle different. With clarity. With care. With cause."
                      </p>
                      <p className="text-white/90">— Coach Kay, Founder</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="scroll-mt-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-8">
              Ready to Connect?
            </h2>
            <p className="text-xl text-foreground/70 mb-12 leading-relaxed">
              Whether you have questions, need support, or want to get involved — we're here for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <Button asChild size="lg" variant="default" className="flex-1">
                <Link to="/victim-services">
                  <Shield className="h-5 w-5 mr-2" />
                  Explore the Healing Hub
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="flex-1">
                <Link to="/learn">
                  <Users className="h-5 w-5 mr-2" />
                  Join the Community
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>;
}