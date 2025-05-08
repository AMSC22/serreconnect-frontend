import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { settingsService } from '../services/settings_service';
import { Settings } from '../types/Settings';

const AdminSettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Vérifier si l'utilisateur est admin
  if (!user?.is_admin) {
    return <div className="container mx-auto p-4">Accès refusé : réservé aux administrateurs.</div>;
  }

  // Récupérer les paramètres par défaut
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const defaultSettings = await settingsService.getDefaultSettings();
        setSettings(defaultSettings);
      } catch (err: any) {
        setError('Erreur lors de la récupération des paramètres par défaut.');
      }
    };
    fetchSettings();
  }, []);

  // Gérer les changements
  const handleChange = (field: keyof Settings, value: number | boolean) => {
    setSettings((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  // Enregistrer les modifications
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (settings) {
        await settingsService.updateDefaultSettings(settings);
        setError('Paramètres par défaut mis à jour avec succès.');
      }
    } catch (err: any) {
      setError('Erreur lors de la mise à jour des paramètres par défaut.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Gestion des paramètres par défaut</h2>
      {error && <p className={error.includes('succès') ? 'text-green-500' : 'text-red-500'}>{error}</p>}
      {loading && <p className="text-gray-500">Chargement...</p>}
      {settings && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
          <div>
              <label className="block text-sm font-medium text-gray-700">
                Température min (°C)
              </label>
              <input
                type="number"
                placeholder='M'
                value={settings.temperature_min || ''}
                onChange={(e) => handleChange('temperature_min', Number(e.target.value))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Température max (°C)
              </label>
              <input
                type="number"
                placeholder='M'
                value={settings.temperature_max || ''}
                onChange={(e) => handleChange('temperature_max', Number(e.target.value))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Humidité (Air) (%)
              </label>
              <input
                type="number"
                placeholder='M'
                value={settings.humidity_min || ''}
                onChange={(e) => handleChange('humidity_min', Number(e.target.value))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Humidité (Air) (%)
              </label>
              <input
                type="number"
                placeholder='M'
                value={settings.humidity_max || ''}
                onChange={(e) => handleChange('humidity_max', Number(e.target.value))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Humidité (Sol) (%)
              </label>
              <input
                type="number"
                placeholder='M'
                value={settings.soil_moisture_min || ''}
                onChange={(e) => handleChange('soil_moisture_min', Number(e.target.value))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Humidité (Sol) (%)
              </label>
              <input
                type="number"
                placeholder='M'
                value={settings.soil_moisture_max || ''}
                onChange={(e) => handleChange('soil_moisture_max', Number(e.target.value))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Luminosité (lux)
              </label>
              <input
                type="number"
                placeholder='M'
                value={settings.light_level_min || ''}
                onChange={(e) => handleChange('light_level_min', Number(e.target.value))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Luminosité (lux)
              </label>
              <input
                type="number"
                placeholder='M'
                value={settings.light_level_max || ''}
                onChange={(e) => handleChange('light_level_max', Number(e.target.value))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                pH
              </label>
              <input
                type="number"
                placeholder='M'
                value={settings.ph_level_min || ''}
                onChange={(e) => handleChange('ph_level_min', Number(e.target.value))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                pH
              </label>
              <input
                type="number"
                placeholder='M'
                value={settings.ph_level_max || ''}
                onChange={(e) => handleChange('ph_level_max', Number(e.target.value))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                CO2 (ppm)
              </label>
              <input
                type="number"
                placeholder='M'
                value={settings.ph_level_min || ''}
                onChange={(e) => handleChange('ph_level_min', Number(e.target.value))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                CO2 (ppm)
              </label>
              <input
                type="number"
                placeholder='M'
                value={settings.co2_level_max || ''}
                onChange={(e) => handleChange('co2_level_max', Number(e.target.value))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            {/* Ajouter d'autres champs : humidity_min, humidity_max, etc. */}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400"
          >
            Enregistrer
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminSettings;