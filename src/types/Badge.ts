// src/types/Badge.ts
export interface Badge {
  id: string;
  name: string;
  user_id: string;
  greenhouse_id: string;
  created_at: string;
}

export interface BadgeCreate {
  name: string;
  user_id: string;
  greenhouse_id: string;
}