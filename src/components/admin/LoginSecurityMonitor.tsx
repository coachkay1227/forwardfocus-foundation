import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Lock, Unlock, Shield, RefreshCw, Clock, MapPin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

interface LoginAttempt {
  id: string;
  email: string | null;
  ip_address: string | null;
  user_agent: string | null;
  attempt_type: string;
  success: boolean;
  failure_reason: string | null;
  created_at: string;
}

interface AccountLockout {
  id: string;
  email: string;
  locked_at: string;
  unlock_at: string;
  failed_attempts: number;
  lockout_reason: string | null;
}

interface AdminIpWhitelist {
  id: string;
  ip_address: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
}

export const LoginSecurityMonitor = () => {
  const [loginAttempts, setLoginAttempts] = useState<LoginAttempt[]>([]);
  const [accountLockouts, setAccountLockouts] = useState<AccountLockout[]>([]);
  const [ipWhitelist, setIpWhitelist] = useState<AdminIpWhitelist[]>([]);
  const [loading, setLoading] = useState(true);
  const [newIpAddress, setNewIpAddress] = useState('');
  const [newIpDescription, setNewIpDescription] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch login attempts
      const { data: attempts, error: attemptsError } = await supabase
        .from('login_attempts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (attemptsError) throw attemptsError;
      setLoginAttempts(attempts || []);

      // Fetch account lockouts
      const { data: lockouts, error: lockoutsError } = await supabase
        .from('account_lockouts')
        .select('*')
        .order('locked_at', { ascending: false });

      if (lockoutsError) throw lockoutsError;
      setAccountLockouts(lockouts || []);

      // Fetch IP whitelist
      const { data: whitelist, error: whitelistError } = await supabase
        .from('admin_ip_whitelist')
        .select('*')
        .order('created_at', { ascending: false });

      if (whitelistError) throw whitelistError;
      setIpWhitelist(whitelist || []);

    } catch (error) {
      console.error('Failed to fetch security data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load security data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const unlockAccount = async (email: string) => {
    try {
      const { error } = await supabase
        .from('account_lockouts')
        .delete()
        .eq('email', email);

      if (error) throw error;

      toast({
        title: 'Account Unlocked',
        description: `Account for ${email} has been unlocked.`,
      });

      fetchData();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to unlock account',
        variant: 'destructive',
      });
    }
  };

  const addToWhitelist = async () => {
    if (!newIpAddress) return;

    try {
      const { error } = await supabase
        .from('admin_ip_whitelist')
        .insert({
          ip_address: newIpAddress,
          description: newIpDescription || null,
        });

      if (error) throw error;

      toast({
        title: 'IP Added',
        description: `${newIpAddress} has been added to the whitelist.`,
      });

      setNewIpAddress('');
      setNewIpDescription('');
      fetchData();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add IP to whitelist',
        variant: 'destructive',
      });
    }
  };

  const removeFromWhitelist = async (id: string) => {
    try {
      const { error } = await supabase
        .from('admin_ip_whitelist')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'IP Removed',
        description: 'IP has been removed from the whitelist.',
      });

      fetchData();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove IP from whitelist',
        variant: 'destructive',
      });
    }
  };

  const failedAttempts = loginAttempts.filter(a => !a.success);
  const activeLockouts = accountLockouts.filter(l => new Date(l.unlock_at) > new Date());

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Login Security Monitor
            </CardTitle>
            <CardDescription>
              Monitor login attempts, account lockouts, and IP whitelist
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-muted/30">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">{loginAttempts.length}</div>
              <div className="text-sm text-muted-foreground">Total Attempts (24h)</div>
            </CardContent>
          </Card>
          <Card className="bg-red-50 dark:bg-red-950/20">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-red-600">{failedAttempts.length}</div>
              <div className="text-sm text-muted-foreground">Failed Attempts</div>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50 dark:bg-yellow-950/20">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-yellow-600">{activeLockouts.length}</div>
              <div className="text-sm text-muted-foreground">Active Lockouts</div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 dark:bg-green-950/20">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-green-600">{ipWhitelist.filter(ip => ip.is_active).length}</div>
              <div className="text-sm text-muted-foreground">Whitelisted IPs</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="attempts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="attempts">Login Attempts</TabsTrigger>
            <TabsTrigger value="lockouts">
              Account Lockouts
              {activeLockouts.length > 0 && (
                <Badge variant="destructive" className="ml-2">{activeLockouts.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="whitelist">IP Whitelist</TabsTrigger>
          </TabsList>

          <TabsContent value="attempts">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loginAttempts.slice(0, 50).map((attempt) => (
                    <TableRow key={attempt.id}>
                      <TableCell>
                        {attempt.success ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700">Success</Badge>
                        ) : (
                          <Badge variant="destructive">Failed</Badge>
                        )}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {attempt.email || 'N/A'}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {attempt.ip_address || 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{attempt.attempt_type}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                        {attempt.failure_reason || '-'}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(attempt.created_at), { addSuffix: true })}
                      </TableCell>
                    </TableRow>
                  ))}
                  {loginAttempts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        No login attempts recorded
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="lockouts">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Failed Attempts</TableHead>
                    <TableHead>Locked At</TableHead>
                    <TableHead>Unlocks At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accountLockouts.map((lockout) => {
                    const isActive = new Date(lockout.unlock_at) > new Date();
                    return (
                      <TableRow key={lockout.id}>
                        <TableCell>
                          {isActive ? (
                            <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                              <Lock className="h-3 w-3" />
                              Locked
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="flex items-center gap-1 w-fit">
                              <Unlock className="h-3 w-3" />
                              Expired
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {lockout.email}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{lockout.failed_attempts} attempts</Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatDistanceToNow(new Date(lockout.locked_at), { addSuffix: true })}
                        </TableCell>
                        <TableCell className="text-sm">
                          {isActive ? (
                            <span className="flex items-center gap-1 text-destructive">
                              <Clock className="h-3 w-3" />
                              {formatDistanceToNow(new Date(lockout.unlock_at), { addSuffix: true })}
                            </span>
                          ) : (
                            'Expired'
                          )}
                        </TableCell>
                        <TableCell>
                          {isActive && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => unlockAccount(lockout.email)}
                            >
                              <Unlock className="h-4 w-4 mr-1" />
                              Unlock
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {accountLockouts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        No account lockouts
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="whitelist">
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="IP Address (e.g., 192.168.1.1)"
                  value={newIpAddress}
                  onChange={(e) => setNewIpAddress(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-md text-sm"
                />
                <input
                  type="text"
                  placeholder="Description (optional)"
                  value={newIpDescription}
                  onChange={(e) => setNewIpDescription(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-md text-sm"
                />
                <Button onClick={addToWhitelist} disabled={!newIpAddress}>
                  <MapPin className="h-4 w-4 mr-1" />
                  Add IP
                </Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Added</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ipWhitelist.map((ip) => (
                      <TableRow key={ip.id}>
                        <TableCell>
                          {ip.is_active ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700">Active</Badge>
                          ) : (
                            <Badge variant="secondary">Inactive</Badge>
                          )}
                        </TableCell>
                        <TableCell className="font-mono">{ip.ip_address}</TableCell>
                        <TableCell>{ip.description || '-'}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(ip.created_at), { addSuffix: true })}
                        </TableCell>
                        <TableCell>
                          {ip.is_active && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromWhitelist(ip.id)}
                            >
                              Remove
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {ipWhitelist.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                          No IPs in whitelist. All admin IPs are allowed by default.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <strong>Note:</strong> IP whitelisting is optional. When no IPs are added, all IPs are allowed for admin access. 
                    Once you add an IP, only whitelisted IPs will be able to access admin functions.
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
