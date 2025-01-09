import React, { useState } from 'react';
import TextInput from './TextInput';
import FileUpload from './FileUpload';
import WebsiteInput from './WebsiteInput';
import QAInput from './QAInput';

export default function KnowledgeBase() {
  const [activeTab, setActiveTab] = useState('text');

  const tabs = [
    { id: 'text', label: 'Text' },
    { id: 'files', label: 'Files' },
    { id: 'website', label: 'Website' },
    { id: 'qa', label: 'Q/A' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'text':
        return <TextInput />;
      case 'files':
        return <FileUpload />;
      case 'website':
        return <WebsiteInput />;
      case 'qa':
        return <QAInput />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-4">
        {renderContent()}
      </div>
    </div>
  );
}
