import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Zap, MessageSquare, Link, Bot, Settings, Edit } from 'lucide-react';

const navItems = [
  { id: '/', icon: <Zap size={20} />, label: 'Overview' },
  { id: '/chats', icon: <MessageSquare size={20} />, label: 'Chats' },
  { id: '/integrations', icon: <Link size={20} />, label: 'Integrations' },
  { id: '/chatbot-manager', icon: <Bot size={20} />, label: 'Chatbots' },
  { id: '/playground', icon: <Edit size={20} />, label: 'Playground' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="flex h-screen w-64 flex-col bg-[#1A1D21] p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">Virtual Assistant</h1>
      </div>
      
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className={`flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-colors ${
              location.pathname === item.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="border-t border-gray-700 pt-4">
        <button
          onClick={() => navigate('/settings')}
          className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          <Settings size={20} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}