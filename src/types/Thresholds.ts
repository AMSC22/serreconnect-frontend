export interface Threshold {
  min: number;
  max: number;
}

export interface Thresholds {
  temperature: Threshold;
  humidity: Threshold;
  soil_moisture: Threshold;
  light_level: Threshold;
  ph_level: Threshold;
}