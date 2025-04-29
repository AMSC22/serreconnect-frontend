import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types/User';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (username: string, email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<User | null> => {
    if (email && password === 'password123') {
      const newUser = {
        id: '1',
        username: email.split('@')[0],
        email,
        isAdmin: email === 'admin@example.com',
      };
      console.log('Login: newUser créé =', newUser);
      setUser(newUser);
      console.log('Login: user mis à jour =', newUser);
      return newUser;
    }
    console.log('Login échoué: email ou mot de passe incorrect', { email, password });
    return null;
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    if (username && email && password) {
      const newUser = { id: '2', username, email, isAdmin: false };
      console.log('Register: newUser =', newUser);
      setUser(newUser);
      return true;
    }
    console.log('Register échoué: données invalides');
    return false;
  };

  const logout = () => {
    console.log('Logout: user = null');
    setUser(null);
  };

  const updateProfile = async (username: string, email: string): Promise<boolean> => {
    if (username && email) {
      setUser((prev) => (prev ? { ...prev, username, email } : null));
      console.log('UpdateProfile: updated user =', { username, email });
      return true;
    }
    console.log('UpdateProfile échoué: données invalides');
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
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