import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Phone, MessageSquare, X, Send, Mic, MicOff } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface CrisisEmergencyBotProps {
  trigger?: React.ReactNode;
}

export const CrisisEmergencyBot = ({ trigger }: CrisisEmergencyBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const connectToCrisisBot = async () => {
    try {
      setIsLoading(true);
      
      // Initialize with crisis support greeting
      addMessage(
        "🚨 Crisis Support AI Assistant\n\nI'm here to help you through this difficult time. Please remember:\n\n• For emergencies: Call 911\n• For crisis support: Call 988\n• For text support: Text HOME to 741741\n\nHow can I support you right now?",
        false
      );
      
      setIsConnected(true);
    } catch (error) {
      console.error('Error connecting to crisis bot:', error);
      addMessage("I'm sorry, I'm having trouble connecting right now. Please call 988 for immediate crisis support.", false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !isConnected) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    addMessage(userMessage, true);
    setIsLoading(true);

    // Simulate AI response for crisis support
    setTimeout(() => {
      let response = "";
      
      if (userMessage.toLowerCase().includes('emergency') || userMessage.toLowerCase().includes('danger')) {
        response = "🚨 If you're in immediate danger, please call 911 right now.\n\nIf you're having thoughts of self-harm, please call the Crisis Lifeline at 988 or text HOME to 741741. You don't have to go through this alone.";
      } else if (userMessage.toLowerCase().includes('suicid') || userMessage.toLowerCase().includes('hurt')) {
        response = "I'm very concerned about you. Please reach out for immediate help:\n\n• Call 988 (Crisis Lifeline) - available 24/7\n• Text HOME to 741741\n• Go to your nearest emergency room\n\nYou matter, and there are people who want to help you through this.";
      } else if (userMessage.toLowerCase().includes('help') || userMessage.toLowerCase().includes('support')) {
        response = "I understand you're looking for help. Here are some resources:\n\n• Crisis support: 988\n• Text support: Text HOME to 741741\n• Local resources: Call 211\n\nWhat specific type of support would be most helpful right now?";
      } else {
        response = "Thank you for sharing with me. Remember that you're not alone in this. If you need immediate help, please call 988 or text HOME to 741741.\n\nCan you tell me more about what you're going through?";
      }
      
      addMessage(response, false);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // Voice functionality would be implemented here
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      connectToCrisisBot();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700">
            <Phone className="h-4 w-4 mr-2" />
            Crisis Support
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] p-0">
        <DialogHeader className="p-4 pb-2 bg-red-50 border-b">
          <DialogTitle className="flex items-center gap-2 text-red-800">
            <Phone className="h-5 w-5" />
            Crisis Emergency Support
          </DialogTitle>
          <div className="text-sm text-red-700 space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="destructive" className="text-xs">Emergency</Badge>
              <a href="tel:911" className="hover:underline font-medium">Call 911</a>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">Crisis</Badge>
              <a href="tel:988" className="hover:underline font-medium">Call 988</a>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">Text</Badge>
              <a href="sms:741741?body=HOME" className="hover:underline font-medium">Text HOME to 741741</a>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col h-96">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs rounded-lg p-3 ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3 max-w-xs">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={!isConnected || isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleVoiceToggle}
                variant="outline"
                size="icon"
                className={isListening ? "bg-red-100" : ""}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || !isConnected || isLoading}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};