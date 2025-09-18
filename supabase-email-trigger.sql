-- Create trigger to automatically send email after vote is inserted
CREATE TRIGGER vote_confirmation_email_trigger
  AFTER INSERT ON votes
  FOR EACH ROW
  EXECUTE FUNCTION send_vote_confirmation_email();