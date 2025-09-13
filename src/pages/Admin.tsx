import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { maskContactInfo } from "@/lib/security";
import { Eye, EyeOff, Shield } from "lucide-react";
import { SecurityMonitoringDashboard } from "@/components/security/SecurityMonitoringDashboard";

interface PartnerReferral {
  id: string;
  name: string;
  contact_info: string;
  notes: string;
  status: string;
  created_at: string;
}

interface PartnershipRequest {
  id: string;
  organization_name: string;
  contact_email: string;
  description: string;
  status: string;
  created_at: string;
}

const Admin = () => {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [referrals, setReferrals] = useState<PartnerReferral[]>([]);
  const [partnershipRequests, setPartnershipRequests] = useState<PartnershipRequest[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [revealedContacts, setRevealedContacts] = useState<Set<string>>(new Set());

  useEffect(() => {
    document.title = "Admin Dashboard | Forward Focus Elevation";
  }, []);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setCheckingAdmin(false);
        return;
      }

      try {
        const { data, error } = await supabase.rpc('is_user_admin', {
          user_id: user.id
        });
        
        if (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        } else {
          setIsAdmin(data || false);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setCheckingAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isAdmin) return;

      try {
        const [referralsRes, requestsRes] = await Promise.all([
          supabase.from('partner_referrals').select('*').order('created_at', { ascending: false }),
          supabase.from('partnership_requests').select('*').order('created_at', { ascending: false })
        ]);

        if (referralsRes.error) {
          console.error('Error fetching referrals:', referralsRes.error);
        } else {
          setReferrals(referralsRes.data || []);
        }

        if (requestsRes.error) {
          console.error('Error fetching partnership requests:', requestsRes.error);
        } else {
          setPartnershipRequests(requestsRes.data || []);
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoadingData(false);
      }
    };

    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const toggleContactVisibility = async (id: string, contactInfo: string) => {
    // Check admin operation limits before proceeding
    try {
      const { data: canProceed, error: rateLimitError } = await supabase.rpc('check_admin_operation_limit', {
        operation_type: 'contact_reveal'
      });

      if (rateLimitError || !canProceed) {
        toast({
          title: "Rate limit exceeded",
          description: "Too many contact reveals in the last hour. Please try again later.",
          variant: "destructive",
        });
        return;
      }

      const newRevealed = new Set(revealedContacts);
      if (newRevealed.has(id)) {
        newRevealed.delete(id);
      } else {
        newRevealed.add(id);
        
        // Enhanced logging with rate limit check
        await supabase.rpc('log_sensitive_access', {
          table_name: 'partner_referrals',
          operation: 'CONTACT_REVEAL',
          record_id: id,
          is_sensitive: true
        });
      }
      setRevealedContacts(newRevealed);
    } catch (error) {
      console.error('Error in contact visibility toggle:', error);
      toast({
        title: "Error",
        description: "Failed to toggle contact visibility",
        variant: "destructive",
      });
    }
  };

  const updateStatus = async (table: 'partner_referrals' | 'partnership_requests', id: string, newStatus: string) => {
    try {
      // Check admin operation limits
      const { data: canProceed, error: rateLimitError } = await supabase.rpc('check_admin_operation_limit', {
        operation_type: 'status_update'
      });

      if (rateLimitError || !canProceed) {
        toast({
          title: "Rate limit exceeded",
          description: "Too many status updates in the last hour. Please try again later.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from(table)
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update status",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Status updated successfully",
        });
        
        // Enhanced audit logging
        await supabase.rpc('log_sensitive_access', {
          table_name: table,
          operation: 'STATUS_UPDATE',
          record_id: id,
          is_sensitive: true
        });

        // Refresh data
        if (table === 'partner_referrals') {
          const { data } = await supabase.from('partner_referrals').select('*').order('created_at', { ascending: false });
          setReferrals(data || []);
        } else {
          const { data } = await supabase.from('partnership_requests').select('*').order('created_at', { ascending: false });
          setPartnershipRequests(data || []);
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  if (loading || checkingAdmin) {
    return (
      <main id="main" className="container py-12 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <main id="main" className="container py-10">
      <h1 className="font-heading text-3xl font-semibold mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="management" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="management">Management</TabsTrigger>
          <TabsTrigger value="security">Security Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="management">
          <div className="grid gap-8">
        {/* Partner Referrals Section */}
        <section>
          <h2 className="font-heading text-2xl font-semibold mb-4">Partner Referrals</h2>
          {loadingData ? (
            <div className="text-center py-8">
              <div className="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            </div>
          ) : referrals.length === 0 ? (
            <Card>
              <CardContent className="py-8">
                <p className="text-center text-muted-foreground">No referrals yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {referrals.map((referral) => (
                <Card key={referral.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{referral.name}</CardTitle>
                      <Badge variant={referral.status === 'new' ? 'default' : 'secondary'}>
                        {referral.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      <div className="flex items-center gap-2">
                        <span>Contact: </span>
                        <span className="font-mono">
                          {revealedContacts.has(referral.id) 
                            ? referral.contact_info 
                            : maskContactInfo(referral.contact_info)
                          }
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleContactVisibility(referral.id, referral.contact_info)}
                          className="h-6 w-6 p-0"
                        >
                          {revealedContacts.has(referral.id) ? (
                            <EyeOff className="h-3 w-3" />
                          ) : (
                            <Eye className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{referral.notes}</p>
                    <div className="flex gap-2">
                      {referral.status === 'new' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => updateStatus('partner_referrals', referral.id, 'contacted')}
                          >
                            Mark as Contacted
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus('partner_referrals', referral.id, 'completed')}
                          >
                            Mark as Completed
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Partnership Requests Section */}
        <section>
          <h2 className="font-heading text-2xl font-semibold mb-4">Partnership Requests</h2>
          {loadingData ? (
            <div className="text-center py-8">
              <div className="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            </div>
          ) : partnershipRequests.length === 0 ? (
            <Card>
              <CardContent className="py-8">
                <p className="text-center text-muted-foreground">No partnership requests yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {partnershipRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{request.organization_name}</CardTitle>
                      <Badge variant={request.status === 'new' ? 'default' : 'secondary'}>
                        {request.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      <div className="flex items-center gap-2">
                        <span>Email: </span>
                        <span className="font-mono">
                          {revealedContacts.has(request.id) 
                            ? request.contact_email 
                            : maskContactInfo(request.contact_email)
                          }
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleContactVisibility(request.id, request.contact_email)}
                          className="h-6 w-6 p-0"
                        >
                          {revealedContacts.has(request.id) ? (
                            <EyeOff className="h-3 w-3" />
                          ) : (
                            <Eye className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{request.description}</p>
                    <div className="flex gap-2">
                      {request.status === 'new' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => updateStatus('partnership_requests', request.id, 'reviewing')}
                          >
                            Mark as Reviewing
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus('partnership_requests', request.id, 'approved')}
                          >
                            Approve
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <SecurityMonitoringDashboard />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Admin;