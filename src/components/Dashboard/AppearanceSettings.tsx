import React, { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import '@fontsource/inter';
import '@fontsource/roboto';
import '@fontsource/open-sans';
import '@fontsource/lato';
import '@fontsource/poppins';

interface AppearanceSettingsProps {
  onSave: (settings: ChatWidgetSettings) => void;
  initialSettings?: ChatWidgetSettings;
}

interface ChatWidgetSettings {
  fontSize: number;
  fontFamily: string;
  subheading: string;
  chatInputPlaceholder: string;
  chatbotIcon: string;
  sendMessageButton: string;
  titleColor: string;
  inputTextColor: string;
  backgroundColor: string;
}

const fontOptions = [
  { label: 'Inter', value: 'Inter' },
  { label: 'Roboto', value: 'Roboto' },
  { label: 'Open Sans', value: 'Open Sans' },
  { label: 'Lato', value: 'Lato' },
  { label: 'Poppins', value: 'Poppins' },
  { label: 'System UI', value: 'system-ui' },
];

export default function AppearanceSettings({ onSave, initialSettings }: AppearanceSettingsProps) {
  const [settings, setSettings] = useState<ChatWidgetSettings>({
    fontSize: 16,
    fontFamily: 'system-ui',
    subheading: 'Available',
    chatInputPlaceholder: 'Ask me anything...',
    chatbotIcon: 'Robot',
    sendMessageButton: 'Paper Plane',
    titleColor: '#4F46E5',
    inputTextColor: '#000000',
    backgroundColor: '#FFFFFF',
    ...initialSettings,
  });

  const [activeColorPicker, setActiveColorPicker] = useState<string | null>(null);

  const handleSettingChange = (key: keyof ChatWidgetSettings, value: string | number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const PreviewWidget = () => (
    <div 
      className="border rounded-lg overflow-hidden shadow-lg"
      style={{ backgroundColor: settings.backgroundColor }}
    >
      <div 
        className="p-4 flex justify-between items-center"
        style={{ backgroundColor: settings.titleColor }}
      >
        <div>
          <h3 
            className="text-white font-semibold"
            style={{ 
              fontFamily: settings.fontFamily,
              fontSize: `${settings.fontSize}px`
            }}
          >
            Virtual Assistant
          </h3>
          <p className="text-white text-sm opacity-80">{settings.subheading}</p>
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
            placeholder={settings.chatInputPlaceholder}
            className="flex-1 p-2 border rounded-lg"
            style={{ 
              color: settings.inputTextColor,
              fontFamily: settings.fontFamily,
            }}
          />
          <button className="p-2 bg-blue-600 text-white rounded-lg">
            {settings.sendMessageButton === 'Paper Plane' ? '✈️' : '➤'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-semibold">Customize your chat widget</h2>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={() => onSave(settings)}
            className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-16">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Font Size</label>
            <input
              type="number"
              value={settings.fontSize}
              onChange={(e) => handleSettingChange('fontSize', parseInt(e.target.value))}
              className="w-full p-2 border rounded-lg"
              min="12"
              max="24"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Font Family</label>
            <select
              value={settings.fontFamily}
              onChange={(e) => handleSettingChange('fontFamily', e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              {fontOptions.map(font => (
                <option 
                  key={font.value} 
                  value={font.value}
                  style={{ fontFamily: font.value }}
                >
                  {font.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subheading</label>
            <input
              type="text"
              value={settings.subheading}
              onChange={(e) => handleSettingChange('subheading', e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Subheading for the chat widget"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Chat Input Placeholder</label>
            <input
              type="text"
              value={settings.chatInputPlaceholder}
              onChange={(e) => handleSettingChange('chatInputPlaceholder', e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Chatbot Icon</label>
            <select
              value={settings.chatbotIcon}
              onChange={(e) => handleSettingChange('chatbotIcon', e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="Robot">Robot</option>
              <option value="Assistant">Assistant</option>
              <option value="Message">Message</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Send Message Button</label>
            <select
              value={settings.sendMessageButton}
              onChange={(e) => handleSettingChange('sendMessageButton', e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="Paper Plane">Paper Plane</option>
              <option value="Arrow">Arrow</option>
            </select>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Widget UI</h3>
            
            <div>
              <label className="block text-sm font-medium mb-1">Title Color</label>
              <div className="relative">
                <button
                  className="w-full h-10 rounded-lg border"
                  style={{ backgroundColor: settings.titleColor }}
                  onClick={() => setActiveColorPicker('titleColor')}
                />
                {activeColorPicker === 'titleColor' && (
                  <div className="absolute z-10 mt-2">
                    <HexColorPicker
                      color={settings.titleColor}
                      onChange={(color) => handleSettingChange('titleColor', color)}
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Input Text Color</label>
              <div className="relative">
                <button
                  className="w-full h-10 rounded-lg border"
                  style={{ backgroundColor: settings.inputTextColor }}
                  onClick={() => setActiveColorPicker('inputTextColor')}
                />
                {activeColorPicker === 'inputTextColor' && (
                  <div className="absolute z-10 mt-2">
                    <HexColorPicker
                      color={settings.inputTextColor}
                      onChange={(color) => handleSettingChange('inputTextColor', color)}
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Background Color</label>
              <div className="relative">
                <button
                  className="w-full h-10 rounded-lg border"
                  style={{ backgroundColor: settings.backgroundColor }}
                  onClick={() => setActiveColorPicker('backgroundColor')}
                />
                {activeColorPicker === 'backgroundColor' && (
                  <div className="absolute z-10 mt-2">
                    <HexColorPicker
                      color={settings.backgroundColor}
                      onChange={(color) => handleSettingChange('backgroundColor', color)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Preview</h3>
          <PreviewWidget />
        </div>
      </div>
    </div>
  );
}
