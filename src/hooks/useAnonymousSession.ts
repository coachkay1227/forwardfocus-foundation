import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AnonymousSessionState {
  sessionToken: string;
  timeRemaining: number;
  usageCount: number;
  trialExpired: boolean;
  isNewSession: boolean;
}

interface UseAnonymousSessionReturn {
  sessionState: AnonymousSessionState | null;
  checkTrialAccess: (aiEndpoint: string, conversationData?: any) => Promise<boolean>;
  transferToUser: (userId: string) => Promise<{ success: boolean; conversationHistory?: any }>;
  timeRemainingFormatted: string;
}

export const useAnonymousSession = (): UseAnonymousSessionReturn => {
  const [sessionState, setSessionState] = useState<AnonymousSessionState | null>(null);

  // Generate or get session token
  const getSessionToken = useCallback(() => {
    let token = localStorage.getItem('anonymous_session_token');
    if (!token) {
      token = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('anonymous_session_token', token);
    }
    return token;
  }, []);

  // Format time remaining as MM:SS
  const formatTimeRemaining = useCallback((seconds: number): string => {
    if (seconds <= 0) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  // Check if user can access AI (for trial users)
  const checkTrialAccess = useCallback(async (aiEndpoint: string, conversationData?: any): Promise<boolean> => {
    try {
      const sessionToken = getSessionToken();
      
      const { data, error } = await supabase.rpc('track_anonymous_ai_usage', {
        p_session_token: sessionToken,
        p_ai_endpoint: aiEndpoint,
        p_conversation_data: conversationData ? JSON.stringify(conversationData) : null
      });

      if (error) {
        console.error('Error checking trial access:', error);
        return false;
      }

      // Type assertion for the response data
      const responseData = data as any;

      // Update session state
      setSessionState({
        sessionToken,
        timeRemaining: responseData?.time_remaining || 0,
        usageCount: responseData?.usage_count || 0,
        trialExpired: responseData?.trial_expired || false,
        isNewSession: responseData?.is_new_session || false
      });

      return responseData?.allowed || false;
    } catch (error) {
      console.error('Error in checkTrialAccess:', error);
      return false;
    }
  }, [getSessionToken]);

  // Transfer anonymous session to user account
  const transferToUser = useCallback(async (userId: string): Promise<{ success: boolean; conversationHistory?: any }> => {
    try {
      const sessionToken = getSessionToken();
      
      const { data, error } = await supabase.rpc('transfer_anonymous_session_to_user', {
        p_session_token: sessionToken,
        p_user_id: userId
      });

      if (error) {
        console.error('Error transferring session:', error);
        return { success: false };
      }

      // Type assertion for the response data
      const responseData = data as any;

      // Clear local session after successful transfer
      localStorage.removeItem('anonymous_session_token');
      setSessionState(null);

      return {
        success: responseData?.success || false,
        conversationHistory: responseData?.conversation_history
      };
    } catch (error) {
      console.error('Error in transferToUser:', error);
      return { success: false };
    }
  }, [getSessionToken]);

  // Initialize session state on mount
  useEffect(() => {
    const sessionToken = getSessionToken();
    if (sessionToken) {
      setSessionState({
        sessionToken,
        timeRemaining: 180, // 3 minutes default
        usageCount: 0,
        trialExpired: false,
        isNewSession: true
      });
    }
  }, [getSessionToken]);

  return {
    sessionState,
    checkTrialAccess,
    transferToUser,
    timeRemainingFormatted: formatTimeRemaining(sessionState?.timeRemaining || 0)
  };
};