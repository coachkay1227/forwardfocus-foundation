import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const SubmitReferral = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(()=>{ document.title = "Submit Referral | Partner Portal"; },[]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contactInfo || !notes) {
      toast({ 
        title: "Error", 
        description: "Please fill in all fields",
        variant: "destructive" 
      });
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('partner_referrals')
        .insert({
          name: name.trim(),
          contact_info: contactInfo.trim(),
          notes: notes.trim()
        });

      if (error) {
        console.error('Error submitting referral:', error);
        toast({ 
          title: "Error", 
          description: "Failed to submit referral. Please try again.",
          variant: "destructive" 
        });
      } else {
        toast({ 
          title: "Referral submitted", 
          description: "We'll follow up with the individual promptly." 
        });
        // Clear form
        setName("");
        setContactInfo("");
        setNotes("");
      }
    } catch (error) {
      console.error('Error submitting referral:', error);
      toast({ 
        title: "Error", 
        description: "Failed to submit referral. Please try again.",
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="main" className="min-h-screen bg-muted/30">
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b">
        <div className="container py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Submit a Referral</h1>
            <p className="text-xl text-muted-foreground">Connect someone in need with our comprehensive support network</p>
          </div>
        </div>
      </div>
      
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-xl shadow-lg border-0 p-8">
            <form onSubmit={onSubmit} className="grid gap-6">
              <div>
                <label className="block text-lg font-semibold mb-2">Individual's Name</label>
                <Input 
                  required 
                  placeholder="Full name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 text-lg"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2">Contact Email or Phone</label>
                <Input 
                  required 
                  placeholder="email@domain.com or (555) 555-5555" 
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="h-12 text-lg"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2">Referral Notes</label>
                <Textarea 
                  required 
                  placeholder="Briefly describe the situation and needs" 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-32 text-lg"
                />
              </div>
              <Button type="submit" disabled={loading} variant="premium" size="lg" className="h-14 text-lg">
                {loading ? "Submitting..." : "Submit Referral"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};
export default SubmitReferral;
