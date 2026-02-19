-- Security Enhancement: Clean up and recreate functions with proper data masking

-- Drop all existing functions that might conflict
DROP FUNCTION IF EXISTS mask_contact_info(text);
DROP FUNCTION IF EXISTS get_masked_contact_info(uuid);
DROP FUNCTION IF EXISTS can_view_org_contacts(uuid);
DROP FUNCTION IF EXISTS log_sensitive_access(text,text,uuid,boolean);
DROP FUNCTION IF EXISTS check_admin_rate_limit(uuid);

-- Create enhanced rate limiting function for sensitive data access
CREATE FUNCTION check_admin_rate_limit()
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

-- Create function to mask sensitive contact information
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
    
    -- Mask email addresses (show first 2 chars + domain)
    IF contact_data ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
        RETURN SUBSTRING(contact_data FROM 1 FOR 2) || '***@' || 
               SPLIT_PART(contact_data, '@', 2);
    END IF;
    
    -- Mask phone numbers (show first 3 chars + last 2)
    IF contact_data ~ '^\+?[0-9\s\-\(\)\.]{10,15}$' THEN
        RETURN SUBSTRING(contact_data FROM 1 FOR 3) || '***' || 
               SUBSTRING(contact_data FROM LENGTH(contact_data) - 1);
    END IF;
    
    -- For other text, show first 2 chars + ***
    RETURN SUBSTRING(contact_data FROM 1 FOR 2) || '***';
END;
$$;

-- Create enhanced audit logging function
CREATE FUNCTION log_sensitive_access(
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

-- Create secure view for public organization data (no sensitive contact info)
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

-- Create indexes for better performance on audit queries
CREATE INDEX IF NOT EXISTS idx_audit_log_user_time ON audit_log(user_id, created_at) WHERE sensitive_data_accessed = true;
CREATE INDEX IF NOT EXISTS idx_audit_log_sensitive ON audit_log(sensitive_data_accessed, created_at);

-- Add comments for documentation
COMMENT ON FUNCTION mask_contact_info(text) IS 'Masks sensitive contact information for security';
COMMENT ON FUNCTION check_admin_rate_limit() IS 'Rate limits admin access to sensitive data (50 per hour)';
COMMENT ON VIEW organizations_public_secure IS 'Public view of organizations without sensitive contact information';