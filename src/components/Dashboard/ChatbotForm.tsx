import React, { useState } from 'react';
import type { ChatbotConfig } from '../../types';
import WidgetCodeGenerator from '../Widget/WidgetCodeGenerator';

interface ChatbotFormProps {
  bot: Partial<ChatbotConfig> | null;
  onSubmit: (chatbot: Partial<ChatbotConfig>) => void;
  onCancel: () => void;
}

export default function ChatbotForm({ bot, onSubmit, onCancel }: ChatbotFormProps) {
  const [formData, setFormData] = useState({
    botName: '',
    promptText: '',
    introMessage: '',
    calendarType: 'Calendly info@connectortq.com',
    eventType: 'Demo Call',
    eventSchedule: '',
    appearance: {
      fontSize: 16,
      fontFamily: 'system-ui',
      subheading: 'Available',
      chatInputPlaceholder: 'Ask me anything...',
      chatbotIcon: 'Robot',
      sendMessageButton: 'Paper Plane',
      titleColor: '#4F46E5',
      inputTextColor: '#000000',
      backgroundColor: '#FFFFFF',
    },
    ...bot
  });

  const [showWidgetCode, setShowWidgetCode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Configure Chatbot</h1>
          <div className="space-x-4">
            <button
              onClick={() => setShowWidgetCode(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Get Widget Code
            </button>
            <button className="px-4 py-1 bg-white text-black rounded-full border hover:bg-gray-50">
              Subscribe now
            </button>
          </div>
        </div>

        {showWidgetCode ? (
          <WidgetCodeGenerator settings={formData.appearance} botId={formData.id || 'preview'} />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold mb-2">Bot Name</label>
              <input
                type="text"
                name="botName"
                value={formData.botName}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Prompt Text</label>
              <textarea
                name="promptText"
                value={formData.promptText}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg h-32"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Intro Message</label>
              <input
                type="text"
                name="introMessage"
                value={formData.introMessage}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}