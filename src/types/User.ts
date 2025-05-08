export interface User {
  id: string;
  username: string;
  email: string;
  is_admin: boolean;
  is_active: boolean;
  created_at: string; // ISO date
  updated_at: string; // ISO date
}

export interface UserCreate {
  username: string;
  email: string;
  password: string;
  is_admin?: boolean;
  is_active?: boolean;
}

export interface UserUpdate {
  username?: string;
  email?: string;
  password?: string;
  is_admin?: boolean;
  is_active?: boolean;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}