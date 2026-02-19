import { createContext, useContext, useEffect, ReactNode } from 'react';
import { setupSecurityHeaders, auditLog } from '@/lib/security-headers';

interface SecurityContextType {
  logSecurityEvent: (action: string, details?: Record<string, any>) => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

interface SecurityProviderProps {
  children: ReactNode;
}

export const SecurityProvider = ({ children }: SecurityProviderProps) => {
  useEffect(() => {
    // Setup security headers on app initialization
    setupSecurityHeaders();
    
    // Log initial app load
    auditLog.log(auditLog.actions.ADMIN_ACCESS, {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    });
  }, []);

  const logSecurityEvent = (action: string, details: Record<string, any> = {}) => {
    auditLog.log(action, {
      ...details,
      timestamp: new Date().toISOString(),
      url: window.location.href
    });
  };

  return (
    <SecurityContext.Provider value={{ logSecurityEvent }}>
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};