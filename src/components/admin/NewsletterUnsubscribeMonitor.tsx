import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { TrendingDown, TrendingUp, Users, UserX, Clock, CheckCircle } from "lucide-react";

interface UnsubscribeRequest {
  id: string;
  email: string;
  name: string | null;
  status: string;
  unsubscribe_token: string | null;
  token_expires_at: string | null;
  unsubscribed_at: string | null;
  created_at: string;
}

interface SubscriptionStats {
  total: number;
  active: number;
  unsubscribed: number;
  pending_unsubscribe: number;
  unsubscribe_rate: number;
  recent_unsubscribes: number;
}

export const NewsletterUnsubscribeMonitor = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<SubscriptionStats>({
    total: 0,
    active: 0,
    unsubscribed: 0,
    pending_unsubscribe: 0,
    unsubscribe_rate: 0,
    recent_unsubscribes: 0,
  });
  const [recentRequests, setRecentRequests] = useState<UnsubscribeRequest[]>([]);

  useEffect(() => {
    loadData();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('newsletter-unsubscribe-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'newsletter_subscriptions'
        },
        () => {
          loadData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      // Get all subscriptions
      const { data: subscriptions, error: subsError } = await supabase
        .from('newsletter_subscriptions')
        .select('*')
        .order('created_at', { ascending: false });

      if (subsError) throw subsError;

      // Calculate stats
      const total = subscriptions?.length || 0;
      const active = subscriptions?.filter(s => s.status === 'active').length || 0;
      const unsubscribed = subscriptions?.filter(s => s.status === 'unsubscribed').length || 0;
      const pending = subscriptions?.filter(s => s.unsubscribe_token && s.token_expires_at && new Date(s.token_expires_at) > new Date()).length || 0;
      
      // Calculate unsubscribe rate (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentUnsubscribes = subscriptions?.filter(
        s => s.unsubscribed_at && new Date(s.unsubscribed_at) > sevenDaysAgo
      ).length || 0;

      const unsubscribeRate = total > 0 ? (unsubscribed / total) * 100 : 0;

      setStats({
        total,
        active,
        unsubscribed,
        pending_unsubscribe: pending,
        unsubscribe_rate: unsubscribeRate,
        recent_unsubscribes: recentUnsubscribes,
      });

      // Get recent unsubscribe requests (with tokens or recently unsubscribed)
      const recentRequestsData = subscriptions?.filter(s => 
        (s.unsubscribe_token && s.token_expires_at) || 
        (s.unsubscribed_at && new Date(s.unsubscribed_at) > sevenDaysAgo)
      ).slice(0, 20) || [];

      setRecentRequests(recentRequestsData as UnsubscribeRequest[]);

    } catch (error) {
      console.error('Error loading unsubscribe data:', error);
      toast({
        title: "Error",
        description: "Failed to load unsubscribe monitoring data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading text-xl font-semibold mb-2">Newsletter Unsubscribe Monitor</h3>
        <p className="text-sm text-muted-foreground">
          Track unsubscribe requests and newsletter subscription metrics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.total} total subscriptions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Unsubscribed</CardTitle>
              <UserX className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.unsubscribed}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.unsubscribe_rate.toFixed(1)}% unsubscribe rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Verification</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending_unsubscribe}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting email confirmation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Last 7 Days</CardTitle>
              {stats.recent_unsubscribes > 0 ? (
                <TrendingDown className="h-4 w-4 text-destructive" />
              ) : (
                <TrendingUp className="h-4 w-4 text-primary" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recent_unsubscribes}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Recent unsubscribes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Unsubscribe Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Unsubscribe Activity</CardTitle>
          <CardDescription>
            Latest unsubscribe requests and confirmations (last 7 days)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentRequests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No recent unsubscribe activity
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Token Expires</TableHead>
                    <TableHead>Unsubscribed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-mono text-sm">{request.email}</TableCell>
                      <TableCell>{request.name || '-'}</TableCell>
                      <TableCell>
                        {request.status === 'unsubscribed' ? (
                          <Badge variant="secondary" className="gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Unsubscribed
                          </Badge>
                        ) : request.unsubscribe_token && request.token_expires_at ? (
                          new Date(request.token_expires_at) > new Date() ? (
                            <Badge variant="outline" className="gap-1">
                              <Clock className="h-3 w-3" />
                              Pending
                            </Badge>
                          ) : (
                            <Badge variant="default">Active</Badge>
                          )
                        ) : (
                          <Badge variant="default">Active</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {request.token_expires_at && new Date(request.token_expires_at) > new Date()
                          ? formatDistanceToNow(new Date(request.token_expires_at), { addSuffix: true })
                          : '-'}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {request.unsubscribed_at
                          ? formatDistanceToNow(new Date(request.unsubscribed_at), { addSuffix: true })
                          : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
