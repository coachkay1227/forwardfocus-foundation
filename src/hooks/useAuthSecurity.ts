import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface RateLimitStatus {
  isRateLimited: boolean;
  attemptsRemaining: number;
  resetAt: string | null;
  requiresCaptcha: boolean;
  isLockedOut: boolean;
  lockoutUntil: string | null;
}

interface AuthSecurityHook {
  rateLimitStatus: RateLimitStatus | null;
  loading: boolean;
  checkRateLimit: (email?: string) => Promise<RateLimitStatus>;
  recordLoginAttempt: (email: string, success: boolean, failureReason?: string) => Promise<void>;
  getClientIp: () => Promise<string>;
}

const DEFAULT_RATE_LIMIT_STATUS: RateLimitStatus = {
  isRateLimited: false,
  attemptsRemaining: 5,
  resetAt: null,
  requiresCaptcha: false,
  isLockedOut: false,
  lockoutUntil: null,
};

export const useAuthSecurity = (): AuthSecurityHook => {
  const [rateLimitStatus, setRateLimitStatus] = useState<RateLimitStatus | null>(null);
  const [loading, setLoading] = useState(false);

  const getClientIp = useCallback(async (): Promise<string> => {
    try {
      // Try to get IP from a reliable service
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip || 'unknown';
    } catch {
      return 'unknown';
    }
  }, []);

  const checkRateLimit = useCallback(async (email?: string): Promise<RateLimitStatus> => {
    setLoading(true);
    try {
      const ipAddress = await getClientIp();
      
      const { data, error } = await supabase.functions.invoke('validate-auth-security', {
        body: {
          action: 'check-rate-limit',
          email,
          ipAddress,
          userAgent: navigator.userAgent,
        },
      });

      if (error) {
        console.error('Rate limit check failed:', error);
        return DEFAULT_RATE_LIMIT_STATUS;
      }

      const status: RateLimitStatus = {
        isRateLimited: data.isRateLimited || false,
        attemptsRemaining: data.attemptsRemaining ?? 5,
        resetAt: data.resetAt || null,
        requiresCaptcha: data.requiresCaptcha || false,
        isLockedOut: data.isLockedOut || false,
        lockoutUntil: data.lockoutUntil || null,
      };

      setRateLimitStatus(status);
      return status;
    } catch (error) {
      console.error('Rate limit check error:', error);
      return DEFAULT_RATE_LIMIT_STATUS;
    } finally {
      setLoading(false);
    }
  }, [getClientIp]);

  const recordLoginAttempt = useCallback(async (
    email: string,
    success: boolean,
    failureReason?: string
  ): Promise<void> => {
    try {
      const ipAddress = await getClientIp();
      
      await supabase.functions.invoke('validate-auth-security', {
        body: {
          action: 'record-attempt',
          email,
          ipAddress,
          userAgent: navigator.userAgent,
          success,
          failureReason,
          attemptType: 'login',
        },
      });

      // Refresh rate limit status after recording attempt
      if (!success) {
        await checkRateLimit(email);
      }
    } catch (error) {
      console.error('Failed to record login attempt:', error);
    }
  }, [getClientIp, checkRateLimit]);

  return {
    rateLimitStatus,
    loading,
    checkRateLimit,
    recordLoginAttempt,
    getClientIp,
  };
};
