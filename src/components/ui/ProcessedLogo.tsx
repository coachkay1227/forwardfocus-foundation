import { useState, useEffect } from 'react';
import { makeImageWhite } from '@/lib/background-removal';

interface ProcessedLogoProps {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}

export const ProcessedLogo = ({ src, alt, className = "", fallbackClassName = "" }: ProcessedLogoProps) => {
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const processLogo = async () => {
      setIsProcessing(true);
      setError(false);
      
      try {
        const whiteLogo = await makeImageWhite(src);
        setProcessedSrc(whiteLogo);
      } catch (err) {
        console.error('Failed to process logo:', err);
        setError(true);
      } finally {
        setIsProcessing(false);
      }
    };

    processLogo();
  }, [src]);

  // Show loading state or fallback to original
  if (isProcessing || error || !processedSrc) {
    return (
      <img 
        src={src} 
        alt={alt} 
        className={`${fallbackClassName || className} ${error ? 'brightness-0 invert' : ''}`}
      />
    );
  }

  return (
    <img 
      src={processedSrc} 
      alt={alt} 
      className={className}
    />
  );
};