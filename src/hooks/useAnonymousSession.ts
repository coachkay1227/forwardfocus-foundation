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
      
      // Use the database function to track usage
      const { data: sessionId, error } = await supabase.rpc('track_anonymous_ai_usage', {
        p_session_id: sessionToken,
        p_ai_endpoint: aiEndpoint
      });

      if (error) {
        if (error.message.includes('Trial period has expired')) {
          setSessionState(prev => prev ? {
            ...prev,
            trialExpired: true,
            timeRemaining: 0
          } : null);
          return false;
        }
        console.error('Error tracking AI usage:', error);
        return false;
      }

      // Fetch updated session info
      const { data: sessionData, error: fetchError } = await supabase
        .from('ai_trial_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (fetchError || !sessionData) {
        console.error('Error fetching session data:', fetchError);
        return false;
      }

      const now = new Date();
      const trialEnd = new Date(sessionData.trial_end);
      const timeLeft = Math.floor((trialEnd.getTime() - now.getTime()) / 1000);

      setSessionState({
        sessionToken,
        timeRemaining: Math.max(0, timeLeft),
        usageCount: sessionData.usage_count,
        trialExpired: sessionData.is_expired,
        isNewSession: sessionData.usage_count === 1
      });

      return !sessionData.is_expired;
    } catch (error) {
      console.error('Error in checkTrialAccess:', error);
      return false;
    }
  }, [getSessionToken]);

  // Transfer anonymous session to user account
  const transferToUser = useCallback(async (userId: string): Promise<{ success: boolean; conversationHistory?: any }> => {
    try {
      const sessionToken = getSessionToken();
      
      // Get chat history before transfer
      const { data: chatHistory } = await supabase
        .from('chat_history')
        .select('*')
        .eq('session_id', sessionToken)
        .order('created_at', { ascending: true });

      // Use the database function to transfer session
      const { error } = await supabase.rpc('transfer_anonymous_session_to_user', {
        p_session_id: sessionToken,
        p_user_id: userId
      });

      if (error) {
        console.error('Error transferring session:', error);
        return { success: false };
      }

      // Clear local session after successful transfer
      localStorage.removeItem('anonymous_session_token');
      setSessionState(null);

      return {
        success: true,
        conversationHistory: chatHistory
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