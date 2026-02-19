-- Add ip_address and user_agent columns to newsletter_subscriptions table
ALTER TABLE public.newsletter_subscriptions
ADD COLUMN IF NOT EXISTS ip_address text,
ADD COLUMN IF NOT EXISTS user_agent text;