import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Shield, Loader2, AlertTriangle } from "lucide-react";

interface MFAVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified: () => void;
  title?: string;
  description?: string;
}

export function MFAVerificationModal({
  isOpen,
  onClose,
  onVerified,
  title = "Verify Your Identity",
  description = "Enter the 6-digit code from your authenticator app to continue"
}: MFAVerificationModalProps) {
  const [otpCode, setOtpCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    if (otpCode.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    setVerifying(true);
    setError('');

    try {
      // Get MFA factors
      const { data: factorsData, error: factorsError } = await supabase.auth.mfa.listFactors();
      
      if (factorsError) throw factorsError;

      const totpFactor = factorsData.totp.find(f => f.status === 'verified');
      
      if (!totpFactor) {
        throw new Error('No verified MFA factor found');
      }

      // Create challenge
      const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId: totpFactor.id
      });

      if (challengeError) throw challengeError;

      // Verify
      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId: totpFactor.id,
        challengeId: challengeData.id,
        code: otpCode
      });

      if (verifyError) {
        setAttempts(prev => prev + 1);
        if (attempts >= 2) {
          toast.error('Too many failed attempts. Please try again later.');
          onClose();
          return;
        }
        throw verifyError;
      }

      // Log successful verification
      await supabase.from('audit_logs').insert({
        action: 'MFA_VERIFIED',
        resource_type: 'auth',
        severity: 'info'
      });

      toast.success('Identity verified');
      onVerified();
      onClose();
    } catch (error: any) {
      console.error('MFA verification error:', error);
      setError(error.message || 'Invalid verification code');
      setOtpCode('');
    } finally {
      setVerifying(false);
    }
  };

  const handleClose = () => {
    setOtpCode('');
    setError('');
    setAttempts(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            {title}
          </DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-center">
            <InputOTP
              value={otpCode}
              onChange={(value) => {
                setOtpCode(value);
                setError('');
              }}
              maxLength={6}
              disabled={verifying}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {attempts > 0 && (
            <p className="text-sm text-muted-foreground text-center">
              {3 - attempts} attempts remaining
            </p>
          )}

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleClose}
              className="flex-1"
              disabled={verifying}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleVerify}
              disabled={otpCode.length !== 6 || verifying}
              className="flex-1"
            >
              {verifying ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MFAVerificationModal;
