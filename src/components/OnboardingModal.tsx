import React, { useState } from 'react';
import { X } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const STEPS = [
  {
    image: '/onboarding/step1.png',
    title: 'Welcome to the straps tree',
    description: 'Master aerial straps skills through a structured progression system. Each skill builds on the last, creating a clear path from beginner to advanced techniques.',
  },
  {
    image: '/onboarding/step2.png',
    title: 'Unlock skills as you progress',
    description: 'Complete prerequisite skills to unlock new challenges. Track your progress, mark favorites, and watch tutorial videos for each movement.',
  },
  {
    image: '/onboarding/step3.png',
    title: 'Navigate your skill tree',
    description: 'Zoom and pan to explore the tree. Tap any skill to view details, prerequisites, and what it unlocks next.',
  },
];

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState(0);

  if (!isOpen) return null;

  const isLast = step === STEPS.length - 1;

  const handleComplete = () => {
    localStorage.setItem('onboarding-completed', 'true');
    onComplete();
    onClose();
    setStep(0);
  };

  const handleNext = () => {
    if (isLast) handleComplete();
    else setStep(s => s + 1);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={handleComplete} />

      {/* Modal — fixed height, flex column */}
      <div
        className="relative w-full max-w-[500px] rounded-[10px] overflow-hidden flex flex-col"
        style={{
          background: '#2b303b',
          boxShadow: '0px 8px 24px 0px rgba(0,0,0,0.14)',
          height: 415,
        }}
      >
        {/* Hero image */}
        <div className="relative w-full h-[200px] shrink-0 overflow-hidden bg-[#1a1d23]">
          <img
            src={STEPS[step].image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* X close button */}
        <button
          onClick={handleComplete}
          className="absolute top-2 right-6 text-white/80 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Content — fills remaining height */}
        <div className="flex flex-col flex-1 px-6 pt-5 pb-6 min-h-0">

          {/* Step indicators */}
          <div className="flex gap-2 h-[3px] shrink-0">
            {STEPS.map((_, i) => (
              <div key={i} className="flex-1 rounded-full overflow-hidden">
                <div
                  className="h-full w-full rounded-full transition-colors duration-300"
                  style={{ background: i <= step ? '#d9d9d9' : 'rgba(255,255,255,0.1)' }}
                />
              </div>
            ))}
          </div>

          {/* Title + description — grows to fill space */}
          <div className="flex flex-col gap-2 flex-1 pt-4 min-h-0">
            <h2
              className="text-white text-[24px] leading-[32px] font-normal shrink-0"
              style={{ letterSpacing: '-0.6px' }}
            >
              {STEPS[step].title}
            </h2>
            <p className="text-white/80 text-[14px] leading-[20px] flex-1">
              {STEPS[step].description}
            </p>
          </div>

          {/* Footer — pinned to bottom */}
          <div className="flex items-center justify-between h-8 shrink-0">
            <button
              onClick={handleComplete}
              className="text-white/90 text-[14px] font-medium leading-[20px] hover:text-white transition-colors"
            >
              Skip for now
            </button>

            <div className="flex items-center gap-4">
              {step > 0 && (
                <button
                  onClick={() => setStep(s => s - 1)}
                  className="text-white/90 text-[14px] font-medium leading-[20px] hover:text-white transition-colors"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className="h-8 px-8 rounded-[24px] text-[14px] font-medium leading-[20px] text-white opacity-90 hover:opacity-100 transition-opacity"
                style={{ background: '#9952e0' }}
              >
                {isLast ? 'Got it' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
