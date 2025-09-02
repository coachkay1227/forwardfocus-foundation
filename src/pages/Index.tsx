import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, User, LogOut, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useStateContext } from "@/contexts/StateContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { STATES } from "@/data/states";

const linkCls = ({ isActive }: { isActive?: boolean } | any) =>
  isActive ? "text-primary font-semibold" : "text-foreground/80 hover:text-foreground";

const Header = () => {
  const { selectedState, setSelectedState } = useStateContext();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) return setIsAdmin(false);
      try {
        const { data } = await supabase.rpc("is_user_admin", { user_id: user.id });
        setIsAdmin(Boolean(data));
      } catch (e) {
        console.error(e);
        setIsAdmin(false);
      }
    };
    checkAdminStatus();
  }, [user]);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      {/* Unified emergency bar */}
      <div className="bg-red-500 text-white py-2 px-4 text-center text-sm">
        Need help now? Call 211 for local services, dial 988 for the Suicide &amp; Crisis Lifeline, or text HOME to 741741.
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        {/* Logo */}
        <a href="/" className="font-heading text-base font-semibold tracking-tight whitespace-nowrap">
          Forward Focus Elevation
        </a>

        {/* Desktop navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-8 text-sm">
          <NavLink to="/" className={linkCls}>Home</NavLink>
          <NavLink to="/help" className={linkCls}>Get Help</NavLink>
          <NavLink to="/victim-services" className={linkCls}>Healing Hub</NavLink>
          <NavLink to="/learn" className={linkCls}>Reentry</NavLink>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-foreground/80 hover:text-foreground">About</DropdownMenuTrigger>
            <DropdownMenuContent align="start" sideOffset={6} className="z-[80] w-56">
              <DropdownMenuItem asChild>
                <NavLink to="/about">About Forward Focus Elevation</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink to="/team">Our Team</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink to="/partners">Partners</NavLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Desktop utilities */}
        <div className="hidden md:flex items-center gap-3 whitespace-nowrap">
          {/* State picker */}
          <Select
            value={selectedState.code}
            onValueChange={(code) => {
              const next = STATES.find((s) => s.code === code);
              if (next?.active) setSelectedState(next);
            }}
          >
            <SelectTrigger className="w-[160px] relative z-10">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-popover">
              <SelectGroup>
                <SelectLabel>Active</SelectLabel>
                {STATES.filter((s) => s.active).map((s) => (
                  <SelectItem key={s.code} value={s.code}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Coming soon</SelectLabel>
                {STATES.filter((s) => s.comingSoon).map((s) => (
                  <SelectItem key={s.code} value={s.code} disabled>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Sign in / user menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  <span className="max-w-[160px] truncate">{user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-[80]">
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
            <NavLink to="/auth" className="text-sm text-foreground/80 hover:text-foreground">
              Sign In
            </NavLink>
          )}

          {/* CTA buttons */}
          <Button asChild size="sm" variant="secondary">
            <NavLink to="/partners/submit-referral">Submit Referral</NavLink>
          </Button>
          <Button asChild size="sm">
            <NavLink to="/support">Support</NavLink>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <div className="ml-auto md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetTitle className="font-heading">Menu</SheetTitle>
              <div className="mt-4 flex flex-col gap-3">
                <Select
                  value={selectedState.code}
                  onValueChange={(code) => {
                    const next = STATES.find((s) => s.code === code);
                    if (next?.active) setSelectedState(next);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-popover">
                    <SelectGroup>
                      <SelectLabel>Active</SelectLabel>
                      {STATES.filter((s) => s.active).map((s) => (
                        <SelectItem key={s.code} value={s.code}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Coming soon</SelectLabel>
                      {STATES.filter((s) => s.comingSoon).map((s) => (
                        <SelectItem key={s.code} value={s.code} disabled>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {/* Mobile nav links */}
                <NavLink to="/" onClick={() => setOpen(false)} className="py-2">
                  Home
                </NavLink>
                <NavLink to="/help" onClick={() => setOpen(false)} className="py-2">
                  Get Help
                </NavLink>
                <NavLink to="/victim-services" onClick={() => setOpen(false)} className="py-2">
                  Healing Hub
                </NavLink>
                <NavLink to="/learn" onClick={() => setOpen(false)} className="py-2">
                  Reentry
                </NavLink>
                <NavLink to="/about" onClick={() => setOpen(false)} className="py-2">
                  About
                </NavLink>

                {/* Mobile user controls */}
                {user ? (
                  <>
                    <div className="flex items-center gap-2 py-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    {isAdmin && (
                      <NavLink to="/admin" onClick={() => setOpen(false)} className="py-2">
                        Admin Dashboard
                      </NavLink>
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
                  <NavLink to="/auth" onClick={() => setOpen(false)} className="py-2">
                    Sign In
                  </NavLink>
                )}

                {/* Mobile CTAs */}
                <Button asChild className="mt-2" variant="secondary">
                  <NavLink to="/partners/submit-referral" onClick={() => setOpen(false)}>
                    Submit Referral
                  </NavLink>
                </Button>
                <Button asChild className="mt-2">
                  <NavLink to="/support" onClick={() => setOpen(false)}>
                    Support
                  </NavLink>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
