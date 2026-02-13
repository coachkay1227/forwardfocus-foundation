
# Fix Build Error and Remaining Branding Issues

## Build Error Fix
The build error is caused by `npm:resend@X.X.X` import syntax not being supported in the edge function environment. All 8 affected edge functions need to switch to `https://esm.sh/resend@4.0.0` imports instead.

**Files to update (import line only):**
1. `supabase/functions/check-verification-expiration/index.ts` - change `npm:resend@2.0.0` to `https://esm.sh/resend@4.0.0`
2. `supabase/functions/send-verification-email/index.ts` - same change
3. `supabase/functions/send-support-email/index.ts` - same change
4. `supabase/functions/send-referral-notification/index.ts` - same change
5. `supabase/functions/process-email-queue/index.ts` - same change
6. `supabase/functions/send-reminder-emails/index.ts` - change `npm:resend@4.0.0` to `https://esm.sh/resend@4.0.0`
7. `supabase/functions/send-partnership-email/index.ts` - same
8. `supabase/functions/send-contact-email/index.ts` - same
9. `supabase/functions/send-auth-email/index.ts` - same
10. `supabase/functions/process-automation-queue/index.ts` - same

Also update `npm:react@18.3.1` and `npm:@react-email/components@0.0.22` imports in `process-automation-queue` and `send-contact-email` to use `https://esm.sh/` equivalents.

## Remaining Branding Fixes

1. **`send-verification-email/index.ts` (line 181):** Change `"FFE Services <onboarding@resend.dev>"` to `"Forward Focus Elevation <noreply@forward-focus-elevation.org>"`

2. **`check-verification-expiration/index.ts` (lines 88, 124, 163):** Change `no-reply@forwardfocuselevation.com` to `noreply@forward-focus-elevation.org` (3 occurrences - wrong domain)

## Summary
- 10 edge function files updated for import fix
- 2 files updated for branding corrections
- No frontend changes needed
