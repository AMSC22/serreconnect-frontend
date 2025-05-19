import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { greenhouseService } from '../services/greenhouse_service';
import { settingsService } from '../services/settings_service';
import { actuatorService } from '../services/actuator_service';
import { Settings } from '../types/Settings';
import { Greenhouse } from '../types/Greenhouse';
import { ActuatorState } from '../types/Actuator';
import LoadingSpinner from '../components/LoadingSpinner';

const GreenhouseCreate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
  });
  const [actuators, setActuators] = useState<ActuatorState>({
    fan1: false,
    fan2: false,
    irrigation: false,
    window: false,
    lock: false,
    lighting: false,
    heating: 22,
    camera: false,
    ventilation: 60,
    cameraAngle: 0,
    cameraZoom: 1,
  });
  const [settings, setSettings] = useState<Partial<Settings>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Récupérer les paramètres par défaut
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

  // Gérer les changements dans les actionneurs
  const handleActuatorChange = (field: keyof ActuatorState, value: number | boolean) => {
    setActuators((prev) => ({ ...prev, [field]: value }));
  };

  // Valider les paramètres
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

    if (settings.co2_level_max !== undefined && settings.co2_level_max <= 0) {
      return 'La valeur maximale de CO2 doit être positive.';
    }

    return null;
  };

  // Valider les actionneurs
  const validateActuators = (actuators: ActuatorState): string | null => {
    if (actuators.heating < 0 || actuators.heating > 100) {
      return 'La température de chauffage doit être entre 0 et 100°C.';
    }
    if (actuators.ventilation < 0 || actuators.ventilation > 100) {
      return 'La ventilation doit être entre 0 et 100%.';
    }
    if (actuators.cameraAngle < -180 || actuators.cameraAngle > 180) {
      return 'L’angle de la caméra doit être entre -180 et 180 degrés.';
    }
    if (actuators.cameraZoom < 1 || actuators.cameraZoom > 10) {
      return 'Le zoom de la caméra doit être entre 1 et 10.';
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
      const settingsError = validateSettings(settings);
      if (settingsError) {
        setError(settingsError);
        setLoading(false);
        return;
      }

      // Valider les actionneurs
      const actuatorsError = validateActuators(actuators);
      if (actuatorsError) {
        setError(actuatorsError);
        setLoading(false);
        return;
      }

      // Créer la serre
      const greenhouseData: Partial<Greenhouse> = {
        ...formData,
        user_id: user.id,
      };
      const newGreenhouse = await greenhouseService.createGreenhouse(greenhouseData);

      // Créer les paramètres
      const newSettings: Partial<Settings> = {
        ...settings,
        greenhouse_id: newGreenhouse.id,
        user_id: user.id,
      };
      await settingsService.createSettings(newSettings);

      // Créer un document pour chaque actionneur
      const actuatorTypes: (keyof ActuatorState)[] = [
        'fan1',
        'fan2',
        'irrigation',
        'window',
        'lock',
        'lighting',
        'heating',
        'camera',
        'ventilation',
        'cameraAngle',
        'cameraZoom',
      ];

      for (const type of actuatorTypes) {
        const value = typeof actuators[type] === 'boolean' ? (actuators[type] ? 1 : 0) : actuators[type];
        await actuatorService.createActuator(newGreenhouse.id, type, Number(value));
      }

      navigate(`/greenhouse/${newGreenhouse.id}`);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création de la serre, des paramètres ou des actionneurs.');
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
            placeholder="Entrez le nom de la serre"
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
            placeholder="Entrez une description (optionnel)"
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
            placeholder="Entrez la localisation (optionnel)"
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
                <label htmlFor={`${sensor.min}`} className="block text-sm font-medium text-gray-700">
                  {sensor.label} min
                </label>
                <input
                  id={`${sensor.min}`}
                  type="number"
                  value={Number(settings[sensor.min as keyof Settings] ?? '')}
                  onChange={(e) => handleSettingsChange(sensor.min as keyof Settings, Number(e.target.value))}
                  placeholder={`Min ${sensor.label}`}
                  className="mt-1 w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label htmlFor={`${sensor.max}`} className="block text-sm font-medium text-gray-700">
                  {sensor.label} max
                </label>
                <input
                  id={`${sensor.max}`}
                  type="number"
                  value={Number(settings[sensor.max as keyof Settings] ?? '')}
                  onChange={(e) => handleSettingsChange(sensor.max as keyof Settings, Number(e.target.value))}
                  placeholder={`Max ${sensor.label}`}
                  className="mt-1 w-full p-2 border rounded-md"
                />
              </div>
            </React.Fragment>
          ))}
          <div>
            <label htmlFor="co2_level_max" className="block text-sm font-medium text-gray-700">
              CO2 max (ppm)
            </label>
            <input
              id="co2_level_max"
              type="number"
              value={settings.co2_level_max ?? ''}
              onChange={(e) => handleSettingsChange('co2_level_max', Number(e.target.value))}
              placeholder="Max CO2 (ppm)"
              className="mt-1 w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="measurement_frequency" className="block text-sm font-medium text-gray-700">
              Fréquence des mesures (secondes)
            </label>
            <input
              id="measurement_frequency"
              type="number"
              value={settings.measurement_frequency ?? ''}
              onChange={(e) => handleSettingsChange('measurement_frequency', Number(e.target.value))}
              placeholder="Fréquence (secondes)"
              className="mt-1 w-full p-2 border rounded-md"
            />
          </div>
          <div className="flex items-center">
            <input
              id="notify_by_email"
              type="checkbox"
              checked={settings.notify_by_email ?? false}
              onChange={(e) => handleSettingsChange('notify_by_email', e.target.checked)}
              className="mt-1 mr-2"
            />
            <label htmlFor="notify_by_email" className="block text-sm font-medium text-gray-700">
              Notifications par email
            </label>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mt-6">Configuration des actionneurs</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Ventilateur 1', field: 'fan1', type: 'checkbox' },
            { label: 'Ventilateur 2', field: 'fan2', type: 'checkbox' },
            { label: 'Irrigation', field: 'irrigation', type: 'checkbox' },
            { label: 'Fenêtre', field: 'window', type: 'checkbox' },
            { label: 'Verrou', field: 'lock', type: 'checkbox' },
            { label: 'Éclairage', field: 'lighting', type: 'checkbox' },
            { label: 'Caméra', field: 'camera', type: 'checkbox' },
            { label: 'Chauffage (°C)', field: 'heating', type: 'number', placeholder: 'Température (0-100)' },
            { label: 'Ventilation (%)', field: 'ventilation', type: 'number', placeholder: 'Pourcentage (0-100)' },
            { label: 'Angle de caméra (°)', field: 'cameraAngle', type: 'number', placeholder: 'Angle (-180 à 180)' },
            { label: 'Zoom de caméra', field: 'cameraZoom', type: 'number', placeholder: 'Zoom (1-10)' },
          ].map((actuator) => (
            <div key={actuator.field} className="flex items-center">
              {actuator.type === 'checkbox' ? (
                <>
                  <input
                    id={actuator.field}
                    type="checkbox"
                    checked={actuators[actuator.field as keyof ActuatorState] as boolean}
                    onChange={(e) => handleActuatorChange(actuator.field as keyof ActuatorState, e.target.checked)}
                    className="mt-1 mr-2"
                  />
                  <label htmlFor={actuator.field} className="block text-sm font-medium text-gray-700">
                    {actuator.label}
                  </label>
                </>
              ) : (
                <>
                  <label htmlFor={actuator.field} className="block text-sm font-medium text-gray-700 mr-2">
                    {actuator.label}
                  </label>
                  <input
                    id={actuator.field}
                    type="number"
                    value={Number(actuators[actuator.field as keyof ActuatorState]) ?? ''}
                    onChange={(e) => handleActuatorChange(actuator.field as keyof ActuatorState, Number(e.target.value))}
                    placeholder={actuator.placeholder}
                    className="mt-1 w-32 p-2 border rounded-md"
                  />
                </>
              )}
            </div>
          ))}
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
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