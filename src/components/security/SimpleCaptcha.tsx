import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw, Check, X, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface SimpleCaptchaProps {
  onVerify: (verified: boolean) => void;
  onTokenGenerated?: (token: string) => void;
}

export const SimpleCaptcha = ({ onVerify, onTokenGenerated }: SimpleCaptchaProps) => {
  const [challenge, setChallenge] = useState<{ num1: number, num2: number, operator: string } | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(false);

  const generateChallenge = useCallback(async () => {
    try {
      const { data, error: invokeError } = await supabase.functions.invoke('validate-auth-security', {
        body: { action: 'generate-captcha' }
      });

      if (!invokeError && data) {
        setChallenge(data.challenge);
        setSignature(data.signature);
      }
    } catch (err) {
      console.error('Failed to generate captcha:', err);
    }
    setUserAnswer('');
    setVerified(false);
    setError(false);
  }, []);

  useEffect(() => {
    generateChallenge();
  }, [generateChallenge]);

  const calculateAnswer = (): number => {
    const { num1, num2, operator } = challenge;
    switch (operator) {
      case '+': return num1 + num2;
      case '-': return num1 - num2;
      case '×': return num1 * num2;
      default: return num1 + num2;
    }
  };

  const handleVerify = async () => {
    const userAnswerNum = parseInt(userAnswer, 10);
    if (isNaN(userAnswerNum) || !challenge || !signature) return;

    setVerifying(true);
    setError(false);

    try {
      const { data, error: invokeError } = await supabase.functions.invoke('validate-auth-security', {
        body: {
          action: 'verify-captcha',
          captchaAnswer: userAnswerNum,
          challenge,
          signature
        }
      });

      if (!invokeError && data?.valid) {
        setVerified(true);
        setError(false);
        onVerify(true);
        onTokenGenerated?.(signature); // Use signature as token
      } else {
        throw new Error('Verification failed');
      }
    } catch (err) {
      setError(true);
      setVerified(false);
      onVerify(false);
      // Generate new challenge after wrong answer
      setTimeout(generateChallenge, 1500);
    } finally {
      setVerifying(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleVerify();
    }
  };

  return (
    <div className="p-4 border border-border rounded-lg bg-muted/30 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Security Verification</span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={generateChallenge}
          className="h-8 w-8 p-0"
          disabled={verified}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2">
          <span className="text-lg font-mono bg-background px-3 py-2 rounded border min-w-[120px] text-center">
            {challenge ? `${challenge.num1} ${challenge.operator} ${challenge.num2} = ?` : 'Loading...'}
          </span>
          <Input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-20 text-center font-mono"
            placeholder="?"
            disabled={verified}
          />
        </div>
        <Button
          type="button"
          onClick={handleVerify}
          disabled={!userAnswer || verified || verifying}
          size="sm"
          variant={verified ? 'default' : 'outline'}
          className={verified ? 'bg-green-600 hover:bg-green-600' : ''}
        >
          {verifying ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : verified ? (
            <Check className="h-4 w-4" />
          ) : (
            'Verify'
          )}
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm">
          <X className="h-4 w-4" />
          <span>Incorrect answer. Try again.</span>
        </div>
      )}

      {verified && (
        <div className="flex items-center gap-2 text-green-600 text-sm">
          <Check className="h-4 w-4" />
          <span>Verification successful!</span>
        </div>
      )}
    </div>
  );
};
