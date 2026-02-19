import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Shield, 
  Users, 
  Settings, 
  AlertTriangle, 
  CheckCircle,
  TrendingUp,
  Mail,
  FileText,
  Lock,
  Eye,
  Activity
} from "lucide-react";

const AdminGuide = () => {
  useEffect(() => {
    document.title = "Admin Guide | Forward Focus Elevation";
  }, []);

  return (
    <main id="main" className="container py-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold mb-2">Admin Dashboard Guide</h1>
          <p className="text-muted-foreground text-lg">
            Complete reference for managing the Forward Focus Elevation platform
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <CardTitle>Getting Started</CardTitle>
                </div>
                <CardDescription>
                  Welcome to the admin dashboard. This guide will help you navigate and utilize all features effectively.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Dashboard Sections</h3>
                  <div className="grid gap-3">
                    <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <Badge>Launch</Badge>
                      <div>
                        <p className="font-medium">Launch Readiness</p>
                        <p className="text-sm text-muted-foreground">
                          Complete pre-launch checklist and setup initial admin user
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <Badge>Partner</Badge>
                      <div>
                        <p className="font-medium">Partner Management</p>
                        <p className="text-sm text-muted-foreground">
                          View and manage partner referrals and partnership requests
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <Badge>Forms</Badge>
                      <div>
                        <p className="font-medium">Form Submissions</p>
                        <p className="text-sm text-muted-foreground">
                          Review contact form submissions and respond to inquiries
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <Badge>Analytics</Badge>
                      <div>
                        <p className="font-medium">Analytics Dashboard</p>
                        <p className="text-sm text-muted-foreground">
                          Track user engagement, performance metrics, and website analytics
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Important Note</AlertTitle>
              <AlertDescription>
                Always ensure you have proper justification before accessing sensitive contact information.
                All admin actions are logged for security and audit purposes.
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <CardTitle>Partner Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Managing Referrals</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Navigate to the "Partner" tab to view all referrals</li>
                    <li>Click the eye icon to reveal masked contact information</li>
                    <li>Use status buttons to update referral progress (contacted, completed)</li>
                    <li>Track referral status with real-time updates</li>
                  </ol>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Partnership Requests</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Review incoming partnership applications</li>
                    <li>Verify organization credentials and legitimacy</li>
                    <li>Approve or deny requests with appropriate status updates</li>
                    <li>Track partnership pipeline and conversion metrics</li>
                  </ol>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Partner Verification</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Access the "Verify" tab for verification requests</li>
                    <li>Review submitted documentation and credentials</li>
                    <li>Approve verified partners to unlock additional features</li>
                    <li>Monitor verification status and approval workflow</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  <CardTitle>Email Marketing</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Creating Campaigns</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Navigate to the "Email" tab</li>
                    <li>Create a new campaign with subject and content</li>
                    <li>Preview email before sending</li>
                    <li>Send test emails to verify formatting</li>
                    <li>Send to all active community members</li>
                  </ol>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">AI Image Generation</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Use AI to generate professional marketing images for campaigns:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Describe the image you want to create</li>
                    <li>Click "Generate Image" to create visual content</li>
                    <li>Download and use in email campaigns or marketing materials</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <CardTitle>Success Stories</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Managing Stories</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Access the "Stories" tab to manage success stories</li>
                    <li>Create new stories manually or use AI generation</li>
                    <li>Review and edit AI-generated content before publishing</li>
                    <li>Toggle published status to control visibility</li>
                    <li>Feature important stories on the homepage</li>
                  </ol>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">AI Story Generation</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Generate compelling success stories using AI:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Provide participant details and outcome information</li>
                    <li>Let AI craft a professional narrative</li>
                    <li>Review and customize the generated content</li>
                    <li>Add impact metrics and images</li>
                    <li>Publish when ready</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  <CardTitle>Analytics & Insights</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Key Metrics</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li><strong>Page Views:</strong> Total website traffic and popular pages</li>
                    <li><strong>User Engagement:</strong> Average session duration and bounce rate</li>
                    <li><strong>Form Submissions:</strong> Contact forms, support requests, bookings</li>
                    <li><strong>AI Interactions:</strong> Chatbot usage and AI feature engagement</li>
                    <li><strong>Conversion Funnel:</strong> User journey from visit to conversion</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Performance Monitoring</h3>
                  <p className="text-sm text-muted-foreground">
                    Track website performance metrics including page load times, Core Web Vitals,
                    and resource usage to ensure optimal user experience.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <CardTitle>Security Features</CardTitle>
                </div>
                <CardDescription>
                  Understanding the security measures protecting your platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Contact Access Control</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    All contact information is protected with a justification system:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Contact info is masked by default</li>
                    <li>Admins must provide business justification to access</li>
                    <li>Access requests are logged and monitored</li>
                    <li>Approvals expire after 30 days</li>
                    <li>All access is audited for compliance</li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Audit Logging</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Every admin action is logged with:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>User ID and email</li>
                    <li>Action performed</li>
                    <li>Resource accessed</li>
                    <li>Timestamp and IP address</li>
                    <li>Severity level</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Security Monitoring</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    The system automatically detects:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Multiple failed login attempts</li>
                    <li>Unusual access patterns</li>
                    <li>Expired contact access usage</li>
                    <li>Rate limit violations</li>
                    <li>Suspicious activity alerts</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Rate Limiting</h3>
                  <p className="text-sm text-muted-foreground">
                    Admin operations are rate-limited to 30 actions per minute to prevent abuse
                    and ensure system stability. If you hit rate limits, wait a minute before continuing.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  <CardTitle>Data Privacy</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Handling Sensitive Data</h3>
                  <Alert>
                    <Eye className="h-4 w-4" />
                    <AlertTitle>Privacy Guidelines</AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                        <li>Only access contact information when necessary</li>
                        <li>Never share contact details outside the platform</li>
                        <li>Document the business reason for each access</li>
                        <li>Respect user privacy and data minimization principles</li>
                        <li>Report any suspected data breaches immediately</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="best-practices" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <CardTitle>Best Practices</CardTitle>
                </div>
                <CardDescription>
                  Guidelines for effective platform management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Daily Tasks</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Review new contact submissions within 24 hours</li>
                    <li>Check partner referrals and update statuses</li>
                    <li>Monitor security alerts for unusual activity</li>
                    <li>Respond to urgent support requests</li>
                    <li>Review analytics to spot trends or issues</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Weekly Tasks</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Review and approve partnership applications</li>
                    <li>Verify partner documentation</li>
                    <li>Send email campaigns to community members</li>
                    <li>Review website performance metrics</li>
                    <li>Update success stories with new content</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Monthly Tasks</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Analyze monthly analytics reports</li>
                    <li>Review contact access justifications</li>
                    <li>Audit security logs for compliance</li>
                    <li>Update partner verification statuses</li>
                    <li>Generate impact reports</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Communication Guidelines</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Respond to inquiries professionally and promptly</li>
                    <li>Use templates for common responses</li>
                    <li>Maintain consistent tone and branding</li>
                    <li>Document important communications</li>
                    <li>Follow up on unresolved issues</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  <CardTitle>Troubleshooting</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Common Issues</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-sm">Rate Limit Errors</p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Solution:</strong> Wait 1 minute before continuing operations. 
                        If persistent, contact support.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Cannot Access Contact Information</p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Solution:</strong> Submit a contact access justification request 
                        with business reason. Wait for approval.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Email Campaign Not Sending</p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Solution:</strong> Verify active subscribers exist, check 
                        campaign status, and ensure all required fields are filled.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Analytics Not Loading</p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Solution:</strong> Refresh the page, check your internet connection, 
                        and verify admin permissions are active.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default AdminGuide;
