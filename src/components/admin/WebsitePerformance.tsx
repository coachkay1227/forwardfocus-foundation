import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Zap, Activity, Clock, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";

interface PerformanceData {
  id: string;
  page_path: string;
  event_data: any;
  created_at: string;
}

interface PagePerformance {
  page: string;
  avg_load_time: number;
  avg_fcp: number;
  avg_lcp: number;
  samples: number;
  cls_score: number;
}

export const WebsitePerformance = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [pagePerformance, setPagePerformance] = useState<PagePerformance[]>([]);
  const [coreWebVitals, setCoreWebVitals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPerformanceData();
  }, []);

  const fetchPerformanceData = async () => {
    try {
      // Fetch performance data from the last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data: rawData, error } = await supabase
        .from('website_analytics')
        .select('*')
        .gte('created_at', sevenDaysAgo.toISOString())
        .eq('action_type', 'page_view')
        .not('event_data->performance', 'is', null)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching performance data:', error);
        return;
      }

      setPerformanceData(rawData || []);
      processPagePerformance(rawData || []);
      processCoreWebVitals(rawData || []);

    } catch (error) {
      console.error('Error in fetchPerformanceData:', error);
    } finally {
      setLoading(false);
    }
  };

  const processPagePerformance = (data: PerformanceData[]) => {
    const pageStats = data.reduce((acc, record) => {
      const page = record.page_path;
      const perf = record.event_data?.performance;
      
      if (!perf || !page) return acc;
      
      if (!acc[page]) {
        acc[page] = {
          page,
          load_times: [],
          fcp_times: [],
          lcp_times: [],
          cls_scores: []
        };
      }
      
      if (perf.total_time) acc[page].load_times.push(perf.total_time);
      if (record.event_data?.web_vital?.name === 'FCP') {
        acc[page].fcp_times.push(record.event_data.web_vital.value);
      }
      if (record.event_data?.web_vital?.name === 'LCP') {
        acc[page].lcp_times.push(record.event_data.web_vital.value);
      }
      if (record.event_data?.web_vital?.name === 'CLS') {
        acc[page].cls_scores.push(record.event_data.web_vital.value);
      }
      
      return acc;
    }, {} as any);

    const processedStats = Object.values(pageStats).map((stat: any) => ({
      page: stat.page,
      avg_load_time: stat.load_times.length > 0 
        ? Math.round(stat.load_times.reduce((a: number, b: number) => a + b, 0) / stat.load_times.length)
        : 0,
      avg_fcp: stat.fcp_times.length > 0
        ? Math.round(stat.fcp_times.reduce((a: number, b: number) => a + b, 0) / stat.fcp_times.length)
        : 0,
      avg_lcp: stat.lcp_times.length > 0
        ? Math.round(stat.lcp_times.reduce((a: number, b: number) => a + b, 0) / stat.lcp_times.length)
        : 0,
      cls_score: stat.cls_scores.length > 0
        ? Number((stat.cls_scores.reduce((a: number, b: number) => a + b, 0) / stat.cls_scores.length).toFixed(3))
        : 0,
      samples: stat.load_times.length
    }));

    setPagePerformance(processedStats.filter(p => p.samples > 0).sort((a, b) => b.samples - a.samples));
  };

  const processCoreWebVitals = (data: PerformanceData[]) => {
    const vitalsData = data
      .filter(d => d.event_data?.web_vital)
      .reduce((acc, record) => {
        const date = new Date(record.created_at).toLocaleDateString();
        const vital = record.event_data.web_vital;
        
        if (!acc[date]) {
          acc[date] = { date, FCP: [], LCP: [], CLS: [] };
        }
        
        if (vital.name && acc[date][vital.name]) {
          acc[date][vital.name].push(vital.value);
        }
        
        return acc;
      }, {} as any);

    const processedVitals = Object.values(vitalsData).map((day: any) => ({
      date: day.date,
      FCP: day.FCP.length > 0 ? Math.round(day.FCP.reduce((a: number, b: number) => a + b, 0) / day.FCP.length) : 0,
      LCP: day.LCP.length > 0 ? Math.round(day.LCP.reduce((a: number, b: number) => a + b, 0) / day.LCP.length) : 0,
      CLS: day.CLS.length > 0 ? (day.CLS.reduce((a: number, b: number) => a + b, 0) / day.CLS.length).toFixed(3) : 0
    })).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

    setCoreWebVitals(processedVitals);
  };

  const getOverallPerformanceScore = () => {
    if (pagePerformance.length === 0) return 0;
    
    const avgLoadTime = pagePerformance.reduce((sum, p) => sum + p.avg_load_time, 0) / pagePerformance.length;
    
    // Score based on load time (lower is better)
    if (avgLoadTime < 1000) return 95;
    if (avgLoadTime < 2000) return 85;
    if (avgLoadTime < 3000) return 75;
    if (avgLoadTime < 4000) return 65;
    return 45;
  };

  const getPerformanceGrade = (score: number) => {
    if (score >= 90) return { grade: 'A', variant: 'default', color: 'text-green-600' };
    if (score >= 80) return { grade: 'B', variant: 'secondary', color: 'text-yellow-600' };
    if (score >= 70) return { grade: 'C', variant: 'outline', color: 'text-orange-600' };
    return { grade: 'D', variant: 'destructive', color: 'text-red-600' };
  };

  const performanceScore = getOverallPerformanceScore();
  const performanceGrade = getPerformanceGrade(performanceScore);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance Score</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">{performanceScore}</div>
              <Badge variant={performanceGrade.variant as any}>Grade {performanceGrade.grade}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Overall site performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Load Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pagePerformance.length > 0 
                ? `${Math.round(pagePerformance.reduce((sum, p) => sum + p.avg_load_time, 0) / pagePerformance.length)}ms`
                : 'N/A'
              }
            </div>
            <p className="text-xs text-muted-foreground">Average page load</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pages Monitored</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pagePerformance.length}</div>
            <p className="text-xs text-muted-foreground">With performance data</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Points</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pagePerformance.reduce((sum, p) => sum + p.samples, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Performance samples</p>
          </CardContent>
        </Card>
      </div>

      {/* Core Web Vitals Trend */}
      {coreWebVitals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Core Web Vitals Trends</CardTitle>
            <CardDescription>Key performance metrics over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={coreWebVitals}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="FCP" stroke="hsl(var(--primary))" name="First Contentful Paint (ms)" />
                <Line type="monotone" dataKey="LCP" stroke="hsl(var(--secondary))" name="Largest Contentful Paint (ms)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Page Performance Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Page Performance Breakdown</CardTitle>
          <CardDescription>Performance metrics by page (last 7 days)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pagePerformance.map((page, index) => {
              const loadTimeGood = page.avg_load_time < 2000;
              const fcpGood = page.avg_fcp < 1800;
              const lcpGood = page.avg_lcp < 2500;
              
              return (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium truncate flex-1">{page.page}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{page.samples} samples</Badge>
                      {loadTimeGood && fcpGood && lcpGood ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Load Time</div>
                      <div className={`font-medium ${loadTimeGood ? 'text-green-600' : 'text-yellow-600'}`}>
                        {page.avg_load_time}ms
                      </div>
                    </div>
                    
                    {page.avg_fcp > 0 && (
                      <div>
                        <div className="text-muted-foreground">FCP</div>
                        <div className={`font-medium ${fcpGood ? 'text-green-600' : 'text-yellow-600'}`}>
                          {page.avg_fcp}ms
                        </div>
                      </div>
                    )}
                    
                    {page.avg_lcp > 0 && (
                      <div>
                        <div className="text-muted-foreground">LCP</div>
                        <div className={`font-medium ${lcpGood ? 'text-green-600' : 'text-yellow-600'}`}>
                          {page.avg_lcp}ms
                        </div>
                      </div>
                    )}
                    
                    {page.cls_score > 0 && (
                      <div>
                        <div className="text-muted-foreground">CLS</div>
                        <div className={`font-medium ${Number(page.cls_score) < 0.1 ? 'text-green-600' : 'text-yellow-600'}`}>
                          {page.cls_score}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            
            {pagePerformance.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                No performance data available for the last 7 days
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};