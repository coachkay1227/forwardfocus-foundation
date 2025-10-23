import { useState, useEffect } from 'react';

declare global {
  interface Window {
    Calendly?: any;
  }
}

export const useCalendlyPopup = () => {
  const [calendlyReady, setCalendlyReady] = useState(false);

  useEffect(() => {
    // Check immediately if already loaded
    if (window.Calendly) {
      console.log('Calendly already loaded');
      setCalendlyReady(true);
      return;
    }

    // Poll for Calendly with timeout
    let attempts = 0;
    const maxAttempts = 20; // 10 seconds
    const checkCalendly = setInterval(() => {
      attempts++;
      console.log(`Checking for Calendly... attempt ${attempts}`);
      
      if (window.Calendly) {
        console.log('Calendly loaded successfully');
        setCalendlyReady(true);
        clearInterval(checkCalendly);
      } else if (attempts >= maxAttempts) {
        console.error('Calendly failed to load after 10 seconds');
        clearInterval(checkCalendly);
      }
    }, 500);
    
    return () => clearInterval(checkCalendly);
  }, []);

  const openCalendly = (url: string) => {
    console.log('openCalendly called with url:', url);
    console.log('calendlyReady:', calendlyReady);
    console.log('window.Calendly:', window.Calendly);
    
    if (!window.Calendly) {
      console.error('Calendly not loaded');
      alert('Calendly is still loading. Please wait a moment and try again.');
      return;
    }
    
    try {
      console.log('Calling Calendly.initPopupWidget');
      window.Calendly.initPopupWidget({ url });
    } catch (error) {
      console.error('Error opening Calendly:', error);
      alert('Unable to open Calendly. Please try refreshing the page.');
    }
  };

  return { openCalendly, calendlyReady };
};
