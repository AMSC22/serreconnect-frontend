import React from 'react';
import { Switch } from '@radix-ui/react-switch';
import { Camera, DoorOpen, Flame, ThermometerSun, Fan, Droplet, Lock, Lightbulb, Wind as WindIcon } from 'lucide-react';
import { ActuatorState } from '../types/ActuatorState';

interface ControlPanelProps {
  actuators: ActuatorState;
  onToggle: (device: keyof ActuatorState, state: boolean | number) => void;
}

const ControlPanel = ({ actuators, onToggle }: ControlPanelProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Contrôle des équipements</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Ventilateur 1 */}
        <div className="flex items-center space-x-2">
          <Fan className="w-5 h-5 text-green-600" />
          <span className="text-gray-700">Ventilateur 1</span>
          <Switch
            checked={actuators.fan1}
            onCheckedChange={(checked) => onToggle('fan1', checked)}
          />
        </div>
        {/* Ventilateur 2 */}
        <div className="flex items-center space-x-2">
          <Fan className="w-5 h-5 text-green-600" />
          <span className="text-gray-700">Ventilateur 2</span>
          <Switch
            checked={actuators.fan2}
            onCheckedChange={(checked) => onToggle('fan2', checked)}
          />
        </div>
        {/* Irrigation */}
        <div className="flex items-center space-x-2">
          <Droplet className="w-5 h-5 text-green-600" />
          <span className="text-gray-700">Irrigation</span>
          <Switch
            checked={actuators.irrigation}
            onCheckedChange={(checked) => onToggle('irrigation', checked)}
          />
        </div>
        {/* Fenêtre */}
        <div className="flex items-center space-x-2">
          <WindIcon className="w-5 h-5 text-green-600" />
          <span className="text-gray-700">Fenêtre</span>
          <Switch
            checked={actuators.window}
            onCheckedChange={(checked) => onToggle('window', checked)}
          />
        </div>
        {/* Porte */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DoorOpen className="w-6 h-6 text-gray-600" />
            <span>Porte</span>
          </div>
          <button
            onClick={() => onToggle('window', !actuators.window)}
            className={`px-3 py-1 rounded-full ${
              actuators.window ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {actuators.window ? 'Ouverte' : 'Fermée'}
          </button>
        </div>
        {/* Serrure */}
        <div className="flex items-center space-x-2">
          <Lock className="w-5 h-5 text-green-600" />
          <span className="text-gray-700">Verrou</span>
          <Switch
            checked={actuators.lock}
            onCheckedChange={(checked) => onToggle('lock', checked)}
          />
        </div>
        {/* Éclairage */}
        <div className="flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-green-600" />
          <span className="text-gray-700">Éclairage</span>
          <Switch
            checked={actuators.lighting}
            onCheckedChange={(checked) => onToggle('lighting', checked)}
          />
        </div>
        {/* Chauffage */}
        <div className="flex items-center space-x-2">
          <ThermometerSun className="w-5 h-5 text-green-600" />
          <span className="text-gray-700">Chauffage ({actuators.heating}°C)</span>
          <input
            type="range"
            min="15"
            max="30"
            placeholder="M"
            value={actuators.heating}
            onChange={(e) => onToggle('heating', Number(e.target.value))}
            className="w-24"
          />
        </div>
        {/* Ventilation (Slider) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Fan className="w-6 h-6 text-teal-500" />
            <span>Ventilation</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            placeholder="M"
            value={actuators.ventilation}
            onChange={(e) => onToggle('ventilation', Number(e.target.value))}
            className="w-24 accent-green-600"
          />
        </div>
        {/* Chauffage (Slider) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Flame className="w-6 h-6 text-red-500" />
            <span>Chauffage</span>
          </div>
          <input
            type="range"
            min={10}
            max={35}
            step={1}
            placeholder="M"
            value={actuators.heating}
            onChange={(e) => onToggle('heating', Number(e.target.value))}
            className="w-24 accent-green-600"
          />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;