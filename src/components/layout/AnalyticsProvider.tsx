import React, { createContext, useContext, ReactNode } from 'react';
import { useAnalytics, usePerformanceTracking } from '@/hooks/useAnalytics';

interface AnalyticsContextType {
  trackEvent: ReturnType<typeof useAnalytics>['trackEvent'];
  trackFormSubmission: ReturnType<typeof useAnalytics>['trackFormSubmission'];
  trackAIInteraction: ReturnType<typeof useAnalytics>['trackAIInteraction'];
  trackConversion: ReturnType<typeof useAnalytics>['trackConversion'];
  trackClick: ReturnType<typeof useAnalytics>['trackClick'];
  trackError: ReturnType<typeof useAnalytics>['trackError'];
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const useAnalyticsContext = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalyticsContext must be used within AnalyticsProvider');
  }
  return context;
};

interface AnalyticsProviderProps {
  children: ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const analytics = useAnalytics();
  usePerformanceTracking(); // Initialize performance tracking

  const value = {
    trackEvent: analytics.trackEvent,
    trackFormSubmission: analytics.trackFormSubmission,
    trackAIInteraction: analytics.trackAIInteraction,
    trackConversion: analytics.trackConversion,
    trackClick: analytics.trackClick,
    trackError: analytics.trackError,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};