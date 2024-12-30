import React from 'react';
import { Calendar, Link as LinkIcon } from 'lucide-react';
import { useIntegrations } from '../hooks/useIntegrations';

const integrations = [
  {
    id: 'google',
    name: 'Google Calendar',
    description: 'Allow your chatbot to schedule meetings directly through Google Calendar',
    icon: <Calendar className="h-8 w-8 text-blue-500" />,
  },
  {
    id: 'calendly',
    name: 'Calendly',
    description: 'Integrate with Calendly for seamless appointment scheduling',
    icon: <LinkIcon className="h-8 w-8 text-green-500" />,
  },
];

export default function Integrations() {
  const { isConnecting, error, connections, handleConnect } = useIntegrations();

  return (
    <div className="h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
        <p className="mt-2 text-gray-600">Connect your chatbot with external services</p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {integrations.map((integration) => {
          const isConnected = connections[integration.id as keyof typeof connections];
          
          return (
            <div key={integration.name} className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4">{integration.icon}</div>
              <h3 className="mb-2 text-lg font-semibold">{integration.name}</h3>
              <p className="mb-4 text-gray-600">{integration.description}</p>
              <button 
                onClick={() => handleConnect(integration.id as 'google' | 'calendly')}
                disabled={isConnecting}
                className={`rounded-lg px-4 py-2 text-white transition-colors
                  ${isConnected 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-blue-600 hover:bg-blue-700'}
                  ${isConnecting ? 'cursor-not-allowed opacity-75' : ''}
                `}
              >
                {isConnecting ? 'Connecting...' : isConnected ? 'Connected' : 'Connect'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}