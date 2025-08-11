import { useEffect, useMemo } from "react";
import AICompanion from "@/components/learn/AICompanion";
import PathwayList from "@/components/learn/PathwayList";
import { PATHWAYS } from "@/data/learning";
import { Progress } from "@/components/ui/progress";
import { useLearningProgress } from "@/hooks/use-learning-progress";

const Page = () => {
  // SEO & Structured Data
  useEffect(() => {
    const title = "Learn & Grow — Free Education | Forward Focus Elevation";
    const desc = "100% free, AI‑enhanced, trauma‑informed education for justice‑impacted individuals. Mobile‑first, self‑paced, community supported.";
    document.title = title;

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) { meta = document.createElement("meta"); meta.setAttribute("name", "description"); document.head.appendChild(meta); }
    meta.setAttribute("content", desc);

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) { link = document.createElement("link"); link.setAttribute("rel", "canonical"); document.head.appendChild(link); }
    link.setAttribute("href", `${window.location.origin}/learn`);

    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Learn & Grow — Free Education',
      itemListElement: PATHWAYS.flatMap((p, i) => p.modules.map((m, j) => ({
        '@type': 'ListItem', position: i * 100 + j + 1, item: { '@type': 'Course', name: m.title, description: m.summary }
      })))
    });
    document.head.appendChild(ld);
    return () => { document.head.removeChild(ld); };
  }, []);

  const { allCompletedIds } = useLearningProgress();
  const { totalModules, totalCompleted, percent } = useMemo(() => {
    const totalModules = PATHWAYS.reduce((acc, p) => acc + p.modules.length, 0);
    const totalCompleted = PATHWAYS.reduce(
      (acc, p) => acc + p.modules.filter((m) => allCompletedIds.has(m.id)).length,
      0
    );
    const percent = totalModules ? Math.round((totalCompleted / totalModules) * 100) : 0;
    return { totalModules, totalCompleted, percent };
  }, [allCompletedIds]);

  return (
    <main id="main">
      <header className="border-b bg-background">
        <div className="container py-12">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold">Learn & Grow: Free Education for Your Empowerment</h1>
          <p className="mt-3 text-muted-foreground max-w-3xl">AI‑powered, trauma‑informed education designed by and for justice‑impacted individuals. All learning content is completely free — because education should never be a barrier.</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-accent/60 px-3 py-1">100% free education</span>
            <span className="rounded-full bg-accent/60 px-3 py-1">AI assistant included</span>
            <span className="rounded-full bg-accent/60 px-3 py-1">Community support</span>
            <span className="rounded-full bg-accent/60 px-3 py-1">Always accessible</span>
          </div>
          <p className="mt-2 text-sm text-foreground/80">Your education, your timeline, your success — completely free.</p>
        </div>
      </header>

      <div className="container py-10 space-y-14">
        {/* Learning Approach */}
        <section aria-labelledby="approach" className="scroll-mt-16">
          <h2 id="approach" className="font-heading text-2xl md:text-3xl font-semibold">How Our Free Learning Works: Designed for Your Success</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-md border bg-card p-4">Always free — All educational content funded by grants and donations</li>
            <li className="rounded-md border bg-card p-4">Start where you are — No prerequisites, meet you at your current level</li>
            <li className="rounded-md border bg-card p-4">Learn at your pace — No deadlines or pressure, progress when ready</li>
            <li className="rounded-md border bg-card p-4">AI support 24/7 — Free personalized assistance and encouragement</li>
            <li className="rounded-md border bg-card p-4">Community connection — Free peer support and shared learning</li>
            <li className="rounded-md border bg-card p-4">Strength‑based — Build on what you already know and your resilience</li>
            <li className="rounded-md border bg-card p-4">Real‑world application — Skills you can use immediately in daily life</li>
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">Educational content only — we refer to qualified professionals for personalized advice.</p>
        </section>

        {/* AI Companion */}
        <AICompanion />

        {/* Pathways */}
        <PathwayList />

        {/* Progress Tracking */}
        <section aria-labelledby="progress" className="scroll-mt-16">
          <h2 id="progress" className="font-heading text-2xl md:text-3xl font-semibold">Free Progress Tracking & Recognition</h2>
          <div className="mt-4 rounded-md border bg-card p-5">
            <div className="text-sm text-muted-foreground">Overall progress</div>
            <div className="mt-2">
              <Progress value={percent} aria-label={`Overall progress ${percent}%`} />
              <div className="mt-2 text-xs text-muted-foreground">{totalCompleted} of {totalModules} modules completed</div>
            </div>
            <ul className="mt-4 grid gap-2 md:grid-cols-2 text-sm">
              <li>AI-generated educational insights and recommendations</li>
              <li>Digital badges and certificates for module completion</li>
              <li>Educational portfolio building tools</li>
              <li>Optional progress sharing with community</li>
            </ul>
          </div>
        </section>

        {/* Community Integration */}
        <section aria-labelledby="community" className="scroll-mt-16">
          <h2 id="community" className="font-heading text-2xl md:text-3xl font-semibold">Community Integration (Separate from Education)</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-md border bg-card p-4">Free educational discussion groups and study buddies</li>
            <li className="rounded-md border bg-card p-4">Success story sharing and inspiration</li>
            <li className="rounded-md border bg-card p-4">Group educational challenges and projects</li>
            <li className="rounded-md border bg-card p-4">Expert guest educational sessions</li>
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">Note: Community platform membership (non‑educational features) may have paid options. Education remains 100% free.</p>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="accessibility" className="scroll-mt-16">
          <h2 id="accessibility" className="font-heading text-2xl md:text-3xl font-semibold">Accessibility & Support</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-md border bg-card p-4">Multiple learning formats: video, audio, text, interactive</li>
            <li className="rounded-md border bg-card p-4">Closed captioning and screen reader compatibility</li>
            <li className="rounded-md border bg-card p-4">Multiple language options (starting with Spanish)</li>
            <li className="rounded-md border bg-card p-4">Offline content download capability</li>
            <li className="rounded-md border bg-card p-4">Free technical support and learning assistance</li>
            <li className="rounded-md border bg-card p-4">Flexible scheduling and self‑paced progression</li>
          </ul>
        </section>

        {/* Funding */}
        <section aria-labelledby="funding" className="scroll-mt-16">
          <h2 id="funding" className="font-heading text-2xl md:text-3xl font-semibold">Funding Transparency</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-md border bg-card p-4">All educational content funded by grants and donations</li>
            <li className="rounded-md border bg-card p-4">No cost to learners, ever</li>
            <li className="rounded-md border bg-card p-4">Committed to free, accessible education for all</li>
            <li className="rounded-md border bg-card p-4">Community support helps us keep education free</li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">You already have everything you need to succeed • Learning happens in community, at your own pace • Your experiences are your strengths • Progress, not perfection • You belong here, exactly as you are</p>
        </section>
      </div>
    </main>
  );
};

export default Page;
