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
      <div className="absolute inset-0 bg-gradient-to-br from-osu-gray/90 via-osu-scarlet/80 to-osu-scarlet-dark/70"></div>
      <div className="absolute inset-0 -z-10 bg-[url('/images/diverse-families-community.jpg')] bg-cover bg-center opacity-20" />
      
      <div className="relative container py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Forward Focus Elevation
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto">
            Empowering justice-impacted families with the tools to rebuild and thrive.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
            <Button size="lg" variant="secondary" className="bg-osu-gray text-white hover:bg-osu-gray-dark" asChild>
              <Link to="/help">Get Help Now</Link>
            </Button>

            <Button 
              size="lg" 
              variant="outline" 
              className="bg-osu-gray/20 border-osu-gray/30 text-white hover:bg-osu-gray/30"
              onClick={onShowAIDiscovery}
            >
              AI Discovery
            </Button>
          </div>

          <div className="text-sm text-white/80">
            AI-enhanced • Trauma-informed • Income-based support
          </div>
        </div>
      </div>
    </section>
  );
};