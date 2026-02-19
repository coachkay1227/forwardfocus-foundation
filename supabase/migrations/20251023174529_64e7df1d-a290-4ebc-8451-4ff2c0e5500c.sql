-- Add missing foreign key constraint for contact_access_justifications
ALTER TABLE contact_access_justifications
ADD CONSTRAINT contact_access_justifications_organization_id_fkey
FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE;

-- Add missing columns to resources table to match code expectations
ALTER TABLE resources
ADD COLUMN IF NOT EXISTS name TEXT,
ADD COLUMN IF NOT EXISTS organization TEXT,
ADD COLUMN IF NOT EXISTS type TEXT,
ADD COLUMN IF NOT EXISTS county TEXT,
ADD COLUMN IF NOT EXISTS justice_friendly BOOLEAN DEFAULT false;

-- Update existing resources to populate new columns from existing data
UPDATE resources
SET 
  name = title,
  organization = COALESCE(title, 'Unknown Organization'),
  type = category
WHERE name IS NULL;

-- Make name required after populating
ALTER TABLE resources
ALTER COLUMN name SET NOT NULL;

-- Create missing RPC functions
CREATE OR REPLACE FUNCTION get_security_metrics_summary()
RETURNS jsonb
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT jsonb_build_object(
    'total_alerts', (SELECT COUNT(*) FROM security_alerts WHERE NOT resolved),
    'critical_alerts', (SELECT COUNT(*) FROM security_alerts WHERE severity = 'critical' AND NOT resolved),
    'total_audit_logs', (SELECT COUNT(*) FROM audit_logs WHERE created_at > NOW() - INTERVAL '7 days')
  );
$$;

CREATE OR REPLACE FUNCTION get_resources_public()
RETURNS TABLE(
  id uuid,
  name text,
  title text,
  description text,
  category text,
  organization text,
  type text,
  state text,
  city text,
  county text,
  website_url text,
  phone text,
  email text,
  address text,
  tags text[],
  verified boolean,
  justice_friendly boolean,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT 
    id, name, title, description, category, organization, type,
    state, city, county, website_url, phone, email, address,
    tags, verified, justice_friendly, created_at, updated_at
  FROM resources
  WHERE verified = true;
$$;