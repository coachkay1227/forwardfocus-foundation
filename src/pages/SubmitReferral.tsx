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
    <main id="main" className="container py-10">
      <h1 className="font-heading text-3xl font-semibold">Submit a Referral</h1>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4 max-w-xl">
        <div>
          <label className="block text-sm mb-1">Individual's Name</label>
          <Input 
            required 
            placeholder="Full name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Contact Email or Phone</label>
          <Input 
            required 
            placeholder="email@domain.com or (555) 555-5555" 
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Referral Notes</label>
          <Textarea 
            required 
            placeholder="Briefly describe the situation and needs" 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Referral"}</Button>
      </form>
    </main>
  );
};
export default SubmitReferral;
