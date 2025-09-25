import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Vote, Menu, X, LogOut, User } from "lucide-react";
import { api } from "@/lib/api";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = api.getCurrentUser();

  const handleLogout = () => {
    api.logout();
    navigate('/');
  };

  const navigation = [
    { name: "Home", href: currentUser ? "/vote" : "/" },
    { name: "Vote", href: "/vote" },
    { name: "Results", href: "/results" },
    { name: "Audit", href: "/audit" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={currentUser ? "/vote" : "/"} className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-hero rounded-lg shadow-voting">
                <Vote className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">VoteSphere</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.filter(item => {
              if (item.name === 'Audit' && (!currentUser || !currentUser.is_admin)) {
                return false;
              }
              return true;
            }).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center space-x-2 ml-6">
              <Shield className="h-4 w-4 text-vote-success" />
              <span className="text-sm text-muted-foreground">Secure</span>
            </div>
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">
                    {currentUser.first_name} {currentUser.last_name}
                  </span>
                </div>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="bg-gradient-hero shadow-voting hover:shadow-secure transition-all">
                  <Link to="/register">Register to Vote</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card rounded-lg mt-2 shadow-card">
              {navigation.filter(item => {
                if (item.name === 'Audit' && (!currentUser || !currentUser.is_admin)) {
                  return false;
                }
                return true;
              }).map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center space-x-2 px-3 py-2">
                <Shield className="h-4 w-4 text-vote-success" />
                <span className="text-sm text-muted-foreground">Secure Connection</span>
              </div>
              <div className="flex flex-col space-y-2 px-3 pb-2">
                {currentUser ? (
                  <>
                    <div className="flex items-center space-x-2 px-3 py-2">
                      <User className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">
                        {currentUser.first_name} {currentUser.last_name}
                      </span>
                    </div>
                    <Button variant="outline" onClick={handleLogout} className="w-full">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button asChild className="w-full bg-gradient-hero shadow-voting">
                      <Link to="/register">Register to Vote</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;