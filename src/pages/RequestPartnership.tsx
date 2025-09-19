import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { sanitizeInput, isValidEmail, RateLimiter, generateCSRFToken } from "@/lib/security";
import { Building2, Mail, FileText } from "lucide-react";

const RequestPartnership = () => {
  const [loading, setLoading] = useState(false);
  const [organizationName, setOrganizationName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [description, setDescription] = useState("");
  const [csrfToken] = useState(generateCSRFToken());
  const rateLimiter = new RateLimiter();

  useEffect(()=>{ document.title = "Request Partnership | Partner Portal"; },[]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    const clientId = `${contactEmail || 'anonymous'}_partnership`;
    if (rateLimiter.isRateLimited(clientId, 2, 600000)) { // 2 attempts per 10 minutes
      toast({ 
        title: "Error", 
        description: "Too many attempts. Please wait 10 minutes before trying again.",
        variant: "destructive" 
      });
      return;
    }
    
    // Sanitize inputs
    const sanitizedOrgName = sanitizeInput(organizationName);
    const sanitizedEmail = sanitizeInput(contactEmail);
    const sanitizedDescription = sanitizeInput(description);
    
    // Validation
    if (!sanitizedOrgName || !sanitizedEmail || !sanitizedDescription) {
      toast({ 
        title: "Error", 
        description: "Please fill in all fields",
        variant: "destructive" 
      });
      return;
    }

    if (sanitizedOrgName.length < 2 || sanitizedOrgName.length > 100) {
      toast({ 
        title: "Error", 
        description: "Organization name must be between 2 and 100 characters",
        variant: "destructive" 
      });
      return;
    }

    if (!isValidEmail(sanitizedEmail)) {
      toast({ 
        title: "Error", 
        description: "Please enter a valid email address",
        variant: "destructive" 
      });
      return;
    }

    if (sanitizedDescription.length < 10 || sanitizedDescription.length > 1000) {
      toast({ 
        title: "Error", 
        description: "Description must be between 10 and 1000 characters",
        variant: "destructive" 
      });
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('partnership_requests')
        .insert({
          organization_name: sanitizedOrgName,
          contact_email: sanitizedEmail,
          description: sanitizedDescription
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
    <main id="main" className="min-h-screen bg-gradient-to-br from-osu-scarlet/5 via-background to-osu-gray/5 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-osu-scarlet/20 to-osu-gray/20 rounded-xl">
              <Building2 className="h-8 w-8 text-osu-scarlet" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-osu-scarlet">Request Partnership</h1>
          </div>
          <p className="text-lg text-osu-gray leading-relaxed max-w-lg mx-auto">
            Join our network of organizations committed to supporting justice-impacted individuals and families.
          </p>
        </div>
        
        <Card className="shadow-2xl border border-osu-gray/20 bg-white/95 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-osu-scarlet/5 to-osu-gray/5 text-center pb-6">
            <CardTitle className="text-2xl text-osu-scarlet">Partnership Application</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-base font-semibold text-osu-scarlet" htmlFor="org-name">
                  <Building2 className="h-4 w-4" />
                  Organization Name
                </label>
                <Input 
                  id="org-name"
                  required 
                  placeholder="Your nonprofit or program" 
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  className="h-12 text-base border-osu-gray/30 focus:border-osu-scarlet focus:ring-osu-scarlet/20"
                />
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-base font-semibold text-osu-scarlet" htmlFor="contact-email">
                  <Mail className="h-4 w-4" />
                  Contact Email
                </label>
                <Input 
                  id="contact-email"
                  required 
                  type="email" 
                  placeholder="you@org.org" 
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="h-12 text-base border-osu-gray/30 focus:border-osu-scarlet focus:ring-osu-scarlet/20"
                />
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-base font-semibold text-osu-scarlet" htmlFor="collaboration">
                  <FileText className="h-4 w-4" />
                  How would you like to collaborate?
                </label>
                <Textarea 
                  id="collaboration"
                  required 
                  placeholder="Tell us about your programs, services, and how you'd like to partner with us to support justice-impacted individuals..." 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-32 text-base resize-none border-osu-gray/30 focus:border-osu-scarlet focus:ring-osu-scarlet/20"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={loading} 
                size="lg" 
                className="w-full bg-gradient-to-r from-osu-scarlet to-osu-gray hover:from-osu-scarlet/90 hover:to-osu-gray/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Sending Request...
                  </div>
                ) : (
                  "Send Partnership Request"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default RequestPartnership;
