export interface SensorData {
  type:
    | 'temperature'
    | 'humidity'
    | 'light_level'
    | 'soil_moisture'
    | 'ph_level'
    | 'co2_level'
    | 'connectivity'
    | 'system_status'
    | 'intrusion';
  value: number | string;
  unit?: string;
  status?: 'Actif' | 'Non configuré';
}