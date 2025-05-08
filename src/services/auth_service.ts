import api from './api';
import { AxiosResponse } from 'axios';
import { LoginResponse, User } from '../types/User';

export interface Credentials {
  username: string;
  password: string;
}

export const authService = {
  async login(credentials: Credentials): Promise<LoginResponse> {
    try {
      const response: AxiosResponse<LoginResponse> = await api.post('/auth/login', credentials, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log("response.data.access_token = ", response.data.access_token);
      localStorage.setItem('access_token', response.data.access_token);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la connexion');
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('access_token');
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la déconnexion');
    }
  },

  async getCurrentUser(): Promise<User> {
    try {
      const response: AxiosResponse<User> = await api.get('/auth/me');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || "Erreur lors de la récupération de l'utilisateur");
    }
  },
};