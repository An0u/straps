import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface OnboardingStep {
  title: string;
  description: string;
}

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const onboardingSteps: OnboardingStep[] = [
  {
    title: 'Welcome to Your Straps Journey',
    description: 'Master aerial straps skills through a structured progression system. Each skill builds on the last, creating a clear path from beginner to advanced techniques.',
  },
  {
    title: 'Unlock Skills as You Progress',
    description: 'Complete prerequisite skills to unlock new challenges. Track your progress, mark favorites, and watch tutorial videos for each movement.',
  },
  {
    title: 'Navigate Your Skill Tree',
    description: 'Zoom, pan, and explore different categories: Two Arm, One Arm, and C-Shaping. Tap any skill to view details, prerequisites, and what it unlocks.',
  },
];

const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const isMobile = useIsMobile();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    onComplete();
    onClose();
    localStorage.setItem('onboarding-completed', 'true');
  };

  const handleSkip = () => {
    handleComplete();
  };

  const currentStepData = onboardingSteps[currentStep];
  const isLastStep = currentStep === onboardingSteps.length - 1;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          "modal-glass border-0 !p-0 overflow-hidden flex flex-col relative",
          isMobile 
            ? "!fixed !bottom-0 !left-0 !right-0 !top-auto !rounded-t-[24px] rounded-b-none max-h-[90vh] w-full !max-w-full !m-0 !translate-x-0 !translate-y-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-bottom-full"
            : "sm:max-w-2xl rounded-lg max-h-[85vh]"
        )}
      >
        {/* Mobile swipe handle */}
        {isMobile && (
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 bg-muted rounded-full" />
          </div>
        )}

        {/* Image Section */}
        <div className={cn(
          "relative w-full bg-gradient-to-br from-purple-600/20 to-blue-600/20",
          isMobile && "rounded-t-[24px]"
        )}>
          <div className="aspect-[16/9] flex items-center justify-center p-8">
            <div className="text-8xl select-none">
              {currentStep === 0 && '🤸'}
              {currentStep === 1 && '🎯'}
              {currentStep === 2 && '🗺️'}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-6 flex-1">
          {/* Breadcrumbs */}
          <div className="flex items-center justify-center gap-2">
            {onboardingSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  index === currentStep 
                    ? "w-8 bg-purple-600" 
                    : index < currentStep
                    ? "w-2 bg-purple-600/50"
                    : "w-2 bg-muted"
                )}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          {/* Title and Description */}
          <div className="space-y-3 text-center">
            <h2 className="font-sans text-2xl font-semibold text-foreground">
              {currentStepData.title}
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-lg mx-auto">
              {currentStepData.description}
            </p>
          </div>
        </div>

        {/* Fixed CTA Buttons at Bottom */}
        <div className="p-6 pt-0 space-y-3 border-t border-border/50 bg-background/95 backdrop-blur-sm">
          {currentStep === 0 ? (
            // First step: Only Next button (full width)
            <Button
              onClick={handleNext}
              className={cn(
                'w-full rounded-full font-medium transition-all text-white gap-2',
                'bg-purple-600 hover:!bg-purple-600 [&:not(:disabled)]:active:!bg-purple-700 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
              )}
            >
              Next
              <ChevronRight size={16} />
            </Button>
          ) : (
            // Steps 2+: Back and Next side by side
            <div className="flex gap-3">
              <Button
                onClick={() => setCurrentStep(currentStep - 1)}
                variant="ghost"
                className="flex-1 rounded-full font-medium bg-transparent text-white hover:!bg-transparent active:!bg-white/10 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background border border-white transition-all"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                className={cn(
                  'flex-1 rounded-full font-medium transition-all text-white gap-2',
                  'bg-purple-600 hover:!bg-purple-600 [&:not(:disabled)]:active:!bg-purple-700 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                )}
              >
                {isLastStep ? 'Get Started' : 'Next'}
                {!isLastStep && <ChevronRight size={16} />}
              </Button>
            </div>
          )}
          
          {/* Skip button - text only, underneath main buttons */}
          <button
            onClick={handleSkip}
            className="w-full text-center text-sm text-white/60 hover:text-white/80 transition-colors font-medium py-2"
          >
            Skip for now
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;