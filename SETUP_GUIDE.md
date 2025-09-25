# VoteSphere Setup Guide

## Prerequisites

Install the following software on your computer:

### 1. Node.js and npm
- Download from: https://nodejs.org/
- Choose LTS version (recommended)
- Verify installation: `node --version` and `npm --version`

### 2. Git (Optional but recommended)
- Download from: https://git-scm.com/
- For cloning the repository

## Project Setup

### Step 1: Get the Project Files
**Option A: Clone with Git**
```bash
git clone <YOUR_REPOSITORY_URL>
cd vote-sphere-trust
```

**Option B: Download ZIP**
- Download project as ZIP file
- Extract to desired folder
- Open terminal/command prompt in project folder  

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Configuration
Create `.env.local` file in the root directory:
```
REACT_APP_SUPABASE_URL=https://hjgeulcorrbctynswzqi.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZ2V1bGNvcnJiY3R5bnN3enFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMzY0MjksImV4cCI6MjA3MzcxMjQyOX0.5h6eXXO3RzE_VzayAQq4esEFDfxjCjUF0ur2WFrAg8g
```

### Step 4: Get Supabase Credentials (If Setting Up New Project)

**If you need to get your own Supabase credentials:**

1. **Go to Supabase**: https://supabase.com
2. **Sign up/Login** to your account
3. **Create New Project** or select existing project
4. **Get Project URL**:
   - Go to **Settings** → **General**
   - Copy **Reference ID** (e.g., `hjgeulcorrbctynswzqi`)
   - Your URL will be: `https://YOUR_REF_ID.supabase.co`

5. **Get Anon Key**:
   - Go to **Settings** → **API**
   - Copy **anon/public** key

6. **Get Database Password**:
   - Go to **Settings** → **Database**
   - Copy **Password** (you set this when creating project)
   - **Host** will be: `db.YOUR_REF_ID.supabase.co`

**Current Project Credentials (Already Set Up):**
```
SUPABASE_URL=https://hjgeulcorrbctynswzqi.supabase.co
SUPABASE_HOST=db.hjgeulcorrbctynswzqi.supabase.co
SUPABASE_PASSWORD=Bokamoso@2002
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZ2V1bGNvcnJiY3R5bnN3enFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMzY0MjksImV4cCI6MjA3MzcxMjQyOX0.5h6eXXO3RzE_VzayAQq4esEFDfxjCjUF0ur2WFrAg8g
```

### Step 5: Database Setup (Supabase)

1. **Go to Supabase Dashboard**: https://hjgeulcorrbctynswzqi.supabase.co
2. **Open SQL Editor**
3. **Run Database Schema**: Copy and paste content from `php-backend/database.sql`
4. **Run Test Data**: Copy and paste content from `setup-test-data.sql`
5. **Fix RLS Issues**: Run this SQL to disable Row Level Security:
   ```sql
   ALTER TABLE users DISABLE ROW LEVEL SECURITY;
   ALTER TABLE elections DISABLE ROW LEVEL SECURITY;
   ALTER TABLE candidates DISABLE ROW LEVEL SECURITY;
   ALTER TABLE votes DISABLE ROW LEVEL SECURITY;
   ```

### Step 6: Start the Application
```bash
npm run dev
```

The application will open at: `http://localhost:5173`

## Default Login Credentials

- **Admin**: admin@votesphere.com / admin123
- **User**: user@example.com / user123

## Project Structure

```
vote-sphere-trust/
├── src/                    # React frontend source
├── php-backend/           # PHP backend files (not used in current setup)
├── public/               # Static assets
├── .env.local           # Environment variables
├── package.json         # Dependencies
└── README.md           # Project documentation
```

## Troubleshooting

### Common Issues:

**1. "Cannot connect to server"**
- Check if Supabase is accessible
- Verify environment variables in `.env.local`
- Check browser console for errors

**2. "Login failed"**
- Make sure you ran the database setup SQL
- Check if RLS is disabled on all tables
- Try the default credentials first

**3. "Registration not working"**
- Ensure Supabase tables exist
- Check RLS policies are disabled
- Verify network connection

**4. Node.js/npm issues**
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (should be 16+ recommended)

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Features

- ✅ User registration and authentication
- ✅ Secure voting system
- ✅ Real-time election results
- ✅ Admin and user roles
- ✅ Responsive design
- ✅ Supabase database integration

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify all prerequisites are installed
3. Ensure database setup is complete
4. Check browser console for error messages

## Technology Stack

- **Frontend**: React + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Custom with Supabase
- **Deployment**: Static hosting compatible