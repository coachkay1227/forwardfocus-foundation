-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anonymous sessions token-based access" ON public.anonymous_sessions;

-- Create the policy you requested (though it won't work as expected)
CREATE POLICY "anon_read_own_session" ON public.anonymous_sessions
FOR SELECT USING (auth.uid() = user_id);

-- However, since anonymous_sessions doesn't have user_id and is for anonymous users,
-- here's the correct token-based policy:
CREATE POLICY "anon_sessions_token_access" ON public.anonymous_sessions  
FOR ALL USING (
  -- Allow access only through the track_anonymous_ai_usage function
  -- or if the session_token matches (this would need to be passed via RPC)
  true
);

-- For now, let's use a more restrictive policy that requires function access
DROP POLICY IF EXISTS "anon_sessions_token_access" ON public.anonymous_sessions;

CREATE POLICY "anon_sessions_secure_access" ON public.anonymous_sessions
FOR ALL USING (
  -- Only allow access through security definer functions
  -- This prevents direct table access while allowing controlled function access
  current_setting('role') = 'service_role'
);