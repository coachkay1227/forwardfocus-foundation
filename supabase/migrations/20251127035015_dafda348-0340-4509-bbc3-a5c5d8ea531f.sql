-- Clean up duplicate RLS policies
-- Remove duplicate INSERT policy on analytics_events
DROP POLICY IF EXISTS "Anyone can create analytics" ON public.analytics_events;

-- Remove duplicate SELECT policy on email_send_queue
DROP POLICY IF EXISTS "Admins can view email queue" ON public.email_send_queue;

-- Add comments for clarity on remaining policies
COMMENT ON POLICY "Anyone can create analytics events" ON public.analytics_events IS 
  'Allows unauthenticated and authenticated users to insert analytics events';

COMMENT ON POLICY "Only admins can view queue" ON public.email_send_queue IS 
  'Restricts email queue visibility to admin users only';
