import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  FileText, 
  Plus, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  BarChart3,
  UserCheck,
  Building2,
  Handshake,
  Target,
  Award
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Import hero image
import partnershipCollaboration from "@/assets/partnership-collaboration.jpg";

interface PartnerStats {
  totalReferrals: number;
  activeReferrals: number;
  completedReferrals: number;
  resourcesAdded: number;
  impactScore: number;
}

const Partners = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<PartnerStats>({
    totalReferrals: 0,
    activeReferrals: 0,
    completedReferrals: 0,
    resourcesAdded: 0,
    impactScore: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Partner Portal | Forward Focus Elevation";
    if (user) {
      fetchPartnerStats();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchPartnerStats = async () => {
    try {
      // Simulate fetching partner statistics
      // In a real app, you'd fetch based on the user's partner organization
      setStats({
        totalReferrals: 24,
        activeReferrals: 7,
        completedReferrals: 17,
        resourcesAdded: 12,
        impactScore: 89,
      });
    } catch (error) {
      console.error("Error fetching partner stats:", error);
      toast({
        title: "Error",
        description: "Failed to load partner statistics.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const partnerBenefits = [
    {
      icon: Users,
      title: "Direct Community Impact",
      description: "Connect directly with justice-impacted individuals seeking support and resources.",
    },
    {
      icon: BarChart3,
      title: "Impact Analytics",
      description: "Track your organization's impact with detailed analytics and success metrics.",
    },
    {
      icon: Handshake,
      title: "Collaborative Network",
      description: "Join a network of partner organizations working together for systemic change.",
    },
    {
      icon: Award,
      title: "Recognition & Visibility",
      description: "Gain recognition as a justice-friendly partner in our community directory.",
    },
  ];

  const quickActions = [
    {
      title: "Submit New Referral",
      description: "Refer someone to our community resources",
      icon: UserCheck,
      href: "/partners/submit-referral",
      variant: "default" as const,
    },
    {
      title: "Add Resource",
      description: "Share a new resource with the community",
      icon: Plus,
      href: "/partners/add-resource",
      variant: "secondary" as const,
    },
    {
      title: "View Resource Directory",
      description: "Browse available community resources",
      icon: FileText,
      href: "/search",
      variant: "outline" as const,
    },
    {
      title: "Request Partnership",
      description: "Apply to become an official partner",
      icon: Building2,
      href: "/partners/request-partnership",
      variant: "outline" as const,
    },
  ];

  if (loading) {
    return (
      <main id="main" className="min-h-screen bg-gradient-to-br from-osu-scarlet/5 via-background to-osu-gray/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-osu-scarlet border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-2 text-osu-gray">Loading partner portal...</p>
        </div>
      </main>
    );
  }

  return (
    <main id="main" className="min-h-screen bg-gradient-to-br from-osu-scarlet/5 via-background to-osu-gray/5">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header with Hero Image */}
        <div className="mb-12">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={partnershipCollaboration} 
              alt="Diverse team of professionals working together on community partnerships"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-osu-scarlet/90 to-osu-gray/80 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-8">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Building2 className="h-12 w-12" />
                  {user && (
                    <Badge variant="secondary" className="text-lg px-4 py-2 inline-flex items-center gap-2 bg-white/20 text-white border-white/30">
                      <CheckCircle className="h-5 w-5" />
                      Authenticated Partner
                    </Badge>
                  )}
                </div>
                <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">Partner Portal</h1>
                <p className="text-2xl leading-relaxed">
                  Collaborate, contribute, and track your impact in our community network
                </p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 bg-osu-gray/10 border border-osu-gray/20">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-osu-scarlet data-[state=active]:text-white text-osu-gray">Dashboard</TabsTrigger>
            <TabsTrigger value="actions" className="data-[state=active]:bg-osu-scarlet data-[state=active]:text-white text-osu-gray">Quick Actions</TabsTrigger>
            <TabsTrigger value="network" className="data-[state=active]:bg-osu-scarlet data-[state=active]:text-white text-osu-gray">Partner Network</TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-osu-scarlet data-[state=active]:text-white text-osu-gray">Resources</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {user ? (
              <>
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="hover:shadow-lg transition-all duration-300 border-osu-gray/20 shadow-md">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4">
                        <div className="p-4 bg-gradient-to-br from-osu-scarlet/20 to-osu-gray/20 rounded-xl">
                          <Users className="h-7 w-7 text-osu-scarlet" />
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-osu-scarlet">{stats.totalReferrals}</div>
                          <div className="text-base font-medium text-osu-gray">Total Referrals</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-all duration-300 border-osu-gray/20 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-osu-scarlet/20 to-osu-gray/20 rounded-lg">
                          <Clock className="h-6 w-6 text-osu-scarlet" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-osu-scarlet">{stats.activeReferrals}</div>
                          <div className="text-sm text-osu-gray">Active</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-all duration-300 border-osu-gray/20 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-osu-scarlet/20 to-osu-gray/20 rounded-lg">
                          <CheckCircle className="h-6 w-6 text-osu-scarlet" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-osu-scarlet">{stats.completedReferrals}</div>
                          <div className="text-sm text-osu-gray">Completed</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-all duration-300 border-osu-gray/20 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-osu-scarlet/20 to-osu-gray/20 rounded-lg">
                          <FileText className="h-6 w-6 text-osu-scarlet" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-osu-scarlet">{stats.resourcesAdded}</div>
                          <div className="text-sm text-osu-gray">Resources Added</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Impact Score */}
                <Card className="border-osu-gray/20 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-osu-scarlet/5 to-osu-gray/5">
                    <CardTitle className="flex items-center gap-2 text-osu-scarlet">
                      <TrendingUp className="h-5 w-5" />
                      Community Impact Score
                    </CardTitle>
                    <CardDescription className="text-osu-gray">
                      Your organization's contribution to community outcomes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-osu-scarlet">{stats.impactScore}/100</span>
                        <Badge variant={stats.impactScore >= 80 ? "default" : "secondary"} className="bg-osu-scarlet text-white">
                          {stats.impactScore >= 80 ? "Excellent" : "Good"}
                        </Badge>
                      </div>
                      <Progress value={stats.impactScore} className="h-3" />
                      <p className="text-sm text-osu-gray">
                        Based on referral success rates, resource quality, and community feedback
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-osu-gray/20 shadow-lg">
                <CardContent className="p-8 text-center">
                  <AlertCircle className="h-12 w-12 text-osu-gray mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-osu-scarlet">Authentication Required</h3>
                  <p className="text-osu-gray mb-6">
                    Please sign in to access your partner dashboard and track your impact.
                  </p>
                  <Button asChild className="bg-gradient-to-r from-osu-scarlet to-osu-gray hover:from-osu-scarlet/90 hover:to-osu-gray/90 text-white">
                    <NavLink to="/partner-signin">Sign In to Partner Portal</NavLink>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Quick Actions Tab */}
          <TabsContent value="actions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow border-osu-gray/20">
                    <CardHeader className="bg-gradient-to-r from-osu-scarlet/5 to-osu-gray/5">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-osu-scarlet/20 to-osu-gray/20 rounded-lg">
                          <IconComponent className="h-6 w-6 text-osu-scarlet" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-osu-scarlet">{action.title}</CardTitle>
                          <CardDescription className="text-osu-gray">{action.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant={action.variant} className="w-full bg-gradient-to-r from-osu-scarlet to-osu-gray hover:from-osu-scarlet/90 hover:to-osu-gray/90 text-white border-osu-gray">
                        <NavLink to={action.href}>
                          {action.title}
                        </NavLink>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Partner Network Tab */}
          <TabsContent value="network" className="space-y-6">
            <Card className="border-osu-gray/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-osu-scarlet/5 to-osu-gray/5">
                <CardTitle className="text-osu-scarlet">Partner Benefits</CardTitle>
                <CardDescription className="text-osu-gray">
                  Discover the advantages of being part of our partner network
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {partnerBenefits.map((benefit, index) => {
                    const IconComponent = benefit.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="p-2 bg-gradient-to-br from-osu-scarlet/20 to-osu-gray/20 rounded-lg">
                          <IconComponent className="h-5 w-5 text-osu-scarlet" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1 text-osu-scarlet">{benefit.title}</h3>
                          <p className="text-sm text-osu-gray">{benefit.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="border-osu-gray/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-osu-scarlet/5 to-osu-gray/5">
                <CardTitle className="text-osu-scarlet">Become a Partner</CardTitle>
                <CardDescription className="text-osu-gray">
                  Join our network of organizations committed to supporting justice-impacted individuals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="bg-osu-gray/10 p-4 rounded-lg border border-osu-gray/20">
                  <h4 className="font-semibold mb-2 text-osu-scarlet">Partnership Requirements</h4>
                  <ul className="text-sm text-osu-gray space-y-1">
                    <li>• Commitment to serving justice-impacted individuals</li>
                    <li>• Demonstrated track record of community service</li>
                    <li>• Agreement to partnership guidelines and standards</li>
                    <li>• Regular participation in network activities</li>
                  </ul>
                </div>
                <div className="flex gap-4">
                  <Button asChild className="bg-gradient-to-r from-osu-scarlet to-osu-gray hover:from-osu-scarlet/90 hover:to-osu-gray/90 text-white">
                    <NavLink to="/partners/request-partnership">
                      Request Partnership
                    </NavLink>
                  </Button>
                  <Button variant="outline" asChild className="border-osu-gray text-osu-gray hover:bg-osu-scarlet hover:text-white">
                    <NavLink to="/organizations">
                      View Partner Directory
                    </NavLink>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-osu-gray/20 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-osu-scarlet/5 to-osu-gray/5">
                  <CardTitle className="text-osu-scarlet">Resource Management</CardTitle>
                  <CardDescription className="text-osu-gray">
                    Add, update, and manage community resources
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <Button asChild className="w-full bg-gradient-to-r from-osu-scarlet to-osu-gray hover:from-osu-scarlet/90 hover:to-osu-gray/90 text-white">
                    <NavLink to="/partners/add-resource">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Resource
                    </NavLink>
                  </Button>
                  <Button variant="outline" asChild className="w-full border-osu-gray text-osu-gray hover:bg-osu-scarlet hover:text-white">
                    <NavLink to="/search">
                      <FileText className="h-4 w-4 mr-2" />
                      Browse Resource Directory
                    </NavLink>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-osu-gray/20 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-osu-scarlet/5 to-osu-gray/5">
                  <CardTitle className="text-osu-scarlet">Resource Guidelines</CardTitle>
                  <CardDescription className="text-osu-gray">
                    Best practices for adding quality resources
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-osu-scarlet mt-0.5" />
                      <span className="text-osu-gray">Provide accurate, up-to-date contact information</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-osu-scarlet mt-0.5" />
                      <span className="text-osu-gray">Include clear descriptions of services offered</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-osu-scarlet mt-0.5" />
                      <span className="text-osu-gray">Specify eligibility requirements and limitations</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-osu-scarlet mt-0.5" />
                      <span className="text-osu-gray">Indicate if services are justice-friendly</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};
export default Partners;
