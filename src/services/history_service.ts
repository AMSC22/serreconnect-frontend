import api from './api';
import { AxiosResponse } from 'axios';
import { HistoricalData, HistoryCreate } from '../types/History';

export const historyService = {
  async getAllHistory(): Promise<HistoricalData[]> {
    // Note : Réservé aux administrateurs (GET /api/v1/history)
    try {
      const response: AxiosResponse<HistoricalData[]> = await api.get('/history/');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la récupération des historiques');
    }
  },

  async getHistoryById(id: string): Promise<HistoricalData> {
    try {
      const response: AxiosResponse<HistoricalData> = await api.get(`/history/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la récupération de l’historique');
    }
  },

  async getHistoryByGreenhouseId(greenhouse_id: string, skip: number = 0, limit: number = 100): Promise<HistoricalData[]> {
    try {
      const response: AxiosResponse<HistoricalData[]> = await api.get(`/history/greenhouse/${greenhouse_id}`, {
        params: { skip, limit },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la récupération de l’historique de la serre');
    }
  },

  async searchHistory(
    greenhouse_id: string,
    start_date?: string,
    end_date?: string,
    temperature_min?: number,
    temperature_max?: number,
    skip: number = 0,
    limit: number = 100
  ): Promise<HistoricalData[]> {
    try {
      const response: AxiosResponse<HistoricalData[]> = await api.get('/history/search', {
        params: { greenhouse_id, start_date, end_date, temperature_min, temperature_max, skip, limit },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la recherche des historiques');
    }
  },

  async countHistory(greenhouse_id: string): Promise<number> {
    try {
      const response: AxiosResponse<number> = await api.get(`/history/count/${greenhouse_id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors du comptage des historiques');
    }
  },

  async createHistory(history: HistoryCreate): Promise<HistoricalData> {
    try {
      const response: AxiosResponse<HistoricalData> = await api.post('/history/', history);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la création de l’historique');
    }
  },

  async deleteHistory(id: string): Promise<void> {
    try {
      await api.delete(`/history/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la suppression de l’historique');
    }
  },
};