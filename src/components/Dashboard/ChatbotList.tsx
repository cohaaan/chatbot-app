import React from 'react';
import { Plus } from 'lucide-react';
import type { ChatbotConfig } from '../../types';

interface ChatbotListProps {
  chatbots: ChatbotConfig[];
  onAddNew: () => void;
  onEdit: (chatbot: ChatbotConfig) => void;
}

export default function ChatbotList({ chatbots, onAddNew, onEdit }: ChatbotListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <button
        onClick={onAddNew}
        className="flex h-[300px] w-full flex-col items-center justify-center gap-4 rounded-lg bg-blue-600 p-6 text-white transition-transform hover:scale-105"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
          <Plus size={32} className="text-white" />
        </div>
        <span className="text-xl font-semibold">Add chatbot</span>
      </button>

      {chatbots.map((bot) => (
        <div key={bot.id} className="bg-white p-6 rounded-lg shadow relative">
          <h3 className="font-semibold mb-2 text-2xl">{bot.name}</h3>
          <p className="text-gray-600 mb-4 truncate">{bot.messages.greeting}</p>
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-blue-600"
            onClick={() => onEdit(bot)}
          >
            <i className="fas fa-pencil-alt"></i>
          </button>
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-200 to-transparent"></div>
        </div>
      ))}
    </div>
  );
}