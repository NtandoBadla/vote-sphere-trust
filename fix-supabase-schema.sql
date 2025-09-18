-- Fix column names to match API expectations
ALTER TABLE users RENAME COLUMN "firstName" TO first_name;
ALTER TABLE users RENAME COLUMN "lastName" TO last_name;
ALTER TABLE users RENAME COLUMN "isAdmin" TO is_admin;

ALTER TABLE elections RENAME COLUMN "startDate" TO start_date;
ALTER TABLE elections RENAME COLUMN "endDate" TO end_date;

ALTER TABLE candidates RENAME COLUMN "electionId" TO election_id;

ALTER TABLE votes RENAME COLUMN "userId" TO user_id;
ALTER TABLE votes RENAME COLUMN "electionId" TO election_id;
ALTER TABLE votes RENAME COLUMN "candidateId" TO candidate_id;