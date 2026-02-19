-- Remove SparkLoop/Beehiiv related columns and table

-- Drop monetization_earnings table
DROP TABLE IF EXISTS public.monetization_earnings;

-- Remove SparkLoop/Beehiiv columns from newsletter_subscriptions
ALTER TABLE public.newsletter_subscriptions 
DROP COLUMN IF EXISTS sparkloop_subscriber_id,
DROP COLUMN IF EXISTS sparkloop_referral_code,
DROP COLUMN IF EXISTS sparkloop_earnings_generated,
DROP COLUMN IF EXISTS beehiiv_subscriber_id,
DROP COLUMN IF EXISTS beehiiv_earnings_generated;