-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anonymous sessions token-based access" ON public.anonymous_sessions;

-- Create a secure policy that only allows access through security definer functions
-- This prevents direct table access while allowing controlled function access
CREATE POLICY "anon_sessions_function_only" ON public.anonymous_sessions
FOR ALL USING (
  -- Only allow access through security definer functions (service role)
  -- This prevents direct client access while preserving function functionality
  current_setting('role') = 'service_role' OR 
  -- Allow the functions to access via their security definer context
  auth.role() = 'service_role'
);