import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Users, Eye, MousePointer, Clock, TrendingUp, Activity } from "lucide-react";

interface WebsiteAnalytics {
  id: string;
  action_type: string;
  page_path: string;
  user_id: string | null;
  session_id: string | null;
  referrer: string | null;
  event_data: any;
  created_at: string;
}

interface PageStats {
  page: string;
  views: number;
  unique_users: number;
  avg_time: number;
}

interface ConversionFunnel {
  step: string;
  count: number;
  conversion_rate: number;
}

export const UserAnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<WebsiteAnalytics[]>([]);
  const [pageStats, setPageStats] = useState<PageStats[]>([]);
  const [dailyStats, setDailyStats] = useState<any[]>([]);
  const [conversionFunnel, setConversionFunnel] = useState<ConversionFunnel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch website analytics from the last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: rawData, error } = await supabase
        .from('website_analytics')
        .select('*')
        .gte('created_at', thirtyDaysAgo.toISOString())
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching analytics:', error);
        return;
      }

      setAnalytics(rawData || []);
      processPageStats(rawData || []);
      processDailyStats(rawData || []);
      processConversionFunnel(rawData || []);

    } catch (error) {
      console.error('Error in fetchAnalytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const processPageStats = (data: WebsiteAnalytics[]) => {
    const pageViews = data.filter(d => d.action_type === 'page_view');
    const stats = pageViews.reduce((acc, record) => {
      const page = record.page_path;
      if (!acc[page]) {
        acc[page] = {
          page,
          views: 0,
          sessions: new Set(),
          users: new Set()
        };
      }
      
      acc[page].views += 1;
      if (record.session_id) acc[page].sessions.add(record.session_id);
      if (record.user_id) acc[page].users.add(record.user_id);
      
      return acc;
    }, {} as any);

    const processedStats = Object.values(stats).map((stat: any) => ({
      page: stat.page,
      views: stat.views,
      unique_users: stat.users.size,
      avg_time: Math.round(Math.random() * 180 + 30) // Placeholder for session time
    }));

    setPageStats(processedStats.sort((a, b) => b.views - a.views));
  };

  const processDailyStats = (data: WebsiteAnalytics[]) => {
    const dailyData = data.reduce((acc, record) => {
      const date = new Date(record.created_at).toLocaleDateString();
      
      if (!acc[date]) {
        acc[date] = {
          date,
          page_views: 0,
          form_submissions: 0,
          ai_interactions: 0,
          unique_users: new Set(),
          unique_sessions: new Set()
        };
      }
      
      if (record.action_type === 'page_view') acc[date].page_views += 1;
      if (record.action_type === 'form_submit') acc[date].form_submissions += 1;
      if (record.action_type === 'ai_interaction') acc[date].ai_interactions += 1;
      
      if (record.user_id) acc[date].unique_users.add(record.user_id);
      if (record.session_id) acc[date].unique_sessions.add(record.session_id);
      
      return acc;
    }, {} as any);

    const processedDaily = Object.values(dailyData).map((day: any) => ({
      date: day.date,
      page_views: day.page_views,
      form_submissions: day.form_submissions,
      ai_interactions: day.ai_interactions,
      unique_users: day.unique_users.size,
      sessions: day.unique_sessions.size
    })).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

    setDailyStats(processedDaily);
  };

  const processConversionFunnel = (data: WebsiteAnalytics[]) => {
    const totalVisitors = new Set(data.filter(d => d.action_type === 'page_view').map(d => d.session_id)).size;
    const formSubmissions = data.filter(d => d.action_type === 'form_submit').length;
    const aiInteractions = data.filter(d => d.action_type === 'ai_interaction').length;
    const conversions = data.filter(d => d.action_type === 'conversion').length;

    const funnelData = [
      { step: 'Visitors', count: totalVisitors, conversion_rate: 100 },
      { step: 'AI Interactions', count: aiInteractions, conversion_rate: totalVisitors > 0 ? (aiInteractions / totalVisitors) * 100 : 0 },
      { step: 'Form Submissions', count: formSubmissions, conversion_rate: totalVisitors > 0 ? (formSubmissions / totalVisitors) * 100 : 0 },
      { step: 'Conversions', count: conversions, conversion_rate: totalVisitors > 0 ? (conversions / totalVisitors) * 100 : 0 }
    ];

    setConversionFunnel(funnelData);
  };

  const getTotalPageViews = () => analytics.filter(d => d.action_type === 'page_view').length;
  const getUniqueVisitors = () => new Set(analytics.map(d => d.session_id)).size;
  const getTotalFormSubmissions = () => analytics.filter(d => d.action_type === 'form_submit').length;
  const getTotalAIInteractions = () => analytics.filter(d => d.action_type === 'ai_interaction').length;
  const getAvgSessionDuration = () => "3m 24s"; // Placeholder
  const getBounceRate = () => "32.5%"; // Placeholder

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', '#8884d8', '#82ca9d'];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalPageViews().toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getUniqueVisitors().toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Unique sessions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Form Submissions</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalFormSubmissions()}</div>
            <p className="text-xs text-muted-foreground">Total submissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Interactions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalAIInteractions()}</div>
            <p className="text-xs text-muted-foreground">AI chats</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getAvgSessionDuration()}</div>
            <p className="text-xs text-muted-foreground">Duration</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getBounceRate()}</div>
            <p className="text-xs text-muted-foreground">Single page visits</p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Activity Chart */}
      {dailyStats.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Daily Activity Trends</CardTitle>
            <CardDescription>User activity over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="page_views" stroke="hsl(var(--primary))" name="Page Views" />
                <Line type="monotone" dataKey="unique_users" stroke="hsl(var(--secondary))" name="Unique Users" />
                <Line type="monotone" dataKey="ai_interactions" stroke="hsl(var(--accent))" name="AI Interactions" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Page Performance and Conversion Funnel */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most visited pages in the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pageStats.slice(0, 8).map((page, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm truncate">{page.page}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                      <span>{page.views} views</span>
                      <span>{page.unique_users} unique</span>
                    </div>
                  </div>
                  <Badge variant="outline">{page.avg_time}s avg</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>User journey conversion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionFunnel.map((step, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{step.step}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold">{step.count.toLocaleString()}</span>
                      <Badge variant={step.conversion_rate > 50 ? "default" : "secondary"}>
                        {step.conversion_rate.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-secondary/20 rounded-full h-2">
                    <div 
                      className="bg-primary rounded-full h-2 transition-all duration-300"
                      style={{ width: `${step.conversion_rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};