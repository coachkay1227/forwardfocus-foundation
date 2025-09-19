import { useEffect, useMemo, useState } from "react";
import { useStateContext } from "@/contexts/StateContext";
import AIResourceDiscovery from "@/components/ai/AIResourceDiscovery";
import StateModal from "@/components/ui/StateModal";
import { HeroSection } from "@/components/home/HeroSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PathwaysSection } from "@/components/home/PathwaysSection";
import { CallToActionSection } from "@/components/home/CallToActionSection";

import { STATES } from "@/data/states";
import diverseCommunityMeeting from "@/assets/diverse-community-meeting.jpg";
const Index = () => {
  const [showAIDiscovery, setShowAIDiscovery] = useState(false);
  const [showStateModal, setShowStateModal] = useState(false);
  const { selectedState, setSelectedState } = useStateContext();

  // SEO setup
  useEffect(() => {
    document.title = "Forward Focus Elevation | Empowering Justice-Impacted Families";
    const desc = "Empowering justice-impacted families with the tools to rebuild and thrive. AI-enhanced guidance and comprehensive resources for justice-impacted individuals, families, and crime victims.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      canonical.href = window.location.href;
      document.head.appendChild(canonical);
    }
  }, []);

  const stateForAI = selectedState?.name ?? "Ohio";
  return (
    <main id="main" className="min-h-screen bg-background">
      <HeroSection 
        selectedState={selectedState}
        onShowStateModal={() => setShowStateModal(true)}
        onShowAIDiscovery={() => setShowAIDiscovery(true)}
      />
      
      
      <PathwaysSection />
      <TestimonialsSection />
      <CallToActionSection />
      
      {/* Community Image Section */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container px-4">
          <div className="relative rounded-2xl overflow-hidden shadow-xl max-w-5xl mx-auto">
            <img 
              src={diverseCommunityMeeting} 
              alt="Diverse community members meeting and supporting each other"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-secondary/60 flex items-center justify-center">
              <div className="text-center text-primary-foreground max-w-3xl px-8">
                <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Building Stronger Communities Together</h2>
                <p className="text-lg leading-relaxed">
                  Join our network of support, healing, and empowerment as we create pathways to brighter futures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AIResourceDiscovery 
        isOpen={showAIDiscovery} 
        onClose={() => setShowAIDiscovery(false)} 
        initialQuery="" 
        location={stateForAI} 
      />
      
      <StateModal 
        isOpen={showStateModal} 
        onClose={() => setShowStateModal(false)} 
        currentState={selectedState?.name ?? "Ohio"} 
        onStateChange={stateName => {
          const foundState = STATES.find(s => s.name === stateName);
          if (foundState) {
            setSelectedState(foundState);
          } else {
            setSelectedState({
              code: stateName.substring(0, 2).toUpperCase(),
              name: stateName,
              active: false,
              comingSoon: true
            });
          }
        }} 
      />
    </main>
  );
};
export default Index;