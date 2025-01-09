import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Sidebar from './components/Layout/Sidebar';
import Overview from './pages/Overview';
import Chats from './pages/Chats';
import Integrations from './pages/Integrations';
import Playground from './pages/Playground';
import ChatbotManager from './pages/ChatbotManager';
import Login from './components/Login';
import Widget from './pages/Widget';
import { useAuth } from './contexts/AuthContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function AppLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/widget/:botId" element={<Widget />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Overview />} />
            <Route path="chats" element={<Chats />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="playground" element={<Playground />} />
            <Route path="chatbot-manager" element={<ChatbotManager />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;