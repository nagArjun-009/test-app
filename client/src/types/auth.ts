export interface User {
  id: string;
  username: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  theme: 'light' | 'dark' | 'system';
}

export interface ApiError {
  message: string;
}
