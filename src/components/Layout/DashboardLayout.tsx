import React from 'react';
import { Menu, Settings, MessageSquare, Calendar, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">ChatBot Hub</h1>
        </div>
        <nav className="mt-6">
          <NavItem icon={<MessageSquare size={20} />} href="/dashboard" label="My Chatbots" />
          <NavItem icon={<Calendar size={20} />} href="/integrations" label="Integrations" />
          <NavItem icon={<Settings size={20} />} href="/settings" label="Settings" />
        </nav>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-8">
        {/* Top bar */}
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="rounded-full p-2 hover:bg-gray-100">
              <Menu size={24} />
            </button>
            <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium text-gray-800">{user?.displayName}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}

function NavItem({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}