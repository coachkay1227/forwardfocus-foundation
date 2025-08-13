import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const RequestPartnership = () => {
  const [loading, setLoading] = useState(false);
  const [organizationName, setOrganizationName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [description, setDescription] = useState("");

  useEffect(()=>{ document.title = "Request Partnership | Partner Portal"; },[]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!organizationName || !contactEmail || !description) {
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
        .from('partnership_requests')
        .insert({
          organization_name: organizationName.trim(),
          contact_email: contactEmail.trim(),
          description: description.trim()
        });

      if (error) {
        console.error('Error submitting partnership request:', error);
        toast({ 
          title: "Error", 
          description: "Failed to submit request. Please try again.",
          variant: "destructive" 
        });
      } else {
        toast({ 
          title: "Request sent", 
          description: "We will contact you shortly to discuss collaboration." 
        });
        // Clear form
        setOrganizationName("");
        setContactEmail("");
        setDescription("");
      }
    } catch (error) {
      console.error('Error submitting partnership request:', error);
      toast({ 
        title: "Error", 
        description: "Failed to submit request. Please try again.",
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="main" className="container py-10">
      <h1 className="font-heading text-3xl font-semibold">Request Partnership</h1>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4 max-w-xl">
        <div>
          <label className="block text-sm mb-1">Organization Name</label>
          <Input 
            required 
            placeholder="Your nonprofit or program" 
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Contact Email</label>
          <Input 
            required 
            type="email" 
            placeholder="you@org.org" 
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">How would you like to collaborate?</label>
          <Textarea 
            required 
            placeholder="Tell us about your programs and needs" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={loading}>{loading ? "Sending..." : "Send Request"}</Button>
      </form>
    </main>
  );
};
export default RequestPartnership;
