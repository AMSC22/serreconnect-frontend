import { useState } from 'react';
import { Alert } from '../types/Alert';

interface UseAlertsResult {
  alerts: Alert[];
  markAsRead: (id: string) => void;
  loading: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    message: 'Température trop élevée (> 35°C)',
    timestamp: '2025-04-24T14:30:00',
    read: false,
  },
  {
    id: '2',
    message: 'Humidité du sol faible (< 20%)',
    timestamp: '2025-04-24T12:15:00',
    read: true,
  },
  {
    id: '3',
    message: 'Luminosité insuffisante (< 500 lux)',
    timestamp: '2025-04-24T10:00:00',
    read: false,
  },
  {
    id: '4',
    message: 'Serrure déverrouillée',
    timestamp: '2025-04-23T18:45:00',
    read: true,
  },
];

export const useAlerts = (): UseAlertsResult => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [loading, setLoading] = useState<boolean>(false); // Simule un chargement

  const markAsRead = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, read: true } : alert
      )
    );
  };

  return { alerts, markAsRead, loading };
};