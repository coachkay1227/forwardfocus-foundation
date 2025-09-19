import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  selectedState: { name: string } | null;
  onShowStateModal: () => void;
  onShowAIDiscovery: () => void;
}

export const HeroSection = ({ selectedState, onShowStateModal, onShowAIDiscovery }: HeroSectionProps) => {
  return (
    <section className="relative bg-gradient-osu-primary text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-muted/90 via-osu-scarlet/80 to-osu-scarlet-dark/70"></div>
      <div className="absolute inset-0 -z-10 bg-[url('/images/diverse-families-community.jpg')] bg-cover bg-center opacity-30" />
      
      <div className="relative container py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Forward Focus Elevation
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
            Empowering justice-impacted families with the tools to rebuild and thrive.
          </p>

          <div className="flex items-center justify-center gap-8 text-sm mb-12 flex-wrap">
            <span className="flex items-center gap-2 text-white/90">
              <span>🛡️</span>
              Dignity
            </span>
            <span className="flex items-center gap-2 text-white/90">
              <span>❤️</span>
              Hope
            </span>
            <span className="flex items-center gap-2 text-white/90">
              <span>👥</span>
              Community
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-osu-scarlet hover:bg-white/90 flex-1" asChild>
              <Link to="/help">Get Help Now</Link>
            </Button>

            <Button 
              size="lg" 
              variant="hero" 
              onClick={onShowAIDiscovery}
              className="flex-1"
            >
              AI Discovery
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};