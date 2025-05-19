import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AlertCard from '../components/AlertCard';
import { Alert } from '../types/Alert';
import { alertService } from '../services/alert_service';
import LoadingSpinner from '../components/LoadingSpinner';

const Alerts = () => {
  const { greenhouseId } = useParams<{ greenhouseId: string }>();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      if (!greenhouseId) {
        setError('Aucune serre sélectionnée');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const alertData = await alertService.getAlertsByGreenhouseId(greenhouseId);
        setAlerts(alertData);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Erreur lors de la récupération des alertes');
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [greenhouseId]);

  const handleMarkAsRead = (alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-green-600">Alertes</h1>
      <div className="space-y-4">
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} onMarkAsRead={handleMarkAsRead} />
          ))
        ) : (
          <p className="text-gray-500">Aucune alerte pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default Alerts;