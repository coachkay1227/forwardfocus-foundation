# Cron-Job.org Setup Guide

## ✅ Prerequisites Complete
- [x] `CRON_SECRET_TOKEN` added to Supabase secrets
- [x] Edge function modified for dual authentication (JWT + token)
- [x] `supabase/config.toml` updated (`verify_jwt = false`)
- [x] Monitoring dashboard added to admin panel
- [x] Audit logging implemented

---

## 🚀 Setting Up Automated Email Scheduling

### Step 1: Create Cron-Job.org Account
1. Go to https://cron-job.org
2. Sign up for a **free account** (supports unlimited jobs)
3. Verify your email address
4. Log in to your dashboard

---

### Step 2: Configure Email Jobs

Your cron secret token has been securely stored in Supabase. You'll use this in the headers for each job.

#### **Job 1: Weekly Engagement Email (Monday 9 AM EST)**

**URL:**
```
https://mdwkkgancoocvkmecwkm.supabase.co/functions/v1/send-reminder-emails
```

**Schedule (Cron Expression):**
```
0 9 * * 1
```
**Schedule Meaning:** Every Monday at 9:00 AM

**Timezone:** `America/New_York` (EST/EDT)

**HTTP Method:** `POST`

**Headers:**
```
Content-Type: application/json
x-cron-token: [YOUR_CRON_SECRET_TOKEN]
```

**Request Body (JSON):**
```json
{
  "reminderType": {
    "type": "weekly_engagement",
    "subject": "This Week's Resources & Support - Forward Focus Elevation 📚"
  }
}
```

---

#### **Job 2: Healing Hub & AI Reminder (Wednesday 2 PM EST)**

**URL:**
```
https://mdwkkgancoocvkmecwkm.supabase.co/functions/v1/send-reminder-emails
```

**Schedule (Cron Expression):**
```
0 14 * * 3
```
**Schedule Meaning:** Every Wednesday at 2:00 PM

**Timezone:** `America/New_York` (EST/EDT)

**HTTP Method:** `POST`

**Headers:**
```
Content-Type: application/json
x-cron-token: [YOUR_CRON_SECRET_TOKEN]
```

**Request Body (JSON):**
```json
{
  "reminderType": {
    "type": "site_usage",
    "subject": "Don't Miss Out! Use Your AI Resources & Healing Tools 🌱"
  }
}
```

---

#### **Job 3: Coaching Reminder (Friday 10 AM EST)**

**URL:**
```
https://mdwkkgancoocvkmecwkm.supabase.co/functions/v1/send-reminder-emails
```

**Schedule (Cron Expression):**
```
0 10 * * 5
```
**Schedule Meaning:** Every Friday at 10:00 AM

**Timezone:** `America/New_York` (EST/EDT)

**HTTP Method:** `POST`

**Headers:**
```
Content-Type: application/json
x-cron-token: [YOUR_CRON_SECRET_TOKEN]
```

**Request Body (JSON):**
```json
{
  "reminderType": {
    "type": "booking_coaching",
    "subject": "Ready for Your Next Breakthrough? Book a Session with Coach Kay 💫"
  }
}
```

---

#### **Job 4: Sunday Community Call Reminder (FUTURE - TBD)**

**Status:** Not yet implemented
**Planned:** Sunday 6:00 PM EST
**Schedule:** `0 18 * * 0`

**Notes:**
- Will include Zoom/recording links
- Subject line TBD
- Body template TBD

---

## 📋 Detailed Setup Instructions

### Creating a Job in Cron-Job.org

1. **Click "Create Cronjob"** in your dashboard

2. **Title:** Give it a descriptive name
   - Example: "Mon - Weekly Engagement Email"

3. **URL:** Paste the function URL
   ```
   https://mdwkkgancoocvkmecwkm.supabase.co/functions/v1/send-reminder-emails
   ```

4. **Schedule:**
   - Select "Expert" mode
   - Enter cron expression (e.g., `0 9 * * 1`)
   - Set timezone to `America/New_York`

5. **HTTP Method:** Select `POST`

6. **Request Headers:**
   - Click "Add Header"
   - Name: `Content-Type`, Value: `application/json`
   - Click "Add Header" again
   - Name: `x-cron-token`, Value: `[YOUR_CRON_SECRET_TOKEN]`

7. **Request Body:**
   - Select "Raw" format
   - Paste the JSON body (see examples above)

8. **Notifications:**
   - Enable "Notify on failure"
   - Enter your email address

9. **Save the Job**

10. **Test It:**
    - Click "Run now" to manually trigger
    - Check your admin dashboard for the log entry
    - Verify emails were sent

---

## 🧪 Testing Protocol

### Phase 1: Manual Test (TONIGHT)
Before activating cron jobs, test manually:

1. Go to your admin dashboard → Email Marketing → 📧 Reminders
2. Click "Send Now" for each email type
3. Verify emails arrive in your inbox
4. Check "Automated Email Activity" widget for logs

**Expected Results:**
- ✅ Emails sent successfully
- ✅ Logs appear in dashboard
- ✅ Success rate >95%

---

### Phase 2: Cron Simulation Test (TONIGHT)

Test with `curl` to simulate cron-job.org:

