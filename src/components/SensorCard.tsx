import React from 'react';
import { Thermometer, Droplet, Sun, Sprout, Wifi, Power, Bell } from 'lucide-react';
import { SensorData } from '../types/SensorData';

interface SensorCardProps {
  sensor: SensorData;
}

const SensorCard = ({ sensor }: SensorCardProps) => {
  const getIcon = () => {
    switch (sensor.type) {
      case 'temperature':
        return <Thermometer className="w-8 h-8 text-green-600" />;
      case 'humidity_air':
        return <Droplet className="w-8 h-8 text-blue-500" />;
      case 'humidity_soil':
        return <Droplet className="w-8 h-8 text-brown-500" />;
      case 'luminosity':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'fertility':
        return <Sprout className="w-8 h-8 text-green-700" />;
      case 'connectivity':
        return <Wifi className="w-8 h-8 text-purple-500" />;
      case 'system_status':
        return <Power className="w-8 h-8 text-green-600" />;
      case 'intrusion':
        return <Bell className="w-8 h-8 text-red-500" />;
      default:
        return null;
    }
  };

  const getLabel = () => {
    switch (sensor.type) {
      case 'temperature':
        return 'Température';
      case 'humidity_air':
        return 'Humidité (Air)';
      case 'humidity_soil':
        return 'Humidité (Sol)';
      case 'luminosity':
        return 'Luminosité';
      case 'fertility':
        return 'Fertilité';
      case 'connectivity':
        return 'Connectivité';
      case 'system_status':
        return 'État du système';
      case 'intrusion':
        return 'Intrusion';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
      {getIcon()}
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{getLabel()}</h3>
        <p className="text-2xl font-bold text-green-600">
          {sensor.value} {sensor.unit || ''}
        </p>
      </div>
    </div>
  );
};

export default SensorCard;