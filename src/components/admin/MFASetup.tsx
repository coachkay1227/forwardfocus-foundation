import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Shield, Smartphone, Copy, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

interface MFASetupProps {
  onComplete?: () => void;
}

export function MFASetup({ onComplete }: MFASetupProps) {
  const [step, setStep] = useState<'intro' | 'qr' | 'verify' | 'complete'>('intro');
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [factorId, setFactorId] = useState<string>('');
  const [otpCode, setOtpCode] = useState('');
  const [verifying, setVerifying] = useState(false);

  const startEnrollment = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: 'Authenticator App'
      });

      if (error) throw error;

      if (data.totp) {
        setQrCode(data.totp.qr_code);
        setSecret(data.totp.secret);
        setFactorId(data.id);
        setStep('qr');
      }
    } catch (error: any) {
      console.error('MFA enrollment error:', error);
      toast.error(error.message || 'Failed to start MFA enrollment');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (otpCode.length !== 6) {
      toast.error('Please enter a 6-digit code');
      return;
    }

    setVerifying(true);
    try {
      const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId
      });

      if (challengeError) throw challengeError;

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challengeData.id,
        code: otpCode
      });

      if (verifyError) throw verifyError;

      // Log MFA enrollment
      await supabase.from('audit_logs').insert({
        action: 'MFA_ENROLLED',
        resource_type: 'auth',
        details: { factor_id: factorId },
        severity: 'info'
      });

      setStep('complete');
      toast.success('MFA successfully enabled!');
      onComplete?.();
    } catch (error: any) {
      console.error('MFA verification error:', error);
      toast.error(error.message || 'Invalid verification code');
      setOtpCode('');
    } finally {
      setVerifying(false);
    }
  };

  const copySecret = () => {
    navigator.clipboard.writeText(secret);
    toast.success('Secret copied to clipboard');
  };

  if (step === 'intro') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Enable Two-Factor Authentication
          </CardTitle>
          <CardDescription>
            Add an extra layer of security to your admin account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-4 rounded-lg space-y-3">
            <h4 className="font-medium">What you'll need:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                An authenticator app (Google Authenticator, Authy, 1Password, etc.)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                About 2 minutes to complete setup
              </li>
            </ul>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Once enabled, you'll need your authenticator app to access admin features.
              Make sure to save your recovery codes.
            </AlertDescription>
          </Alert>

          <Button onClick={startEnrollment} disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Setting up...
              </>
            ) : (
              <>
                <Shield className="h-4 w-4 mr-2" />
                Begin Setup
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (step === 'qr') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            Scan QR Code
          </CardTitle>
          <CardDescription>
            Use your authenticator app to scan this QR code
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-lg">
              <img src={qrCode} alt="MFA QR Code" className="w-48 h-48" />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground text-center">
              Can't scan? Enter this code manually:
            </p>
            <div className="flex items-center gap-2 justify-center">
              <code className="bg-muted px-3 py-2 rounded text-sm font-mono">
                {secret}
              </code>
              <Button variant="outline" size="sm" onClick={copySecret}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button onClick={() => setStep('verify')} className="w-full">
            I've scanned the code
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (step === 'verify') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Verify Setup
          </CardTitle>
          <CardDescription>
            Enter the 6-digit code from your authenticator app
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <InputOTP
              value={otpCode}
              onChange={setOtpCode}
              maxLength={6}
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

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setStep('qr')} 
              className="flex-1"
              disabled={verifying}
            >
              Back
            </Button>
            <Button 
              onClick={verifyOTP} 
              disabled={otpCode.length !== 6 || verifying}
              className="flex-1"
            >
              {verifying ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify & Enable'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="py-8 text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">MFA Successfully Enabled!</h3>
          <p className="text-muted-foreground">
            Your account is now protected with two-factor authentication.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default MFASetup;
