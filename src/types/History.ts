export interface HistoricalData {
  id: string;
  greenhouse_id: string;
  temperature?: number;
  humidity?: number;
  light_level?: number;
  soil_moisture?: number;
  ph_level?: number;
  co2_level?: number;
  recorded_at: string; // ISO date
}

export interface HistoryCreate {
  greenhouse_id: string;
  temperature?: number;
  humidity?: number;
  light_level?: number;
  soil_moisture?: number;
  ph_level?: number;
  co2_level?: number;
}