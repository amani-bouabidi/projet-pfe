export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  role: 'ADMIN' | 'FORMATEUR' | 'APPRENANT';
  specialite?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;    // ✅ Changé de 'token' à 'accessToken'
  refreshToken: string;   // ✅ Nouveau champ
  role: 'ADMIN' | 'FORMATEUR' | 'APPRENANT';
}

export interface RegisterRequest {
  nom: string;        // ✅ Attention: backend utilise 'nom' et 'prenom'
  prenom: string;
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  message?: string;
}

export interface FormateurCreateRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  specialite: string;
}
