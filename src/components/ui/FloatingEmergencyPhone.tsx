import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CrisisEmergencyBot } from "@/components/ai/CrisisEmergencyBot";

export const FloatingEmergencyPhone = () => {
  return (
    <div className="fixed top-20 right-4 z-50">
      <CrisisEmergencyBot 
        trigger={
          <Button 
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white shadow-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-200 rounded-full w-16 h-16 p-0 border-4 border-red-500 animate-pulse"
          >
            <Phone className="h-8 w-8" />
          </Button>
        }
      />
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="bg-red-600 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap font-medium shadow-lg">
          Emergency Chat
        </div>
      </div>
    </div>
  );
};