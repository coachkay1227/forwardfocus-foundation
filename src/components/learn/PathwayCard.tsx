import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PATHWAYS, type Module, type Pathway } from "@/data/learning";
import { Progress } from "@/components/ui/progress";
import { useLearningProgress } from "@/hooks/use-learning-progress";

interface PathwayCardProps {
  pathway: Pathway;
}

export const PathwayCard = ({ pathway }: PathwayCardProps) => {
  const { isCompleted } = useLearningProgress();
  const total = pathway.modules.length;
  const completed = pathway.modules.filter((m) => isCompleted(m.id)).length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  return (
    <Card className="p-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold text-lg">{pathway.title}</h3>
          <div className="inline-flex items-center gap-2 text-xs">
            <span className="rounded-full bg-accent/60 px-2 py-1">100% Free</span>
            <span className="rounded-full bg-accent/60 px-2 py-1">Educational Only</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{pathway.description}</p>
        <div className="mt-2">
          <Progress value={percent} aria-label={`Progress: ${percent}%`} />
          <div className="mt-2 text-xs text-muted-foreground">{completed} of {total} modules completed</div>
        </div>
        <div className="mt-3">
          <Button asChild variant="secondary">
            <a href={`#pathway-${pathway.id}`}>Start learning</a>
          </Button>
        </div>
      </div>
    </Card>
  );
};
