import React, { useState } from 'react';

export default function TextInput() {
  const [text, setText] = useState('');

  const handleSubmit = async () => {
    // Mock implementation for now
    console.log('Text to process:', text);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700">
          Enter Text
        </label>
        <div className="mt-1">
          <textarea
            id="text"
            name="text"
            rows={4}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
            placeholder="Enter your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
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
