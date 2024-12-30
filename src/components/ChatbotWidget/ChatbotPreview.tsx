import React from 'react';
import type { ChatbotConfig } from '../../types';
import { MessageCircle } from 'lucide-react';

interface ChatbotPreviewProps {
  config: ChatbotConfig;
  isOpen: boolean;
  onToggle: () => void;
}

export default function ChatbotPreview({ config, isOpen, onToggle }: ChatbotPreviewProps) {
  const bubblePosition = config.theme.bubblePosition === 'bottom-right' ? 'right-4' : 'left-4';

  return (
    <div className={`fixed bottom-4 ${bubblePosition} z-50`}>
      {!isOpen && (
        <button
          onClick={onToggle}
          style={{ backgroundColor: config.theme.primaryColor }}
          className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="w-96 rounded-lg bg-white shadow-xl">
          <div
            style={{ backgroundColor: config.theme.primaryColor }}
            className="flex items-center justify-between rounded-t-lg p-4 text-white"
          >
            <h3 className="text-lg font-semibold">{config.name}</h3>
            <button onClick={onToggle} className="rounded-full p-1 hover:bg-white/10">
              ✕
            </button>
          </div>
          <div className="h-96 p-4">
            <div className="mb-4">
              <p className="rounded-lg bg-gray-100 p-3">{config.messages.greeting}</p>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <input
                type="text"
                placeholder={config.messages.placeholder}
                className="w-full rounded-full border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}