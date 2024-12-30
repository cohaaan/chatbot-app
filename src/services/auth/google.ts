import { OAUTH_CONFIG } from '../../config/oauth';

export function initiateGoogleAuth() {
  const { clientId, redirectUri, scope } = OAUTH_CONFIG.google;
  
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope,
    access_type: 'offline',
    prompt: 'consent',
  });

  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}