import React, { useState, useEffect } from 'react';
import { User } from '../types/User';
import { Greenhouse } from '../types/Greenhouse';
import { Settings } from '../types/Settings';
import { userService } from '../services/user_service';
import { greenhouseService } from '../services/greenhouse_service';
import { settingsService } from '../services/settings_service';
import LoadingSpinner from '../components/LoadingSpinner';
import ThresholdForm from '../components/ThresholdForm';
import { Thresholds } from '../types/Thresholds';

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [greenhouses, setGreenhouses] = useState<Greenhouse[]>([]);
  const [defaultSettings, setDefaultSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userData = await userService.getAllUsers();
        const greenhouseData = await greenhouseService.getAllGreenhouses();
        const settingsData = await settingsService.getSettingsById('default'); // Supposons un ID 'default'
        setUsers(userData.filter((u) => !u.is_admin));
        setGreenhouses(greenhouseData);
        setDefaultSettings(settingsData);
        setError(null);
      } catch (err: any) {
        console.error('AdminDashboard: erreur lors de la récupération des données', err);
        setError(err.message || 'Erreur lors de la récupération des données');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateDefaultThresholds = async (newThresholds: Partial<Thresholds>) => {
    try {
      const updatedSettings: Partial<Settings> = {};
      if (newThresholds.temperature) {
        updatedSettings.temperature_min = newThresholds.temperature.min;
        updatedSettings.temperature_max = newThresholds.temperature.max;
      }
      if (newThresholds.humidity) {
        updatedSettings.humidity_min = newThresholds.humidity.min;
        updatedSettings.humidity_max = newThresholds.humidity.max;
      }
      if (newThresholds.soil_moisture) {
        updatedSettings.soil_moisture_min = newThresholds.soil_moisture.min;
        updatedSettings.soil_moisture_max = newThresholds.soil_moisture.max;
      }
      if (newThresholds.light_level) {
        updatedSettings.light_level_min = newThresholds.light_level.min;
        updatedSettings.light_level_max = newThresholds.light_level.max;
      }
      if (newThresholds.ph_level) {
        updatedSettings.ph_level_min = newThresholds.ph_level.min;
        updatedSettings.ph_level_max = newThresholds.ph_level.max;
      }
      await settingsService.updateDefaultSettings('default', updatedSettings);
      const updatedDefaultSettings = await settingsService.getSettingsById('default');
      setDefaultSettings(updatedDefaultSettings);
    } catch (err: any) {
      console.error('AdminDashboard: erreur lors de la mise à jour des seuils', err);
      setError(err.message || 'Erreur lors de la mise à jour des seuils');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  const thresholds: Thresholds = defaultSettings
    ? {
        temperature: { min: defaultSettings.temperature_min || 0, max: defaultSettings.temperature_max || 0 },
        humidity: { min: defaultSettings.humidity_min || 0, max: defaultSettings.humidity_max || 0 },
        soil_moisture: { min: defaultSettings.soil_moisture_min || 0, max: defaultSettings.soil_moisture_max || 0 },
        light_level: { min: defaultSettings.light_level_min || 0, max: defaultSettings.light_level_max || 0 },
        ph_level: { min: defaultSettings.ph_level_min || 0, max: defaultSettings.ph_level_max || 0 },
      }
    : {
        temperature: { min: 0, max: 0 },
        humidity: { min: 0, max: 0 },
        soil_moisture: { min: 0, max: 0 },
        light_level: { min: 0, max: 0 },
        ph_level: { min: 0, max: 0 },
      };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-green-600">Tableau de bord administrateur</h1>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Utilisateurs ({users.length})</h2>
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user.id} className="p-4 bg-gray-100 rounded-md">
              <p className="text-gray-700">{user.username} ({user.email})</p>
              <p className="text-sm text-gray-500">
                Inscrit le {new Date(user.created_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Serres ({greenhouses.length})</h2>
        <ul className="space-y-4">
          {users.map((user) => {
            const userGreenhouses = greenhouses.filter((g) => g.user_id === user.id);
            return (
              <li key={user.id} className="p-4 bg-gray-100 rounded-md">
                <h3 className="text-lg font-medium">{user.username} ({userGreenhouses.length} serres)</h3>
                <ul className="mt-2 space-y-2">
                  {userGreenhouses.map((greenhouse) => (
                    <li key={greenhouse.id} className="p-2 bg-gray-50 rounded-md">
                      <p className="text-gray-700">{greenhouse.name}</p>
                      <p className="text-sm text-gray-500">{greenhouse.location || 'Sans localisation'}</p>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Paramètres par défaut des capteurs</h2>
        <ThresholdForm thresholds={thresholds} onUpdate={handleUpdateDefaultThresholds} />
      </section>
    </div>
  );
};

export default AdminDashboard;