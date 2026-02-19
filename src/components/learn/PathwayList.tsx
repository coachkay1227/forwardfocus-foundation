import { PATHWAYS } from "@/data/learning";
import { PathwayCard } from "./PathwayCard";
import ModuleItem from "./ModuleItem";

const PathwayList = () => {
  return (
    <section aria-labelledby="pathways" className="scroll-mt-16">
      <h2 id="pathways" className="font-heading text-2xl md:text-3xl font-semibold">Learning Pathways (100% Free)</h2>
      <p className="mt-3 text-muted-foreground max-w-3xl">Start anywhere. Learn at your pace. All modules are free and educational-only.</p>

      <div className="mt-6 grid gap-5">
        {PATHWAYS.map((p) => (
          <article key={p.id} id={`pathway-${p.id}`} className="grid gap-4">
            <PathwayCard pathway={p} />
            <ul className="grid gap-3">
              {p.modules.map((m) => (
                <ModuleItem key={m.id} mod={m} />
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PathwayList;
