import React, { useState, useEffect } from 'react';
import { Fan, Droplet, Wind as WindIcon, Lock, Sun, ThermometerSun, Camera } from 'lucide-react';
import { ActuatorState, Actuator } from '../types/Actuator';
import { actuatorService } from '../services/actuator_service';

interface ControlPanelProps {
  onToggle: (device: keyof ActuatorState, state: boolean | number) => void;
  greenhouseId?: string;
}

const ControlPanel = ({ greenhouseId, onToggle }: ControlPanelProps) => {
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActuators = async () => {
      if (!greenhouseId) {
        setError('Aucune serre sélectionnée');
        return;
      }
      try {
        setError(null);
        const actuatorList = await actuatorService.getActuatorsByGreenhouseId(greenhouseId);
        const initialState: ActuatorState = { ...actuators };

        // Définir les clés qui attendent un booléen
        const booleanActuators: (keyof ActuatorState)[] = [
          'fan1',
          'fan2',
          'irrigation',
          'window',
          'lock',
          'lighting',
          'camera',
        ];

        actuatorList.forEach((actuator: Actuator) => {
          // Pas besoin de vérifier Object.keys, car actuator.type est déjà keyof ActuatorState
          if (booleanActuators.includes(actuator.type)) {
            initialState[actuator.type] = actuator.value === 1;
          } else {
            initialState[actuator.type] = actuator.value;
          }
        });
        setActuators(initialState);
      } catch (error: any) {
        setError(error.message || 'Erreur lors de la récupération des actionneurs');
      }
    };

    if (greenhouseId) {
      fetchActuators();
    }
  }, [greenhouseId]);

  const handleToggle = async (device: keyof ActuatorState, state: boolean | number) => {
    if (!greenhouseId) {
      setError('Aucune serre sélectionnée');
      return;
    }
    try {
      setError(null);
      const actuatorList = await actuatorService.getActuatorsByGreenhouseId(greenhouseId);
      const actuator = actuatorList.find((a) => a.type === device);
      if (!actuator) {
        setError(`Actionneur de type ${device} non trouvé`);
        return;
      }
      await actuatorService.updateActuator(actuator.id, Number(state));
      setActuators((prev) => ({ ...prev, [device]: state })); // Mettre à jour l'état local
      onToggle(device, state);
    } catch (error: any) {
      setError(error.message || "Erreur lors de la mise à jour de l'actionneur");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Panneau de contrôle</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex items-center space-x-2">
          <Fan className="w-5 h-5 text-green-600" />
          <span className="text-gray-700">Ventilateur 1</span>
          <input
            type="checkbox"
            placeholder='M'
            checked={actuators.fan1}
            onChange={(e) => handleToggle('fan1', e.target.checked)}
            className="h-4 w-4 text-green-600 focus:ring-green-600 border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Fan className="w-5 h-5 text-green-600" />
          <span className="text-gray-700">Ventilateur 2</span>
          <input
            type="checkbox"
            placeholder='M'
            checked={actuators.fan2}
            onChange={(e) => handleToggle('fan2', e.target.checked)}
            className="h-4 w-4 text-green-600 focus:ring-green-600 border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Droplet className="w-5 h-5 text-green-600" />
          <span className="text-gray-700">Irrigation</span>
          <input
            type="checkbox"
            placeholder='M'
            checked={actuators.irrigation}
            onChange={(e) => handleToggle('irrigation', e.target.checked)}
            className="h-4 w-4 text-green-600 focus:ring-green-600 border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center space-x-2">
          <WindIcon className="w-5 h-5 text-green-600" />
          <span className="text-gray-700">Fenêtre</span>
          <input
            type="checkbox"
            placeholder='M'
            checked={actuators.window}
            onChange={(e) => handleToggle('window', e.target.checked)}
            className="h-4 w-4 text-green-600 focus:ring-green-600 border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Lock className="w-5 h-5 text-green-600" />
          <span className="text-gray-700">Verrou</span>
          <input
            type="checkbox"
            placeholder='M'
            checked={actuators.lock}
            onChange={(e) => handleToggle('lock', e.target.checked)}
            className="h-4 w-4 text-green-600 focus:ring-green-600 border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Sun className="w-5 h-5 text-green-600" />
          <span className="text-gray-700">Éclairage</span>
          <input
            type="checkbox"
            placeholder='M'
            checked={actuators.lighting}
            onChange={(e) => handleToggle('lighting', e.target.checked)}
            className="h-4 w-4 text-green-600 focus:ring-green-600 border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center space-x-2">
          <ThermometerSun className="w-5 h-5 text-green-600" />
          <span className="text-gray-700">Chauffage ({actuators.heating}°C)</span>
          <input
            type="range"
            min="15"
            max="30"
            placeholder='M'
            value={actuators.heating}
            onChange={(e) => handleToggle('heating', Number(e.target.value))}
            className="w-24"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Fan className="w-5 h-5 text-green-600" />
          <span className="text-gray-700">Ventilation ({actuators.ventilation}%)</span>
          <input
            type="range"
            min="0"
            max="100"
            placeholder='M'
            value={actuators.ventilation}
            onChange={(e) => handleToggle('ventilation', Number(e.target.value))}
            className="w-24"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Camera className="w-5 h-5 text-green-600" />
          <span className="text-gray-700">Caméra</span>
          <input
            type="checkbox"
            placeholder='M'
            checked={actuators.camera}
            onChange={(e) => handleToggle('camera', e.target.checked)}
            className="h-4 w-4 text-green-600 focus:ring-green-600 border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Camera className="w-5 h-5 text-green-600" />
          <span className="text-gray-700">Angle caméra ({actuators.cameraAngle}°)</span>
          <input
            type="range"
            min="0"
            max="360"
            placeholder='M'
            value={actuators.cameraAngle}
            onChange={(e) => handleToggle('cameraAngle', Number(e.target.value))}
            className="w-24"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Camera className="w-5 h-5 text-green-600" />
          <span className="text-gray-700">Zoom caméra (x{actuators.cameraZoom})</span>
          <input
            type="range"
            min="1"
            max="10"
            step="0.1"
            placeholder='M'
            value={actuators.cameraZoom}
            onChange={(e) => handleToggle('cameraZoom', Number(e.target.value))}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;