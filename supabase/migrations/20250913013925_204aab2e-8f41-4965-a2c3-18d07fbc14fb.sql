-- Remove the security-risky view that bypasses RLS
-- Views can expose sensitive data by bypassing Row Level Security policies

DROP VIEW IF EXISTS public.organizations_public CASCADE;

-- Confirm the view is removed by checking if it exists
-- (This is just for verification - the DROP should handle it)

-- Anonymous users should only access organization data through
-- the secure functions: get_safe_organizations_public() or get_organizations_public_safe()
-- These functions provide proper audit logging and column filtering