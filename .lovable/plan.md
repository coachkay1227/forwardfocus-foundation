
# Domain Update Plan: Migrate to forward-focus-elevation.org

## Problem Summary
The codebase has the old domain `ffeservices.net` hardcoded in 26 files, causing 404 errors because the site is actually published at `forward-focus-elevation.org`. This wasn't automatically updated because domain references in code require manual changes - Lovable's domain connection only handles DNS routing, not code updates.

---

## Changes Required

### 1. Frontend Configuration (`src/config/site.ts`)
Update the production domain and allowed domains list:
- Change `production: "ffeservices.net"` to `production: "forward-focus-elevation.org"`
- Update `allowedDomains` array to include the new domain

### 2. Edge Functions Configuration (`supabase/functions/_shared/site-config.ts`)
Update the server-side domain config:
- Change `domain: "ffeservices.net"` to `domain: "forward-focus-elevation.org"`
- Change `baseUrl: "https://ffeservices.net"` to `baseUrl: "https://forward-focus-elevation.org"`

### 3. HTML Meta Tags (`index.html`)
Update all hardcoded URLs:
- `og:url` → `https://forward-focus-elevation.org/`
- `og:image` → `https://forward-focus-elevation.org/logo-new.png`
- `twitter:image` → `https://forward-focus-elevation.org/logo-new.png`
- `canonical` → `https://forward-focus-elevation.org/`

### 4. Sitemap (`public/sitemap.xml`)
Update all 14 URL entries from `ffeservices.net` to `forward-focus-elevation.org`

### 5. Robots.txt (`public/robots.txt`)
Update sitemap reference to `https://forward-focus-elevation.org/sitemap.xml`

### 6. Anti-Whitelabel Protection Files
Update allowed domains in:
- `src/components/security/AntiWhiteLabelProtection.tsx`
- `src/lib/anti-whitelabel.ts`

### 7. Structured Data in Pages
Update JSON-LD schema URLs in:
- `src/pages/Index.tsx`
- `src/pages/AboutUs.tsx`
- `src/pages/GetHelpNow.tsx`
- `src/pages/SuccessStories.tsx`
- `src/pages/VictimServices.tsx`

### 8. Edge Functions (Email Sending)
Update email "from" addresses and links in:
- `send-support-email/index.ts` - Update from address and support email
- `newsletter-signup/index.ts` - Update help links and unsubscribe URLs
- `process-automation-queue/index.ts` - Update from address
- `send-contact-email/index.ts`
- `send-newsletter/index.ts`
- `send-partnership-email/index.ts`
- `send-referral-notification/index.ts`
- `send-reminder-emails/index.ts`
- `send-verification-email/index.ts`
- `send-auth-email/index.ts`
- Plus email template files

### 9. Documentation Files
Update domain references in:
- `LAUNCH_TONIGHT_CHECKLIST.md`
- `EMAIL_AUTOMATION_SETUP.md`
- `README.md` (if applicable)

---

## Technical Notes

**Email Configuration**: After these code changes, you'll also need to:
1. Verify `forward-focus-elevation.org` in your Resend dashboard
2. Add the required DNS records (SPF, DKIM, DMARC) for email deliverability

**Why this wasn't automatic**: Lovable's custom domain feature handles DNS routing (pointing your domain to our servers), but it cannot automatically find and replace hardcoded strings throughout your codebase. Code changes require explicit updates.

---

## Files to Modify (26 total)

| Category | Files |
|----------|-------|
| Config | `src/config/site.ts`, `supabase/functions/_shared/site-config.ts` |
| HTML/SEO | `index.html`, `public/sitemap.xml`, `public/robots.txt` |
| Security | `src/components/security/AntiWhiteLabelProtection.tsx`, `src/lib/anti-whitelabel.ts` |
| Pages | `Index.tsx`, `AboutUs.tsx`, `GetHelpNow.tsx`, `SuccessStories.tsx`, `VictimServices.tsx` |
| Edge Functions | 12+ email-related functions |
| Documentation | `LAUNCH_TONIGHT_CHECKLIST.md`, `EMAIL_AUTOMATION_SETUP.md` |
