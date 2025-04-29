export interface SensorData {
    type:
      | 'temperature'
      | 'humidity_air'
      | 'humidity_soil'
      | 'luminosity'
      | 'fertility'
      | 'connectivity'
      | 'system_status'
      | 'intrusion';
    value: number | string;
    unit?: string;
  }