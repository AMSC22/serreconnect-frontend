import api from './api';
import { AxiosResponse } from 'axios';

// Interface pour un utilisateur
interface User {
  id: string;
  email: string;
  is_admin: boolean;
  created_at: string; // ISO date
  updated_at: string; // ISO date
}

// Interface pour créer un utilisateur
interface UserCreate {
  email: string;
  password: string;
  is_admin?: boolean;
}

// Interface pour mettre à jour un utilisateur
interface UserUpdate {
  email?: string;
  password?: string;
  is_admin?: boolean;
}

export const userService = {
  // Récupérer tous les utilisateurs (admin uniquement)
  async getAllUsers(): Promise<User[]> {
    try {
      const response: AxiosResponse<User[]> = await api.get('/users');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la récupération des utilisateurs');
    }
  },

  // Récupérer un utilisateur par ID
  async getUserById(id: string): Promise<User> {
    try {
      const response: AxiosResponse<User> = await api.get(`/users/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la récupération de l’utilisateur');
    }
  },

  // Créer un nouvel utilisateur (admin uniquement)
  async createUser(user: UserCreate): Promise<User> {
    try {
      const response: AxiosResponse<User> = await api.post('/users', user);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la création de l’utilisateur');
    }
  },

  // Mettre à jour un utilisateur
  async updateUser(id: string, user: UserUpdate): Promise<User> {
    try {
      const response: AxiosResponse<User> = await api.put(`/users/${id}`, user);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la mise à jour de l’utilisateur');
    }
  },

  // Supprimer un utilisateur (admin uniquement)
  async deleteUser(id: string): Promise<void> {
    try {
      await api.delete(`/users/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la suppression de l’utilisateur');
    }
  },
};