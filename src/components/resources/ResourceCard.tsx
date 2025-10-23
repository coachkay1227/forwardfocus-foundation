import { Phone, MapPin, Bookmark, Flag, ShieldCheck, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

type Resource = {
  id: string;
  name: string;
  title?: string;
  organization: string;
  category: string;
  type: string;
  description: string;
  phone?: string;
  email?: string;
  website_url?: string;
  address?: string;
  city: string;
  state?: string;
  state_code?: string;
  county?: string;
  tags?: string[];
  verified: boolean;
  justice_friendly: boolean;
  rating: number;
  created_at: string;
  updated_at: string;
};

const ResourceCard = ({ resource }: { resource: Resource }) => {
  const badge = resource.verified ? (
    <Badge variant="secondary" className="inline-flex items-center gap-1"><ShieldCheck className="size-3" /> Verified</Badge>
  ) : (
    <Badge variant="outline" className="inline-flex items-center gap-1"><Users className="size-3" /> Unverified</Badge>
  );

  const onSave = () => toast({ title: "Saved", description: "Resource saved to your list." });
  const onReport = () => toast({ title: "Report received", description: "Thanks for helping keep info up to date." });

  return (
    <article className="rounded-lg border-0 bg-card p-8 shadow-md hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <h3 className="font-bold text-xl mb-2">{resource.name}</h3>
          <p className="text-base text-foreground/80 mb-4">{resource.organization} • {resource.city}{resource.address ? ` • ${resource.address}` : ""}</p>
          <div className="flex flex-wrap items-center gap-3">
            {badge}
            {resource.justice_friendly && (
              <Badge className="inline-flex items-center gap-1 font-medium">
                <ShieldCheck className="size-3" /> Justice-Friendly
              </Badge>
            )}
            <Badge variant="outline" className="inline-flex items-center gap-1 font-medium border-primary/20">
              <Star className="size-3" /> {resource.rating ? resource.rating.toFixed(1) : 'N/A'}
            </Badge>
            <span className="text-sm text-foreground/60">Updated {new Date(resource.updated_at).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {resource.phone && (
            <Button asChild variant="secondary" className="shadow-sm">
              <a href={`tel:${resource.phone}`}><Phone className="h-4 w-4" /> Call</a>
            </Button>
          )}
          {resource.website_url && (
            <Button asChild variant="secondary" className="shadow-sm">
              <a href={resource.website_url} target="_blank" rel="noopener noreferrer">Visit Website</a>
            </Button>
          )}
          {resource.address && (
            <Button asChild variant="outline" className="shadow-sm">
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resource.address)}`} target="_blank" rel="noopener noreferrer">
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
