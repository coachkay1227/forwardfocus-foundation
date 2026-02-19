import { useEffect } from 'react';
import { useAnalyticsContext } from '@/components/layout/AnalyticsProvider';

export const usePerformanceMonitoring = () => {
  const { trackEvent } = useAnalyticsContext();

  useEffect(() => {
    // Monitor Core Web Vitals
    const observeWebVitals = () => {
      // Cumulative Layout Shift
      if ('LayoutShift' in window) {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
        });
        observer.observe({ type: 'layout-shift', buffered: true });

        // Report CLS after 5 seconds
        setTimeout(() => {
          trackEvent({
            action_type: 'page_view',
            event_data: {
              metric: 'CLS',
              value: clsValue,
              rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor'
            }
          });
        }, 5000);
      }

      // First Input Delay
      const handleFirstInput = (entry: PerformanceEventTiming) => {
        const fid = entry.processingStart - entry.startTime;
        trackEvent({
          action_type: 'page_view',
          event_data: {
            metric: 'FID',
            value: fid,
            rating: fid < 100 ? 'good' : fid < 300 ? 'needs-improvement' : 'poor'
          }
        });
      };

      if ('PerformanceEventTiming' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            handleFirstInput(entry as PerformanceEventTiming);
          }
        });
        observer.observe({ type: 'first-input', buffered: true });
      }

      // Largest Contentful Paint
      if ('LargestContentfulPaint' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          const lcp = lastEntry.startTime;
          
          trackEvent({
            action_type: 'page_view',
            event_data: {
              metric: 'LCP',
              value: lcp,
              rating: lcp < 2500 ? 'good' : lcp < 4000 ? 'needs-improvement' : 'poor'
            }
          });
        });
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
      }
    };

    // Monitor page load performance
    const trackPageLoadMetrics = () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        const timing = performance.timing;
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

        if (navigation) {
          const metrics = {
            dns_lookup: navigation.domainLookupEnd - navigation.domainLookupStart,
            tcp_connect: navigation.connectEnd - navigation.connectStart,
            server_response: navigation.responseStart - navigation.requestStart,
            dom_processing: navigation.domContentLoadedEventEnd - navigation.responseEnd,
            page_load: navigation.loadEventEnd - navigation.startTime,
            ttfb: navigation.responseStart - navigation.requestStart
          };

          trackEvent({
            action_type: 'page_view',
            event_data: {
              ...metrics,
              metric_type: 'page_load_performance'
            }
          });
        }
      }
    };

    // Track metrics after page load
    if (document.readyState === 'complete') {
      trackPageLoadMetrics();
      observeWebVitals();
    } else {
      window.addEventListener('load', () => {
        setTimeout(trackPageLoadMetrics, 0);
        observeWebVitals();
      });
    }

    // Monitor memory usage (if available)
    const trackMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        trackEvent({
          action_type: 'page_view',
          event_data: {
            used: memory.usedJSHeapSize,
            total: memory.totalJSHeapSize,
            limit: memory.jsHeapSizeLimit,
            usage_percentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
            metric_type: 'memory_usage'
          }
        });
      }
    };

    // Track memory usage every 30 seconds
    const memoryInterval = setInterval(trackMemoryUsage, 30000);

    return () => {
      clearInterval(memoryInterval);
    };
  }, [trackEvent]);
};