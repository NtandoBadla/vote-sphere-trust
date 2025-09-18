-- Add columns one by one
ALTER TABLE users ADD COLUMN id_number VARCHAR(20);

-- Add date of birth column
ALTER TABLE users ADD COLUMN date_of_birth DATE;