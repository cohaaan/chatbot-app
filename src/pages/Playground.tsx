import React from 'react';
import { Bot } from 'lucide-react';

export default function Playground() {
  return (
    <div className="h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Virtual Assistant Dashboard</h1>
        <p className="mt-2 text-gray-600">Powerful automation with intelligence, simplified interface so you can navigate and control your AI agent with ease</p>
      </div>
      
      <nav className="mb-8 flex gap-4 border-b border-gray-200">
        {['AI Agent', 'Settings', 'Knowledge Base', 'Leads', 'Scheduling', 'Conversations', 'Appearance', 'Integrations', 'Labs'].map((tab) => (
          <button key={tab} className="border-b-2 border-transparent px-4 py-2 text-gray-600 hover:border-blue-500 hover:text-blue-500">
            {tab}
          </button>
        ))}
      </nav>

      <div className="rounded-lg bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Virtual Assistant</h2>
            <p className="text-sm text-green-500">Available</p>
          </div>
          <button className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
            Get Embeddable Code
          </button>
        </div>
      </div>
    </div>
  );
}