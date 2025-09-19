import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, User, LogOut, Search, Globe, Phone, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { CrisisEmergencyBot } from "@/components/ai/CrisisEmergencyBot";

const linkCls = ({
  isActive
}: {
  isActive?: boolean;
} | any) => isActive ? "text-foreground font-medium" : "text-foreground hover:text-foreground/80";

interface HeaderProps {
  showUtility?: boolean;
  showCrisis?: boolean;
}

const Header = ({
  showUtility = true,
  showCrisis = true
}: HeaderProps) => {
  const {
    user,
    signOut
  } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) return setIsAdmin(false);
      try {
        const {
          data
        } = await supabase.rpc("is_user_admin", {
          user_id: user.id
        });
        setIsAdmin(Boolean(data));
      } catch (e) {
        console.error("Error checking admin status:", e);
        setIsAdmin(false);
      }
    };
    checkAdminStatus();
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };
    
    
    window.addEventListener('scroll', handleScroll);
    
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      
    };
  }, [user]);

  // Hide header on auth pages
  if (location.pathname === '/auth' || location.pathname === '/register') {
    return null;
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search page with query
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-osu-gray-light/30 via-cream/50 to-osu-gray-light/20 border-b">
      {/* Crisis Ribbon - removed */}

      {/* Top Utility Bar - removed, replaced with crisis popup */}

      {/* Main Navigation */}
      <div className="bg-gradient-to-r from-osu-gray-light/30 via-cream/50 to-osu-gray-light/20 backdrop-blur-sm border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-12 gap-4 items-center h-16 max-w-full">
            {/* Mobile menu button - Column 1 */}
            <div className="col-span-1 md:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2 hover:bg-white/10">
                    <Menu className="h-5 w-5 text-foreground" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px]">
                  <SheetTitle className="font-heading text-foreground">Menu</SheetTitle>
                  <div className="py-4 space-y-3">
                     {/* Mobile Navigation */}
                    <nav className="space-y-2">
                      <Button variant="ghost" size="sm" asChild className="justify-start w-full">
                        <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
                      </Button>
                      <Button variant="ghost" size="sm" asChild className="justify-start w-full">
                        <NavLink to="/help" onClick={() => setOpen(false)}>Get Help Now</NavLink>
                      </Button>
                      <Button variant="ghost" size="sm" asChild className="justify-start w-full">
                        <NavLink to="/victim-services" onClick={() => setOpen(false)}>Healing Hub</NavLink>
                      </Button>
                      <Button variant="ghost" size="sm" asChild className="justify-start w-full">
                        <NavLink to="/learn" onClick={() => setOpen(false)}>The Collective</NavLink>
                      </Button>
                      <Button variant="ghost" size="sm" asChild className="justify-start w-full">
                        <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
                      </Button>
                    </nav>

                     {/* Mobile Auth */}
                    {user ? <>
                        <div className="flex items-center gap-2 py-2 text-sm text-foreground border-b border-border pb-3">
                          <User className="h-4 w-4" />
                          <span className="truncate">{user.email}</span>
                        </div>
                        {isAdmin && <Button variant="ghost" size="sm" asChild className="justify-start w-full">
                            <NavLink to="/admin" onClick={() => setOpen(false)}>Admin Dashboard</NavLink>
                          </Button>}
                        <Button variant="ghost" size="sm" onClick={() => {
                      signOut();
                      setOpen(false);
                    }} className="justify-start w-full">
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign Out
                        </Button>
                      </> : <div className="flex flex-col space-y-2">
                        {/* Client Portal Mobile */}
                        <div className="border rounded-md p-3">
                          <h4 className="text-sm font-medium mb-2">Client Portal</h4>
                          <div className="flex flex-col space-y-1">
                            <Button variant="ghost" size="sm" asChild className="justify-start w-full">
                              <NavLink to="/auth" onClick={() => setOpen(false)}>Sign In</NavLink>
                            </Button>
                            <Button variant="ghost" size="sm" asChild className="justify-start w-full">
                              <NavLink to="/register" onClick={() => setOpen(false)}>Register</NavLink>
                            </Button>
                          </div>
                        </div>
                        {/* Partner Portal Mobile */}
                        <Button variant="outline" size="sm" asChild className="justify-start w-full">
                          <NavLink to="/partners" onClick={() => setOpen(false)}>Partner Portal</NavLink>
                        </Button>
                      </div>}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo - Columns 2-4 on mobile, 1-3 on desktop */}
            <div className="col-span-10 md:col-span-3 flex justify-center md:justify-start">
              <NavLink to="/" className="flex items-center md:hover:scale-105 transition-all duration-300 group">
                <img 
                  src="/logo-new.png" 
                  alt="Forward Focus Elevation" 
                  className="h-12 w-auto drop-shadow-lg filter brightness-110 contrast-110 group-hover:drop-shadow-xl transition-all duration-300" 
                />
              </NavLink>
            </div>

            {/* Main Navigation - Desktop - Columns 4-8 */}
            <nav className="hidden md:flex col-span-5 items-center justify-center">
              <div className="flex items-center space-x-8 text-sm font-medium">
                <NavLink to="/" className={linkCls}>Home</NavLink>
                <NavLink to="/help" className={linkCls}>Get Help Now</NavLink>
                <NavLink to="/victim-services" className={linkCls}>Healing Hub</NavLink>
                <NavLink to="/learn" className={linkCls}>The Collective</NavLink>
                <NavLink to="/about" className={linkCls}>About</NavLink>
              </div>
            </nav>

            {/* Auth Links - Columns 9-12 */}
            <div className="hidden md:flex col-span-4 items-center justify-end">
              <div className="flex items-center gap-2">
                {user ? <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-foreground font-medium">
                        <User className="mr-2 h-4 w-4" />
                        <span className="max-w-[120px] truncate">{user.email}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="z-[60] bg-background border border-border shadow-lg">
                      {isAdmin && <DropdownMenuItem asChild>
                          <NavLink to="/admin">Admin Dashboard</NavLink>
                        </DropdownMenuItem>}
                      <DropdownMenuItem onClick={signOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu> : <>
                    {/* Client Portal with Tabs */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-foreground font-medium h-9 px-3">
                          Client Portal
                          <ChevronDown className="ml-1 h-3 w-3" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-0 bg-background border border-border shadow-lg z-[60]" align="end">
                        <Tabs defaultValue="signin" className="w-full">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="signin">Sign In</TabsTrigger>
                            <TabsTrigger value="register">Register</TabsTrigger>
                          </TabsList>
                          <TabsContent value="signin" className="p-4">
                            <div className="text-center">
                              <h3 className="text-lg font-semibold mb-2">Sign In</h3>
                              <p className="text-sm text-muted-foreground mb-4">Access your client account</p>
                              <Button asChild className="w-full">
                                <NavLink to="/auth">Continue to Sign In</NavLink>
                              </Button>
                            </div>
                          </TabsContent>
                          <TabsContent value="register" className="p-4">
                            <div className="text-center">
                              <h3 className="text-lg font-semibold mb-2">Register</h3>
                              <p className="text-sm text-muted-foreground mb-4">Create your client account</p>
                              <Button asChild className="w-full">
                                <NavLink to="/register">Continue to Register</NavLink>
                              </Button>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </PopoverContent>
                    </Popover>

                    {/* Partner Portal Link */}
                    <Button variant="ghost" size="sm" asChild className="text-foreground font-medium h-9 px-3">
                      <NavLink to="/partners">Partner Portal</NavLink>
                    </Button>
                  </>}

                  {/* Get Involved CTA */}
                  <Button size="sm" asChild className="bg-[hsl(var(--osu-scarlet))] hover:bg-[hsl(var(--osu-scarlet-dark))] text-white font-medium px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                    <NavLink to="/support">Get Involved</NavLink>
                  </Button>
                </div>
            </div>

            {/* Mobile Get Involved - Column 12 */}
            <div className="col-span-1 md:hidden flex justify-end">
              <Button size="sm" asChild className="bg-[hsl(var(--osu-scarlet))] hover:bg-[hsl(var(--osu-scarlet-dark))] text-white font-medium px-3 py-2 rounded-lg">
                <NavLink to="/support">Join</NavLink>
              </Button>
            </div>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;