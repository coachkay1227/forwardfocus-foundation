import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle, Clock, Shield } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SecurityAlert {
  id: string;
  alert_type: string;
  severity: string;
  title: string;
  description: string;
  resolved: boolean;
  created_at: string;
  resolved_at?: string;
  metadata?: any;
}

export const SecurityAlerts = () => {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAlerts = async () => {
    try {
      const { data, error } = await supabase
        .from('security_alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      setAlerts(data || []);
    } catch (error) {
      console.error('Error loading security alerts:', error);
      toast.error('Failed to load security alerts');
    } finally {
      setLoading(false);
    }
  };

  const resolveAlert = async (alertId: string) => {
    try {
      const { error } = await supabase.rpc('resolve_security_alert', {
        p_alert_id: alertId
      });

      if (error) throw error;

      toast.success('Security alert resolved');
      loadAlerts();
    } catch (error) {
      console.error('Error resolving alert:', error);
      toast.error('Failed to resolve alert');
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const getSeverityColor = (severity: string) => {
    const colors = {
      low: 'bg-blue-100 text-blue-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };
    return colors[severity as keyof typeof colors] || colors.medium;
  };

  const unresolvedAlerts = alerts.filter(a => !a.resolved);
  const criticalAlerts = unresolvedAlerts.filter(a => a.severity === 'critical');

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Loading security alerts...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Security Alerts</h2>
        <p className="text-muted-foreground">
          Monitor and manage security incidents across the platform
        </p>
      </div>

      {criticalAlerts.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Critical Security Threats</AlertTitle>
          <AlertDescription>
            <strong>{criticalAlerts.length} critical alert(s)</strong> require immediate attention.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {alerts.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Security Alerts</h3>
                <p className="text-muted-foreground">
                  All security alerts have been resolved. Great work!
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          alerts.map((alert) => (
            <Card key={alert.id} className={alert.severity === 'critical' ? 'border-red-200' : ''}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{alert.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {alert.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    {alert.resolved && (
                      <Badge variant="default">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Resolved
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    Created: {new Date(alert.created_at).toLocaleString()}
                  </div>

                  {!alert.resolved && (
                    <Button
                      onClick={() => resolveAlert(alert.id)}
                      size="sm"
                      variant="outline"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Resolved
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};