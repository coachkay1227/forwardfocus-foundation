-- Fix critical security issue: Remove SECURITY DEFINER from view

-- Drop and recreate the view without SECURITY DEFINER
DROP VIEW IF EXISTS organizations_public_secure;

-- Create a regular view (not SECURITY DEFINER) for public organization data
CREATE VIEW organizations_public_secure AS
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

-- Grant appropriate access to the view
GRANT SELECT ON organizations_public_secure TO authenticated, anon;

-- Add comment for documentation
COMMENT ON VIEW organizations_public_secure IS 'Public view of verified organizations without sensitive contact information';