import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clock, Heart, ArrowRight, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

interface TrialExpiredPromptProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrialExpiredPrompt = ({ isOpen, onClose }: TrialExpiredPromptProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Daily Trial Limit Reached
          </DialogTitle>
          <DialogDescription>
            You've reached your daily limit for guest access. Ready to continue your healing journey with full community access?
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Join Our Community</CardTitle>
              <CardDescription>
                Continue your path to healing and growth with full access to our platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  <span className="font-medium">Unlimited AI Support</span> - Coach Kay, Crisis Support, and all assistants
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  <span className="font-medium">Your Progress Saved</span> - Pick up right where you left off
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  <span className="font-medium">Learning Pathways</span> - Structured growth programs
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  <span className="font-medium">Community Resources</span> - Connect with verified partners
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-muted-foreground">
            <p>100% Free • No Credit Card Required • Secure & Private</p>
          </div>

          <div className="flex flex-col gap-2">
            <Button asChild className="w-full" size="lg">
              <Link to="/auth">
                <UserPlus className="mr-2 h-4 w-4" />
                Create Free Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" onClick={onClose} className="w-full text-sm">
              Maybe later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};