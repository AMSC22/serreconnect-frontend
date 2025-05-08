export interface Alert {
  id: string;
  greenhouse_id: string;
  type: string; // ex. "temperature_high", "humidity_low"
  value: number;
  message: string;
  is_resolved: boolean;
  created_at: string; // ISO date
  updated_at: string; // ISO date
}

export interface AlertCreate {
  greenhouse_id: string;
  type: string;
  value: number;
  message: string;
}

export interface AlertUpdate {
  is_resolved?: boolean;
}