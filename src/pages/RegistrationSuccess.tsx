import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Vote, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';

export const RegistrationSuccess = () => {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-voting">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center shadow-voting mb-4">
              <CheckCircle className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Registration Successful!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-muted-foreground">
              Welcome to VoteSphere! Your voter registration has been completed successfully.
              You can now participate in all available elections.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <Shield className="h-5 w-5 text-vote-success" />
                <div className="text-left">
                  <p className="text-sm font-medium">Secure Account</p>
                  <p className="text-xs text-muted-foreground">Your account is protected with encryption</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <Vote className="h-5 w-5 text-vote-success" />
                <div className="text-left">
                  <p className="text-sm font-medium">Ready to Vote</p>
                  <p className="text-xs text-muted-foreground">You can now participate in elections</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button asChild className="w-full bg-gradient-hero">
                <Link to="/vote">View Available Elections</Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full">
                <Link to="/">Return to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};