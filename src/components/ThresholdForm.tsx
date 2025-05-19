import React from 'react';
import { Thermometer, Droplet, Sun, Sprout, Wind, Mail, Clock } from 'lucide-react';
import { Thresholds } from '../types/Thresholds';

interface ThresholdFormProps {
  thresholds: Thresholds;
  onUpdate: (newThresholds: Partial<Thresholds>) => void;
}

const ThresholdForm = ({ thresholds, onUpdate }: ThresholdFormProps) => {
  type SensorType = 'temperature' | 'humidity' | 'soil_moisture' | 'light_level' | 'ph_level' | 'co2_level';
  type ConfigType = 'notify_by_email' | 'measurement_frequency';
  
  const sensors = [
    {
      type: 'temperature' as SensorType,
      label: 'Température (°C)',
      icon: <Thermometer className="w-6 h-6 text-green-600" />,
    },
    {
      type: 'humidity' as SensorType,
      label: 'Humidité (Air) (%)',
      icon: <Droplet className="w-6 h-6 text-blue-500" />,
    },
    {
      type: 'soil_moisture' as SensorType,
      label: 'Humidité (Sol) (%)',
      icon: <Droplet className="w-6 h-6 text-brown-500" />,
    },
    {
      type: 'light_level' as SensorType,
      label: 'Luminosité (lux)',
      icon: <Sun className="w-6 h-6 text-yellow-500" />,
    },
    {
      type: 'ph_level' as SensorType,
      label: 'pH',
      icon: <Sprout className="w-6 h-6 text-green-700" />,
    },
    {
      type: 'co2_level' as SensorType,
      label: 'CO₂ (ppm)',
      icon: <Wind className="w-6 h-6 text-gray-600" />,
    },
  ];
  
  // Paramètres de configuration
  const configParams = [
    {
      type: 'notify_by_email' as ConfigType,
      label: 'Notification par Email',
      icon: <Mail className="w-6 h-6 text-blue-600" />,
      isBoolean: true,
    },
    {
      type: 'measurement_frequency' as ConfigType,
      label: 'Fréquence de mesure (sec)',
      icon: <Clock className="w-6 h-6 text-purple-600" />,
      isNumeric: true,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newThresholds: Partial<Thresholds> = {};
    
    // Traitement des capteurs avec min/max
    sensors.forEach((sensor) => {
      const minKey = `${sensor.type}_min` as keyof Thresholds;
      const maxKey = `${sensor.type}_max` as keyof Thresholds;
      const minValue = formData.get(minKey as string);
      const maxValue = formData.get(maxKey as string);
      
      if (minValue !== null) {
        const min = Number(minValue);
        if (!isNaN(min)) {
          newThresholds[minKey] = min;
        }
      }
      
      if (maxValue !== null) {
        const max = Number(maxValue);
        if (!isNaN(max)) {
          newThresholds[maxKey] = max;
        }
      }
    });
    
    // Traitement des paramètres de configuration
    configParams.forEach((param) => {
      const key = param.type as keyof Thresholds;
      if (param.isBoolean) {
        const value = formData.get(param.type) === 'on';
        newThresholds[key] = value as any;
      } else if (param.isNumeric) {
        const value = Number(formData.get(param.type));
        if (!isNaN(value)) {
          newThresholds[key] = value;
        }
      }
    });
    
    onUpdate(newThresholds);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Configuration des seuils</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section des capteurs avec min/max */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Seuils des capteurs</h3>
          {sensors.map((sensor) => (
            <div key={sensor.type} className="flex items-center space-x-4">
              {sensor.icon}
              <div className="flex-1">
                <label className="block text-gray-700 font-semibold">{sensor.label}</label>
                <div className="flex space-x-4 mt-1">
                  <div>
                    <span className="text-xs text-gray-500">Min</span>
                    <input
                      type="number"
                      name={`${sensor.type}_min`}
                      defaultValue={Number(thresholds[`${sensor.type}_min` as keyof Thresholds])}
                      step={sensor.type === 'ph_level' ? '0.1' : '1'}
                      className="w-24 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                      placeholder="Min"
                      aria-label={`${sensor.label} minimum`}
                    />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Max</span>
                    <input
                      type="number"
                      name={`${sensor.type}_max`}
                      defaultValue={Number(thresholds[`${sensor.type}_max` as keyof Thresholds])}
                      step={sensor.type === 'ph_level' ? '0.1' : '1'}
                      className="w-24 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                      placeholder="Max"
                      aria-label={`${sensor.label} maximum`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Section des paramètres de configuration */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-700">Paramètres généraux</h3>
          
          {/* Paramètre booléen */}
          {configParams.filter(param => param.isBoolean).map((param) => (
            <div key={param.type} className="flex items-center space-x-4">
              {param.icon}
              <div className="flex-1">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={param.type}
                    defaultChecked={Boolean(thresholds[param.type])}
                    className="rounded text-green-600 focus:ring-green-500"
                  />
                  <span className="text-gray-700 font-semibold">{param.label}</span>
                </label>
              </div>
            </div>
          ))}
          
          {/* Paramètres numériques */}
          {configParams.filter(param => param.isNumeric).map((param) => (
            <div key={param.type} className="flex items-center space-x-4">
              {param.icon}
              <div className="flex-1">
                <label className="block text-gray-700 font-semibold">{param.label}</label>
                <input
                  type="number"
                  name={param.type}
                  defaultValue={Number(thresholds[param.type as keyof Thresholds])}
                  className="w-24 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Valeur"
                  aria-label={param.label}
                />
              </div>
            </div>
          ))}
        </div>
        
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 w-full sm:w-auto"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default ThresholdForm;