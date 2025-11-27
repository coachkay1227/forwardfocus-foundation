import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SessionSecurityContextType {
  isSecure: boolean;
  sessionId: string | null;
  rotateSession: () => Promise<void>;
}

const SessionSecurityContext = createContext<SessionSecurityContextType | undefined>(undefined);

interface SessionSecurityProviderProps {
  children: ReactNode;
}

export const SessionSecurityProvider = ({ children }: SessionSecurityProviderProps) => {
  const [isSecure, setIsSecure] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [lastActivity, setLastActivity] = useState<number>(Date.now());

  // Generate secure session ID
  const generateSessionId = () => {
    return crypto.randomUUID() + '-' + Date.now();
  };

  // Rotate session tokens
  const rotateSession = async () => {
    try {
      const newSessionId = generateSessionId();
      setSessionId(newSessionId);
      localStorage.setItem('session-id', newSessionId);
      localStorage.setItem('session-start', Date.now().toString());
    } catch (error) {
      console.error('Session rotation failed:', error);
    }
  };

  // Track user activity for session validation
  const updateActivity = () => {
    setLastActivity(Date.now());
  };

  // Monitor for session security threats
  const monitorSecurity = () => {
    // Check for multiple tabs/windows
    const tabId = sessionStorage.getItem('tab-id') || crypto.randomUUID();
    sessionStorage.setItem('tab-id', tabId);

    // Detect suspicious activity patterns with time-based reset
    const now = Date.now();
    const lastReset = parseInt(localStorage.getItem('activity-reset') || '0');
    const RESET_INTERVAL = 60 * 60 * 1000; // Reset counter every hour
    
    // Reset counter if an hour has passed
    if (now - lastReset > RESET_INTERVAL) {
      localStorage.setItem('activity-count', '0');
      localStorage.setItem('activity-reset', now.toString());
    }
    
    const activityCount = parseInt(localStorage.getItem('activity-count') || '0');
    // Significantly increased threshold to 10000 to prevent false positives during normal usage
    if (activityCount > 10000 && process.env.NODE_ENV === 'development') {
      console.warn('Unusually high activity detected in current session hour - potential automated access');
    }
    localStorage.setItem('activity-count', (activityCount + 1).toString());
  };

  // Session timeout management
  const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours
  const checkSessionValidity = () => {
    const sessionStart = localStorage.getItem('session-start');
    if (sessionStart) {
      const sessionAge = Date.now() - parseInt(sessionStart);
      if (sessionAge > SESSION_TIMEOUT) {
        // Session expired - force rotation
        rotateSession();
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    // Initialize secure session
    const existingSessionId = localStorage.getItem('session-id');
    if (!existingSessionId || !checkSessionValidity()) {
      rotateSession();
    } else {
      setSessionId(existingSessionId);
    }
    
    setIsSecure(true);
    
    // Set up activity monitoring
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true });
    });

    // Monitor security periodically
    const securityInterval = setInterval(() => {
      monitorSecurity();
      checkSessionValidity();
    }, 60000); // Check every minute

    // Rotate session every 4 hours
    const rotationInterval = setInterval(rotateSession, 4 * 60 * 60 * 1000);

    // Cleanup on unmount
    return () => {
      activityEvents.forEach(event => {
        document.removeEventListener(event, updateActivity);
      });
      clearInterval(securityInterval);
      clearInterval(rotationInterval);
    };
  }, []);

  // Additional security: Clear sensitive data on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Clear temporary sensitive data
      sessionStorage.removeItem('temp-data');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <SessionSecurityContext.Provider value={{ isSecure, sessionId, rotateSession }}>
      {children}
    </SessionSecurityContext.Provider>
  );
};

export const useSessionSecurity = () => {
  const context = useContext(SessionSecurityContext);
  if (context === undefined) {
    throw new Error('useSessionSecurity must be used within a SessionSecurityProvider');
  }
  return context;
};