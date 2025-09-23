import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface AnalyticsEvent {
  action_type: 'page_view' | 'form_submit' | 'ai_interaction' | 'download' | 'click' | 'conversion' | 'error';
  page_path?: string;
  referrer?: string;
  session_id?: string;
  additional_data?: Record<string, any>;
}

export const useAnalytics = () => {
  const location = useLocation();
  const { user } = useAuth();

  // Generate or get session ID
  const getSessionId = useCallback(() => {
    let sessionId = localStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }, []);

  // Track page view automatically
  useEffect(() => {
    trackEvent({
      action_type: 'page_view',
      page_path: location.pathname,
      referrer: document.referrer || undefined,
    });
  }, [location.pathname]);

  const trackEvent = useCallback(async (event: AnalyticsEvent) => {
    try {
      const sessionId = getSessionId();
      
      const analyticsData = {
        action_type: event.action_type,
        page_path: event.page_path || location.pathname,
        referrer: event.referrer,
        session_id: sessionId,
        user_id: user?.id || null,
        ip_address: null, // Will be set server-side
        user_agent: navigator.userAgent,
        additional_data: {
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight
          },
          timestamp: Date.now(),
          ...event.additional_data
        }
      };

      await supabase.from('website_analytics').insert(analyticsData);
    } catch (error) {
      // Silently fail analytics to not impact user experience
      console.debug('Analytics tracking failed:', error);
    }
  }, [location.pathname, user?.id, getSessionId]);

  const trackFormSubmission = useCallback((formType: string, formData?: Record<string, any>) => {
    trackEvent({
      action_type: 'form_submit',
      additional_data: {
        form_type: formType,
        form_data: formData
      }
    });
  }, [trackEvent]);

  const trackAIInteraction = useCallback((aiEndpoint: string, interactionData?: Record<string, any>) => {
    trackEvent({
      action_type: 'ai_interaction',
      additional_data: {
        ai_endpoint: aiEndpoint,
        ...interactionData
      }
    });
  }, [trackEvent]);

  const trackConversion = useCallback((conversionType: string, conversionData?: Record<string, any>) => {
    trackEvent({
      action_type: 'conversion',
      additional_data: {
        conversion_type: conversionType,
        ...conversionData
      }
    });
  }, [trackEvent]);

  const trackClick = useCallback((element: string, elementData?: Record<string, any>) => {
    trackEvent({
      action_type: 'click',
      additional_data: {
        element,
        ...elementData
      }
    });
  }, [trackEvent]);

  const trackError = useCallback((errorType: string, errorMessage?: string, errorData?: Record<string, any>) => {
    trackEvent({
      action_type: 'error',
      additional_data: {
        error_type: errorType,
        error_message: errorMessage,
        ...errorData
      }
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackFormSubmission,
    trackAIInteraction,
    trackConversion,
    trackClick,
    trackError
  };
};

// Performance tracking hook
export const usePerformanceTracking = () => {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    // Track page load performance
    if ('performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            
            trackEvent({
              action_type: 'page_view',
              additional_data: {
                performance: {
                  dns_lookup: navEntry.domainLookupEnd - navEntry.domainLookupStart,
                  connection_time: navEntry.connectEnd - navEntry.connectStart,
                  response_time: navEntry.responseEnd - navEntry.responseStart,
                  dom_load: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
                  page_load: navEntry.loadEventEnd - navEntry.loadEventStart,
                  total_time: navEntry.loadEventEnd - navEntry.fetchStart
                }
              }
            });
          }
        }
      });

      observer.observe({ entryTypes: ['navigation'] });

      return () => observer.disconnect();
    }
  }, [trackEvent]);

  // Track Core Web Vitals (optional dependency)
  useEffect(() => {
    const loadWebVitals = async () => {
      try {
        const webVitals = await import('web-vitals');
        
        webVitals.onCLS((metric) => {
          trackEvent({
            action_type: 'page_view',
            additional_data: {
              web_vital: {
                name: 'CLS',
                value: metric.value,
                rating: metric.rating
              }
            }
          });
        });

        webVitals.onINP?.((metric) => {
          trackEvent({
            action_type: 'page_view',
            additional_data: {
              web_vital: {
                name: 'INP',
                value: metric.value,
                rating: metric.rating
              }
            }
          });
        });

        webVitals.onFCP((metric) => {
          trackEvent({
            action_type: 'page_view',
            additional_data: {
              web_vital: {
                name: 'FCP',
                value: metric.value,
                rating: metric.rating
              }
            }
          });
        });

        webVitals.onLCP((metric) => {
          trackEvent({
            action_type: 'page_view',
            additional_data: {
              web_vital: {
                name: 'LCP',
                value: metric.value,
                rating: metric.rating
              }
            }
          });
        });

        webVitals.onTTFB((metric) => {
          trackEvent({
            action_type: 'page_view',
            additional_data: {
              web_vital: {
                name: 'TTFB',
                value: metric.value,
                rating: metric.rating
              }
            }
          });
        });
      } catch (error) {
        // web-vitals not available or failed to load
        console.debug('Web Vitals library not available:', error);
      }
    };

    loadWebVitals();
  }, [trackEvent]);

  return { trackEvent };
};