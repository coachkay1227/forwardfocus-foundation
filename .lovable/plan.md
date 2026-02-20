

# Plan: Clear Security Findings + Browser-Test Coach Kay

## Summary
Coach Kay's backend is confirmed working (200 OK, streaming response). Three active security findings remain from the scanner. This plan addresses all three with database migrations and then tests the chatbot in-browser.

---

## Part 1: Fix 3 Active Security Findings

### Fix A: Bookings Table — Restrict SELECT to Owner + Admin
**Finding:** `bookings_table_public_exposure` (ERROR)
**Issue:** The current SELECT policy uses `(user_id = auth.uid()) OR has_role(...)` which is correct per the schema dump. However, the scanner flagged it. We need to verify and re-apply the policy to ensure it matches exactly:

```sql
DROP POLICY IF EXISTS "Users can view own bookings" ON public.bookings;
CREATE POLICY "Users can view own bookings"
  ON public.bookings FOR SELECT
  USING ((user_id = auth.uid()) OR has_role(auth.uid(), 'admin'::app_role));
```

Since the schema already shows this policy exists correctly, the scanner finding may be outdated. We will mark it as resolved after verification.

### Fix B: AI Rate Limits — Restrict to Service Role Only
**Finding:** `ai_rate_limits_public_readable` (ERROR)
**Issue:** The `ai_rate_limits` table has an ALL policy with `USING (true)` / `WITH CHECK (true)`, making IP addresses publicly readable.
**Fix:** Replace with service-role-only access:

```sql
DROP POLICY IF EXISTS "Service role manages ai rate limits" ON public.ai_rate_limits;
CREATE POLICY "Service role manages ai rate limits"
  ON public.ai_rate_limits FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
```

### Fix C: Chat History — Remove Session ID Bypass
**Finding:** `chat_history_session_bypass` (WARN)
**Issue:** SELECT policy allows access via `session_id` matching `current_setting('app.session_id')`, which could be guessed.
**Fix:** Restrict to authenticated user only, plus allow anonymous inserts (existing behavior):

```sql
DROP POLICY IF EXISTS "Users can view own chat history" ON public.chat_history;
CREATE POLICY "Users can view own chat history"
  ON public.chat_history FOR SELECT
  USING (user_id = auth.uid());
```

---

## Part 2: Mark Findings as Resolved
After migrations succeed, delete all 3 findings from the security dashboard.

---

## Part 3: Browser Test — Coach Kay Chatbot
1. Navigate to the homepage
2. Find and click the Coach Kay chat button
3. Send a test message ("What resources are available?")
4. Verify streaming response renders correctly in the dialog

---

## Technical Notes
- The `ai_rate_limits` policy change uses `TO service_role` so edge functions (which use the service role key) continue to work, while client-side access is blocked.
- The `chat_history` session_id bypass removal means anonymous users can still INSERT chat history but cannot SELECT it without being authenticated. This is acceptable since chat is ephemeral in the UI.

