import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const SubmitReferral = () => {
  const [loading, setLoading] = useState(false);
  useEffect(()=>{ document.title = "Submit Referral | Partner Portal"; },[]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
      toast({ title: "Referral submitted", description: "We'll follow up with the individual promptly." });
    }, 700);
  };

  return (
    <main id="main" className="container py-10">
      <h1 className="font-heading text-3xl font-semibold">Submit a Referral</h1>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4 max-w-xl">
        <div>
          <label className="block text-sm mb-1">Individual's Name</label>
          <Input required placeholder="Full name" />
        </div>
        <div>
          <label className="block text-sm mb-1">Contact Email or Phone</label>
          <Input required placeholder="email@domain.com or (555) 555-5555" />
        </div>
        <div>
          <label className="block text-sm mb-1">Referral Notes</label>
          <Textarea required placeholder="Briefly describe the situation and needs" />
        </div>
        <Button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Referral"}</Button>
      </form>
    </main>
  );
};
export default SubmitReferral;
