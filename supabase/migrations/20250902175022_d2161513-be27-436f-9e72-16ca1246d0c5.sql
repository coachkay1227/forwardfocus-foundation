-- Security Enhancement: Data masking and field-level access controls for sensitive contact information

-- Drop existing functions to avoid conflicts
DROP FUNCTION IF EXISTS mask_contact_info(text);
DROP FUNCTION IF EXISTS get_masked_contact_info(uuid);
DROP FUNCTION IF EXISTS can_view_org_contacts(uuid);

-- Enhanced rate limiting function for sensitive data access
CREATE OR REPLACE FUNCTION check_admin_rate_limit()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    access_count integer;
BEGIN
    -- Check access count in last hour for current admin user
    SELECT COUNT(*) INTO access_count
    FROM audit_log
    WHERE user_id = auth.uid()
    AND created_at > NOW() - INTERVAL '1 hour'
    AND sensitive_data_accessed = true;
    
    -- Allow max 50 sensitive data accesses per hour per admin
    RETURN access_count < 50;
END;
$$;

-- Function to mask contact information
CREATE FUNCTION mask_contact_info(contact_data text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF contact_data IS NULL THEN
        RETURN NULL;
    END IF;
    
    -- Mask email addresses
    IF contact_data ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
        RETURN SUBSTRING(contact_data FROM 1 FOR 2) || '***@' || 
               SPLIT_PART(contact_data, '@', 2);
    END IF;
    
    -- Mask phone numbers
    IF contact_data ~ '^\+?[0-9\s\-\(\)\.]{10,15}$' THEN
        RETURN SUBSTRING(contact_data FROM 1 FOR 3) || '***' || 
               SUBSTRING(contact_data FROM LENGTH(contact_data) - 1);
    END IF;
    
    -- For other text, show first 2 chars + ***
    RETURN SUBSTRING(contact_data FROM 1 FOR 2) || '***';
END;
$$;

-- Function to get masked contact info for organizations
CREATE FUNCTION get_masked_contact_info(org_id uuid)
RETURNS TABLE(
    id uuid,
    name text,
    description text,
    verified boolean,
    website text,
    masked_email text,
    masked_phone text,
    city text,
    state_code text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Log the access attempt
    INSERT INTO audit_log (user_id, action, table_name, record_id, sensitive_data_accessed)
    VALUES (auth.uid(), 'SELECT', 'organizations', org_id, true);
    
    RETURN QUERY
    SELECT 
        o.id,
        o.name,
        o.description,
        o.verified,
        o.website,
        mask_contact_info(o.email) as masked_email,
        mask_contact_info(o.phone) as masked_phone,
        o.city,
        o.state_code
    FROM organizations o
    WHERE o.id = org_id;
END;
$$;

-- Function to check if user can view organization contacts
CREATE FUNCTION can_view_org_contacts(org_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Only organization owners and admins can view full contact info
    RETURN (
        EXISTS (
            SELECT 1 FROM organizations 
            WHERE id = org_id AND owner_id = auth.uid()
        ) OR 
        is_user_admin()
    ) AND check_admin_rate_limit();
END;
$$;

-- Enhanced audit logging trigger for sensitive operations
CREATE OR REPLACE FUNCTION log_sensitive_access(
    table_name text,
    operation text,
    record_id uuid,
    is_sensitive boolean DEFAULT false
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO audit_log (
        user_id,
        action,
        table_name,
        record_id,
        sensitive_data_accessed,
        user_agent,
        ip_address
    ) VALUES (
        auth.uid(),
        operation,
        table_name,
        record_id,
        is_sensitive,
        current_setting('request.headers', true)::json->>'user-agent',
        inet_client_addr()
    );
END;
$$;

-- Update organizations RLS policies for enhanced security
DROP POLICY IF EXISTS "orgs_read_authenticated_own" ON organizations;

CREATE POLICY "orgs_read_authenticated_own" 
ON organizations 
FOR SELECT 
USING (
    auth.uid() IS NOT NULL AND (
        owner_id = auth.uid() OR 
        (is_user_admin() AND check_admin_rate_limit())
    )
);

-- Create a secure view for public organization data (without sensitive contact info)
CREATE OR REPLACE VIEW organizations_public_secure AS
SELECT 
    id,
    name,
    description,
    verified,
    website,
    city,
    state_code,
    created_at,
    updated_at
FROM organizations
WHERE verified = true;

-- Grant access to the secure view
GRANT SELECT ON organizations_public_secure TO authenticated, anon;

-- Enhanced RLS policies for partner_referrals with additional logging
DROP POLICY IF EXISTS "referrals_admin_select_with_limits" ON partner_referrals;

CREATE POLICY "referrals_admin_select_with_limits" 
ON partner_referrals 
FOR SELECT 
USING (
    auth.uid() IS NOT NULL AND 
    is_user_admin() AND 
    check_admin_rate_limit() AND
    (SELECT log_sensitive_access('partner_referrals', 'SELECT', partner_referrals.id, true) IS NULL)
);

-- Enhanced RLS policies for partnership_requests with additional logging  
DROP POLICY IF EXISTS "partnerships_admin_select_with_limits" ON partnership_requests;

CREATE POLICY "partnerships_admin_select_with_limits" 
ON partnership_requests 
FOR SELECT 
USING (
    auth.uid() IS NOT NULL AND 
    is_user_admin() AND 
    check_admin_rate_limit() AND
    (SELECT log_sensitive_access('partnership_requests', 'SELECT', partnership_requests.id, true) IS NULL)
);

-- Create indexes for better performance on audit queries
CREATE INDEX IF NOT EXISTS idx_audit_log_user_time ON audit_log(user_id, created_at) WHERE sensitive_data_accessed = true;
CREATE INDEX IF NOT EXISTS idx_audit_log_sensitive ON audit_log(sensitive_data_accessed, created_at);

COMMENT ON FUNCTION mask_contact_info(text) IS 'Masks sensitive contact information for security';
COMMENT ON FUNCTION get_masked_contact_info(uuid) IS 'Returns organization info with masked contact details';
COMMENT ON FUNCTION check_admin_rate_limit() IS 'Rate limits admin access to sensitive data (50 per hour)';
COMMENT ON VIEW organizations_public_secure IS 'Public view of organizations without sensitive contact information';