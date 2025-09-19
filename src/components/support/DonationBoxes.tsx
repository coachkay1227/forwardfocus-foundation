import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, DollarSign } from "lucide-react";

const donationOptions = [
  { name: "Give From the Heart", amount: "custom", description: "Choose your amount", featured: true, url: "https://collect.crowded.me/collection/1ce13f25-4d6e-4f06-b463-13606ff31f2b" },
  { name: "Legacy Builder", amount: 222, description: "Transform lives for generations", url: "https://collect.crowded.me/collection/fd1a87e2-ca84-4ce2-b74e-2ba7a0b95d62" },
  { name: "Impact Leader", amount: 111, description: "Drive meaningful change", url: "https://collect.crowded.me/collection/7dc2706f-9eaf-4cc8-b99d-08d20c026979" },
  { name: "Knowledge Giver", amount: 88, description: "Fund education programs", url: "https://collect.crowded.me/collection/61c1c894-80fc-41da-b1a9-8f742db98f23" },
  { name: "Freedom Mover", amount: 55, description: "Support reentry services", url: "https://collect.crowded.me/collection/637c9b3c-6e0f-49c1-9da8-97fdc4e2b88a" },
  { name: "Safe Haven Sponsor", amount: 44, description: "Create safe spaces", url: "https://collect.crowded.me/collection/b5341fda-48cc-4f24-b8ce-fc3d3cd866b4" },
  { name: "Purpose Giver", amount: 33, description: "Give with intention", url: "https://collect.crowded.me/collection/385abe9c-0d91-4cff-b286-dcba65ba5e86" },
  { name: "Ground Builder", amount: 22, description: "Build strong foundations", url: "https://collect.crowded.me/collection/8f465b8c-794a-4fff-9abb-f67bdf1b6d4d" },
  { name: "Change Starter", amount: 11, description: "Start positive change", url: "https://collect.crowded.me/collection/0c035bd5-961e-4fa1-b250-fcc87627cf8c" }
];

interface DonationBoxesProps {
  // No longer need crowdfundingUrl since we have individual URLs
}

export default function DonationBoxes({}: DonationBoxesProps) {
  const handleDonationClick = (option: typeof donationOptions[0]) => {
    window.open(option.url, '_blank', 'noopener,noreferrer');
  };

  const featuredOption = donationOptions[0];

  return (
    <div className="space-y-6">
      {/* Featured Option */}
      <Card className="border-2 border-osu-scarlet bg-gradient-to-br from-osu-scarlet/5 to-osu-scarlet/10 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-osu-scarlet rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-6 w-6 text-osu-scarlet-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">{featuredOption.name}</h3>
          <p className="text-foreground/70 mb-4">{featuredOption.description}</p>
          <Button 
            onClick={() => handleDonationClick(featuredOption)}
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
            onClick={() => handleDonationClick(option)}
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