import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Loader2, Send, Bot, User, Phone, Globe, MapPin, Star, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  resources?: Resource[];
}

interface Resource {
  id: string;
  name: string;
  organization: string;
  type: string;
  city: string;
  county: string;
  description?: string;
  phone?: string;
  website?: string;
  verified: string;
  justice_friendly: boolean;
  rating?: number;
}

interface AIResourceDiscoveryProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  location?: string;
  county?: string;
}

const AIResourceDiscovery: React.FC<AIResourceDiscoveryProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
  location,
  county
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && initialQuery && messages.length === 0) {
      handleSend(initialQuery);
    }
  }, [isOpen, initialQuery]);

  const handleSend = async (queryText?: string) => {
    const query = queryText || inputValue.trim();
    if (!query) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-resource-discovery', {
        body: {
          query,
          location,
          county,
          limit: 8
        }
      });

      if (error) {
        throw error;
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.response,
        timestamp: new Date(),
        resources: data.resources
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Show more user-friendly error message with better fallback
      const isQuotaError = error.message?.includes('quota') || error.message?.includes('limit');
      const isServiceError = error.message?.includes('temporarily unavailable') || error.message?.includes('500');
      const isNetworkError = error.message?.includes('network') || error.message?.includes('fetch');
      
      let errorTitle = "AI Assistant Temporarily Unavailable";
      let errorDescription = "I'm searching our database directly for you instead.";
      
      if (isQuotaError) {
        errorTitle = "AI Service at Capacity";
        errorDescription = "High demand detected. Using direct database search.";
      } else if (isNetworkError) {
        errorTitle = "Connection Issue";
        errorDescription = "Network error detected. Falling back to database search.";
      }
      
      toast({
        title: errorTitle,
        description: errorDescription,
        variant: "default", // Changed from destructive to be less alarming
      });

      // Fallback: client-side resource lookup so users still get help
      try {
        const tokens = query.toLowerCase().split(/\s+/).slice(0, 3);
        let orFilter = tokens.map(t => `name.ilike.%${t}%,description.ilike.%${t}%,type.ilike.%${t}%`).join(',');
        if (!orFilter) orFilter = 'name.ilike.%%';

        let resourceQuery = supabase
          .from('resources')
          .select('*')
          .limit(8)
          .or(orFilter);

        if (county) resourceQuery = resourceQuery.ilike('county', `%${county}%`);
        if (location) resourceQuery = resourceQuery.or(`city.ilike.%${location}%,county.ilike.%${location}%`);

        const { data: fallbackResources } = await resourceQuery;

        const content = fallbackResources && fallbackResources.length > 0
          ? `I found ${fallbackResources.length} Ohio resources that match your search. While the AI is unavailable, these resources should help:`
          : "I'm having trouble connecting to our AI service right now. Please try again in a moment, or browse resources manually.";

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content,
          timestamp: new Date(),
          resources: fallbackResources || []
        };

        setMessages(prev => [...prev, aiMessage]);
      } catch (fallbackError) {
        console.error('Fallback query failed:', fallbackError);
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: "I'm experiencing technical difficulties. Please try refreshing the page or contact support for assistance with finding resources.",
          timestamp: new Date()
        }]);
      }
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const ResourceCard = ({ resource }: { resource: Resource }) => (
    <Card className="mb-3 border-l-4 border-l-primary">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-sm font-semibold text-foreground">{resource.name}</CardTitle>
            <p className="text-xs text-muted-foreground">{resource.organization}</p>
          </div>
          <div className="flex gap-1">
            {resource.verified === 'partner' && (
              <Badge variant="default" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                Partner
              </Badge>
            )}
            {resource.justice_friendly && (
              <Badge variant="secondary" className="text-xs">Justice-Friendly</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{resource.city}, {resource.county} County</span>
            <Badge variant="outline" className="text-xs">{resource.type}</Badge>
          </div>
          
          {resource.description && (
            <p className="text-xs text-foreground line-clamp-2">{resource.description}</p>
          )}
          
          <div className="flex gap-2 pt-1">
            {resource.phone && (
              <Button size="sm" variant="outline" className="h-7 px-2 text-xs" asChild>
                <a href={`tel:${resource.phone}`}>
                  <Phone className="h-3 w-3 mr-1" />
                  Call
                </a>
              </Button>
            )}
            {resource.website && (
              <Button size="sm" variant="outline" className="h-7 px-2 text-xs" asChild>
                <a href={resource.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-3 w-3 mr-1" />
                  Visit
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const suggestedQueries = [
    "Find housing assistance in my area",
    "I need help with food and basic needs",
    "Looking for job training programs",
    "Need legal aid for family issues",
    "Mental health support services",
    "Help for someone coming home from prison"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI Resource Discovery
            {(location || county) && (
              <Badge variant="outline" className="ml-2">
                {location || county}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col h-full">
          <ScrollArea className="flex-1 p-6 pt-2">
            {messages.length === 0 ? (
              <div className="space-y-4">
                <div className="text-center py-8">
                  <Bot className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Hi! I'm your AI Resource Navigator</h3>
                  <p className="text-muted-foreground mb-6">
                    I can help you find resources and support services across all 88 Ohio counties. 
                    Just tell me what you need!
                  </p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Try asking about:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {suggestedQueries.map((query, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-left justify-start h-auto p-3 text-sm"
                        onClick={() => handleSend(query)}
                      >
                        {query}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.type === 'ai' && (
                      <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                    
                    <div className={`max-w-[70%] space-y-2 ${message.type === 'user' ? 'order-first' : ''}`}>
                      <div className={`p-3 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground ml-auto' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                      
                      {message.resources && message.resources.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-foreground">Relevant Resources:</h4>
                          {message.resources.map((resource) => (
                            <ResourceCard key={resource.id} resource={resource} />
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {message.type === 'user' && (
                      <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center gap-1">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-xs text-muted-foreground ml-2">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div ref={messagesEndRef} />
          </ScrollArea>
          
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me about resources, services, or support in Ohio..."
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                onClick={() => handleSend()} 
                disabled={isLoading || !inputValue.trim()}
                size="sm"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIResourceDiscovery;