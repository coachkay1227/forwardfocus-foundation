import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Activity, Users, Zap, TrendingUp } from "lucide-react";

interface AIUsageData {
  id: string;
  endpoint_name: string;
  user_id: string | null;
  request_count: number;
  response_time_ms: number | null;
  error_count: number;
  created_at: string;
}

interface EndpointStats {
  endpoint: string;
  requests: number;
  errors: number;
  avgResponseTime: number;
}

interface HourlyUsage {
  hour: string;
  requests: number;
  errors: number;
}

export const UsageAnalytics = () => {
  const [usageData, setUsageData] = useState<AIUsageData[]>([]);
  const [endpointStats, setEndpointStats] = useState<EndpointStats[]>([]);
  const [hourlyUsage, setHourlyUsage] = useState<HourlyUsage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsageData();
  }, []);

  const fetchUsageData = async () => {
    try {
      // Fetch AI usage data from the last 24 hours
      const { data: rawData, error } = await supabase
        .from('ai_usage_analytics')
        .select('*')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching usage data:', error);
        return;
      }

      setUsageData(rawData || []);

      // Process data for charts
      processEndpointStats(rawData || []);
      processHourlyUsage(rawData || []);

    } catch (error) {
      console.error('Error in fetchUsageData:', error);
    } finally {
      setLoading(false);
    }
  };

  const processEndpointStats = (data: AIUsageData[]) => {
    const stats = data.reduce((acc, record) => {
      const endpoint = record.endpoint_name;
      if (!acc[endpoint]) {
        acc[endpoint] = {
          endpoint,
          requests: 0,
          errors: 0,
          responseTimes: []
        };
      }
      
      acc[endpoint].requests += record.request_count || 1;
      acc[endpoint].errors += record.error_count || 0;
      
      if (record.response_time_ms) {
        acc[endpoint].responseTimes.push(record.response_time_ms);
      }
      
      return acc;
    }, {} as any);

    const processedStats = Object.values(stats).map((stat: any) => ({
      endpoint: stat.endpoint,
      requests: stat.requests,
      errors: stat.errors,
      avgResponseTime: stat.responseTimes.length > 0 
        ? Math.round(stat.responseTimes.reduce((a: number, b: number) => a + b, 0) / stat.responseTimes.length)
        : 0
    }));

    setEndpointStats(processedStats);
  };

  const processHourlyUsage = (data: AIUsageData[]) => {
    const hourlyData = data.reduce((acc, record) => {
      const hour = new Date(record.created_at).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        hour12: false 
      });
      
      if (!acc[hour]) {
        acc[hour] = { hour, requests: 0, errors: 0 };
      }
      
      acc[hour].requests += record.request_count || 1;
      acc[hour].errors += record.error_count || 0;
      
      return acc;
    }, {} as any);

    const sortedHourly = Object.values(hourlyData).sort((a: any, b: any) => 
      a.hour.localeCompare(b.hour)
    );

    setHourlyUsage(sortedHourly as HourlyUsage[]);
  };

  const getTotalRequests = () => usageData.reduce((sum, record) => sum + (record.request_count || 1), 0);
  const getTotalErrors = () => usageData.reduce((sum, record) => sum + (record.error_count || 0), 0);
  const getUniqueUsers = () => new Set(usageData.filter(d => d.user_id).map(d => d.user_id)).size;
  const getErrorRate = () => {
    const total = getTotalRequests();
    const errors = getTotalErrors();
    return total > 0 ? ((errors / total) * 100).toFixed(2) : '0';
  };

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', '#8884d8', '#82ca9d', '#ffc658'];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Usage Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalRequests()}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getUniqueUsers()}</div>
            <p className="text-xs text-muted-foreground">Active users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getErrorRate()}%</div>
            <p className="text-xs text-muted-foreground">{getTotalErrors()} errors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Endpoints</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{endpointStats.length}</div>
            <p className="text-xs text-muted-foreground">AI services</p>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Usage Chart */}
      {hourlyUsage.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Hourly Usage Pattern</CardTitle>
            <CardDescription>AI endpoint usage over the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyUsage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="requests" fill="hsl(var(--primary))" name="Requests" />
                <Bar dataKey="errors" fill="#ef4444" name="Errors" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Endpoint Statistics */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Endpoint Usage Distribution */}
        {endpointStats.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Endpoint Usage Distribution</CardTitle>
              <CardDescription>Request distribution across AI endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={endpointStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ endpoint, requests }) => `${endpoint}: ${requests}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="requests"
                  >
                    {endpointStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Endpoint Performance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Endpoint Performance</CardTitle>
            <CardDescription>Performance metrics for each AI endpoint</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {endpointStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{stat.endpoint}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                      <span>{stat.requests} requests</span>
                      <span>{stat.avgResponseTime}ms avg</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {stat.errors > 0 && (
                      <Badge variant="destructive">{stat.errors} errors</Badge>
                    )}
                    <Badge variant="outline">
                      {((1 - stat.errors / stat.requests) * 100).toFixed(1)}% success
                    </Badge>
                  </div>
                </div>
              ))}
              
              {endpointStats.length === 0 && (
                <div className="text-center text-muted-foreground py-4">
                  No AI usage data available
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};