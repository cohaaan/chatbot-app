import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Layout/Sidebar';
import Overview from './pages/Overview';
import Chats from './pages/Chats';
import Integrations from './pages/Integrations';
import Playground from './pages/Playground';
import ChatbotManager from './pages/ChatbotManager';

function App() {
  const [currentPage, setCurrentPage] = useState('overview');

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return <Overview />;
      case 'chats':
        return <Chats />;
      case 'integrations':
        return <Integrations />;
      case 'playground':
        return <Playground />;
      case 'chatbots':
        return <ChatbotManager />;
      default:
        return <Overview />;
    }
  };

  return (
    <AuthProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar onNavigate={setCurrentPage} activePage={currentPage} />
        <main className="ml-16 flex-1 p-8">
          {renderPage()}
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;