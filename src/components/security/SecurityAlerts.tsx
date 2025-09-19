import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, AlertTriangle, Info, Clock } from "lucide-react";

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

interface SecurityAlertsProps {
  alerts: SecurityAlert[];
  onRefresh: () => void;
}

export const SecurityAlerts = ({ alerts, onRefresh }: SecurityAlertsProps) => {
  const [resolving, setResolving] = useState<Set<string>>(new Set());

  const resolveAlert = async (alertId: string) => {
    setResolving(prev => new Set(prev).add(alertId));
    
    try {
      const { error } = await supabase.rpc('resolve_security_alert', {
        p_alert_id: alertId
      });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to resolve alert",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Alert resolved successfully",
        });
        onRefresh();
      }
    } catch (error) {
      console.error('Error resolving alert:', error);
      toast({
        title: "Error",
        description: "Failed to resolve alert",
        variant: "destructive",
      });
    } finally {
      setResolving(prev => {
        const newSet = new Set(prev);
        newSet.delete(alertId);
        return newSet;
      });
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'medium':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <Info className="h-4 w-4" />;
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

  const getAlertTypeDescription = (alertType: string) => {
    switch (alertType) {
      case 'EXCESSIVE_CONTACT_ACCESS':
        return 'User accessed contact data excessively in a short time period';
      case 'AI_ENDPOINT_ABUSE':
        return 'Potential abuse or unusual usage patterns detected on AI endpoints';
      case 'GEOGRAPHIC_ANOMALY':
        return 'Unusual geographic access patterns detected';
      case 'SUSPICIOUS_ACTIVITY':
        return 'General suspicious activity pattern detected';
      default:
        return 'Security alert requiring attention';
    }
  };

  if (alerts.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center text-muted-foreground">
            <CheckCircle className="mx-auto h-12 w-12 mb-4 text-green-500" />
            <p>No security alerts at this time</p>
            <p className="text-sm mt-2">All systems are operating normally</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <Card key={alert.id} className={alert.resolved ? "opacity-60" : ""}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {getSeverityIcon(alert.severity)}
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    {alert.title}
                    <Badge variant={getSeverityColor(alert.severity) as any}>
                      {alert.severity}
                    </Badge>
                    {alert.resolved && (
                      <Badge variant="outline" className="text-green-600">
                        Resolved
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {getAlertTypeDescription(alert.alert_type)}
                  </CardDescription>
                </div>
              </div>
              
              {!alert.resolved && (
                <Button
                  size="sm"
                  onClick={() => resolveAlert(alert.id)}
                  disabled={resolving.has(alert.id)}
                >
                  {resolving.has(alert.id) ? "Resolving..." : "Mark Resolved"}
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-3">
              {alert.description && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Description</h4>
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                </div>
              )}
              
              {alert.metadata && Object.keys(alert.metadata).length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Details</h4>
                  <div className="bg-muted p-3 rounded-md text-sm">
                    <pre className="whitespace-pre-wrap">
                      {JSON.stringify(alert.metadata, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Alert Type: {alert.alert_type}</span>
                <span>
                  Created: {new Date(alert.created_at).toLocaleString()}
                </span>
                {alert.resolved_at && (
                  <span>
                    Resolved: {new Date(alert.resolved_at).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};