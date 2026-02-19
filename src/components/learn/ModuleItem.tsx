import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useLearningProgress } from "@/hooks/use-learning-progress";
import type { Module } from "@/data/learning";

interface ModuleItemProps {
  mod: Module;
}

const ModuleItem = ({ mod }: ModuleItemProps) => {
  const { isCompleted, toggleModule } = useLearningProgress();
  const done = isCompleted(mod.id);

  return (
    <li className="flex flex-col gap-2 rounded-md border bg-card p-4">
      <div className="flex items-start gap-3">
        <Checkbox id={`chk-${mod.id}`} checked={done} onCheckedChange={() => toggleModule(mod.id)} aria-label={`Mark ${mod.title} as ${done ? "incomplete" : "complete"}`} />
        <div className="flex-1">
          <label htmlFor={`chk-${mod.id}`} className="font-medium cursor-pointer">{mod.title}</label>
          <p className="text-sm text-muted-foreground mt-1">{mod.summary}</p>
          <div className="mt-2 text-xs text-muted-foreground inline-flex gap-3">
            {mod.minutes ? <span>~{mod.minutes} min</span> : null}
            <span>Educational content only</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {mod.link && (
          <Button asChild size="sm">
            <a href={mod.link} target="_blank" rel="noreferrer">Open module <ExternalLink className="ml-1" size={16} /></a>
          </Button>
        )}
        <Button size="sm" variant="ghost" onClick={() => toggleModule(mod.id)}>{done ? "Mark as not done" : "Mark complete"}</Button>
      </div>
    </li>
  );
};

export default ModuleItem;
