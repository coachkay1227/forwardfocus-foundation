import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { EXTERNAL } from "@/data/externalLinks";

const Page = () => {
  useEffect(() => {
    document.title = "About Us | Forward Focus Elevation";
    const ensureMeta = (selector: string, createEl: () => HTMLElement) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = createEl();
        document.head.appendChild(el);
      }
      return el as HTMLElement;
    };
    const desc = ensureMeta('meta[name="description"]', () => {
      const m = document.createElement('meta');
      m.setAttribute('name', 'description');
      return m;
    });
    desc.setAttribute('content', 'Trauma-informed support for justice-impacted families. Education, community, and AI-enhanced guidance.');

    const canonical = ensureMeta('link[rel="canonical"]', () => {
      const l = document.createElement('link');
      l.setAttribute('rel', 'canonical');
      return l;
    });
    canonical.setAttribute('href', window.location.origin + '/about');

    // JSON-LD Organization structured data
    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Forward Focus Elevation',
      url: 'https://forwardfocuselevation.org',
      sameAs: ['https://forwardfocuselevation.org'],
      areaServed: 'US-OH',
      description: 'Empowering justice-impacted families with the tools to rebuild and thrive.',
      brand: {
        '@type': 'Brand',
        name: 'Forward Focus Collective',
        description: 'Community platform for members and partners'
      }
    });
    document.head.appendChild(ld);

    return () => {
      document.head.removeChild(ld);
    };
  }, []);

  return (
    <main id="main">
      <header className="border-b bg-background">
        <div className="container py-12">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold">About Forward Focus Elevation</h1>
          <p className="mt-3 text-muted-foreground max-w-3xl">We combine trauma‑informed care with AI‑enhanced tools to help justice‑impacted families navigate resources and build stronger futures.</p>
        </div>
      </header>

      <div className="container py-12 space-y-12">
        {/* 1. Our Mission */}
        <section aria-labelledby="mission" className="scroll-mt-16">
          <h2 id="mission" className="font-heading text-2xl md:text-3xl font-semibold">Our Mission</h2>
          <p className="mt-3 text-muted-foreground max-w-3xl">We provide trauma‑informed support for justice‑impacted families. Our focus is practical help, dignity, and steady progress.</p>
          <p className="mt-2 text-foreground/80 max-w-3xl">We believe stronger communities are built through connection, access to resources, and opportunities to learn and grow.</p>
        </section>

        {/* 2. What We Offer */}
        <section aria-labelledby="offer" className="scroll-mt-16">
          <h2 id="offer" className="font-heading text-2xl md:text-3xl font-semibold">What We Offer</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-md border bg-card p-4">Educational resources and courses</li>
            <li className="rounded-md border bg-card p-4">Community platform access</li>
            <li className="rounded-md border bg-card p-4">AI‑enhanced guidance tools</li>
            <li className="rounded-md border bg-card p-4">Healing circles and peer support</li>
          </ul>
        </section>

        {/* 3. How We're Different */}
        <section aria-labelledby="different" className="scroll-mt-16">
          <h2 id="different" className="font-heading text-2xl md:text-3xl font-semibold">How We’re Different</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-md border bg-card p-4">AI tools designed for justice‑impacted needs</li>
            <li className="rounded-md border bg-card p-4">Trauma‑informed approach to every interaction</li>
            <li className="rounded-md border bg-card p-4">Built by people who understand the journey</li>
            <li className="rounded-md border bg-card p-4">We use AI to enhance human connection — never replace it</li>
          </ul>
          <div className="mt-4">
            <Button asChild><a href="/help#learn-assistant">Try our AI assistant</a></Button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;
