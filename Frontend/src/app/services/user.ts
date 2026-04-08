import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCurrentUser(endpoint: string): Observable<User> {
    return this.http.get<User>(`${this.api}${endpoint}`);
  }

  // Pour admin
  getAdminInfo(): Observable<User> {
    return this.http.get<User>(`${this.api}/admin/me`);
  }

  // Pour formateur
  getFormateurInfo(): Observable<User> {
    return this.http.get<User>(`${this.api}/formateur/me`);
  }

  // Pour apprenant
  getApprenantInfo(): Observable<User> {
    return this.http.get<User>(`${this.api}/apprenant/me`);
  }
}
