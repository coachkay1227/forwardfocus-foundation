import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, User, LogOut, Search, Globe, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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
    return () => window.removeEventListener('scroll', handleScroll);
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
  return <header className="sticky top-0 z-50 bg-white border-b">
      {/* Crisis Ribbon - removed */}

      {/* Top Utility Bar - removed, replaced with crisis popup */}

      {/* Main Navigation */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-18">
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
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
                      <Button variant="ghost" size="sm" asChild className="justify-start w-full">
                        <NavLink to="/partners" onClick={() => setOpen(false)}>Partner Portal</NavLink>
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
                        <Button variant="ghost" size="sm" asChild className="justify-start w-full">
                          <NavLink to="/auth" onClick={() => setOpen(false)}>Sign In</NavLink>
                        </Button>
                        <Button variant="outline" size="sm" asChild className="justify-start w-full">
                          <NavLink to="/register" onClick={() => setOpen(false)}>Register</NavLink>
                        </Button>
                      </div>}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo */}
            <div className="logo flex-1 md:flex-none">
              <NavLink to="/" className="font-heading text-xl font-bold text-[hsl(var(--osu-scarlet))] hover:text-[hsl(var(--osu-scarlet-dark))] transition-colors">
                Forward Focus Elevation
              </NavLink>
            </div>

            {/* Main Navigation - Desktop */}
            <nav className="hidden md:flex main-nav items-center space-x-1 lg:space-x-2 xl:space-x-4 text-sm lg:text-base font-medium">
              <NavLink to="/" className={linkCls}>Home</NavLink>
              <NavLink to="/help" className={linkCls}>Get Help Now</NavLink>
              <NavLink to="/victim-services" className={linkCls}>Healing Hub</NavLink>
              <NavLink to="/learn" className={linkCls}>The Collective</NavLink>
              <NavLink to="/about" className={linkCls}>About</NavLink>
              <NavLink to="/partners" className={linkCls}>Partner Portal</NavLink>
            </nav>

            {/* Auth Links */}
            <div className="auth-links flex items-center gap-3">
              {user ? <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-foreground font-medium">
                      <User className="mr-2 h-4 w-4" />
                      <span className="max-w-[120px] truncate">{user.email}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="z-[60]">
                    {isAdmin && <DropdownMenuItem asChild>
                        <NavLink to="/admin">Admin Dashboard</NavLink>
                      </DropdownMenuItem>}
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> : <div className="hidden md:flex flex-col items-end gap-1">
                  <Button variant="ghost" size="sm" asChild className="text-foreground font-medium h-8 px-3">
                    <NavLink to="/auth">Sign In</NavLink>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="h-8 px-3 border-[hsl(var(--osu-scarlet))] text-[hsl(var(--osu-scarlet))] hover:bg-[hsl(var(--osu-scarlet))] hover:text-white">
                    <NavLink to="/register">Register</NavLink>
                  </Button>
                </div>}

              {/* Support CTA */}
              <Button size="sm" asChild className="support-link bg-[hsl(var(--osu-scarlet))] hover:bg-[hsl(var(--osu-scarlet-dark))] text-white font-medium px-4 h-9">
                <NavLink to="/support">Get Support</NavLink>
              </Button>
            </div>
          </div>
        </div>
      </div>

    </header>;
};
export default Header;