import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Send } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const TestEmailSender = () => {
  const [testEmail, setTestEmail] = useState("");
  const [emailType, setEmailType] = useState<string>("");
  const [sending, setSending] = useState(false);

  const sendTestEmail = async () => {
    if (!testEmail || !emailType) {
      toast({
        title: "Missing Information",
        description: "Please enter an email address and select an email type",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(testEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const subjects: Record<string, string> = {
        'site_usage': '📚 This Week\'s Resources & Tools - Forward Focus Elevation',
        'booking_coaching': '💫 The Collective: Your Community Awaits',
        'weekly_engagement': '🌟 Week in Review + What\'s Coming',
        'community_call': '🎙️ Tonight at 6 PM: Weekly Community Call'
      };

      const { data, error } = await supabase.functions.invoke('send-reminder-emails', {
        body: {
          reminderType: {
            type: emailType,
            subject: subjects[emailType]
          },
          testMode: true,
          testEmail: testEmail
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) throw error;

      toast({
        title: "Test Email Sent!",
        description: `Test email sent to ${testEmail}`,
      });

      setTestEmail("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send test email",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const getEmailTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'site_usage': '📚 Monday Update',
      'booking_coaching': '💫 Wednesday Collective',
      'weekly_engagement': '🌟 Friday Recap',
      'community_call': '🎙️ Sunday Community Call'
    };
    return labels[type] || type;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Test Email Sender
        </CardTitle>
        <CardDescription>
          Send a test email to verify template and delivery
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-type">Email Type</Label>
            <Select value={emailType} onValueChange={setEmailType}>
              <SelectTrigger id="email-type">
                <SelectValue placeholder="Select email type to test" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="site_usage">
                  {getEmailTypeLabel('site_usage')}
                </SelectItem>
                <SelectItem value="booking_coaching">
                  {getEmailTypeLabel('booking_coaching')}
                </SelectItem>
                <SelectItem value="weekly_engagement">
                  {getEmailTypeLabel('weekly_engagement')}
                </SelectItem>
                <SelectItem value="community_call">
                  {getEmailTypeLabel('community_call')}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="test-email">Test Email Address</Label>
            <Input
              id="test-email"
              type="email"
              placeholder="your@email.com"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              The email will be sent to this address with sample data
            </p>
          </div>

          <Button
            onClick={sendTestEmail}
            disabled={sending || !testEmail || !emailType}
            className="w-full"
          >
            {sending ? (
              "Sending..."
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Test Email
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
