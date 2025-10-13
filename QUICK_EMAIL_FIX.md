# 🚨 Quick Fix: "Failed to Send Email" Error

## Most Common Causes & Solutions

### 1. **SMTP Not Configured in Supabase**
**Problem:** Supabase is using default email service (limited)
**Solution:**
1. Go to Supabase Dashboard → Authentication → Settings
2. Scroll to "SMTP Settings"
3. Toggle "Enable custom SMTP" to **ON**
4. Fill in Brevo credentials

### 2. **Wrong Brevo Credentials**
**Problem:** Invalid SMTP username/password
**Solution:**
```
SMTP Host: smtp-relay.brevo.com
SMTP Port: 587
SMTP Username: [Your Brevo LOGIN EMAIL - not API key]
SMTP Password: [Your Brevo SMTP KEY - not login password]
```

### 3. **Sender Email Not Verified**
**Problem:** Brevo rejects unverified sender
**Solution:**
1. Go to Brevo → Senders & IP
2. Add and verify your sender email
3. Use the EXACT verified email in Supabase

### 4. **User Not in Supabase Auth**
**Problem:** Email exists in custom users table but not auth.users
**Solution:** Create user in Supabase auth first:

```sql
-- Run in Supabase SQL Editor
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@votesphere.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '',
  '',
  '',
  ''
);
```

### 5. **Site URL Mismatch**
**Problem:** Redirect URL not allowed
**Solution:**
1. Supabase → Authentication → Settings
2. Site URL: `http://localhost:3000`
3. Additional Redirect URLs: `http://localhost:3000/reset-password`

## 🔧 Quick Test Steps

1. **Open:** `diagnose-email-issue.html`
2. **Run:** All diagnostic tests
3. **Check:** Supabase Dashboard SMTP settings
4. **Verify:** Brevo sender email is verified
5. **Test:** With a Supabase auth user (not just custom table user)

## 🆘 Emergency Workaround

If you need immediate testing, temporarily use Supabase's default email:
1. Disable custom SMTP in Supabase
2. Test with a Gmail/Yahoo email
3. Check spam folder (Supabase emails often go to spam)

## ✅ Verification Checklist

- [ ] Custom SMTP enabled in Supabase
- [ ] Brevo SMTP credentials correct
- [ ] Sender email verified in Brevo  
- [ ] User exists in auth.users table
- [ ] Site URL and redirect URLs set
- [ ] Test email received (check spam)