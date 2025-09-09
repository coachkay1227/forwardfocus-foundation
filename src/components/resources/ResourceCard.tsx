import { Phone, MapPin, Bookmark, Flag, ShieldCheck, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import type { Resource } from "@/data/resources-ohio";

const ResourceCard = ({ resource }: { resource: Resource }) => {
  const badge = resource.verified === "partner" ? (
    <Badge variant="secondary" className="inline-flex items-center gap-1"><ShieldCheck className="size-3" /> Partner Recommended</Badge>
  ) : (
    <Badge variant="outline" className="inline-flex items-center gap-1"><Users className="size-3" /> Community Verified</Badge>
  );

  const onSave = () => toast({ title: "Saved", description: "Resource saved to your list." });
  const onReport = () => toast({ title: "Report received", description: "Thanks for helping keep info up to date." });

  return (
    <article className="rounded-lg border-0 bg-card p-8 shadow-md hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <h3 className="font-bold text-xl mb-2">{resource.name}</h3>
          <p className="text-base text-foreground/80 mb-4">{resource.org} • {resource.city}{resource.address ? ` • ${resource.address}` : ""}</p>
          <div className="flex flex-wrap items-center gap-3">
            {badge}
            {resource.justiceFriendly && (
              <Badge className="inline-flex items-center gap-1 font-medium">
                <ShieldCheck className="size-3" /> Justice-Friendly
              </Badge>
            )}
            <Badge variant="outline" className="inline-flex items-center gap-1 font-medium border-primary/20">
              <Star className="size-3" /> {resource.rating.toFixed(1)}
            </Badge>
            <span className="text-sm text-foreground/60">Updated {new Date(resource.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {resource.phone && (
            <Button asChild variant="secondary" className="shadow-sm">
              <a href={resource.phone}><Phone className="h-4 w-4" /> Call</a>
            </Button>
          )}
          {resource.address && (
            <Button asChild variant="outline" className="shadow-sm">
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resource.address)}`} target="_blank" rel="noopener">
                <MapPin className="h-4 w-4" /> Directions
              </a>
            </Button>
          )}
          <Button variant="ghost" onClick={onSave} className="hover:bg-primary/10">
            <Bookmark className="h-4 w-4" /> Save
          </Button>
          <Button variant="ghost" onClick={onReport} className="hover:bg-primary/10">
            <Flag className="h-4 w-4" /> Report
          </Button>
        </div>
      </div>
      <p className="mt-6 text-base text-foreground/80 leading-relaxed">{resource.description}</p>
    </article>
  );
};

export default ResourceCard;
