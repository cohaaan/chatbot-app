import React from 'react';
import type { ChatWidgetSettings } from '../Dashboard/AppearanceSettings';

interface ChatWidgetProps {
  settings: ChatWidgetSettings;
  botId: string;
}

export default function ChatWidget({ settings, botId }: ChatWidgetProps) {
  const {
    fontSize,
    fontFamily,
    subheading,
    chatInputPlaceholder,
    titleColor,
    inputTextColor,
    backgroundColor,
  } = settings;

  return (
    <div 
      className="fixed bottom-4 right-4 w-96 shadow-xl rounded-lg overflow-hidden"
      style={{ backgroundColor, fontFamily }}
    >
      <div 
        className="p-4 flex justify-between items-center"
        style={{ backgroundColor: titleColor }}
      >
        <div>
          <h3 
            className="text-white font-semibold"
            style={{ fontSize: `${fontSize}px` }}
          >
            Virtual Assistant
          </h3>
          <p className="text-white text-sm opacity-80">{subheading}</p>
        </div>
        <span className="text-white">Available</span>
      </div>
      <div className="p-4">
        <div className="bg-gray-100 rounded-lg p-3 mb-4">
          <p>Hi! What can I help you with?</p>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={chatInputPlaceholder}
            className="flex-1 p-2 border rounded-lg"
            style={{ color: inputTextColor }}
          />
          <button className="p-2 bg-blue-600 text-white rounded-lg">
            ✈️
          </button>
        </div>
      </div>
    </div>
  );
}
