import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { Mail, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface EmailPreferences {
  monday_newsletter: boolean;
  wednesday_collective: boolean;
  friday_recap: boolean;
  sunday_community_call: boolean;
}

export default function EmailPreferences() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [unsubscribing, setUnsubscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [subscriberData, setSubscriberData] = useState<{
    email: string;
    name: string | null;
    subscriberId: string;
  } | null>(null);
  
  const [preferences, setPreferences] = useState<EmailPreferences>({
    monday_newsletter: true,
    wednesday_collective: true,
    friday_recap: true,
    sunday_community_call: false,
  });

  useEffect(() => {
    if (!token) {
      setError("No token provided. Please use the link from your email.");
      setLoading(false);
      return;
    }
    
    loadPreferences();
  }, [token]);

  const loadPreferences = async () => {
    try {
      setLoading(true);
      setError(null);

      // Verify token and get subscriber data
      const { data: subscriber, error: subscriberError } = await supabase
        .from("newsletter_subscriptions")
        .select("id, email, name, status")
        .eq("unsubscribe_token", token)
        .gt("token_expires_at", new Date().toISOString())
        .single();

      if (subscriberError || !subscriber) {
        throw new Error("Invalid or expired token. Please request a new preferences link.");
      }

      if (subscriber.status !== "active") {
        setError("This subscription is no longer active.");
        setLoading(false);
        return;
      }

      setSubscriberData({
        email: subscriber.email,
        name: subscriber.name,
        subscriberId: subscriber.id,
      });

      // Load email preferences
      const { data: prefs, error: prefsError } = await supabase
        .from("email_preferences")
        .select("*")
        .eq("subscriber_id", subscriber.id)
        .single();

      if (prefsError && prefsError.code !== "PGRST116") {
        console.error("Error loading preferences:", prefsError);
      }

      if (prefs) {
        setPreferences({
          monday_newsletter: prefs.monday_newsletter ?? true,
          wednesday_collective: prefs.wednesday_collective ?? true,
          friday_recap: prefs.friday_recap ?? true,
          sunday_community_call: prefs.sunday_community_call ?? false,
        });
      }
    } catch (err: any) {
      setError(err.message || "Failed to load preferences");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePreferences = async () => {
    if (!subscriberData) return;

    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      const response = await supabase.functions.invoke("update-email-preferences", {
        body: {
          subscriberId: subscriberData.subscriberId,
          preferences: preferences,
        },
      });

      if (response.error) throw response.error;

      setSuccess(true);
      toast.success("Email preferences updated successfully!");
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      const errorMsg = err.message || "Failed to update preferences";
      setError(errorMsg);
      toast.error(errorMsg);
      console.error("Error:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleUnsubscribeAll = async () => {
    if (!subscriberData) return;

    if (!confirm("Are you sure you want to unsubscribe from all emails? You can always resubscribe later.")) {
      return;
    }

    try {
      setUnsubscribing(true);
      setError(null);

      const response = await supabase.functions.invoke("update-email-preferences", {
        body: {
          subscriberId: subscriberData.subscriberId,
          unsubscribeAll: true,
        },
      });

      if (response.error) throw response.error;

      toast.success("You have been unsubscribed from all emails");
      setSuccess(true);
      
      // Disable all checkboxes after unsubscribe
      setPreferences({
        monday_newsletter: false,
        wednesday_collective: false,
        friday_recap: false,
        sunday_community_call: false,
      });
    } catch (err: any) {
      const errorMsg = err.message || "Failed to unsubscribe";
      setError(errorMsg);
      toast.error(errorMsg);
      console.error("Error:", err);
    } finally {
      setUnsubscribing(false);
    }
  };

  if (loading) {
    return (
      <div className="container max-w-2xl mx-auto py-12">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error && !subscriberData) {
    return (
      <div className="container max-w-2xl mx-auto py-12">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <CardTitle>Invalid Link</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="h-6 w-6 text-primary" />
            <CardTitle>Email Preferences</CardTitle>
          </div>
          <CardDescription>
            Manage your email subscriptions for {subscriberData?.email}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {success && (
            <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600 dark:text-green-400">
                Your preferences have been updated successfully!
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Choose which emails you'd like to receive:
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <Checkbox
                  id="monday"
                  checked={preferences.monday_newsletter}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, monday_newsletter: checked as boolean })
                  }
                />
                <div className="flex-1 space-y-1">
                  <Label htmlFor="monday" className="font-semibold cursor-pointer">
                    Monday Newsletter
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Weekly roundup of new resources, success stories, and community updates
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <Checkbox
                  id="wednesday"
                  checked={preferences.wednesday_collective}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, wednesday_collective: checked as boolean })
                  }
                />
                <div className="flex-1 space-y-1">
                  <Label htmlFor="wednesday" className="font-semibold cursor-pointer">
                    Wednesday Collective
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Mid-week inspiration, learning opportunities, and healing resources
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <Checkbox
                  id="friday"
                  checked={preferences.friday_recap}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, friday_recap: checked as boolean })
                  }
                />
                <div className="flex-1 space-y-1">
                  <Label htmlFor="friday" className="font-semibold cursor-pointer">
                    Friday Recap
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Weekly highlights, featured resources, and upcoming events
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <Checkbox
                  id="sunday"
                  checked={preferences.sunday_community_call}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, sunday_community_call: checked as boolean })
                  }
                />
                <div className="flex-1 space-y-1">
                  <Label htmlFor="sunday" className="font-semibold cursor-pointer">
                    Sunday Community Call
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Reminder for our weekly community call and connection opportunities
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={handleSavePreferences}
              disabled={saving || unsubscribing}
              className="flex-1"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Preferences"
              )}
            </Button>

            <Button
              variant="destructive"
              onClick={handleUnsubscribeAll}
              disabled={saving || unsubscribing}
            >
              {unsubscribing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Unsubscribing...
                </>
              ) : (
                "Unsubscribe from All"
              )}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center pt-4">
            You can update your preferences at any time using the link in any email we send you.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
