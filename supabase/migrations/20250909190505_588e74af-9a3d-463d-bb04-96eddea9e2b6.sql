-- Phase 1: Critical Database Security Fixes

-- Enable RLS on organizations_public table
ALTER TABLE public.organizations_public ENABLE ROW LEVEL SECURITY;

-- Enable RLS on organizations_public_secure table  
ALTER TABLE public.organizations_public_secure ENABLE ROW LEVEL SECURITY;

-- Add SELECT policy for organizations_public - only verified organizations
CREATE POLICY "Public can view verified organizations" 
ON public.organizations_public 
FOR SELECT 
USING (verified = true);

-- Add SELECT policy for organizations_public_secure - only verified organizations
CREATE POLICY "Public can view verified organizations secure" 
ON public.organizations_public_secure 
FOR SELECT 
USING (verified = true);

-- Fix partner_referrals anonymous insertion vulnerability
-- Drop the overly permissive anonymous insertion policy
DROP POLICY IF EXISTS "Allow referral submissions" ON public.partner_referrals;

-- Add secure policy requiring authentication for referral submissions
CREATE POLICY "Authenticated users can submit referrals" 
ON public.partner_referrals 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Add rate limiting to referral submissions
CREATE POLICY "Rate limited referral submissions" 
ON public.partner_referrals 
FOR INSERT 
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND check_enhanced_rate_limit(auth.uid(), 'referral_submit', 5)
);

-- Replace the previous policy with the rate-limited one
DROP POLICY IF EXISTS "Authenticated users can submit referrals" ON public.partner_referrals;