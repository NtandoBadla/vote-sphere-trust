import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Vote, 
  Shield, 
  Clock, 
  User, 
  AlertTriangle,
  CheckCircle,
  Lock,
  Eye
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

const Ballot = () => {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = api.getCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (currentUser.is_admin) {
      toast({
        title: "Access Denied",
        description: "Administrators cannot cast votes.",
        variant: "destructive"
      });
      navigate('/vote');
      return;
    }

    const fetchElection = async () => {
      try {
        const electionData = await api.getElection(electionId!);
        setElection(electionData);
      } catch (error) {
        console.error('Failed to fetch election:', error);
        toast({
          title: "Error loading election",
          description: "Could not load election data.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (electionId) {
      fetchElection();
    }
  }, [electionId, toast, currentUser, navigate]);

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <p>Loading election...</p>
        </div>
      </>
    );
  }

  if (!election) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <p>Election not found</p>
        </div>
      </>
    );
  }

  // Check if election has expired
  const isExpired = new Date() > new Date(election.end_date);
  
  if (isExpired) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="p-8 text-center">
              <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Election Closed</h2>
              <p className="text-muted-foreground mb-4">
                This election ended on {new Date(election.end_date).toLocaleDateString()}. 
                Voting is no longer allowed.
              </p>
              <Button onClick={() => navigate('/vote')}>View Other Elections</Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  const handleSubmit = async () => {
    if (!selectedCandidate) {
      toast({
        title: "Please select a candidate",
        description: "You must choose a candidate before submitting your vote.",
        variant: "destructive"
      });
      return;
    }

    // Check if election has expired
    if (new Date() > new Date(election.end_date)) {
      toast({
        title: "Election Closed",
        description: "This election has ended and voting is no longer allowed.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Check if user already voted
      const voteStatus = await api.getVoteStatus(electionId!);
      if (voteStatus.hasVoted) {
        toast({
          title: "Already voted",
          description: "You have already cast your vote for this election.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      await api.castVote(electionId!, selectedCandidate);
      
      toast({
        title: "Vote submitted successfully!",
        description: "Your vote has been recorded and verified.",
      });
      
      navigate("/confirmation", { 
        state: { 
          election: election.title,
          candidate: election.candidates.find(c => c.id == selectedCandidate)?.name,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      toast({
        title: "Vote submission failed",
        description: error.message || "There was an error submitting your vote. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Security Header */}
          <Card className="mb-8 border-vote-success/30 bg-gradient-to-r from-vote-success/5 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-vote-success/10 rounded-full">
                  <Shield className="h-6 w-6 text-vote-success" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">Secure Voting Session</h3>
                  <p className="text-sm text-muted-foreground">
                    Your vote is encrypted and anonymized. Connection verified with end-to-end encryption.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-vote-success" />
                  <span className="text-sm text-vote-success font-medium">Encrypted</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Election Info */}
          <Card className="mb-8 shadow-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">{election.title}</CardTitle>
                  <p className="text-muted-foreground mb-4">{election.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-vote-pending" />
                      <span className="text-muted-foreground">{election.timeLeft} remaining</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">{election.district}</span>
                    </div>
                    <Badge variant="outline">
                      <Vote className="h-3 w-3 mr-1" />
                      Single Choice
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Voting Instructions */}
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Voting Instructions</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Select one candidate by clicking on their radio button</li>
                    <li>• Review your selection carefully before submitting</li>
                    <li>• Once submitted, your vote cannot be changed</li>
                    <li>• You will receive a confirmation receipt via email</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ballot */}
          <Card className="shadow-voting">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Vote className="h-5 w-5" />
                Cast Your Vote
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <RadioGroup 
                value={selectedCandidate} 
                onValueChange={setSelectedCandidate}
                className="space-y-6"
              >
                {election.candidates.map((candidate, index) => (
                  <div key={candidate.id}>
                    <div className={`
                      flex items-start space-x-4 p-6 rounded-lg border-2 transition-all cursor-pointer
                      ${selectedCandidate === candidate.id 
                        ? 'border-primary bg-primary/5 shadow-voting' 
                        : 'border-border hover:border-primary/50 hover:bg-muted/30'
                      }
                    `}>
                      <RadioGroupItem value={candidate.id} id={candidate.id} className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor={candidate.id} className="cursor-pointer">
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                              <User className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-foreground mb-2">
                                {candidate.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {candidate.description}
                              </p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </div>
                    {index < election.candidates.length - 1 && (
                      <Separator className="my-6" />
                    )}
                  </div>
                ))}
              </RadioGroup>

              <Separator className="my-8" />

              {/* Voting Actions */}
              <div className="space-y-4">
                {selectedCandidate && (
                  <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">
                            You selected: {election.candidates.find(c => c.id === selectedCandidate)?.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {election.candidates.find(c => c.id === selectedCandidate)?.party}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/vote")}
                    disabled={isSubmitting}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Vote
                  </Button>
                  
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate("/vote")}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSubmit}
                      disabled={!selectedCandidate || isSubmitting}
                      className="bg-gradient-hero shadow-voting hover:shadow-secure transition-all min-w-[120px]"
                    >
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          <Vote className="h-4 w-4 mr-2" />
                          Submit Vote
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Footer */}
          <Card className="mt-8 border-muted">
            <CardContent className="p-4">
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-vote-success" />
                  <span>TLS 1.3 Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-vote-success" />
                  <span>Blockchain Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-vote-success" />
                  <span>Anonymized</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Ballot;