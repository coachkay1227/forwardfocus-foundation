import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BookOpen, HeartHandshake, MapPin, Users, Phone, Shield, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { useStateContext } from "@/contexts/StateContext";

const Index = () => {
  const { selectedState } = useStateContext();
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.title = "Forward Focus Elevation | Empowering Justice-Impacted Families";
    const desc = "Empowering justice-impacted families with the tools to rebuild and thrive. AI-enhanced guidance and comprehensive resources for justice-impacted individuals, families, and crime victims.";
    const existing = document.querySelector('meta[name="description"]');
    if (existing) existing.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      m.setAttribute("content", desc);
      document.head.appendChild(m);
    }
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      const link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      link.setAttribute("href", window.location.href);
      document.head.appendChild(link);
    }
  }, []);

  const comingSoon = useMemo(() => ["Texas", "California", "Florida", "Pennsylvania", "Illinois"], []);

  const onSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast("Thanks! We'll let you know when we launch in your state with the same comprehensive support.");
    setEmail("");
  };

  return (
    <main id="main" className="min-h-screen">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-2 text-center text-sm font-medium">
        🆘 CRISIS? Call 911 • Crisis Support: 988 • Text HOME to 741741
      </div>

      {/* Hero */}
      <section 
        className="bg-[url('/images/families-collage.jpg')] bg-cover bg-center relative"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/images/families-collage.jpg')"
        }}
      >
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-sm text-white/80 tracking-wide uppercase font-medium">Now serving Ohio</p>
            <h1 className="mt-3 font-heading text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              Forward Focus Elevation
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90 font-medium">
              Empowering justice-impacted families with the tools to rebuild and thrive.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="h-12 bg-burned-orange hover:bg-burned-orange/90" asChild>
                <a href="/help">
                  📞 Get Immediate Help
                </a>
              </Button>
              <Button size="lg" variant="secondary" className="h-12 bg-white/20 text-white border-white/30 hover:bg-white/30" asChild>
                <a href="/learn">
                  👥 Join Learning Community
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-12 bg-white/10 text-white border-white/30 hover:bg-white/20" asChild>
                <a href="/victim-services">
                  <Shield className="mr-2 h-4 w-4" />
                  Healing & Safety Hub
                </a>
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-white/80">
              <MapPin className="h-4 w-4" aria-hidden />
              <span>AI-enhanced • Trauma-informed • Income-based support</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container py-12 md:py-16">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold">How We Support Your Journey</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[{
            icon: '📞',
            title: 'Get Immediate Help',
            desc: '24/7 support, AI-powered guidance, and live human assistance.'
          },{
            icon: '🤖',
            title: 'AI-Enhanced Navigation',
            desc: 'Smart tech to guide justice-impacted individuals to the right tools.'
          },{
            icon: '👥',
            title: 'Supportive Community',
            desc: 'Peer support, mentorship, and life coaching designed for your journey.'
          }].map((item) => (
            <Card key={item.title} className="bg-cream/50">
              <CardHeader className="flex-row items-center gap-3">
                <div className="text-3xl" aria-hidden>{item.icon}</div>
                <CardTitle className="text-base md:text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{item.desc}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Success stories */}
      <section className="bg-cream/30">
        <div className="container py-12 md:py-16">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold">Real Stories, Real Progress</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              "The trauma-informed approach made all the difference in my healing.", 
              "Finally found a community that understands what I'm going through.", 
              "The AI assistant helped me find resources I didn't know existed."
            ].map((quote, i) => (
              <Card key={i} className="bg-white shadow-sm">
                <CardContent className="pt-6 text-sm text-muted-foreground">"{quote}"</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expanding Nationwide */}
      <section className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold">Expanding nationwide</h2>
            <p className="mt-3 text-muted-foreground">Currently serving: Ohio. Coming soon to these states:</p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-foreground/80">
              {comingSoon.map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-primary" aria-hidden />
                  {s}
                </li>
              ))}
            </ul>
            <form onSubmit={onSignup} className="mt-6 flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Get notified when we launch in your state"
                className="h-11"
                aria-label="Email address"
              />
              <Button type="submit" className="h-11">Notify me</Button>
            </form>
          </div>
          <div className="rounded-lg border bg-card">
            <div className="aspect-[4/3] w-full grid place-content-center text-muted-foreground">
              <span className="text-sm">Map placeholder — highlighting Ohio</span>
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Path */}
      <section className="bg-gradient-to-r from-burned-orange/10 via-cream/50 to-warm-blue/10">
        <div className="container py-12 md:py-16">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold">Choose Your Path Forward</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card className="border-2 border-burned-orange/30 bg-white shadow-md border-l-8 border-l-burned-orange">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-burned-orange" />
                  <div>
                    <CardTitle className="text-xl font-bold">Justice-Impacted Families</CardTitle>
                    <p className="text-sm text-muted-foreground">Free learning community, peer support, and life coaching.</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Free learning community, peer support, and income-based life coaching designed specifically for justice-impacted individuals and families.
                </p>
                <Button asChild className="w-full bg-burned-orange hover:bg-burned-orange/90">
                  <a href="/learn">
                    Join Learning Community →
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-warm-blue/30 bg-white shadow-md border-l-8 border-l-warm-blue">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-warm-blue" />
                  <div>
                    <CardTitle className="text-xl font-bold">Crime Victims & Survivors</CardTitle>
                    <p className="text-sm text-muted-foreground">Specialized trauma-informed support and crisis tools.</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Comprehensive healing & safety hub with crisis support, compensation guidance, and specialized trauma-informed coaching.
                </p>
                <Button asChild className="w-full bg-warm-blue hover:bg-warm-blue/90">
                  <a href="/victim-services">
                    Access Healing & Safety Hub →
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="container py-12 md:py-16">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold">What Makes Us Different</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-cream/50">
            <CardContent className="pt-6 text-center">
              <Bot className="h-12 w-12 text-warm-blue mx-auto mb-3" />
              <div className="font-semibold text-gray-900 mb-2">AI-Enhanced Guidance</div>
              <div className="text-sm text-muted-foreground">Smart technology that understands justice-impacted experiences</div>
            </CardContent>
          </Card>
          <Card className="bg-cream/50">
            <CardContent className="pt-6 text-center">
              <HeartHandshake className="h-12 w-12 text-burned-orange mx-auto mb-3" />
              <div className="font-semibold text-gray-900 mb-2">Trauma-Informed Care</div>
              <div className="text-sm text-muted-foreground">Every interaction designed with safety, trust, and empowerment</div>
            </CardContent>
          </Card>
          <Card className="bg-cream/50">
            <CardContent className="pt-6 text-center">
              <Users className="h-12 w-12 text-warm-blue mx-auto mb-3" />
              <div className="font-semibold text-gray-900 mb-2">Income-Based Support</div>
              <div className="text-sm text-muted-foreground">Accessible life coaching and support regardless of financial situation</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer Teaser */}
      <section className="bg-navy-900 text-white py-12 text-center">
        <div className="container">
          <h3 className="text-lg font-semibold">Want to Get Involved?</h3>
          <p className="text-sm mb-6 text-white/80">Whether you're a family, nonprofit, or mentor — there's a place for you here.</p>
          <Button size="lg" className="bg-burned-orange hover:bg-burned-orange/90 shadow-md">
            <a href="/partners">Join the Movement</a>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Index;