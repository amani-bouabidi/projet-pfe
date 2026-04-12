import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Utilisateur } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCurrentUser(endpoint: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.api}${endpoint}`);
  }

  // Pour admin
  getAdminInfo(): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.api}/admin/me`);
  }

  // Pour formateur
  getFormateurInfo(): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.api}/formateur/me`);
  }

  // Pour apprenant
  getApprenantInfo(): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.api}/apprenant/me`);
  }
}
