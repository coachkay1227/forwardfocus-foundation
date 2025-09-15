import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Users, Shield, CheckCircle, Target, Brain, MessageSquare, BookOpen, Home, Phone, ArrowRight, Star, Calendar, Award, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContactForm from "@/components/forms/ContactForm";
import BookingCalendar from "@/components/ui/BookingCalendar";

// Import images
import coachKayProfessional from "@/assets/coach-kay-professional.jpg";
import diverseCommunityMeeting from "@/assets/diverse-community-meeting.jpg";
export default function AboutUs() {
  const [showConsultation, setShowConsultation] = useState(false);
  // Force cache refresh - all image imports are correctly updated
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
        <div className="absolute inset-0 bg-gradient-to-br from-osu-scarlet/95 to-osu-scarlet-dark/80"></div>
        <div className="relative container py-24 md:py-32">
          <div className="max-w-5xl mx-auto">
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-8 leading-tight">
              About Forward Focus Elevation
            </h1>
            <p className="text-lg md:text-xl mb-12 text-white/90 leading-relaxed max-w-3xl">Real Healing. Smart Tools. Second Chances for Every Story. AI-powered transformation for justice-impacted individuals and families because your next chapter deserves more than survival.</p>
            <div className="flex items-center gap-6 text-sm mb-12 flex-wrap">
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
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
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
        {/* Our Story */}
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
                <p className="text-foreground/70 text-lg leading-relaxed">Trauma recovery, reentry support, and growth resources available whenever you need them. Technology enhances support, it never replaces human connection.</p>
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
                <p className="text-primary-foreground/95">We see a future where every justice-impacted person and family has access to the tools, people, and opportunities needed to thrive no matter where they are or what challenges they face.</p>
                <p className="font-semibold text-xl md:text-2xl">
                  Forward Focus Elevation is more than an organization. It's a digital space, a community, 
                  and a movement of people who believe in second chances and lasting change.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Meet Coach Kay Section */}
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
                  <BookingCalendar />
                  <Button size="lg" variant="outline" onClick={() => setShowConsultation(!showConsultation)}>
                    <Calendar className="h-5 w-5 mr-2" />
                    {showConsultation ? "Hide Consultation" : "Book Consultation"}
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


        {/* Book Consultation */}
        {showConsultation && (
          <section id="book-consultation" aria-labelledby="book-consult" className="scroll-mt-16 bg-primary/5 py-24 -mx-4 px-4 rounded-2xl">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 id="book-consult" className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Book Your Consultation
                </h2>
                <p className="text-xl text-foreground/70 leading-relaxed">
                  Schedule a one-on-one session with Coach Kay to discuss your goals, challenges, and create 
                  a personalized action plan for your journey forward.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-8 text-left">
                  <div className="bg-background rounded-lg p-6 shadow-lg">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-accent" />
                      Initial Assessment
                    </h3>
                    <p className="text-sm text-foreground/70">
                      Understand your current situation, goals, and identify the best resources for your journey.
                    </p>
                  </div>
                  <div className="bg-background rounded-lg p-6 shadow-lg">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-accent" />
                      Personalized Plan
                    </h3>
                    <p className="text-sm text-foreground/70">
                      Receive a customized roadmap with actionable steps, resources, and timelines.
                    </p>
                  </div>
                  <div className="bg-background rounded-lg p-6 shadow-lg">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-accent" />
                      Ongoing Support
                    </h3>
                    <p className="text-sm text-foreground/70">
                      Get connected to the right community resources and follow-up support systems.
                    </p>
                  </div>
                </div>
              </div>
              
              <ContactForm type="booking" className="shadow-xl bg-background" />
            </div>
          </section>
        )}

        {/* Call to Belong */}
        <section aria-labelledby="belong" className="scroll-mt-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 id="belong" className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-8">
                Join Our Movement
              </h2>
              <p className="text-xl text-foreground/70 max-w-4xl mx-auto leading-relaxed">
                Your voice, your journey, and your future matter here. Forward Focus Elevation is a place to 
                learn, heal, grow, and connect — together.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center bg-primary/5 rounded-2xl p-10 shadow-lg hover:shadow-xl transition-all group">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-md group-hover:scale-110 transition-transform">
                  <Shield className="h-12 w-12 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">Healing & Safety Hub</h3>
                <p className="text-foreground/70 mb-8 text-lg leading-relaxed">
                  Trauma recovery resources and victim services for your healing journey
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
                <h3 className="text-2xl font-semibold text-foreground mb-6">Learning Community</h3>
                <p className="text-foreground/70 mb-8 text-lg leading-relaxed">
                  Peer support and guided learning designed for justice-impacted families
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
                  24/7 guidance to help you navigate resources and take the next step
                </p>
                <Button asChild size="lg" variant="secondary" className="w-full">
                  <Link to="/help">
                    Get AI Support
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>;
}