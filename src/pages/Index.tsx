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
    document.title = "Forward Focus Collective | Trauma-Informed Support for Justice-Impacted Families";
    const desc = "Trauma-informed support, AI-enhanced guidance, and comprehensive resources for justice-impacted individuals, families, and crime victims. Starting in Ohio, expanding nationwide.";
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
      <section className="bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-sm text-muted-foreground tracking-wide uppercase">Now serving Ohio</p>
            <h1 className="mt-3 font-heading text-4xl md:text-5xl font-bold">
              Your Journey Forward Starts Here
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Trauma-informed support, AI-enhanced guidance, and comprehensive resources for justice-impacted individuals, families, and crime victims.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="h-12 bg-red-600 hover:bg-red-700" asChild>
                <a href="/help">
                  <Phone className="mr-2 h-4 w-4" />
                  Get Immediate Help
                </a>
              </Button>
              <Button size="lg" variant="secondary" className="h-12" asChild>
                <a href="/learn">
                  <Users className="mr-2 h-4 w-4" />
                  Join Learning Community
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-12" asChild>
                <a href="/victim-services">
                  <Shield className="mr-2 h-4 w-4" />
                  Victim Services
                </a>
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" aria-hidden />
              <span>AI-enhanced • Trauma-informed • Income-based support</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container py-12 md:py-16">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold">How we support your journey</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[{
            icon: Phone,
            title: 'Get immediate help',
            desc: '24/7 crisis support, AI-powered guidance, and comprehensive Ohio resource directory.'
          },{
            icon: Bot,
            title: 'AI-enhanced navigation',
            desc: 'Smart technology that understands justice-impacted experiences and guides you to the right resources.'
          },{
            icon: Users,
            title: 'Join supportive community',
            desc: 'Free education, peer support, and income-based life coaching designed for your journey.'
          }].map((item) => (
            <Card key={item.title}>
              <CardHeader className="flex-row items-center gap-3">
                <item.icon className="h-6 w-6 text-primary" aria-hidden />
                <CardTitle className="text-base md:text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{item.desc}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Success stories */}
      <section className="bg-muted/30">
        <div className="container py-12 md:py-16">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold">Real stories, real progress</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              "The AI assistant helped me find resources I didn't even know existed.", 
              "Finally found a community that actually understands what I'm going through.", 
              "The trauma-informed approach made all the difference in my healing."
            ].map((quote, i) => (
              <Card key={i}>
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
      <section className="bg-muted/30">
        <div className="container py-12 md:py-16">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold">Choose your path forward</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card className="border-2 border-green-200 bg-green-50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-green-600" />
                  <div>
                    <CardTitle className="text-green-900">Justice-Impacted Families</CardTitle>
                    <p className="text-sm text-green-700">Reentry support, education, and community</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-green-800 mb-4">
                  Free learning community, peer support, and income-based life coaching designed specifically for justice-impacted individuals and families.
                </p>
                <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                  <a href="/learn">
                    <Users className="mr-2 h-4 w-4" />
                    Join Learning Community
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 bg-purple-50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-purple-600" />
                  <div>
                    <CardTitle className="text-purple-900">Crime Victims & Survivors</CardTitle>
                    <p className="text-sm text-purple-700">Specialized trauma-informed support</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-purple-800 mb-4">
                  Comprehensive victim services hub with crisis support, compensation guidance, and specialized trauma-informed coaching.
                </p>
                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                  <a href="/victim-services">
                    <Shield className="mr-2 h-4 w-4" />
                    Access Victim Services
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="container py-12 md:py-16">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold">What makes us different</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <Bot className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <div className="font-semibold text-gray-900 mb-2">AI-Enhanced Guidance</div>
              <div className="text-sm text-muted-foreground">Smart technology that understands justice-impacted experiences</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <HeartHandshake className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <div className="font-semibold text-gray-900 mb-2">Trauma-Informed Care</div>
              <div className="text-sm text-muted-foreground">Every interaction designed with safety, trust, and empowerment</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <div className="font-semibold text-gray-900 mb-2">Income-Based Support</div>
              <div className="text-sm text-muted-foreground">Accessible life coaching and support regardless of financial situation</div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Index;