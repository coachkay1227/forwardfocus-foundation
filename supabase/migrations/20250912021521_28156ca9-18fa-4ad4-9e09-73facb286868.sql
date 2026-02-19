-- Fix security linter warning: Function Search Path Mutable
CREATE OR REPLACE FUNCTION public.is_verified_partner(user_id UUID DEFAULT auth.uid())
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF user_id IS NULL THEN
    RETURN false;
  END IF;
  
  -- Admins are always considered verified
  IF is_user_admin(user_id) THEN
    RETURN true;
  END IF;
  
  -- Check for active partner verification
  RETURN EXISTS(
    SELECT 1 
    FROM public.partner_verifications 
    WHERE partner_verifications.user_id = is_verified_partner.user_id 
    AND status = 'approved'
  );
END;
$$;