import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Heart, ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function DonationSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add small delay for better UX
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-osu-scarlet/5 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-osu-scarlet"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Thank You for Your Donation - Forward Focus Elevation</title>
        <meta name="description" content="Thank you for your generous donation to Forward Focus Elevation. Your support helps transform lives." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-osu-scarlet/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-2 border-osu-scarlet/20 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Thank You for Your Generosity!
            </h1>
            
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="h-5 w-5 text-osu-scarlet fill-current" />
              <span className="text-osu-scarlet font-semibold">Your donation makes a difference</span>
              <Heart className="h-5 w-5 text-osu-scarlet fill-current" />
            </div>
            
            <p className="text-foreground/80 mb-6 leading-relaxed">
              Your generous contribution helps us provide essential services, education, and support to those who need it most. Together, we're building stronger communities and brighter futures.
            </p>
            
            {sessionId && (
              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <p className="text-sm text-foreground/70">
                  <strong>Transaction ID:</strong><br />
                  <code className="text-xs">{sessionId}</code>
                </p>
              </div>
            )}
            
            <div className="space-y-3">
              <Button 
                asChild 
                className="w-full bg-osu-scarlet hover:bg-osu-scarlet-dark text-osu-scarlet-foreground"
              >
                <Link to="/support">
                  <Heart className="h-4 w-4 mr-2" />
                  Make Another Donation
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full">
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Return to Home
                </Link>
              </Button>
            </div>
            
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-foreground/60">
                You will receive an email confirmation shortly.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}