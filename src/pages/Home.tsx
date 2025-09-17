import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  Vote, 
  Users, 
  Lock, 
  CheckCircle, 
  Eye,
  Clock,
  Award
} from "lucide-react";
import Navigation from "@/components/Navigation";
import heroImage from "@/assets/voting-hero.jpg";

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: "End-to-End Security",
      description: "Military-grade encryption with blockchain immutability and zero-knowledge proofs for complete vote protection."
    },
    {
      icon: Vote,
      title: "Universal Voting",
      description: "Support for elections, surveys, and organizational decisions with customizable ballot types and voting methods."
    },
    {
      icon: Users,
      title: "Multi-Platform Access",
      description: "Vote securely from any device - web, mobile, or offline with encrypted local storage and sync."
    },
    {
      icon: Lock,
      title: "Anonymous & Verifiable",
      description: "Maintain voter privacy while ensuring every vote is authentic, counted, and mathematically verifiable."
    },
    {
      icon: CheckCircle,
      title: "Audit Trail",
      description: "Complete transparency with cryptographic proofs, Merkle trees, and immutable audit logs."
    },
    {
      icon: Eye,
      title: "Real-Time Results",
      description: "Live tallying with fraud detection, duplicate prevention, and instant verification confirmations."
    }
  ];

  const stats = [
    { icon: Users, label: "Registered Voters", value: "2.4M+" },
    { icon: Vote, label: "Elections Conducted", value: "15,847" },
    { icon: Shield, label: "Security Incidents", value: "0" },
    { icon: Award, label: "Uptime", value: "99.99%" }
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="relative bg-gradient-hero">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
              <div className="text-center">
                <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6">
                  VoteSphere
                </h1>
                <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
                  The world's most secure and verifiable electronic voting system.
                  Empowering democracy through cryptographic innovation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button 
                    asChild 
                    size="lg" 
                    className="bg-background text-primary hover:bg-background/90 shadow-secure text-lg px-8 py-6"
                  >
                    <Link to="/register">Start Voting</Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    size="lg"
                    className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6"
                  >
                    <Link to="/demo">View Demo</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Advanced Voting Technology
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Built with cutting-edge cryptography, blockchain technology, and security protocols
                to ensure every vote counts and democracy thrives.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="shadow-card hover:shadow-voting transition-all duration-300 border-border/50">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Active Elections Preview */}
        <section className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Active Elections
              </h2>
              <p className="text-xl text-muted-foreground">
                Participate in ongoing democratic processes
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="shadow-card hover:shadow-voting transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>City Council Election 2024</CardTitle>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-vote-pending" />
                      <span className="text-sm text-vote-pending">5 days left</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Choose your local representatives for the next term.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      12,483 votes cast
                    </span>
                    <Button size="sm" className="bg-gradient-hero">
                      Vote Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-voting transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Budget Proposal Vote</CardTitle>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-vote-pending" />
                      <span className="text-sm text-vote-pending">12 hours left</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Approve the fiscal year 2025 municipal budget.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      8,721 votes cast
                    </span>
                    <Button size="sm" className="bg-gradient-hero">
                      Vote Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-voting transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>School Board Initiative</CardTitle>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-vote-success" />
                      <span className="text-sm text-vote-success">Completed</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Education funding increase referendum.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      24,117 votes cast
                    </span>
                    <Button size="sm" variant="outline">
                      View Results
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-gradient-hero shadow-voting">
                <Link to="/vote">View All Elections</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-hero">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-primary-foreground mb-6">
              Ready to Transform Democracy?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Join millions of voters using the world's most secure electronic voting platform.
              Your voice matters, and we ensure it's heard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-background text-primary hover:bg-background/90 shadow-secure text-lg px-8 py-6"
              >
                <Link to="/register">Register Now</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6"
              >
                <Link to="/admin">Admin Portal</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;