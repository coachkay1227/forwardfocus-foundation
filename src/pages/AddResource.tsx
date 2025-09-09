import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

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
    <main id="main" className="min-h-screen bg-muted/30">
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b">
        <div className="container py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Add a Resource</h1>
            <p className="text-xl text-muted-foreground">Help expand our community resource directory</p>
          </div>
        </div>
      </div>
      
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-xl shadow-lg border-0 p-8">
            <form onSubmit={onSubmit} className="grid gap-6">
              <div>
                <label className="block text-lg font-semibold mb-2">Organization Name</label>
                <Input required placeholder="Organization" className="h-12 text-lg" />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2">Resource Name</label>
                <Input required placeholder="Program or service" className="h-12 text-lg" />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2">Category</label>
                <Select defaultValue="Housing">
                  <SelectTrigger className="h-12 text-lg"><SelectValue /></SelectTrigger>
                  <SelectContent className="z-50 bg-popover">
                    {['Housing','Employment','Legal','Financial','Health','Education','Family'].map(c=> (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2">Website</label>
                <Input type="url" placeholder="https://" className="h-12 text-lg" />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2">Phone</label>
                <Input type="tel" placeholder="(555) 555-5555" className="h-12 text-lg" />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2">Description</label>
                <Textarea required placeholder="What support is provided? Who qualifies?" className="min-h-32 text-lg" />
              </div>
              <Button type="submit" disabled={loading} variant="premium" size="lg" className="h-14 text-lg">
                {loading ? "Submitting..." : "Submit Resource"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};
export default AddResource;
