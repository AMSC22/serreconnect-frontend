import api from './api';
import { AxiosResponse } from 'axios';
import { Actuator, ActuatorState } from '../types/Actuator';

export const actuatorService = {
  async getActuatorsByGreenhouseId(greenhouse_id: string): Promise<Actuator[]> {
    try {
      const response: AxiosResponse<Actuator[]> = await api.get(`/actuators/greenhouse/${greenhouse_id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la récupération des actionneurs');
    }
  },

  async updateActuator(id: string, value: number): Promise<Actuator> {
    try {
      const response: AxiosResponse<Actuator> = await api.put(`/actuators/${id}`, { value });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Erreur lors de la mise à jour de l’actionneur');
    }
  },

  async createActuator(greenhouseId: string, type: keyof ActuatorState, value: number): Promise<Actuator> {
    try {
      const response: AxiosResponse<Actuator> = await api.post('/actuators/', { greenhouse_id: greenhouseId, type, value });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || "Erreur lors de la création de l'actionneur");
    }
  },
  async deleteActuator(id: string): Promise<void> {
    try {
      await api.delete(`/actuators/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || "Erreur lors de la suppression de l'actionneur");
    }
  },
};