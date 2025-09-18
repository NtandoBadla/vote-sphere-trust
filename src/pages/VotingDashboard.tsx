import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Vote, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Users, 
  Shield,
  Calendar,
  BarChart3
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { api } from "@/lib/api";
import { CreateElectionForm } from "@/components/CreateElectionForm";
import { AddCandidateForm } from "@/components/AddCandidateForm";
import { useToast } from "@/hooks/use-toast";

const VotingDashboard = () => {
  const navigate = useNavigate();
  const currentUser = api.getCurrentUser();
  const { toast } = useToast();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  const [activeElections, setActiveElections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const elections = await api.getElections();
        setActiveElections(elections);
      } catch (error) {
        console.error('Failed to fetch elections:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchElections();
    }
  }, [currentUser]);

  const completedElections = [
    {
      id: 4,
      title: "School Board Initiative",
      description: "Education funding increase referendum.",
      completedDate: "Nov 28, 2024",
      participants: 24117,
      result: "Passed",
      status: "completed"
    },
    {
      id: 5,
      title: "Park Renovation Bond",
      description: "Municipal bond for city park improvements.",
      completedDate: "Nov 15, 2024",
      participants: 18934,
      result: "Failed",
      status: "completed"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "urgent":
        return <AlertCircle className="h-4 w-4 text-vote-error" />;
      case "active":
        return <Clock className="h-4 w-4 text-vote-pending" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-vote-success" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "urgent":
        return "destructive";
      case "active":
        return "secondary";
      case "completed":
        return "default";
      default:
        return "secondary";
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Voting Dashboard</h1>
            <p className="text-xl text-muted-foreground">
              Participate in active elections and view your voting history
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Elections</p>
                    <p className="text-3xl font-bold text-foreground">{loading ? '...' : activeElections.length}</p>
                  </div>
                  <Vote className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Votes</p>
                    <p className="text-3xl font-bold text-vote-error">2</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-vote-error" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Votes Cast</p>
                    <p className="text-3xl font-bold text-vote-success">12</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-vote-success" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Security Level</p>
                    <p className="text-xl font-bold text-vote-success">Maximum</p>
                  </div>
                  <Shield className="h-8 w-8 text-vote-success" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Admin Forms */}
          {currentUser?.is_admin && (
            <div className="mb-8 grid md:grid-cols-2 gap-6">
              <CreateElectionForm onElectionCreated={() => {
                // Refresh elections list
                const fetchElections = async () => {
                  try {
                    const elections = await api.getElections();
                    setActiveElections(elections);
                  } catch (error) {
                    console.error('Failed to fetch elections:', error);
                  }
                };
                fetchElections();
              }} />
              
              <AddCandidateForm 
                elections={activeElections}
                onCandidateAdded={() => {
                  // Refresh elections list to show updated candidates
                  const fetchElections = async () => {
                    try {
                      const elections = await api.getElections();
                      setActiveElections(elections);
                    } catch (error) {
                      console.error('Failed to fetch elections:', error);
                    }
                  };
                  fetchElections();
                }}
              />
            </div>
          )}

          {/* Active Elections */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Active Elections</h2>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                View Calendar
              </Button>
            </div>

            <div className="grid gap-6">
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading elections...</p>
                </div>
              ) : activeElections.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No active elections available</p>
                </div>
              ) : (
                activeElections.map((election) => (
                  <Card 
                    key={election.id} 
                    className="shadow-card hover:shadow-voting transition-all duration-300 border-l-4 border-l-primary"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-xl">{election.title}</CardTitle>
                            <Badge variant="secondary">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                Active
                              </div>
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">{election.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Ends {new Date(election.end_date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            asChild 
                            className="bg-gradient-hero shadow-voting hover:shadow-secure transition-all"
                          >
                            <Link to={`/ballot/${election.id}`}>Cast Vote</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Completed Elections */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Recent Results</h2>
            <div className="grid gap-4">
              {completedElections.map((election) => (
                <Card key={election.id} className="shadow-card border-l-4 border-l-muted">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{election.title}</h3>
                          <Badge variant="outline">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                          <Badge 
                            variant={election.result === "Passed" ? "default" : "destructive"}
                          >
                            {election.result}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{election.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Completed {election.completedDate}</span>
                          <span>{election.participants.toLocaleString()} total votes</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/results/${election.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VotingDashboard;