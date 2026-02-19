-- Add contact fields to partner_verifications table
ALTER TABLE partner_verifications
ADD COLUMN contact_name text,
ADD COLUMN contact_phone text,
ADD COLUMN contact_email text;

-- Add comment explaining the fields
COMMENT ON COLUMN partner_verifications.contact_name IS 'Full name of the primary contact person for this organization';
COMMENT ON COLUMN partner_verifications.contact_phone IS 'Primary phone number for direct communication';
COMMENT ON COLUMN partner_verifications.contact_email IS 'Primary email address for communication (may differ from auth email)';