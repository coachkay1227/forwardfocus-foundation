const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-10 grid gap-8 md:grid-cols-4">
        <div>
          <div className="font-heading font-semibold">Forward Focus Elevation</div>
          <p className="mt-3 text-sm text-muted-foreground">Empowering justice-impacted families with the tools to rebuild and thrive.</p>
        </div>
        <nav>
          <div className="font-medium">Explore</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="/help" className="hover:underline">Get Help Now</a></li>
            <li><a href="/ohio-resources" className="hover:underline">Ohio Resources</a></li>
            <li><a href="/learn" className="hover:underline">Learn & Grow</a></li>
            <li><a href="/community" className="hover:underline">Join Community</a></li>
          </ul>
        </nav>
        <div>
          <div className="font-medium">Emergency</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="tel:988" className="hover:underline">988 Suicide & Crisis Lifeline</a></li>
            <li><a href="tel:18007997233" className="hover:underline">National DV Hotline: 1-800-799-7233</a></li>
            <li><a href="tel:211" className="hover:underline">Call 211 for local services</a></li>
          </ul>
        </div>
        <div>
          <div className="font-medium">Legal</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container py-4 text-xs text-muted-foreground">© {new Date().getFullYear()} Forward Focus Elevation. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
