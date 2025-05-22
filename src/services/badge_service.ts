import api from './api';
import { AxiosResponse } from 'axios';
import { Badge, BadgeCreate } from '../types/Badge';

export const badgeService = {
  async getBadgesByUserId(user_id: string): Promise<Badge[]> {
    try {
      const response: AxiosResponse<Badge[]> = await api.get(`/badges/user/${user_id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la récupération des badges');
    }
  },

  async getBadgesByGreenhouseId(user_id: string, greenhouse_id: string): Promise<Badge[]> {
    try {
      const response: AxiosResponse<Badge[]> = await api.get(`/badges/greenhouse/${user_id}`, {
        params: { greenhouse_id },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la récupération des badges');
    }
  },

  async createBadge(badge: BadgeCreate): Promise<Badge> {
    try {
      const response: AxiosResponse<Badge> = await api.post('/badges/', badge);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la création du badge');
    }
  },

  async deleteBadge(id: string): Promise<void> {
    try {
      await api.delete(`/badges/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la suppression du badge');
    }
  },
};