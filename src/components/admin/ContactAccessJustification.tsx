import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactAccessJustificationProps {
  organizationId: string;
  organizationName: string;
  onAccessGranted?: () => void;
}

interface JustificationRequest {
  id: string;
  status: 'pending' | 'approved' | 'denied' | 'expired';
  business_justification: string;
  access_purpose: string;
  expires_at: string;
  created_at: string;
  approved_at?: string;
  approved_by?: string;
}

export const ContactAccessJustification = ({ 
  organizationId, 
  organizationName,
  onAccessGranted 
}: ContactAccessJustificationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [businessJustification, setBusinessJustification] = useState("");
  const [accessPurpose, setAccessPurpose] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingRequest, setExistingRequest] = useState<JustificationRequest | null>(null);
  const { toast } = useToast();

  const checkExistingRequest = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_access_justifications')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('admin_user_id', (await supabase.auth.getUser()).data.user?.id)
        .in('status', ['pending', 'approved'])
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (data && !error) {
        setExistingRequest(data as JustificationRequest);
        if (data.status === 'approved' && onAccessGranted) {
          onAccessGranted();
        }
      }
    } catch (error) {
      // No existing request found, which is fine
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    checkExistingRequest();
  };

  const submitJustification = async () => {
    if (businessJustification.trim().length < 20) {
      toast({
        title: "Invalid Input",
        description: "Business justification must be at least 20 characters.",
        variant: "destructive",
      });
      return;
    }

    if (accessPurpose.trim().length < 10) {
      toast({
        title: "Invalid Input", 
        description: "Access purpose must be at least 10 characters.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.rpc('request_admin_contact_access', {
        p_organization_id: organizationId,
        p_business_justification: businessJustification.trim(),
        p_access_purpose: accessPurpose.trim()
      });

      if (error) {
        if (error.message.includes('Too many access requests')) {
          toast({
            title: "Rate Limited",
            description: "You've reached the hourly limit for access requests. Please wait before submitting another request.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Request Submitted",
          description: "Your contact access request has been submitted for approval.",
        });
        
        // Reset form and check for the new request
        setBusinessJustification("");
        setAccessPurpose("");
        checkExistingRequest();
      }
    } catch (error) {
      console.error('Error submitting justification:', error);
      toast({
        title: "Error",
        description: "Failed to submit access request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default" className="bg-green-600"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'pending':
        return <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'denied':
        return <Badge variant="destructive">Denied</Badge>;
      case 'expired':
        return <Badge variant="secondary">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={handleOpen}
        >
          <Shield className="h-4 w-4" />
          Request Contact Access
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Business Justification Required
          </DialogTitle>
          <DialogDescription className="sr-only">Provide business justification to request protected contact access.</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-800 mb-1">Enhanced Security Protocol</p>
                <p className="text-amber-700">
                  Access to organization contact information requires business justification and approval 
                  from another administrator for audit compliance and data protection.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">Organization:</span> {organizationName}
            </div>
          </div>

          {existingRequest ? (
            <div className="space-y-3">
              <div className="border rounded-lg p-4 bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">Current Request Status</span>
                  {getStatusBadge(existingRequest.status)}
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">Submitted:</span> {formatDateTime(existingRequest.created_at)}
                  </div>
                  {existingRequest.approved_at && (
                    <div>
                      <span className="font-medium">Approved:</span> {formatDateTime(existingRequest.approved_at)}
                    </div>
                  )}
                  {existingRequest.status === 'approved' && (
                    <div>
                      <span className="font-medium">Expires:</span> {formatDateTime(existingRequest.expires_at)}
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Purpose:</span> {existingRequest.access_purpose}
                  </div>
                  <div>
                    <span className="font-medium">Justification:</span> {existingRequest.business_justification}
                  </div>
                </div>

                {existingRequest.status === 'approved' && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-sm font-medium text-green-700">
                      ✓ Access granted - you can now view contact information for this organization.
                    </p>
                  </div>
                )}
              </div>

              {existingRequest.status === 'pending' && (
                <p className="text-sm text-muted-foreground text-center">
                  Your request is awaiting approval from another administrator.
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accessPurpose">Access Purpose *</Label>
                <Textarea
                  id="accessPurpose"
                  placeholder="Describe why you need access to this organization's contact information..."
                  value={accessPurpose}
                  onChange={(e) => setAccessPurpose(e.target.value)}
                  className="min-h-[60px]"
                />
                <p className="text-xs text-muted-foreground">
                  Minimum 10 characters required
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessJustification">Business Justification *</Label>
                <Textarea
                  id="businessJustification"
                  placeholder="Provide detailed business justification for accessing this sensitive contact information..."
                  value={businessJustification}
                  onChange={(e) => setBusinessJustification(e.target.value)}
                  className="min-h-[80px]"
                />
                <p className="text-xs text-muted-foreground">
                  Minimum 20 characters required. Be specific about your business need.
                </p>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={submitJustification}
                  disabled={isSubmitting || businessJustification.trim().length < 20 || accessPurpose.trim().length < 10}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                      Submitting Request...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Submit Access Request
                    </>
                  )}
                </Button>
                
                <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                  ⚠️ This request will be logged and require approval from another administrator. 
                  Access is time-limited and subject to audit review.
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};