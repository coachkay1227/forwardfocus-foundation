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
        <div className="bg-destructive text-destructive-foreground py-2">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm font-medium">
              🚨 Crisis? Call{" "}
              <a 
                href="tel:911" 
                className="underline hover:no-underline font-bold"
              >
                911
              </a>
              {" "}for emergencies or{" "}
              <a 
                href="tel:988" 
                className="underline hover:no-underline font-bold"
              >
                988
              </a>
              {" "}for mental health support
            </p>
          </div>
        </div>
      )}

      {/* Top Utility Bar */}
      {showUtility && (
        <div className="bg-muted/30 border-b border-border/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-2">
              {/* Left side - Help text */}
              <div className="hidden md:flex items-center text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mr-2" />
                Need help now? Call{" "}
                <a 
                  href="tel:211" 
                  className="mx-1 text-primary hover:underline font-medium"
                >
                  211
                </a>
                {" "}or{" "}
                <a 
                  href="tel:988" 
                  className="ml-1 text-primary hover:underline font-medium"
                >
                  988
                </a>
                ...
              </div>

              {/* Center - Search */}
              <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search resources"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-8 text-sm"
                  />
                </div>
              </form>

              {/* Right side - Language selector */}
              <div className="hidden md:block">
                <Select defaultValue="en">
                  <SelectTrigger className="w-auto h-8 text-sm">
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
        </div>
      )}

      {/* Main Navigation */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px]">
                  <SheetTitle className="font-heading">Menu</SheetTitle>
                  <div className="py-4 space-y-3">
                    {/* Mobile Help Text */}
                    {showUtility && (
                      <div className="px-4 text-sm text-muted-foreground border-b border-border pb-3">
                        <Phone className="h-4 w-4 inline mr-2" />
                        Need help? Call{" "}
                        <a href="tel:211" className="text-primary hover:underline font-medium">
                          211
                        </a>
                        {" "}or{" "}
                        <a href="tel:988" className="text-primary hover:underline font-medium">
                          988
                        </a>
                      </div>
                    )}

                    {/* Mobile Auth */}
                    {user ? (
                      <>
                        <div className="flex items-center gap-2 py-2 text-sm text-muted-foreground border-b border-border pb-3">
                          <User className="h-4 w-4" />
                          <span className="truncate">{user.email}</span>
                        </div>
                        {isAdmin && (
                          <Button variant="ghost" size="sm" asChild className="justify-start w-full">
                            <NavLink to="/admin" onClick={() => setOpen(false)}>Admin Dashboard</NavLink>
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            signOut();
                            setOpen(false);
                          }}
                          className="justify-start w-full"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <div className="flex flex-col space-y-2 px-4">
                        <Button variant="ghost" size="sm" asChild className="justify-start">
                          <NavLink to="/auth" onClick={() => setOpen(false)}>Sign In</NavLink>
                        </Button>
                        <Button variant="outline" size="sm" asChild className="justify-start">
                          <NavLink to="/auth?mode=register" onClick={() => setOpen(false)}>Register</NavLink>
                        </Button>
                      </div>
                    )}

                    {/* Mobile Language */}
                    <div className="px-4 border-t border-border pt-3">
                      <Select defaultValue="en">
                        <SelectTrigger className="w-full">
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
                </SheetContent>
              </Sheet>
            </div>

            {/* Centered Brand */}
            <div className="flex-1 flex justify-center md:justify-center">
              <NavLink to="/" className="flex items-center space-x-3">
                <img 
                  src="/logo.png" 
                  alt="Forward Focus Elevation logo" 
                  className="h-9 w-auto" 
                />
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-primary">
                    Forward Focus Elevation
                  </h1>
                  <p className="text-xs text-muted-foreground -mt-1">
                    Empowering Communities
                  </p>
                </div>
              </NavLink>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2">
              {/* Desktop Language Selector */}
              <div className="hidden lg:block">
                <Select defaultValue="en">
                  <SelectTrigger className="w-auto h-9">
                    <Globe className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Auth Buttons */}
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
                <div className="hidden md:flex items-center space-x-2">
                  <Button variant="ghost" size="sm" asChild>
                    <NavLink to="/auth">Sign In</NavLink>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <NavLink to="/auth?mode=register">Register</NavLink>
                  </Button>
                </div>
              )}

              {/* Support CTA */}
              <Button size="sm" asChild className="bg-primary hover:bg-primary/90">
                <NavLink to="/support">Get Support</NavLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;