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
      
      // Check existing trial session
      const { data: session, error } = await supabase
        .from('ai_trial_sessions')
        .select('*')
        .eq('session_id', sessionToken)
        .eq('ai_endpoint', aiEndpoint)
        .single();

      const now = new Date();
      let trialExpired = false;
      let timeRemaining = 180; // 3 minutes default
      let usageCount = 0;

      if (session) {
        const trialEnd = new Date(session.trial_end || session.trial_start);
        trialEnd.setMinutes(trialEnd.getMinutes() + 3);
        timeRemaining = Math.max(0, Math.floor((trialEnd.getTime() - now.getTime()) / 1000));
        trialExpired = session.is_expired || timeRemaining === 0;
        usageCount = session.usage_count || 0;
      } else {
        // Create new trial session
        await supabase.from('ai_trial_sessions').insert({
          session_id: sessionToken,
          ai_endpoint: aiEndpoint,
          trial_start: now.toISOString(),
          usage_count: 0
        });
      }

      setSessionState({
        sessionToken,
        timeRemaining,
        usageCount,
        trialExpired,
        isNewSession: !session
      });

      return !trialExpired;
    } catch (error) {
      console.error('Error in checkTrialAccess:', error);
      return false;
    }
  }, [getSessionToken]);

  // Transfer anonymous session to user account
  const transferToUser = useCallback(async (userId: string): Promise<{ success: boolean; conversationHistory?: any }> => {
    try {
      const sessionToken = getSessionToken();
      
      // Update trial sessions to link to user
      const { error: updateError } = await supabase
        .from('ai_trial_sessions')
        .update({ user_id: userId })
        .eq('session_id', sessionToken);

      if (updateError) {
        console.error('Error transferring session:', updateError);
        return { success: false };
      }

      // Get chat history for this session
      const { data: chatHistory } = await supabase
        .from('chat_history')
        .select('*')
        .eq('session_id', sessionToken)
        .order('created_at', { ascending: true });

      // Update chat history to link to user
      await supabase
        .from('chat_history')
        .update({ user_id: userId })
        .eq('session_id', sessionToken);

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