import { MessageCircle, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface AIPoweredHelpSectionProps {
  onShowCrisisAI: () => void;
  onShowAIDiscovery: () => void;
}

export const AIPoweredHelpSection = ({ onShowCrisisAI, onShowAIDiscovery }: AIPoweredHelpSectionProps) => {
  return (
    <section className="scroll-mt-16 bg-secondary/5 py-16 rounded-2xl">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
          Get Personalized Help with AI
        </h2>
        <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
          Not sure what kind of help you need? Our AI can assess your situation and connect you with the right resources.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Crisis Support AI</h3>
              <p className="text-foreground/70 mb-6">
                Immediate AI support for crisis situations, safety planning, and emotional support
              </p>
              <Button 
                size="lg" 
                className="w-full"
                onClick={onShowCrisisAI}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Start Crisis Chat
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Bot className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Resource Discovery</h3>
              <p className="text-foreground/70 mb-6">
                Find specific resources for housing, legal aid, healthcare, employment, and more
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="w-full"
                onClick={onShowAIDiscovery}
              >
                <Bot className="h-5 w-5 mr-2" />
                Find Resources
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};