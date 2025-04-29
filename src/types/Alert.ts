export interface Alert {
    id: string;
    greenhouse_id: string;
    user_id: string;
    message: string;
    severity: 'low' | 'medium' | 'high';
    is_read: boolean;
    created_at: string; // ISO date
    updated_at: string; // ISO date
  }
  
export interface AlertUpdate {
    is_read?: boolean;
  }