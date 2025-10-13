# Brevo SMTP Setup for VoteSphere Password Recovery

## Prerequisites
- Brevo account with verified sender domain/email
- Supabase project with authentication enabled

## Step 1: Get Brevo SMTP Credentials

1. **Login to Brevo Dashboard** at https://app.brevo.com
2. **Navigate to SMTP & API** → SMTP
3. **Generate SMTP Key**:
   - Click "Generate a new SMTP key"
   - Name it "VoteSphere-Auth"
   - Copy the generated key (you won't see it again)

## Step 2: Configure Supabase Authentication

1. **Go to Supabase Dashboard** → Your Project → Authentication → Settings

2. **SMTP Settings**:
   ```
   Enable custom SMTP: ✅ Enabled
   SMTP Host: smtp-relay.brevo.com
   SMTP Port: 587
   SMTP Username: [Your Brevo login email]
   SMTP Password: [Your SMTP key from Step 1]
   Sender Name: VoteSphere
   Sender Email: [Your verified sender email]
   ```

3. **Auth Settings**:
   ```
   Site URL: http://localhost:3000 (development)
   Additional Redirect URLs: 
   - http://localhost:3000/reset-password
   - https://yourdomain.com/reset-password (production)
   ```

4. **Email Templates** → Password Recovery:
   ```
   Subject: Reset your VoteSphere password
   
   Body (HTML):
   <h2>Reset Your VoteSphere Password</h2>
   <p>Hi there,</p>
   <p>You requested to reset your password for your VoteSphere account.</p>
   <p>Click the link below to set a new password:</p>
   <p><a href="{{ .ConfirmationURL }}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Reset Password</a></p>
   <p>If you didn't request this, you can safely ignore this email.</p>
   <p>This link will expire in 24 hours.</p>
   <br>
   <p>Best regards,<br>The VoteSphere Team</p>
   ```

## Step 3: Test Configuration

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Test password recovery**:
   - Go to http://localhost:3000/login
   - Click "Forgot password?"
   - Enter a registered email address
   - Check your email for the reset link

## Step 4: Verify Email Delivery

1. **Check Brevo Dashboard** → Statistics → Email
2. **Monitor delivery rates** and bounce rates
3. **Check spam folder** if emails aren't received

## Troubleshooting

### Common Issues:

1. **"SMTP Authentication Failed"**
   - Verify SMTP username (should be your Brevo login email)
   - Regenerate SMTP key in Brevo dashboard
   - Ensure no extra spaces in credentials

2. **"Sender not verified"**
   - Verify your sender email in Brevo
   - Use the exact verified email in Supabase SMTP settings

3. **"Emails not received"**
   - Check spam/junk folder
   - Verify redirect URLs in Supabase
   - Check Brevo sending limits

4. **"Reset link doesn't work"**
   - Ensure redirect URL matches exactly
   - Check browser console for errors
   - Verify the ResetPassword component is properly routed

### Testing Commands:

```bash
# Test Supabase connection
curl -X POST 'https://your-project.supabase.co/auth/v1/recover' \
  -H 'apikey: your-anon-key' \
  -H 'Content-Type: application/json' \
  -d '{"email": "test@example.com"}'
```

## Production Deployment

1. **Update Site URL** in Supabase to your production domain
2. **Add production redirect URLs**
3. **Verify sender domain** in Brevo for better deliverability
4. **Set up SPF/DKIM records** for your domain

## Security Best Practices

- ✅ Use HTTPS in production
- ✅ Set appropriate token expiration times
- ✅ Monitor failed authentication attempts
- ✅ Implement rate limiting for password reset requests
- ✅ Log security events for audit purposes