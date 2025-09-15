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
  const {
    signIn,
    user
  } = useAuth();
  const {
    toast
  } = useToast();
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
      const {
        error
      } = await signIn(email, password);
      if (error) {
        toast({
          title: "Sign In Failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "Successfully signed in to Partner Portal"
        });
        navigate("/partners");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
      
      {/* Navigation */}
      

      {/* Main Content - Split Layout */}
      <div className="relative z-10 min-h-[calc(100vh-80px)] grid lg:grid-cols-2">
        {/* Left Side - Hero Content */}
        <div className="flex flex-col justify-center px-8 lg:px-16 py-16 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="max-w-lg ml-auto mr-8">
            {/* Logo/Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg mb-8">
              <Shield className="h-8 w-8 text-white" />
            </div>
            
            {/* Hero Text */}
            <h1 className="font-heading text-4xl lg:text-5xl font-bold mb-6 text-foreground leading-tight">
              Partner Portal
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Access your comprehensive dashboard to track referrals, monitor impact metrics, 
              manage resources, and strengthen community connections.
            </p>
            
            {/* Features List */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Track referral outcomes and success metrics</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">Manage your organization's resource listings</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Access partner network and collaboration tools</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="flex flex-col justify-center px-8 lg:px-16 py-16">
          <div className="max-w-md ml-8 mr-auto w-full">
            {/* Form Header */}
            <div className="text-center mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                Welcome Back
              </h2>
              <p className="text-muted-foreground">
                Sign in to access your partner dashboard
              </p>
            </div>

            {/* Sign In Form */}
            <Card className="border-border/50 shadow-xl bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-medium">Email Address</Label>
                    <Input id="email" type="email" placeholder="partner@organization.com" value={email} onChange={e => setEmail(e.target.value)} required className="h-12 bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
                    <div className="relative">
                      <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required className="h-12 bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20 pr-12" />
                      <Button type="button" variant="ghost" size="sm" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted/50" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-medium shadow-lg" disabled={loading}>
                    {loading ? "Signing in..." : "Access Partner Portal"}
                  </Button>
                </form>

                <div className="mt-8 text-center space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border/50" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">New to the platform?</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Need a partner account?{" "}
                      <Link to="/partner-signup" className="text-primary hover:underline font-medium">
                        Create Account
                      </Link>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      General user?{" "}
                      <Link to="/auth" className="text-primary hover:underline font-medium">
                        Sign in here
                      </Link>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
};
export default PartnerSignIn;