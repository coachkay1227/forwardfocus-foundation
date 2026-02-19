-- Remove the views that are causing security definer issues
DROP VIEW public.organizations_admin;
DROP VIEW public.organizations_public;

-- The access control will be handled entirely at the application level
-- by selecting different columns based on user roles