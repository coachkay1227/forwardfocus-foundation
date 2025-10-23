import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { AlertTriangle, Activity, Shield, Users, Zap } from "lucide-react";
import { UsageAnalytics } from "./UsageAnalytics";
import { AuditLogViewer } from "./AuditLogViewer";
import { SecurityAlerts } from "./SecurityAlerts";

interface SecurityMetrics {
  total_alerts: number;
  critical_alerts: number;
  high_alerts: number;
  unresolved_alerts: number;
  ai_requests_24h: number;
  unique_users_24h: number;
  avg_response_time_ms: number;
}

interface SecurityAlert {
  id: string;
  alert_type: string;
  severity: string;
  title: string;
  description: string;
  metadata: any;
  resolved: boolean;
  resolved_at: string | null;
  created_at: string;
}

export const SecurityMonitoringDashboard = () => {
  const [metrics, setMetrics] = useState<SecurityMetrics | null>(null);
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSecurityData();
    
    // Set up real-time monitoring
    const interval = setInterval(fetchSecurityData, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const fetchSecurityData = async () => {
    try {
      // Fetch security metrics summary
      const { data: metricsData, error: metricsError } = await supabase
        .rpc('get_security_metrics_summary')
        .single();

      if (metricsError) {
        console.error('Error fetching security metrics:', metricsError);
        toast({
          title: "Error",
          description: "Failed to fetch security metrics",
          variant: "destructive",
        });
        return;
      }

      setMetrics(metricsData);

      // Fetch recent security alerts
      const { data: alertsData, error: alertsError } = await supabase
        .from('security_alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (alertsError) {
        console.error('Error fetching security alerts:', alertsError);
      } else {
        setAlerts((alertsData || []).map(alert => ({
          ...alert,
          title: alert.alert_type,
          metadata: alert.alert_data
        })));
      }

    } catch (error) {
      console.error('Error in fetchSecurityData:', error);
      toast({
        title: "Error",
        description: "Failed to load security dashboard",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const runSuspiciousActivityDetection = async () => {
    try {
      console.log('Running suspicious activity detection...');
      
      const { data, error } = await supabase.rpc('detect_advanced_suspicious_activity');
      
      if (error) {
        console.error('Error detecting suspicious activity:', error);
        toast({
          title: "Error",
          description: "Failed to run security scan",
          variant: "destructive",
        });
        return;
      }

      if (data && data.length > 0) {
        // Create security alerts from detected issues
        for (const issue of data) {
          await supabase.from('security_alerts').insert({
            alert_type: issue.alert_type,
            severity: issue.severity,
            description: issue.description,
            user_id: issue.user_id,
            alert_data: issue.alert_data,
          });
        }
        toast({
          title: "Security Scan Complete",
          description: `${data.length} issue(s) detected and logged`,
        });
      } else {
        toast({
          title: "Security Scan Complete",
          description: "No security issues detected",
        });
      }
      
      // Refresh metrics after detection
      fetchSecurityData();
    } catch (error) {
      console.error('Error running suspicious activity detection:', error);
      toast({
        title: "Error",
        description: "Failed to run suspicious activity detection",
        variant: "destructive",
      });
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Security Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.total_alerts || 0}</div>
            <p className="text-xs text-muted-foreground">
              {metrics?.unresolved_alerts || 0} unresolved
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical/High Alerts</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(metrics?.critical_alerts || 0) + (metrics?.high_alerts || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              {metrics?.critical_alerts || 0} critical, {metrics?.high_alerts || 0} high
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Requests (24h)</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.ai_requests_24h || 0}</div>
            <p className="text-xs text-muted-foreground">
              {metrics?.unique_users_24h || 0} unique users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(metrics?.avg_response_time_ms || 0)}ms
            </div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Security Actions</CardTitle>
          <CardDescription>
            Manual security operations and monitoring tools
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button onClick={runSuspiciousActivityDetection} variant="outline">
            <Shield className="mr-2 h-4 w-4" />
            Run Suspicious Activity Detection
          </Button>
          <Button onClick={fetchSecurityData} variant="outline">
            <Activity className="mr-2 h-4 w-4" />
            Refresh Dashboard
          </Button>
        </CardContent>
      </Card>

      {/* Recent Alerts Preview */}
      {alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Security Alerts</CardTitle>
            <CardDescription>Latest security events requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {alerts.slice(0, 5).map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-2 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Badge variant={getSeverityColor(alert.severity) as any}>
                      {alert.severity}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium">{alert.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(alert.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {alert.resolved && (
                    <Badge variant="outline">Resolved</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Monitoring Tabs */}
      <Tabs defaultValue="alerts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="alerts">Security Alerts</TabsTrigger>
          <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts">
          <SecurityAlerts />
        </TabsContent>

        <TabsContent value="usage">
          <UsageAnalytics />
        </TabsContent>

        <TabsContent value="audit">
          <AuditLogViewer />
        </TabsContent>
      </Tabs>
    </div>
  );
};