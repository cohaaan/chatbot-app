import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AuthContextType, User } from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock authentication functions
  const signIn = async (email: string, password: string) => {
    // In production, this would use Firebase Auth
    setUser({
      id: '1',
      email,
      displayName: email.split('@')[0],
    });
  };

  const signOut = async () => {
    setUser(null);
  };

  useEffect(() => {
    // Check for existing session
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};