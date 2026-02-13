-- Drop the open INSERT policy since signup flow is removed
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscriptions;

-- Remove PII columns
UPDATE public.newsletter_subscriptions SET ip_address = NULL, user_agent = NULL;
ALTER TABLE public.newsletter_subscriptions DROP COLUMN IF EXISTS ip_address;
ALTER TABLE public.newsletter_subscriptions DROP COLUMN IF EXISTS user_agent;

-- Remove SparkLoop/Beehiiv entries from API key rotation tracking
DELETE FROM public.api_key_rotation_tracking WHERE key_name IN ('SPARKLOOP_API_KEY', 'BEEHIVE_API_KEY');

-- Drop the unused newsletter_subscribers table
DROP TABLE IF EXISTS public.newsletter_subscribers;