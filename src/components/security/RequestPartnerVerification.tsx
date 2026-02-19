import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';

export const RequestPartnerVerification: React.FC = () => {
  const [verificationRequest, setVerificationRequest] = useState({
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    verification_type: 'partner',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Pre-fill email from user profile
  React.useEffect(() => {
    const fetchUserEmail = async () => {
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('email, full_name')
          .eq('id', user.id)
          .single();
        
        if (data) {
          setVerificationRequest(prev => ({
            ...prev,
            contact_email: data.email || '',
            contact_name: data.full_name || ''
          }));
        }
      }
    };
    fetchUserEmail();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to request partner verification",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('partner_verifications')
        .insert({
          user_id: user.id,
          contact_name: verificationRequest.contact_name,
          contact_email: verificationRequest.contact_email,
          contact_phone: verificationRequest.contact_phone,
          organization_name: 'Pending Organization Name',
          organization_type: verificationRequest.verification_type,
          notes: verificationRequest.notes || null,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Verification Request Submitted",
        description: "Your partner verification request has been submitted and is pending review.",
      });

      // Reset form
      setVerificationRequest({
        contact_name: '',
        contact_email: '',
        contact_phone: '',
        verification_type: 'partner',
        notes: ''
      });

    } catch (error: any) {
      toast({
        title: "Request Failed",
        description: error.message || "Failed to submit verification request",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            Please sign in to request partner verification
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Partner Verification</CardTitle>
        <p className="text-sm text-muted-foreground">
          Partner verification allows you to access sensitive contact information for organizations. 
          This access is reviewed and approved by administrators.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Full Name *</Label>
            <Input
              id="contact-name"
              required
              value={verificationRequest.contact_name}
              onChange={(e) => 
                setVerificationRequest(prev => ({ ...prev, contact_name: e.target.value }))
              }
              placeholder="Your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-email">Email Address *</Label>
            <Input
              id="contact-email"
              type="email"
              required
              value={verificationRequest.contact_email}
              onChange={(e) => 
                setVerificationRequest(prev => ({ ...prev, contact_email: e.target.value }))
              }
              placeholder="your.email@organization.org"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-phone">Phone Number *</Label>
            <Input
              id="contact-phone"
              type="tel"
              required
              value={verificationRequest.contact_phone}
              onChange={(e) => 
                setVerificationRequest(prev => ({ ...prev, contact_phone: e.target.value }))
              }
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="verification-type">Verification Type</Label>
            <Select
              value={verificationRequest.verification_type}
              onValueChange={(value) => 
                setVerificationRequest(prev => ({ ...prev, verification_type: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select verification type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="partner">Partner Organization</SelectItem>
                <SelectItem value="researcher">Researcher</SelectItem>
                <SelectItem value="advocate">Community Advocate</SelectItem>
                <SelectItem value="government">Government Agency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">How Can We Partner?</Label>
            <Textarea
              id="notes"
              value={verificationRequest.notes}
              onChange={(e) => 
                setVerificationRequest(prev => ({ ...prev, notes: e.target.value }))
              }
              placeholder="Tell us about your partnership vision:
• How can we support your mission?
• What resources would benefit your community?
• How will you help justice-impacted individuals?"
              className="min-h-[120px]"
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading || !verificationRequest.notes.trim()}
            className="w-full"
          >
            {loading ? 'Submitting Request...' : 'Request Verification'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};