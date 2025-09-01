-- Fix security vulnerability for organizations_public view
-- Since it's a view, we need to recreate it with proper filtering
-- First, let's see the current definition and recreate it with security in mind

-- Drop and recreate the organizations_public view with built-in security
-- This view should only show verified organizations to maintain data privacy
DROP VIEW IF EXISTS public.organizations_public;

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
WHERE verified = true;  -- Only show verified organizations in the public view

-- Grant appropriate permissions
GRANT SELECT ON public.organizations_public TO anon, authenticated;