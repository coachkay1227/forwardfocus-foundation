-- Fix resources table schema for consistency

-- Add rating column if it doesn't exist
ALTER TABLE public.resources 
ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5);

-- Add index on rating for better query performance
CREATE INDEX IF NOT EXISTS idx_resources_rating ON public.resources(rating DESC);

-- Add index on category for filtering
CREATE INDEX IF NOT EXISTS idx_resources_category ON public.resources(category);

-- Add index on verified status
CREATE INDEX IF NOT EXISTS idx_resources_verified ON public.resources(verified);

-- Add index on justice_friendly
CREATE INDEX IF NOT EXISTS idx_resources_justice_friendly ON public.resources(justice_friendly);

-- Add state_code column if it doesn't exist (for consistency with some queries)
ALTER TABLE public.resources 
ADD COLUMN IF NOT EXISTS state_code TEXT;

-- Update state_code from state values for existing records
UPDATE public.resources 
SET state_code = state 
WHERE state_code IS NULL AND state IS NOT NULL;

COMMENT ON COLUMN public.resources.rating IS 'Resource rating from 0 to 5';
COMMENT ON COLUMN public.resources.state_code IS 'State abbreviation code';
COMMENT ON COLUMN public.resources.name IS 'Primary resource name/title';
COMMENT ON COLUMN public.resources.title IS 'Secondary title field (legacy)';
COMMENT ON COLUMN public.resources.website_url IS 'Resource website URL';