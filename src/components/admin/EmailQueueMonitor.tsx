import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Clock, CheckCircle, XCircle, AlertTriangle, RefreshCw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface QueuedEmail {
  id: string;
  email_type: string;
  recipient_email: string;
  status: string;
  retry_count: number;
  max_retries: number;
  last_attempt_at: string | null;
  error_message: string | null;
  scheduled_for: string | null;
  created_at: string;
}

interface QueueStats {
  pending: number;
  sending: number;
  sent: number;
  failed: number;
  permanently_failed: number;
}

export const EmailQueueMonitor = () => {
  const [queuedEmails, setQueuedEmails] = useState<QueuedEmail[]>([]);
  const [stats, setStats] = useState<QueueStats>({
    pending: 0,
    sending: 0,
    sent: 0,
    failed: 0,
    permanently_failed: 0
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadQueueData();

    // Set up realtime subscription
    const channel = supabase
      .channel('email-queue-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'email_send_queue'
        },
        () => {
          loadQueueData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadQueueData = async () => {
    try {
      setRefreshing(true);

      // Load recent queued emails
      const { data: emails, error: emailsError } = await supabase
        .from('email_send_queue')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (emailsError) throw emailsError;

      setQueuedEmails(emails || []);

      // Calculate stats
      const stats: QueueStats = {
        pending: 0,
        sending: 0,
        sent: 0,
        failed: 0,
        permanently_failed: 0
      };

      emails?.forEach((email) => {
        if (email.status in stats) {
          stats[email.status as keyof QueueStats]++;
        }
      });

      setStats(stats);
    } catch (error: any) {
      console.error('Error loading queue data:', error);
      toast({
        title: "Error",
        description: "Failed to load email queue data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const retryFailedEmail = async (emailId: string) => {
    try {
      const { error } = await supabase
        .from('email_send_queue')
        .update({ 
          status: 'pending',
          retry_count: 0,
          error_message: null
        })
        .eq('id', emailId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Email queued for retry",
      });

      loadQueueData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to retry email",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" />Pending</Badge>;
      case 'sending':
        return <Badge variant="default" className="gap-1"><RefreshCw className="h-3 w-3 animate-spin" />Sending</Badge>;
      case 'sent':
        return <Badge variant="secondary" className="gap-1 bg-green-500/10 text-green-700 dark:text-green-400"><CheckCircle className="h-3 w-3" />Sent</Badge>;
      case 'failed':
        return <Badge variant="destructive" className="gap-1"><AlertTriangle className="h-3 w-3" />Failed</Badge>;
      case 'permanently_failed':
        return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" />Permanent Fail</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getEmailTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'site_usage': '📚 Monday Newsletter',
      'booking_coaching': '💫 Wednesday Collective',
      'weekly_engagement': '🌟 Friday Recap',
      'community_call': '🎙️ Sunday Call'
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Email Queue Monitor</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Loading queue data...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Email Queue Monitor
            </CardTitle>
            <CardDescription>
              Track email delivery status and retry failed sends
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={loadQueueData}
            disabled={refreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Pending</span>
              </div>
              <p className="text-2xl font-bold">{stats.pending}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <RefreshCw className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">Sending</span>
              </div>
              <p className="text-2xl font-bold">{stats.sending}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Sent</span>
              </div>
              <p className="text-2xl font-bold">{stats.sent}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">Failed</span>
              </div>
              <p className="text-2xl font-bold">{stats.failed}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium">Permanent</span>
              </div>
              <p className="text-2xl font-bold">{stats.permanently_failed}</p>
            </div>
          </div>

          {/* Queue Items */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Recent Queue Items</h3>
            {queuedEmails.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No emails in queue
              </p>
            ) : (
              <div className="space-y-2">
                {queuedEmails.slice(0, 20).map((email) => (
                  <div
                    key={email.id}
                    className="p-3 border rounded-lg flex items-center justify-between"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium truncate">
                          {getEmailTypeLabel(email.email_type)}
                        </span>
                        {getStatusBadge(email.status)}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        To: {email.recipient_email}
                      </p>
                      {email.retry_count > 0 && (
                        <p className="text-xs text-yellow-600 dark:text-yellow-500">
                          Retry {email.retry_count}/{email.max_retries}
                        </p>
                      )}
                      {email.error_message && (
                        <p className="text-xs text-destructive truncate mt-1">
                          Error: {email.error_message}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {email.last_attempt_at 
                          ? `Last attempt ${formatDistanceToNow(new Date(email.last_attempt_at))} ago`
                          : `Queued ${formatDistanceToNow(new Date(email.created_at))} ago`
                        }
                      </p>
                    </div>
                    {(email.status === 'failed' || email.status === 'permanently_failed') && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => retryFailedEmail(email.id)}
                      >
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Retry
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Alert for stuck emails */}
          {stats.failed > 0 && (
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Failed Emails Detected</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stats.failed} email(s) failed to send. They will be automatically retried by the queue processor.
                  </p>
                </div>
              </div>
            </div>
          )}

          {stats.permanently_failed > 0 && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Permanently Failed Emails</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stats.permanently_failed} email(s) failed after maximum retries. Check the error messages above.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
