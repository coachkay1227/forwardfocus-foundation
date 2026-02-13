import { useState, useEffect } from "react";
import { Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrialPrompt } from "./TrialPrompt";
import { Link } from "react-router-dom";

interface TrialTimerProps {
  timeRemaining: number;
  onTimeUp: () => void;
  className?: string;
}

export const TrialTimer = ({ timeRemaining, onTimeUp, className = "" }: TrialTimerProps) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [lastTimeRemaining, setLastTimeRemaining] = useState(timeRemaining);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    if (seconds <= 0) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Show prompt when time is low
  useEffect(() => {
    // Show prompt at 60 seconds, then every 30 seconds, then every 10 seconds
    if (timeRemaining <= 60 && timeRemaining > 0) {
      if (timeRemaining === 60 ||
          (timeRemaining <= 30 && timeRemaining % 30 === 0) ||
          (timeRemaining <= 10 && timeRemaining % 10 === 0)) {
        setShowPrompt(true);
      }
    }

    // Call onTimeUp when time expires
    if (timeRemaining <= 0 && lastTimeRemaining > 0) {
      onTimeUp();
    }

    setLastTimeRemaining(timeRemaining);
  }, [timeRemaining, lastTimeRemaining, onTimeUp]);

  // Don't render if trial has ended
  if (timeRemaining <= 0) {
    return null;
  }

  const isLowTime = timeRemaining <= 60;
  const isCriticalTime = timeRemaining <= 30;

  return (
    <>
      <Card className={`border-0 shadow-lg ${isCriticalTime ? 'bg-red-50 border-red-200' : isLowTime ? 'bg-orange-50 border-orange-200' : 'bg-blue-50 border-blue-200'} ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-full ${isCriticalTime ? 'bg-red-100' : isLowTime ? 'bg-orange-100' : 'bg-blue-100'}`}>
                <Clock className={`h-4 w-4 ${isCriticalTime ? 'text-red-600' : isLowTime ? 'text-orange-600' : 'text-blue-600'}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Free Trial Active
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatTime(timeRemaining)} remaining
                </p>
              </div>
            </div>
            
            <Button size="sm" asChild className="text-xs">
              <Link to="/auth">
                <Sparkles className="mr-1 h-3 w-3" />
                Sign Up Free
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <TrialPrompt
        isOpen={showPrompt}
        onClose={() => setShowPrompt(false)}
        timeRemaining={formatTime(timeRemaining)}
        onSignUp={() => setShowPrompt(false)}
      />
    </>
  );
};