export interface Thresholds {
    temperature: { min: number; max: number };
    humidity_air: { min: number; max: number };
    humidity_soil: { min: number; max: number };
    luminosity: { min: number; max: number };
    fertility: { min: number; max: number };
  }