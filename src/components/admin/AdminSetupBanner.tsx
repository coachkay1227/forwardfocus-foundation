import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const AdminSetupBanner = () => {
  const [adminExists, setAdminExists] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminExists();
  }, []);

  const checkAdminExists = async () => {
    try {
      const { data } = await supabase.rpc('check_admin_exists');
      setAdminExists(data || false);
    } catch (error) {
      console.error('Error checking admin exists:', error);
      setAdminExists(true); // Assume exists to avoid false alarms
    } finally {
      setLoading(false);
    }
  };

  // Don't show anything while loading or if admin exists
  if (loading || adminExists) {
    return null;
  }

  return (
    <Alert className="border-orange-200 bg-orange-50 mb-6">
      <AlertTriangle className="h-4 w-4 text-orange-600" />
      <AlertTitle className="text-orange-800">Admin Setup Required</AlertTitle>
      <AlertDescription className="text-orange-700 flex items-center justify-between">
        <span>
          No administrator account has been configured yet. Set up the first admin to manage this application.
        </span>
        <Button
          size="sm"
          variant="outline"
          className="ml-4 border-orange-300 hover:bg-orange-100"
          onClick={() => navigate('/setup-admin')}
        >
          <Shield className="h-4 w-4 mr-2" />
          Setup Admin
        </Button>
      </AlertDescription>
    </Alert>
  );
};
