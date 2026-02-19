-- Add form_type column to contact_submissions for better categorization
ALTER TABLE public.contact_submissions
ADD COLUMN IF NOT EXISTS form_type TEXT DEFAULT 'contact';

-- Add index for filtering by form type
CREATE INDEX IF NOT EXISTS idx_contact_submissions_form_type ON public.contact_submissions(form_type);

COMMENT ON COLUMN public.contact_submissions.form_type IS 'Type of contact form: contact, coaching, booking';