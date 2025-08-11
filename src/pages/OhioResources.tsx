import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search as SearchIcon, CheckCircle2, ShieldCheck, Users, Star, MapPin, Phone, Bookmark, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import PartnerActionsBar from "@/components/resources/PartnerActionsBar";
import SearchFilters, { SERVICE_TYPES, COUNTIES, QuickFilter } from "@/components/resources/SearchFilters";
import ResourceCard from "@/components/resources/ResourceCard";
import CommunityStream from "@/components/resources/CommunityStream";
import { EXTERNAL } from "@/data/externalLinks";
import { OHIO_RESOURCES, type Resource } from "@/data/resources-ohio";

const Page = () => {
  // SEO
  useEffect(() => {
    document.title = "Ohio Resources | Community-Verified Help";
    const desc = "Discover community-verified resources across Ohio. Housing, jobs, legal aid, wellness, education. Partner-powered and updated daily.";
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

  const [query, setQuery] = useState("");
  const [county, setCounty] = useState<string>("All Ohio");
  const [types, setTypes] = useState<string[]>([]);
  const [quick, setQuick] = useState<QuickFilter>("all");

  const filtered = useMemo(() => {
    let data = [...OHIO_RESOURCES];
    if (query.trim()) {
      const q = query.toLowerCase();
      data = data.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.org.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
      );
    }
    if (county !== "All Ohio") data = data.filter(r => r.county === county);
    if (types.length) data = data.filter(r => types.includes(r.type));
    if (quick === "partner") data = data.filter(r => r.verified === "partner");
    if (quick === "emergency") data = data.filter(r => ["Housing","Legal","Health"].includes(r.type));
    if (quick === "ongoing") data = data.filter(r => ["Employment","Education","Family","Financial"].includes(r.type));
    if (quick === "new") data = data.slice().sort((a,b)=> (new Date(b.updatedAt).getTime()-new Date(a.updatedAt).getTime())).slice(0,12);
    return data;
  }, [query, county, types, quick]);

  return (
    <main id="main" className="container py-10">
      {/* Hero */}
      <header className="space-y-3">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold">Ohio's Community-Verified Resource Network</h1>
        <p className="text-muted-foreground max-w-2xl">Resources verified by our partner organizations and community members. Real help from people who care.</p>
        <div className="flex flex-wrap gap-3 text-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/50 px-3 py-1"><CheckCircle2 className="opacity-80" /> 2,500+ verified resources</div>
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/50 px-3 py-1"><ShieldCheck className="opacity-80" /> 150+ partner organizations</div>
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/50 px-3 py-1"><Users className="opacity-80" /> Updated daily by our community</div>
        </div>
        <p className="text-xs text-muted-foreground">Trusted by nonprofits, reentry programs, and community advocates across Ohio</p>
      </header>

      <Separator className="my-8" />

      {/* Quick Partner Actions */}
      <PartnerActionsBar />

      <section className="mt-8 space-y-6">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3">
            <SearchIcon className="opacity-70" />
            <Input
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              placeholder="Find by need, location, or organization"
            />
          </div>
          <SearchFilters
            county={county}
            setCounty={setCounty}
            types={types}
            setTypes={setTypes}
            quick={quick}
            setQuick={setQuick}
          />
        </div>

        {/* Resource list */}
        <section aria-label="Resource results" className="grid gap-4">
          {filtered.map((r)=> (
            <ResourceCard key={r.id} resource={r} />
          ))}
          {filtered.length === 0 && (
            <div className="text-center text-muted-foreground py-10">No resources found. Try adjusting filters.</div>
          )}
        </section>
      </section>

      {/* Featured FFE Programs */}
      <section className="mt-12 space-y-4">
        <h2 className="font-heading text-2xl">Our Statewide Programs</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-lg border bg-card p-5">
            <h3 className="font-semibold">Mindfulness & Wellness Tools</h3>
            <p className="text-muted-foreground text-sm">Available to all Ohioans — emotional resilience and wellness practices.</p>
            <Button asChild className="mt-3" variant="secondary">
              <a href={EXTERNAL.programs.mindfulness} target="_blank" rel="noopener">Explore wellness tools</a>
            </Button>
          </article>
          <article className="rounded-lg border bg-card p-5">
            <h3 className="font-semibold">Financial Literacy & Credit Education</h3>
            <p className="text-muted-foreground text-sm">Money management skills and your credit education ebook.</p>
            <Button asChild className="mt-3" variant="secondary">
              <a href={EXTERNAL.programs.financial} target="_blank" rel="noopener">Start learning finance</a>
            </Button>
          </article>
          <article className="rounded-lg border bg-card p-5">
            <h3 className="font-semibold">Business Formation Support</h3>
            <p className="text-muted-foreground text-sm">Entrepreneurship pathway and hands-on support.</p>
            <Button asChild className="mt-3" variant="secondary">
              <a href={EXTERNAL.programs.business} target="_blank" rel="noopener">Build your business</a>
            </Button>
          </article>
          <article className="rounded-lg border bg-card p-5">
            <h3 className="font-semibold">Platform Community Base</h3>
            <p className="text-muted-foreground text-sm">Mentorship and peer support — connect with others.</p>
            <Button asChild className="mt-3" variant="secondary">
              <a href={EXTERNAL.programs.community} target="_blank" rel="noopener">Join the community</a>
            </Button>
          </article>
        </div>
      </section>

      {/* Community collaboration */}
      <section className="mt-12">
        <CommunityStream resources={OHIO_RESOURCES} />
      </section>
    </main>
  );
};

export default Page;
