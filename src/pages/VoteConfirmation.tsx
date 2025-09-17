import { useLocation, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Shield, 
  Download, 
  Mail, 
  Lock, 
  Hash,
  Clock,
  FileText,
  Share
} from "lucide-react";
import Navigation from "@/components/Navigation";

const VoteConfirmation = () => {
  const location = useLocation();
  const { election, candidate, timestamp } = location.state || {};

  // Generate mock verification data
  const verificationData = {
    voteId: "VS-2024-7B4A-9F2E-1D8C",
    blockHash: "0x7b4a9f2e1d8c...3e5f8a2b",
    transactionId: "tx_45f7b2a9c1e8d6f3",
    confirmationNumber: "CF-2024-12-10-4751",
    timestamp: timestamp || new Date().toISOString(),
    verificationUrl: "https://verify.votesphere.gov/VS-2024-7B4A-9F2E-1D8C"
  };

  const downloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    const receiptData = {
      election,
      candidate,
      ...verificationData
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(receiptData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `vote-receipt-${verificationData.voteId}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-vote-success/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-12 w-12 text-vote-success" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Vote Confirmed!</h1>
            <p className="text-xl text-muted-foreground">
              Your vote has been successfully recorded and verified
            </p>
          </div>

          {/* Main Confirmation Card */}
          <Card className="shadow-voting mb-8 border-vote-success/30">
            <CardHeader className="bg-gradient-to-r from-vote-success/5 to-transparent">
              <CardTitle className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-vote-success" />
                Vote Verification Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Vote Summary */}
              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Vote Summary</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Election</p>
                    <p className="font-medium text-foreground">{election || "City Council Election 2024"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Your Choice</p>
                    <p className="font-medium text-foreground">{candidate || "Sarah Chen"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Cast Time</p>
                    <p className="font-medium text-foreground">
                      {new Date(verificationData.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    <Badge className="bg-vote-success text-vote-success-foreground">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified & Recorded
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Cryptographic Verification */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Cryptographic Verification</h3>
                
                <div className="grid gap-4">
                  <div className="flex items-start gap-3 p-4 bg-card rounded-lg border">
                    <Hash className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground mb-1">Vote ID</p>
                      <p className="text-xs font-mono text-muted-foreground break-all">
                        {verificationData.voteId}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-card rounded-lg border">
                    <Lock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground mb-1">Blockchain Hash</p>
                      <p className="text-xs font-mono text-muted-foreground break-all">
                        {verificationData.blockHash}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-card rounded-lg border">
                    <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground mb-1">Transaction ID</p>
                      <p className="text-xs font-mono text-muted-foreground break-all">
                        {verificationData.transactionId}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-card rounded-lg border">
                    <CheckCircle className="h-5 w-5 text-vote-success mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground mb-1">Confirmation Number</p>
                      <p className="text-xs font-mono text-muted-foreground break-all">
                        {verificationData.confirmationNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Button 
                  onClick={downloadReceipt}
                  className="flex-1 bg-gradient-hero shadow-voting"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Receipt
                </Button>
                <Button variant="outline" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Receipt
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share className="h-4 w-4 mr-2" />
                  Share Verification
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  What Happens Next?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-vote-success mt-0.5 flex-shrink-0" />
                    <span>Your vote is encrypted and added to the blockchain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-vote-success mt-0.5 flex-shrink-0" />
                    <span>Email confirmation sent to your registered address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-vote-pending mt-0.5 flex-shrink-0" />
                    <span>Results will be available after voting closes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Audit trail remains permanently accessible</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-vote-success" />
                  Verification Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Independent Verification</p>
                    <p className="text-xs text-muted-foreground mb-3">
                      Use your Vote ID to verify your vote was counted correctly:
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Visit Verification Portal
                    </Button>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Blockchain Explorer</p>
                    <p className="text-xs text-muted-foreground mb-3">
                      View your vote transaction on the public ledger:
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      View on Blockchain
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/vote">View Other Elections</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/results">Check Results</Link>
            </Button>
            <Button asChild size="lg" className="bg-gradient-hero shadow-voting">
              <Link to="/">Return Home</Link>
            </Button>
          </div>

          {/* Security Footer */}
          <Card className="mt-8 border-muted">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Your vote is protected by end-to-end encryption and recorded on an immutable blockchain ledger.
                </p>
                <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3 text-vote-success" />
                    <span>Encrypted</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Lock className="h-3 w-3 text-vote-success" />
                    <span>Anonymous</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-vote-success" />
                    <span>Verifiable</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Hash className="h-3 w-3 text-vote-success" />
                    <span>Immutable</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default VoteConfirmation;