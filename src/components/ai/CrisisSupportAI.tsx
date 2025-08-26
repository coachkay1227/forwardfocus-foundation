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

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Update conversation context
      const newContext = [...conversationContext, { role: 'user', content: input }];
      
      const { data, error } = await supabase.functions.invoke('crisis-support-ai', {
        body: {
          query: input,
          previousContext: newContext,
          urgencyLevel: 'urgent' // Default to urgent for crisis situations
        }
      });

      if (error) throw error;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.response,
        timestamp: new Date(),
        resources: data.resources,
        urgencyLevel: data.urgencyLevel,
      };

      setMessages(prev => [...prev, aiMessage]);
      setConversationContext([...newContext, { role: 'assistant', content: data.response }]);

    } catch (error) {
      console.error('Crisis AI error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I'm experiencing technical difficulties, but your safety is still my priority. For immediate crisis support: Call 911 for emergencies, 988 for suicide crisis support, or text HOME to 741741 for crisis text support.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
      <DialogContent className="max-w-2xl h-[700px] p-0 overflow-hidden">
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
          <Button
            variant="ghost" 
            size="sm"
            onClick={onClose}
            className="text-destructive-foreground hover:bg-destructive-foreground/20"
          >
            <X className="h-4 w-4" />
          </Button>
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