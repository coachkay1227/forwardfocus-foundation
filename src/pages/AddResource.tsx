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
    <main id="main" className="min-h-screen bg-gradient-osu-subtle">
      <div className="bg-gradient-osu-primary border-b border-osu-scarlet/20">
        <div className="container py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">Add a Resource</h1>
            <p className="text-xl text-osu-scarlet-light">Help expand our comprehensive community resource directory</p>
          </div>
        </div>
      </div>
      
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-xl shadow-lg border border-osu-scarlet/10 p-8">
            <form onSubmit={onSubmit} className="grid gap-6">
              <div>
                <label className="block text-lg font-semibold mb-2 text-osu-scarlet">Organization Name</label>
                <Input 
                  required 
                  placeholder="Organization" 
                  className="h-12 text-lg border-osu-gray/30 focus:border-osu-scarlet focus:ring-osu-scarlet/20" 
                />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2 text-osu-scarlet">Resource Name</label>
                <Input 
                  required 
                  placeholder="Program or service" 
                  className="h-12 text-lg border-osu-gray/30 focus:border-osu-scarlet focus:ring-osu-scarlet/20" 
                />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2 text-osu-scarlet">Category</label>
                <Select defaultValue="Housing">
                  <SelectTrigger className="h-12 text-lg border-osu-gray/30 focus:border-osu-scarlet focus:ring-osu-scarlet/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-popover border border-osu-gray/20">
                    {['Housing','Employment','Legal','Financial','Health','Education','Family'].map(c=> (
                      <SelectItem key={c} value={c} className="hover:bg-osu-scarlet/5">{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2 text-osu-scarlet">Website</label>
                <Input 
                  type="url" 
                  placeholder="https://" 
                  className="h-12 text-lg border-osu-gray/30 focus:border-osu-scarlet focus:ring-osu-scarlet/20" 
                />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2 text-osu-scarlet">Phone</label>
                <Input 
                  type="tel" 
                  placeholder="(555) 555-5555" 
                  className="h-12 text-lg border-osu-gray/30 focus:border-osu-scarlet focus:ring-osu-scarlet/20" 
                />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2 text-osu-scarlet">Description</label>
                <Textarea 
                  required 
                  placeholder="What support is provided? Who qualifies?" 
                  className="min-h-32 text-lg border-osu-gray/30 focus:border-osu-scarlet focus:ring-osu-scarlet/20" 
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading} 
                size="lg" 
                className="h-14 text-lg bg-gradient-to-r from-osu-scarlet to-osu-gray hover:from-osu-scarlet/90 hover:to-osu-gray/90 text-white shadow-lg"
              >
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
