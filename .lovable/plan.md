
# Domain Update Plan: Migrate to forward-focus-elevation.org

## ✅ COMPLETED

All domain references have been updated from `ffeservices.net` to `forward-focus-elevation.org`.

### Changes Made:

1. ✅ **Frontend Configuration** - Updated `src/config/site.ts` and `src/config/contact.ts`
2. ✅ **Edge Functions Configuration** - Updated `supabase/functions/_shared/site-config.ts`
3. ✅ **HTML Meta Tags** - Updated `index.html` (og:url, og:image, twitter:image, canonical)
4. ✅ **Sitemap** - Updated all 14 URLs in `public/sitemap.xml`
5. ✅ **Robots.txt** - Updated sitemap reference
6. ✅ **Anti-Whitelabel Protection** - Updated allowed domains in both security files
7. ✅ **Structured Data** - Updated JSON-LD in Index, AboutUs, GetHelpNow, SuccessStories, VictimServices pages
8. ✅ **Edge Functions** - Updated all email-related functions with new domain and email addresses
9. ✅ **Documentation** - Updated LAUNCH_TONIGHT_CHECKLIST.md and EMAIL_AUTOMATION_SETUP.md

---

## Post-Migration Tasks (Manual)

After publishing, you'll need to:

1. **Verify domain in Resend dashboard**
   - Go to https://resend.com/domains
   - Add `forward-focus-elevation.org`
   - Add required DNS records (SPF, DKIM, DMARC)

2. **Update Google Search Console**
   - Submit new sitemap at `https://forward-focus-elevation.org/sitemap.xml`
   - Request re-indexing of important pages

3. **Set up redirects (optional)**
   - If you still own `ffeservices.net`, set up 301 redirects to the new domain

---

**Migration Date**: February 2026
**Status**: ✅ COMPLETE
