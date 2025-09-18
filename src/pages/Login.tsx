import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Smartphone,
  Fingerprint,
  Key
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { BackendStatus } from "@/components/BackendStatus";
import { SupabaseStatus } from "@/components/SupabaseStatus";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.login(credentials.email, credentials.password);
      toast({
        title: "Login successful!",
        description: "Welcome back to VoteSphere. Redirecting to your dashboard...",
      });
      navigate('/vote');
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricLogin = () => {
    toast({
      title: "Biometric authentication",
      description: "Feature coming soon. Please use email/password for now.",
    });
  };

  const handleOAuthLogin = (provider: string) => {
    toast({
      title: `${provider} authentication`,
      description: "OAuth integration coming soon. Please use email/password for now.",
    });
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          {/* Security Badge */}
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center shadow-voting mb-6">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Secure Login</h1>
            <p className="text-muted-foreground">
              Access your VoteSphere account with military-grade encryption
            </p>
            <div className="mt-4 flex gap-2">
              <BackendStatus />
              <SupabaseStatus />
            </div>
          </div>

          <Card className="shadow-voting">
            <CardHeader>
              <CardTitle className="text-center">Sign In to Vote</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* OAuth Options */}
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => {
                    // Mock Gmail login
                    const mockGmailUser = {
                      id: 2,
                      email: "user@gmail.com",
                      first_name: "Gmail",
                      last_name: "User",
                      id_number: "8501010001087",
                      is_admin: false
                    };
                    localStorage.setItem('user', JSON.stringify(mockGmailUser));
                    localStorage.setItem('token', btoa(JSON.stringify({ id: mockGmailUser.id, email: mockGmailUser.email })));
                    toast({ title: "Gmail Login Successful", description: "Welcome back!" });
                    navigate('/vote');
                  }}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Continue with Gmail
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    // Mock digital government ID login
                    const mockGovUser = {
                      id: 1,
                      email: "citizen@gov.za",
                      first_name: "Digital",
                      last_name: "Citizen",
                      id_number: "9001010001088",
                      is_admin: false
                    };
                    localStorage.setItem('user', JSON.stringify(mockGovUser));
                    localStorage.setItem('token', btoa(JSON.stringify({ id: mockGovUser.id, email: mockGovUser.email })));
                    toast({ title: "Digital ID Login Successful", description: "Welcome, verified citizen!" });
                    navigate('/vote');
                  }}
                >
                  <Key className="h-4 w-4 mr-2" />
                  Digital Government ID
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleBiometricLogin}
                >
                  <Fingerprint className="h-4 w-4 mr-2" />
                  Biometric Login
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={credentials.email}
                      onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      value={credentials.password}
                      onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 rounded border-border"
                    />
                    <Label htmlFor="remember" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-hero shadow-voting hover:shadow-secure transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              {/* Two-Factor Authentication */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Two-Factor Authentication
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Enhanced security for your voting account
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link 
                    to="/register" 
                    className="text-primary font-medium hover:underline"
                  >
                    Register to vote
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Security Information */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3 text-vote-success" />
                <span>TLS 1.3 Encrypted</span>
              </div>
              <div className="flex items-center gap-1">
                <Lock className="h-3 w-3 text-vote-success" />
                <span>End-to-End Security</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Your credentials are protected with military-grade encryption
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;