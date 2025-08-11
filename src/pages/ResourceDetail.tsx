import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { OHIO_RESOURCES } from "@/data/resources-ohio";

const ResourceDetail = () => {
  const { id } = useParams();
  const resource = OHIO_RESOURCES.find(r => r.id === id);
  useEffect(()=>{ document.title = resource ? `${resource.name} | Ohio Resource` : 'Resource | Ohio'; },[resource]);

  if (!resource) {
    return (
      <main className="container py-10">
        <h1 className="font-heading text-2xl">Resource not found</h1>
        <p className="text-muted-foreground mt-2">It may have been updated or removed.</p>
      </main>
    );
  }

  return (
    <main className="container py-10">
      <h1 className="font-heading text-3xl font-semibold">{resource.name}</h1>
      <p className="text-muted-foreground mt-2">{resource.org} • {resource.city}</p>
      <div className="mt-6 rounded-lg border bg-card p-5">
        <p>{resource.description}</p>
      </div>
    </main>
  );
};
export default ResourceDetail;
