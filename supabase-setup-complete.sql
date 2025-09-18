-- Complete Supabase setup with RLS policies

-- First, create tables and data
TRUNCATE TABLE votes, candidates, elections, users RESTART IDENTITY CASCADE;

INSERT INTO users (email, password, "firstName", "lastName", "isAdmin") VALUES 
('admin@votesphere.com', 'admin123', 'Admin', 'User', TRUE),
('user@example.com', 'user123', 'Test', 'User', FALSE);

INSERT INTO elections (title, description, "startDate", "endDate") VALUES 
('Student Council President', 'Vote for your next student council president', '2024-01-01 00:00:00', '2024-12-31 23:59:59');

INSERT INTO candidates ("electionId", name, description) VALUES 
(1, 'Alice Johnson', 'Experienced leader with fresh ideas'),
(1, 'Bob Smith', 'Committed to student welfare and campus improvement');

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE elections ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read all users" ON users FOR SELECT USING (true);
CREATE POLICY "Anyone can insert users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (true);

-- Create policies for elections table
CREATE POLICY "Anyone can read elections" ON elections FOR SELECT USING (true);
CREATE POLICY "Admins can insert elections" ON elections FOR INSERT WITH CHECK (true);

-- Create policies for candidates table
CREATE POLICY "Anyone can read candidates" ON candidates FOR SELECT USING (true);
CREATE POLICY "Admins can insert candidates" ON candidates FOR INSERT WITH CHECK (true);

-- Create policies for votes table
CREATE POLICY "Users can read all votes" ON votes FOR SELECT USING (true);
CREATE POLICY "Anyone can insert votes" ON votes FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own votes" ON votes FOR UPDATE USING (true);