import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Home, Briefcase, GraduationCap, Heart, Scale, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { parseTextForLinks, formatAIResponse, type ParsedTextSegment } from '@/lib/text-parser';
import EmailChatHistoryModal from './EmailChatHistoryModal';

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
  selectedCoach?: {
    name: string;
    specialty: string;
    description: string;
  };
}

const ReentryNavigatorAI: React.FC<ReentryNavigatorAIProps> = ({ isOpen, onClose, initialQuery, selectedCoach }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: selectedCoach 
        ? `Hey there! I'm ${selectedCoach.name.split(' ')[1]}, your ${selectedCoach.specialty} specialist. ${selectedCoach.description}\n\nI'm here to provide personalized support in my area of expertise. What specific challenge can I help you tackle today?`
        : "Hey there! I'm Coach Kay, your personal Reentry Navigator. I've helped hundreds of people successfully rebuild their lives after incarceration, and I'm here to help you too! 💪\n\nI know this journey takes real courage, and every small step forward is worth celebrating. I can help you with housing, employment, legal matters, education, healthcare, family connections, and financial stability.\n\nWhat's your biggest priority right now? Let's tackle it together!",
      timestamp: new Date(),
    }
  ]);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationContext, setConversationContext] = useState<Array<{role: string, content: string}>>([]);
  const [reentryStage, setReentryStage] = useState<'preparing' | 'recently_released' | 'long_term' | 'family_member'>('recently_released');
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
      const { data, error } = await supabase.functions.invoke('reentry-navigator-ai', {
        body: {
          query: userQuery,
          reentryStage,
          priorityNeeds: [],
          selectedCoach: selectedCoach,
          previousContext: conversationContext.slice(-6), // Keep last 6 messages for context
        }
      });

      if (error) {
        console.error('Reentry Navigator AI error:', error);
        throw error;
      }

      const formattedResponse = formatAIResponse(data.response);
      
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage.type === 'ai') {
          lastMessage.content = formattedResponse;
          lastMessage.resources = data.resources || [];
        }
        return newMessages;
      });

      // Update conversation context
      setConversationContext(prev => [
        ...prev,
        { role: 'user', content: userQuery },
        { role: 'assistant', content: formattedResponse }
      ]);
    } catch (error) {
      console.error(`${selectedCoach ? selectedCoach.name : 'Coach Kay'} (Reentry Navigator) AI error:`, error);
      // Fallback: client-side reentry resource lookup so users still get help
      try {
        const { data: resources } = await supabase
          .from('resources')
          .select('*')
          .or('type.ilike.%housing%,type.ilike.%employment%,type.ilike.%job training%,type.ilike.%education%,type.ilike.%reentry%,type.ilike.%legal aid%,type.ilike.%mental health%,type.ilike.%substance abuse%,type.ilike.%healthcare%,type.ilike.%transportation%')
          .eq('verified', 'verified')
          .limit(10);

        const coachName = selectedCoach ? selectedCoach.name.split(' ')[1] : 'Coach Kay';
        const content = `I'm experiencing a technical hiccup right now, but don't worry - I've still got your back! Here are some solid reentry resources that can help with common needs. Your success matters, and there are people ready to support you! 💪`;
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.type === 'ai') {
            lastMessage.content = content;
            lastMessage.resources = resources || [];
          }
          return newMessages;
        });
      } catch (fallbackError) {
        console.error('Reentry fallback failed:', fallbackError);
        const coachName = selectedCoach ? selectedCoach.name.split(' ')[1] : 'Coach Kay';
        const errorMessage = `I'm having technical difficulties, but your reentry journey is still important to me. For immediate support, call **2-1-1** for comprehensive resource navigation, or visit your local reentry program. You've got this! 🌟`;
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.type === 'ai') {
            lastMessage.content = errorMessage;
          }
          return newMessages;
        });
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

    // Add empty AI message for response
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: 'Let me help you with that...',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, aiMessage]);

    // Send message to the selected coach
    await sendMessage(userInput);
    setIsLoading(false);
  };

  const getCoachSpecificActions = (coachName: string) => {
    const coachActions = {
      'Coach Dana': [
        "I need transitional housing options",
        "Help with rental applications with my background",
        "Understanding tenant rights and protections",
        "Housing voucher program applications",
        "Communicating with landlords about my record",
        "Budget-friendly housing search help"
      ],
      'Coach Malik': [
        "Help me write a strong resume",
        "Find fair-chance employers in my area",
        "Interview preparation and confidence building",
        "Job training program recommendations",
        "Professional skill development opportunities",
        "Understanding workplace rights"
      ],
      'Coach Rivera': [
        "Help me understand expungement eligibility",
        "Managing court obligations and compliance",
        "Legal documentation assistance",
        "Understanding probation/parole requirements",
        "Connecting with legal aid resources",
        "Rights restoration processes"
      ],
      'Coach Taylor': [
        "Communication strategies with family",
        "Setting healthy boundaries",
        "Co-parenting and custody guidance",
        "Family therapy and mediation resources",
        "Rebuilding trust after absence",
        "Supporting children through transitions"
      ],
      'Coach Jordan': [
        "Opening a bank account with my record",
        "Basic budgeting and money management",
        "Credit repair and building strategies",
        "Applying for benefits (SNAP, healthcare, housing)",
        "Financial literacy and planning",
        "Avoiding predatory lending and scams"
      ],
      'Coach Sam': [
        "Finding trauma-informed mental health resources",
        "Coping strategies for stress and anxiety",
        "Substance abuse recovery support",
        "Crisis intervention and de-escalation help",
        "Building healthy routines and self-care",
        "Community support and peer connections"
      ]
    };
    
    return coachActions[coachName as keyof typeof coachActions] || [
      "I need housing options that accept my background",
      "Help me find employers who hire people with records", 
      "What documents do I need to get started?",
      "How can I clear my record?",
      "I need job training and skills programs",
      "Help me rebuild relationships with my family"
    ];
  };

  const quickActions = selectedCoach 
    ? getCoachSpecificActions(selectedCoach.name)
    : [
        "I need housing options that accept my background",
        "Help me find employers who hire people with records", 
        "What documents do I need to get started?",
        "How can I clear my record?",
        "I need job training and skills programs",
        "Help me rebuild relationships with my family"
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
      <DialogContent className="max-w-2xl max-h-[85vh] p-0 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between bg-secondary p-4 text-secondary-foreground">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary-foreground/20 rounded-lg">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">
                {selectedCoach ? `${selectedCoach.name} - ${selectedCoach.specialty}` : 'Coach Kay - Your Reentry Navigator'}
              </h3>
              <p className="text-sm opacity-90">
                {selectedCoach ? selectedCoach.description : 'Encouraging support for your success journey'}
              </p>
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
                <div className="text-sm leading-relaxed">
                  {parseTextForLinks(message.content).map((segment: ParsedTextSegment, segmentIndex: number) => (
                    <span key={segmentIndex}>
                      {segment.type === 'text' ? (
                        segment.content
                      ) : (
                        <a
                          href={segment.href}
                          className="text-primary hover:underline font-medium"
                          target={segment.type === 'website' ? '_blank' : undefined}
                          rel={segment.type === 'website' ? 'noopener noreferrer' : undefined}
                        >
                          {segment.content}
                        </a>
                      )}
                    </span>
                  ))}
                </div>

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
        <div className="border-t p-4 bg-background">
          <p className="text-sm font-medium mb-3">Quick help with common needs:</p>
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
              placeholder={selectedCoach ? `What can ${selectedCoach.name.split(' ')[1]} help you with today?` : "What can Coach Kay help you with today?"}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
            />
            <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-muted-foreground">
              Your success matters • Justice-friendly resources • Encouraging guidance every step
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs" 
              onClick={() => setShowEmailModal(true)}
            >
              Email Chat History
            </Button>
          </div>
        </div>

        {/* Email Modal */}
        <EmailChatHistoryModal
          isOpen={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          messages={messages}
          coachName={selectedCoach ? selectedCoach.name : 'Coach Kay'}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ReentryNavigatorAI;