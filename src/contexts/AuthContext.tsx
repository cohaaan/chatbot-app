import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '../types/User';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  logout: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Create a mock user
  const mockUser = {
    uid: 'mock-user-id',
    email: 'test@example.com',
    displayName: 'Test User'
  };

  const [user, setUser] = useState(mockUser);
  const [loading, setLoading] = useState(false);

  async function signInWithGoogle() {
    // Do nothing for now
    console.log('Mock sign in');
  }

  function logout() {
    // Do nothing for now
    console.log('Mock logout');
    return Promise.resolve();
  }

  const value = {
    user,
    loading,
    signInWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
