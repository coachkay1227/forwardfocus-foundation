import { useEffect } from "react";

const Partners = () => {
  useEffect(()=>{ document.title = "Partner Portal | Forward Focus Elevation"; },[]);
  return (
    <main id="main" className="container py-10">
      <h1 className="font-heading text-3xl font-semibold">Partner Portal</h1>
      <p className="mt-2 text-muted-foreground">Submit referrals, add resources, and collaborate with our network.</p>
    </main>
  );
};
export default Partners;
