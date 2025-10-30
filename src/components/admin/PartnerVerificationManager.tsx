import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface PartnerVerification {
  id: string;
  user_id: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  organization_name: string;
  organization_type: string;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
  verification_documents: any;
  // User profile info (from join)
  display_name?: string;
}

export const PartnerVerificationManager: React.FC = () => {
  const [verifications, setVerifications] = useState<PartnerVerification[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchVerifications();
  }, []);

  const fetchVerifications = async () => {
    try {
      const { data, error } = await supabase
        .from('partner_verifications')
        .select(`
          *,
          profiles(display_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVerifications(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch partner verifications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateVerificationStatus = async (
    id: string, 
    newStatus: string, 
    notes: string
  ) => {
    try {
      const currentUser = (await supabase.auth.getUser()).data.user;
      const updateData: any = { 
        status: newStatus,
        notes: notes || null,
        reviewed_at: new Date().toISOString(),
        reviewed_by: currentUser?.id,
      };

      // Set verified_at, verified_by, and expires_at when approving
      if (newStatus === 'approved') {
        updateData.verified_at = new Date().toISOString();
        updateData.verified_by = currentUser?.id;
        updateData.expires_at = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(); // 1 year from now
      }

      // Get the verification record with user email
      const { data: verificationData, error: fetchError } = await supabase
        .from('partner_verifications')
        .select(`
          *,
          profiles(email, display_name)
        `)
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      // Update verification status
      const { error } = await supabase
        .from('partner_verifications')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      // Send email notification
        try {
          const userEmail = verificationData.contact_email || (verificationData as any).profiles?.email;
          if (userEmail) {
            await supabase.functions.invoke('send-verification-email', {
              body: {
                userEmail,
                contactName: verificationData.contact_name,
                contactPhone: verificationData.contact_phone,
                organizationName: verificationData.organization_name,
                status: newStatus,
                adminNotes: notes,
                verifiedAt: updateData.verified_at,
              },
            });
            console.log(`Verification email sent to ${userEmail}`);
          }
        } catch (emailError) {
          console.error('Failed to send verification email:', emailError);
          // Don't fail the whole operation if email fails
        }

      toast({
        title: "Success",
        description: `Verification status updated to ${newStatus}`,
      });

      fetchVerifications();
    } catch (error: any) {
      toast({
        title: "Error", 
        description: "Failed to update verification status",
        variant: "destructive",
      });
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-success text-success-foreground';
      case 'rejected':
        return 'bg-destructive text-destructive-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (loading) {
    return <div className="p-6">Loading verifications...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Partner Verifications</h2>
        <Badge variant="outline">
          {verifications.filter(v => v.status === 'pending').length} pending
        </Badge>
      </div>

      <div className="grid gap-4">
        {verifications.map((verification) => (
          <VerificationCard
            key={verification.id}
            verification={verification}
            onUpdate={updateVerificationStatus}
            getStatusBadgeColor={getStatusBadgeColor}
          />
        ))}

        {verifications.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No partner verification requests found
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

interface VerificationCardProps {
  verification: PartnerVerification;
  onUpdate: (id: string, status: string, notes: string) => void;
  getStatusBadgeColor: (status: string) => string;
}

const VerificationCard: React.FC<VerificationCardProps> = ({
  verification,
  onUpdate,
  getStatusBadgeColor
}) => {
  const [selectedStatus, setSelectedStatus] = useState(verification.status);
  const [notes, setNotes] = useState(verification.notes || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    await onUpdate(verification.id, selectedStatus, notes);
    setIsUpdating(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            Partner Verification Request
          </CardTitle>
          <Badge className={getStatusBadgeColor(verification.status)}>
            {verification.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <Label className="text-muted-foreground">Contact Name</Label>
            <p className="font-medium">
              {verification.contact_name || 'Not provided'}
            </p>
          </div>
          <div>
            <Label className="text-muted-foreground">Contact Email</Label>
            <p className="font-medium">{verification.contact_email || 'Not provided'}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Contact Phone</Label>
            <p className="font-medium">{verification.contact_phone || 'Not provided'}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Organization</Label>
            <p className="font-medium">{verification.organization_name}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Organization Type</Label>
            <p className="font-medium capitalize">{verification.organization_type}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Requested</Label>
            <p className="font-medium">
              {new Date(verification.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {verification.notes && (
          <div className="pt-3 border-t">
            <Label className="text-muted-foreground">Partnership Vision</Label>
            <p className="text-sm mt-1 whitespace-pre-wrap">{verification.notes}</p>
          </div>
        )}

        {verification.status === 'pending' && (
          <div className="space-y-3 pt-4 border-t">
            <div className="space-y-2">
              <Label htmlFor={`status-${verification.id}`}>Update Status</Label>
              <Select
                value={selectedStatus}
                onValueChange={setSelectedStatus}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`notes-${verification.id}`}>Notes</Label>
              <Textarea
                id={`notes-${verification.id}`}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any notes about this verification..."
                className="min-h-[80px]"
              />
            </div>

            <Button 
              onClick={handleUpdate}
              disabled={isUpdating}
              className="w-full"
            >
              {isUpdating ? 'Updating...' : 'Update Verification'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};