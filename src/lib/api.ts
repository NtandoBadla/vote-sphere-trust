import { supabase } from './supabase';

const SUPABASE_URL = import.meta.env.REACT_APP_SUPABASE_URL || 'https://hjgeulcorrbctynswzqi.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZ2V1bGNvcnJiY3R5bnN3enFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMzY0MjksImV4cCI6MjA3MzcxMjQyOX0.5h6eXXO3RzE_VzayAQq4esEFDfxjCjUF0ur2WFrAg8g';
const API_BASE_URL = `${SUPABASE_URL}/rest/v1`;

class ApiClient {
  private getAuthHeaders() {
    // Don't send custom tokens to Supabase - use anon key only
    return {};
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=representation',
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    };

    console.log('API Request:', { url, method: config.method || 'GET' });
    
    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', { status: response.status, statusText: response.statusText, body: errorText });
        let error;
        try {
          error = JSON.parse(errorText);
        } catch {
          error = { error: `HTTP ${response.status}: ${response.statusText}`, details: errorText };
        }
        throw new Error(error.message || error.error || 'Request failed');
      }

      return response.json();
    } catch (error) {
      console.error('Network Error:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Cannot connect to Supabase. Please check your connection.');
      }
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await this.request(`/users?email=eq.${encodeURIComponent(email)}&select=*`);
    const users = response || [];
    const user = users[0];
    
    if (user && user.password === password) {
      const token = btoa(JSON.stringify({ id: user.id, email: user.email }));
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { token, user };
    }
    
    throw new Error('Invalid credentials');
  }

  async register(userData: { email: string; password: string; firstName: string; lastName: string; idNumber: string; dateOfBirth: string }) {
    // Check if email already exists
    try {
      const existingUsers = await this.request(`/users?email=eq.${encodeURIComponent(userData.email)}&select=email`);
      if (existingUsers && existingUsers.length > 0) {
        throw new Error('This email address is already registered. Please use a different email or try logging in.');
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('already registered')) {
        throw error;
      }
    }

    const response = await this.request('/users', {
      method: 'POST',
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        first_name: userData.firstName,
        last_name: userData.lastName,
        id_number: userData.idNumber,
        date_of_birth: userData.dateOfBirth,
        is_admin: false
      }),
    });
    
    const newUser = Array.isArray(response) ? response[0] : response;
    const mockToken = btoa(JSON.stringify({ id: newUser.id, email: newUser.email }));
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    return { token: mockToken, user: newUser };
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Election endpoints
  async getElections() {
    const elections = await this.request(`/elections?select=*&order=start_date.asc`);
    // Filter out expired elections (don't delete to preserve data)
    const now = new Date().toISOString();
    return elections.filter(election => election.end_date > now);
  }

  async createElection(electionData: { title: string; description: string; startDate: string; endDate: string }) {
    return await this.request('/elections', {
      method: 'POST',
      body: JSON.stringify({
        title: electionData.title,
        description: electionData.description,
        start_date: electionData.startDate,
        end_date: electionData.endDate
      }),
    });
  }

  async addCandidate(candidateData: { electionId: string; name: string; description: string }) {
    return await this.request('/candidates', {
      method: 'POST',
      body: JSON.stringify({
        election_id: parseInt(candidateData.electionId),
        name: candidateData.name,
        description: candidateData.description
      }),
    });
  }

  async getElection(id: string) {
    const election = await this.request(`/elections?id=eq.${id}&select=*`);
    const candidates = await this.request(`/candidates?election_id=eq.${id}&select=*`);
    return { ...election[0], candidates };
  }

  async getElectionResults(id: string) {
    return await this.request(`/candidates?election_id=eq.${id}&select=*`);
  }

  async getVoteCount(electionId: string) {
    const votes = await this.request(`/votes?election_id=eq.${electionId}&select=candidate_id`);
    const candidates = await this.request(`/candidates?election_id=eq.${electionId}&select=id,name`);
    
    console.log('=== VOTE COUNT DEBUG ===');
    console.log('Election ID:', electionId);
    console.log('Total votes in DB:', votes.length);
    console.log('Votes data:', votes);
    console.log('Candidates data:', candidates);
    
    const voteCounts = candidates.map(candidate => {
      const matchingVotes = votes.filter(vote => {
        const match = String(vote.candidate_id) === String(candidate.id);
        console.log(`Vote ${vote.candidate_id} matches candidate ${candidate.id}:`, match);
        return match;
      });
      
      console.log(`Candidate ${candidate.name} (ID: ${candidate.id}): ${matchingVotes.length} votes`);
      
      return {
        ...candidate,
        voteCount: matchingVotes.length
      };
    });
    
    console.log('Final results:', voteCounts);
    console.log('=== END DEBUG ===');
    
    return {
      totalVotes: votes.length,
      results: voteCounts
    };
  }

  async getAllVotes() {
    return await this.request('/votes?select=*,users(first_name,last_name,email),elections(title),candidates(name)');
  }

  async resetPassword(email: string) {
    // Check if user exists
    const users = await this.request(`/users?email=eq.${encodeURIComponent(email)}&select=email,first_name,last_name`);
    if (!users || users.length === 0) {
      throw new Error('No account found with this email address.');
    }
    
    const user = users[0];
    
    // Generate reset token and store it (in a real app, you'd store this in database)
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const resetUrl = `${window.location.origin}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
    
    // Send reset email using EmailJS
    const emailjs = await import('@emailjs/browser');
    const EMAILJS_CONFIG = {
      SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    };
    
    const templateParams = {
      to_email: email,
      to_name: `${user.first_name} ${user.last_name}`,
      from_name: 'VoteSphere Trust',
      subject: 'Password Reset Request',
      message: `Dear ${user.first_name},\n\nYou requested a password reset for your VoteSphere Trust account.\n\nClick the link below to reset your password:\n${resetUrl}\n\nIf you didn't request this, please ignore this email.\n\nBest regards,\nThe VoteSphere Trust Team`
    };
    
    await emailjs.default.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );
    
    return { success: true };
  }

  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    
    if (error) {
      throw new Error(error.message);
    }
    
    return { success: true };
  }

  // Vote endpoints
  async castVote(electionId: string, candidateId: string) {
    const user = this.getCurrentUser();
    if (!user) throw new Error('Not authenticated');
    
    // Check if election is still active
    const election = await this.request(`/elections?id=eq.${electionId}&select=end_date`);
    if (election.length === 0) throw new Error('Election not found');
    
    if (new Date() > new Date(election[0].end_date)) {
      throw new Error('Election has ended. Voting is no longer allowed.');
    }
    
    console.log('Casting vote:', { user_id: user.id, election_id: parseInt(electionId), candidate_id: parseInt(candidateId) });
    
    const result = await this.request('/votes', {
      method: 'POST',
      body: JSON.stringify({ 
        user_id: user.id, 
        election_id: parseInt(electionId), 
        candidate_id: parseInt(candidateId) 
      }),
    });
    
    console.log('Vote cast result:', result);
    return result;
  }

  async getMyVotes() {
    const user = this.getCurrentUser();
    if (!user) return [];
    
    return this.request(`/votes?user_id=eq.${user.id}&select=*`);
  }

  async getVoteStatus(electionId: string) {
    const user = this.getCurrentUser();
    if (!user) return { hasVoted: false };
    
    const votes = await this.request(`/votes?user_id=eq.${user.id}&election_id=eq.${electionId}&select=*`);
    return { 
      hasVoted: votes.length > 0, 
      candidateId: votes[0]?.candidate_id 
    };
  }
}

export const api = new ApiClient();