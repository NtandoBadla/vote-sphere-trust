import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';

const SUPABASE_URL = 'https://hjgeulcorrbctynswzqi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZ2V1bGNvcnJiY3R5bnN3enFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMzY0MjksImV4cCI6MjA3MzcxMjQyOX0.5h6eXXO3RzE_VzayAQq4esEFDfxjCjUF0ur2WFrAg8g';

export const SupabaseStatus = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/users?select=count`, {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          }
        });
        
        if (response.ok) {
          setStatus('connected');
          setError('');
        } else {
          setStatus('error');
          setError(`HTTP ${response.status}`);
        }
      } catch (err) {
        setStatus('error');
        setError('Network error');
      }
    };

    checkConnection();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <Badge variant={status === 'connected' ? 'default' : 'destructive'}>
        Supabase: {status === 'checking' ? 'Checking...' : status}
      </Badge>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};