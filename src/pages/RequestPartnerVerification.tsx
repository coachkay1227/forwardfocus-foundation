import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { sanitizeInput } from "@/lib/security";
import { NavLink } from "react-router-dom";
import { AlertCircle, Shield, CheckCircle } from "lucide-react";

const RequestPartnerVerification = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    verificationType: 'partner',
    organizationName: '',
    justification: ''
  });

  useEffect(() => {
    document.title = "Request Partner Verification | Forward Focus";
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to request verification.",
        variant: "destructive"
      });
      return;
    }

    // Validate required fields
    if (!formData.organizationName || !formData.justification) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (formData.justification.length < 50) {
      toast({
        title: "Justification Too Short",
        description: "Please provide at least 50 characters explaining why you should be verified.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Check if user already has a pending or approved verification
      const { data: existingVerification, error: checkError } = await supabase
        .from('partner_verifications')
        .select('status')
        .eq('user_id', user.id)
        .in('status', ['pending', 'approved'])
        .maybeSingle();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing verification:', checkError);
        throw checkError;
      }

      if (existingVerification) {
        toast({
          title: "Verification Already Exists",
          description: `You already have a ${existingVerification.status} verification request.`,
          variant: "destructive"
        });
        return;
      }

      // Sanitize inputs
      const sanitizedData = {
        user_id: user.id,
        organization_name: formData.organizationName,
        organization_type: formData.verificationType,
        notes: sanitizeInput(formData.justification),
        status: 'pending'
      };

      const { error } = await supabase
        .from('partner_verifications')
        .insert(sanitizedData);

      if (error) {
        console.error('Error submitting verification request:', error);
        throw error;
      }

      toast({ 
        title: "Verification Request Submitted", 
        description: "Thank you! Our team will review your request within 3-5 business days." 
      });
      
      // Clear form
      setFormData({
        verificationType: 'partner',
        organizationName: '',
        justification: ''
      });

    } catch (error) {
      console.error('Error submitting verification request:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <main id="main" className="min-h-screen bg-gradient-osu-subtle">
        <div className="container py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-osu-gray/20 shadow-lg">
              <CardContent className="p-8">
                <AlertCircle className="h-12 w-12 text-osu-gray mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4 text-osu-scarlet">Authentication Required</h2>
                <p className="text-osu-gray mb-6">
                  Please sign in to request partner verification.
                </p>
                <div className="space-x-4">
                  <Button asChild className="bg-osu-scarlet hover:bg-osu-scarlet-dark">
                    <NavLink to="/partner-signin">Sign In</NavLink>
                  </Button>
                  <Button asChild variant="outline" className="border-osu-scarlet text-osu-scarlet hover:bg-osu-scarlet/10">
                    <NavLink to="/partner-signup">Create Account</NavLink>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main" className="min-h-screen bg-gradient-osu-subtle">
      <div className="bg-gradient-osu-primary border-b border-osu-scarlet/20">
        <div className="container py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
              Request Partner Verification
            </h1>
            <p className="text-xl text-white">
              Join our network of verified community partners
            </p>
          </div>
        </div>
      </div>
      
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          {/* Verification Benefits */}
          <Card className="mb-8 border-osu-gray/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-osu-scarlet/5 to-osu-gray/5">
              <CardTitle className="flex items-center gap-2 text-osu-scarlet">
                <CheckCircle className="h-5 w-5" />
                Verified Partner Benefits
              </CardTitle>
              <CardDescription className="text-osu-gray">
                What you'll gain as a verified partner
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-2 text-sm text-osu-gray">
                <li>• Priority access to referrals and community connections</li>
                <li>• Advanced analytics and impact tracking dashboard</li>
                <li>• Direct messaging with other verified partners</li>
                <li>• Featured listing in our partner directory</li>
                <li>• Exclusive partner events and training opportunities</li>
                <li>• Ability to submit and manage multiple resources</li>
              </ul>
            </CardContent>
          </Card>

          {/* Verification Form */}
          <Card className="border-osu-gray/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-osu-scarlet/5 to-osu-gray/5">
              <CardTitle className="text-osu-scarlet">Verification Application</CardTitle>
              <CardDescription className="text-osu-gray">
                Tell us about your organization and why you'd like to be verified
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-osu-scarlet">
                    Verification Type
                  </label>
                  <Select 
                    value={formData.verificationType} 
                    onValueChange={(value) => handleInputChange('verificationType', value)}
                  >
                    <SelectTrigger className="h-12 border-osu-gray/30 focus:border-osu-scarlet focus:ring-osu-scarlet/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-popover border border-osu-gray/20">
                      <SelectItem value="partner" className="hover:bg-osu-scarlet/5">Community Partner</SelectItem>
                      <SelectItem value="nonprofit" className="hover:bg-osu-scarlet/5">Nonprofit Organization</SelectItem>
                      <SelectItem value="government" className="hover:bg-osu-scarlet/5">Government Agency</SelectItem>
                      <SelectItem value="healthcare" className="hover:bg-osu-scarlet/5">Healthcare Provider</SelectItem>
                      <SelectItem value="education" className="hover:bg-osu-scarlet/5">Educational Institution</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-osu-scarlet">
                    Organization Name *
                  </label>
                  <Input 
                    required 
                    placeholder="Your organization's official name" 
                    value={formData.organizationName}
                    onChange={(e) => handleInputChange('organizationName', e.target.value)}
                    className="h-12 border-osu-gray/30 focus:border-osu-scarlet focus:ring-osu-scarlet/20" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-osu-scarlet">
                    Justification for Verification *
                  </label>
                  <Textarea 
                    required 
                    placeholder="Explain your organization's mission, services provided to justice-impacted individuals, track record, and why you should be verified as a partner. Include specific examples of your work in the community."
                    value={formData.justification}
                    onChange={(e) => handleInputChange('justification', e.target.value)}
                    className="min-h-32 border-osu-gray/30 focus:border-osu-scarlet focus:ring-osu-scarlet/20" 
                  />
                  <p className="text-xs text-osu-gray mt-1">
                    Minimum 50 characters required ({formData.justification.length}/50)
                  </p>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading || formData.justification.length < 50} 
                  size="lg" 
                  className="w-full h-12 bg-gradient-to-r from-osu-scarlet to-osu-gray hover:from-osu-scarlet/90 hover:to-osu-gray/90 text-white shadow-lg"
                >
                  {loading ? "Submitting Request..." : "Submit Verification Request"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Support Contact */}
          <div className="mt-8 text-center">
            <p className="text-sm text-osu-gray">
              Questions about verification? Contact us at{" "}
              <a href="mailto:partners@forwardfocus.org" className="text-osu-scarlet hover:underline">
                partners@forwardfocus.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RequestPartnerVerification;