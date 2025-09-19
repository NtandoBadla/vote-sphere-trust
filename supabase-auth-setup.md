# Supabase Email Setup for Password Reset

## Step 1: Enable Supabase Auth
1. Go to Supabase Dashboard → Authentication → Settings
2. Enable "Enable email confirmations"
3. Set Site URL to your domain (e.g., http://localhost:5173)

## Step 2: Configure SMTP (Optional)
1. Go to Authentication → Settings → SMTP Settings
2. Add your SMTP provider details:
   - Host: smtp.gmail.com (for Gmail)
   - Port: 587
   - Username: your-email@gmail.com
   - Password: your-app-password

## Step 3: Customize Email Templates
1. Go to Authentication → Email Templates
2. Edit "Reset Password" template
3. Customize subject and body

## Step 4: Update Reset Password Function
Replace the current resetPassword method with Supabase Auth:

```typescript
async resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:5173/reset-password',
  });
  
  if (error) throw error;
  return { success: true };
}
```

## Current Status
The current implementation only logs to console. Follow the steps above to enable actual email sending.