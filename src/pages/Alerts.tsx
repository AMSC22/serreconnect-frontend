import React from 'react';
import { useAlerts } from '../hooks/useAlerts';
import AlertCard from '../components/AlertCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Alerts = () => {
  const { alerts, markAsRead, loading } = useAlerts();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-600">Alertes</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Historique des alertes</h2>
        {loading ? (
          <LoadingSpinner />
        ) : alerts.length > 0 ? (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onMarkAsRead={markAsRead}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Aucune alerte pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default Alerts;