import { useState, useRef, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageIcon } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  showSkeleton?: boolean;
}

export const ImageWithFallback = ({ 
  src, 
  alt, 
  fallbackSrc, 
  showSkeleton = true,
  className = "",
  ...props 
}: ImageWithFallbackProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    if (!hasError && fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-muted rounded-md ${className}`}>
        <div className="flex flex-col items-center gap-2 p-4 text-muted-foreground">
          <ImageIcon size={24} />
          <span className="text-xs text-center">{alt}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && showSkeleton && (
        <Skeleton className={`absolute inset-0 ${className}`} />
      )}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        {...props}
      />
    </div>
  );
};

// Optimized image component with responsive loading
export const ResponsiveImage = ({ 
  src, 
  alt, 
  className = "",
  sizes = "100vw",
  ...props 
}: ImageWithFallbackProps & { sizes?: string }) => {
  // Generate responsive image sizes if src includes specific patterns
  const generateSrcSet = (baseSrc: string) => {
    if (baseSrc.includes('unsplash.com') || baseSrc.includes('images.')) {
      const widths = [320, 640, 768, 1024, 1280, 1920];
      return widths.map(width => 
        `${baseSrc}?w=${width}&auto=format&fit=crop&q=80 ${width}w`
      ).join(', ');
    }
    return undefined;
  };

  const srcSet = generateSrcSet(src);

  return (
    <ImageWithFallback
      src={src}
      alt={alt}
      className={className}
      srcSet={srcSet}
      sizes={sizes}
      {...props}
    />
  );
};