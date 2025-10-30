import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Users, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export const MonetizationEarnings = () => {
  const { data: earnings, isLoading } = useQuery({
    queryKey: ['monetization-earnings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('monetization_earnings')
        .select(`
          *,
          subscriber:newsletter_subscriptions(email, name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const { data: subscribers } = useQuery({
    queryKey: ['newsletter-subscribers-earnings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .select('sparkloop_earnings_generated, beehiiv_earnings_generated')
        .eq('status', 'active');

      if (error) throw error;
      return data as any as Array<{sparkloop_earnings_generated: number | null, beehiiv_earnings_generated: number | null}>;
    }
  });

  const totalSparkLoopEarnings = subscribers?.reduce((sum, sub) => sum + (Number(sub.sparkloop_earnings_generated) || 0), 0) || 0;
  const totalBeehiivEarnings = subscribers?.reduce((sum, sub) => sum + (Number(sub.beehiiv_earnings_generated) || 0), 0) || 0;
  const totalEarnings = totalSparkLoopEarnings + totalBeehiivEarnings;
  
  const sparkloopEarnings = earnings?.filter(e => e.platform === 'sparkloop') || [];
  const beehiivEarnings = earnings?.filter(e => e.platform === 'beehiiv') || [];
  const pendingPayouts = earnings?.filter(e => e.payout_status === 'pending') || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-20" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Lifetime revenue from referrals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SparkLoop</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSparkLoopEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {sparkloopEarnings.length} referrals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Beehiiv</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBeehiivEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {beehiivEarnings.length} referrals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${pendingPayouts.reduce((sum, e) => sum + e.earnings_amount, 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {pendingPayouts.length} pending transactions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Earnings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          {earnings && earnings.length > 0 ? (
            <div className="space-y-4">
              {earnings.slice(0, 10).map((earning) => (
                <div
                  key={earning.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={earning.platform === 'sparkloop' ? 'default' : 'secondary'}>
                        {earning.platform === 'sparkloop' ? 'SparkLoop' : 'Beehiiv'}
                      </Badge>
                      <span className="font-medium">{earning.partner_newsletter}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {earning.subscriber?.email || 'Unknown subscriber'}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {format(new Date(earning.created_at), 'MMM d, yyyy h:mm a')}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-green-600">
                      +${earning.earnings_amount.toFixed(2)}
                    </div>
                    <Badge 
                      variant={earning.payout_status === 'paid' ? 'default' : 'outline'}
                      className="mt-1"
                    >
                      {earning.payout_status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No earnings yet</p>
              <p className="text-sm mt-2">
                Earnings will appear here when subscribers click on partner newsletter recommendations
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
