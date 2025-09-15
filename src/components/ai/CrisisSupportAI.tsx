import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, AlertTriangle, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  resources?: Array<{
    id: string;
    name: string;
    organization: string;
    phone?: string;
    website?: string;
    type: string;
    description?: string;
    city?: string;
    county?: string;
  }>;
  urgencyLevel?: 'immediate' | 'urgent' | 'moderate' | 'informational';
}

interface CrisisSupportAIProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const CrisisSupportAI: React.FC<CrisisSupportAIProps> = ({ isOpen, onClose, initialQuery }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "I'm here to help you through this crisis. Your safety is my top priority. If you're in immediate danger, please call 911 right now. Otherwise, let me know what's happening and I'll help you find the right support.",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationContext, setConversationContext] = useState<Array<{role: string, content: string}>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (initialQuery && isOpen) {
      setInput(initialQuery);
    }
  }, [initialQuery, isOpen]);

  const sendMessage = async (messages: {role: string, content: string}[]) => {
    try {
      const response = await fetch(`https://gzukhsqgkwljfvwkfuno.supabase.co/functions/v1/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6dWtoc3Fna3dsamZ2d2tmdW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MjQyOTMsImV4cCI6MjA3MTMwMDI5M30.Skon84aKH5K5TjW9pVnCI2A-6Z-9KrTYiNknpiqeCpk`
        },
        body: JSON.stringify({
          messages,
          topic: "crisis-support"
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
      console.error('Crisis AI error:', error);
      // Fallback: client-side crisis resource lookup so users still get help
      try {
        const { data: resources } = await supabase
          .from('resources')
          .select('*')
          .or('type.ilike.%crisis%,type.ilike.%emergency%,type.ilike.%mental health%,type.ilike.%suicide%,type.ilike.%domestic violence%,type.ilike.%substance abuse%')
          .eq('verified', 'verified')
          .limit(8);

        const content = "I'm experiencing technical difficulties, but your safety is my priority. For immediate support: Call 911 (emergency), 988 (suicide & crisis), or text HOME to 741741. Here are crisis resources I found:";
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content,
          timestamp: new Date(),
          resources: resources || []
        };
        setMessages(prev => [...prev, aiMessage]);
      } catch (fallbackError) {
        console.error('Crisis fallback failed:', fallbackError);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: "I'm experiencing technical difficulties. For immediate crisis support: Call 911 for emergencies, 988 for suicide crisis support, or text HOME to 741741.",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsLoading(true);

    // Add empty AI message for streaming
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: '...',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, aiMessage]);

    // Update conversation context and send message
    const newContext = [...conversationContext, { role: 'user', content: userInput }];
    await sendMessage(newContext);
    
    setConversationContext([...newContext, { role: 'assistant', content: '' }]);
    setIsLoading(false);
  };

  const quickActions = [
    "I'm having thoughts of suicide",
    "I'm in an abusive relationship",
    "I need emergency shelter",
    "I'm having a panic attack",
    "Someone is threatening me",
    "I need crisis counseling"
  ];

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[700px] p-0 overflow-hidden" aria-describedby="crisis-support-description">
        {/* Header */}
        <div className="flex items-center justify-between bg-destructive p-4 text-destructive-foreground">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-destructive-foreground/20 rounded-lg">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Crisis Support Navigator</h3>
              <p className="text-sm opacity-90">Immediate help and safety resources</p>
            </div>
          </div>
        </div>

        {/* Emergency Banner */}
        <div className="bg-destructive/10 border-b p-3">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 font-medium text-destructive">
              <Phone className="h-4 w-4" />
              Emergency: 911
            </div>
            <div className="flex items-center gap-2 font-medium text-primary">
              <Phone className="h-4 w-4" />
              Crisis: 988
            </div>
            <div className="flex items-center gap-2 font-medium text-secondary">
              <MessageSquare className="h-4 w-4" />
              Text: HOME to 741741
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-foreground'
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                
                {message.urgencyLevel && (
                  <Badge 
                    variant={message.urgencyLevel === 'immediate' ? 'destructive' : 'secondary'} 
                    className="mt-2"
                  >
                    {message.urgencyLevel} priority
                  </Badge>
                )}

                {message.resources && message.resources.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs font-semibold text-foreground/80">Crisis Resources:</p>
                    {message.resources.map((resource) => (
                      <div key={resource.id} className="bg-card border rounded-lg p-3 text-xs">
                        <div className="font-semibold text-foreground">{resource.name}</div>
                        <div className="text-muted-foreground">{resource.organization}</div>
                        {resource.description && (
                          <p className="text-muted-foreground mt-1">{resource.description}</p>
                        )}
                        <div className="flex gap-2 mt-2">
                          {resource.phone && (
                            <Button asChild size="sm" variant="destructive">
                              <a href={`tel:${resource.phone}`}>
                                <Phone className="h-3 w-3 mr-1" />
                                Call Now
                              </a>
                            </Button>
                          )}
                          {resource.website && (
                            <Button asChild size="sm" variant="outline">
                              <a href={resource.website} target="_blank" rel="noopener noreferrer">
                                Visit Website
                              </a>
                            </Button>
                          )}
                        </div>
                        {resource.city && resource.county && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {resource.city}, {resource.county} County
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="border-t p-4">
          <p className="text-sm font-medium mb-3">Quick Crisis Support:</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs p-2 h-auto text-left justify-start"
                onClick={() => setInput(action)}
              >
                {action}
              </Button>
            ))}
          </div>
          
          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tell me what's happening..."
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
            />
            <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Available 24/7 • Confidential • Crisis-trained assistance
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CrisisSupportAI;