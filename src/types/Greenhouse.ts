export interface Greenhouse {
    id: string;
    name: string;
    description?: string;
    user_id: string;
    location?: string;
    temperature?: number;
    humidity?: number;
    light_level?: number;
    soil_moisture?: number;
    ph_level?: number;
    co2_level?: number;
    temperature_threshold?: number;
    humidity_threshold?: number;
    ph_level_min?: number;
    ph_level_max?: number;
    co2_level_max?: number;
    connectivity: string;
    system_status: string;
    intrusion: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  }
  
  export interface GreenhouseCreate {
    name: string;
    description?: string;
    user_id: string;
    location?: string;
  }
  
  export interface GreenhouseUpdate {
    name?: string;
    location?: string;
    description?: string;
    temperature_threshold?: number;
    humidity_threshold?: number;
    ph_level_min?: number;
    ph_level_max?: number;
    co2_level_max?: number;
    is_active?: boolean;
    connectivity: string;
    system_status: string;
    intrusion: string;
  }