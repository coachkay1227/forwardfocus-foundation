-- Fix the security definer view issue by recreating the view without security definer
DROP VIEW public.organizations_public;

-- Create a regular view (not security definer) for public access
CREATE VIEW public.organizations_public AS
SELECT 
  id,
  name,
  description,
  city,
  state_code,
  website,
  verified,
  created_at,
  updated_at
FROM public.organizations;

-- Grant access to anonymous users for the view
GRANT SELECT ON public.organizations_public TO anon;
GRANT SELECT ON public.organizations_public TO authenticated;