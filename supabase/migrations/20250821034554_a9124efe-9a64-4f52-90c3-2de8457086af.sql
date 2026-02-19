-- Fix security vulnerability: Drop unused reviews table that exposes customer emails
DROP TABLE IF EXISTS public.reviews CASCADE;