```bash
curl -X POST \
  https://mdwkkgancoocvkmecwkm.supabase.co/functions/v1/send-reminder-emails \
  -H "Content-Type: application/json" \
  -H "x-cron-token: YOUR_ACTUAL_TOKEN" \
  -d '{
    "reminderType": {
      "type": "weekly_engagement",
      "subject": "Test Email"
    }
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Reminders sent to X subscribers",
  "stats": {
    "success": X,
    "failures": 0
  },
  "auth_source": "cron_automated"
}
```

---

### Phase 3: Live Cron Test (TONIGHT)

1. Set up **ONE** job (Monday) with a **10-minute test interval**:
   - Schedule: `*/10 * * * *` (every 10 minutes)
   - This allows testing without waiting a full week

2. Monitor for **1 hour**:
   - Check admin dashboard every 10 minutes
   - Verify new log entries appear
   - Confirm emails are sent

3. If successful:
   - Change schedule to weekly: `0 9 * * 1`
   - Activate remaining jobs (Wed, Fri)

---

### Phase 4: First Week Monitoring

**Daily Checks (First 7 Days):**
- [ ] Monday 9:30 AM: Verify Weekly Engagement email sent
- [ ] Wednesday 2:30 PM: Verify Healing Hub email sent
- [ ] Friday 10:30 AM: Verify Coaching Reminder sent
- [ ] Review unsubscribe rate (<2% acceptable)
- [ ] Review open rate (>20% target)

---

## 📊 Monitoring Dashboard

All cron-triggered emails are logged to your admin dashboard:

**Location:** Admin → Email Marketing → 📧 Reminders tab

**Widget: "Automated Email Activity"**
- Shows last 10 automated sends
- Success/failure rates
- Timestamps
- Authentication source (Auto vs. Manual)

**Realtime Updates:**
- Dashboard updates automatically when new emails are sent
- No need to refresh the page

---

## 🔒 Security Features

**Authentication:**
- Cron token authentication (32+ character random string)
- Token stored in Supabase secrets (encrypted)
- Token sent via header (not URL) to prevent logging

**Monitoring:**
- All sends logged to `audit_logs` table
- Failed sends trigger security alerts
- IP addresses logged (for security auditing)

**Rate Limiting:**
- Emails sent in batches of 10
- 1-second delay between batches
- Prevents overwhelming email service

---

## ⚠️ Troubleshooting

### Issue: "Authentication required" error

**Solution:**
1. Verify `x-cron-token` header is correct
2. Check token has no extra spaces
3. Confirm `supabase/config.toml` has `verify_jwt = false`

### Issue: Emails not sending

**Solution:**
1. Check Resend domain is verified: https://resend.com/domains
2. Verify `RESEND_API_KEY` is set in Supabase secrets
3. Check edge function logs for errors

### Issue: No logs in dashboard

**Solution:**
1. Verify job executed successfully
2. Check response status (should be 200)
3. Refresh admin dashboard
4. Check browser console for errors

### Issue: High unsubscribe rate (>5%)

**Solution:**
1. Reduce email frequency
2. A/B test subject lines
3. Add preference center (let users choose frequency)
4. Segment audience by engagement level

---

## 🎯 Success Metrics

**Week 1 Goals:**
- ✅ 100% cron job uptime (no missed sends)
- ✅ >95% email deliverability rate
- ✅ <2% unsubscribe rate
- ✅ >20% open rate
- ✅ At least 1 coaching booking from Friday emails
- ✅ At least 1 donation click

**Month 1 Goals:**
- ✅ Newsletter subscribers grow by 50+
- ✅ Coaching bookings increase by 25%
- ✅ Site return rate increases by 30%
- ✅ Donation click-through rate >5%

---

## 🚀 Future Enhancements (Post-Launch)

### Smart Send Logic (Week 2+)
- Skip emails to users active in last 48 hours
- Send coaching reminders only to users who haven't booked
- Segment by user interests (legal aid, housing, employment)

### A/B Testing (Week 3+)
- Test subject line variations
- Test send times (morning vs. afternoon)
- Test email content (short vs. long)

### Personalization (Month 2+)
- Real-time resource recommendations based on location
- Trending resources from user's county
- Personalized "You might need..." suggestions

---

## 📞 Support

**If you encounter issues:**
1. Check edge function logs: Admin → Cloud → Functions → `send-reminder-emails`
2. Review audit logs: Admin → Security → Audit Logs
3. Check security alerts: Admin → Security → Alerts
4. Contact support with error messages and timestamps

---

## ✅ Launch Readiness Checklist

- [x] `CRON_SECRET_TOKEN` added to Supabase secrets
- [x] Edge function supports dual authentication
- [x] `supabase/config.toml` updated
- [x] Monitoring dashboard added
- [x] Audit logging implemented
- [ ] Manual send test completed
- [ ] Curl simulation test completed
- [ ] ONE test cron job created (10-minute interval)
- [ ] Test job monitored for 1 hour
- [ ] Test job schedule changed to weekly
- [ ] Remaining cron jobs activated (Wed, Fri)
- [ ] First week monitoring completed

**Estimated Setup Time:** 30 minutes
**Estimated Testing Time:** 1.5 hours

---

**🎉 You're ready to launch automated email scheduling!**
