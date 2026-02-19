-- Fix security vulnerability: Add RLS policies to organizations_public
-- Enable RLS on organizations_public (if it's a table/view that supports it)
ALTER TABLE public.organizations_public ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view verified organizations (public data)
CREATE POLICY "Anyone can view verified organizations" 
ON public.organizations_public 
FOR SELECT 
USING (verified = true);

-- Allow authenticated users to view all organizations in public view
CREATE POLICY "Authenticated users can view all public organizations" 
ON public.organizations_public 
FOR SELECT 
USING (auth.uid() IS NOT NULL);