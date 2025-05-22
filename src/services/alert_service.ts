import api from './api';
import { AxiosResponse } from 'axios';
import { Alert, AlertCreate, AlertUpdate } from '../types/Alert';

export const alertService = {
  async getAllAlerts(): Promise<Alert[]> {
    // Note : Réservé aux administrateurs (GET /api/v1/alerts)
    try {
      const response: AxiosResponse<Alert[]> = await api.get('/alerts/');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la récupération des alertes');
    }
  },

  async getAlertById(id: string): Promise<Alert> {
    try {
      const response: AxiosResponse<Alert> = await api.get(`/alerts/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la récupération de l’alerte');
    }
  },

  async getAlertsByGreenhouseId(greenhouse_id: string): Promise<Alert[]> {
    try {
      const response: AxiosResponse<Alert[]> = await api.get(`/alerts/greenhouse/${greenhouse_id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la récupération des alertes de la serre');
    }
  },

  async searchAlerts(query: string, skip: number = 0, limit: number = 100): Promise<Alert[]> {
    try {
      const response: AxiosResponse<Alert[]> = await api.get('/alerts/search', {
        params: { query, skip, limit },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la recherche des alertes');
    }
  },

  async countAlerts(): Promise<{ resolved: number; unresolved: number }> {
    try {
      const response: AxiosResponse<{ resolved: number; unresolved: number }> = await api.get('/alerts/count');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors du comptage des alertes');
    }
  },

  async createAlert(alert: AlertCreate): Promise<Alert> {
    try {
      const response: AxiosResponse<Alert> = await api.post('/alerts/', alert);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la création de l’alerte');
    }
  },

  async updateAlert(id: string, alert: AlertUpdate): Promise<Alert> {
    try {
      const response: AxiosResponse<Alert> = await api.put(`/alerts/${id}`, alert);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la mise à jour de l’alerte');
    }
  },

  async resolveAlert(id: string): Promise<Alert> {
    try {
      const response: AxiosResponse<Alert> = await api.put(`/alerts/${id}`, { is_resolved: true });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || "Erreur lors de la résolution de l'alerte");
    }
  },

  async deleteAlert(id: string): Promise<void> {
    try {
      await api.delete(`/alerts/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la suppression de l’alerte');
    }
  },
};