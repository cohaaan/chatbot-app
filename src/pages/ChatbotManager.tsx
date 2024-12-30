import React, { useState } from 'react';
import ChatbotList from '../components/Dashboard/ChatbotList';
import ChatbotForm from '../components/Dashboard/ChatbotForm';
import type { ChatbotConfig } from '../types';

export default function ChatbotManager() {
  const [chatbots, setChatbots] = useState<ChatbotConfig[]>([]);
  const [selectedBot, setSelectedBot] = useState<Partial<ChatbotConfig> | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddNew = () => {
    setSelectedBot({});
    setShowForm(true);
  };

  const handleEdit = (bot: ChatbotConfig) => {
    setSelectedBot(bot);
    setShowForm(true);
  };

  const handleUpdate = (updatedBot: Partial<ChatbotConfig>) => {
    if (selectedBot?.id) {
      // Update existing bot
      setChatbots(prev => prev.map(bot => 
        bot.id === selectedBot.id ? { ...bot, ...updatedBot } : bot
      ));
    } else {
      // Add new bot
      const newBot = {
        ...updatedBot,
        id: Date.now().toString(),
        theme: {
          primaryColor: '#4F46E5',
          fontFamily: 'system-ui',
          bubblePosition: 'bottom-right',
          iconType: 'default'
        },
        messages: {
          greeting: updatedBot.messages?.greeting || 'Hello! How can I help you today?',
          placeholder: 'Type your message...'
        },
        integrations: {}
      } as ChatbotConfig;
      
      setChatbots(prev => [...prev, newBot]);
    }
    setShowForm(false);
  };

  return (
    <div className="p-6">
      {!showForm ? (
        <>
          <div className="mb-8">
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Chatbots</h1>
              <button className="rounded-lg bg-white px-6 py-2 font-medium text-blue-600 shadow-sm hover:bg-gray-50">
                Subscribe now
              </button>
            </div>
            <div className="relative w-full max-w-2xl">
              <input
                type="text"
                placeholder="Search your chatbot"
                className="w-full p-3 pl-10 bg-gray-100 rounded-lg"
              />
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>
          
          <ChatbotList 
            chatbots={chatbots}
            onAddNew={handleAddNew}
            onEdit={handleEdit}
          />
        </>
      ) : (
        <ChatbotForm
          chatbot={selectedBot || {}}
          onUpdate={handleUpdate}
          onCancel={() => setShowForm(false)}
          onTest={() => console.log('Test bot')}
          onGetWidgetCode={() => console.log('Get widget code')}
        />
      )}
    </div>
  );
}