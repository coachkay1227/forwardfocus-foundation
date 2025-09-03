import { useState } from "react";
import { Bot, X, MessageCircle, HeartHandshake, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const features = [
    {
      icon: Bot,
      title: "AI-Enhanced Guidance",
      description: "Smart technology that understands justice-impacted experiences"
    },
    {
      icon: HeartHandshake,
      title: "Trauma-Informed Care", 
      description: "Every interaction designed with safety, trust, and empowerment"
    },
    {
      icon: Users,
      title: "Income-Based Support",
      description: "Accessible life coaching and support regardless of financial situation"
    }
  ];

  return (
    <>
      {/* Chat trigger button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Chat popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 max-w-[calc(100vw-3rem)]">
          <Card className="shadow-xl border-2">
            <div className="bg-primary text-primary-foreground px-4 py-3 rounded-t-lg">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <h3 className="font-semibold">What Makes Us Different</h3>
              </div>
            </div>
            <CardContent className="p-4 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors">
                      <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm mb-1">{feature.title}</div>
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          {feature.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-muted-foreground text-center mb-3">
                  Need help? Start a conversation with our AI assistant.
                </p>
                <Button className="w-full" size="sm">
                  Start Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatBot;