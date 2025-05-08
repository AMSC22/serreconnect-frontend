export interface Settings {
  id: string;
  user_id: string;
  greenhouse_id?: string; // Ajout
  temperature_min?: number;
  temperature_max?: number;
  humidity_min?: number;
  humidity_max?: number;
  light_level_min?: number;
  light_level_max?: number;
  soil_moisture_min?: number;
  soil_moisture_max?: number;
  ph_level_min?: number;
  ph_level_max?: number;
  co2_level_max?: number;
  notify_by_email: boolean;
  measurement_frequency?: number;
  created_at: string;
  updated_at: string;
}

export interface SettingsCreate {
  user_id: string;
  greenhouse_id?: string; // Ajout
  temperature_min?: number;
  temperature_max?: number;
  humidity_min?: number;
  humidity_max?: number;
  light_level_min?: number;
  light_level_max?: number;
  soil_moisture_min?: number;
  soil_moisture_max?: number;
  ph_level_min?: number;
  ph_level_max?: number;
  co2_level_max?: number;
  notify_by_email?: boolean;
  measurement_frequency?: number;
}

export interface SettingsUpdate {
  temperature_min?: number;
  temperature_max?: number;
  humidity_min?: number;
  humidity_max?: number;
  light_level_min?: number;
  light_level_max?: number;
  soil_moisture_min?: number;
  soil_moisture_max?: number;
  ph_level_min?: number;
  ph_level_max?: number;
  co2_level_max?: number;
  notify_by_email?: boolean;
  measurement_frequency?: number;
}