import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
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
    <main id="main" className="container py-16">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="font-heading text-5xl font-bold mb-6">Request Partnership</h1>
          <p className="text-xl text-foreground/80 leading-relaxed">
            Join our network of organizations committed to supporting justice-impacted individuals and families.
          </p>
        </header>
        
        <Card className="shadow-lg border-0">
          <CardContent className="p-10">
            <form onSubmit={onSubmit} className="grid gap-8">
              <div>
                <label className="block text-base font-medium mb-3" htmlFor="org-name">Organization Name</label>
                <Input 
                  id="org-name"
                  required 
                  placeholder="Your nonprofit or program" 
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  className="h-12 text-base"
                />
              </div>
              <div>
                <label className="block text-base font-medium mb-3" htmlFor="contact-email">Contact Email</label>
                <Input 
                  id="contact-email"
                  required 
                  type="email" 
                  placeholder="you@org.org" 
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="h-12 text-base"
                />
              </div>
              <div>
                <label className="block text-base font-medium mb-3" htmlFor="collaboration">How would you like to collaborate?</label>
                <Textarea 
                  id="collaboration"
                  required 
                  placeholder="Tell us about your programs and needs" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-32 text-base resize-none"
                />
              </div>
              <Button type="submit" disabled={loading} size="lg" className="shadow-md">
                {loading ? "Sending..." : "Send Request"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
export default RequestPartnership;
