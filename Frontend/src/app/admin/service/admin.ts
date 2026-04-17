import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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
  private API = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Formateur CRUD
  creerFormateur(data: UtilisateurCreationDTO): Observable<UtilisateurResponseDTO> {
    return this.http.post<UtilisateurResponseDTO>(`${this.API}/admin/formateurs`, data);
  }

  modifierFormateur(id: number, data: UtilisateurUpdateDTO): Observable<UtilisateurResponseDTO> {
    return this.http.put<UtilisateurResponseDTO>(`${this.API}/admin/formateurs/${id}`, data);
  }

  supprimerFormateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/admin/formateurs/${id}`);
  }

  listerFormateurs(): Observable<UtilisateurResponseDTO[]> {
    return this.http.get<UtilisateurResponseDTO[]>(`${this.API}/admin/formateurs`);
  }

  getFormateurById(id: number): Observable<UtilisateurResponseDTO> {
    return this.http.get<UtilisateurResponseDTO>(`${this.API}/admin/formateurs/${id}`);
  }

  // Apprenant CRUD
 supprimerApprenant(id: number): Observable<void> {
  return this.http.delete<void>(`${this.API}/admin/apprenants/${id}`);
 }

listerApprenants(): Observable<UtilisateurResponseDTO[]> {
  return this.http.get<UtilisateurResponseDTO[]>(`${this.API}/admin/apprenants`);
 }

 // Formation CRUD

 getFormateurs() {
  return this.http.get<any[]>(`${this.API}/admin/formateurs`);
 }

 getDomaines() {
    return this.http.get<any[]>(`${this.API}/domaines/admin`);
 }

 getFormationsByDomaine(domaineId: string) {
    return this.http.get<any[]>(`${this.API}/formations/domaine/${domaineId}`);
 }

 createFormation(data: any) {
  return this.http.post(`${this.API}/formations`, data);
}

 getModules() {
    return this.http.get<any[]>(`${this.API}/modules/admin`);
 }

 createModule(data: any) {
    return this.http.post(`${this.API}/modules`, data);
 }

 deleteModule(id: number) {
    return this.http.delete(`${this.API}/modules/${id}`);
 }

 uploadDocument(moduleId: number, file: File) {
    const fd = new FormData();
    fd.append('file', file);

    return this.http.post(`${this.API}/documents/upload/${moduleId}`, fd);
 }

 uploadVideo(moduleId: number, file: File) {
    const fd = new FormData();
    fd.append('file', file);

    return this.http.post(`${this.API}/videos/upload/${moduleId}`, fd);
  }





}
