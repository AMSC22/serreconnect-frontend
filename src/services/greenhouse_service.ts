import api from './api';
import { AxiosResponse } from 'axios';
import { Greenhouse, GreenhouseCreate, GreenhouseUpdate } from '../types/Greenhouse';

export const greenhouseService = {
  async getAllGreenhouses(): Promise<Greenhouse[]> {
    // Note : Réservé aux administrateurs (GET /api/v1/greenhouses)
    try {
      const response: AxiosResponse<Greenhouse[]> = await api.get('/greenhouses/');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la récupération des serres');
    }
  },

  async getGreenhouseById(id: string): Promise<Greenhouse> {
    try {
      const response: AxiosResponse<Greenhouse> = await api.get(`/greenhouses/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la récupération de la serre');
    }
  },

  async getGreenhousesByUserId(user_id: string): Promise<Greenhouse[]> {
    try {
      const response: AxiosResponse<Greenhouse[]> = await api.get(`/greenhouses/user/${user_id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la récupération des serres de l’utilisateur');
    }
  },

  async searchGreenhouses(name: string, skip: number = 0, limit: number = 100): Promise<Greenhouse[]> {
    try {
      const response: AxiosResponse<Greenhouse[]> = await api.get('/greenhouses/search', {
        params: { name, skip, limit },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la recherche des serres');
    }
  },

  async createGreenhouse(greenhouse: Partial<GreenhouseCreate>): Promise<Greenhouse> {
    try {
      const response: AxiosResponse<Greenhouse> = await api.post('/greenhouses/', greenhouse);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la création de la serre');
    }
  },

  async updateGreenhouse(id: string, greenhouse: GreenhouseUpdate): Promise<Greenhouse> {
    try {
      const response: AxiosResponse<Greenhouse> = await api.put(`/greenhouses/${id}`, greenhouse);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la mise à jour de la serre');
    }
  },

  async deleteGreenhouse(id: string): Promise<void> {
    try {
      await api.delete(`/greenhouses/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la suppression de la serre');
    }
  },
};