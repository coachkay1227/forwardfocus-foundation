import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const AddResource = () => {
  const [loading, setLoading] = useState(false);
  useEffect(()=>{ document.title = "Add Resource | Partner Portal"; },[]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
      toast({ title: "Resource submitted", description: "Thanks! Our team will review and publish shortly." });
    }, 700);
  };

  return (
    <main id="main" className="container py-10">
      <h1 className="font-heading text-3xl font-semibold">Add a Resource</h1>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4 max-w-xl">
        <div>
          <label className="block text-sm mb-1">Organization Name</label>
          <Input required placeholder="Organization" />
        </div>
        <div>
          <label className="block text-sm mb-1">Resource Name</label>
          <Input required placeholder="Program or service" />
        </div>
        <div>
          <label className="block text-sm mb-1">Category</label>
          <Select defaultValue="Housing">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent className="z-50 bg-popover">
              {['Housing','Employment','Legal','Financial','Health','Education','Family'].map(c=> (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm mb-1">Website</label>
          <Input type="url" placeholder="https://" />
        </div>
        <div>
          <label className="block text-sm mb-1">Phone</label>
          <Input type="tel" placeholder="(555) 555-5555" />
        </div>
        <div>
          <label className="block text-sm mb-1">Description</label>
          <Textarea required placeholder="What support is provided? Who qualifies?" />
        </div>
        <Button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Resource"}</Button>
      </form>
    </main>
  );
};
export default AddResource;
