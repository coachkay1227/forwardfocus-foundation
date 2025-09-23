import React, { useState, useEffect } from 'react';
import { Heart, Shield, Scale, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { SharedAIChat, SharedMessage } from './SharedAIChat';
import EmailChatHistoryModal from './EmailChatHistoryModal';

// Using SharedMessage interface from SharedAIChat

interface VictimSupportAIProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const VictimSupportAI: React.FC<VictimSupportAIProps> = ({ isOpen, onClose, initialQuery }) => {
  const [messages, setMessages] = useState<SharedMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: "I'm here to support you on your healing journey. What happened to you was not your fault, and seeking help shows tremendous strength. I'm trained to understand the unique challenges faced by crime victims and can help you find trauma-informed resources, legal advocacy, compensation programs, and emotional support. How can I help you today?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationContext, setConversationContext] = useState<Array<{role: string, content: string}>>([]);
  const [showEmailModal, setShowEmailModal] = useState(false);

  useEffect(() => {
    if (initialQuery && isOpen) {
      setInput(initialQuery);
    }
  }, [initialQuery, isOpen]);

  const sendMessage = async (messages: {role: string, content: string}[]) => {
    try {
      const response = await fetch(`https://gzukhsqgkwljfvwkfuno.supabase.co/functions/v1/victim-support-ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6dWtoc3Fna3dsamZ2d2tmdW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MjQyOTMsImV4cCI6MjA3MTMwMDI5M30.Skon84aKH5K5TjW9pVnCI2A-6Z-9KrTYiNknpiqeCpk`
        },
        body: JSON.stringify({
          query: messages[messages.length - 1].content,
          victimType: 'general',
          traumaLevel: 'ongoing',
          previousContext: messages.slice(0, -1)
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
        }
        return newMessages;
      });
    } catch (error) {
      console.error('Victim Support AI error:', error);
      // Fallback: client-side victim services lookup so users still get help
      try {
        const { data: resources } = await supabase
          .from('resources')
          .select('*')
          .or('type.ilike.%victim%,type.ilike.%legal aid%,type.ilike.%compensation%,type.ilike.%counseling%,type.ilike.%trauma%,type.ilike.%advocacy%,type.ilike.%domestic violence%,type.ilike.%sexual assault%')
          .eq('verified', 'verified')
          .limit(8);

        const content = "I'm having trouble connecting to the AI right now, but here are trauma-informed victim services I found that may help:";
        const aiMessage: SharedMessage = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content,
          timestamp: new Date(),
          resources: resources || []
        };
        setMessages(prev => [...prev, aiMessage]);
      } catch (fallbackError) {
        console.error('Victim fallback failed:', fallbackError);
        const errorMessage: SharedMessage = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: "I apologize for the technical difficulty. Let me connect you with local victim services that can provide direct support. Please visit your nearest family justice center or contact local law enforcement victim advocacy services.",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    }
  };

  const handleSendMessage = async (message: string) => {
    const userMessage: SharedMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Add empty AI message for streaming
    const aiMessage: SharedMessage = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: '...',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, aiMessage]);

    // Update conversation context and send message
    const newContext = [...conversationContext, { role: 'user', content: message }];
    await sendMessage(newContext);
    
    setConversationContext([...newContext, { role: 'assistant', content: '' }]);
    setIsLoading(false);
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: '1',
        type: 'ai',
        content: "I'm here to support you on your healing journey. What happened to you was not your fault, and seeking help shows tremendous strength. I'm trained to understand the unique challenges faced by crime victims and can help you find trauma-informed resources, legal advocacy, compensation programs, and emotional support. How can I help you today?",
        timestamp: new Date(),
      }
    ]);
    setConversationContext([]);
    setInput('');
  };

  const handleEmailHistory = () => {
    setShowEmailModal(true);
  };

  const quickActions = [
    "Help me understand my legal rights",
    "I need financial assistance for medical bills", 
    "Find me trauma-informed counseling",
    "I need help with victim compensation",
    "Connect me to support groups",
    "I don't know where to start"
  ];

  const supportCategories = [
    { icon: Shield, label: "Safety & Crisis", color: "text-destructive" },
    { icon: Scale, label: "Legal Rights", color: "text-primary" },
    { icon: DollarSign, label: "Compensation", color: "text-secondary" },
    { icon: Heart, label: "Healing Support", color: "text-accent" }
  ];

  return (
    <>
      <SharedAIChat
        isOpen={isOpen}
        onClose={onClose}
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        inputValue={input}
        onInputChange={setInput}
        onNewChat={handleNewChat}
        onEmailHistory={handleEmailHistory}
        title="Healing & Support Navigator"
        description="Trauma-informed victim services and healing resources"
        placeholder="Share what support you need..."
        quickActions={quickActions}
        aiName="Healing Navigator"
        headerIcon={Heart}
        headerColor="text-primary"
      >
        <div className="bg-muted/50 border-t p-2 mt-2">
          <div className="flex items-center justify-around text-xs">
            {supportCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div key={index} className="flex items-center gap-1">
                  <Icon className={`h-3 w-3 ${category.color}`} />
                  <span className="font-medium">{category.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </SharedAIChat>

      <EmailChatHistoryModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        messages={messages}
        coachName="Healing & Support Navigator"
      />
    </>
  );
};

export default VictimSupportAI;