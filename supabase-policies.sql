-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE elections ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Elections policies
CREATE POLICY "Anyone can view active elections" ON elections
  FOR SELECT USING (is_active = true);

CREATE POLICY "Only admins can create elections" ON elections
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text AND is_admin = true
    )
  );

-- Candidates policies
CREATE POLICY "Anyone can view candidates" ON candidates
  FOR SELECT USING (true);

CREATE POLICY "Only admins can manage candidates" ON candidates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text AND is_admin = true
    )
  );

-- Votes policies
CREATE POLICY "Users can view their own votes" ON votes
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can cast votes" ON votes
  FOR INSERT WITH CHECK (
    auth.uid()::text = user_id::text AND
    NOT EXISTS (
      SELECT 1 FROM votes 
      WHERE user_id::text = auth.uid()::text AND election_id = NEW.election_id
    )
  );

-- Admin can view all data
CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text AND is_admin = true
    )
  );

CREATE POLICY "Admins can view all votes" ON votes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text AND is_admin = true
    )
  );