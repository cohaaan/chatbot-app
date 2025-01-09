import React, { useState } from 'react';
import type { ChatWidgetSettings } from '../Dashboard/AppearanceSettings';

interface WidgetCodeGeneratorProps {
  settings: ChatWidgetSettings;
  botId: string;
}

export default function WidgetCodeGenerator({ settings, botId }: WidgetCodeGeneratorProps) {
  const [copied, setCopied] = useState(false);

  const generateWidgetCode = () => {
    const baseUrl = window.location.origin;
    const widgetUrl = `${baseUrl}/widget/${botId}`;
    
    return `<iframe
  src="${widgetUrl}"
  width="400"
  height="600"
  frameborder="0"
  style="position: fixed; bottom: 20px; right: 20px; border: none; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); border-radius: 12px;"
></iframe>

<script>
  window.addEventListener('message', function(event) {
    if (event.origin === '${baseUrl}') {
      // Handle widget events
      console.log('Widget event:', event.data);
    }
  });
</script>`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateWidgetCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Widget Code</h2>
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
        <code>{generateWidgetCode()}</code>
      </pre>
    </div>
  );
}
