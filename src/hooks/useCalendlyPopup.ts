import { useState, useEffect } from 'react';

declare global {
  interface Window {
    Calendly?: any;
  }
}

export const useCalendlyPopup = () => {
  const [calendlyReady, setCalendlyReady] = useState(false);

  useEffect(() => {
    const checkCalendly = setInterval(() => {
      if (window.Calendly) {
        setCalendlyReady(true);
        clearInterval(checkCalendly);
      }
    }, 500);
    return () => clearInterval(checkCalendly);
  }, []);

  const openCalendly = (url: string) => {
    if (!calendlyReady || !window.Calendly) {
      console.error('Calendly not ready');
      alert('Calendly is still loading. Please wait a second and try again.');
      return;
    }
    
    try {
      window.Calendly.initPopupWidget({ url });
    } catch (error) {
      console.error('Error opening Calendly:', error);
      alert('Unable to open Calendly. Please try refreshing the page.');
    }
  };

  return { openCalendly, calendlyReady };
};
