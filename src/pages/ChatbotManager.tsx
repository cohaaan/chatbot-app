import React, { useState } from 'react';
import ChatbotForm from '../components/Dashboard/ChatbotForm';
import AppearanceSettings from '../components/Dashboard/AppearanceSettings';
import type { ChatbotConfig } from '../types';

export default function ChatbotManager() {
  const [chatbots, setChatbots] = useState<ChatbotConfig[]>([]);
  const [selectedBot, setSelectedBot] = useState<Partial<ChatbotConfig> | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('ai-agent');

  const handleAddNew = () => {
    setSelectedBot(null);
    setShowForm(true);
  };

  const handleUpdate = (updatedBot: Partial<ChatbotConfig>) => {
    if (selectedBot?.id) {
      setChatbots(prev => prev.map(bot => 
        bot.id === selectedBot.id ? { ...bot, ...updatedBot } : bot
      ));
    } else {
      const newBot = {
        ...updatedBot,
        id: Date.now().toString(),
      } as ChatbotConfig;
      
      setChatbots(prev => [...prev, newBot]);
    }
    setShowForm(false);
  };

  const handleAppearanceUpdate = (settings: any) => {
    // Save appearance settings
    console.log('Appearance settings updated:', settings);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'ai-agent':
        return (
          <>
            <div className="relative">
              <input
                type="text"
                placeholder="Search your chatbot"
                className="w-full h-12 px-4 py-2 pl-10 bg-gray-50 rounded-lg"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <button
                onClick={handleAddNew}
                className="h-48 flex flex-col items-center justify-center space-y-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4V20M20 12L4 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-medium text-gray-900">Create new chatbot</span>
              </button>

              {chatbots.map(bot => (
                <div
                  key={bot.id}
                  className="bg-white rounded-lg shadow-sm border p-6 space-y-4"
                >
                  <h3 className="font-semibold">{bot.botName}</h3>
                  <p className="text-sm text-gray-500">{bot.promptText}</p>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => {
                        setSelectedBot(bot);
                        setShowForm(true);
                      }}
                      className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        );
      case 'appearance':
        return <AppearanceSettings onSave={handleAppearanceUpdate} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Virtual Assistant Dashboard</h1>
        <button className="text-blue-600 font-medium hover:text-blue-700">
          Subscribe now
        </button>
      </div>

      <div className="border-b">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('ai-agent')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'ai-agent'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            AI Agent
          </button>
          <button
            onClick={() => setActiveTab('appearance')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'appearance'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Appearance
          </button>
        </nav>
      </div>

      {renderTabContent()}

      {showForm && (
        <ChatbotForm
          bot={selectedBot}
          onSubmit={handleUpdate}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}