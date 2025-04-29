export interface User {
  id: string;
  email: string;
  username?: string;
  is_admin: boolean;
  is_active: boolean;
  created_at: string; // ISO date
  updated_at: string; // ISO date
}

export interface UserCreate {
  email: string;
  password: string;
  username?: string;
  is_admin?: boolean;
  is_active?: boolean;
}

export interface UserUpdate {
  email?: string;
  password?: string;
  username?: string;
  is_admin?: boolean;
  is_active?: boolean;
}

export interface UserCount {
  admin: number;
  non_admin: number;
}