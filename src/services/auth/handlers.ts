import { initiateGoogleAuth } from './google';
import { initiateCalendlyAuth } from './calendly';

export async function handleGoogleConnect() {
  if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) {
    throw new Error('Google Client ID not configured. Please add it to your .env file.');
  }
  
  return initiateGoogleAuth();
}

export async function handleCalendlyConnect() {
  if (!import.meta.env.VITE_CALENDLY_CLIENT_ID) {
    throw new Error('Calendly Client ID not configured. Please add it to your .env file.');
  }
  
  return initiateCalendlyAuth();
}