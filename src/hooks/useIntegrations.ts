import { useState, useCallback } from 'react';
import { connectGoogleCalendar, connectCalendly, isConnected } from '../services/integrations';

export function useIntegrations() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connections, setConnections] = useState({
    google: isConnected('google'),
    calendly: isConnected('calendly')
  });

  const handleConnect = useCallback(async (integrationType: 'google' | 'calendly') => {
    try {
      setIsConnecting(true);
      setError(null);
      
      if (integrationType === 'google') {
        await connectGoogleCalendar();
      } else {
        await connectCalendly();
      }

      setConnections(prev => ({
        ...prev,
        [integrationType]: true
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect');
    } finally {
      setIsConnecting(false);
    }
  }, []);

  return {
    isConnecting,
    error,
    connections,
    handleConnect
  };
}