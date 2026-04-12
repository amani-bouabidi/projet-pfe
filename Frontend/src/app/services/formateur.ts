import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Formation {
  id: number;
  titre: string;
  description: string;
  duree: number;
  prix: number;
  dateDebut: string;
  dateFin: string;
  formateurId: number;
  categorie?: string;
  niveau?: string;
  progressionMoyenne?: number;
  apprenantsCount?: number;
  modulesCount?: number;
}

export interface Session {
  id: number;
  titre: string;
  description: string;
  date: string;
  heure: string;
  duree: number;
  lien: string;
  formationId: number;
  formationTitre?: string;
  statut: 'A_VENIR' | 'EN_COURS' | 'TERMINE';
}

export interface StatsFormateur {
  totalFormations: number;
  totalApprenants: number;
  totalSessions: number;
  tauxReussite: number;
  sessionsMois: number;
}

@Injectable({ providedIn: 'root' })
export class FormateurService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ==================== STATISTIQUES ====================
  getStats(): Observable<StatsFormateur> {
    return this.http.get<StatsFormateur>(`${this.api}/formateur/stats`);
  }

  // ==================== FORMATIONS ====================
  getFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.api}/formateur/formations`);
  }

  getFormationById(formationId: number): Observable<Formation> {
    return this.http.get<Formation>(`${this.api}/formateur/formations/${formationId}`);
  }

  // ==================== PRÉREQUIS ====================
  getPrerequis(formationId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.api}/formateur/formations/${formationId}/prerequis`);
  }

  addPrerequis(formationId: number, prerequis: string): Observable<void> {
    return this.http.post<void>(`${this.api}/formateur/formations/${formationId}/prerequis`, { nom: prerequis });
  }

  deletePrerequis(formationId: number, prerequis: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/formateur/formations/${formationId}/prerequis/${encodeURIComponent(prerequis)}`);
  }

  // ==================== SESSIONS ====================
  getSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.api}/formateur/sessions`);
  }

  getSessionsByFormation(formationId: number): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.api}/formateur/formations/${formationId}/sessions`);
  }

  createSession(session: Partial<Session>): Observable<Session> {
    return this.http.post<Session>(`${this.api}/formateur/sessions`, session);
  }

  updateSession(sessionId: number, session: Partial<Session>): Observable<Session> {
    return this.http.put<Session>(`${this.api}/formateur/sessions/${sessionId}`, session);
  }

  deleteSession(sessionId: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/formateur/sessions/${sessionId}`);
  }

  startSession(sessionId: number): Observable<{ lien: string }> {
    return this.http.post<{ lien: string }>(`${this.api}/formateur/sessions/${sessionId}/start`, {});
  }

  // ==================== APPRENANTS ====================
  getApprenantsByFormation(formationId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/formateur/formations/${formationId}/apprenants`);
  }

  getApprenantProgress(apprenantId: number, formationId: number): Observable<any> {
    return this.http.get(`${this.api}/formateur/apprenants/${apprenantId}/formations/${formationId}/progression`);
  }

  // ==================== ÉVALUATIONS ====================
  getEvaluations(formationId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/formateur/formations/${formationId}/evaluations`);
  }

  addEvaluation(formationId: number, evaluation: any): Observable<any> {
    return this.http.post(`${this.api}/formateur/formations/${formationId}/evaluations`, evaluation);
  }
}
