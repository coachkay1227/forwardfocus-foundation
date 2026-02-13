
# Fix Build Errors from PR #1 Merge

The PR synced to Lovable successfully, but it introduced several code errors -- likely from merge conflicts that weren't fully resolved. Here's a summary of every issue and the fix.

---

## Errors and Fixes

### 1. YouthFutures.tsx -- Missing `DollarSign` import
**Error:** `DollarSign is not defined` (line 200)
**Cause:** The icon is used but not included in the lucide-react import.
**Fix:** Add `DollarSign` to the import statement on line 7.

---

### 2. TrialTimer.tsx -- Wrong variable names
**Error:** `isCriticalTime` and `isLowTime` are not defined (lines 38, 42, 43)
**Cause:** Variables are declared as `isCriticalTurns` and `isLowTurns` (lines 33-34) but referenced as `isCriticalTime` and `isLowTime`.
**Fix:** Replace all `isCriticalTime` with `isCriticalTurns` and `isLowTime` with `isLowTurns`.

---

### 3. CrisisSupportAI.tsx -- Duplicate `content` property
**Error:** Object literal has multiple properties with the same name (line 53)
**Cause:** The merge left two `content:` properties in the initial message object. 
**Fix:** Remove the first `content` line (line 52), keep the markdown-formatted version (line 53).

### 4. CrisisSupportAI.tsx -- Missing `Bot` import
**Error:** `Bot` is not defined (line 360)
**Fix:** Add `Bot` to the lucide-react import on line 2.

---

### 5. VictimSupportAI.tsx -- Duplicate `content` property
**Error:** Same duplicate property issue (line 52)
**Fix:** Remove the first `content` line (line 51), keep the markdown version (line 52).

### 6. VictimSupportAI.tsx -- Missing `Bot` import
**Error:** `Bot` is not defined (line 327)
**Fix:** Add `Bot` to the lucide-react import on line 2.

---

### 7. CrisisEmergencyBot.tsx -- `addMessage` called with 3 args instead of 2
**Error:** Expected 2 arguments, but got 3 (line 79)
**Fix:** Review the `addMessage` function signature and adjust the call to match (likely remove the third argument or update the function to accept it).

---

### 8. contact.ts -- Duplicate object keys
**Error:** `support` and `contact` keys duplicated in `fromEmails` (lines 18-19)
**Cause:** Merge kept both old and new email addresses.
**Fix:** Remove the old entries (lines 15-16), keep the updated `forward-focus-elevation.org` addresses (lines 18-19).

---

### 9. NewsletterPopup.tsx -- Reference to nonexistent table
**Error:** `newsletter_subscribers` table not recognized in types.
**Fix:** Check if the table exists in the database. If not, either create it via migration or remove the newsletter fallback code.

---

### 10. WelcomeEmail.tsx (Edge Function) -- npm import issue
**Error:** Cannot resolve `npm:@react-email/components@0.0.22`
**Fix:** This is a Deno edge function import issue. Will verify the import path and version are correct for the Deno runtime.

---

### 11. validationSchemas.test.ts -- `bun:test` import
**Error:** Cannot find module `bun:test`
**Fix:** This test file uses Bun-specific imports that don't work in this environment. Will update to use a compatible test runner or remove it.

---

## Execution Order

1. Fix all TypeScript compilation errors (items 1-8) -- these are quick single-line fixes
2. Address the NewsletterPopup table reference (item 9)
3. Fix the edge function import (item 10)
4. Handle the test file (item 11)

All fixes are straightforward and won't change any functionality -- they just resolve the broken merge artifacts.
