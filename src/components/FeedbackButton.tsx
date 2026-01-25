import React from 'react';
import { MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface FeedbackButtonProps {
  formUrl?: string;
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({ 
  formUrl = 'https://forms.example.com/feedback' // Placeholder URL
}) => {
  const handleClick = () => {
    window.open(formUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={handleClick}
          className="feedback-button rounded-full w-14 h-14 p-0 transition-all duration-300"
          aria-label="Send Feedback"
        >
          <MessageSquarePlus size={24} />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left" className="bg-card border-border">
        <p>Send Feedback or Suggestions</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default FeedbackButton;
