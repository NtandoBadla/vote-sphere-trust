# Supabase Setup Instructions

## Step 1: Database Setup
1. Go to your Supabase project: https://hjgeulcorrbctynswzqi.supabase.co
2. Navigate to SQL Editor
3. Copy and paste the entire content from `php-backend/database.sql`
4. Click "Run" to create tables and insert sample data

## Step 2: Get Database Password
1. Go to Project Settings > Database
2. Copy your database password
3. Update the `.env` file in `php-backend/` folder:
   ```
   SUPABASE_PASSWORD=your-actual-database-password
   ```

## Step 3: Test Connection
1. Start XAMPP Apache
2. Visit: http://localhost/vote-sphere-trust
3. Login with:
   - Admin: admin@votesphere.com / admin123
   - User: user@example.com / user123

## Your Supabase Details:
- **Project URL**: https://hjgeulcorrbctynswzqi.supabase.co
- **Database Host**: db.hjgeulcorrbctynswzqi.supabase.co
- **Anon Key**: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZ2V1bGNvcnJiY3R5bnN3enFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMzY0MjksImV4cCI6MjA3MzcxMjQyOX0.5h6eXXO3RzE_VzayAQq4esEFDfxjCjUF0ur2WFrAg8g