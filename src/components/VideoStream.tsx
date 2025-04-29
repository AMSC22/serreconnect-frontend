import React, { useRef } from 'react';
import { Maximize, Camera } from 'lucide-react';
import { ActuatorState } from '../types/ActuatorState';

interface VideoStreamProps {
  actuators: ActuatorState;
  onToggle: (device: keyof ActuatorState, state: boolean | number) => void;
}

const VideoStream = ({ actuators, onToggle }: VideoStreamProps) => {
  const videoRef = useRef<HTMLDivElement>(null);

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen().catch((err) => {
          console.error('Erreur lors du passage en plein écran:', err);
        });
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Flux vidéo</h2>
      <div
        ref={videoRef}
        className="relative aspect-video bg-gray-200 flex items-center justify-center rounded-md"
      >
        {/* Placeholder pour le flux vidéo */}
        <p className="text-gray-500">Flux vidéo non disponible (mock)</p>
        {/* Bouton Plein écran */}
        <button
          onClick={handleFullScreen}
          className="absolute top-2 right-2 p-2 bg-green-600 text-white rounded-full hover:bg-green-700"
          title="Plein écran"
        >
          <Maximize className="w-5 h-5" />
        </button>
      </div>
      {/* Contrôles de la caméra */}
      <div className="mt-4 space-y-4">
        <div className="flex items-center space-x-2">
          <Camera className="w-5 h-5 text-green-600" />
          <span className="text-gray-700">Caméra</span>
          <input
            type="checkbox"
            placeholder='M'
            checked={actuators.camera}
            onChange={(e) => onToggle('camera', e.target.checked)}
            className="h-4 w-4 text-green-600 focus:ring-green-600 border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Camera className="w-5 h-5 text-green-600" />
          <span className="text-gray-700">Angle caméra ({actuators.cameraAngle}°)</span>
          <input
            type="range"
            min="0"
            max="180"
            placeholder='M'
            value={actuators.cameraAngle}
            onChange={(e) => onToggle('cameraAngle', Number(e.target.value))}
            className="w-24"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Camera className="w-5 h-5 text-green-600" />
          <span className="text-gray-700">Zoom caméra ({actuators.cameraZoom}x)</span>
          <input
            type="range"
            min="1"
            max="5"
            step="0.1"
            placeholder='M'
            value={actuators.cameraZoom}
            onChange={(e) => onToggle('cameraZoom', Number(e.target.value))}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoStream;