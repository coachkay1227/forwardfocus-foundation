import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw, Check, X } from 'lucide-react';

interface SimpleCaptchaProps {
  onVerify: (verified: boolean) => void;
  onTokenGenerated?: (token: string) => void;
}

export const SimpleCaptcha = ({ onVerify, onTokenGenerated }: SimpleCaptchaProps) => {
  const [challenge, setChallenge] = useState({ num1: 0, num2: 0, operator: '+' });
  const [userAnswer, setUserAnswer] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const generateChallenge = useCallback(() => {
    const operators = ['+', '-', '×'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;

    // Ensure subtraction doesn't result in negative numbers
    if (operator === '-' && num2 > num1) {
      [num1, num2] = [num2, num1];
    }

    setChallenge({ num1, num2, operator });
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

  const handleVerify = () => {
    const correctAnswer = calculateAnswer();
    const userAnswerNum = parseInt(userAnswer, 10);

    if (userAnswerNum === correctAnswer) {
      setVerified(true);
      setError(false);
      onVerify(true);

      // Generate a simple token for verification
      const token = btoa(`captcha-verified-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
      onTokenGenerated?.(token);
    } else {
      setError(true);
      setVerified(false);
      onVerify(false);
      // Generate new challenge after wrong answer
      setTimeout(generateChallenge, 1000);
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
          <span className="text-lg font-mono bg-background px-3 py-2 rounded border">
            {challenge.num1} {challenge.operator} {challenge.num2} = ?
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
          disabled={!userAnswer || verified}
          size="sm"
          variant={verified ? 'default' : 'outline'}
          className={verified ? 'bg-green-600 hover:bg-green-600' : ''}
        >
          {verified ? <Check className="h-4 w-4" /> : 'Verify'}
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
