import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Clock, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

interface EmailCampaignLog {
  id: string;
  created_at: string;
  action: string;
  details: {
    auth_source: string;
    email_type: string;
    subject: string;
    recipients_total: number;
    sent_count: number;
    failed_count: number;
  };
  severity: string;
}

export const AutomatedEmailMonitor = () => {
  const [logs, setLogs] = useState<EmailCampaignLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmailLogs();
    
    // Set up realtime subscription for new logs
    const channel = supabase
      .channel('email-campaign-logs')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'audit_logs',
          filter: 'action=ilike.EMAIL_CAMPAIGN_%'
        },
        () => {
          fetchEmailLogs();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchEmailLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .ilike('action', 'EMAIL_CAMPAIGN_%')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setLogs((data as any[])?.map(log => ({
        ...log,
        details: log.details as EmailCampaignLog['details']
      })) || []);
    } catch (error) {
      console.error('Error fetching email logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEmailTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'site_usage': 'Healing Hub & AI',
      'booking_coaching': 'Coaching Reminder',
      'weekly_engagement': 'Weekly Engagement'
    };
    return labels[type] || type;
  };

  const getAuthSourceBadge = (source: string) => {
    if (source === 'cron_automated') {
      return <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" />Auto</Badge>;
    }
    return <Badge variant="outline" className="gap-1"><Mail className="h-3 w-3" />Manual</Badge>;
  };

  const calculateSuccessRate = (sent: number, failed: number) => {
    const total = sent + failed;
    if (total === 0) return 0;
    return Math.round((sent / total) * 100);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Automated Email Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Loading email logs...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Automated Email Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <p className="text-sm text-muted-foreground">No email campaigns sent yet.</p>
        ) : (
          <div className="space-y-4">
            {logs.map((log) => {
              const successRate = calculateSuccessRate(
                log.details.sent_count,
                log.details.failed_count
              );
              const isSuccess = successRate >= 95;

              return (
                <div
                  key={log.id}
                  className="flex items-start justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">
                      {isSuccess ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm">
                          {getEmailTypeLabel(log.details.email_type)}
                        </span>
                        {getAuthSourceBadge(log.details.auth_source)}
                        <Badge 
                          variant={isSuccess ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {successRate}% success
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {log.details.subject}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>
                          {log.details.sent_count} sent
                        </span>
                        {log.details.failed_count > 0 && (
                          <span className="text-destructive">
                            {log.details.failed_count} failed
                          </span>
                        )}
                        <span>
                          {formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
