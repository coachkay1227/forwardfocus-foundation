import React, { useState, useEffect } from 'react';
import { Bot, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { formatAIResponse } from '@/lib/text-parser';
import { Badge } from '@/components/ui/badge';
import { SharedAIChat, SharedMessage } from './SharedAIChat';
import EmailChatHistoryModal from './EmailChatHistoryModal';

// Using SharedMessage interface from SharedAIChat

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
  const [messages, setMessages] = useState<SharedMessage[]>([]);
  const [inputValue, setInputValue] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && initialQuery && messages.length === 0) {
      handleSendMessage(initialQuery);
    }
  }, [isOpen, initialQuery]);

  const sendMessage = async (query: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('ai-resource-discovery', {
        body: {
          query,
          location: location,
          county: county,
          resourceType: undefined,
          limit: 10
        }
      });

      if (error) {
        throw new Error(`Function error: ${error.message}`);
      }

      if (!data) {
        throw new Error('No response data');
      }

      // Create AI message with the response
      const aiMessage: SharedMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: formatAIResponse(data.response || 'I found some resources for you.'),
        timestamp: new Date(),
        resources: data.resources || []
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Resource Discovery error:', error);
      throw error;
    }
  };

  const handleSendMessage = async (query: string) => {
    const userMessage: SharedMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      await sendMessage(query);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      toast({
        title: "AI Assistant Temporarily Unavailable", 
        description: "I'm searching our database directly for you instead.",
        variant: "default",
      });

      // Fallback: client-side resource lookup
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

        const aiMessage: SharedMessage = {
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
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setInputValue('');
    setIsLoading(false);
  };

  const handleEmailHistory = () => {
    if (messages.length === 0) {
      toast({
        title: "No chat history",
        description: "Start a conversation to save your chat history.",
        variant: "default",
      });
      return;
    }
    setShowEmailModal(true);
  };

  const quickActions = [
    "Find housing assistance in my area",
    "I need help with food and basic needs",
    "Looking for job training programs",
    "Need legal aid for family issues",
    "Mental health support services",
    "Help for someone coming home from prison"
  ];

  return (
    <>
      <SharedAIChat
        isOpen={isOpen}
        onClose={onClose}
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onNewChat={handleNewChat}
        onEmailHistory={handleEmailHistory}
        title="AI Resource Discovery"
        description="Personalized resource recommendations across all 88 Ohio counties"
        placeholder="Ask me about resources, services, or support in Ohio..."
        quickActions={quickActions}
        aiName="your AI Resource Navigator"
        headerIcon={Bot}
        headerColor="text-primary"
      >
        {(location || county) && (
          <div className="mt-2">
            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">
              {location || county}
            </Badge>
          </div>
        )}
      </SharedAIChat>

      {/* Email History Modal */}
      <EmailChatHistoryModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        messages={messages}
        coachName="AI Resource Navigator"
      />
    </>
  );
};

export default AIResourceDiscovery;