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
    if (!calendlyReady) {
      alert('Calendly is still loading. Please wait a second and try again.');
      return;
    }
    window.Calendly.initPopupWidget({ url });
  };

  return { openCalendly, calendlyReady };
};
