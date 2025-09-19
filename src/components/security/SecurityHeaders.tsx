import { useEffect } from 'react';

export const SecurityHeaders = () => {
  useEffect(() => {
    // Set additional security headers via meta tags for CSR environments
    // Note: For production, these should be set at the server/CDN level
    const meta = document.createElement('meta');
    meta.httpEquiv = 'X-Frame-Options';
    meta.content = 'DENY';
    document.head.appendChild(meta);

    const cspMeta = document.createElement('meta');
    cspMeta.httpEquiv = 'Content-Security-Policy';
    cspMeta.content = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self';";
    document.head.appendChild(cspMeta);

    return () => {
      document.head.removeChild(meta);
      document.head.removeChild(cspMeta);
    };
  }, []);

  return null;
};