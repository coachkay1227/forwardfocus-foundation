import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PartnerVerificationManager } from '@/components/admin/PartnerVerificationManager';
import { RequestPartnerVerification } from '@/components/security/RequestPartnerVerification';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';

export const SecurityDashboard: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user && isAdmin) {
        try {
          const adminStatus = await isAdmin();
          setIsUserAdmin(adminStatus);
        } catch (error) {
          console.error('Failed to check admin status:', error);
        }
      }
      setLoading(false);
    };

    checkAdminStatus();
  }, [user, isAdmin]);

  if (loading) {
    return <div className="p-6">Loading security dashboard...</div>;
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            Please sign in to access the security dashboard
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Security Dashboard</h1>
        {isUserAdmin && (
          <Badge variant="outline" className="bg-success text-success-foreground">
            Administrator
          </Badge>
        )}
      </div>

      <Tabs defaultValue={isUserAdmin ? "admin" : "user"} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="user">User Access</TabsTrigger>
          {isUserAdmin && <TabsTrigger value="admin">Admin Panel</TabsTrigger>}
        </TabsList>

        <TabsContent value="user" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Partner Access Status</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Manage your partner verification status and access to sensitive contact information
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Contact Data Access</h3>
                      <p className="text-sm text-muted-foreground">
                        Access to organization email and phone numbers
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-warning text-warning-foreground">
                      Verification Required
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <RequestPartnerVerification />
          </div>
        </TabsContent>

        {isUserAdmin && (
          <TabsContent value="admin" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Administration</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Manage partner verifications and security access controls
                </p>
              </CardHeader>
            </Card>
            
            <PartnerVerificationManager />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};