import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, Trophy, RefreshCw } from "lucide-react";
import Navigation from "@/components/Navigation";
import { api } from "@/lib/api";

const Results = () => {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const electionsData = await api.getElections();
        setElections(electionsData);
      } catch (error) {
        console.error('Failed to fetch elections:', error);
      }
    };
    fetchElections();
  }, []);

  const fetchResults = async (electionId: string) => {
    setLoading(true);
    try {
      const voteResults = await api.getVoteCount(electionId);
      setResults(voteResults);
    } catch (error) {
      console.error('Failed to fetch results:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshResults = () => {
    if (selectedElection) {
      fetchResults(selectedElection);
    }
  };

  const getWinner = () => {
    if (!results?.results) return null;
    return results.results.reduce((prev, current) => 
      prev.voteCount > current.voteCount ? prev : current
    );
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Election Results</h1>
            <p className="text-xl text-muted-foreground">
              Live vote tallies and election outcomes
            </p>
          </div>

          {/* Election Selection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Select Election
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Select value={selectedElection} onValueChange={setSelectedElection}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an election to view results" />
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
                  onClick={() => fetchResults(selectedElection)}
                  disabled={!selectedElection || loading}
                >
                  View Results
                </Button>
                <Button 
                  variant="outline"
                  onClick={refreshResults}
                  disabled={!selectedElection || loading}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Display */}
          {results && (
            <>
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Votes</p>
                        <p className="text-3xl font-bold">{results.totalVotes}</p>
                      </div>
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Candidates</p>
                        <p className="text-3xl font-bold">{results.results.length}</p>
                      </div>
                      <BarChart3 className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Leading</p>
                        <p className="text-lg font-bold">{getWinner()?.name || 'N/A'}</p>
                      </div>
                      <Trophy className="h-8 w-8 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Vote Tally Bar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Vote Tally</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {results.results
                      .sort((a, b) => b.voteCount - a.voteCount)
                      .map((candidate, index) => {
                        const percentage = results.totalVotes > 0 
                          ? (candidate.voteCount / results.totalVotes) * 100 
                          : 0;
                        const isWinner = candidate.voteCount === getWinner()?.voteCount;
                        
                        return (
                          <div key={candidate.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Badge variant={isWinner ? "default" : "outline"}>
                                  #{index + 1}
                                </Badge>
                                <h3 className="font-semibold text-lg">{candidate.name}</h3>
                                {isWinner && <Trophy className="h-4 w-4 text-yellow-500" />}
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold">{candidate.voteCount}</p>
                                <p className="text-sm text-muted-foreground">
                                  {percentage.toFixed(1)}%
                                </p>
                              </div>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="w-full bg-muted rounded-full h-4 relative overflow-hidden">
                              <div 
                                className={`h-4 rounded-full transition-all duration-1000 ease-out ${
                                  isWinner ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 'bg-primary'
                                }`}
                                style={{ width: `${percentage}%` }}
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs font-medium text-white mix-blend-difference">
                                  {candidate.voteCount} votes
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {!results && !loading && (
            <Card>
              <CardContent className="p-12 text-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Select an election above to view live results
                </p>
              </CardContent>
            </Card>
          )}

          {loading && (
            <Card>
              <CardContent className="p-12 text-center">
                <RefreshCw className="h-8 w-8 text-primary animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading results...</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default Results;