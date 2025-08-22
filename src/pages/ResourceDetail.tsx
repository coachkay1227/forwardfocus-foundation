import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { OHIO_RESOURCES } from "@/data/resources-ohio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ResourceDetail = () => {
  const { id } = useParams();
  const resource = OHIO_RESOURCES.find(r => r.id === id);
  useEffect(()=>{ document.title = resource ? `${resource.name} | Ohio Resource` : 'Resource | Ohio'; },[resource]);

  if (!resource) {
    return (
      <main id="main" className="container py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-heading text-4xl font-bold mb-4">Resource not found</h1>
          <p className="text-xl text-foreground/80 mb-8">It may have been updated or removed.</p>
          <Button asChild size="lg" className="shadow-md">
            <a href="/search">Browse All Resources</a>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main id="main" className="container py-16">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="font-heading text-5xl font-bold mb-4">{resource.name}</h1>
          <p className="text-xl text-foreground/80">{resource.org} • {resource.city}</p>
        </header>
        <Card className="shadow-lg border-0">
          <CardContent className="p-12">
            <p className="text-lg leading-relaxed">{resource.description}</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
export default ResourceDetail;
