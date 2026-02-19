import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Calendar,
  User,
  Building,
  MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface ContactAccessRequest {
  id: string;
  admin_user_id: string;
  organization_id: string;
  status: 'pending' | 'approved' | 'denied' | 'expired';
  access_purpose: string;
  business_justification: string;
  approved_by?: string | null;
  approved_at?: string | null;
  expires_at?: string | null;
  created_at: string;
  updated_at: string;
  // Additional fields from joins
  requester_email?: string;
  organization_name?: string;
}

export const ContactAccessManager = () => {
  const [requests, setRequests] = useState<ContactAccessRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [processingId, setProcessingId] = useState<string | null>(null);
  const { isAdmin } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isAdmin) {
      fetchContactAccessRequests();
    }
  }, [isAdmin]);

  const fetchContactAccessRequests = async () => {
    try {
      // Get contact access requests with related data
      const { data, error } = await supabase
        .from('contact_access_justifications')
        .select(`
          *,
          organizations!contact_access_justifications_organization_id_fkey(name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get requester emails from profiles
      const requesterIds = [...new Set(data?.map(r => r.admin_user_id) || [])];
      
      let userEmails: Record<string, string> = {};
      if (requesterIds.length > 0) {
        const { data: userData } = await supabase
          .from('profiles')
          .select('id, email, full_name')
          .in('id', requesterIds);
        
        userEmails = (userData || []).reduce((acc, user) => {
          acc[user.id] = user.full_name || user.email || 'Unknown User';
          return acc;
        }, {} as Record<string, string>);
      }

      const formattedRequests: ContactAccessRequest[] = (data || []).map(request => ({
        id: request.id,
        admin_user_id: request.admin_user_id,
        organization_id: request.organization_id,
        status: request.status as 'pending' | 'approved' | 'denied' | 'expired',
        access_purpose: request.access_purpose,
        business_justification: request.business_justification,
        approved_by: request.approved_by,
        approved_at: request.approved_at,
        expires_at: request.expires_at,
        created_at: request.created_at,
        updated_at: request.updated_at,
        requester_email: userEmails[request.admin_user_id] || 'Unknown User',
        organization_name: (request.organizations as any)?.name || 'Unknown Organization'
      }));

      setRequests(formattedRequests);
    } catch (error) {
      console.error('Error fetching contact access requests:', error);
      toast({
        title: "Error",
        description: "Failed to load contact access requests",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAction = async (requestId: string, action: 'approved' | 'denied') => {
    setProcessingId(requestId);
    
    try {
      const { error } = await supabase.rpc('approve_admin_contact_access', {
        p_request_id: requestId,
        p_decision: action
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: `Access request ${action} successfully`,
      });

      // Refresh the requests list
      fetchContactAccessRequests();
      
    } catch (error) {
      console.error('Error processing request:', error);
      toast({
        title: "Error",
        description: `Failed to ${action} access request`,
        variant: "destructive",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'denied':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'revoked':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'pending':
        return 'outline';
      case 'approved':
        return 'default';
      case 'denied':
      case 'revoked':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const filteredRequests = requests.filter(request => {
    if (filterStatus === "all") return true;
    return request.status === filterStatus;
  });

  const isExpired = (expiresAt?: string) => {
    return expiresAt && new Date(expiresAt) < new Date();
  };

  if (!isAdmin) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Access Denied</h3>
          <p className="text-muted-foreground">
            Administrator privileges required to manage contact access requests.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading contact access requests...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Contact Access Requests
          </CardTitle>
          <CardDescription>
            Manage partner requests for organization contact information access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Requests</SelectItem>
                <SelectItem value="pending">Pending Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="denied">Denied</SelectItem>
                <SelectItem value="revoked">Revoked</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>Total: {requests.length}</span>
              <span>Pending: {requests.filter(r => r.status === 'pending').length}</span>
              <span>Approved: {requests.filter(r => r.status === 'approved').length}</span>
            </div>
          </div>

          <div className="space-y-4">
            {filteredRequests.length === 0 ? (
              <div className="text-center p-8">
                <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Requests Found</h3>
                <p className="text-muted-foreground">
                  {filterStatus === "all" 
                    ? "No contact access requests have been submitted yet."
                    : `No ${filterStatus} requests found.`
                  }
                </p>
              </div>
            ) : (
              filteredRequests.map((request) => (
                <Card key={request.id} className="border-l-4 border-l-muted">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(request.status)}
                          <Badge variant={getStatusVariant(request.status)}>
                            {request.status.toUpperCase()}
                          </Badge>
                          {request.status === 'approved' && isExpired(request.expires_at) && (
                            <Badge variant="destructive">EXPIRED</Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">Requester:</span>
                              <span>{request.requester_email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Building className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">Organization:</span>
                              <span>{request.organization_name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">Requested:</span>
                              <span>{new Date(request.created_at).toLocaleDateString()}</span>
                            </div>
                            {request.expires_at && (
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Expires:</span>
                                <span className={isExpired(request.expires_at) ? "text-red-500" : ""}>
                                  {new Date(request.expires_at).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-start gap-2 text-sm">
                              <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <div>
                                <span className="font-medium">Purpose:</span>
                                <p className="text-muted-foreground mt-1">{request.access_purpose}</p>
                              </div>
                            </div>
                            {request.business_justification && (
                              <div className="text-sm">
                                <span className="font-medium">Justification:</span>
                                <p className="text-muted-foreground mt-1">{request.business_justification}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {request.status === 'pending' && (
                          <>
                            <Separator />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleRequestAction(request.id, 'approved')}
                                disabled={processingId === request.id}
                                className="flex items-center gap-1"
                              >
                                <CheckCircle className="h-3 w-3" />
                                Approve (90 days)
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRequestAction(request.id, 'denied')}
                                disabled={processingId === request.id}
                                className="flex items-center gap-1"
                              >
                                <XCircle className="h-3 w-3" />
                                Deny
                              </Button>
                            </div>
                          </>
                        )}

                        {request.status === 'approved' && (
                          <>
                            <Separator />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRequestAction(request.id, 'denied')}
                              disabled={processingId === request.id}
                              className="flex items-center gap-1"
                            >
                              <AlertTriangle className="h-3 w-3" />
                              Revoke Access
                            </Button>
                          </>
                        )}

                        {processingId === request.id && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="animate-spin h-3 w-3 border-2 border-primary border-t-transparent rounded-full" />
                            Processing...
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};