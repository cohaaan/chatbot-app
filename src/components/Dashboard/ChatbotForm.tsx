import React from 'react';
import type { ChatbotConfig } from '../../types';

interface ChatbotFormProps {
  chatbot: Partial<ChatbotConfig>;
  onUpdate: (chatbot: Partial<ChatbotConfig>) => void;
  onCancel: () => void;
  onTest: () => void;
  onGetWidgetCode: () => void;
}

export default function ChatbotForm({ 
  chatbot, 
  onUpdate, 
  onCancel, 
  onTest,
  onGetWidgetCode 
}: ChatbotFormProps) {
  const [formData, setFormData] = React.useState(chatbot);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Bot Configuration</h2>
        <input
          type="text"
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
          placeholder="Bot Name"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Greeting Message</h2>
        <textarea
          name="greeting"
          value={formData.messages?.greeting || ''}
          onChange={handleChange}
          placeholder="Enter greeting message"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Calendar Integration</h2>
        <select 
          name="calendarType"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="calendly">Calendly</option>
        </select>
      </div>

      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onTest}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Test Bot
        </button>
        <button
          type="button"
          onClick={onGetWidgetCode}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Get Widget Code
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}