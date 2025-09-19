import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, XCircle, AlertTriangle, User, Calendar, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JustificationRequest {
  id: string;
  admin_user_id: string;
  organization_id: string;
  business_justification: string;
  access_purpose: string;
  status: 'pending' | 'approved' | 'denied' | 'expired';
  expires_at: string;
  created_at: string;
  approved_at?: string;
  approved_by?: string;
  // Organization details (joined)
  organization_name?: string;
  // Admin details (would need to be joined from profiles)
}

export const JustificationManager = () => {
  const [requests, setRequests] = useState<JustificationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchRequests = async () => {
    try {
      // Get all justification requests with organization names
      const { data: justifications, error } = await supabase
        .from('contact_access_justifications')
        .select(`
          *,
          organizations!contact_access_justifications_organization_id_fkey(name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform the data to include organization name
      const transformedData = justifications?.map(req => ({
        ...req,
        organization_name: req.organizations?.name || 'Unknown Organization'
      })) || [];

      setRequests(transformedData as JustificationRequest[]);
    } catch (error) {
      console.error('Error fetching justification requests:', error);
      toast({
        title: "Error",
        description: "Failed to load access requests.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDecision = async (requestId: string, decision: 'approved' | 'denied', hoursValid: number = 24) => {
    setProcessingId(requestId);
    try {
      const { error } = await supabase.rpc('approve_admin_contact_access', {
        p_justification_id: requestId,
        p_decision: decision,
        p_hours_valid: hoursValid
      });

      if (error) {
        if (error.message.includes('Cannot approve your own')) {
          toast({
            title: "Self-Approval Blocked",
            description: "You cannot approve your own access request. Another administrator must review it.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Request Processed",
          description: `Access request has been ${decision}.`,
        });
        fetchRequests(); // Refresh the list
      }
    } catch (error) {
      console.error('Error processing request:', error);
      toast({
        title: "Error",
        description: "Failed to process the request.",
        variant: "destructive",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default" className="bg-green-600"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'pending':
        return <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />Pending Review</Badge>;
      case 'denied':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Denied</Badge>;
      case 'expired':
        return <Badge variant="secondary">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const filterRequests = (status: string) => {
    if (status === 'all') return requests;
    return requests.filter(req => req.status === status);
  };

  const RequestCard = ({ request }: { request: JustificationRequest }) => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{request.organization_name}</CardTitle>
            <CardDescription className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDateTime(request.created_at)}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                Admin Request
              </span>
            </CardDescription>
          </div>
          {getStatusBadge(request.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <FileText className="h-4 w-4" />
              Access Purpose
            </div>
            <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
              {request.access_purpose}
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <AlertTriangle className="h-4 w-4" />
              Business Justification
            </div>
            <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
              {request.business_justification}
            </p>
          </div>
        </div>

        {request.status === 'approved' && (
          <div className="bg-green-50 border border-green-200 rounded p-3">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="font-medium text-green-800">
                Approved on {formatDateTime(request.approved_at || '')} - 
                Expires {formatDateTime(request.expires_at)}
              </span>
            </div>
          </div>
        )}

        {request.status === 'pending' && (
          <div className="flex gap-2 pt-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => handleDecision(request.id, 'approved', 24)}
              disabled={processingId === request.id}
              className="bg-green-600 hover:bg-green-700"
            >
              {processingId === request.id ? (
                <div className="animate-spin h-3 w-3 border border-white border-t-transparent rounded-full mr-2" />
              ) : (
                <CheckCircle className="h-3 w-3 mr-2" />
              )}
              Approve (24h)
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDecision(request.id, 'denied')}
              disabled={processingId === request.id}
            >
              <XCircle className="h-3 w-3 mr-2" />
              Deny
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDecision(request.id, 'approved', 72)}
              disabled={processingId === request.id}
            >
              Approve (72h)
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading access requests...</p>
        </CardContent>
      </Card>
    );
  }

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Contact Access Management
          </CardTitle>
          <CardDescription>
            Review and approve administrator requests for organization contact information access.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{pendingCount}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{requests.length}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {requests.filter(r => r.status === 'denied').length}
              </div>
              <div className="text-sm text-muted-foreground">Denied</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Pending ({pendingCount})
          </TabsTrigger>
          <TabsTrigger value="approved">
            <CheckCircle className="h-3 w-3" />
            Approved ({approvedCount})
          </TabsTrigger>
          <TabsTrigger value="denied">
            <XCircle className="h-3 w-3" />
            Denied
          </TabsTrigger>
          <TabsTrigger value="all">All Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {filterRequests('pending').length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p>No pending requests</p>
              </CardContent>
            </Card>
          ) : (
            filterRequests('pending').map(request => (
              <RequestCard key={request.id} request={request} />
            ))
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {filterRequests('approved').map(request => (
            <RequestCard key={request.id} request={request} />
          ))}
        </TabsContent>

        <TabsContent value="denied" className="space-y-4">
          {filterRequests('denied').map(request => (
            <RequestCard key={request.id} request={request} />
          ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {requests.map(request => (
            <RequestCard key={request.id} request={request} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};