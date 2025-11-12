import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";

const UnsubscribeConfirm = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const verifyUnsubscribe = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid unsubscribe link. No token provided.");
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke(
          "verify-newsletter-unsubscribe",
          {
            body: { token },
          }
        );

        if (error) {
          console.error("Error verifying unsubscribe:", error);
          setStatus("error");
          setMessage(error.message || "Failed to process unsubscribe request.");
          return;
        }

        if (data?.error) {
          setStatus("error");
          setMessage(data.message || data.error);
          return;
        }

        setStatus("success");
        setEmail(data.email);
        setMessage(data.message || "You have been successfully unsubscribed.");
      } catch (err: any) {
        console.error("Unexpected error:", err);
        setStatus("error");
        setMessage("An unexpected error occurred. Please try again later.");
      }
    };

    verifyUnsubscribe();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {status === "loading" && (
            <>
              <div className="flex justify-center mb-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
              <CardTitle>Processing Unsubscribe</CardTitle>
              <CardDescription>
                Please wait while we verify your request...
              </CardDescription>
            </>
          )}

          {status === "success" && (
            <>
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <CardTitle>Successfully Unsubscribed</CardTitle>
              <CardDescription>
                {email && `We've removed ${email} from our mailing list.`}
              </CardDescription>
            </>
          )}

          {status === "error" && (
            <>
              <div className="flex justify-center mb-4">
                <XCircle className="h-12 w-12 text-destructive" />
              </div>
              <CardTitle>Unsubscribe Failed</CardTitle>
              <CardDescription>
                There was a problem processing your request.
              </CardDescription>
            </>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            {message}
          </p>

          {status === "success" && (
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <p className="text-sm">
                <strong>What happens next?</strong>
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>You won't receive any more newsletters from us</li>
                <li>You can resubscribe anytime on our website</li>
                <li>It may take up to 24 hours to process</li>
              </ul>
            </div>
          )}

          {status === "error" && (
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <p className="text-sm">
                <strong>What can you do?</strong>
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Request a new unsubscribe link</li>
                <li>Check if the link has expired (24 hour limit)</li>
                <li>Contact our support team for help</li>
              </ul>
            </div>
          )}

          <div className="flex flex-col gap-2 pt-4">
            <Button asChild variant="default" className="w-full">
              <Link to="/">
                Return to Homepage
              </Link>
            </Button>
            
            {status === "error" && (
              <Button asChild variant="outline" className="w-full">
                <Link to="/#newsletter">
                  <Mail className="mr-2 h-4 w-4" />
                  Request New Link
                </Link>
              </Button>
            )}
          </div>

          <p className="text-xs text-center text-muted-foreground mt-4">
            We're sorry to see you go. If you change your mind, you can always resubscribe.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnsubscribeConfirm;
