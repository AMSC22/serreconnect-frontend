import api from './api';
import { AxiosResponse } from 'axios';

// Interface pour la réponse de connexion
interface LoginResponse {
  access_token: string;
  token_type: string;
}

// Interface pour les données de connexion
interface LoginCredentials {
  username: string; // email
  password: string;
}

// Interface pour la réponse de déconnexion
interface LogoutResponse {
  message: string;
}

export const authService = {
  // Connexion
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response: AxiosResponse<LoginResponse> = await api.post('/auth/login', new URLSearchParams({
        username: credentials.username,
        password: credentials.password,
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      // Stocker le token dans localStorage (utilisé par AuthContext)
      localStorage.setItem('access_token', response.data.access_token);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la connexion');
    }
  },

  // Déconnexion
  async logout(): Promise<LogoutResponse> {
    try {
      const response: AxiosResponse<LogoutResponse> = await api.post('/auth/logout');
      // Supprimer le token de localStorage
      localStorage.removeItem('access_token');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la déconnexion');
    }
  },
};