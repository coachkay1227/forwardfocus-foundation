-- Create a public view that exposes only non-sensitive organization data
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

-- Enable RLS on the view
ALTER VIEW public.organizations_public SET (security_invoker = true);

-- Grant access to the public view for all users (including anonymous)
GRANT SELECT ON public.organizations_public TO anon;
GRANT SELECT ON public.organizations_public TO authenticated;