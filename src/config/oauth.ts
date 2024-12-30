// OAuth configuration
export const OAUTH_CONFIG = {
  google: {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    redirectUri: import.meta.env.VITE_REDIRECT_URI,
    scope: 'https://www.googleapis.com/auth/calendar',
  },
  calendly: {
    clientId: import.meta.env.VITE_CALENDLY_CLIENT_ID,
    redirectUri: import.meta.env.VITE_REDIRECT_URI,
    scope: 'default',
  }
};