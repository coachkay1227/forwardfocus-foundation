import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, Zap, Clock, RefreshCw } from "lucide-react";

interface AutomationRule {
  id: string;
  rule_name: string;
  trigger_type: string;
  enabled: boolean;
  delay_minutes: number;
  email_subject: string;
  email_type: string;
}

interface QueueStats {
  pending: number;
  sent: number;
  failed: number;
}

export default function EmailAutomationManager() {
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [queueStats, setQueueStats] = useState<QueueStats>({ pending: 0, sent: 0, failed: 0 });
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadAutomationData();
  }, []);

  const loadAutomationData = async () => {
    try {
      setLoading(true);

      // Load automation rules
      const { data: rulesData, error: rulesError } = await supabase
        .from('email_automation_rules')
        .select('*')
        .order('trigger_type');

      if (rulesError) throw rulesError;
      setRules(rulesData || []);

      // Load queue stats
      const { data: queueData, error: queueError } = await supabase
        .from('email_automation_queue')
        .select('status');

      if (!queueError && queueData) {
        const stats = queueData.reduce((acc, item) => {
          acc[item.status as keyof QueueStats] = (acc[item.status as keyof QueueStats] || 0) + 1;
          return acc;
        }, { pending: 0, sent: 0, failed: 0 } as QueueStats);
        
        setQueueStats(stats);
      }
    } catch (error: any) {
      console.error('Error loading automation data:', error);
      toast.error('Failed to load automation settings');
    } finally {
      setLoading(false);
    }
  };

  const toggleRule = async (ruleId: string, currentlyEnabled: boolean) => {
    try {
      const { error } = await supabase
        .from('email_automation_rules')
        .update({ enabled: !currentlyEnabled })
        .eq('id', ruleId);

      if (error) throw error;

      setRules(rules.map(rule => 
        rule.id === ruleId ? { ...rule, enabled: !currentlyEnabled } : rule
      ));

      toast.success(`Automation ${!currentlyEnabled ? 'enabled' : 'disabled'}`);
    } catch (error: any) {
      console.error('Error toggling rule:', error);
      toast.error('Failed to update automation rule');
    }
  };

  const processQueue = async () => {
    try {
      setProcessing(true);
      
      const { error } = await supabase.functions.invoke('process-automation-queue');
      
      if (error) throw error;

      toast.success('Email queue processing started');
      
      // Reload stats after a delay
      setTimeout(() => {
        loadAutomationData();
      }, 2000);
    } catch (error: any) {
      console.error('Error processing queue:', error);
      toast.error('Failed to process email queue');
    } finally {
      setProcessing(false);
    }
  };

  const getRuleBadgeColor = (triggerType: string) => {
    switch (triggerType) {
      case 'signup':
        return 'bg-green-100 text-green-700';
      case 'milestone':
        return 'bg-purple-100 text-purple-700';
      case 'inactivity':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Automation Settings...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Emails</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{queueStats.pending}</div>
            <p className="text-xs text-muted-foreground">Scheduled to send</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sent Today</CardTitle>
            <Mail className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{queueStats.sent}</div>
            <p className="text-xs text-muted-foreground">Successfully delivered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <Zap className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{queueStats.failed}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Automation Rules */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Email Automation Rules</CardTitle>
              <CardDescription>Configure triggered emails based on user actions</CardDescription>
            </div>
            <Button
              onClick={processQueue}
              disabled={processing}
              variant="outline"
              size="sm"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${processing ? 'animate-spin' : ''}`} />
              Process Queue Now
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{rule.email_subject}</h4>
                    <Badge className={getRuleBadgeColor(rule.trigger_type)}>
                      {rule.trigger_type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Trigger: {rule.rule_name.replace(/_/g, ' ')} 
                    {rule.delay_minutes > 0 && ` • Delay: ${rule.delay_minutes} minutes`}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`rule-${rule.id}`}
                    checked={rule.enabled}
                    onCheckedChange={() => toggleRule(rule.id, rule.enabled)}
                  />
                  <Label htmlFor={`rule-${rule.id}`} className="sr-only">
                    Toggle {rule.rule_name}
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="text-sm">ℹ️ How It Works</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            <strong>Signup:</strong> Welcome email sent 5 minutes after new user registration
          </p>
          <p>
            <strong>Milestone:</strong> Congratulations email sent immediately when user completes a learning module
          </p>
          <p>
            <strong>Inactivity:</strong> Re-engagement email sent after 7 days of no activity
          </p>
          <p className="pt-2 border-t">
            Queue is processed automatically every 15 minutes via cron job. You can also trigger manual processing above.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
