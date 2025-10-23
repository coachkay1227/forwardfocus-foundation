import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Search, Filter, Eye, Shield, User, Database } from "lucide-react";

interface AuditLogEntry {
  id: string;
  user_id: string | null;
  action: string;
  resource_type: string | null;
  resource_id: string | null;
  details: any;
  severity: string | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

export const AuditLogViewer = () => {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [sensitiveFilter, setSensitiveFilter] = useState<string>("all");
  const [timeFilter, setTimeFilter] = useState<string>("24h");

  useEffect(() => {
    fetchAuditLogs();
  }, [timeFilter]);

  useEffect(() => {
    filterLogs();
  }, [logs, searchTerm, actionFilter, sensitiveFilter]);

  const fetchAuditLogs = async () => {
    setLoading(true);
    try {
      let hoursBack = 24;
      switch (timeFilter) {
        case '1h': hoursBack = 1; break;
        case '6h': hoursBack = 6; break;
        case '24h': hoursBack = 24; break;
        case '7d': hoursBack = 168; break;
        case '30d': hoursBack = 720; break;
      }

      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .gte('created_at', new Date(Date.now() - hoursBack * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false })
        .limit(1000);

      if (error) {
        console.error('Error fetching audit logs:', error);
        return;
      }

      setLogs(data || []);
    } catch (error) {
      console.error('Error in fetchAuditLogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterLogs = () => {
    let filtered = logs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (log.resource_type && log.resource_type.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (log.user_id && log.user_id.includes(searchTerm)) ||
        (log.ip_address && String(log.ip_address).includes(searchTerm))
      );
    }

    // Action filter
    if (actionFilter !== "all") {
      filtered = filtered.filter(log => log.action.includes(actionFilter.toUpperCase()));
    }

    // Sensitive data filter - use severity as proxy
    if (sensitiveFilter !== "all") {
      const isSensitive = sensitiveFilter === "sensitive";
      filtered = filtered.filter(log => isSensitive ? log.severity === 'high' || log.severity === 'critical' : log.severity === 'info' || log.severity === 'low');
    }

    setFilteredLogs(filtered);
  };

  const getActionIcon = (action: string) => {
    if (action.includes('CONTACT') || action.includes('SENSITIVE')) {
      return <Eye className="h-4 w-4 text-yellow-500" />;
    } else if (action.includes('ADMIN')) {
      return <Shield className="h-4 w-4 text-red-500" />;
    } else if (action.includes('SELECT') || action.includes('VIEW')) {
      return <Database className="h-4 w-4 text-blue-500" />;
    } else {
      return <User className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActionColor = (action: string, sensitive: boolean) => {
    if (sensitive || action.includes('CONTACT') || action.includes('ADMIN')) {
      return 'destructive';
    } else if (action.includes('INSERT') || action.includes('UPDATE')) {
      return 'secondary';
    } else {
      return 'outline';
    }
  };

  const uniqueActions = Array.from(new Set(logs.map(log => log.action.split('_')[0]))).sort();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Audit Log Filters
          </CardTitle>
          <CardDescription>
            Filter and search through audit log entries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Time Range</label>
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Last Hour</SelectItem>
                  <SelectItem value="6h">Last 6 Hours</SelectItem>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Action Type</label>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  {uniqueActions.map(action => (
                    <SelectItem key={action} value={action}>{action}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Data Sensitivity</label>
              <Select value={sensitiveFilter} onValueChange={setSensitiveFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Data</SelectItem>
                  <SelectItem value="sensitive">Sensitive Only</SelectItem>
                  <SelectItem value="non-sensitive">Non-Sensitive Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Actions</label>
              <Button onClick={fetchAuditLogs} variant="outline" className="w-full">
                Refresh Logs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Log Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Log Entries</CardTitle>
          <CardDescription>
            Showing {filteredLogs.length} of {logs.length} log entries
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredLogs.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No audit log entries found matching your filters
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLogs.map((log) => (
                <div key={log.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getActionIcon(log.action)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{log.action}</span>
                          <Badge variant={getActionColor(log.action, log.severity === 'high' || log.severity === 'critical') as any}>
                            {log.resource_type || 'System'}
                          </Badge>
                          {(log.severity === 'high' || log.severity === 'critical') && (
                            <Badge variant="destructive">Sensitive</Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {new Date(log.created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2 text-sm text-muted-foreground md:grid-cols-3">
                    <div>
                      <span className="font-medium">User ID:</span>{' '}
                      {log.user_id || 'Anonymous'}
                    </div>
                    <div>
                      <span className="font-medium">IP Address:</span>{' '}
                      {(log.ip_address as string) || 'Unknown'}
                    </div>
                    <div>
                      <span className="font-medium">Resource ID:</span>{' '}
                      {log.resource_id ? log.resource_id.substring(0, 8) + '...' : 'N/A'}
                    </div>
                  </div>

                  {log.user_agent && (
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">User Agent:</span> {log.user_agent}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};