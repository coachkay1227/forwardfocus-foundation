import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, User, LogOut, Search, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const linkCls = ({ isActive }: { isActive?: boolean } | any) =>
  isActive ? "text-primary font-medium" : "text-foreground/80 hover:text-foreground";

interface HeaderProps {
  showUtility?: boolean;
  showCrisis?: boolean;
}

const Header = ({ showUtility = true, showCrisis = true }: HeaderProps) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) return setIsAdmin(false);
      try {
        const { data } = await supabase.rpc("is_user_admin", { user_id: user.id });
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, [user]);

  // Hide header on auth pages
  if (location.pathname === '/auth') {
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
    <header className="sticky top-0 z-50 bg-background border-b">
      {/* Crisis Ribbon */}
      {showCrisis && (
        <div className="bg-destructive text-destructive-foreground py-2 px-4 text-center text-sm">
          <span className="font-medium">Emergency? Call </span>
          <a href="tel:911" className="underline hover:no-underline font-semibold">911</a>
          <span className="mx-2">•</span>
          <span>Crisis support: </span>
          <a href="tel:988" className="underline hover:no-underline font-semibold">988</a>
        </div>
      )}

      {/* Utility Bar */}
      {showUtility && (
        <div className="bg-muted/50 border-b py-3">
          <div className="mx-auto w-full max-w-screen-xl px-6">
            <div className="flex items-center justify-between gap-4">
              {/* Help Text */}
              <div className="text-sm text-muted-foreground">
                Need help now? Call{" "}
                <a href="tel:211" className="text-primary hover:underline font-medium">211</a>
                {" "}or{" "}
                <a href="tel:988" className="text-primary hover:underline font-medium">988</a>
                <span className="hidden sm:inline"> for immediate assistance</span>
              </div>

              {/* Search */}
              <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search resources"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-9 bg-background"
                  />
                </div>
              </form>

              {/* Language Select */}
              <Select defaultValue="en">
                <SelectTrigger className="w-auto h-9 bg-background">
                  <Globe className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div className={`transition-shadow duration-300 ${hasScrolled ? 'shadow-sm' : ''}`}>
        <div className="mx-auto w-full max-w-screen-xl px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Left: Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open menu">
                    <Menu />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px]">
                  <SheetTitle className="font-heading">Menu</SheetTitle>
                  <div className="mt-4 flex flex-col gap-3">
                    <NavLink to="/help" onClick={() => setOpen(false)} className="py-2">Get Help Now</NavLink>
                    <NavLink to="/victim-services" onClick={() => setOpen(false)} className="py-2">Healing Hub</NavLink>
                    <NavLink to="/learn" onClick={() => setOpen(false)} className="py-2">Reentry</NavLink>
                    <NavLink to="/about" onClick={() => setOpen(false)} className="py-2">About Us</NavLink>
                    
                    {user ? (
                      <>
                        <div className="flex items-center gap-2 py-2 text-sm text-muted-foreground border-t mt-4 pt-4">
                          <User className="h-4 w-4" />
                          <span className="truncate">{user.email}</span>
                        </div>
                        {isAdmin && (
                          <NavLink to="/admin" onClick={() => setOpen(false)} className="py-2">Admin Dashboard</NavLink>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            signOut();
                            setOpen(false);
                          }}
                          className="justify-start px-0"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <div className="flex flex-col gap-2 border-t mt-4 pt-4">
                        <NavLink to="/auth?mode=register" onClick={() => setOpen(false)} className="py-2">Register</NavLink>
                        <NavLink to="/auth" onClick={() => setOpen(false)} className="py-2">Sign In</NavLink>
                      </div>
                    )}
                    
                    <Button asChild className="mt-2" variant="default">
                      <NavLink to="/support" onClick={() => setOpen(false)}>Support</NavLink>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Center: Brand */}
            <div className="flex items-center justify-center flex-1 md:flex-none">
              <NavLink to="/" className="flex items-center gap-3">
                <img src="/logo.png" alt="Forward Focus Elevation logo" className="h-9 w-auto" />
                <span className="font-heading text-lg font-bold">Forward Focus Elevation</span>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <NavLink to="/help" className={linkCls}>Get Help Now</NavLink>
              <NavLink to="/victim-services" className={linkCls}>Healing Hub</NavLink>
              <NavLink to="/learn" className={linkCls}>Reentry</NavLink>
              <NavLink to="/about" className={linkCls}>About Us</NavLink>
            </nav>

            {/* Right: Auth & Actions */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <User className="mr-2 h-4 w-4" />
                      <span className="max-w-[120px] truncate">{user.email}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="z-[60]">
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <NavLink to="/admin">Admin Dashboard</NavLink>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <NavLink to="/auth" className="text-sm text-foreground/80 hover:text-foreground">
                    Sign In
                  </NavLink>
                  <Button asChild size="sm" variant="outline">
                    <NavLink to="/auth?mode=register">Register</NavLink>
                  </Button>
                </>
              )}
              
              <Button asChild size="sm" variant="default">
                <NavLink to="/support">Support</NavLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;