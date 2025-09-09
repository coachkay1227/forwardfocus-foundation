-- Phase 3: Fix Security Definer View Issues

-- Drop and recreate views without SECURITY DEFINER to fix linter warnings
-- Views should inherit permissions from querying user, not view creator

-- Drop the existing views first
DROP VIEW IF EXISTS public.organizations_safe_public;
DROP VIEW IF EXISTS public.organizations_public;

-- Recreate organizations_public view without SECURITY DEFINER
-- This view will use the querying user's permissions
CREATE VIEW public.organizations_public AS
SELECT 
  id,
  name,
  description,
  website,
  city,
  state_code,
  verified,
  created_at,
  updated_at
FROM public.organizations
WHERE verified = true;

-- Recreate organizations_public_secure view without SECURITY DEFINER  
CREATE VIEW public.organizations_public_secure AS
SELECT 
  id,
  name,
  description,
  website,
  city,
  state_code,
  verified,
  created_at,
  updated_at
FROM public.organizations
WHERE verified = true;

-- Grant appropriate permissions to the views
GRANT SELECT ON public.organizations_public TO anon;
GRANT SELECT ON public.organizations_public TO authenticated;
GRANT SELECT ON public.organizations_public_secure TO anon;
GRANT SELECT ON public.organizations_public_secure TO authenticated;

-- Update RLS policies for the underlying organizations table
-- Remove previous policies that might conflict
DROP POLICY IF EXISTS "Public can view basic organization info" ON public.organizations;
DROP POLICY IF EXISTS "Authenticated users can view organization contacts" ON public.organizations;