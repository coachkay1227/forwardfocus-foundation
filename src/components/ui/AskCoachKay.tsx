import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Bot, User, RotateCcw, Mail, Calendar, ExternalLink } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import EmailChatHistoryModal from "@/components/ai/EmailChatHistoryModal";
import { AIWithTrial } from "@/components/ai/AIWithTrial";
import { useToast } from "@/hooks/use-toast";
import { useCalendlyPopup } from "@/hooks/useCalendlyPopup";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AskCoachKay = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi, I'm Coach Kay. I'm here to listen, guide, and support you—whether you need emotional support, want to explore our programs, get resources, or book a free consult. What's going on today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { openCalendly } = useCalendlyPopup();

  return (
    <AIWithTrial aiEndpoint="coach-k">
      {({ canUseAI, checkAccess, trialActive, timeRemaining }) => {
        const AskCoachKayComponent = () => {

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
      }
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startNewChat = () => {
    setMessages([
      {
        id: '1',
        type: 'ai',
        content: "Hi, I'm Coach Kay. I'm here to listen, guide, and support you—whether you need emotional support, want to explore our programs, get resources, or book a free consult. What's going on today?",
        timestamp: new Date()
      }
    ]);
    toast({
      title: "New conversation started",
      description: "Chat history cleared. How can I help you today?",
    });
  };

  const handleOpenCalendly = () => {
    openCalendly('https://calendly.com/ffe_coach_kay/free-call');
  };

  const sendMessage = async (messages: {role: string, content: string}[]) => {
    try {
      const response = await fetch(`https://gzukhsqgkwljfvwkfuno.supabase.co/functions/v1/coach-k`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6dWtoc3Fna3dsamZ2d2tmdW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MjQyOTMsImV4cCI6MjA3MTMwMDI5M30.Skon84aKH5K5TjW9pVnCI2A-6Z-9KrTYiNknpiqeCpk`
        },
        body: JSON.stringify({
          messages
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                setMessages(prev => {
                  const newMessages = [...prev];
                  const lastMessage = newMessages[newMessages.length - 1];
                  if (lastMessage.type === 'ai') {
                    lastMessage.content += content;
                  }
                  return newMessages;
                });
                scrollToBottom();
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error('Coach Kay error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'ai',
        content: error instanceof Error && error.message ? 
          `I'm having trouble connecting right now. ${error.message}. Please try again in a moment, or book a free consult directly at https://calendly.com/ffe_coach_kay/free-call` : 
          "I'm having trouble connecting right now. Please try again in a moment, or book a free consult directly at https://calendly.com/ffe_coach_kay/free-call",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    // Add empty AI message for streaming
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: '',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, aiMessage]);

    // Convert messages to OpenAI format
    const chatMessages = messages.map(msg => ({
      role: msg.type === 'ai' ? 'assistant' : 'user',
      content: msg.content
    }));
    
    // Add the new user message
    chatMessages.push({ role: 'user', content: userInput });

    await sendMessage(chatMessages);
    setIsLoading(false);
  };

        return (
          <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Connect with Coach Kay
                  {trialActive && <span className="ml-2 text-xs opacity-75">(Trial)</span>}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <div className="flex items-center justify-between">
                    <DialogTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5 text-primary" />
                      Ask Coach Kay
                      {trialActive && <span className="text-xs text-muted-foreground">(Trial Active)</span>}
                    </DialogTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleOpenCalendly}
                        className="text-xs"
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        Book Free Call
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowEmailModal(true)}
                        className="text-xs"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={startNewChat}
                        className="text-xs"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </DialogHeader>
                <div className="space-y-4">
                  <ScrollArea className="h-96 pr-4" ref={scrollAreaRef}>
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex gap-2 ${message.type === 'ai' ? 'justify-start' : 'justify-end'}`}
                        >
                          {message.type === 'ai' && (
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Bot className="h-4 w-4 text-primary" />
                            </div>
                          )}
                          <div
                            className={`max-w-[80%] p-3 rounded-lg text-sm ${
                              message.type === 'ai'
                                ? 'bg-secondary text-secondary-foreground'
                                : 'bg-primary text-primary-foreground'
                            }`}
                          >
                            {message.content}
                          </div>
                          {message.type === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <User className="h-4 w-4 text-primary" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="flex gap-2">
                    <Input
                      placeholder={canUseAI ? "What's going on today? How can I help?" : "Sign up to continue chatting..."}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                      disabled={isLoading || !canUseAI}
                    />
                    <Button onClick={handleSendMessage} size="icon" disabled={isLoading || !canUseAI}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground text-center">
                    💙 Emotional Support • 🗺️ Site Navigation • 📋 Programs • 🔍 Resources • 📅 Coaching Consults
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <EmailChatHistoryModal
              isOpen={showEmailModal}
              onClose={() => setShowEmailModal(false)}
              messages={messages}
              coachName="Coach Kay"
            />
          </>
        );
        };

        return <AskCoachKayComponent />;
      }}
    </AIWithTrial>
  );
};

export default AskCoachKay;