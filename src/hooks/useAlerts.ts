import { useState, useEffect } from 'react';
import { alertService } from '../services/alert_service';
import { Alert } from '../types/Alert';
import { useAuth } from '../context/AuthContext';
import { greenhouseService } from '../services/greenhouse_service';

interface UseAlertsResult {
  alerts: Alert[];
  markAsRead: (id: string) => void;
  loading: boolean;
  error: string | null;
}

export const useAlerts = (): UseAlertsResult => {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      if (!user) return;
      try {
        setLoading(true);
        let data: Alert[] = [];
        if (user.is_admin) {
          // Admins peuvent voir toutes les alertes
          data = await alertService.getAllAlerts();
        } else {
          // Utilisateurs standards : récupérer la serre de l'utilisateur
          const greenhouses = await greenhouseService.getGreenhousesByUserId(user.id);
          if (greenhouses.length > 0) {
            data = await alertService.getAlertsByGreenhouseId(greenhouses[0].id);
          }
        }
        setAlerts(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Erreur lors de la récupération des alertes');
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [user]);

  const markAsRead = async (id: string) => {
    try {
      await alertService.resolveAlert(id);
      setAlerts((prev) =>
        prev.map((alert) =>
          alert.id === id ? { ...alert, is_resolved: true } : alert
        )
      );
    } catch (err: any) {
      setError(err.message || "Erreur lors de la mise à jour de l'alerte");
    }
  };

  return { alerts, markAsRead, loading, error };
};