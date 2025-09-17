import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VotingDashboard from "./pages/VotingDashboard";
import Ballot from "./pages/Ballot";
import Login from "./pages/Login";
import VoteConfirmation from "./pages/VoteConfirmation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vote" element={<VotingDashboard />} />
          <Route path="/ballot/:electionId" element={<Ballot />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route path="/confirmation" element={<VoteConfirmation />} />
          <Route path="/results" element={<VotingDashboard />} />
          <Route path="/audit" element={<VotingDashboard />} />
          <Route path="/admin" element={<VotingDashboard />} />
          <Route path="/demo" element={<VotingDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
