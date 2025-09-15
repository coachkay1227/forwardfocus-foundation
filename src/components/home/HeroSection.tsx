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
    <section className="relative isolate min-h-[55vh] grid place-items-center bg-gradient-to-br from-osu-scarlet via-osu-scarlet-dark to-black">
      {/* Background image */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[url('/images/diverse-families-community.jpg')] bg-cover bg-center opacity-30" />
      
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Forward Focus Elevation
          </h1>
          
          {/* State selector with improved OSU styling */}
          <div className="mb-6 flex justify-center">
            <button 
              onClick={onShowStateModal} 
              className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm shadow-lg hover:bg-white/20 transition-all duration-300 hover:scale-105" 
              aria-label="Change your state"
            >
              <span>📍</span>
              <span className="text-white">Your state: <strong className="text-osu-gray-light">{selectedState?.name ?? "Ohio"}</strong></span>
              <span className="text-white/70">• Change</span>
            </button>
          </div>
          
          <p className="text-lg md:text-xl text-white/95 font-medium leading-relaxed mb-8 max-w-3xl mx-auto">
            Empowering justice-impacted families with the tools to rebuild and thrive.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Button size="lg" variant="premium" className="h-12 px-6 text-base shadow-xl hover:shadow-2xl transition-all duration-300" asChild>
              <Link to="/help">Get Help Now</Link>
            </Button>

            <Button 
              size="lg" 
              variant="hero" 
              className="h-12 px-6 text-base" 
              onClick={onShowAIDiscovery}
            >
              AI Resource Discovery
            </Button>

            <Button size="lg" variant="outline" className="h-12 px-6 text-base bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
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