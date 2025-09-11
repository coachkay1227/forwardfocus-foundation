import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Eye, Shield, AlertTriangle, Copy, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useSecurity } from "@/components/security/SecurityProvider";
import { useToast } from "@/hooks/use-toast";

interface ContactRevealProps {
  organizationId: string;
  organizationName: string;
  maskedContact: string;
  contactType: 'email' | 'phone';
}

interface ContactData {
  email: string;
  phone: string;
  address: string;
}

export const ContactReveal = ({ 
  organizationId, 
  organizationName, 
  maskedContact, 
  contactType 
}: ContactRevealProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fullContact, setFullContact] = useState<ContactData | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [copied, setCopied] = useState(false);
  const { isAdmin } = useAuth();
  const { logSecurityEvent } = useSecurity();
  const { toast } = useToast();

  const revealContact = async () => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "Admin privileges required",
        variant: "destructive",
      });
      return;
    }

    setIsRevealing(true);
    try {
      // Use the secure admin function to reveal full contact information
      const { data, error } = await supabase.rpc('admin_reveal_full_contact', {
        org_id: organizationId
      });

      if (error) {
        if (error.message.includes('rate limit')) {
          toast({
            title: "Rate Limit Exceeded",
            description: "You've reached the limit for contact reveals. Please wait before trying again.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }

      setFullContact(data?.[0] || null);
      
      // Log the security event
      logSecurityEvent('ADMIN_CONTACT_REVEAL', {
        organizationId,
        organizationName,
        contactType,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error revealing contact:', error);
      toast({
        title: "Error",
        description: "Failed to reveal contact information",
        variant: "destructive",
      });
    } finally {
      setIsRevealing(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      logSecurityEvent('CONTACT_COPIED', {
        organizationId,
        contactType,
        timestamp: new Date().toISOString()
      });
      
      toast({
        title: "Copied",
        description: "Contact information copied to clipboard",
      });
    } catch (error) {
      console.error('Failed to copy:', error);
      toast({
        title: "Copy Failed", 
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  if (!isAdmin) {
    return (
      <div className="text-sm text-muted-foreground">
        {maskedContact}
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="p-0 h-auto text-sm text-primary hover:bg-transparent hover:underline"
          onClick={() => setIsOpen(true)}
        >
          <Eye className="h-3 w-3 mr-1" />
          {maskedContact}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Reveal Contact Information
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-800 mb-1">Security Warning</p>
                <p className="text-amber-700">
                  This action will reveal sensitive contact information and is logged for audit purposes.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">Organization:</span> {organizationName}
            </div>
            <div className="text-sm">
              <span className="font-medium">Requesting:</span> {contactType} information
            </div>
          </div>

          {!fullContact ? (
            <div className="space-y-3">
              <Button 
                onClick={revealContact} 
                disabled={isRevealing}
                className="w-full"
              >
                {isRevealing ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                    Revealing...
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Reveal Contact Information
                  </>
                )}
              </Button>
              
              <div className="text-xs text-muted-foreground text-center">
                This action is rate limited and fully audited
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Badge variant="secondary" className="w-full justify-center py-2">
                <CheckCircle className="h-3 w-3 mr-1" />
                Contact Information Revealed
              </Badge>
              
              <div className="space-y-3">
                {fullContact.email && fullContact.email !== 'Not available' && (
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Email Address
                    </label>
                    <div className="flex items-center gap-2 p-2 bg-muted rounded border">
                      <span className="flex-1 text-sm font-mono">{fullContact.email}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(fullContact.email)}
                        className="h-6 w-6 p-0"
                      >
                        {copied ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </Button>
                    </div>
                  </div>
                )}

                {fullContact.phone && fullContact.phone !== 'Not available' && (
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Phone Number
                    </label>
                    <div className="flex items-center gap-2 p-2 bg-muted rounded border">
                      <span className="flex-1 text-sm font-mono">{fullContact.phone}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(fullContact.phone)}
                        className="h-6 w-6 p-0"
                      >
                        {copied ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </Button>
                    </div>
                  </div>
                )}

                {fullContact.address && fullContact.address !== 'Not available' && (
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Address
                    </label>
                    <div className="flex items-center gap-2 p-2 bg-muted rounded border">
                      <span className="flex-1 text-sm">{fullContact.address}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(fullContact.address)}
                        className="h-6 w-6 p-0"
                      >
                        {copied ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                ⚠️ This access has been logged and is subject to audit review.
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};