import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const SetupGuide = () => {
  return (
    <main id="main" className="container py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="font-heading text-4xl font-bold mb-4">Admin Setup Guide</h1>
          <p className="text-lg text-muted-foreground">
            Follow these steps to set up your admin account and access the dashboard.
          </p>
        </div>

        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            You must complete these steps in order to access admin features.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  1
                </div>
                <CardTitle>Create Your Account</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>
                First, you need to register a regular user account.
              </CardDescription>
              <Link to="/auth">
                <Button className="w-full">
                  Go to Registration <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  2
                </div>
                <CardTitle>Grant Admin Privileges</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>
                After registration, visit the setup page and enter your email to grant yourself admin privileges.
              </CardDescription>
              <Link to="/setup-admin">
                <Button variant="outline" className="w-full">
                  Go to Admin Setup <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  3
                </div>
                <CardTitle>Access Admin Dashboard</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>
                Once you have admin privileges, you can access the full admin dashboard.
              </CardDescription>
              <Link to="/admin">
                <Button variant="outline" className="w-full">
                  Go to Admin Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <CardTitle className="text-green-800">What You'll Get</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• Manage partner organizations and referrals</li>
              <li>• Review and approve partnership requests</li>
              <li>• Access analytics and performance metrics</li>
              <li>• Manage success stories and testimonials</li>
              <li>• Configure email campaigns and notifications</li>
              <li>• Monitor security and system health</li>
              <li>• Control user roles and permissions</li>
            </ul>
          </CardContent>
        </Card>

        <Alert>
          <AlertDescription>
            <strong>Need Help?</strong> If you encounter any issues during setup, check the{" "}
            <Link to="/admin-guide" className="text-primary hover:underline">
              Admin Guide
            </Link>{" "}
            or contact support.
          </AlertDescription>
        </Alert>
      </div>
    </main>
  );
};

export default SetupGuide;
