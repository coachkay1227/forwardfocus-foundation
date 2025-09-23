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
import { EmailMarketingDashboard } from "@/components/admin/EmailMarketingDashboard";
import { ContactAccessManager } from "@/components/security/ContactAccessManager";
import { JustificationManager } from "@/components/admin/JustificationManager";

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

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  form_type: string;
  status: string;
  created_at: string;
}

interface SupportRequest {
  id: string;
  request_type: string;
  name: string;
  email: string;
  organization: string;
  phone: string;
  subject: string;
  message: string;
  additional_data: any;
  status: string;
  created_at: string;
}

interface BookingRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  booking_date: string;
  booking_time: string;
  message: string;
  status: string;
  created_at: string;
}

const Admin = () => {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [referrals, setReferrals] = useState<PartnerReferral[]>([]);
  const [partnershipRequests, setPartnershipRequests] = useState<PartnershipRequest[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>([]);
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([]);
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
        const [referralsRes, requestsRes, contactsRes, supportRes, bookingsRes] = await Promise.all([
          supabase.from('partner_referrals').select('*').order('created_at', { ascending: false }),
          supabase.from('partnership_requests').select('*').order('created_at', { ascending: false }),
          supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
          supabase.from('support_requests').select('*').order('created_at', { ascending: false }),
          supabase.from('booking_requests').select('*').order('created_at', { ascending: false })
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

        if (contactsRes.error) {
          console.error('Error fetching contact submissions:', contactsRes.error);
        } else {
          setContactSubmissions(contactsRes.data || []);
        }

        if (supportRes.error) {
          console.error('Error fetching support requests:', supportRes.error);
        } else {
          setSupportRequests(supportRes.data || []);
        }

        if (bookingsRes.error) {
          console.error('Error fetching booking requests:', bookingsRes.error);
        } else {
          setBookingRequests(bookingsRes.data || []);
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

  const updateStatus = async (table: 'partner_referrals' | 'partnership_requests' | 'contact_submissions' | 'support_requests' | 'booking_requests', id: string, newStatus: string) => {
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
        } else if (table === 'partnership_requests') {
          const { data } = await supabase.from('partnership_requests').select('*').order('created_at', { ascending: false });
          setPartnershipRequests(data || []);
        } else if (table === 'contact_submissions') {
          const { data } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
          setContactSubmissions(data || []);
        } else if (table === 'support_requests') {
          const { data } = await supabase.from('support_requests').select('*').order('created_at', { ascending: false });
          setSupportRequests(data || []);
        } else if (table === 'booking_requests') {
          const { data } = await supabase.from('booking_requests').select('*').order('created_at', { ascending: false });
          setBookingRequests(data || []);
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
        <TabsList className="grid w-full grid-cols-7 lg:grid-cols-7">
          <TabsTrigger value="management">Partner Mgmt</TabsTrigger>
          <TabsTrigger value="submissions">Contact Forms</TabsTrigger>
          <TabsTrigger value="support">Support Requests</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
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

        <TabsContent value="submissions">
          <div className="space-y-6">
            <h2 className="font-heading text-2xl font-semibold">Contact Form Submissions</h2>
            {loadingData ? (
              <div className="text-center py-8">
                <div className="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
              </div>
            ) : contactSubmissions.length === 0 ? (
              <Card>
                <CardContent className="py-8">
                  <p className="text-center text-muted-foreground">No contact submissions yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {contactSubmissions.map((submission) => (
                  <Card key={submission.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{submission.name}</CardTitle>
                        <div className="flex gap-2">
                          <Badge variant="outline">{submission.form_type}</Badge>
                          <Badge variant={submission.status === 'new' ? 'default' : 'secondary'}>
                            {submission.status}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription>
                        Email: {submission.email} • Subject: {submission.subject}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">{submission.message}</p>
                      <div className="flex gap-2 text-xs text-muted-foreground">
                        <span>Submitted: {new Date(submission.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        {submission.status === 'new' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => updateStatus('contact_submissions', submission.id, 'responded')}
                            >
                              Mark as Responded
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateStatus('contact_submissions', submission.id, 'resolved')}
                            >
                              Mark as Resolved
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="support">
          <div className="space-y-6">
            <h2 className="font-heading text-2xl font-semibold">Support Program Requests</h2>
            {loadingData ? (
              <div className="text-center py-8">
                <div className="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
              </div>
            ) : supportRequests.length === 0 ? (
              <Card>
                <CardContent className="py-8">
                  <p className="text-center text-muted-foreground">No support requests yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {supportRequests.map((request) => (
                  <Card key={request.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{request.name}</CardTitle>
                        <div className="flex gap-2">
                          <Badge variant="outline">{request.request_type}</Badge>
                          <Badge variant={request.status === 'new' ? 'default' : 'secondary'}>
                            {request.status}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription>
                        Email: {request.email} • Organization: {request.organization || 'N/A'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-2"><strong>Subject:</strong> {request.subject}</p>
                      <p className="text-sm mb-4">{request.message}</p>
                      {request.additional_data && Object.keys(request.additional_data).length > 0 && (
                        <div className="mt-4 p-3 bg-secondary/20 rounded-lg">
                          <p className="text-xs font-medium mb-2">Additional Details:</p>
                          <div className="text-xs space-y-1">
                            {Object.entries(request.additional_data).map(([key, value]) => (
                              <div key={key}>
                                <strong>{key.replace(/_/g, ' ')}:</strong> {Array.isArray(value) ? value.join(', ') : String(value)}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex gap-2 text-xs text-muted-foreground mt-4">
                        <span>Submitted: {new Date(request.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        {request.status === 'new' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => updateStatus('support_requests', request.id, 'reviewing')}
                            >
                              Mark as Reviewing
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateStatus('support_requests', request.id, 'approved')}
                            >
                              Approve Request
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="bookings">
          <div className="space-y-6">
            <h2 className="font-heading text-2xl font-semibold">Consultation Bookings</h2>
            {loadingData ? (
              <div className="text-center py-8">
                <div className="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
              </div>
            ) : bookingRequests.length === 0 ? (
              <Card>
                <CardContent className="py-8">
                  <p className="text-center text-muted-foreground">No bookings yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {bookingRequests.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{booking.name}</CardTitle>
                        <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                          {booking.status}
                        </Badge>
                      </div>
                      <CardDescription>
                        Email: {booking.email} • Phone: {booking.phone || 'N/A'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium">Date</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(booking.booking_date).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Time</p>
                          <p className="text-sm text-muted-foreground">{booking.booking_time}</p>
                        </div>
                      </div>
                      {booking.message && (
                        <p className="text-sm mb-4">{booking.message}</p>
                      )}
                      <div className="flex gap-2 text-xs text-muted-foreground">
                        <span>Booked: {new Date(booking.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        {booking.status === 'confirmed' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => updateStatus('booking_requests', booking.id, 'completed')}
                            >
                              Mark as Completed
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateStatus('booking_requests', booking.id, 'cancelled')}
                            >
                              Mark as Cancelled
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="organizations">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl font-semibold">Organizations Management</h2>
              <Button onClick={() => window.open('/organizations', '_blank')} variant="outline">
                View Organizations Page
              </Button>
            </div>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  Manage all verified organizations and resources in the platform. Organizations are community partners
                  that provide services and support to our members.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="font-medium mb-1">Quick Actions</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Review organization verifications</li>
                      <li>• Manage contact access permissions</li>
                      <li>• Update organization status</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-secondary/20 rounded-lg">
                    <h3 className="font-medium mb-1">Security Features</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Contact info masking for safety</li>
                      <li>• Access justification requirements</li>
                      <li>• Comprehensive audit logging</li>
                    </ul>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button onClick={() => window.open('/organizations', '_blank')}>
                    <Shield className="h-4 w-4 mr-2" />
                    Manage Organizations
                  </Button>
                  <Button variant="outline" onClick={() => window.open('/add-resource', '_blank')}>
                    Add New Resource
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="email">
          <EmailMarketingDashboard />
        </TabsContent>

        <TabsContent value="security">
          <SecurityMonitoringDashboard />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Admin;