import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [unsubscribeEmail, setUnsubscribeEmail] = useState("");
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);
  const [showUnsubscribeDialog, setShowUnsubscribeDialog] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('newsletter-signup', {
        body: {
          email: email.trim(),
          name: name.trim() || undefined,
          source: 'homepage'
        }
      });

      if (error) throw error;

      setIsSubscribed(true);
      setEmail("");
      setName("");
      
      toast({
        title: "Welcome to our newsletter!",
        description: data.message || "Successfully subscribed! Check your email for a welcome message.",
      });

    } catch (error: any) {
      console.error('Newsletter signup error:', error);
      toast({
        title: "Subscription Failed",
        description: error.message || "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!unsubscribeEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsUnsubscribing(true);

    try {
      const { data, error } = await supabase.functions.invoke('request-newsletter-unsubscribe', {
        body: {
          email: unsubscribeEmail.trim(),
        }
      });

      if (error) throw error;

      toast({
        title: "Verification Email Sent",
        description: data.message || "Please check your email to confirm unsubscription.",
      });

      setUnsubscribeEmail("");
      setShowUnsubscribeDialog(false);

    } catch (error: any) {
      console.error('Unsubscribe request error:', error);
      toast({
        title: "Request Failed",
        description: error.message || "Failed to process unsubscribe request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUnsubscribing(false);
    }
  };

  if (isSubscribed) {
    return (
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardContent className="p-6 text-center">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Thank You for Subscribing!
          </h3>
          <p className="text-muted-foreground">
            Check your email for a welcome message with next steps.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/10 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">
            Stay Connected
          </h3>
        </div>
        
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Get the latest updates on resources, success stories, and community events delivered to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background border-input"
            />
          </div>
          
          <div>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background border-input"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold h-11"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Subscribing...
              </div>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Subscribe to Newsletter
              </>
            )}
          </Button>
        </form>
        
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
          <p className="text-xs text-muted-foreground/80">
            We respect your privacy.
          </p>
          
          <Dialog open={showUnsubscribeDialog} onOpenChange={setShowUnsubscribeDialog}>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs h-auto py-1 px-2 text-muted-foreground hover:text-foreground"
              >
                Unsubscribe
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Unsubscribe from Newsletter</DialogTitle>
                <DialogDescription>
                  Enter your email address to receive a verification link for unsubscribing.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleUnsubscribe} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={unsubscribeEmail}
                    onChange={(e) => setUnsubscribeEmail(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowUnsubscribeDialog(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isUnsubscribing}
                    variant="destructive"
                    className="flex-1"
                  >
                    {isUnsubscribing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      "Send Verification Email"
                    )}
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground text-center">
                  You'll receive an email with a link to confirm your unsubscription.
                </p>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};