import { useEffect, useMemo, useState } from "react";
import { ArrowRight, MapPin, Users, Phone, Shield, Bot, Heart, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { useStateContext } from "@/contexts/StateContext";
import AIResourceDiscovery from "@/components/ai/AIResourceDiscovery";
import Header from "@/components/layout/Header";

const Index = () => {
  const [showAIDiscovery, setShowAIDiscovery] = useState(false);
  const { selectedState } = useStateContext();
  const [email, setEmail] = useState("");

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

  const comingSoon = useMemo(
    () => ["Texas", "California", "Florida", "Pennsylvania", "Illinois"],
    []
  );

  const onSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast("🎉 Thanks! We'll let you know when we launch in your state.");
    setEmail("");
  };

  const servingLabel = selectedState?.name ? `Now serving ${selectedState.name}` : "Now serving Ohio";
  const stateForAI = selectedState?.name ?? "Ohio";

  return (
    <main id="main" className="min-h-screen">
      {/* ✅ Header now contains the crisis bar */}
      <Header />

      {/* Hero */}
      <section className="relative isolate bg-black">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[url('/images/diverse-families-community.jpg')] bg-cover bg-center"
        />
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

      {/* Rest of your sections… (unchanged) */}
      {/* How it works */}
      {/* Success stories */}
      {/* Expanding Nationwide */}
      {/* Choose Your Path */}
      {/* Our Impact */}
      {/* Footer Teaser */}

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
