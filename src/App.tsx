import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VotingDashboard from "./pages/VotingDashboard";
import Ballot from "./pages/Ballot";
import Login from "./pages/Login";
import { Register } from "./pages/Register";
import { RegistrationSuccess } from "./pages/RegistrationSuccess";
import VoteConfirmation from "./pages/VoteConfirmation";
import Audit from "./pages/Audit";
import Results from "./pages/Results";
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
          <Route path="/register" element={<Register />} />
          <Route path="/registration-success" element={<RegistrationSuccess />} />
          <Route path="/confirmation" element={<VoteConfirmation />} />
          <Route path="/results" element={<Results />} />
          <Route path="/audit" element={<Audit />} />
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
