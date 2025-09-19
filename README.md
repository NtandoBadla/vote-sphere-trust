



Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm install

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

### Frontend
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- React Query
- React Router

### Backend
- PHP
- Supabase (PostgreSQL)
- Session-based authentication

## Supabase Setup

1. **Create Supabase project** at https://supabase.com
2. **Run SQL**: Copy and run `php-backend/database.sql` in Supabase SQL Editor
3. **Get credentials**: Project Settings > Database
4. **Create .env**: Copy `php-backend/.env.example` to `.env` and add your credentials
5. **Install XAMPP** and start Apache
6. **Access via browser**: `http://localhost/vote-sphere-trust`

### Default Login Credentials
- **Admin**: admin@votesphere.com / admin123
- **User**: user@example.com / user123

## Development

The application uses PHP with Supabase PostgreSQL database. Database connection is configured in `php-backend/supabase-config.php`.


