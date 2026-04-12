export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nom: string;
  prenom: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  jwt: string;
  refreshToken: string;
  role: string;
}

export interface User {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  role: 'ADMIN' | 'FORMATEUR' | 'APPRENANT';
}
