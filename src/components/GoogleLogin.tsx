import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useState } from 'react';

export const GoogleLogin = ({ onGoogleLogin }: { onGoogleLogin: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      // In a real app, this would integrate with Google OAuth
      // For now, simulate Google login
      const mockGoogleUser = {
        email: "user@gmail.com",
        firstName: "Google",
        lastName: "User",
        idNumber: "1234567890123",
        dateOfBirth: "1990-01-01"
      };
      
      // Check if user exists in database using Supabase
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      const response = await fetch(`${supabaseUrl}/rest/v1/users?email=eq.${mockGoogleUser.email}&select=email`, {
        method: 'GET',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      const users = await response.json();
      const result = { exists: users.length > 0 };
      
      if (result.exists) {
        // User exists, log them in
        localStorage.setItem('user', JSON.stringify(mockGoogleUser));
        localStorage.setItem('token', btoa(JSON.stringify({ email: mockGoogleUser.email })));
        onGoogleLogin();
      } else {
        setError('No account found with this Google email. Please register first.');
      }
    } catch (err) {
      setError('Failed to authenticate with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button 
        type="button" 
        variant="outline" 
        className="w-full" 
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        <Mail className="h-4 w-4 mr-2" />
        {loading ? 'Checking...' : 'Continue with Gmail'}
      </Button>
      {error && (
        <div className="text-red-600 text-sm mt-2">{error}</div>
      )}
    </div>
  );
};