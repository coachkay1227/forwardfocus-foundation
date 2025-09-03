import { useEffect, useMemo, useState } from "react";
import { ArrowRight, MapPin, Users, Phone, Shield, Bot, Heart, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { useStateContext } from "@/contexts/StateContext";
import AIResourceDiscovery from "@/components/ai/AIResourceDiscovery";
import StateMap from "@/components/ui/StateMap";

const Index = () => {
  const [showAIDiscovery, setShowAIDiscovery] = useState(false);
  const { selectedState } = useStateContext();
  const [email, setEmail] = useState("");

  // ---- SEO/meta setup ----
  useEffect(() => {
    document.title = "Forward Focus Elevation | Empowering Justice-Impacted Families";

    const desc =
      "Empowering justice-impacted families with the tools to rebuild and thrive. AI-enhanced guidance and comprehensive resources for justice-impacted individuals, families, and crime victims.";

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
  const allStates = useMemo(
    () => [
      "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", 
      "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", 
      "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", 
      "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", 
      "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", 
      "New Hampshire", "New Jersey", "New Mexico", "New York", 
      "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", 
      "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
      "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", 
      "West Virginia", "Wisconsin", "Wyoming"
    ],
    []
  );

  const onSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast("Thanks! We'll let you know when we launch in your state with the same comprehensive support.");
    setEmail("");
  };

  const servingLabel = selectedState?.name ? `Now serving ${selectedState.name}` : "Now serving Ohio";
  const stateForAI = selectedState?.name ?? "Ohio";

  return (
    <main id="main" className="min-h-screen">
      {/* Emergency Banner */}
      <div className="bg-destructive text-destructive-foreground py-3 text-center font-medium shadow-sm">
        <div className="container flex items-center justify-center gap-2">
          <Shield className="h-4 w-4" aria-hidden />
          <span>
            CRISIS? Call 911 • Crisis Support: 988 • Text HOME to 741741
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative isolate bg-black">
        {/* Background image */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[url('/images/diverse-families-community.jpg')] bg-cover bg-center"
        />
        {/* Overlay */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-black/40" />

        <div className="container py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-sm text-white/85 tracking-wide uppercase font-medium">
              {servingLabel}
            </p>
            <h1 className="mt-3 font-heading text-5xl md:text-6xl font-bold text-white leading-tight">
              Forward Focus Elevation
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-white/90 font-medium leading-relaxed">
              Empowering justice-impacted families with the tools to rebuild and thrive.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="premium" className="h-14 px-8 text-lg shadow-lg" asChild>
                <a href="/help" aria-label="Get immediate help">
                  <Phone className="mr-2 h-5 w-5" aria-hidden />
                  Get Immediate Help
                </a>
              </Button>

              <Button
                size="lg"
                variant="hero"
                className="h-14 px-8 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                onClick={() => setShowAIDiscovery(true)}
                aria-label="Ask AI Navigator"
              >
                <Bot className="mr-2 h-5 w-5" aria-hidden />
                Ask AI Navigator
              </Button>

              <Button size="lg" variant="hero" className="h-14 px-8 text-lg" asChild>
                <a href="/learn" aria-label="Join learning community">
                  <Users className="mr-2 h-5 w-5" aria-hidden />
                  Join Learning Community
                </a>
              </Button>

              <Button size="lg" variant="hero" className="h-14 px-8 text-lg" asChild>
                <a href="/victim-services" aria-label="Go to Healing and Safety Hub">
                  <Shield className="mr-2 h-5 w-5" aria-hidden />
                  Healing &amp; Safety Hub
                </a>
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-white/85">
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
          {[
            {
              icon: Phone,
              title: "Get Immediate Help",
              desc: "24/7 support, AI-powered guidance, and live human assistance.",
            },
            {
              icon: Bot,
              title: "AI-Enhanced Navigation",
              desc: "Smart tech to guide justice-impacted individuals to the right tools.",
            },
            {
              icon: Users,
              title: "Supportive Community",
              desc: "Peer support, mentorship, and life coaching designed for your journey.",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="bg-card hover:shadow-lg transition-all duration-300 hover:scale-[1.015] border-0 shadow-md"
              >
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
              </Card>
            );
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
            {[
              "The trauma-informed approach made all the difference in my healing.",
              "Finally found a community that understands what I'm going through.",
              "The AI assistant helped me find resources I didn't know existed.",
            ].map((quote, i) => (
              <Card
                key={i}
                className="bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 border-0"
              >
                <CardContent className="pt-8 pb-6">
                  <div className="text-primary/20 text-6xl mb-4" aria-hidden>
                    &quot;
                  </div>
                  <p className="text-lg text-foreground leading-relaxed mb-4">{quote}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Heart className="h-4 w-4 text-secondary" aria-hidden />
                    <span>Community Member</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expanding Nationwide */}
      <section className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div className="flex flex-col justify-between h-full">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-center">
                Expanding nationwide
              </h2>
              <p className="mt-3 text-muted-foreground">
                Currently serving: {selectedState?.name ?? "Ohio"}. All other states coming soon:
              </p>
              <ul className="mt-4 grid grid-cols-3 gap-1 text-sm text-foreground/80 max-h-48 overflow-y-auto">
                {allStates.filter(state => state !== (selectedState?.name ?? "Ohio")).map((s) => (
                  <li key={s} className="flex items-center gap-1">
                    <ArrowRight className="h-3 w-3 text-primary flex-shrink-0" aria-hidden />
                    <span className="truncate">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={onSignup} className="mt-6 flex flex-col sm:flex-row gap-2" aria-label="Notify me form">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Get notified when we launch in your state"
                className="h-11"
                aria-label="Email address"
              />
              <Button type="submit" className="h-11">
                Notify me
              </Button>
            </form>
          </div>

          <StateMap 
            stateName={selectedState?.name ?? "Ohio"}
            zoom={6}
            className="aspect-[4/3]"
          />
        </div>
      </section>

      {/* Choose Your Path */}
      <section className="bg-gradient-to-r from-burned-orange/10 via-cream/50 to-warm-blue/10">
        <div className="container py-12 md:py-16">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold">
            Choose Your Path Forward
          </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card className="border-2 border-burned-orange/30 bg-white shadow-md border-l-8 border-l-burned-orange">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-burned-orange" aria-hidden />
                <div>
                  <CardTitle className="text-xl font-bold">Justice-Impacted Families</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Free learning community, peer support, and life coaching.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Free learning community, peer support, and income-based life coaching designed
                specifically for justice-impacted individuals and families.
              </p>
              <Button asChild className="w-full bg-burned-orange hover:bg-burned-orange/90" aria-label="Join learning community">
                <a href="/learn">Join Learning Community →</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-warm-blue/30 bg-white shadow-md border-l-8 border-l-warm-blue">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-warm-blue" aria-hidden />
                <div>
                  <CardTitle className="text-xl font-bold">Crime Victims &amp; Survivors</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Specialized trauma-informed support and crisis tools.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Comprehensive healing &amp; safety hub with crisis support, compensation guidance,
                and specialized trauma-informed coaching.
              </p>
              <Button asChild className="w-full bg-warm-blue hover:bg-warm-blue/90" aria-label="Access Healing and Safety Hub">
                <a href="/victim-services">Access Healing &amp; Safety Hub →</a>
              </Button>
            </CardContent>
          </Card>
        </div>
        </div>
      </section>


      {/* Footer Teaser */}
      <section className="bg-navy-900 text-white py-12 text-center">
        <div className="container">
          <h3 className="text-lg font-semibold">Want to Get Involved?</h3>
          <p className="text-sm mb-6 text-white/80">
            Whether you're a family, nonprofit, or mentor — there's a place for you here.
          </p>
          <Button size="lg" className="bg-burned-orange hover:bg-burned-orange/90 shadow-md" asChild>
            <a href="/partners">Join the Movement</a>
          </Button>
        </div>
      </section>

      <AIResourceDiscovery
        isOpen={showAIDiscovery}
        onClose={() => setShowAIDiscovery(false)}
        initialQuery=""
        location={stateForAI}
      />
    </main>
  );
};

export default Index;
