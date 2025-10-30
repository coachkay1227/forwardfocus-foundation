import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Loader2, RefreshCw } from "lucide-react";

interface ExistingVerification {
  organization_name: string;
  organization_type: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  notes: string | null;
  expires_at: string;
}

export default function RenewVerification() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [existingVerification, setExistingVerification] = useState<ExistingVerification | null>(null);
  const [formData, setFormData] = useState({
    organizationName: "",
    organizationType: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    notes: "",
  });

  useEffect(() => {
    document.title = "Renew Verification | Forward Focus Elevation";
    if (user) {
      fetchExistingVerification();
    }
  }, [user]);

  const fetchExistingVerification = async () => {
    try {
      const { data, error } = await supabase
        .from('partner_verifications')
        .select('*')
        .eq('user_id', user?.id)
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setExistingVerification(data as ExistingVerification);
        // Pre-fill form with existing data
        setFormData({
          organizationName: data.organization_name || "",
          organizationType: data.organization_type || "",
          contactName: data.contact_name || "",
          contactEmail: data.contact_email || "",
          contactPhone: data.contact_phone || "",
          notes: data.notes || "",
        });
      } else {
        toast({
          title: "No Verification Found",
          description: "You don't have an existing verification to renew.",
          variant: "destructive",
        });
        navigate('/partners/request-verification');
      }
    } catch (error) {
      console.error('Error fetching verification:', error);
      toast({
        title: "Error",
        description: "Failed to load existing verification data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('partner_verifications')
        .insert({
          user_id: user?.id,
          organization_name: formData.organizationName,
          organization_type: formData.organizationType,
          contact_name: formData.contactName,
          contact_email: formData.contactEmail,
          contact_phone: formData.contactPhone,
          notes: formData.notes + '\n\n[RENEWAL REQUEST]',
          status: 'pending',
        });

      if (error) throw error;

      toast({
        title: "Renewal Submitted",
        description: "Your verification renewal request has been submitted successfully. You'll be notified once it's reviewed.",
      });

      navigate('/partner-dashboard');
    } catch (error: any) {
      console.error('Error submitting renewal:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit renewal request.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main id="main" className="container py-12">
        <div className="max-w-2xl mx-auto text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading verification data...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    navigate('/partner-signin');
    return null;
  }

  return (
    <main id="main" className="container py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <RefreshCw className="h-6 w-6 text-osu-scarlet" />
              <CardTitle className="text-2xl">Renew Partner Verification</CardTitle>
            </div>
            <CardDescription>
              Update your information and renew your partner verification for another year.
              {existingVerification && (
                <span className="block mt-2 text-sm">
                  Current verification expires: {new Date(existingVerification.expires_at).toLocaleDateString()}
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="organizationName">Organization Name *</Label>
                <Input
                  id="organizationName"
                  value={formData.organizationName}
                  onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizationType">Organization Type *</Label>
                <Select
                  value={formData.organizationType}
                  onValueChange={(value) => setFormData({ ...formData, organizationType: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="non-profit">Non-Profit</SelectItem>
                    <SelectItem value="government">Government Agency</SelectItem>
                    <SelectItem value="community">Community Organization</SelectItem>
                    <SelectItem value="educational">Educational Institution</SelectItem>
                    <SelectItem value="faith-based">Faith-Based Organization</SelectItem>
                    <SelectItem value="healthcare">Healthcare Provider</SelectItem>
                    <SelectItem value="legal">Legal Services</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Person Name *</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes or Updates</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any changes or updates since your last verification?"
                  className="min-h-[120px]"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-osu-scarlet hover:bg-osu-scarlet-dark"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Renewal Request'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/partner-dashboard')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
