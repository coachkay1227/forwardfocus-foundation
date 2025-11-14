import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Calendar, Send } from "lucide-react";

export const ReminderEmailManager = () => {
  const [sending, setSending] = useState<string | null>(null);

  const sendReminder = async (type: 'site_usage' | 'booking_coaching' | 'weekly_engagement') => {
    setSending(type);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const { data, error } = await supabase.functions.invoke('send-reminder-emails', {
        body: {
          reminderType: {
            type,
            subject: type === 'site_usage' 
              ? "Don't Miss Out! Continue Your Growth Journey" 
              : type === 'booking_coaching'
              ? "Ready for Your Next Breakthrough? Book a Session"
              : "This Week's Resources & Support"
          }
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) throw error;

      toast({
        title: "Reminders Sent!",
        description: data.message,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send reminder emails",
        variant: "destructive",
      });
    } finally {
      setSending(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Automated Reminder Emails
        </CardTitle>
        <CardDescription>
          Send engagement reminders to active newsletter subscribers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Site Usage Reminder
              </CardTitle>
              <CardDescription className="text-xs">
                Encourage inactive users to return
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => sendReminder('site_usage')}
                disabled={sending === 'site_usage'}
                className="w-full"
                variant="outline"
              >
                {sending === 'site_usage' ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Now
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="w-4 h-4 text-secondary" />
                Coaching Reminder
              </CardTitle>
              <CardDescription className="text-xs">
                Prompt users to book sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => sendReminder('booking_coaching')}
                disabled={sending === 'booking_coaching'}
                className="w-full"
                variant="outline"
              >
                {sending === 'booking_coaching' ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Now
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                Weekly Engagement
              </CardTitle>
              <CardDescription className="text-xs">
                This week's resources & updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => sendReminder('weekly_engagement')}
                disabled={sending === 'weekly_engagement'}
                className="w-full"
                variant="outline"
              >
                {sending === 'weekly_engagement' ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Now
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg border">
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Automation Schedule Recommendation
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• <strong>Site Usage:</strong> Every 5-7 days for inactive users</li>
            <li>• <strong>Coaching Reminder:</strong> Twice weekly (Tuesday & Friday)</li>
            <li>• <strong>Weekly Engagement:</strong> Every Monday morning</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-3 italic">
            💡 Tip: Set up automated scheduling using cron jobs or external services like Zapier to trigger these functions
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
