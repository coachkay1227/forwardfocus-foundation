

# Fix Build Error and Dismiss False Positive Security Findings

## The Only Real Fix

**InactivityEmail.tsx** (build error): Change `npm:` imports to `https://esm.sh/` — identical to the fix already applied to WelcomeEmail.tsx, MilestoneEmail.tsx, and BaseEmailTemplate.tsx.

- Line 1: `npm:@react-email/components@0.0.22` -> `https://esm.sh/@react-email/components@0.0.22`
- Line 2: `npm:react@18.3.1` -> `https://esm.sh/react@18.3.1`

## Security Findings — Already Resolved

The four security findings are either false positives or already fixed:

| Finding | Status | Evidence |
|---------|--------|----------|
| Bookings table exposes data | False positive | SELECT policy already uses `(user_id = auth.uid()) OR has_role(...)` |
| Profiles expose contact info | False positive | SELECT policy already uses `(auth.uid() = id)` |
| Chat endpoint unauthenticated | False positive | `verify_jwt = true` in config.toml |
| Email preferences exposed | Already fixed | Policies replaced with token-based + admin-only access |

These findings will be dismissed/deleted from the scan results after the build fix is applied.

## Technical Details

- 1 file edited: `supabase/functions/_shared/email-templates/InactivityEmail.tsx`
- 2 lines changed (import paths only)
- No database changes needed
- No new dependencies

