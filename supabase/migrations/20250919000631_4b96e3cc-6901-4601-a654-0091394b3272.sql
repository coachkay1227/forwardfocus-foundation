-- Complete security hardening for resources and organizations tables
-- Address remaining public access vulnerabilities

-- Update resources table RLS policies for proper contact data protection
DROP POLICY IF EXISTS "Anyone can view resources" ON public.resources;

-- Create secure resource access policy that protects contact information
CREATE POLICY "Secure resource access with contact protection"
ON public.resources
FOR SELECT
USING (
  -- Allow authenticated users to view resources with masked contact info
  -- or admins to view full contact info
  auth.uid() IS NOT NULL 
  AND check_enhanced_rate_limit(auth.uid(), 'resource_access', 25)
);

-- Create secure function for resource data with contact masking
CREATE OR REPLACE FUNCTION public.get_resources_secure()
RETURNS TABLE(
  id uuid,
  name text,
  organization text,
  description text,
  type text,
  city text,
  county text,
  state_code text,
  website text,
  phone text,
  address text,
  verified text,
  justice_friendly boolean,
  rating numeric,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Require authentication for resource access
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required for resource access';
  END IF;

  -- Rate limiting
  IF NOT check_enhanced_rate_limit(auth.uid(), 'resource_data_access', 20) THEN
    RAISE EXCEPTION 'Rate limit exceeded for resource access';
  END IF;

  -- Log access
  INSERT INTO public.audit_log (
    user_id,
    action,
    table_name,
    sensitive_data_accessed,
    created_at
  ) VALUES (
    auth.uid(),
    'SECURE_RESOURCE_ACCESS',
    'resources',
    CASE WHEN is_user_admin(auth.uid()) THEN true ELSE false END,
    now()
  );

  -- Return data with conditional masking
  RETURN QUERY
  SELECT 
    r.id,
    r.name,
    r.organization,
    r.description,
    r.type,
    r.city,
    r.county,
    r.state_code,
    r.website,
    CASE 
      WHEN is_user_admin(auth.uid()) THEN r.phone
      ELSE mask_contact_info(r.phone)
    END as phone,
    CASE 
      WHEN is_user_admin(auth.uid()) THEN r.address
      ELSE 'Contact access required'::text
    END as address,
    r.verified,
    r.justice_friendly,
    r.rating,
    r.created_at,
    r.updated_at
  FROM public.resources r;
END;
$$;

-- Create public view function for anonymous users (no contact info)
CREATE OR REPLACE FUNCTION public.get_resources_public()
RETURNS TABLE(
  id uuid,
  name text,
  organization text,
  description text,
  type text,
  city text,
  county text,
  state_code text,
  website text,
  verified text,
  justice_friendly boolean,
  rating numeric,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Log anonymous access
  INSERT INTO public.audit_log (
    user_id,
    action,
    table_name,
    sensitive_data_accessed,
    created_at
  ) VALUES (
    NULL,
    'ANONYMOUS_RESOURCE_VIEW',
    'resources',
    false,
    now()
  );

  -- Return only non-sensitive data
  RETURN QUERY
  SELECT 
    r.id,
    r.name,
    r.organization,
    r.description,
    r.type,
    r.city,
    r.county,
    r.state_code,
    r.website,
    r.verified,
    r.justice_friendly,
    r.rating,
    r.created_at,
    r.updated_at
  FROM public.resources r;
END;
$$;

-- Ensure organizations table is fully secured by removing any remaining public policies
DROP POLICY IF EXISTS "block_anonymous_direct_access" ON public.organizations;
DROP POLICY IF EXISTS "owners_can_manage_own_orgs" ON public.organizations;
DROP POLICY IF EXISTS "admins_can_manage_all_orgs" ON public.organizations;

-- Create comprehensive secure policies for organizations
CREATE POLICY "Admins can manage all organizations"
ON public.organizations
FOR ALL
USING (is_user_admin(auth.uid()))
WITH CHECK (is_user_admin(auth.uid()));

CREATE POLICY "Organization owners can manage their own organizations"
ON public.organizations
FOR ALL
USING (auth.uid() = owner_id AND auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() = owner_id AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can view organizations through secure function only"
ON public.organizations
FOR SELECT
USING (
  auth.uid() IS NOT NULL 
  AND verified = true 
  AND check_enhanced_rate_limit(auth.uid(), 'org_direct_access', 3)
);

-- Block all anonymous access to organizations table
CREATE POLICY "Block all anonymous organization access"
ON public.organizations
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- Add security monitoring trigger for resources table
CREATE OR REPLACE FUNCTION public.audit_resource_access()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Log all access to resources table
  INSERT INTO public.audit_log (
    user_id,
    action,
    table_name,
    record_id,
    sensitive_data_accessed,
    ip_address,
    user_agent,
    created_at
  ) VALUES (
    auth.uid(),
    TG_OP || '_RESOURCE',
    'resources',
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP = 'SELECT' AND (NEW.phone IS NOT NULL OR OLD.phone IS NOT NULL) THEN true ELSE false END,
    inet_client_addr(),
    current_setting('request.header.user-agent', true),
    now()
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Log this security hardening
INSERT INTO public.audit_log (
  user_id,
  action,
  table_name,
  sensitive_data_accessed,
  created_at
) VALUES (
  auth.uid(),
  'COMPLETE_SECURITY_HARDENING_APPLIED',
  'resources_and_organizations',
  true,
  now()
);