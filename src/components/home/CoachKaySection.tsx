import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import AskCoachKay from "@/components/ui/AskCoachKay";
import { useCalendlyPopup } from "@/hooks/useCalendlyPopup";

export const CoachKaySection = () => {
  const { openCalendly } = useCalendlyPopup();
  
  return (
    <section className="py-24 bg-gradient-to-br from-secondary/10 to-accent/10">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-8">
                Meet Coach Kay
              </h2>
              <div className="space-y-6 text-foreground">
                <p className="text-xl leading-relaxed">
                  Behind Forward Focus Elevation is Coach Kay, a passionate advocate with lived proximity to the justice system. She's seen firsthand how generational harm, lack of resources, and broken systems impact entire families.
                </p>
                <p className="text-lg leading-relaxed">
                  Coach Kay combined her spiritual practice, trauma-informed education, and deep commitment to equity to create AI-powered resources, healing programs, and safe spaces that center justice-impacted individuals and their families.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 max-w-md">
                <AskCoachKay />
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => openCalendly('https://calendly.com/ffe_coach_kay')}
                  className="w-full"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Consultation
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/lovable-uploads/fad5cdf5-77d8-4054-93a4-6e6af3cf8099.png" 
                  alt="Coach Kay, founder of Forward Focus Elevation, sitting professionally in a modern office setting" 
                  className="w-full h-96 lg:h-[500px] object-contain" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end">
                  <div className="p-8 text-white">
                    <p className="text-xl font-semibold mb-2">
                      "We hustle different. With clarity. With care. With cause."
                    </p>
                    <p className="text-white/90">— Coach Kay, Founder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};