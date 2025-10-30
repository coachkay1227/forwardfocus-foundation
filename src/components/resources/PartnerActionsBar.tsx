import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const PartnerActionsBar = () => {
  return (
    <section aria-label="Partner actions" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Button asChild size="lg" variant="secondary">
        <NavLink to="/partners/submit-referral">Submit a Referral</NavLink>
      </Button>
      <Button asChild size="lg" variant="outline">
        <NavLink to="/partners/add-resource">Add a Resource</NavLink>
      </Button>
      <Button asChild size="lg" variant="ghost">
        <NavLink to="/partner-signin">Partner Login</NavLink>
      </Button>
      <Button asChild size="lg">
        <NavLink to="/partners/request">Request Partnership</NavLink>
      </Button>
    </section>
  );
};

export default PartnerActionsBar;
