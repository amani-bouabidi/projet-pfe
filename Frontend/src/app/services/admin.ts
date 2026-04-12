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

  getAllDomaines(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/domaines`);
  }

  getDomainesWithFormations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/domaines/with-formations`);
  }

  getDomainesStats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/domaines/stats`);
  }

  getAllFormations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/formations/all`);
  }

  /** Formations par domaine */
  getFormationsByDomaine(domaineId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/formations/domaine/${domaineId}`);
  }

  /** Détail d'une formation + ses modules */
  getFormationWithModules(formationId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/formations/${formationId}/modules`);
  }

  /** Créer une formation (US22) */
  createFormation(formation: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/formations`, formation);
  }

  /** Modifier une formation (US23) */
  updateFormation(id: number, formation: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/formations/${id}`, formation);
  }

  /** Supprimer une formation (US24) */
  deleteFormation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/formations/${id}`);
  }

  // ====================== MODULES ======================

  /** Récupérer les modules d'une formation */
  getModulesByFormation(formationId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/modules/formation/${formationId}`);
  }

  /** Récupérer le contenu complet d'un module (Documents + Vidéos) */
  getModuleContent(moduleId: number): Observable<any> {
    // On passe l'email de l'utilisateur connecté (récupéré via AuthService)
    const email = localStorage.getItem('userEmail') || '';
    return this.http.get<any>(`${this.apiUrl}/modules/${moduleId}/content?email=${email}`);
  }

  // ====================== RESSOURCES (Documents & Vidéos) ======================

  /** Upload Document */
  uploadDocument(moduleId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.apiUrl}/documents/upload/${moduleId}`, formData);
  }

  /** Upload Vidéo */
  uploadVideo(moduleId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.apiUrl}/videos/upload/${moduleId}`, formData);
  }




}
