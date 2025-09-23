import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Send, Bot, User, MoreVertical, RotateCcw, Mail, Phone, Globe, 
  MapPin, Shield, Heart, AlertTriangle
} from 'lucide-react';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { parseTextForLinks } from '@/lib/text-parser';

export interface SharedMessage {
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
    email?: string;
    type: string;
    description?: string;
    city?: string;
    county?: string;
    verified?: string;
    justice_friendly?: boolean;
  }>;
  urgencyLevel?: 'immediate' | 'urgent' | 'moderate' | 'informational';
}

interface SharedAIChatProps {
  isOpen: boolean;
  onClose: () => void;
  messages: SharedMessage[];
  onSendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
  inputValue: string;
  onInputChange: (value: string) => void;
  onNewChat: () => void;
  onEmailHistory: () => void;
  title: string;
  description: string;
  placeholder?: string;
  quickActions?: string[];
  aiName: string;
  headerIcon?: React.ComponentType<{ className?: string }>;
  headerColor?: string;
  children?: React.ReactNode;
}

export const SharedAIChat: React.FC<SharedAIChatProps> = ({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  isLoading,
  inputValue,
  onInputChange,
  onNewChat,
  onEmailHistory,
  title,
  description,
  placeholder = "Type your message...",
  quickActions = [],
  aiName,
  headerIcon: HeaderIcon = Bot,
  headerColor = "text-primary",
  children
}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
        if (viewport) {
          viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
        }
      }
    }, 50);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    await onSendMessage(inputValue.trim());
  };

  const ParsedMessage = ({ content }: { content: string }) => {
    const segments = parseTextForLinks(content);
    
    return (
      <div className="text-sm leading-relaxed">
        {segments.map((segment, index) => {
          if (segment.type === 'text') {
            return (
              <span key={index} className="whitespace-pre-wrap">
                {segment.content}
              </span>
            );
          }
          
          return (
            <a
              key={index}
              href={segment.href}
              target={segment.type === 'website' ? '_blank' : undefined}
              rel={segment.type === 'website' ? 'noopener noreferrer' : undefined}
              className="text-primary hover:text-primary/80 underline underline-offset-2 font-medium transition-colors"
            >
              {segment.content}
            </a>
          );
        })}
      </div>
    );
  };

  const ResourceCard = ({ resource }: { resource: SharedMessage['resources'][0] }) => (
    <Card className="mb-3 border-l-4 border-l-primary">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-base text-foreground">{resource.name}</h4>
            <p className="text-sm text-muted-foreground">{resource.organization}</p>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{resource.city ? `${resource.city}, ` : ''}{resource.county || ''}</span>
            <Badge variant="outline" className="text-xs">{resource.type}</Badge>
          </div>
          
          {resource.description && (
            <p className="text-sm text-foreground leading-relaxed line-clamp-3">{resource.description}</p>
          )}
          
          <div className="flex gap-2 flex-wrap">
            {resource.phone && (
              <Button size="sm" variant="outline" className="h-8 px-3 text-sm" asChild>
                <a href={`tel:${resource.phone.replace(/[^\d]/g, '')}`}>
                  <Phone className="h-3 w-3 mr-2" />
                  Call
                </a>
              </Button>
            )}
            {resource.website && (
              <Button size="sm" variant="outline" className="h-8 px-3 text-sm" asChild>
                <a href={resource.website.startsWith('http') ? resource.website : `https://${resource.website}`} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-3 w-3 mr-2" />
                  Website
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0 flex flex-col">
        <DialogHeader className="p-4 pb-2 border-b shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HeaderIcon className={`h-5 w-5 ${headerColor}`} />
              <div>
                <DialogTitle className="text-base">{title}</DialogTitle>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onNewChat}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  New Chat
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onEmailHistory}>
                  <Mail className="h-4 w-4 mr-2" />
                  Email History
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {children}
        </DialogHeader>

        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <HeaderIcon className={`h-8 w-8 ${headerColor} mx-auto mb-3`} />
                <h3 className="font-medium mb-2">Hi! I'm {aiName}</h3>
                <p className="text-sm text-muted-foreground mb-4">{description}</p>
                
                {quickActions.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Try asking:</p>
                    <div className="grid gap-1">
                      {quickActions.slice(0, 4).map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-8 text-left justify-start"
                          onClick={() => onInputChange(action)}
                        >
                          {action}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className={`flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.type === 'ai' && (
                    <div className={`w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1`}>
                      <HeaderIcon className="h-3 w-3 text-primary" />
                    </div>
                  )}
                  
                  <div className={`max-w-[85%] space-y-2`}>
                    <div className={`p-3 rounded-lg text-sm ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted/70 border'
                    }`}>
                      {message.type === 'ai' ? (
                        <ParsedMessage content={message.content} />
                      ) : (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      )}
                      
                      {message.urgencyLevel && (
                        <Badge 
                          variant={message.urgencyLevel === 'immediate' ? 'destructive' : 'outline'} 
                          className="mt-2 text-xs h-5"
                        >
                          {message.urgencyLevel}
                        </Badge>
                      )}
                    </div>
                    
                    {message.resources && message.resources.length > 0 && (
                      <div className="space-y-1">
                        <h4 className="text-xs font-medium text-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          Resources ({message.resources.length})
                        </h4>
                        <div className="max-h-32 overflow-y-auto space-y-1">
                          {message.resources.slice(0, 3).map((resource) => (
                            <ResourceCard key={resource.id} resource={resource} />
                          ))}
                          {message.resources.length > 3 && (
                            <p className="text-xs text-muted-foreground text-center py-1">
                              +{message.resources.length - 3} more resources
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {message.type === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="h-3 w-3 text-primary" />
                    </div>
                  )}
                </div>
              ))
            )}
            
            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <HeaderIcon className="h-3 w-3 text-primary" />
                </div>
                <div className="bg-muted/70 border p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-3 border-t shrink-0">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder={placeholder}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              disabled={isLoading}
              className="flex-1 h-9"
            />
            <Button 
              onClick={handleSend} 
              disabled={isLoading || !inputValue.trim()}
              size="sm"
              className="h-9 w-9 p-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SharedAIChat;