export interface Actuator {
  id: string;
  greenhouse_id: string;
  type: keyof ActuatorState; // Restrict to ActuatorState keys
  value: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

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
  cameraAngle: number;
  cameraZoom: number;
}