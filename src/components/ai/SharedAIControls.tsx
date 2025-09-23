import React from 'react';
import { Button } from '@/components/ui/button';
import { MoreVertical, RotateCcw, Mail, Calendar, ExternalLink } from 'lucide-react';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface SharedAIControlsProps {
  onNewChat: () => void;
  onEmailHistory: () => void;
  showBooking?: boolean;
  bookingUrl?: string;
  bookingLabel?: string;
  extraActions?: Array<{
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    onClick: () => void;
  }>;
}

export const SharedAIControls: React.FC<SharedAIControlsProps> = ({
  onNewChat,
  onEmailHistory,
  showBooking = false,
  bookingUrl,
  bookingLabel = "Book Call",
  extraActions = []
}) => {
  const handleBookingClick = () => {
    if (bookingUrl) {
      window.open(bookingUrl, '_blank');
    }
  };

  return (
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
        {showBooking && bookingUrl && (
          <DropdownMenuItem onClick={handleBookingClick}>
            <Calendar className="h-4 w-4 mr-2" />
            {bookingLabel}
            <ExternalLink className="h-3 w-3 ml-1" />
          </DropdownMenuItem>
        )}
        {extraActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <DropdownMenuItem key={index} onClick={action.onClick}>
              {Icon && <Icon className="h-4 w-4 mr-2" />}
              {action.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SharedAIControls;