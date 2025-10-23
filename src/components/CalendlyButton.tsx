import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    Calendly?: any;
  }
}

export default function CalendlyButton() {
  const [calendlyReady, setCalendlyReady] = useState(false);

  // Wait for Calendly script to load
  useEffect(() => {
    const checkCalendly = setInterval(() => {
      if (window.Calendly) {
        setCalendlyReady(true);
        clearInterval(checkCalendly);
      }
    }, 500);
    return () => clearInterval(checkCalendly);
  }, []);

  const openCalendly = () => {
    if (!calendlyReady) {
      alert('Calendly is still loading. Please wait a second and try again.');
      return;
    }
    window.Calendly.initPopupWidget({
      url: 'https://calendly.com/ffe_coach_kay'
    });
  };

  return (
    <button
      type="button"
      onClick={openCalendly}
      className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-primary/90 transition-all duration-300"
    >
      Book a Session
    </button>
  );
}
