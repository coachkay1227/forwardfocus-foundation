// Security headers and configuration for the application
export const setupSecurityHeaders = () => {
  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; ');

  // Add security-related meta tags if they don't exist
  const addMetaTag = (name: string, content: string) => {
    if (!document.querySelector(`meta[name="${name}"]`)) {
      const meta = document.createElement('meta');
      meta.name = name;
      meta.content = content;
      document.head.appendChild(meta);
    }
  };

  // Add Content Security Policy
  addMetaTag('Content-Security-Policy', csp);
  
  // Add other security headers as meta tags (for client-side reference)
  addMetaTag('X-Content-Type-Options', 'nosniff');
  addMetaTag('X-Frame-Options', 'DENY');
  addMetaTag('X-XSS-Protection', '1; mode=block');
  addMetaTag('Referrer-Policy', 'strict-origin-when-cross-origin');
  addMetaTag('Permissions-Policy', 'camera=(), microphone=(), location=(), payment=()');
};

// Security configuration object
export const securityConfig = {
  // Rate limiting settings
  rateLimit: {
    contact: { maxAttempts: 3, windowMs: 300000 }, // 3 attempts per 5 minutes
    referral: { maxAttempts: 2, windowMs: 600000 }, // 2 attempts per 10 minutes
    partnership: { maxAttempts: 2, windowMs: 600000 }, // 2 attempts per 10 minutes
    admin: { maxAttempts: 50, windowMs: 3600000 } // 50 attempts per hour
  },
  
  // Input validation settings
  validation: {
    name: { minLength: 2, maxLength: 100 },
    email: { maxLength: 254 },
    phone: { minLength: 10, maxLength: 15 },
    message: { minLength: 10, maxLength: 1000 },
    notes: { minLength: 10, maxLength: 500 },
    description: { minLength: 10, maxLength: 1000 }
  },
  
  // CSRF token settings
  csrf: {
    tokenLength: 32,
    headerName: 'X-CSRF-Token'
  }
};

// Audit logging helper
export const auditLog = {
  actions: {
    FORM_SUBMIT: 'FORM_SUBMIT',
    CONTACT_VIEW: 'CONTACT_VIEW',
    STATUS_UPDATE: 'STATUS_UPDATE',
    ADMIN_ACCESS: 'ADMIN_ACCESS',
    RATE_LIMIT_HIT: 'RATE_LIMIT_HIT'
  },
  
  // Log security events (client-side logging for debugging)
  log: (action: string, details: Record<string, any> = {}) => {
    if (import.meta.env.DEV) {
      console.log(`[SECURITY AUDIT] ${action}:`, details);
    }
  }
};