import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';

export const RequestPartnerVerification: React.FC = () => {
  const [verificationRequest, setVerificationRequest] = useState({
    verification_type: 'partner',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

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
          verification_type: verificationRequest.verification_type,
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
            <Label htmlFor="notes">Justification</Label>
            <Textarea
              id="notes"
              value={verificationRequest.notes}
              onChange={(e) => 
                setVerificationRequest(prev => ({ ...prev, notes: e.target.value }))
              }
              placeholder="Please explain why you need access to partner contact information. Include details about your organization, role, and intended use of the data."
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