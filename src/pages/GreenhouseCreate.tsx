import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { greenhouseService } from '../services/greenhouse_service';
import { settingsService } from '../services/settings_service';
import { Settings } from '../types/Settings';
import LoadingSpinner from '../components/LoadingSpinner';
import { Greenhouse } from '../types/Greenhouse';

const GreenhouseCreate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
  });
  const [settings, setSettings] = useState<Partial<Settings>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Récupérer les paramètres par défaut et les définir comme valeurs initiales
  useEffect(() => {
    const fetchDefaultSettings = async () => {
      try {
        const defaultSettings = await settingsService.getDefaultSettings();
        setSettings({
          temperature_min: defaultSettings.temperature_min,
          temperature_max: defaultSettings.temperature_max,
          humidity_min: defaultSettings.humidity_min,
          humidity_max: defaultSettings.humidity_max,
          soil_moisture_min: defaultSettings.soil_moisture_min,
          soil_moisture_max: defaultSettings.soil_moisture_max,
          light_level_min: defaultSettings.light_level_min,
          light_level_max: defaultSettings.light_level_max,
          ph_level_min: defaultSettings.ph_level_min,
          ph_level_max: defaultSettings.ph_level_max,
          co2_level_max: defaultSettings.co2_level_max,
          notify_by_email: defaultSettings.notify_by_email,
          measurement_frequency: defaultSettings.measurement_frequency,
        });
        setError(null);
      } catch (err: any) {
        console.error('GreenhouseCreate: erreur lors de la récupération des paramètres par défaut', err);
        setError(err.message || 'Erreur lors de la récupération des paramètres par défaut');
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultSettings();
  }, []);

  // Gérer les changements dans les paramètres
  const handleSettingsChange = (field: keyof Settings, value: number | boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  // Valider les paramètres personnalisés
  const validateSettings = (settings: Partial<Settings>): string | null => {
    const checks = [
      { min: settings.temperature_min, max: settings.temperature_max, label: 'Température' },
      { min: settings.humidity_min, max: settings.humidity_max, label: 'Humidité (Air)' },
      { min: settings.soil_moisture_min, max: settings.soil_moisture_max, label: 'Humidité (Sol)' },
      { min: settings.light_level_min, max: settings.light_level_max, label: 'Luminosité' },
      { min: settings.ph_level_min, max: settings.ph_level_max, label: 'pH' },
    ];

    for (const { min, max, label } of checks) {
      if (min !== undefined && max !== undefined && min > max) {
        return `La valeur minimale de ${label} ne peut pas dépasser la valeur maximale.`;
      }
    }

    // Vérifier que CO2 max est positif
    if (settings.co2_level_max !== undefined && settings.co2_level_max <= 0) {
      return 'La valeur maximale de CO2 doit être positive.';
    }

    return null;
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!user) {
      setError('Utilisateur non connecté.');
      setLoading(false);
      return;
    }

    try {
      // Valider les paramètres
      const validationError = validateSettings(settings);
      if (validationError) {
        setError(validationError);
        setLoading(false);
        return;
      }

      // Créer la serre
      const greenhouseData: Partial<Greenhouse> = {
        ...formData,
        user_id: user.id,
      };
      const newGreenhouse = await greenhouseService.createGreenhouse(greenhouseData);

      // Créer les paramètres pour la serre (par défaut ou modifiés)
      const newSettings: Partial<Settings> = {
        ...settings,
        greenhouse_id: newGreenhouse.id,
        user_id: user.id,
      };
      await settingsService.createSettings(newSettings);

      navigate(`/greenhouse/${newGreenhouse.id}`);
    } catch (err: any) {
      console.error('GreenhouseCreate: erreur lors de la création de la serre', err);
      setError(err.message || 'Erreur lors de la création de la serre.');
    } finally {
      setLoading(false);
    }
  };


  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Créer une nouvelle serre</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nom de la serre
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="mt-1 w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            id="description"
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Localisation
          </label>
          <input
            id="location"
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="mt-1 w-full p-2 border rounded-md"
          />
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mt-6">Seuils des capteurs</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Température (°C)', min: 'temperature_min', max: 'temperature_max' },
            { label: 'Humidité (Air) (%)', min: 'humidity_min', max: 'humidity_max' },
            { label: 'Humidité (Sol) (%)', min: 'soil_moisture_min', max: 'soil_moisture_max' },
            { label: 'Luminosité (lux)', min: 'light_level_min', max: 'light_level_max' },
            { label: 'pH', min: 'ph_level_min', max: 'ph_level_max' },
          ].map((sensor) => (
            <React.Fragment key={sensor.min}>
              <div>
                <label className="block text-sm font-medium text-gray-700">{sensor.label} min</label>
                <input
                  type="number"
                  value={settings[sensor.min as keyof Settings] ?? ''}
                  onChange={(e) => handleSettingsChange(sensor.min as keyof Settings, Number(e.target.value))}
                  className="mt-1 w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{sensor.label} max</label>
                <input
                  type="number"
                  value={settings[sensor.max as keyof Settings] ?? ''}
                  onChange={(e) => handleSettingsChange(sensor.max as keyof Settings, Number(e.target.value))}
                  className="mt-1 w-full p-2 border rounded-md"
                />
              </div>
            </React.Fragment>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700">CO2 max (ppm)</label>
            <input
              type="number"
              value={settings.co2_level_max ?? ''}
              onChange={(e) => handleSettingsChange('co2_level_max', Number(e.target.value))}
              className="mt-1 w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Fréquence des mesures (secondes)</label>
            <input
              type="number"
              value={settings.measurement_frequency ?? ''}
              onChange={(e) => handleSettingsChange('measurement_frequency', Number(e.target.value))}
              className="mt-1 w-full p-2 border rounded-md"
            />
          </div>
          <div className="flex items-center">
            <label className="block text-sm font-medium text-gray-700">
              Notifications par email
            </label>
            <input
              type="checkbox"
              checked={settings.notify_by_email ?? false}
              onChange={(e) => handleSettingsChange('notify_by_email', e.target.checked)}
              className="mt-1 ml-2"
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Créer
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default GreenhouseCreate;