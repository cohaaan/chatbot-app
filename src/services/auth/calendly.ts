import { OAUTH_CONFIG } from '../../config/oauth';

export function initiateCalendlyAuth() {
  const { clientId, redirectUri, scope } = OAUTH_CONFIG.calendly;
  
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope,
  });

  window.location.href = `https://auth.calendly.com/oauth/authorize?${params}`;
}