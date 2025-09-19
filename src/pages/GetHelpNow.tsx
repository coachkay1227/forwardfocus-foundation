import { useState, useEffect } from "react";
import CrisisSupportAI from "@/components/ai/CrisisSupportAI";
import AIResourceDiscovery from "@/components/ai/AIResourceDiscovery";
import { HelpHeroSection } from "@/components/help/HelpHeroSection";
import { EmergencySupportSection } from "@/components/help/EmergencySupportSection";
import { AIPoweredHelpSection } from "@/components/help/AIPoweredHelpSection";
import { SpecializedSupportSection } from "@/components/help/SpecializedSupportSection";

export default function GetHelpNow() {
  const [showCrisisAI, setShowCrisisAI] = useState(false);
  const [showAIDiscovery, setShowAIDiscovery] = useState(false);

  useEffect(() => {
    document.title = "Get Help Now | Immediate Crisis Support | Forward Focus Elevation";
    const desc = "Immediate crisis support and emergency resources. Get help now with 24/7 crisis lines, AI-powered guidance, and direct connections to emergency services.";
    
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", `${window.location.origin}/help`);
  }, []);

  return (
    <>
      <main id="main" className="min-h-screen">
        <HelpHeroSection />
        
        <div className="container py-16 space-y-16">
          <EmergencySupportSection />
          <AIPoweredHelpSection 
            onShowCrisisAI={() => setShowCrisisAI(true)}
            onShowAIDiscovery={() => setShowAIDiscovery(true)}
          />
          <SpecializedSupportSection />
        </div>
      </main>

      {/* Modals */}
      <CrisisSupportAI 
        isOpen={showCrisisAI} 
        onClose={() => setShowCrisisAI(false)} 
      />
      <AIResourceDiscovery 
        isOpen={showAIDiscovery} 
        onClose={() => setShowAIDiscovery(false)} 
        initialQuery=""
        location="Ohio"
      />
    </>
  );
}