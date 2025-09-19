import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useAnonymousSession } from "@/hooks/useAnonymousSession";
import { TrialTimer } from "@/components/auth/TrialTimer";
import { TrialExpiredPrompt } from "@/components/auth/TrialExpiredPrompt";
import { toast } from "@/hooks/use-toast";

interface AIWithTrialProps {
  children: (props: {
    canUseAI: boolean;
    checkAccess: () => Promise<boolean>;
    trialActive: boolean;
    timeRemaining: number;
  }) => React.ReactNode;
  aiEndpoint: string;
  className?: string;
}

export const AIWithTrial = ({ children, aiEndpoint, className = "" }: AIWithTrialProps) => {
  const { user } = useAuth();
  const { sessionState, checkTrialAccess, transferToUser, timeRemainingFormatted } = useAnonymousSession();
  const [showTrialExpired, setShowTrialExpired] = useState(false);
  const [canUseAI, setCanUseAI] = useState(false);

  // Check access function
  const checkAccess = useCallback(async (): Promise<boolean> => {
    // Authenticated users have unlimited access
    if (user) {
      setCanUseAI(true);
      return true;
    }

    // Check trial access for anonymous users
    const hasAccess = await checkTrialAccess(aiEndpoint);
    setCanUseAI(hasAccess);
    
    if (!hasAccess && sessionState?.trialExpired) {
      setShowTrialExpired(true);
    }
    
    return hasAccess;
  }, [user, checkTrialAccess, aiEndpoint, sessionState?.trialExpired]);

  // Initial access check
  useEffect(() => {
    checkAccess();
  }, [checkAccess]);

  // Handle trial expiration
  const handleTrialExpired = useCallback(() => {
    setCanUseAI(false);
    setShowTrialExpired(true);
    toast({
      title: "Trial Ended",
      description: "Your 3-minute trial has ended. Sign up to continue!",
      variant: "default",
    });
  }, []);

  // Transfer session when user logs in
  useEffect(() => {
    if (user && sessionState?.sessionToken) {
      transferToUser(user.id).then((result) => {
        if (result.success) {
          toast({
            title: "Welcome!",
            description: "Your trial progress has been saved to your account.",
          });
        }
      });
    }
  }, [user, sessionState?.sessionToken, transferToUser]);

  const trialActive = !user && sessionState && !sessionState.trialExpired;
  const timeRemaining = sessionState?.timeRemaining || 0;

  return (
    <div className={className}>
      {/* Trial Timer for anonymous users */}
      {trialActive && (
        <TrialTimer
          timeRemaining={timeRemaining}
          onTimeUp={handleTrialExpired}
          className="mb-4"
        />
      )}

      {/* AI Component */}
      {children({
        canUseAI,
        checkAccess,
        trialActive: trialActive || false,
        timeRemaining
      })}

      {/* Trial Expired Prompt */}
      <TrialExpiredPrompt
        isOpen={showTrialExpired}
        onClose={() => setShowTrialExpired(false)}
      />
    </div>
  );
};