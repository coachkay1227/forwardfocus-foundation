import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Shield, Send, Clock, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface ContactAccessRequestProps {
  organizationId: string;
  organizationName: string;
  existingRequest?: {
    id: string;
    status: 'pending' | 'approved' | 'denied' | 'revoked';
    created_at: string;
    expires_at?: string;
  } | null;
}

export const ContactAccessRequest = ({ 
  organizationId, 
  organizationName, 
  existingRequest 
}: ContactAccessRequestProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [justification, setJustification] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmitRequest = async () => {
    if (!reason.trim()) {
      toast({
        title: "Validation Error",
        description: "Please provide a reason for requesting access",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error} = await supabase.rpc('request_admin_contact_access', {
        p_organization_id: organizationId,
        p_access_purpose: reason.trim(),
        p_business_justification: justification.trim() || ''
      });

      if (error) {
        if (error.message.includes('rate limit')) {
          toast({
            title: "Rate Limit Exceeded",
            description: "You've made too many requests. Please wait before trying again.",
            variant: "destructive",
          });
        } else if (error.message.includes('Verified partner status required')) {
          toast({
            title: "Access Denied",
            description: "You must be a verified partner to request contact access.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }

      toast({
        title: "Request Submitted",
        description: "Your contact access request has been submitted for admin review.",
      });
      
      setReason("");
      setJustification("");
      setIsOpen(false);
      
      // Refresh the page to show updated status
      window.location.reload();
      
    } catch (error) {
      console.error('Error submitting access request:', error);
      toast({
        title: "Error",
        description: "Failed to submit access request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'denied':
      case 'revoked':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending Review';
      case 'approved':
        return 'Access Granted';
      case 'denied':
        return 'Access Denied';
      case 'revoked':
        return 'Access Revoked';
      default:
        return 'Unknown';
    }
  };

  const isAccessExpired = (expiresAt?: string) => {
    return expiresAt && new Date(expiresAt) < new Date();
  };

  if (!user) {
    return (
      <div className="bg-muted/50 p-3 rounded-lg text-sm text-center">
        <p className="text-muted-foreground">
          Please sign in to request contact information access.
        </p>
      </div>
    );
  }

  if (existingRequest) {
    const isExpired = isAccessExpired(existingRequest.expires_at);
    const showRequestButton = existingRequest.status === 'denied' || 
                             existingRequest.status === 'revoked' || 
                             isExpired;

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          {getStatusIcon(existingRequest.status)}
          <span className="font-medium">
            {getStatusText(existingRequest.status)}
          </span>
          {existingRequest.status === 'approved' && !isExpired && (
            <span className="text-xs text-muted-foreground">
              (Expires: {new Date(existingRequest.expires_at!).toLocaleDateString()})
            </span>
          )}
          {isExpired && (
            <span className="text-xs text-red-500">(Expired)</span>
          )}
        </div>
        
        {showRequestButton && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                Request New Access
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Request Contact Access</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Organization: <span className="font-medium">{organizationName}</span>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Access *</Label>
                  <Textarea
                    id="reason"
                    placeholder="e.g., Client referral, partnership discussion, service coordination..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    maxLength={500}
                  />
                  <div className="text-xs text-muted-foreground text-right">
                    {reason.length}/500 characters
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="justification">Business Justification (Optional)</Label>
                  <Textarea
                    id="justification"
                    placeholder="Additional context or justification for this request..."
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                    maxLength={1000}
                  />
                  <div className="text-xs text-muted-foreground text-right">
                    {justification.length}/1000 characters
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
                  <p className="text-amber-800">
                    ⚠️ Access requests are reviewed by administrators and may take 1-2 business days to process.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={handleSubmitRequest} 
                    disabled={isSubmitting || !reason.trim()}
                    className="flex-1"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Request
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          <Shield className="h-3 w-3 mr-1" />
          Request Contact Access
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request Contact Access</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Organization: <span className="font-medium">{organizationName}</span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Access *</Label>
            <Textarea
              id="reason"
              placeholder="e.g., Client referral, partnership discussion, service coordination..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              maxLength={500}
            />
            <div className="text-xs text-muted-foreground text-right">
              {reason.length}/500 characters
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="justification">Business Justification (Optional)</Label>
            <Textarea
              id="justification"
              placeholder="Additional context or justification for this request..."
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              maxLength={1000}
            />
            <div className="text-xs text-muted-foreground text-right">
              {justification.length}/1000 characters
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
            <p className="text-amber-800">
              ⚠️ Access requests are reviewed by administrators and may take 1-2 business days to process.
            </p>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={handleSubmitRequest} 
              disabled={isSubmitting || !reason.trim()}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Request
                </>
              )}
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};