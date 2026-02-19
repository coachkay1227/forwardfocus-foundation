import { AlertTriangle, Clock, Lock } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { formatDistanceToNow } from 'date-fns';

interface RateLimitWarningProps {
  isRateLimited: boolean;
  attemptsRemaining: number;
  resetAt: string | null;
  isLockedOut: boolean;
  lockoutUntil: string | null;
}

export const RateLimitWarning = ({
  isRateLimited,
  attemptsRemaining,
  resetAt,
  isLockedOut,
  lockoutUntil,
}: RateLimitWarningProps) => {
  if (isLockedOut && lockoutUntil) {
    const lockoutTime = formatDistanceToNow(new Date(lockoutUntil), { addSuffix: true });
    
    return (
      <Alert variant="destructive" className="mb-4">
        <Lock className="h-4 w-4" />
        <AlertTitle>Account Temporarily Locked</AlertTitle>
        <AlertDescription>
          Your account has been temporarily locked due to multiple failed login attempts.
          You can try again {lockoutTime}.
        </AlertDescription>
      </Alert>
    );
  }

  if (isRateLimited && resetAt) {
    const resetTime = formatDistanceToNow(new Date(resetAt), { addSuffix: true });
    
    return (
      <Alert variant="destructive" className="mb-4">
        <Clock className="h-4 w-4" />
        <AlertTitle>Too Many Attempts</AlertTitle>
        <AlertDescription>
          You've exceeded the maximum number of login attempts.
          Please try again {resetTime}.
        </AlertDescription>
      </Alert>
    );
  }

  if (attemptsRemaining <= 2 && attemptsRemaining > 0) {
    return (
      <Alert className="mb-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertTitle className="text-yellow-800 dark:text-yellow-200">Warning</AlertTitle>
        <AlertDescription className="text-yellow-700 dark:text-yellow-300">
          You have {attemptsRemaining} login attempt{attemptsRemaining !== 1 ? 's' : ''} remaining
          before your account is temporarily locked.
        </AlertDescription>
      </Alert>
    );
  }

  return null;
};
