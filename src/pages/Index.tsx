import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, User, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { useStateContext } from "@/contexts/StateContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { STATES } from "@/data/states";

/** Works in JS or TS */
const linkCls = ({ isActive }: { isActive?: boolean } | any) =>
  isActive ? "text-primary font-medium" : "text-foreground/80 hover:text-foreground";

const Header = () => {
  const { selectedState, setSelectedState } = useStateContext();
  const { user, signOut } = useAuth();

  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) return setIsAdmin(false);
      try {
        const { data } = await supabase.rpc("is_user_admin", { user_id: user.id });
        setIsAdmin(Boolean(data));
      } catch (err) {
        console.error("Error checking admin status:", err);
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, [user]);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <div className="mx-auto w-full max-w-7xl px-4">
        {/* === Bar: logo | nav | utilities === */}
        <div className="flex h-16 items-center gap-3">
          {/* Left: Logo */}
          <a
            href="/"
            className="min-w-0 shrink-0 font-heading text-base font-semibold tracking-tight whitespace-nowrap"
          >
            Forward Focus Elevation
          </a>

          {/* Center: Primary nav (z-20 so its dropdowns can sit above neighbors) */}
          <nav className="ml-4 hidden min-w-0 flex-1 items-center md:flex">
            <ul className="relative z-20 flex items-center gap-8 whitespace-nowrap text-sm">
              <li>
                <NavLink to="/help" className={linkCls}>
                  Get Help Now
                </NavLink>
              </li>
              <li>
                <NavLink to="/victim-services" className={linkCls}>
                  Healing &amp; Safety Hub
                </NavLink>
              </li>
              <li>
                <NavLink to="/learn" className={linkCls}>
                  Reentry Community
                </NavLink>
              </li>

              {/* About as a dropdown — give its menu a higher z than Select portal */}
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-foreground/80 hover:text-foreground">
                    About Us
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    sideOffset={8}
                    className="z-[80] w-64" // higher than Select trigger & Radix default z-50
                  >
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
              </li>
            </ul>
          </nav>

          {/* Right: Utilities / CTAs */}
          <div className="ml-auto hidden items-center whitespace-nowrap md:flex">
            {/* State selector — lower z-index on trigger so it doesn't cover menus */}
            <Select
              value={selectedState.code}
              onValueChange={(v) => {
                const found = STATES.find((s) => s.code === v);
                if (found?.active) setSelectedState(found);
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

            {/* Auth */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="mx-1">
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
              <NavLink to="/auth" className="mx-2 text-sm text-foreground/80 hover:text-foreground">
                Sign In
              </NavLink>
            )}

            {/* CTA group */}
            <div className="ml-2 flex items-center gap-2">
              <Button asChild size="sm" variant="secondary">
                <NavLink to="/partners/submit-referral">Submit Referral</NavLink>
              </Button>
              <Button asChild size="sm" variant="outline" className="hidden lg:inline-flex">
                <NavLink to="/partners/add-resource">Add Resource</NavLink>
              </Button>
              <Button asChild size="sm">
                <NavLink to="/support">Support</NavLink>
              </Button>
            </div>
          </div>

          {/* Mobile menu trigger */}
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
                  {/* Mobile state selector */}
                  <Select
                    value={selectedState.code}
                    onValueChange={(v) => {
                      const found = STATES.find((s) => s.code === v);
                      if (found?.active) setSelectedState(found);
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

                  {/* Mobile nav */}
                  <NavLink to="/help" onClick={() => setOpen(false)} className="py-2">
                    Get Help Now
                  </NavLink>
                  <NavLink to="/victim-services" onClick={() => setOpen(false)} className="py-2">
                    Healing &amp; Safety Hub
                  </NavLink>
                  <NavLink to="/learn" onClick={() => setOpen(false)} className="py-2">
                    Reentry Community
                  </NavLink>

                  {/* About section links (flat for mobile) */}
                  <div className="pt-2">
                    <div className="mb-1 text-xs font-semibold uppercase text-muted-foreground">About</div>
                    <NavLink to="/about" onClick={() => setOpen(false)} className="block py-2">
                      About Forward Focus Elevation
                    </NavLink>
                    <NavLink to="/team" onClick={() => setOpen(false)} className="block py-2">
                      Our Team
                    </NavLink>
                    <NavLink to="/partners" onClick={() => setOpen(false)} className="block py-2">
                      Partners
                    </NavLink>
                  </div>

                  {/* Auth */}
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
                  <Button asChild className="mt-2" variant="outline">
                    <NavLink to="/partners/add-resource" onClick={() => setOpen(false)}>
                      Add Resource
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
      </div>
    </header>
  );
};

export default Header;
