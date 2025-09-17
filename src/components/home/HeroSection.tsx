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
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Forward Focus Elevation
          </h1>
          
          {/* State selector */}
          <div className="mb-8 flex justify-center">
            <button 
              onClick={onShowStateModal} 
              className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm shadow-lg hover:bg-white/20 transition-all duration-300 hover:scale-105" 
              aria-label="Change your state"
            >
              <span>📍</span>
              <span className="text-white">Your state: <strong className="text-white">{selectedState?.name ?? "Ohio"}</strong></span>
              <span className="text-white/70">• Change</span>
            </button>
          </div>
          
          <p className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
            Empowering justice-impacted families with the tools to rebuild and thrive.
          </p>

          <div className="flex items-center justify-center gap-6 text-sm mb-12 flex-wrap">
            <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full">
              <span>🛡️</span>
              Dignity
            </span>
            <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full">
              <span>❤️</span>
              Hope
            </span>
            <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full">
              <span>👥</span>
              Community
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
            <Button size="lg" variant="secondary" className="bg-white text-osu-scarlet hover:bg-white/90" asChild>
              <Link to="/help">Get Help Now</Link>
            </Button>

            <Button 
              size="lg" 
              variant="hero" 
              onClick={onShowAIDiscovery}
            >
              AI Resource Discovery
            </Button>

            <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
              <Link to="/learn">Join Community</Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-white/90">
            <MapPin className="h-4 w-4" aria-hidden />
            <span>AI-enhanced • Trauma-informed • Income-based support</span>
          </div>
        </div>
      </div>
    </section>
  );
};