import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');

    if (code) {
      // Store the auth code temporarily
      sessionStorage.setItem('oauth_code', code);
      navigate('/integrations');
    } else if (error) {
      navigate('/integrations?error=' + error);
    }
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Processing authentication...</h2>
        <p className="mt-2 text-gray-600">Please wait while we complete the process.</p>
      </div>
    </div>
  );
}