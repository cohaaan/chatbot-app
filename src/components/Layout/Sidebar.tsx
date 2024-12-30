import React from 'react';
import { Zap, MessageSquare, Link, FileText, Bot, Settings, Edit } from 'lucide-react';

const navItems = [
  { id: 'overview', icon: <Zap size={20} />, label: 'Overview' },
  { id: 'chats', icon: <MessageSquare size={20} />, label: 'Chats' },
  { id: 'integrations', icon: <Link size={20} />, label: 'Integrations' },
  { id: 'knowledge', icon: <FileText size={20} />, label: 'Knowledge Base' },
  { id: 'bots', icon: <Bot size={20} />, label: 'Bots' },
  { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
  { id: 'playground', icon: <Edit size={20} />, label: 'Playground' },
];

interface SidebarProps {
  onNavigate: (page: string) => void;
  activePage: string;
}

export default function Sidebar({ onNavigate, activePage }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 flex h-full w-16 flex-col bg-[#1A1D21] py-4">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex w-full flex-col items-center gap-1 p-3 text-xs ${
            activePage === item.id ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          {item.icon}
        </button>
      ))}
    </aside>
  );
}