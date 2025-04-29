import React, { ReactElement } from 'react';
import { useHistory } from '../hooks/useHistory';
import Chart from '../components/Chart';
import { Thermometer, Droplet, Sun, Sprout } from 'lucide-react';

// Définir un type pour les capteurs
type SensorType = 'temperature' | 'humidity_air' | 'humidity_soil' | 'luminosity' | 'fertility';

const History = () => {
  const { data, period, setPeriod } = useHistory();

  const sensors: { type: SensorType; label: string; unit: string; color: string; icon: React.ReactElement }[] = [
    { type: 'temperature', label: 'Température', unit: '°C', color: '#16a34a', icon: <Thermometer className="w-6 h-6 text-green-600" /> },
    { type: 'humidity_air', label: 'Humidité (Air)', unit: '%', color: '#3b82f6', icon: <Droplet className="w-6 h-6 text-blue-500" /> },
    { type: 'humidity_soil', label: 'Humidité (Sol)', unit: '%', color: '#8B4513', icon: <Droplet className="w-6 h-6 text-brown-500" /> },
    { type: 'luminosity', label: 'Luminosité', unit: 'lux', color: '#eab308', icon: <Sun className="w-6 h-6 text-yellow-500" /> },
    { type: 'fertility', label: 'Fertilité', unit: '', color: '#15803d', icon: <Sprout className="w-6 h-6 text-green-700" /> },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-600">Historique</h1>
      {/* Filtres */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Période</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setPeriod('24h')}
            className={`px-4 py-2 rounded-md ${
              period === '24h' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            24h
          </button>
          <button
            onClick={() => setPeriod('7d')}
            className={`px-4 py-2 rounded-md ${
              period === '7d' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            7 jours
          </button>
          <button
            onClick={() => setPeriod('30d')}
            className={`px-4 py-2 rounded-md ${
              period === '30d' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            30 jours
          </button>
        </div>
      </div>
      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sensors.map((sensor) => (
          <div key={sensor.type} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
            {sensor.icon}
            <div className="flex-1">
              <Chart
                data={data}
                sensor={sensor.type}
                label={sensor.label}
                unit={sensor.unit}
                color={sensor.color}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;