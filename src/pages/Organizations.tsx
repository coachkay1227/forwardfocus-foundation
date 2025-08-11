import { useEffect } from "react";

const Organizations = () => {
  useEffect(()=>{ document.title = "Partner Organizations | Ohio"; },[]);
  return (
    <main id="main" className="container py-10">
      <h1 className="font-heading text-3xl font-semibold">Our Partner Network</h1>
      <p className="mt-2 text-muted-foreground">A directory of collaborating nonprofits and programs across Ohio. (Coming soon)</p>
    </main>
  );
};
export default Organizations;
