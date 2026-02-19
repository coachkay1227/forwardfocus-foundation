-- Fix the Security Definer View issue by ensuring proper ownership and permissions
-- The issue is likely that the view is owned by postgres superuser

-- Drop the existing view
DROP VIEW IF EXISTS public.organizations_public;

-- Create the view with explicit ownership and permissions
-- Using a more explicit approach to avoid any implicit SECURITY DEFINER behavior

-- Instead of a view, let's create a more secure approach using a function
-- that returns a table, which gives us better control over permissions

CREATE OR REPLACE FUNCTION public.get_verified_organizations()
RETURNS TABLE (
    id uuid,
    name text,
    description text,
    website text,
    city text,
    state_code text,
    verified boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
)
LANGUAGE sql
STABLE
SECURITY INVOKER  -- This is the key difference - uses caller's permissions
SET search_path TO 'public'
AS $function$
    SELECT 
        o.id,
        o.name,
        o.description,
        o.website,
        o.city,
        o.state_code,
        o.verified,
        o.created_at,
        o.updated_at
    FROM public.organizations o
    WHERE o.verified = true;
$function$;

-- Grant permissions to the function
GRANT EXECUTE ON FUNCTION public.get_verified_organizations() TO anon;
GRANT EXECUTE ON FUNCTION public.get_verified_organizations() TO authenticated;

-- For backwards compatibility, create a simple view that doesn't inherit superuser privileges
-- by ensuring it uses SECURITY INVOKER semantics
CREATE VIEW public.organizations_public 
WITH (security_invoker = true) AS
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

-- Explicitly grant permissions
GRANT SELECT ON public.organizations_public TO anon;
GRANT SELECT ON public.organizations_public TO authenticated;