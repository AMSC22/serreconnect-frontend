import React, { useState } from 'react';
import SensorCard from '../components/SensorCard';
import ControlPanel from '../components/ControlPanel';
import VideoStream from '../components/VideoStream';
import AlertCard from '../components/AlertCard';
import { SensorData } from '../types/SensorData';
import { ActuatorState } from '../types/ActuatorState';
import { Alert } from '../types/Alert';

const Home = () => {
  // Données mockées pour les capteurs
  const sensorData: SensorData[] = [
    { type: 'temperature', value: 25.3, unit: '°C' },
    { type: 'humidity_air', value: 65, unit: '%' },
    { type: 'humidity_soil', value: 45, unit: '%' },
    { type: 'luminosity', value: 1200, unit: 'lux' },
    { type: 'fertility', value: 'Élevé', unit: '' },
    { type: 'connectivity', value: 'Stable', unit: '' },
    { type: 'system_status', value: 'Actif', unit: '' },
    { type: 'intrusion', value: 'Aucune', unit: '' },
  ];

  // État mocké pour les équipements
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
    cameraAngle: 0, // Angle de la caméra (0 à 180 degrés)
    cameraZoom: 1, // Zoom de la caméra (1x à 5x)
  });

  // Données mockées pour les alertes
  const alerts: Alert[] = [
    {
      id: '1',
      message: 'Température trop élevée (> 35°C)',
      timestamp: '2025-04-24T14:30:00',
      read: false,
    },
    {
      id: '2',
      message: 'Humidité du sol faible (< 20%)',
      timestamp: '2025-04-24T12:15:00',
      read: true,
    },
  ];

  // Fonction pour simuler le changement d’état des équipements
  const handleToggle = (device: keyof ActuatorState, state: boolean | number) => {
    setActuators((prev) => ({ ...prev, [device]: state }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-600">Tableau de bord</h1>
      {/* Capteurs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sensorData.map((sensor) => (
          <SensorCard key={sensor.type} sensor={sensor} />
        ))}
      </div>
      {/* Flux vidéo */}
      <VideoStream  actuators={actuators} onToggle={handleToggle} />
      {/* Alertes */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Dernières alertes</h2>
        <div className="space-y-4">
          {alerts.length > 0 ? (
            alerts.map((alert) => <AlertCard key={alert.id} alert={alert} />)
          ) : (
            <p className="text-gray-500">Aucune alerte pour le moment.</p>
          )}
        </div>
      </div>
      {/* Contrôles */}
      <ControlPanel actuators={actuators} onToggle={handleToggle} />
    </div>
  );
};

export default Home;