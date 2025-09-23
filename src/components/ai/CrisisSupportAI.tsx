import React, { useState, useEffect } from 'react';
import { Heart, Shield, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { SharedAIChat, SharedMessage } from './SharedAIChat';
import EmailChatHistoryModal from './EmailChatHistoryModal';

// Using SharedMessage interface from SharedAIChat

interface CrisisSupportAIProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const CrisisSupportAI: React.FC<CrisisSupportAIProps> = ({ isOpen, onClose, initialQuery }) => {
  const [messages, setMessages] = useState<SharedMessage[]>([
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
  const [showEmailModal, setShowEmailModal] = useState(false);

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
        const aiMessage: SharedMessage = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content,
          timestamp: new Date(),
          resources: resources || []
        };
        setMessages(prev => [...prev, aiMessage]);
      } catch (fallbackError) {
        console.error('Crisis fallback failed:', fallbackError);
        const errorMessage: SharedMessage = {
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
    
    if (!hasAskedSafety) setHasAskedSafety(true);

    // Add empty AI message for response
    const aiMessage: SharedMessage = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: 'Alex is thinking...',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, aiMessage]);

    await sendMessage(message);
    setIsLoading(false);
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: '1',
        type: 'ai',
        content: "Hi, I'm Alex, your crisis support companion. I'm here to listen and help you find immediate support. Your safety matters deeply to me. If you're in immediate danger, please call 911 right now. Can you tell me what's bringing you here today? I want to understand so I can help you best.",
        timestamp: new Date(),
      }
    ]);
    setConversationContext([]);
    setInput('');
    setHasAskedSafety(false);
    setUserResponse([]);
  };

  const handleEmailHistory = () => {
    setShowEmailModal(true);
  };

  const quickActions = [
    "I'm having thoughts of suicide",
    "I'm in an abusive relationship", 
    "I need emergency shelter",
    "I'm having a panic attack",
    "Someone is threatening me",
    "I need someone to talk to right now"
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
        title="Alex - Crisis Support"
        description="Your compassionate crisis companion, available 24/7"
        placeholder="Tell Alex what's on your mind..."
        quickActions={quickActions}
        aiName="Alex"
        headerIcon={Heart}
        headerColor="text-destructive"
      >
        <div className="bg-muted/50 border-t p-2 mt-2">
          <div className="flex items-center justify-around text-xs">
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3 text-destructive" />
              <span className="font-medium">Crisis Support</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-primary" />
              <span className="font-medium">Safety Planning</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3 text-secondary" />
              <span className="font-medium">Resources</span>
            </div>
          </div>
        </div>
      </SharedAIChat>

      <EmailChatHistoryModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        messages={messages}
        coachName="Alex - Crisis Support"
      />
    </>
  );
};

export default CrisisSupportAI;