import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { OHIO_RESOURCES } from "@/data/resources-ohio";

const Page = () => {
  // SEO
  useEffect(() => {
    document.title = "Ohio Resources | Curated Directory";
    const desc = "Hand-curated Ohio resources for housing, employment, legal, health, and education — verified by our team.";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.name = "description"; m.content = desc; document.head.appendChild(m);
    }
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.href = window.location.href;
    else {
      const l = document.createElement("link"); l.rel = "canonical"; l.href = window.location.href; document.head.appendChild(l);
    }
  }, []);

  const categories = useMemo(() => (
    [
      { id: "housing", title: "Housing", type: "Housing" },
      { id: "employment", title: "Employment", type: "Employment" },
      { id: "legal", title: "Legal", type: "Legal" },
      { id: "health", title: "Health", type: "Health" },
      { id: "education", title: "Education", type: "Education" },
    ] as const
  ), []);

  const grouped = useMemo(() => {
    return categories.map((c) => ({
      ...c,
      items: OHIO_RESOURCES.filter(r => r.type === c.type).slice(0, 4), // keep it simple, ~20 total
    }));
  }, [categories]);

  // Simple suggestion form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");

  const onSuggest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/.+@.+\..+/.test(email) || details.trim().length < 10) {
      toast({ title: "Add details & a valid email", description: "We’ll review and add good fits." });
      return;
    }
    toast({ title: "Thanks!", description: "Your suggestion was received. We’ll verify and update soon." });
    setName(""); setEmail(""); setDetails("");
  };

  return (
    <main id="main" className="container py-10">
      <header className="space-y-3">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold">Ohio Resource Directory (Curated)</h1>
        <p className="text-muted-foreground max-w-2xl">Resources verified by our team — focused on what helps most. No spam. No clutter.</p>
        <Button asChild>
          <a href="/help#learn-assistant">Need help finding the right resource? Ask our AI assistant</a>
        </Button>
      </header>

      <section className="mt-10 space-y-10">
        {grouped.map(section => (
          <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="space-y-4">
            <h2 id={`${section.id}-title`} className="font-heading text-2xl">{section.title}</h2>
            <ul className="grid gap-4">
              {section.items.map((r) => (
                <li key={r.id} className="rounded-lg border bg-card p-4">
                  <div className="font-medium">
                    {r.name} <span className="text-muted-foreground">— {r.org}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
                  <div className="mt-2 text-sm flex flex-wrap gap-x-4 gap-y-1">
                    {r.phone && (<a className="text-primary hover:underline" href={`tel:${r.phone}`}>Call</a>)}
                    {r.website && (<a className="text-primary hover:underline" href={r.website} target="_blank" rel="noreferrer">Website</a>)}
                    <span className="text-muted-foreground">{r.city}, {r.county}</span>
                  </div>
                </li>
              ))}
              {section.items.length === 0 && (
                <li className="text-sm text-muted-foreground">We’re curating this section. Check back soon.</li>
              )}
            </ul>
          </section>
        ))}
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="font-heading text-2xl">Suggest a resource</h2>
        <p className="text-muted-foreground">Know a great program in Ohio? Share it — we’ll verify and add helpful ones.</p>
        <form onSubmit={onSuggest} className="grid gap-3 md:max-w-xl">
          <Input placeholder="Your name (optional)" value={name} onChange={(e)=>setName(e.target.value)} />
          <Input type="email" required placeholder="Your email (for follow-up)" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <Textarea required rows={4} placeholder="Program name, city/county, contact info, and why it helps" value={details} onChange={(e)=>setDetails(e.target.value)} />
          <Button type="submit">Send suggestion</Button>
        </form>
      </section>
    </main>
  );
};

export default Page;
