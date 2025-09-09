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
} | any) => isActive ? "text-black font-medium" : "text-black hover:text-black/80";
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
  return <header className="sticky top-0 z-50 bg-white border-b">
      {/* Crisis Ribbon - removed */}

      {/* Top Utility Bar - removed, replaced with crisis popup */}

      {/* Main Navigation */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Menu className="h-5 w-5 text-black" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px]">
                  <SheetTitle className="font-heading text-black">Menu</SheetTitle>
                  <div className="py-4 space-y-3">
                    {/* Mobile Navigation */}
                    <nav className="space-y-2">
                      <Button variant="ghost" size="sm" asChild className="justify-start w-full">
                        <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
                      </Button>
                      <Button variant="ghost" size="sm" asChild className="justify-start w-full">
                        <NavLink to="/learn-grow" onClick={() => setOpen(false)}>Join Learning Community</NavLink>
                      </Button>
                        <a 
                          href="https://lovable.dev/projects/b16be8db-8545-4fed-8383-ee8bee4588c1" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="justify-start w-full text-left px-2 py-2 text-sm font-medium text-black hover:bg-muted rounded-md"
                          onClick={() => setOpen(false)}
                        >
                          Healing & Safety
                        </a>
                      <Button variant="ghost" size="sm" asChild className="justify-start w-full">
                        <NavLink to="/submit-referral" onClick={() => setOpen(false)}>Submit Referral</NavLink>
                      </Button>
                      <Button variant="ghost" size="sm" asChild className="justify-start w-full">
                        <NavLink to="/partners" onClick={() => setOpen(false)}>Partner Portal</NavLink>
                      </Button>
                    </nav>

                    {/* Mobile Auth */}
                    {user ? <>
                        <div className="flex items-center gap-2 py-2 text-sm text-black border-b border-border pb-3">
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
                      </> : <div className="flex flex-col space-y-2 px-4">
                        <Button variant="ghost" size="sm" asChild className="justify-start">
                          <NavLink to="/auth" onClick={() => setOpen(false)}>Sign In</NavLink>
                        </Button>
                        <Button variant="outline" size="sm" asChild className="justify-start">
                          <NavLink to="/auth?mode=register" onClick={() => setOpen(false)}>Register</NavLink>
                        </Button>
                      </div>}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo */}
            <div className="logo">
              <NavLink to="/" className="flex items-center">
                <img 
                  src="/lovable-uploads/cced7c01-8b9d-4258-96e7-c91a46a807a4.png" 
                  alt="Forward Focus Elevation" 
                  className="h-16 w-auto"
                />
              </NavLink>
            </div>

            {/* Main Navigation - Desktop */}
            <nav className="hidden md:flex main-nav space-x-8">
              <NavLink to="/" className={linkCls}>Home</NavLink>
              <NavLink to="/learn-grow" className={linkCls}>Join Learning Community</NavLink>
              <a 
                href="https://lovable.dev/projects/b16be8db-8545-4fed-8383-ee8bee4588c1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-black hover:text-black/80"
              >
                Healing & Safety
              </a>
              <NavLink to="/submit-referral" className={linkCls}>Submit Referral</NavLink>
              <NavLink to="/partners" className={linkCls}>Partner Portal</NavLink>
            </nav>

            {/* Auth Links */}
            <div className="auth-links flex items-center space-x-2">
              {user ? <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-black">
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
                </DropdownMenu> : <div className="hidden md:flex items-center space-x-2">
                  <Button variant="ghost" size="sm" asChild className="text-black">
                    <NavLink to="/auth">Sign In</NavLink>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="text-black border-black">
                    <NavLink to="/auth?mode=register">Register</NavLink>
                  </Button>
                </div>}

              {/* Support CTA */}
              <Button size="sm" asChild className="support-link bg-primary hover:bg-primary/90 text-white">
                <NavLink to="/support">Get Support</NavLink>
              </Button>
            </div>
          </div>
        </div>
      </div>

    </header>;
};
export default Header;