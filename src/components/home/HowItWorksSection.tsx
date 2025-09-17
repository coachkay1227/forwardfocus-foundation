import { Phone, Bot, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Phone,
    title: "Get Immediate Help",
    desc: "24/7 support, AI-powered guidance, and live human assistance."
  },
  {
    icon: Bot,
    title: "AI-Enhanced Navigation", 
    desc: "Smart tech to guide justice-impacted individuals to the right tools."
  },
  {
    icon: Users,
    title: "Supportive Community",
    desc: "Peer support, mentorship, and life coaching designed for your journey."
  }
];

export const HowItWorksSection = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-foreground">
            How We Support Your Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Comprehensive support designed for your unique path forward
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card 
                key={item.title} 
                className="bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 md:hover:scale-[1.02] border-l-4 border-l-osu-scarlet shadow-md group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-osu-scarlet to-osu-scarlet-dark rounded-lg group-hover:shadow-lg transition-shadow duration-300">
                      <Icon className="h-6 w-6 text-white" aria-hidden />
                    </div>
                    <CardTitle className="text-lg font-bold text-foreground">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-muted-foreground leading-relaxed pt-0">
                  {item.desc}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};