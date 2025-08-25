-- Check current RLS policies on partner_referrals table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'partner_referrals';

-- Ensure RLS is enabled on partner_referrals table
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'partner_referrals';