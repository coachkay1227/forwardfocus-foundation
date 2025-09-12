import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Shield } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";

const PartnerSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/partners");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        toast({
          title: "Sign In Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "Successfully signed in to Partner Portal",
        });
        navigate("/partners");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-osu-scarlet/5 via-background to-osu-gray/5">
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8">
        {/* Partner Portal Hero - Centered and Smaller */}
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-osu-scarlet to-osu-gray rounded-xl flex items-center justify-center shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-osu-scarlet mb-2">
              Partner Portal
            </h1>
            <p className="text-sm text-osu-gray max-w-sm">
              Access your dashboard to track referrals, view impact metrics, and manage your partnership.
            </p>
          </div>
        </div>

        {/* Sign In Form */}
        <Card className="w-full max-w-md mx-auto border-osu-gray/20 shadow-xl">
          <CardHeader className="text-center bg-gradient-to-r from-osu-scarlet/5 to-osu-gray/5">
            <CardTitle className="text-osu-scarlet">Partner Sign In</CardTitle>
            <CardDescription className="text-osu-gray">
              Enter your credentials to access the partner portal
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-osu-gray font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="partner@organization.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-osu-gray/30 focus:border-osu-scarlet focus:ring-osu-scarlet/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-osu-gray font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-osu-gray/30 focus:border-osu-scarlet focus:ring-osu-scarlet/20"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-osu-scarlet/10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-osu-gray" />
                    ) : (
                      <Eye className="h-4 w-4 text-osu-gray" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-osu-scarlet to-osu-gray hover:from-osu-scarlet/90 hover:to-osu-gray/90 text-white font-medium" 
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In to Partner Portal"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-osu-gray">
                Need a partner account?{" "}
                <Link to="/partner-signup" className="text-osu-scarlet hover:underline font-medium">
                  Create Partner Account
                </Link>
              </p>
              <p className="text-sm text-osu-gray mt-2">
                General user?{" "}
                <Link to="/auth" className="text-osu-scarlet hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerSignIn;