import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useStateContext } from "@/contexts/StateContext";
import { STATES } from "@/data/states";

const linkCls = ({ isActive }: { isActive: boolean }) =>
  isActive ? "text-primary" : "text-foreground/80 hover:text-foreground";

const Header = () => {
  const { selectedState, setSelectedState } = useStateContext();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
      <div className="container h-16 flex items-center justify-between">
        <a href="/" className="font-heading font-semibold text-lg">Forward Focus Elevation</a>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/help" className={linkCls}>Get Help Now</NavLink>
          <NavLink to="/ohio-resources" className={linkCls}>{selectedState.name} Resources</NavLink>
          <NavLink to="/victim-services" className={linkCls}>Victim Services</NavLink>
          <NavLink to="/learn" className={linkCls}>Learn & Grow</NavLink>
          <NavLink to="/community" className={linkCls}>Join Community</NavLink>
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

          <NavLink to="/login" className={linkCls}>Member Login</NavLink>
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
                <NavLink to="/ohio-resources" onClick={()=>setOpen(false)} className="py-2">{selectedState.name} Resources</NavLink>
                <NavLink to="/victim-services" onClick={()=>setOpen(false)} className="py-2">Victim Services</NavLink>
                <NavLink to="/learn" onClick={()=>setOpen(false)} className="py-2">Learn & Grow</NavLink>
                <NavLink to="/community" onClick={()=>setOpen(false)} className="py-2">Join Community</NavLink>
                <NavLink to="/about" onClick={()=>setOpen(false)} className="py-2">About Us</NavLink>
                <NavLink to="/login" onClick={()=>setOpen(false)} className="py-2">Member Login</NavLink>
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
