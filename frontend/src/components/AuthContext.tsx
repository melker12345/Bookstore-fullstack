import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types/types';

interface AuthContextType {
  authState: { user: User | null; isAdmin: boolean };
  login: (email: string, password: string) => Promise<User>;
  signup: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<{
    user: User | null;
    isAdmin: boolean;
  }>({ user: null, isAdmin: false });

  const login = async (email: string, password: string): Promise<User> => {
    const response = await fetch(
      'https://bookstore-fullstack-server.onrender.com/api/users/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      setAuthState({ user: data, isAdmin: data.isAdmin });
      if (data.isAdmin) {
        window.location.href = '/admin';
      }
      return data;
    } else {
      throw new Error(data.message || 'Login failed');
    }
  };

  const signup = async (
    email: string,
    password: string,
    name: string
  ): Promise<void> => {
    const response = await fetch(
      'https://bookstore-fullstack-server.onrender.com/api/users/signup',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      setAuthState({ user: data, isAdmin: data.isAdmin });
    } else {
      throw new Error(data.message || 'Signup failed');
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
