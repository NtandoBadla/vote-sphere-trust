import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/config/emailjs';

export const sendWelcomeEmail = async (userEmail: string, firstName: string, lastName: string) => {
  console.log('=== EMAIL DEBUG ===');
  console.log('EmailJS Config:', EMAILJS_CONFIG);
  console.log('Sending email to:', userEmail);
  
  try {
    const templateParams = {
      to_email: userEmail,
      user_email: userEmail,
      to_name: `${firstName} ${lastName}`,
      user_name: `${firstName} ${lastName}`,
      from_name: 'VoteSphere Trust',
      first_name: firstName,
      last_name: lastName,
      message: `Dear ${firstName},\n\nWelcome to VoteSphere Trust! Your account has been successfully created.\n\nYou can now participate in secure, transparent elections. We're excited to have you as part of our democratic community.\n\nBest regards,\nThe VoteSphere Trust Team`
    };

    console.log('Template params:', templateParams);

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    console.log('Welcome email sent successfully:', response);
    alert('Welcome email sent successfully!');
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    alert(`Email failed: ${error}`);
    return { success: false, error };
  }
};