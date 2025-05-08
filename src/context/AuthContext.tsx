import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/auth_service';
import { User, LoginResponse } from '../types/User';
import { userService } from '../services/user_service';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<LoginResponse>;
  register: (username: string, email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  updateProfile: (username: string, email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      authService.getCurrentUser()
        .then((user) => {
          setUser(user);
        })
        .catch((error) => {
          setUser(null);
          throw error;
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await authService.login({ username: email, password });
      setUser(response.user);
      return response;
    } catch (error) {
      throw  new Error('Échec de la connexion');
    }
  };

  const register = async (username: string, email: string, password: string): Promise<User> => {
    try {
      const newUser = await userService.createUser({ username, email, password });
      const loginResponse = await authService.login({ username: email, password });
      setUser(loginResponse.user);
      return newUser;
    } catch (error) {
      throw  new Error("Échec de l'inscription");
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      localStorage.removeItem('access_token');
    } catch (error) {
      throw  new Error('Échec de la déconnexion');
    }
  };

  const updateProfile = async (username: string, email: string): Promise<boolean> => {
    try {
      if (!user) return false;
      const updatedUser = await userService.updateUser(user.id, { username, email });
      setUser(updatedUser);
      return true;
    } catch (error) {
      return false;
    }
  };

  if (loading) {
    return <div>Chargement...</div>; // Afficher un loader pendant la vérification
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
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