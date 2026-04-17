import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoginRequest, RegisterRequest, AuthResponse } from '../../models/auth';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API}/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.API}/register`, data);
  }

  refresh(): Observable<AuthResponse> {
    const refreshToken = localStorage.getItem('refresh');
    return this.http.post<AuthResponse>(`${this.API}/refresh`, refreshToken);
  }

  saveAuth(res: AuthResponse) {
    localStorage.setItem('token', res.jwt);
    localStorage.setItem('refresh', res.refreshToken);
    localStorage.setItem('role', res.role);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    const refreshToken = localStorage.getItem('refresh');

    if (refreshToken) {
      this.http.post(`${this.API}/logout?refreshTokenString=${refreshToken}`, {}).subscribe();
    }

    localStorage.clear
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

