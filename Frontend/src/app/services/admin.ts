import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UtilisateurCreationDTO {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  roleNom: string;
}

export interface UtilisateurUpdateDTO {
  nom?: string;
  prenom?: string;
  email?: string;
  password?: string;
  roleNom?: string;
}

export interface UtilisateurResponseDTO {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  roleNom: string;
  actif: boolean;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  // Formateur CRUD
  creerFormateur(data: UtilisateurCreationDTO): Observable<UtilisateurResponseDTO> {
    return this.http.post<UtilisateurResponseDTO>(`${this.apiUrl}/formateurs`, data);
  }

  modifierFormateur(id: number, data: UtilisateurUpdateDTO): Observable<UtilisateurResponseDTO> {
    return this.http.put<UtilisateurResponseDTO>(`${this.apiUrl}/formateurs/${id}`, data);
  }

  supprimerFormateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/formateurs/${id}`);
  }

  listerFormateurs(): Observable<UtilisateurResponseDTO[]> {
    return this.http.get<UtilisateurResponseDTO[]>(`${this.apiUrl}/formateurs`);
  }

  // Apprenant CRUD
  supprimerApprenant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/apprenants/${id}`);
  }

  listerApprenants(): Observable<UtilisateurResponseDTO[]> {
    return this.http.get<UtilisateurResponseDTO[]>(`${this.apiUrl}/apprenants`);
  }
}
