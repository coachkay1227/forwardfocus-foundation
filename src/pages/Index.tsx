import { useEffect, useMemo, useState } from "react";
import { ArrowRight, MapPin, Users, Phone, Shield, Bot, Heart, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { useStateContext } from "@/contexts/StateContext";
import AIResourceDiscovery from "@/components/ai/AIResourceDiscovery";
import StateModal from "@/components/ui/StateModal";
import { EmergencySafetySystem } from "@/components/safety/EmergencySafetySystem";
import { STATES } from "@/data/states";
import testimonialSarah from "@/assets/testimonial-sarah.jpg";
import testimonialMichael from "@/assets/testimonial-michael.jpg";
import testimonialJessica from "@/assets/testimonial-jessica.jpg";
const Index = () => {
  const [showAIDiscovery, setShowAIDiscovery] = useState(false);
  const [showStateModal, setShowStateModal] = useState(false);
  const {
    selectedState,
    setSelectedState
  } = useStateContext();
  const [email, setEmail] = useState("");

  // ---- SEO/meta setup ----
  useEffect(() => {
    document.title = "Forward Focus Elevation | Empowering Justice-Impacted Families";
    const desc = "Empowering justice-impacted families with the tools to rebuild and thrive. AI-enhanced guidance and comprehensive resources for justice-impacted individuals, families, and crime victims.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      canonical.href = window.location.href;
      document.head.appendChild(canonical);
    }
  }, []);

  // ---- Content data ----
  const allStates = useMemo(() => STATES.map(state => state.name), []);
  const onSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast("Thanks! We'll let you know when we launch in your state with the same comprehensive support.");
    setEmail("");
  };
  const servingLabel = selectedState?.name ? `Now serving ${selectedState.name}` : "Now serving Ohio";
  const stateForAI = selectedState?.name ?? "Ohio";
  return <main id="main" className="min-h-screen">
      {/* Emergency Safety System */}
      <EmergencySafetySystem />

      {/* Hero */}
      <section className="relative isolate min-h-[70vh] md:min-h-[60vh] grid place-items-center">
        {/* Background image */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-[url('/images/diverse-families-community.jpg')] bg-cover bg-center" />
        {/* Overlay */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-black/40" />

        <div className="container">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white leading-tight">
              Forward Focus Elevation
            </h1>
            
            {/* State pill */}
            <div className="mt-4 flex justify-center">
              <button onClick={() => setShowStateModal(true)} className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-3 py-1.5 text-sm shadow-sm hover:bg-white/80 transition-colors" aria-label="Change your state">
                <span>📍</span>
                <span className="text-gray-800">Your state: <strong>{selectedState?.name ?? "Ohio"}</strong></span>
                <span className="text-gray-600">• Change</span>
              </button>
            </div>
            
            <p className="mt-6 text-xl md:text-2xl text-white/90 font-medium leading-relaxed">
              Empowering justice-impacted families with the tools to rebuild and thrive.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="premium" className="h-14 px-8 text-lg shadow-lg" asChild>
                
              </Button>

              <Button size="lg" variant="default" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg" asChild>
                
              </Button>

              

              <Button size="lg" variant="hero" className="h-14 px-8 text-lg" asChild>
                
              </Button>

              <Button size="lg" variant="hero" className="h-14 px-8 text-lg" asChild>
                
              </Button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/85">
              <MapPin className="h-4 w-4" aria-hidden />
              <span>AI-enhanced • Trauma-informed • Income-based support</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container py-16 md:py-20">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
          How We Support Your Journey
        </h2>
        <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
          Comprehensive support designed for your unique path forward
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[{
          icon: Phone,
          title: "Get Immediate Help",
          desc: "24/7 support, AI-powered guidance, and live human assistance."
        }, {
          icon: Bot,
          title: "AI-Enhanced Navigation",
          desc: "Smart tech to guide justice-impacted individuals to the right tools."
        }, {
          icon: Users,
          title: "Supportive Community",
          desc: "Peer support, mentorship, and life coaching designed for your journey."
        }].map(item => {
          const Icon = item.icon;
          return <Card key={item.title} className="bg-card hover:shadow-lg transition-all duration-300 hover:scale-[1.015] border-0 shadow-md">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" aria-hidden />
                    </div>
                    <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </CardContent>
              </Card>;
        })}
        </div>
      </section>

      {/* Success stories */}
      <section className="bg-muted/30">
        <div className="container py-16 md:py-20">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Real Stories, Real Progress
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            Hear from community members about their transformative experiences
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {["The trauma-informed approach made all the difference in my healing.", "Finally found a community that understands what I'm going through.", "The AI assistant helped me find resources I didn't know existed."].map((quote, i) => {
            const reviewData = [{
              name: "Sarah M.",
              location: "Columbus, OH",
              avatar: testimonialSarah,
              stars: 5
            }, {
              name: "Michael R.",
              location: "Cleveland, OH",
              avatar: testimonialMichael,
              stars: 5
            }, {
              name: "Jessica T.",
              location: "Cincinnati, OH",
              avatar: testimonialJessica,
              stars: 5
            }];
            const review = reviewData[i];
            return <Card key={i} className="bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                  <CardContent className="pt-8 pb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <img src={review.avatar} alt={`${review.name} testimonial photo`} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <div className="font-semibold text-foreground">{review.name}</div>
                        <div className="text-sm text-muted-foreground">{review.location}</div>
                      </div>
                    </div>
                    
                    <div className="flex mb-4">
                      {Array.from({
                    length: review.stars
                  }).map((_, starIndex) => <span key={starIndex} className="text-yellow-400 text-lg">★</span>)}
                    </div>
                    
                    <div className="text-primary/20 text-6xl mb-4" aria-hidden>
                      &quot;
                    </div>
                    <p className="text-lg text-foreground leading-relaxed mb-4">{quote}</p>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Heart className="h-4 w-4 text-secondary" aria-hidden />
                      <span>Verified Community Member</span>
                    </div>
                  </CardContent>
                </Card>;
          })}
          </div>
        </div>
      </section>

      {/* Expanding Nationwide */}
      <section className="py-12 md:py-16">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-center mb-12">
            Expanding Nationwide
          </h2>
          
          {/* Status pill */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
              <span>📍</span>
              <span className="font-medium">Currently serving: Ohio</span>
            </div>
          </div>

          {/* All 50 states in 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-12">
            {allStates.sort().map(state => {
            const stateData = STATES.find(s => s.name === state);
            const isActive = stateData?.active || false;
            return <div key={state} className="flex items-center justify-between py-1 px-2 rounded-md hover:bg-muted/30 transition-colors">
                  <span className="text-foreground font-medium">{state}</span>
                  <Badge variant={isActive ? "default" : "secondary"} className={isActive ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}>
                    {isActive ? "Available" : "Coming Soon"}
                  </Badge>
                </div>;
          })}
          </div>

          {/* Centered notification form */}
          <div className="max-w-md mx-auto">
            <Card className="bg-white shadow-lg border">
              <CardContent className="p-6">
                <form onSubmit={onSignup} className="space-y-4" aria-label="Notify me form">
                  <Input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email to get notified when we launch in your state" className="h-12 text-base bg-white border-2 focus:border-primary" aria-label="Email address" />
                  <Button type="submit" size="lg" className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
                    Notify Me When Available
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Choose Your Path */}
      <section className="bg-gradient-to-r from-primary/5 via-secondary/10 to-accent/5">
        <div className="container py-16 md:py-20">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-center mb-12">
            Choose Your Path Forward
          </h2>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto items-stretch">
          <Card className="border-2 border-primary/20 bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-full">
            <CardHeader className="pb-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="h-7 w-7 text-primary" aria-hidden />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl font-bold mb-2">Justice-Impacted Families</CardTitle>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Free learning community, peer support, and life coaching.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Free learning community, peer support, and income-based life coaching designed
                specifically for justice-impacted individuals and families.
              </p>
              <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12" aria-label="Join learning community">
                <a href="/learn">Join Learning Community →</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20 bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-full">
            <CardHeader className="pb-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Shield className="h-7 w-7 text-primary" aria-hidden />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl font-bold mb-2">Crime Victims &amp; Survivors</CardTitle>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Specialized trauma-informed support and crisis tools.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Comprehensive healing &amp; safety hub with crisis support, compensation guidance,
                and specialized trauma-informed coaching.
              </p>
              <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12" aria-label="Access Healing and Safety Hub">
                <a href="/victim-services">Access Healing &amp; Safety Hub →</a>
              </Button>
            </CardContent>
          </Card>
        </div>
        </div>
      </section>


      {/* Footer Teaser */}
      <section className="bg-gradient-to-r from-secondary/20 to-accent/20 py-16 text-center">
        <div className="container">
          <h3 className="text-2xl font-bold text-foreground mb-4">Want to Get Involved?</h3>
          <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
            Whether you're a family, nonprofit, or mentor — there's a place for you here.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg h-12 px-8 text-base font-semibold" asChild>
            <a href="/partners">Join the Movement</a>
          </Button>
        </div>
      </section>

      <AIResourceDiscovery isOpen={showAIDiscovery} onClose={() => setShowAIDiscovery(false)} initialQuery="" location={stateForAI} />
      
      <StateModal isOpen={showStateModal} onClose={() => setShowStateModal(false)} currentState={selectedState?.name ?? "Ohio"} onStateChange={stateName => {
      // Find the state object from the limited STATES array, or create a temporary one
      const foundState = STATES.find(s => s.name === stateName);
      if (foundState) {
        setSelectedState(foundState);
      } else {
        // For states not in our STATES array, create a temporary state object
        setSelectedState({
          code: stateName.substring(0, 2).toUpperCase(),
          name: stateName,
          active: false,
          comingSoon: true
        });
      }
    }} />
    </main>;
};
export default Index;