import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BookOpen, HeartHandshake, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { useStateContext } from "@/contexts/StateContext";

const Index = () => {
  const { selectedState } = useStateContext();
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.title = "Forward Focus Collective | Your Second Chance Starts Here";
    const desc = "Connecting justice-impacted Americans with resources, education, and community support. Now serving Ohio.";
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
    toast("Thanks! We’ll let you know when we launch in your state.");
    setEmail("");
  };

  return (
    <main id="main" className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-sm text-muted-foreground tracking-wide uppercase">Now serving Ohio</p>
            <h1 className="mt-3 font-heading text-4xl md:text-5xl font-bold">
              Your Second Chance Starts Here
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Connecting justice-impacted Americans with resources, education, and community support.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="h-12" asChild>
                <a href="/help">Get Immediate Help</a>
              </Button>
              <Button size="lg" variant="secondary" className="h-12" asChild>
                <a href="/ohio-resources">Explore {selectedState.name} Resources</a>
              </Button>
              <Button size="lg" variant="outline" className="h-12" asChild>
                <a href="/community">Join Our Community</a>
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" aria-hidden />
              <span>Launching nationwide • Starting in Ohio</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container py-12 md:py-16">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold">How it works</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[{
            icon: Users,
            title: 'Tell us what you need',
            desc: 'Answer a few questions and we’ll point you to relevant resources.'
          },{
            icon: HeartHandshake,
            title: 'Get matched support',
            desc: 'Browse vetted organizations and programs ready to help.'
          },{
            icon: BookOpen,
            title: 'Learn and grow',
            desc: 'Explore courses, workshops, and community groups.'
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
          <h2 className="font-heading text-2xl md:text-3xl font-semibold">Success stories</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {["I found housing support within a week.", "The resume workshop helped me land interviews.", "I finally feel connected to a community that gets it."].map((quote, i) => (
              <Card key={i}>
                <CardContent className="pt-6 text-sm text-muted-foreground">“{quote}”</CardContent>
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

      {/* Featured resources */}
      <section className="bg-muted/30">
        <div className="container py-12 md:py-16">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold">Featured resources in {selectedState.name}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {["Housing support", "Employment services", "Legal aid"].map((title) => (
              <Card key={title}>
                <CardHeader>
                  <CardTitle className="text-base">{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Explore trusted programs and organizations ready to help.
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="container py-12 md:py-16">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold">Our community impact</h2>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {[{ label: 'People helped', value: '1,200+' }, { label: 'Organizations', value: '80+' }, { label: 'Resources listed', value: '300+' }].map((m) => (
            <Card key={m.label}>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold">{m.value}</div>
                <div className="text-sm text-muted-foreground">{m.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Index;
