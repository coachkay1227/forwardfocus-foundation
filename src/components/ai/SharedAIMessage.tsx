import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Bot, User } from 'lucide-react';
import { parseTextForLinks } from '@/lib/text-parser';
import { SharedMessage } from './SharedAIChat';

interface SharedAIMessageProps {
  message: SharedMessage;
  aiIcon?: React.ComponentType<{ className?: string }>;
  showAvatar?: boolean;
}

export const SharedAIMessage: React.FC<SharedAIMessageProps> = ({ 
  message, 
  aiIcon: AiIcon = Bot,
  showAvatar = true 
}) => {
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

  return (
    <div className={`flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      {message.type === 'ai' && showAvatar && (
        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
          <AiIcon className="h-3 w-3 text-primary" />
        </div>
      )}
      
      <div className="max-w-[85%] space-y-2">
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
      </div>
      
      {message.type === 'user' && showAvatar && (
        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
          <User className="h-3 w-3 text-primary" />
        </div>
      )}
    </div>
  );
};

export default SharedAIMessage;