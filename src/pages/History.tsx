import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Chart from '../components/Chart';
import { HistoricalData } from '../types/History';
import { historyService } from '../services/history_service';
import { settingsService } from '../services/settings_service';
import LoadingSpinner from '../components/LoadingSpinner';
import { Settings } from '../types/Settings';
import { useAuth } from '../context/AuthContext';

const History = () => {
  const { user } = useAuth();
  const { greenhouseId } = useParams<{ greenhouseId: string }>();
  const [history, setHistory] = useState<HistoricalData[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!greenhouseId) {
        setError('Aucune serre sélectionnée');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const historyData = await historyService.getHistoryByGreenhouseId(greenhouseId);
        setHistory(historyData);
        const settingsData = await settingsService.getSettingsByGreenhouseId(user?.id || "", greenhouseId);
        setSettings(settingsData);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Erreur lors de la récupération de l'historique");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [greenhouseId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-green-600">Historique</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Chart
          data={history}
          sensor="temperature"
          label="Température"
          unit="°C"
          color="#ff0000"
        />
        <Chart
          data={history}
          sensor="humidity"
          label="Humidité (Air)"
          unit="%"
          color="#0000ff"
        />
        <Chart
          data={history}
          sensor="soil_moisture"
          label="Humidité (Sol)"
          unit="%"
          color="#8b4513"
        />
        <Chart
          data={history}
          sensor="light_level"
          label="Luminosité"
          unit="lux"
          color="#ffff00"
        />
        <Chart
          data={history}
          sensor="ph_level"
          label="pH"
          unit=""
          color="#008000"
        />
        <Chart
          data={history}
          sensor="co2_level"
          label="CO2"
          unit="ppm"
          color="#808080"
        />
      </div>
    </div>
  );
};

export default History;