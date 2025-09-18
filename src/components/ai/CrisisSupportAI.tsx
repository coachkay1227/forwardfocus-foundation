import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, AlertTriangle, Phone, MessageSquare, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { parseTextForLinks, ParsedTextSegment } from '@/lib/text-parser';

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
      content: "Hi, I'm Alex, your crisis support companion. I'm here to listen and help you find immediate support. Your safety matters deeply to me. If you're in immediate danger, please call 911 right now. Can you tell me what's bringing you here today? I want to understand so I can help you best.",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationContext, setConversationContext] = useState<Array<{role: string, content: string}>>([]);
  const [hasAskedSafety, setHasAskedSafety] = useState(false);
  const [userResponse, setUserResponse] = useState<string[]>([]);
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

  const sendMessage = async (userQuery: string) => {
    try {
      // Determine urgency level based on content
      const urgencyLevel = determineUrgency(userQuery);
      
      const response = await fetch(`https://gzukhsqgkwljfvwkfuno.supabase.co/functions/v1/crisis-support-ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6dWtoc3Fna3dsamZ2d2tmdW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MjQyOTMsImV4cCI6MjA3MTMwMDI5M30.Skon84aKH5K5TjW9pVnCI2A-6Z-9KrTYiNknpiqeCpk`
        },
        body: JSON.stringify({
          query: createPersonalizedQuery(userQuery),
          urgencyLevel,
          previousContext: conversationContext
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Update AI message with the response
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage.type === 'ai') {
          lastMessage.content = data.response;
          lastMessage.resources = data.resources;
          lastMessage.urgencyLevel = data.urgencyLevel;
        }
        return newMessages;
      });
      
      // Update conversation context
      setConversationContext(prev => [
        ...prev,
        { role: 'user', content: userQuery },
        { role: 'assistant', content: data.response }
      ]);
      
      // Track user responses for follow-up questions
      setUserResponse(prev => [...prev, userQuery]);
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

  const determineUrgency = (query: string): 'immediate' | 'urgent' | 'moderate' | 'informational' => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('suicide') || lowerQuery.includes('kill myself') || lowerQuery.includes('end my life') || lowerQuery.includes('hurt myself')) {
      return 'immediate';
    }
    if (lowerQuery.includes('abuse') || lowerQuery.includes('threatening') || lowerQuery.includes('unsafe') || lowerQuery.includes('danger')) {
      return 'urgent';
    }
    if (lowerQuery.includes('crisis') || lowerQuery.includes('emergency') || lowerQuery.includes('help')) {
      return 'moderate';
    }
    return 'informational';
  };
  
  const createPersonalizedQuery = (query: string): string => {
    const safetyQuestions = !hasAskedSafety ? " Alex should ask about immediate safety and current situation." : "";
    const context = userResponse.length > 0 ? ` Previous responses: ${userResponse.join(', ')}` : "";
    return `User says: "${query}". Alex (crisis counselor) should respond with empathy, assess safety, and ask probing questions.${safetyQuestions}${context}`;
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
    
    if (!hasAskedSafety) setHasAskedSafety(true);

    // Add empty AI message for response
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: 'Alex is thinking...',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, aiMessage]);

    await sendMessage(userInput);
    setIsLoading(false);
  };

  const quickActions = [
    "I'm having thoughts of suicide",
    "I'm in an abusive relationship", 
    "I need emergency shelter",
    "I'm having a panic attack",
    "Someone is threatening me",
    "I need someone to talk to right now"
  ];

  const renderMessageContent = (content: string) => {
    const segments = parseTextForLinks(content);
    return (
      <div className="space-y-2">
        {segments.map((segment, index) => {
          if (segment.type === 'text') {
            return <span key={index}>{segment.content}</span>;
          }
          return (
            <a
              key={index}
              href={segment.href}
              className="text-primary hover:text-primary/80 underline font-medium"
              target={segment.type === 'website' ? '_blank' : undefined}
              rel={segment.type === 'website' ? 'noopener noreferrer' : undefined}
            >
              {segment.content}
            </a>
          );
        })}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[92vw] sm:w-full sm:max-w-3xl max-h-[85vh] p-0 flex flex-col" aria-describedby="crisis-support-description">
        {/* Header */}
        <div className="flex items-center justify-between bg-destructive p-4 text-destructive-foreground shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-destructive-foreground/20 rounded-lg">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg" id="crisis-support-title">Alex - Crisis Support</h3>
              <p className="text-sm opacity-90" id="crisis-support-description">Your compassionate crisis companion, available 24/7</p>
            </div>
          </div>
        </div>

        {/* Emergency Banner */}
        <div className="bg-destructive/10 border-b p-3 shrink-0">
          <div className="flex items-center gap-4 text-sm flex-wrap">
            <a href="tel:911" className="flex items-center gap-2 font-medium text-destructive hover:underline">
              <Phone className="h-4 w-4" />
              Emergency: 911
            </a>
            <a href="tel:988" className="flex items-center gap-2 font-medium text-primary hover:underline">
              <Phone className="h-4 w-4" />
              Crisis: 988
            </a>
            <a href="sms:741741?body=HOME" className="flex items-center gap-2 font-medium text-secondary hover:underline">
              <MessageSquare className="h-4 w-4" />
              Text HOME to 741741
            </a>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-3 sm:p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-lg p-4 ${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-foreground'
                }`}>
                  <div className="text-sm leading-relaxed">
                    {renderMessageContent(message.content)}
                  </div>
                  
                  {message.urgencyLevel && (
                    <Badge 
                      variant={message.urgencyLevel === 'immediate' ? 'destructive' : 
                              message.urgencyLevel === 'urgent' ? 'secondary' : 'outline'} 
                      className="mt-2"
                    >
                      {message.urgencyLevel} priority
                    </Badge>
                  )}

                  {message.resources && message.resources.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <p className="text-sm font-semibold text-foreground">Immediate Resources:</p>
                      <div className="grid gap-2">
                        {message.resources.map((resource) => (
                          <div key={resource.id} className="bg-card border rounded-lg p-3 text-sm">
                            <div className="font-semibold text-foreground">{resource.name}</div>
                            <div className="text-muted-foreground text-xs">{resource.organization}</div>
                            {resource.description && (
                              <p className="text-muted-foreground mt-1 text-xs">{resource.description}</p>
                            )}
                            <div className="flex gap-2 mt-3">
                              {resource.phone && (
                                <Button asChild size="sm" variant="destructive" className="h-8">
                                  <a href={`tel:${resource.phone}`}>
                                    <Phone className="h-3 w-3 mr-1" />
                                    Call Now
                                  </a>
                                </Button>
                              )}
                              {resource.website && (
                                <Button asChild size="sm" variant="outline" className="h-8">
                                  <a href={resource.website} target="_blank" rel="noopener noreferrer">
                                    Visit Website
                                  </a>
                                </Button>
                              )}
                            </div>
                            {resource.city && resource.county && (
                              <div className="text-xs text-muted-foreground mt-2">
                                {resource.city}, {resource.county} County
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-4 max-w-[85%]">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Heart className="h-4 w-4 text-destructive animate-pulse" />
                    <span>Alex is listening and thinking...</span>
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Quick Actions & Input */}
        <div className="border-t p-4 space-y-4 shrink-0">
          <div>
            <p className="text-sm font-medium mb-3 flex items-center gap-2">
              <Heart className="h-4 w-4 text-destructive" />
              How can Alex help you right now?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs p-3 h-auto text-left justify-start hover:bg-destructive/5"
                  onClick={() => setInput(action)}
                >
                  {action}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tell Alex what's on your mind..."
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              disabled={isLoading}
              className="flex-1 h-11 sm:h-12"
            />
            <Button onClick={handleSend} disabled={isLoading || !input.trim()} className="shrink-0 h-11 w-11 sm:h-12 sm:w-12">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Alex is here 24/7 • Confidential • Trauma-informed support</span>
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3 text-destructive" />
              <span>You matter</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CrisisSupportAI;