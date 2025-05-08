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
      case 'humidity':
        return <Droplet className="w-8 h-8 text-blue-500" />;
      case 'soil_moisture':
        return <Droplet className="w-8 h-8 text-brown-500" />;
      case 'light_level':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'ph_level':
        return <Sprout className="w-8 h-8 text-green-700" />;
      case 'co2_level':
        return <Sprout className="w-8 h-8 text-gray-500" />;
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
      case 'humidity':
        return 'Humidité (Air)';
      case 'soil_moisture':
        return 'Humidité (Sol)';
      case 'light_level':
        return 'Luminosité';
      case 'ph_level':
        return 'pH';
      case 'co2_level':
        return 'CO2';
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