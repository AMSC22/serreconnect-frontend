import api from './api';
import { AxiosResponse } from 'axios';
import { Settings, SettingsCreate, SettingsUpdate } from '../types/Settings';

export const settingsService = {
  async getAllSettings(): Promise<Settings[]> {
    try {
      const response: AxiosResponse<Settings[]> = await api.get('/settings/');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la récupération des paramètres');
    }
  },

  // Récupérer les paramètres par ID
  async getSettingsById(id: string): Promise<Settings> {
    try {
      const response: AxiosResponse<Settings> = await api.get(`/settings/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la récupération des paramètres');
    }
  },

  // Récupérer les paramètres par défaut
  async getDefaultSettings(): Promise<Settings> {
    try {
      const response: AxiosResponse<Settings> = await api.get('/settings/default/');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la récupération des paramètres par défaut');
    }
  },

  async getSettingsByUserId(user_id: string, greenhouse_id?: string): Promise<Settings> {
    try {
      const response: AxiosResponse<Settings> = await api.get(`/settings/user/${user_id}`, {
        params: { greenhouse_id },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la récupération des paramètres de l’utilisateur');
    }
  },

  async getSettingsByGreenhouseId(user_id: string, greenhouse_id: string): Promise<Settings> {
    try {
      const response: AxiosResponse<Settings> = await api.get(`/settings/greenhouse/${user_id}`, {
        params: { greenhouse_id },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || "Erreur lors de la récupération des paramètres d'une serre");
    }
  },

  async searchSettings(user_id: string, skip: number = 0, limit: number = 100): Promise<Settings[]> {
    try {
      const response: AxiosResponse<Settings[]> = await api.get('/settings/search', {
        params: { user_id, skip, limit },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la recherche des paramètres');
    }
  },

  async countSettings(): Promise<{ notify_by_email: number; no_notify: number }> {
    try {
      const response: AxiosResponse<{ notify_by_email: number; no_notify: number }> = await api.get('/settings/count');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors du comptage des paramètres');
    }
  },

  // Créer des paramètres personnalisés
  async createSettings(settings: Partial<SettingsCreate>): Promise<SettingsCreate> {
    try {
      const response: AxiosResponse<Settings> = await api.post('/settings/', settings);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la création des paramètres');
    }
  },

  async updateSettingsAdmin(id: string, settings: SettingsUpdate): Promise<Settings> {
    try {
      const response: AxiosResponse<Settings> = await api.put(`/settings/admin/${id}`, settings);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la mise à jour des paramètres');
    }
  },

  async updateSettingsUser(id: string, settings: SettingsUpdate): Promise<Settings> {
    try {
      const response: AxiosResponse<Settings> = await api.put(`/settings/user/${id}`, settings);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la mise à jour des paramètres');
    }
  },

  // Mettre à jour les paramètres par défaut (admin uniquement)
  async updateDefaultSettings(settings: Partial<Settings>): Promise<Settings> {
    try {
      const response: AxiosResponse<Settings> = await api.put('/settings/default', settings);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la mise à jour des paramètres');
    }
  },

  async deleteSettings(id: string): Promise<void> {
    try {
      await api.delete(`/settings/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la suppression des paramètres');
    }
  },
};