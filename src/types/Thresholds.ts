export interface Thresholds {
  temperature_min: number;
  temperature_max: number;
  humidity_min: number;
  humidity_max: number;
  soil_moisture_min: number;
  soil_moisture_max: number;
  light_level_min: number;
  light_level_max: number;
  ph_level_min: number;
  ph_level_max: number;
  co2_level_min?: number;
  co2_level_max?: number;
  notify_by_email?: boolean;
  measurement_frequency?: number;
  [key: string]: number | boolean | undefined;
}