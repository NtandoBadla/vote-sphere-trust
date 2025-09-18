import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/lib/api";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AddCandidateForm = ({ 
  elections, 
  onCandidateAdded 
}: { 
  elections: any[]; 
  onCandidateAdded: () => void; 
}) => {
  const [formData, setFormData] = useState({
    electionId: "",
    name: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await api.addCandidate(formData);
      setFormData({ electionId: "", name: "", description: "" });
      toast({
        title: "Candidate added successfully!",
        description: `${formData.name} has been added to the election.`,
      });
      onCandidateAdded();
    } catch (error) {
      console.error('Failed to add candidate:', error);
      toast({
        title: "Failed to add candidate",
        description: "There was an error adding the candidate. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Add Candidate
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="electionId">Election</Label>
            <Select value={formData.electionId} onValueChange={(value) => setFormData({ ...formData, electionId: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select an election" />
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
          
          <div>
            <Label htmlFor="name">Candidate Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Adding..." : "Add Candidate"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};