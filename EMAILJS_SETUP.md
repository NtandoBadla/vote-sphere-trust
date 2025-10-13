# EmailJS Setup Guide

## 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

## 3. Create Email Template
1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: Welcome to VoteSphere Trust!

Dear {{to_name}},

Welcome to VoteSphere Trust! Your account has been successfully created.

You can now participate in secure, transparent elections. We're excited to have you as part of our democratic community.

Best regards,
The VoteSphere Trust Team
```

4. Make sure to use these variable names:
   - `{{to_email}}` - recipient email
   - `{{to_name}}` - recipient name
   - `{{from_name}}` - sender name
   - `{{subject}}` - email subject
   - `{{message}}` - email content

5. Note down your **Template ID**

## 4. Get Public Key
1. Go to "Account" > "General"
2. Find your **Public Key**

## 5. Configure Environment Variables
1. Copy `.env.example` to `.env.local`
2. Replace the placeholder values:

```
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

## 6. Test the Setup
1. Start your development server: `npm run dev`
2. Register a new user
3. Check if the welcome email is sent

## Troubleshooting
- Make sure your email service is properly configured
- Check the browser console for any errors
- Verify that your EmailJS credentials are correct
- Ensure your email template variables match the ones used in the code