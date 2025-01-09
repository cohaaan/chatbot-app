import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatWidget from '../components/Widget/ChatWidget';
import type { ChatWidgetSettings } from '../components/Dashboard/AppearanceSettings';

export default function Widget() {
  const { botId } = useParams<{ botId: string }>();
  const [settings, setSettings] = useState<ChatWidgetSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Mock settings data
    const mockSettings: ChatWidgetSettings = {
      primaryColor: '#4F46E5',
      chatboxPosition: 'right',
      welcomeMessage: 'Hello! How can I help you today?',
      widgetButtonText: 'Chat with us',
      botName: 'Test Bot',
      fontSize: 16,
      fontFamily: 'system-ui',
      subheading: 'Available',
      chatInputPlaceholder: 'Ask me anything...',
      chatbotIcon: 'Robot',
      sendMessageButton: 'Paper Plane',
      titleColor: '#4F46E5',
      inputTextColor: '#000000',
      backgroundColor: '#FFFFFF',
    };

    setSettings(mockSettings);
    setLoading(false);
  }, [botId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        Error: {error}
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        No settings found
      </div>
    );
  }

  return <ChatWidget settings={settings} botId={botId!} />;
}
