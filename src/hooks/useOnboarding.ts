import { useState, useEffect } from 'react';

export const useOnboarding = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('onboarding-completed');
    
    if (!hasCompletedOnboarding) {
      // Small delay to let the app load first
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, []);

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
