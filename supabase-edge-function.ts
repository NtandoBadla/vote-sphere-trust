// Create this as a Supabase Edge Function
// Run: supabase functions new send-vote-email
// Then replace the index.ts content with this:

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  const { email, election, candidate, vote_id, timestamp } = await req.json()

  const emailHtml = `
    <h2>Vote Confirmation - VoteSphere Trust</h2>
    <p>Your vote has been successfully recorded!</p>
    
    <h3>Vote Details:</h3>
    <ul>
      <li><strong>Election:</strong> ${election}</li>
      <li><strong>Candidate:</strong> ${candidate}</li>
      <li><strong>Vote ID:</strong> ${vote_id}</li>
      <li><strong>Time:</strong> ${new Date(timestamp).toLocaleString()}</li>
    </ul>
    
    <p>Your vote is secure, encrypted, and has been recorded on the blockchain.</p>
    <p>Thank you for participating in the democratic process!</p>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'VoteSphere <noreply@votesphere.com>',
      to: [email],
      subject: `Vote Confirmation - ${election}`,
      html: emailHtml,
    }),
  })

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
})