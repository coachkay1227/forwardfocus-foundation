import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Bot, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatbotPopup = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Coach K, your crisis-support navigator. I'm here to help you find local resources and support in Columbus, Ohio. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

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
                  if (lastMessage.isBot) {
                    lastMessage.text += content;
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
      console.error('Coach K error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: error instanceof Error && error.message ? 
          `Error: ${error.message}` : 
          "Sorry, I can't reach the server right now. Please try again in a moment.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    // Add empty AI message for streaming
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: '',
      isBot: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, aiMessage]);

    // Convert messages to OpenAI format
    const chatMessages = messages.map(msg => ({
      role: msg.isBot ? 'assistant' : 'user',
      content: msg.text
    }));
    
    // Add the new user message
    chatMessages.push({ role: 'user', content: userInput });

    await sendMessage(chatMessages);
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size="lg" 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Connect with Coach Kay
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Support Chat
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <ScrollArea className="h-80 pr-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {message.isBot && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.isBot
                        ? 'bg-secondary text-secondary-foreground'
                        : 'bg-primary text-primary-foreground'
                    }`}
                  >
                    {message.text}
                  </div>
                  {!message.isBot && (
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
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotPopup;