-- Clean up unused database tables and functionality
-- Keep only tables related to core functionality: user roles, trials, subscriptions, modules

-- Drop unused tables related to shop functionality
DROP TABLE IF EXISTS public.shop_custom_ai_art_requests CASCADE;
DROP TABLE IF EXISTS public.shop_digital_assets CASCADE;
DROP TABLE IF EXISTS public.shop_digital_products CASCADE;
DROP TABLE IF EXISTS public.shop_newsletter_signups CASCADE;
DROP TABLE IF EXISTS public.shop_signed_art_pieces CASCADE;
DROP TABLE IF EXISTS public.shop_signed_artwork_requests CASCADE;

-- Drop unused affiliate tables
DROP TABLE IF EXISTS public.affiliate_clicks CASCADE;
DROP TABLE IF EXISTS public.affiliate_commissions CASCADE;
DROP TABLE IF EXISTS public.affiliates CASCADE;

-- Drop unused commerce-related tables
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.reviews CASCADE;
DROP TABLE IF EXISTS public.tool_submissions CASCADE;
DROP TABLE IF EXISTS public.tool_usage CASCADE;
DROP TABLE IF EXISTS public.user_access CASCADE;
DROP TABLE IF EXISTS public.user_credits CASCADE;
DROP TABLE IF EXISTS public.credit_transactions CASCADE;
DROP TABLE IF EXISTS public.otp_codes CASCADE;

-- Create tables for core functionality
-- Partner referrals table
CREATE TABLE IF NOT EXISTS public.partner_referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  contact_info TEXT NOT NULL,
  notes TEXT NOT NULL,
  status TEXT DEFAULT 'new' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Partnership requests table
CREATE TABLE IF NOT EXISTS public.partnership_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'new' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Resources table for community resources
CREATE TABLE IF NOT EXISTS public.resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  organization TEXT,
  contact_info TEXT,
  website_url TEXT,
  category TEXT,
  state_code TEXT,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on new tables
ALTER TABLE public.partner_referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partnership_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- RLS policies for partner_referrals
CREATE POLICY "Anyone can submit referrals"
ON public.partner_referrals
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view and manage referrals"
ON public.partner_referrals
FOR ALL
TO authenticated
USING (public.is_user_admin(auth.uid()));

-- RLS policies for partnership_requests
CREATE POLICY "Anyone can submit partnership requests"
ON public.partnership_requests
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view and manage partnership requests"
ON public.partnership_requests
FOR ALL
TO authenticated
USING (public.is_user_admin(auth.uid()));

-- RLS policies for resources
CREATE POLICY "Anyone can view active resources"
ON public.resources
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage all resources"
ON public.resources
FOR ALL
TO authenticated
USING (public.is_user_admin(auth.uid()));

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_partner_referrals_updated_at
  BEFORE UPDATE ON public.partner_referrals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_partnership_requests_updated_at
  BEFORE UPDATE ON public.partnership_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_resources_updated_at
  BEFORE UPDATE ON public.resources
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();