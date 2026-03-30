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
  formUrl = 'https://forms.gle/6kP8pTbYaP9XhAv89'
}) => {
  const handleClick = () => {
    window.open(formUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={handleClick}
          className="feedback-button rounded-full w-14 md:w-auto px-0 md:px-4 h-14 gap-2 transition-all duration-300"
          aria-label="Send Feedback"
        >
          <span className="hidden md:inline text-sm font-medium">Feedback</span>
          <MessageSquarePlus size={20} />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left" className="bg-card border-border">
        <p>Send Feedback or Suggestions</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default FeedbackButton;
