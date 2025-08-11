import { Phone, MapPin, Bookmark, Flag, ShieldCheck, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
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
    <article className="rounded-lg border bg-card p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-semibold text-lg">{resource.name}</h3>
          <p className="text-sm text-muted-foreground">{resource.org} • {resource.city}{resource.address ? ` • ${resource.address}` : ""}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {badge}
            {resource.justiceFriendly && <Badge className="inline-flex items-center gap-1"><ShieldCheck className="size-3" /> Justice-Impacted Friendly</Badge>}
            <Badge variant="outline" className="inline-flex items-center gap-1"><Star className="size-3" /> {resource.rating.toFixed(1)}</Badge>
            <span className="text-xs text-muted-foreground">Updated {new Date(resource.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="mt-2 flex gap-2">
          {resource.phone && (
            <Button asChild variant="secondary">
              <a href={resource.phone}><Phone /> Call</a>
            </Button>
          )}
          {resource.address && (
            <Button asChild variant="outline">
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resource.address)}`} target="_blank" rel="noopener"><MapPin /> Directions</a>
            </Button>
          )}
          <Button variant="ghost" onClick={onSave}><Bookmark /> Save</Button>
          <Button variant="ghost" onClick={onReport}><Flag /> Report Update</Button>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{resource.description}</p>
    </article>
  );
};

export default ResourceCard;
