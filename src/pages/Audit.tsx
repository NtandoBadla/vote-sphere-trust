import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Users, Vote, Shield, Download } from "lucide-react";
import Navigation from "@/components/Navigation";
import { api } from "@/lib/api";

const Audit = () => {
  const navigate = useNavigate();
  const currentUser = api.getCurrentUser();
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState("");
  const [voteResults, setVoteResults] = useState(null);
  const [allVotes, setAllVotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser || !currentUser.is_admin) {
      navigate('/');
      return;
    }

    const fetchElections = async () => {
      try {
        const electionsData = await api.getElections();
        setElections(electionsData);
      } catch (error) {
        console.error('Failed to fetch elections:', error);
      }
    };

    fetchElections();
  }, [currentUser, navigate]);

  const fetchVoteResults = async (electionId: string) => {
    setLoading(true);
    try {
      const results = await api.getVoteCount(electionId);
      setVoteResults(results);
    } catch (error) {
      console.error('Failed to fetch vote results:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllVotes = async () => {
    setLoading(true);
    try {
      const votes = await api.getAllVotes();
      setAllVotes(votes);
    } catch (error) {
      console.error('Failed to fetch all votes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser?.is_admin) {
    return null;
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Admin Audit Dashboard</h1>
            <p className="text-xl text-muted-foreground">
              Monitor elections, count votes, and audit the voting system
            </p>
          </div>

          {/* Election Selection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Vote className="h-5 w-5" />
                Election Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Select Election</label>
                  <Select value={selectedElection} onValueChange={setSelectedElection}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an election to audit" />
                    </SelectTrigger>
                    <SelectContent>
                      {elections.map((election) => (
                        <SelectItem key={election.id} value={election.id.toString()}>
                          {election.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={() => fetchVoteResults(selectedElection)}
                  disabled={!selectedElection || loading}
                >
                  <BarChart className="h-4 w-4 mr-2" />
                  Count Votes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Vote Results */}
          {voteResults && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Vote Count Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    <Users className="h-4 w-4 mr-2" />
                    Total Votes: {voteResults.totalVotes}
                  </Badge>
                </div>
                <div className="space-y-4">
                  {voteResults.results.map((candidate) => (
                    <div key={candidate.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{candidate.name}</h3>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold">{candidate.voteCount}</span>
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ 
                              width: `${voteResults.totalVotes > 0 ? (candidate.voteCount / voteResults.totalVotes) * 100 : 0}%` 
                            }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {voteResults.totalVotes > 0 ? Math.round((candidate.voteCount / voteResults.totalVotes) * 100) : 0}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* All Votes Audit */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Vote Audit Trail
                </div>
                <Button onClick={fetchAllVotes} disabled={loading}>
                  <Download className="h-4 w-4 mr-2" />
                  Load All Votes
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {allVotes.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Vote ID</th>
                        <th className="text-left p-2">Voter</th>
                        <th className="text-left p-2">Election</th>
                        <th className="text-left p-2">Candidate</th>
                        <th className="text-left p-2">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allVotes.map((vote) => (
                        <tr key={vote.id} className="border-b">
                          <td className="p-2 font-mono">VS-{vote.id}</td>
                          <td className="p-2">{vote.users?.first_name} {vote.users?.last_name}</td>
                          <td className="p-2">{vote.elections?.title}</td>
                          <td className="p-2">{vote.candidates?.name}</td>
                          <td className="p-2">{new Date(vote.created_at).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Click "Load All Votes" to view the complete audit trail
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Audit;