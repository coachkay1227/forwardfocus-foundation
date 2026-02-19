
-- Fix mutable search path on auto_start_healing
CREATE OR REPLACE FUNCTION public.auto_start_healing()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = 'public'
AS $function$
BEGIN
  INSERT INTO healing_sessions (user_id, status, started_at)
  VALUES (NEW.user_id, 'active', NOW());
  RETURN NEW;
END;
$function$;

-- Fix mutable search path on log_contact_reveal
CREATE OR REPLACE FUNCTION public.log_contact_reveal()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = 'public'
AS $function$
BEGIN
  INSERT INTO audit_logs (action, user_id, target_id, timestamp)
  VALUES ('CONTACT_REVEAL', auth.uid(), NEW.id, NOW());
  RETURN NEW;
END;
$function$;
