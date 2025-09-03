import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, User, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useStateContext } from "@/contexts/StateContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { STATES } from "@/data/states";

/** NavLink class helper */
const linkCls = ({ isActive }: { isActive?: boolean } | any) =>
  [
    "transition-colors",
    isActive ? "text-primary font-semibold" : "text-foreground/80 hover:text-foreground"
  ].join(" ");

const Header = () => {
  const { selectedState, setSelectedState } = useStateContext();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // check admin via RPC
  useEffect(() => {
    let ignore = false;
    (async () => {
      if (!user) return setIsAdmin(false);
      try {
        const { data, error } = await supabase.rpc("is_user_admin", { user_id: user.id });
        if (!ignore) setIsAdmin(Boolean(data) && !error);
      } catch {
        if (!ignore) setIsAdmin(false);
      }
    })();
    return () => { ignore = true; };
  }, [user]);

  // helper: set state only if active
  const setIfActive = (code: string) => {
    const found = STATES.find((s) => s.code === code);
    if (found?.active) setSelectedState(found);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Skip link for a11y */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-2 focus:z-[100] focus:rounded-md focus:bg-background focus:px-3 focus:py-1.5 focus:shadow"
      >
        Skip to content
      </a>

      {/* CRISIS BAR */}
      <div className="w-full bg-[#E74C4C] text-white">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between gap-2">
          <p className="text-xs sm:text-sm">
            Need help now? Call <span className="font-semibold">211</span> for local services
            or dial <span className="font-semibold">988</span> for the Suicide &amp; Crisis Lifeline.
          </p>
          <div className="hidden sm:flex items-center gap-2">
            <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">Call 211</Button>
            <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">Find services</Button>
          </div>
        </div>
      </div>

      {/* MAIN NAV */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="flex h-16 items-center gap-3">
            {/* Left: brand + primary links */}
            <div className="flex items-center gap-3">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                    <Menu />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[300px] overflow-y-auto"
                  aria-describedby={undefined}
                >
                  <SheetTitle className="font-heading">Menu</SheetTitle>

                  {/* Mobile selector */}
                  <div className="mt-4">
                    <Select value={selectedState.code} onValueChange={setIfActive}>
                      <SelectTrigger aria-label="Select state">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      {/* Use portal w/ big z so it overlays drawer content */}
                      <SelectContent className="z-[70] bg-popover">
                        <SelectGroup>
                          <SelectLabel>Active</SelectLabel>
                          {STATES.filter((s) => s.active).map((s) => (
                            <SelectItem key={s.code} value={s.code}>{s.name}</SelectItem>
                          ))}
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Coming soon</SelectLabel>
                          {STATES.filter((s) => s.comingSoon).map((s) => (
                            <SelectItem key={s.code} value={s.code} disabled>{s.name}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Mobile links */}
                  <nav className="mt-4 flex flex-col">
                    <NavLink to="/help" className="py-2" onClick={() => setOpen(false)}>Get Help Now</NavLink>
                    <NavLink to="/victim-services" className="py-2" onClick={() => setOpen(false)}>Healing &amp; Safety Hub</NavLink>
                    <NavLink to="/learn" className="py-2" onClick={() => setOpen(false)}>Reentry</NavLink>
                    <NavLink to="/about" className="py-2" onClick={() => setOpen(false)}>About Us</NavLink>

                    {/* Auth area */}
                    <div className="mt-3 border-t pt-3">
                      {user ? (
                        <>
                          <div className="flex items-center gap-2 py-2 text-sm text-muted-foreground">
                            <User className="h-4 w-4" />
                            <span className="truncate">{user.email}</span>
                          </div>
                          {isAdmin && (
                            <NavLink to="/admin" className="py-2" onClick={() => setOpen(false)}>Admin Dashboard</NavLink>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => { signOut(); setOpen(false); }}
                            className="justify-start px-0"
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                          </Button>
                        </>
                      ) : (
                        <NavLink to="/auth" className="py-2" onClick={() => setOpen(false)}>Sign In</NavLink>
                      )}
                    </div>

                    {/* Mobile CTAs */}
                    <Button asChild className="mt-3" variant="secondary">
                      <NavLink to="/partners/submit-referral" onClick={() => setOpen(false)}>Submit Referral</NavLink>
                    </Button>
                    <Button asChild className="mt-2" variant="outline">
                      <NavLink to="/partners/add-resource" onClick={() => setOpen(false)}>Add Resource</NavLink>
                    </Button>
                    <Button asChild className="mt-2">
                      <NavLink to="/support" onClick={() => setOpen(false)}>Support</NavLink>
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>

              <a
                href="/"
                className="min-w-0 shrink-0 font-heading text-base font-semibold tracking-tight whitespace-nowrap"
                aria-label="Forward Focus Elevation home"
              >
                Forward Focus Elevation
              </a>

              <nav
                className="ml-4 hidden min-w-0 flex-1 items-center gap-6 md:flex"
                role="navigation"
                aria-label="Primary"
              >
                <ul className="flex items-center gap-8 whitespace-nowrap text-sm">
                  <li><NavLink to="/help" className={linkCls}>Get Help Now</NavLink></li>
                  <li><NavLink to="/victim-services" className={linkCls}>Healing &amp; Safety Hub</NavLink></li>
                  <li><NavLink to="/learn" className={linkCls}>Reentry</NavLink></li>
                </ul>

                {/* Center selector */}
                <div className="relative ml-auto mr-4">
                  <Select value={selectedState.code} onValueChange={setIfActive}>
                    <SelectTrigger className="w-[140px]" aria-label="Select state">
                      <SelectValue placeholder="Select state" />
                      <ChevronDown className="ml-1 h-4 w-4 opacity-60" />
                    </SelectTrigger>

                    {/* High z-index so it never hides under header */}
                    <SelectContent className="z-[70] bg-background/95 backdrop-blur-sm border shadow-lg">
                      <SelectGroup>
                        <SelectLabel>Active</SelectLabel>
                        {STATES.filter((s) => s.active).map((s) => (
                          <SelectItem key={s.code} value={s.code}>{s.name}</SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Coming soon</SelectLabel>
                        {STATES.filter((s) => s.comingSoon).map((s) => (
                          <SelectItem key={s.code} value={s.code} disabled>{s.name}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <NavLink to="/about" className={linkCls}>About Us</NavLink>
              </nav>
            </div>

            {/* Right actions (desktop) */}
            <div className="ml-auto hidden items-center whitespace-nowrap md:flex">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="mx-1">
                      <User className="mr-2 h-4 w-4" />
                      <span className="max-w-[160px] truncate">{user.email}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="z-[70]">
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
                <NavLink to="/auth" className="mx-2 text-sm text-foreground/80 hover:text-foreground">
                  Sign In
                </NavLink>
              )}

              <div className="ml-2 flex items-center gap-2">
                <Button asChild size="sm" variant="secondary">
                  <NavLink to="/partners/submit-referral">Submit Referral</NavLink>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <NavLink to="/partners/add-resource">Add Resource</NavLink>
                </Button>
                <Button asChild size="sm">
                  <NavLink to="/support">Support</NavLink>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
