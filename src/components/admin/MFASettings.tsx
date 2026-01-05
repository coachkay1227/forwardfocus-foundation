import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Shield, ShieldCheck, ShieldOff, Trash2, Loader2, AlertTriangle } from "lucide-react";
import { MFASetup } from "./MFASetup";

interface MFAFactor {
  id: string;
  friendly_name: string;
  status: 'verified' | 'unverified';
  created_at: string;
}

export function MFASettings() {
  const [factors, setFactors] = useState<MFAFactor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSetup, setShowSetup] = useState(false);
  const [disableDialogOpen, setDisableDialogOpen] = useState(false);
  const [disabling, setDisabling] = useState(false);
  const [selectedFactor, setSelectedFactor] = useState<MFAFactor | null>(null);

  useEffect(() => {
    fetchFactors();
  }, []);

  const fetchFactors = async () => {
    try {
      const { data, error } = await supabase.auth.mfa.listFactors();
      
      if (error) throw error;

      const verifiedFactors = data.totp.filter(f => f.status === 'verified');
      setFactors(verifiedFactors as MFAFactor[]);
    } catch (error) {
      console.error('Error fetching MFA factors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisableMFA = async () => {
    if (!selectedFactor) return;

    setDisabling(true);
    try {
      const { error } = await supabase.auth.mfa.unenroll({
        factorId: selectedFactor.id
      });

      if (error) throw error;

      // Log MFA disable
      await supabase.from('audit_logs').insert({
        action: 'MFA_DISABLED',
        resource_type: 'auth',
        details: { factor_id: selectedFactor.id },
        severity: 'warn'
      });

      toast.success('MFA has been disabled');
      setDisableDialogOpen(false);
      fetchFactors();
    } catch (error: any) {
      console.error('Error disabling MFA:', error);
      toast.error(error.message || 'Failed to disable MFA');
    } finally {
      setDisabling(false);
    }
  };

  const hasMFA = factors.length > 0;

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (showSetup) {
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={() => setShowSetup(false)}>
          ← Back to Settings
        </Button>
        <MFASetup onComplete={() => {
          setShowSetup(false);
          fetchFactors();
        }} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Two-Factor Authentication
              </CardTitle>
              <CardDescription>
                Protect your admin account with an additional layer of security
              </CardDescription>
            </div>
            <Badge variant={hasMFA ? "default" : "secondary"}>
              {hasMFA ? (
                <>
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  Enabled
                </>
              ) : (
                <>
                  <ShieldOff className="h-3 w-3 mr-1" />
                  Disabled
                </>
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {hasMFA ? (
            <div className="space-y-4">
              <Alert>
                <ShieldCheck className="h-4 w-4" />
                <AlertDescription>
                  Your account is protected with two-factor authentication.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Enrolled Authenticators</h4>
                {factors.map((factor) => (
                  <div 
                    key={factor.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{factor.friendly_name || 'Authenticator App'}</p>
                        <p className="text-xs text-muted-foreground">
                          Added {new Date(factor.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => {
                        setSelectedFactor(factor);
                        setDisableDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Your admin account is not protected with two-factor authentication.
                  We strongly recommend enabling MFA for security.
                </AlertDescription>
              </Alert>

              <Button onClick={() => setShowSetup(true)}>
                <Shield className="h-4 w-4 mr-2" />
                Enable Two-Factor Authentication
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Disable MFA Dialog */}
      <Dialog open={disableDialogOpen} onOpenChange={setDisableDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Disable Two-Factor Authentication?
            </DialogTitle>
            <DialogDescription>
              This will remove the extra security protection from your account.
              You can re-enable it at any time.
            </DialogDescription>
          </DialogHeader>

          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Warning: Disabling MFA makes your admin account more vulnerable to unauthorized access.
            </AlertDescription>
          </Alert>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDisableDialogOpen(false)}
              disabled={disabling}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDisableMFA}
              disabled={disabling}
            >
              {disabling ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Disabling...
                </>
              ) : (
                'Disable MFA'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MFASettings;
