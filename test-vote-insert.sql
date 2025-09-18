-- Test vote insertion directly in Supabase
INSERT INTO votes (user_id, election_id, candidate_id) 
VALUES (1, 1, 1);

-- Check if vote was inserted
SELECT * FROM votes;