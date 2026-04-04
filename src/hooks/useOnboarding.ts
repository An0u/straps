import { useState } from 'react';

export const useOnboarding = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Onboarding is triggered manually via the ? button, not auto-started

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  const resetOnboarding = () => {
    localStorage.removeItem('onboarding-completed');
    setShowOnboarding(true);
  };

  return {
    showOnboarding,
    setShowOnboarding,
    handleOnboardingComplete,
    resetOnboarding,
  };
};
