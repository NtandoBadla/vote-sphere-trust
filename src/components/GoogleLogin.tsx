import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export const GoogleLogin = ({ onGoogleLogin }: { onGoogleLogin: () => void }) => {
  const handleGoogleLogin = () => {
    // In a real app, this would integrate with Google OAuth
    // For now, simulate Google login
    const mockGoogleUser = {
      email: "user@gmail.com",
      firstName: "Google",
      lastName: "User",
      idNumber: "1234567890123",
      dateOfBirth: "1990-01-01"
    };
    
    // Store mock user data
    localStorage.setItem('user', JSON.stringify(mockGoogleUser));
    localStorage.setItem('token', btoa(JSON.stringify({ email: mockGoogleUser.email })));
    
    onGoogleLogin();
  };

  return (
    <Button 
      type="button" 
      variant="outline" 
      className="w-full" 
      onClick={handleGoogleLogin}
    >
      <Mail className="h-4 w-4 mr-2" />
      Continue with Gmail
    </Button>
  );
};