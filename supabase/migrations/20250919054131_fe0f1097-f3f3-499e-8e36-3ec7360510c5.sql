-- Fix the is_user_admin function to remove INSERT operations that cause STABLE function errors
CREATE OR REPLACE FUNCTION public.is_user_admin(user_id uuid DEFAULT auth.uid())
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT EXISTS(
    SELECT 1 FROM public.user_roles 
    WHERE user_roles.user_id = is_user_admin.user_id 
    AND role = 'admin'::app_role
  );
$function$;