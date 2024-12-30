import { handleGoogleConnect } from './auth/handlers';
import { mockOAuthFlow } from './mockAuth';

export async function connectGoogleCalendar() {
  // In development with mock flag, use mock flow
  if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_AUTH === 'true') {
    const token = await mockOAuthFlow('google');
    localStorage.setItem('google_token', token);
    return token;
  }
  
  // Real OAuth flow
  return handleGoogleConnect();
}

export async function connectCalendly() {
  // In development with mock flag, use mock flow
  if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_AUTH === 'true') {
    const token = await mockOAuthFlow('calendly');
    localStorage.setItem('calendly_token', token);
    return token;
  }

  // Real Calendly OAuth flow
  return handleCalendlyConnect();
}

export function isConnected(provider: 'google' | 'calendly'): boolean {
  const token = localStorage.getItem(`${provider}_token`);
  return !!token;
}