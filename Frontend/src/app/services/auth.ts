import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginRequest, RegisterRequest, AuthResponse } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_ROLE_KEY = 'user_role';
  private readonly USER_EMAIL_KEY = 'user_email';
  private readonly USER_NAME_KEY = 'user_name';

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          this.setTokens(response.jwt, response.refreshToken);
          this.setUserData(credentials.email, response.role);
        }),
        catchError(this.handleError)
      );
  }

  register(userData: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData)
      .pipe(catchError(this.handleError));
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/refresh`, refreshToken)
      .pipe(
        tap(response => {
          this.setTokens(response.jwt, response.refreshToken);
        }),
        catchError(this.handleError)
      );
  }

  logout(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (refreshToken) {
      return this.http.post(`${this.apiUrl}/auth/logout?refreshTokenString=${refreshToken}`, {})
        .pipe(
          tap(() => this.clearAll()),
          catchError(error => {
            this.clearAll();
            return throwError(() => error);
          })
        );
    }
    this.clearAll();
    return new Observable(observer => observer.next(null));
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  private setUserData(email: string, role: string): void {
    localStorage.setItem(this.USER_EMAIL_KEY, email);
    localStorage.setItem(this.USER_ROLE_KEY, role);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.USER_ROLE_KEY);
  }

  getUserEmail(): string | null {
    return localStorage.getItem(this.USER_EMAIL_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  clearAll(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_ROLE_KEY);
    localStorage.removeItem(this.USER_EMAIL_KEY);
    localStorage.removeItem(this.USER_NAME_KEY);
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'Une erreur est survenue';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else if (error.status === 401) {
      errorMessage = 'Email ou mot de passe incorrect';
    } else if (error.status === 400) {
      errorMessage = error.error || 'Requête invalide';
    } else if (error.status === 403) {
      errorMessage = 'Accès non autorisé';
    }
    return throwError(() => new Error(errorMessage));
  }
}
