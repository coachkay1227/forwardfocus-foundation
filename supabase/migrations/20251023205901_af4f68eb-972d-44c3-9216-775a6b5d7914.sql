-- Add indexes for frequently queried columns across tables

-- Partner referrals indexes
CREATE INDEX IF NOT EXISTS idx_partner_referrals_partner_id ON partner_referrals(partner_id);
CREATE INDEX IF NOT EXISTS idx_partner_referrals_status ON partner_referrals(status);
CREATE INDEX IF NOT EXISTS idx_partner_referrals_created_at ON partner_referrals(created_at DESC);

-- Partnership requests indexes
CREATE INDEX IF NOT EXISTS idx_partnership_requests_status ON partnership_requests(status);
CREATE INDEX IF NOT EXISTS idx_partnership_requests_created_at ON partnership_requests(created_at DESC);

-- Contact submissions indexes
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- Support requests indexes
CREATE INDEX IF NOT EXISTS idx_support_requests_status ON support_requests(status);
CREATE INDEX IF NOT EXISTS idx_support_requests_user_id ON support_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_support_requests_created_at ON support_requests(created_at DESC);

-- Bookings indexes
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_scheduled_date ON bookings(scheduled_date);

-- Success stories indexes
CREATE INDEX IF NOT EXISTS idx_success_stories_partner_id ON success_stories(partner_id);
CREATE INDEX IF NOT EXISTS idx_success_stories_published ON success_stories(published);
CREATE INDEX IF NOT EXISTS idx_success_stories_created_at ON success_stories(created_at DESC);

-- Resources indexes
CREATE INDEX IF NOT EXISTS idx_resources_verified ON resources(verified);
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category);
CREATE INDEX IF NOT EXISTS idx_resources_state ON resources(state);
CREATE INDEX IF NOT EXISTS idx_resources_county ON resources(county);
CREATE INDEX IF NOT EXISTS idx_resources_type ON resources(type);
CREATE INDEX IF NOT EXISTS idx_resources_created_at ON resources(created_at DESC);

-- Audit logs indexes
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_severity ON audit_logs(severity);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- Analytics indexes
CREATE INDEX IF NOT EXISTS idx_website_analytics_session_id ON website_analytics(session_id);
CREATE INDEX IF NOT EXISTS idx_website_analytics_created_at ON website_analytics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at DESC);

-- Security alerts indexes
CREATE INDEX IF NOT EXISTS idx_security_alerts_severity ON security_alerts(severity);
CREATE INDEX IF NOT EXISTS idx_security_alerts_resolved ON security_alerts(resolved);
CREATE INDEX IF NOT EXISTS idx_security_alerts_created_at ON security_alerts(created_at DESC);

-- Contact access justifications indexes
CREATE INDEX IF NOT EXISTS idx_contact_access_admin_user_id ON contact_access_justifications(admin_user_id);
CREATE INDEX IF NOT EXISTS idx_contact_access_organization_id ON contact_access_justifications(organization_id);
CREATE INDEX IF NOT EXISTS idx_contact_access_status ON contact_access_justifications(status);

-- Composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_resources_verified_state ON resources(verified, state) WHERE verified = true;
CREATE INDEX IF NOT EXISTS idx_success_stories_published_created ON success_stories(published, created_at DESC) WHERE published = true;