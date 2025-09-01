import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useStateContext } from "@/contexts/StateContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { STATES } from "@/data/states";

const linkCls = ({ isActive }: { isActive: boolean }) =>
  isActive ? "text-primary" : "text-foreground/80 hover:text-foreground";

const Header = () => {
  const { selectedState, setSelectedState } = useStateContext();
  const { user, signOut, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }

      try {
        const { data } = await supabase.rpc('is_user_admin', {
          user_id: user.id
        });
        setIsAdmin(data || false);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  return (
    <header className="sticky top-[40px] z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 border-b shadow-sm">
      <div className="container h-16 flex items-center justify-between">
        <a href="/" className="font-heading font-semibold text-lg">Forward Focus Elevation</a>

        <nav className="hidden md:flex items-center gap-12">
          <NavLink to="/help" className={linkCls}>Get Help Now</NavLink>
          
          <NavLink to="/victim-services" className={linkCls}>Healing & Safety Hub</NavLink>
          <NavLink to="/learn" className={linkCls}>Reentry Community</NavLink>
          
          <NavLink to="/about" className={linkCls}>About Us</NavLink>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Select value={selectedState.code} onValueChange={(v) => {
            const found = STATES.find(s => s.code === v);
            if (found && found.active) setSelectedState(found);
          }}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-popover">
              <SelectGroup>
                <SelectLabel>Active</SelectLabel>
                {STATES.filter(s=>s.active).map((s) => (
                  <SelectItem key={s.code} value={s.code}>{s.name}</SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Coming soon</SelectLabel>
                {STATES.filter(s=>s.comingSoon).map((s) => (
                  <SelectItem key={s.code} value={s.code} disabled>{s.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {user.email}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <NavLink to="/admin">Admin Dashboard</NavLink>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <NavLink to="/auth" className={linkCls}>Sign In</NavLink>
          )}
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

        {/* Mobile */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetTitle className="font-heading">Menu</SheetTitle>
              <div className="mt-4 flex flex-col gap-3">
                <Select value={selectedState.code} onValueChange={(v) => {
                  const found = STATES.find(s => s.code === v);
                  if (found && found.active) setSelectedState(found);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-popover">
                    <SelectGroup>
                      <SelectLabel>Active</SelectLabel>
                      {STATES.filter(s=>s.active).map((s) => (
                        <SelectItem key={s.code} value={s.code}>{s.name}</SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Coming soon</SelectLabel>
                      {STATES.filter(s=>s.comingSoon).map((s) => (
                        <SelectItem key={s.code} value={s.code} disabled>{s.name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <NavLink to="/help" onClick={()=>setOpen(false)} className="py-2">Get Help Now</NavLink>
                
                <NavLink to="/victim-services" onClick={()=>setOpen(false)} className="py-2">Healing & Safety Hub</NavLink>
                <NavLink to="/learn" onClick={()=>setOpen(false)} className="py-2">Reentry Community</NavLink>
                
                <NavLink to="/about" onClick={()=>setOpen(false)} className="py-2">About Us</NavLink>
                {user ? (
                  <>
                    <div className="flex items-center gap-2 py-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      {user.email}
                    </div>
                    {isAdmin && (
                      <NavLink to="/admin" onClick={()=>setOpen(false)} className="py-2">Admin Dashboard</NavLink>
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
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <NavLink to="/auth" onClick={()=>setOpen(false)} className="py-2">Sign In</NavLink>
                )}
                <Button asChild className="mt-2" variant="secondary">
                  <NavLink to="/partners/submit-referral" onClick={()=>setOpen(false)}>Submit Referral</NavLink>
                </Button>
                <Button asChild className="mt-2" variant="outline">
                  <NavLink to="/partners/add-resource" onClick={()=>setOpen(false)}>Add Resource</NavLink>
                </Button>
                <Button asChild className="mt-2">
                  <NavLink to="/support" onClick={()=>setOpen(false)}>Support</NavLink>
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
