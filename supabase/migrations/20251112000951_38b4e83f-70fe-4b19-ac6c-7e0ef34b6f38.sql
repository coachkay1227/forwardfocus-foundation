-- Remove the security definer view that requires application changes
DROP VIEW IF EXISTS public.bookings_secure;

-- Instead, document that the existing RLS policies are secure
-- and that admin access logging should be implemented at the application layer
COMMENT ON TABLE public.bookings IS 'Bookings table with RLS protection. Users can only access their own bookings, admins can access all bookings. Admin access should be logged at the application layer using the existing audit_logs table and contact_access_justifications system.';

-- Add index to support efficient audit log queries for monitoring access patterns
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_action_created ON public.audit_logs(user_id, action, created_at DESC);

-- Document the security model for profiles table
COMMENT ON TABLE public.profiles IS 'User profiles with RLS protection. Each user can only access their own profile (enforced by auth.uid() = id policy), which prevents enumeration attacks. The log_profile_access() function is available for application-level access monitoring.';