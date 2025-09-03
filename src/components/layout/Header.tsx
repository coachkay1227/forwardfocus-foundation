import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

// ✅ Works in JS or TS (no inline type annotation in the param)
const linkCls = ({ isActive }: { isActive?: boolean } | any) =>
  isActive ? "text-primary font-medium" : "text-foreground/80 hover:text-foreground";

const Header = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Hide header on auth pages
  if (location.pathname === '/auth') {
    return null;
  }

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

  return (
    <header className={`sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 transition-shadow duration-300 ${hasScrolled ? 'shadow-sm' : ''}`}>
      <div className="mx-auto w-full max-w-screen-xl px-6">
        <div className="flex h-[56px] items-center gap-x-8">
          {/* Left: Logo */}
          <NavLink to="/" className="min-w-0 shrink-0 font-heading text-base font-semibold tracking-tight whitespace-nowrap">
            Home
          </NavLink>

          {/* Center: Nav */}
          <nav className="hidden md:flex items-center gap-x-8">
            <NavLink to="/help" className={linkCls}>Get Help Now</NavLink>
            <NavLink to="/victim-services" className={linkCls}>Healing Hub</NavLink>
            <NavLink to="/learn" className={linkCls}>Reentry</NavLink>
            <NavLink to="/about" className={linkCls}>About Us</NavLink>
          </nav>

          {/* Right: Auth & Support */}
          <div className="ml-auto hidden items-center gap-x-6 md:flex">
            {/* Auth */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="mr-2 h-4 w-4" />
                    <span className="max-w-[160px] truncate">{user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-[60] bg-background border shadow-lg">
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
              <div className="flex items-center gap-x-4">
                <NavLink to="/auth?mode=register" className="text-sm text-foreground/80 hover:text-foreground">Register</NavLink>
                <NavLink to="/auth" className="text-sm text-foreground/80 hover:text-foreground">Sign In</NavLink>
              </div>
            )}

            {/* Support */}
            <Button asChild size="sm" variant="outline" className="rounded-full px-4">
              <NavLink to="/support">Support</NavLink>
            </Button>
          </div>

          {/* Mobile trigger */}
          <div className="ml-auto md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetTitle className="font-heading">Menu</SheetTitle>

                <div className="mt-4 flex flex-col gap-3">
                  {/* Mobile nav */}
                  <NavLink to="/help" onClick={() => setOpen(false)} className="py-2">Get Help Now</NavLink>
                  <NavLink to="/victim-services" onClick={() => setOpen(false)} className="py-2">Healing Hub</NavLink>
                  <NavLink to="/learn" onClick={() => setOpen(false)} className="py-2">Reentry</NavLink>
                  <NavLink to="/about" onClick={() => setOpen(false)} className="py-2">About Us</NavLink>

                  {/* Mobile auth */}
                  {user ? (
                    <>
                      <div className="flex items-center gap-2 py-2 text-sm text-muted-foreground">
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
                    <div className="flex flex-col gap-2">
                      <NavLink to="/auth?mode=register" onClick={() => setOpen(false)} className="py-2">Register</NavLink>
                      <NavLink to="/auth" onClick={() => setOpen(false)} className="py-2">Sign In</NavLink>
                    </div>
                  )}

                  {/* Mobile Support */}
                  <Button asChild className="mt-2" variant="outline">
                    <NavLink to="/support" onClick={() => setOpen(false)}>Support</NavLink>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
