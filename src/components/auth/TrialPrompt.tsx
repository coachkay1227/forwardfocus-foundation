import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clock, Sparkles, ArrowRight, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

interface TrialPromptProps {
  isOpen: boolean;
  onClose: () => void;
  timeRemaining: string;
  onSignUp: () => void;
}

export const TrialPrompt = ({ isOpen, onClose, timeRemaining, onSignUp }: TrialPromptProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Trial Time Remaining
          </DialogTitle>
          <DialogDescription>
            You have <span className="font-bold text-primary">{timeRemaining}</span> left in your free trial
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card className="border-primary/20">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Continue Your Journey</CardTitle>
              <CardDescription>
                Sign up now to keep using our AI assistants and save your progress
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Unlimited AI conversations
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Save your conversation history
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Access to all healing tools
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Community support features
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link to="/auth" onClick={onSignUp}>
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up - It's Free
              </Link>
            </Button>
            <Button variant="outline" onClick={onClose} className="w-full">
              Continue Trial ({timeRemaining})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};