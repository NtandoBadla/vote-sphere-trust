import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';

export const BackendStatus = () => {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const SUPABASE_URL = import.meta.env.REACT_APP_SUPABASE_URL || 'https://hjgeulcorrbctynswzqi.supabase.co';
        const SUPABASE_ANON_KEY = import.meta.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZ2V1bGNvcnJiY3R5bnN3enFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMzY0MjksImV4cCI6MjA3MzcxMjQyOX0.5h6eXXO3RzE_VzayAQq4esEFDfxjCjUF0ur2WFrAg8g';
        
        const response = await fetch(`${SUPABASE_URL}/rest/v1/users?select=count`, {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          }
        });
        
        if (response.ok) {
          setStatus('online');
        } else {
          setStatus('offline');
        }
      } catch {
        setStatus('offline');
      }
    };

    checkBackend();
    const interval = setInterval(checkBackend, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Badge variant={status === 'online' ? 'default' : 'destructive'}>
      Backend: {status === 'checking' ? 'Checking...' : status}
    </Badge>
  );
};