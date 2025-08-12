import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Page = () => {
  // SEO & minimal structured data
  useEffect(() => {
    const title = "Learn & Grow — Free Education | Forward Focus Elevation";
    const desc = "Free, self-paced education for justice-impacted individuals. Community access by application; AI assistance available.";
    document.title = title;

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
    link.setAttribute("href", `${window.location.origin}/learn`);

    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Learn & Grow — Free Education",
      description: desc,
      url: `${window.location.origin}/learn`,
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
          <h1 className="font-heading text-3xl md:text-4xl font-semibold">
            Learn & Grow: Free Education for Your Empowerment
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Self-paced learning modules designed by and for justice-impacted individuals. All education is completely free — community access by application.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-accent/60 px-3 py-1">100% free education</span>
            <span className="rounded-full bg-accent/60 px-3 py-1">Community application required</span>
            <span className="rounded-full bg-accent/60 px-3 py-1">Self-paced learning</span>
            <span className="rounded-full bg-accent/60 px-3 py-1">AI assistance available</span>
          </div>
        </div>
      </header>

      <div className="container space-y-14 py-10">
        {/* Learning Approach */}
        <section aria-labelledby="approach" className="scroll-mt-16">
          <h2 id="approach" className="font-heading text-2xl md:text-3xl font-semibold">
            How Our Free Learning Works
          </h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-md border bg-card p-4">Always free — All educational content funded by grants and donations</li>
            <li className="rounded-md border bg-card p-4">Application-based access — We carefully vet community members for safety</li>
            <li className="rounded-md border bg-card p-4">Self-paced learning — No deadlines or pressure, progress when ready</li>
            <li className="rounded-md border bg-card p-4">AI learning support — AI assistance available to approved community members</li>
            <li className="rounded-md border bg-card p-4">Peer support — Learn alongside people who understand your journey</li>
            <li className="rounded-md border bg-card p-4">Trauma-informed — Content designed to be healing and supportive</li>
          </ul>
        </section>

        {/* Available Modules (overview only) */}
        <section aria-labelledby="available" className="scroll-mt-16">
          <h2 id="available" className="font-heading text-2xl md:text-3xl font-semibold">
            What&apos;s Available in Our Community
          </h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-md border bg-card p-4">Welcome &amp; Reset Your Path</li>
            <li className="rounded-md border bg-card p-4">Clarity Support &amp; Wellness</li>
            <li className="rounded-md border bg-card p-4">Mindset &amp; Emotional Reset</li>
            <li className="rounded-md border bg-card p-4">Credit Confidence Starter</li>
            <li className="rounded-md border bg-card p-4">Reentry &amp; Life Tools Vault</li>
            <li className="rounded-md border bg-card p-4">Purpose, Planning &amp; Pathways</li>
            <li className="rounded-md border bg-card p-4">Activated Alignment</li>
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            All modules include interactive content, peer discussion, and AI assistance. Detailed curriculum available after community approval.
          </p>
        </section>

        {/* Community Application Process */}
        <section aria-labelledby="apply" className="scroll-mt-16">
          <h2 id="apply" className="font-heading text-2xl md:text-3xl font-semibold">
            Ready to Start Learning? Apply for Community Access
          </h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-md border bg-card p-4">We carefully review all applications to ensure community safety</li>
            <li className="rounded-md border bg-card p-4">24–48 hour review process</li>
            <li className="rounded-md border bg-card p-4">Application includes basic background and community alignment questions</li>
            <li className="rounded-md border bg-card p-4">References or referrals may be helpful but not required</li>
            <li className="rounded-md border bg-card p-4">We reserve the right to approve or decline applications</li>
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            Our community is specifically designed for justice-impacted individuals and their families.
          </p>
        </section>

        {/* Who This Serves */}
        <section aria-labelledby="who" className="scroll-mt-16">
          <h2 id="who" className="font-heading text-2xl md:text-3xl font-semibold">
            Is This Community Right for You?
          </h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-md border bg-card p-4">Formerly incarcerated individuals seeking education and support</li>
            <li className="rounded-md border bg-card p-4">Family members of incarcerated individuals</li>
            <li className="rounded-md border bg-card p-4">People preparing for reentry or recently released</li>
            <li className="rounded-md border bg-card p-4">Those committed to trauma-informed community participation</li>
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            If you&apos;re a crime victim, we have separate resources designed specifically for your needs. If you&apos;re supporting at-risk youth, we have family-focused educational resources.
          </p>
        </section>

        {/* Learning Features */}
        <section aria-labelledby="features" className="scroll-mt-16">
          <h2 id="features" className="font-heading text-2xl md:text-3xl font-semibold">
            Learning Features
          </h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-md border bg-card p-4">AI learning assistance for approved community members</li>
            <li className="rounded-md border bg-card p-4">Self-paced educational modules</li>
            <li className="rounded-md border bg-card p-4">Peer discussion and support groups</li>
            <li className="rounded-md border bg-card p-4">Progress tracking and recognition</li>
            <li className="rounded-md border bg-card p-4">Mobile-optimized content</li>
            <li className="rounded-md border bg-card p-4">Multiple learning formats (video, text, interactive)</li>
          </ul>
        </section>

        {/* Application CTA */}
        <section aria-labelledby="cta" className="scroll-mt-16">
          <h2 id="cta" className="sr-only">Application Call to Action</h2>
          <div className="rounded-md border bg-card p-6">
            <p className="text-lg font-medium">Ready to Join Our Learning Community?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Apply for community access — all education remains free. Applications are reviewed within 24–48 hours.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button asChild>
                <Link to="/community">Apply for Community Access</Link>
              </Button>
              <Link to="/support" className="text-sm underline underline-offset-4">
                Questions about applying? Contact us
              </Link>
            </div>
          </div>
        </section>

        {/* Alternative Support */}
        <section aria-labelledby="alt" className="scroll-mt-16">
          <h2 id="alt" className="font-heading text-2xl md:text-3xl font-semibold">
            Not Ready for Community? No Problem.
          </h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-md border bg-card p-4">
              <Link to="/help" className="underline underline-offset-4">Get Help Now</Link> — crisis resources and immediate support
            </li>
            <li className="rounded-md border bg-card p-4">
              <Link to="/ohio-resources" className="underline underline-offset-4">Ohio Resources Directory</Link> — community-verified services
            </li>
            <li className="rounded-md border bg-card p-4">
              <Link to="/support" className="underline underline-offset-4">Contact us</Link> for individual support
            </li>
          </ul>
        </section>

        {/* Compliance Messaging */}
        <section aria-labelledby="compliance" className="scroll-mt-16">
          <h2 id="compliance" className="font-heading text-2xl md:text-3xl font-semibold">
            Compliance & Transparency
          </h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-md border bg-card p-4">All educational content is free and always will be</li>
            <li className="rounded-md border bg-card p-4">Community membership supports our free education mission</li>
            <li className="rounded-md border bg-card p-4">We serve justice-impacted individuals and families specifically</li>
            <li className="rounded-md border bg-card p-4">Educational content only — we refer to qualified professionals for personalized advice</li>
          </ul>
        </section>
      </div>
    </main>
  );
};

export default Page;
