import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const RequestPartnership = () => {
  const [loading, setLoading] = useState(false);
  useEffect(()=>{ document.title = "Request Partnership | Partner Portal"; },[]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
      toast({ title: "Request sent", description: "We will contact you shortly to discuss collaboration." });
    }, 700);
  };

  return (
    <main id="main" className="container py-10">
      <h1 className="font-heading text-3xl font-semibold">Request Partnership</h1>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4 max-w-xl">
        <div>
          <label className="block text-sm mb-1">Organization Name</label>
          <Input required placeholder="Your nonprofit or program" />
        </div>
        <div>
          <label className="block text-sm mb-1">Contact Email</label>
          <Input required type="email" placeholder="you@org.org" />
        </div>
        <div>
          <label className="block text-sm mb-1">How would you like to collaborate?</label>
          <Textarea required placeholder="Tell us about your programs and needs" />
        </div>
        <Button type="submit" disabled={loading}>{loading ? "Sending..." : "Send Request"}</Button>
      </form>
    </main>
  );
};
export default RequestPartnership;
