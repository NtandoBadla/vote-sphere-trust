-- Simple test data without password hashing
TRUNCATE TABLE votes, candidates, elections, users RESTART IDENTITY CASCADE;

INSERT INTO users (email, password, "firstName", "lastName", "isAdmin") VALUES 
('admin@votesphere.com', 'admin123', 'Admin', 'User', TRUE),
('user@example.com', 'user123', 'Test', 'User', FALSE);

INSERT INTO elections (title, description, "startDate", "endDate") VALUES 
('Student Council President', 'Vote for your next student council president', '2024-01-01 00:00:00', '2024-12-31 23:59:59');

-- Now the election will have id=1 since we reset the sequence
INSERT INTO candidates ("electionId", name, description) VALUES 
(1, 'Alice Johnson', 'Experienced leader with fresh ideas'),
(1, 'Bob Smith', 'Committed to student welfare and campus improvement');