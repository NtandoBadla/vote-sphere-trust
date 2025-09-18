-- Create function to send vote confirmation email
CREATE OR REPLACE FUNCTION send_vote_confirmation_email()
RETURNS TRIGGER AS $$
DECLARE
  user_email TEXT;
  election_title TEXT;
  candidate_name TEXT;
BEGIN
  -- Get user email
  SELECT email INTO user_email FROM users WHERE id = NEW.user_id;
  
  -- Get election title
  SELECT title INTO election_title FROM elections WHERE id = NEW.election_id;
  
  -- Get candidate name
  SELECT name INTO candidate_name FROM candidates WHERE id = NEW.candidate_id;
  
  -- Send email using Supabase Edge Function (you'll need to create this)
  PERFORM
    net.http_post(
      url := 'https://your-project.supabase.co/functions/v1/send-vote-email',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"}'::jsonb,
      body := json_build_object(
        'email', user_email,
        'election', election_title,
        'candidate', candidate_name,
        'vote_id', 'VS-' || NEW.id,
        'timestamp', NEW.created_at
      )::text
    );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;