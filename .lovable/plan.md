

# Complete Newsletter / Beehiiv / SparkLoop Cleanup

## Overview
The newsletter system, Beehiiv, and SparkLoop were marked as removed, but significant remnants remain in both code and database. This plan completes the removal.

## 1. Remove SparkLoop/Beehiiv References from UI

**`src/components/admin/PreLaunchChecklist.tsx`**
- Remove the `sparkloop-webhook` and `beehiiv-webhook` checklist items entirely
- Remove the `test-newsletter-signup` item that references SparkLoop/Beehiiv dashboards
- Update the button label logic that checks for `sparkloop`/`beehiiv`

## 2. Remove SparkLoop/Beehiiv from Documentation

**`API_KEY_ROTATION_GUIDE.md`**
- Remove `SPARKLOOP_API_KEY` and `BEEHIVE_API_KEY` entries from the key rotation table
- Remove the SparkLoop API Key rotation instructions section

## 3. Clean Up Newsletter References in Admin Components

**`src/components/admin/ReminderEmailManager.tsx`**
- Change "newsletter subscribers" text to "registered users" or "active community members"

**`src/components/admin/TestEmailSender.tsx`**
- Rename "Monday Newsletter" label to "Monday Update" or similar

**`src/components/admin/EmailTemplateEditor.tsx`**
- Rename `monday_newsletter` label from "Monday Newsletter" to "Monday Update"

**`src/config/contact.ts`**
- Remove the `newsletter` email address entry

**`src/pages/AdminGuide.tsx`**
- Update references from "newsletter subscribers" / "newsletter campaigns" to "community updates" / "email campaigns"

## 4. Clean Up Email Templates

**`supabase/functions/_shared/email-templates.ts`**
- Rename `getMondayNewsletterTemplate` to `getMondayUpdateTemplate`
- Update internal copy referencing "newsletter"

**`supabase/functions/resend-webhook/index.ts`**
- Remove the `newsletter` email type detection branch

## 5. Clean Up Reminder Emails Edge Function

**`supabase/functions/send-reminder-emails/index.ts`**
- Update comment from "newsletter subscribers" to "active subscribers"

## 6. Database Cleanup (Migration)

Remove the deprecated tables and the seeded API key tracking rows:

```sql
-- Drop the open INSERT policy since signup flow is removed
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscriptions;

-- Remove PII columns
ALTER TABLE public.newsletter_subscriptions 
  DROP COLUMN IF EXISTS ip_address,
  DROP COLUMN IF EXISTS user_agent;

-- Remove SparkLoop/Beehiiv entries from API key rotation tracking
DELETE FROM public.api_key_rotation_tracking 
  WHERE key_name IN ('SPARKLOOP_API_KEY', 'BEEHIVE_API_KEY');

-- Drop the unused newsletter_subscribers table (duplicate of newsletter_subscriptions)
DROP TABLE IF EXISTS public.newsletter_subscribers;
```

Note: We keep `newsletter_subscriptions` itself because `send-reminder-emails` and the admin email dashboard still actively use it for community email sends. We also keep `email_preferences` since it references `newsletter_subscriptions`.

## 7. Files Not Changed

- `src/integrations/supabase/types.ts` -- auto-generated, will update after migration
- `supabase/migrations/*` -- historical, not modified

## Summary

| Area | Action |
|------|--------|
| PreLaunchChecklist.tsx | Remove 3 SparkLoop/Beehiiv checklist items |
| API_KEY_ROTATION_GUIDE.md | Remove 2 API key entries + rotation instructions |
| 4 admin components | Rename "newsletter" to "update"/"community" |
| contact.ts | Remove newsletter email |
| AdminGuide.tsx | Update newsletter references |
| email-templates.ts | Rename function + update copy |
| resend-webhook | Remove newsletter branch |
| send-reminder-emails | Update comment |
| Database | Drop open INSERT policy, PII columns, stale API keys, unused table |

