import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Home, Briefcase, GraduationCap, Heart, Scale, DollarSign } from 'lucide-react';
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
    justice_friendly?: boolean;
    city?: string;
    county?: string;
  }>;
  reentryStage?: string;
}

interface ReentryNavigatorAIProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const ReentryNavigatorAI: React.FC<ReentryNavigatorAIProps> = ({ isOpen, onClose, initialQuery }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Welcome to your Reentry Success Navigator! I'm here to help you build a stable, successful life after incarceration. I understand the unique challenges of reentry and can provide step-by-step guidance for housing, employment, legal matters, education, healthcare, family reunification, and financial stability. What area would you like to focus on first?",
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
      
      const { data, error } = await supabase.functions.invoke('reentry-navigator-ai', {
        body: {
          query: input,
          previousContext: newContext,
          reentryStage: 'recently_released'
        }
      });

      if (error) throw error;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.response,
        timestamp: new Date(),
        resources: data.resources,
        reentryStage: data.reentryStage,
      };

      setMessages(prev => [...prev, aiMessage]);
      setConversationContext([...newContext, { role: 'assistant', content: data.response }]);

    } catch (error) {
      console.error('Reentry Navigator AI error:', error);
      // Fallback: client-side reentry resource lookup so users still get help
      try {
        const { data: resources } = await supabase
          .from('resources')
          .select('*')
          .or('type.ilike.%housing%,type.ilike.%employment%,type.ilike.%job training%,type.ilike.%education%,type.ilike.%reentry%,type.ilike.%legal aid%,type.ilike.%mental health%,type.ilike.%substance abuse%,type.ilike.%healthcare%,type.ilike.%transportation%')
          .eq('verified', 'verified')
          .limit(10);

        const content = "I'm having trouble connecting to the AI right now, but here are reentry resources I found that match common needs:";
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content,
          timestamp: new Date(),
          resources: resources || []
        };
        setMessages(prev => [...prev, aiMessage]);
      } catch (fallbackError) {
        console.error('Reentry fallback failed:', fallbackError);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: "I apologize for the technical issue. Your reentry success is still my priority. For immediate support, call 211 for comprehensive resource navigation, or visit your local reentry program or Ohio Means Jobs center.",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    "I need transitional housing",
    "Help me find fair-chance employers",
    "What documents do I need?",
    "How do I expunge my record?",
    "I need job training programs",
    "Help me reconnect with my family"
  ];

  const reentryAreas = [
    { icon: Home, label: "Housing", color: "text-primary" },
    { icon: Briefcase, label: "Employment", color: "text-secondary" },
    { icon: Scale, label: "Legal", color: "text-accent" },
    { icon: GraduationCap, label: "Education", color: "text-destructive" },
    { icon: Heart, label: "Family", color: "text-pink-600" },
    { icon: DollarSign, label: "Financial", color: "text-green-600" }
  ];

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[700px] p-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between bg-secondary p-4 text-secondary-foreground">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary-foreground/20 rounded-lg">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Reentry Success Navigator</h3>
              <p className="text-sm opacity-90">Comprehensive reentry support & planning</p>
            </div>
          </div>
          <Button
            variant="ghost" 
            size="sm"
            onClick={onClose}
            className="text-secondary-foreground hover:bg-secondary-foreground/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Reentry Areas */}
        <div className="bg-muted/50 border-b p-3">
          <div className="flex items-center justify-around text-xs">
            {reentryAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div key={index} className="flex items-center gap-1">
                  <Icon className={`h-3 w-3 ${area.color}`} />
                  <span className="font-medium">{area.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user' 
                  ? 'bg-secondary text-secondary-foreground' 
                  : 'bg-muted text-foreground border'
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>

                {message.resources && message.resources.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs font-semibold text-foreground/80">Reentry Resources:</p>
                    {message.resources.map((resource) => (
                      <div key={resource.id} className="bg-card border rounded-lg p-3 text-xs">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-semibold text-foreground">{resource.name}</div>
                            <div className="text-muted-foreground">{resource.organization}</div>
                            {resource.description && (
                              <p className="text-muted-foreground mt-1">{resource.description}</p>
                            )}
                          </div>
                          {resource.justice_friendly && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              Justice-Friendly
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                          {resource.city && resource.county && (
                            <span className="text-xs text-muted-foreground">
                              {resource.city}, {resource.county} County
                            </span>
                          )}
                        </div>
                        
                        <div className="flex gap-2 mt-2">
                          {resource.phone && (
                            <Button asChild size="sm" variant="default">
                              <a href={`tel:${resource.phone}`}>
                                Call: {resource.phone}
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
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3 border">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-secondary rounded-full animate-bounce" />
                  <div className="h-2 w-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="h-2 w-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="border-t p-4">
          <p className="text-sm font-medium mb-3">Common reentry needs:</p>
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
              placeholder="What do you need help with for your reentry?"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
            />
            <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Comprehensive reentry support • Justice-friendly resources • Success-focused guidance
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReentryNavigatorAI;