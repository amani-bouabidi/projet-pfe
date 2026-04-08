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
  token: string;
  role: 'ADMIN' | 'FORMATEUR' | 'APPRENANT';
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
}

export interface FormateurCreateRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  specialite: string;
}

export interface FormateurUpdateRequest {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  specialite?: string;
  password?: string;
  isActive?: boolean;
}
