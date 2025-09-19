import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, DollarSign } from "lucide-react";

const donationOptions = [
  { name: "Give From the Heart", amount: "custom", description: "Choose your amount", featured: true },
  { name: "Legacy Builder", amount: 222, description: "Transform lives for generations" },
  { name: "Impact Leader", amount: 111, description: "Drive meaningful change" },
  { name: "Knowledge Giver", amount: 88, description: "Fund education programs" },
  { name: "Freedom Mover", amount: 55, description: "Support reentry services" },
  { name: "Safe Haven Sponsor", amount: 44, description: "Create safe spaces" },
  { name: "Purpose Giver", amount: 33, description: "Give with intention" },
  { name: "Ground Builder", amount: 22, description: "Build strong foundations" },
  { name: "Change Starter", amount: 11, description: "Start positive change" }
];

interface DonationBoxesProps {
  crowdfundingUrl: string;
}

export default function DonationBoxes({ crowdfundingUrl }: DonationBoxesProps) {
  const handleDonationClick = (amount: number | string) => {
    const url = amount === "custom" 
      ? crowdfundingUrl 
      : `${crowdfundingUrl}?amount=${amount}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      {/* Featured Option */}
      <Card className="border-2 border-osu-scarlet bg-gradient-to-br from-osu-scarlet/5 to-osu-scarlet/10 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-osu-scarlet rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-6 w-6 text-osu-scarlet-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Give From the Heart</h3>
          <p className="text-foreground/70 mb-4">Choose your amount to support our mission</p>
          <Button 
            onClick={() => handleDonationClick("custom")}
            className="w-full bg-osu-scarlet hover:bg-osu-scarlet-dark text-osu-scarlet-foreground"
            size="lg"
          >
            Donate Any Amount
          </Button>
        </CardContent>
      </Card>

      {/* Fixed Amount Options */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {donationOptions.slice(1).map((option) => (
          <Card 
            key={option.name} 
            className="border border-border hover:border-osu-scarlet/50 hover:shadow-md transition-all duration-300 cursor-pointer group"
            onClick={() => handleDonationClick(option.amount)}
          >
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-osu-scarlet/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-osu-scarlet/20 transition-colors">
                <DollarSign className="h-4 w-4 text-osu-scarlet" />
              </div>
              <div className="text-2xl font-bold text-osu-scarlet mb-1">${option.amount}</div>
              <div className="text-sm font-medium text-foreground mb-2">{option.name}</div>
              <div className="text-xs text-foreground/60">{option.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}