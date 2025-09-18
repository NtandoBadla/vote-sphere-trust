-- Supabase PostgreSQL Schema

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "isAdmin" BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE elections (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    "startDate" TIMESTAMP NOT NULL,
    "endDate" TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE candidates (
    id SERIAL PRIMARY KEY,
    "electionId" INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    FOREIGN KEY ("electionId") REFERENCES elections(id) ON DELETE CASCADE
);

CREATE TABLE votes (
    id SERIAL PRIMARY KEY,
    "userId" INT NOT NULL,
    "electionId" INT NOT NULL,
    "candidateId" INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE("userId", "electionId"),
    FOREIGN KEY ("userId") REFERENCES users(id),
    FOREIGN KEY ("electionId") REFERENCES elections(id),
    FOREIGN KEY ("candidateId") REFERENCES candidates(id)
);

INSERT INTO users (email, password, "firstName", "lastName", "isAdmin") VALUES 
('admin@votesphere.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'User', TRUE),
('user@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Test', 'User', FALSE);

INSERT INTO elections (title, description, "startDate", "endDate") VALUES 
('Student Council President', 'Vote for your next student council president', '2024-01-01 00:00:00', '2024-12-31 23:59:59');

INSERT INTO candidates ("electionId", name, description) VALUES 
(1, 'Alice Johnson', 'Experienced leader with fresh ideas'),
(1, 'Bob Smith', 'Committed to student welfare and campus improvement');