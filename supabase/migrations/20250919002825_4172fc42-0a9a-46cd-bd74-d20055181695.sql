-- Fix function search path security warning
CREATE OR REPLACE FUNCTION public.emergency_data_access_check()
RETURNS boolean 
LANGUAGE plpgsql 
SECURITY DEFINER 
STABLE 
SET search_path = public
AS $$
BEGIN
  -- Simple admin check for emergency access
  RETURN is_user_admin(auth.uid());
END;
$$;