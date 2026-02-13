import { useState, useEffect } from "react";
import { Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrialPrompt } from "./TrialPrompt";
import { Link } from "react-router-dom";

interface TrialTimerProps {
  turnsRemaining: number;
  onTurnsDepleted: () => void;
  className?: string;
}

export const TrialTimer = ({ turnsRemaining, onTurnsDepleted, className = "" }: TrialTimerProps) => {
  const [showPrompt, setShowPrompt] = useState(false);

  // Show prompt when turns are low
  useEffect(() => {
    if (turnsRemaining === 1) {
      setShowPrompt(true);
    }

    if (turnsRemaining <= 0) {
      onTurnsDepleted();
    }
  }, [turnsRemaining, onTurnsDepleted]);

  // Don't render if trial has ended
  if (turnsRemaining <= 0) {
    return null;
  }

  const isLowTurns = turnsRemaining <= 2;
  const isCriticalTurns = turnsRemaining <= 1;

  return (
    <>
      <Card className={`border-0 shadow-lg ${isCriticalTurns ? 'bg-red-50 border-red-200' : isLowTurns ? 'bg-orange-50 border-orange-200' : 'bg-blue-50 border-blue-200'} ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-full ${isCriticalTurns ? 'bg-red-100' : isLowTurns ? 'bg-orange-100' : 'bg-blue-100'}`}>
                <Clock className={`h-4 w-4 ${isCriticalTurns ? 'text-red-600' : isLowTurns ? 'text-orange-600' : 'text-blue-600'}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Trial Active
                </p>
                <p className="text-xs text-muted-foreground">
                  {turnsRemaining} {turnsRemaining === 1 ? 'turn' : 'turns'} remaining
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
        timeRemaining={`${turnsRemaining} turns`}
        onSignUp={() => setShowPrompt(false)}
      />
    </>
  );
};