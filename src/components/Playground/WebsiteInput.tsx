import React, { useState } from 'react';

export default function WebsiteInput() {
  const [url, setUrl] = useState('');

  const handleSubmit = async () => {
    // Mock implementation for now
    console.log('Website to process:', url);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
          Website URL
        </label>
        <div className="mt-1">
          <input
            type="url"
            id="url"
            name="url"
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Re-Train Chatbot
      </button>
    </div>
  );
}
