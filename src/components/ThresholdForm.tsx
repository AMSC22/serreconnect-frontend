import React from 'react';
import { Thermometer, Droplet, Sun, Sprout } from 'lucide-react';
import { Thresholds } from '../types/Thresholds';

interface ThresholdFormProps {
  thresholds: Thresholds;
  onUpdate: (newThresholds: Partial<Thresholds>) => void;
}

const ThresholdForm = ({ thresholds, onUpdate }: ThresholdFormProps) => {
  const sensors = [
    {
      type: 'temperature',
      label: 'Température (°C)',
      icon: <Thermometer className="w-6 h-6 text-green-600" />,
    },
    {
      type: 'humidity_air',
      label: 'Humidité (Air) (%)',
      icon: <Droplet className="w-6 h-6 text-blue-500" />,
    },
    {
      type: 'humidity_soil',
      label: 'Humidité (Sol) (%)',
      icon: <Droplet className="w-6 h-6 text-brown-500" />,
    },
    {
      type: 'luminosity',
      label: 'Luminosité (lux)',
      icon: <Sun className="w-6 h-6 text-yellow-500" />,
    },
    {
      type: 'fertility',
      label: 'Fertilité',
      icon: <Sprout className="w-6 h-6 text-green-700" />,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newThresholds: Partial<Thresholds> = {};

    sensors.forEach((sensor) => {
      const min = Number(formData.get(`${sensor.type}-min`));
      const max = Number(formData.get(`${sensor.type}-max`));
      if (!isNaN(min) && !isNaN(max)) {
        newThresholds[sensor.type] = { min, max };
      }
    });

    onUpdate(newThresholds);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Seuils des capteurs</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {sensors.map((sensor) => (
          <div key={sensor.type} className="flex items-center space-x-4">
            {sensor.icon}
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold">{sensor.label}</label>
              <div className="flex space-x-4">
                <input
                  type="number"
                  name={`${sensor.type}-min`}
                  defaultValue={thresholds[sensor.type].min}
                  className="w-24 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Min"
                />
                <input
                  type="number"
                  name={`${sensor.type}-max`}
                  defaultValue={thresholds[sensor.type].max}
                  className="w-24 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default ThresholdForm;