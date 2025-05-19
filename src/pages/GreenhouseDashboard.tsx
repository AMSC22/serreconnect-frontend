import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SensorCard from '../components/SensorCard';
import ControlPanel from '../components/ControlPanel';
import VideoStream from '../components/VideoStream';
import AlertCard from '../components/AlertCard';
import { SensorData } from '../types/SensorData';
import { ActuatorState } from '../types/ActuatorState';
import { Alert } from '../types/Alert';
import { Greenhouse } from '../types/Greenhouse';
import { greenhouseService } from '../services/greenhouse_service';
import { alertService } from '../services/alert_service';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { actuatorService } from '../services/actuator_service';

const GreenhouseDashboard = () => {
  const { user } = useAuth();
  const { greenhouseId } = useParams<{ greenhouseId: string }>();
  const navigate = useNavigate();
  const [greenhouse, setGreenhouse] = useState<Greenhouse | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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

  const defaultSensorData: SensorData[] = [
    { type: 'temperature', value: 0, unit: '°C', status: 'Non configuré' },
    { type: 'humidity', value: 0, unit: '%', status: 'Non configuré' },
    { type: 'light_level', value: 0, unit: 'lux', status: 'Non configuré' },
    { type: 'soil_moisture', value: 0, unit: '%', status: 'Non configuré' },
    { type: 'ph_level', value: 0, unit: '', status: 'Non configuré' },
    { type: 'co2_level', value: 0, unit: 'ppm', status: 'Non configuré' },
    { type: 'connectivity', value: 'Non configuré', unit: '', status: 'Non configuré' },
    { type: 'system_status', value: 'Non configuré', unit: '', status: 'Non configuré' },
    { type: 'intrusion', value: 'Non configuré', unit: '', status: 'Non configuré' },
  ];

  const sensorData: SensorData[] = greenhouse
    ? [
        { type: 'system_status', value: greenhouse.system_status || 'Actif', unit: '', status: 'Actif' },
        { type: 'connectivity', value: greenhouse.connectivity || 'Stable', unit: '', status: 'Actif' },
        { type: 'intrusion', value: greenhouse.intrusion || 'Aucune', unit: '', status: 'Actif' },
        { type: 'temperature', value: greenhouse.temperature ?? 0, unit: '°C', status: greenhouse.temperature ? 'Actif' : 'Non configuré' },
        { type: 'humidity', value: greenhouse.humidity ?? 0, unit: '%', status: greenhouse.humidity ? 'Actif' : 'Non configuré' },
        { type: 'light_level', value: greenhouse.light_level ?? 0, unit: 'lux', status: greenhouse.light_level ? 'Actif' : 'Non configuré' },
        { type: 'soil_moisture', value: greenhouse.soil_moisture ?? 0, unit: '%', status: greenhouse.soil_moisture ? 'Actif' : 'Non configuré' },
        { type: 'ph_level', value: greenhouse.ph_level ?? 0, unit: '', status: greenhouse.ph_level ? 'Actif' : 'Non configuré' },
        { type: 'co2_level', value: greenhouse.co2_level ?? 0, unit: 'ppm', status: greenhouse.co2_level ? 'Actif' : 'Non configuré' },
      ]
    : defaultSensorData;

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !greenhouseId || !localStorage.getItem('access_token')) {
        setError('Utilisateur non connecté ou serre non spécifiée');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const greenhouseData = await greenhouseService.getGreenhouseById(greenhouseId);
        const alertData = await alertService.getAlertsByGreenhouseId(greenhouseId);
        setGreenhouse(greenhouseData);
        setAlerts(alertData.filter((alert) => !alert.is_resolved).slice(0, 2));
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Erreur lors de la récupération des données');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [greenhouseId, user]);

  const handleToggle = async (device: keyof ActuatorState, state: boolean | number) => {
    if (!greenhouseId) return;
    try {
      const actuatorList = await actuatorService.getActuatorsByGreenhouseId(greenhouseId);
      const actuator = actuatorList.find((a) => a.type === device);
      if (!actuator) {
        setError(`Actionneur de type ${device} non trouvé`);
        return;
      }
      await actuatorService.updateActuator(actuator.id, Number(state));
      setActuators((prev) => ({ ...prev, [device]: state }));
    } catch (err: any) {
      setError(err.message || "Erreur lors de la mise à jour de l'actionneur");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!greenhouse) return <p className="text-red-500">Serre non trouvée</p>;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-green-600">{greenhouse.name}</h1>
      {error && <p className="text-red-500">{error}</p>}

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Capteurs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sensorData.map((sensor) => (
            <SensorCard key={sensor.type} sensor={sensor} />
          ))}
        </div>
      </section>

      <VideoStream actuators={actuators} onToggle={handleToggle} />

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Dernières alertes</h2>
        <div className="space-y-4">
          {alerts.length > 0 ? (
            alerts.map((alert) => <AlertCard key={alert.id} alert={alert} />)
          ) : (
            <p className="text-gray-500">Aucune alerte pour le moment.</p>
          )}
        </div>
      </section>

      <ControlPanel onToggle={handleToggle} greenhouseId={greenhouseId} />
    </div>
  );
};

export default GreenhouseDashboard;