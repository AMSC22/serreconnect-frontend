import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { ActuatorState } from '../types/Actuator';
import { useAuth } from '../context/AuthContext';
import { greenhouseService } from '../services/greenhouse_service';
import api from '../services/api';

interface VideoStreamProps {
  actuators: ActuatorState;
  onToggle: (device: keyof ActuatorState, state: boolean | number) => void;
}

const VideoStream = ({ actuators, onToggle }: VideoStreamProps) => {
  const { user } = useAuth();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      if (!user) return;
      try {
        const greenhouses = await greenhouseService.getGreenhousesByUserId(user.id);
        if (greenhouses.length === 0) {
          setError('Aucune serre configurée');
          return;
        }
        const response = await api.get(`/greenhouses/${greenhouses[0].id}/video`);
        setVideoUrl(response.data.video_url);
      } catch (err: any) {
        setError(err.message || 'Erreur lors de la récupération du flux vidéo');
      }
    };

    fetchVideoUrl();
  }, [user]);

  const handleCameraToggle = (state: boolean) => {
    onToggle('camera', state);
  };

  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggle('cameraZoom', Number(e.target.value));
  };

  const handleAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggle('cameraAngle', Number(e.target.value));
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Flux Vidéo</h2>
      {videoUrl ? (
        <ReactPlayer
          url={videoUrl}
          playing={actuators.camera}
          controls
          width="100%"
          height="auto"
        />
      ) : (
        <p className="text-gray-500">Chargement du flux vidéo...</p>
      )}
      <div className="mt-4 space-y-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">Caméra</span>
          <input
            type="checkbox"
            checked={actuators.camera}
            placeholder='M'
            onChange={(e) => handleCameraToggle(e.target.checked)}
            className="h-4 w-4 text-green-600 focus:ring-green-600 border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">Zoom ({actuators.cameraZoom}x)</span>
          <input
            type="range"
            min="1"
            max="5"
            step="0.1"
            placeholder='M'
            value={actuators.cameraZoom}
            onChange={handleZoomChange}
            className="w-24"
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">Angle ({actuators.cameraAngle}°)</span>
          <input
            type="range"
            min="0"
            max="360"
            placeholder='M'
            value={actuators.cameraAngle}
            onChange={handleAngleChange}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoStream;