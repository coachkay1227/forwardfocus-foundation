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
    desc.setAttribute('content', 'Forward Focus Elevation: Launching Ohio\'s first AI-powered, trauma-informed nonprofit for justice-impacted families.');

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
          <h1 className="font-heading text-3xl md:text-4xl font-semibold">Forward Focus Elevation: Where Innovation Meets Heart</h1>
          <p className="mt-3 text-muted-foreground max-w-3xl">Launching Ohio's first AI-powered, trauma-informed nonprofit for justice-impacted families. After years of supporting individuals personally, we're building the future of reentry support.</p>
          <div className="mt-4 text-sm text-muted-foreground">Launching in Ohio • AI-Powered Support • Built by Those We Serve</div>
          <div className="mt-2 text-sm text-foreground/80">Grant-ready programs designed for measurable impact in the digital age</div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="default"><a href="/partners">Partner With Us</a></Button>
            <Button asChild variant="secondary"><a href="/community">Join the Collective</a></Button>
            <Button asChild variant="outline"><a href="/support">Support Our Mission</a></Button>
          </div>
        </div>
      </header>

      <div className="container py-12 space-y-16">
        <section aria-labelledby="mission" className="scroll-mt-16">
          <h2 id="mission" className="font-heading text-2xl md:text-3xl font-semibold">Our Mission: 2025 Technology with Timeless Compassion</h2>
          <p className="mt-3 text-muted-foreground max-w-3xl">Empowering justice-impacted families with the tools to rebuild and thrive.</p>
          <p className="mt-2 text-foreground/80 max-w-3xl">Vision: Building Stronger Families, Safer Communities, and Brighter Futures through innovative support.</p>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-md border bg-card p-4">Reduce recidivism through 24/7 AI-assisted comprehensive support</li>
            <li className="rounded-md border bg-card p-4">Strengthen family connections through digital and human community</li>
            <li className="rounded-md border bg-card p-4">Create economic opportunities through AI-enhanced financial literacy</li>
            <li className="rounded-md border bg-card p-4">Foster community healing through innovative peer support platforms</li>
          </ul>
        </section>

        <section aria-labelledby="founder" className="scroll-mt-16">
          <h2 id="founder" className="font-heading text-2xl md:text-3xl font-semibold">Why Forward Focus Elevation Exists</h2>
          <p className="mt-2 text-muted-foreground">From Personal Support to Systematic Innovation</p>
          <div className="mt-4 rounded-md border bg-muted/40 p-4 text-sm text-muted-foreground">
            [Founder story placeholder] Personal understanding of the challenges faced • Years of informal support and mentoring • Recognition that systematic + innovative approach is needed • Vision for AI-powered, trauma-informed support • Decision to create measurable, grant-funded programs • Vision for statewide and national technological impact
          </div>
        </section>

        <section aria-labelledby="innovation" className="scroll-mt-16">
          <h2 id="innovation" className="font-heading text-2xl md:text-3xl font-semibold">Technology Meets Heart: AI-Powered Community Support</h2>
          <p className="mt-3 text-muted-foreground max-w-3xl">We're pioneering the future of reentry support with trauma-informed AI assistance available 24/7.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-md border bg-card p-4"><div className="font-medium">AI Community Assistant</div><p className="text-sm text-muted-foreground">Free trauma-informed AI support for all community members</p></div>
            <div className="rounded-md border bg-card p-4"><div className="font-medium">24/7 Availability</div><p className="text-sm text-muted-foreground">Crisis support and guidance available around the clock</p></div>
            <div className="rounded-md border bg-card p-4"><div className="font-medium">Personalized Pathways</div><p className="text-sm text-muted-foreground">AI learns individual needs and adapts support accordingly</p></div>
            <div className="rounded-md border bg-card p-4"><div className="font-medium">Digital Literacy Building</div><p className="text-sm text-muted-foreground">Teaching technology skills while providing reentry support</p></div>
            <div className="rounded-md border bg-card p-4"><div className="font-medium">Privacy-First Design</div><p className="text-sm text-muted-foreground">Safe space to explore sensitive topics without judgment</p></div>
          </div>
          <p className="mt-4 text-sm text-foreground/80">The first nonprofit of its kind: where cutting-edge technology serves timeless human needs</p>
        </section>

        <section aria-labelledby="approach" className="scroll-mt-16">
          <h2 id="approach" className="font-heading text-2xl md:text-3xl font-semibold">How We Work: Trauma-Informed AI + Community-Driven Support</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-md border bg-card p-4">Safety & Trust First — All interactions, human and AI, designed to be trauma-informed</li>
            <li className="rounded-md border bg-card p-4">24/7 Accessible Support — AI ensures help is always available when needed</li>
            <li className="rounded-md border bg-card p-4">Community-Powered + AI-Enhanced — Technology amplifies peer support and verification</li>
            <li className="rounded-md border bg-card p-4">Measurable Digital Outcomes — AI interactions provide rich data for impact tracking</li>
            <li className="rounded-md border bg-card p-4">Strength-Based Technology — AI focuses on resilience and existing assets</li>
            <li className="rounded-md border bg-card p-4">Human + AI Collaboration — Technology enhances, never replaces, human connection</li>
          </ul>
        </section>

        <section aria-labelledby="programs" className="scroll-mt-16">
          <h2 id="programs" className="font-heading text-2xl md:text-3xl font-semibold">Our Programs: AI-Powered Impact with Human Heart</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <article className="rounded-md border bg-card p-5">
              <h3 className="font-medium">Financial Literacy & Credit Education</h3>
              <p className="mt-2 text-sm text-muted-foreground">AI-powered coaching, 24/7 guidance, and measurable outcomes.</p>
              <div className="mt-3"><a className="text-primary hover:underline" href={EXTERNAL.programs.financial} target="_blank" rel="noreferrer">Explore Financial Program →</a></div>
            </article>
            <article className="rounded-md border bg-card p-5">
              <h3 className="font-medium">Mindfulness & Wellness Tools</h3>
              <p className="mt-2 text-sm text-muted-foreground">Trauma-informed AI support for mental wellness and resilience.</p>
              <div className="mt-3"><a className="text-primary hover:underline" href={EXTERNAL.programs.mindfulness} target="_blank" rel="noreferrer">Explore Wellness Tools →</a></div>
            </article>
            <article className="rounded-md border bg-card p-5">
              <h3 className="font-medium">Business Formation Support</h3>
              <p className="mt-2 text-sm text-muted-foreground">AI coaching and tools for entrepreneurship and digital skills.</p>
              <div className="mt-3"><a className="text-primary hover:underline" href={EXTERNAL.programs.business} target="_blank" rel="noreferrer">Explore Business Support →</a></div>
            </article>
            <article className="rounded-md border bg-card p-5">
              <h3 className="font-medium">Community Platform — Forward Focus Collective</h3>
              <p className="mt-2 text-sm text-muted-foreground">AI community assistant, free and premium tiers, 24/7 support.</p>
              <div className="mt-3 flex gap-3">
                <a className="text-primary hover:underline" href={EXTERNAL.programs.community} target="_blank" rel="noreferrer">Visit Platform →</a>
                <a className="text-primary hover:underline" href="/community">Join the Collective →</a>
              </div>
            </article>
          </div>
        </section>

        <section aria-labelledby="advantage" className="scroll-mt-16">
          <h2 id="advantage" className="font-heading text-2xl md:text-3xl font-semibold">Ready for the Future: First-of-Its-Kind Infrastructure</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-md border bg-card p-4">AI-powered program delivery with trauma-informed design</li>
            <li className="rounded-md border bg-card p-4">24/7 support availability through technology innovation</li>
            <li className="rounded-md border bg-card p-4">Rich data collection through AI interactions for impact measurement</li>
            <li className="rounded-md border bg-card p-4">Scalable model ready for multi-state digital expansion</li>
            <li className="rounded-md border bg-card p-4">Cost-effective service delivery through AI amplification</li>
            <li className="rounded-md border bg-card p-4">Digital literacy building integrated with reentry support</li>
          </ul>
        </section>

        <section aria-labelledby="status" className="scroll-mt-16">
          <h2 id="status" className="font-heading text-2xl md:text-3xl font-semibold">Where We Are: Launching the Future of Reentry Support</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-md border bg-card p-4">Launching AI-powered systematic programming in Ohio</li>
            <li className="rounded-md border bg-card p-4">Building on years of individual support experience</li>
            <li className="rounded-md border bg-card p-4">Developing AI-enhanced community resource verification</li>
            <li className="rounded-md border bg-card p-4">Creating trauma-informed AI tools for 24/7 support</li>
            <li className="rounded-md border bg-card p-4">Establishing technology-enhanced partnerships with existing organizations</li>
          </ul>
        </section>

        <section aria-labelledby="vision" className="scroll-mt-16">
          <h2 id="vision" className="font-heading text-2xl md:text-3xl font-semibold">Our Vision: AI-Powered Support in Every Community</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-md border bg-card p-4">Every justice-impacted family has 24/7 access to trauma-informed AI support</li>
            <li className="rounded-md border bg-card p-4">Community-driven + AI-enhanced support in all 50 states</li>
            <li className="rounded-md border bg-card p-4">Peer-verified resource networks amplified through technology</li>
            <li className="rounded-md border bg-card p-4">Measurable reduction in recidivism through innovative comprehensive support</li>
            <li className="rounded-md border bg-card p-4">Digital equity and literacy advancement through reentry programs</li>
          </ul>
        </section>

        <section aria-labelledby="partnerships" className="scroll-mt-16">
          <h2 id="partnerships" className="font-heading text-2xl md:text-3xl font-semibold">Join Our Innovation: Multiple Ways to Create Future Impact</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-md border bg-card p-4">Partner With Us — Organizational collaboration and AI-enhanced resource sharing</li>
            <li className="rounded-md border bg-card p-4">Volunteer — Individual time, skills, and technology expertise</li>
            <li className="rounded-md border bg-card p-4">Share Resources — Community + AI verification and submission systems</li>
            <li className="rounded-md border bg-card p-4">Collaborate — Program development and AI tool enhancement partnerships</li>
            <li className="rounded-md border bg-card p-4">Tech Innovation Partners — Technology companies and digital equity organizations</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild variant="default"><a href="/partners">Partner Portal</a></Button>
            <Button asChild variant="secondary"><a href="/partners/request">Request Partnership</a></Button>
            <Button asChild variant="outline"><a href={EXTERNAL.partner.volunteer} target="_blank" rel="noreferrer">Volunteer</a></Button>
            <Button asChild variant="ghost"><a href="/partners/add-resource">Share a Resource</a></Button>
          </div>
        </section>

        <section aria-labelledby="accountability" className="scroll-mt-16">
          <h2 id="accountability" className="font-heading text-2xl md:text-3xl font-semibold">Our Commitment: Transparency Through Innovation</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-md border bg-card p-4">Real-time impact reporting through AI data collection</li>
            <li className="rounded-md border bg-card p-4">Community feedback integration through multiple digital channels</li>
            <li className="rounded-md border bg-card p-4">Financial transparency and responsible technology stewardship</li>
            <li className="rounded-md border bg-card p-4">Evidence-based program evaluation enhanced by AI insights</li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">Technology amplifies your voice, never replaces it • AI support honors your pace and privacy • Innovation serves healing, not the other way around • Your strength guides our technology design • Community wisdom + AI intelligence = powerful support</p>
        </section>
      </div>
    </main>
  );
};

export default Page;
