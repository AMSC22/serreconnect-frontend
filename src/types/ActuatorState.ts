export interface ActuatorState {
  fan1: boolean;
  fan2: boolean;
  irrigation: boolean;
  window: boolean;
  lock: boolean;
  lighting: boolean;
  heating: number;
  camera: boolean;
  ventilation: number;
  cameraAngle: number; // Angle de la caméra (0 à 180 degrés)
  cameraZoom: number; // Zoom de la caméra (1x à 5x)
}