import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { sanitizeInput, isValidEmail, isValidPhone, RateLimiter, generateCSRFToken } from "@/lib/security";

const SubmitReferral = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [notes, setNotes] = useState("");
  const [csrfToken] = useState(generateCSRFToken());
  const rateLimiter = new RateLimiter();

  useEffect(()=>{ document.title = "Submit Referral | Partner Portal"; },[]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    const clientId = `${contactInfo || 'anonymous'}_referral`;
    if (rateLimiter.isRateLimited(clientId, 2, 600000)) { // 2 attempts per 10 minutes
      toast({ 
        title: "Error", 
        description: "Too many attempts. Please wait 10 minutes before trying again.",
        variant: "destructive" 
      });
      return;
    }
    
    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedContactInfo = sanitizeInput(contactInfo);
    const sanitizedNotes = sanitizeInput(notes);
    
    // Validation
    if (!sanitizedName || !sanitizedContactInfo || !sanitizedNotes) {
      toast({ 
        title: "Error", 
        description: "Please fill in all fields",
        variant: "destructive" 
      });
      return;
    }

    if (sanitizedName.length < 2 || sanitizedName.length > 100) {
      toast({ 
        title: "Error", 
        description: "Name must be between 2 and 100 characters",
        variant: "destructive" 
      });
      return;
    }

    // Validate contact info (email or phone)
    const isEmail = sanitizedContactInfo.includes('@');
    const isPhone = /^\+?[\d\s\-\(\)\.]{10,}$/.test(sanitizedContactInfo);
    
    if (!isEmail && !isPhone) {
      toast({ 
        title: "Error", 
        description: "Please provide a valid email address or phone number",
        variant: "destructive" 
      });
      return;
    }

    if (isEmail && !isValidEmail(sanitizedContactInfo)) {
      toast({ 
        title: "Error", 
        description: "Please provide a valid email address",
        variant: "destructive" 
      });
      return;
    }

    if (sanitizedNotes.length < 10 || sanitizedNotes.length > 500) {
      toast({ 
        title: "Error", 
        description: "Notes must be between 10 and 500 characters",
        variant: "destructive" 
      });
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('partner_referrals')
        .insert({
          name: sanitizedName,
          contact_info: sanitizedContactInfo,
          notes: sanitizedNotes
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
