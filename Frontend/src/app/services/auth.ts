import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RefreshTokenRequest,
  RefreshTokenResponse
} from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = environment.apiUrl;
  private refreshTokenTimeout?: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Inscription - Crée un compte avec rôle APPRENANT
   */
  register(data: RegisterRequest): Observable<string> {
    return this.http.post(`${this.api}/auth/register`, data, { responseType: 'text' });
  }

  /**
   * Connexion
   */
  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api}/auth/login`, data).pipe(
      tap((res: LoginResponse) => {
        this.setSession(res);
      })
    );
  }

  /**
   * Rafraîchir le token
   */
  refreshToken(): Observable<RefreshTokenResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    return this.http.post<RefreshTokenResponse>(`${this.api}/auth/refresh`, refreshToken).pipe(
      tap((res: RefreshTokenResponse) => {
        this.updateAccessToken(res.accessToken);
      })
    );
  }

  /**
   * Déconnexion
   */
  logout(): void {
    const refreshToken = this.getRefreshToken();
    if (refreshToken) {
      this.http.post(`${this.api}/auth/logout?refreshTokenString=${refreshToken}`, {}).subscribe({
        next: () => console.log('Logout successful'),
        error: (err) => console.error('Logout error', err)
      });
    }
    this.clearSession();
    this.router.navigate(['/login']);
  }

  /**
   * Stocker la session
   */
  private setSession(authResult: LoginResponse): void {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('refresh_token', authResult.refreshToken);
    localStorage.setItem('role', authResult.role);
    this.startRefreshTokenTimer();
  }

  /**
   * Mettre à jour l'access token
   */
  private updateAccessToken(token: string): void {
    localStorage.setItem('access_token', token);
    this.startRefreshTokenTimer();
  }

  /**
   * Nettoyer la session
   */
  private clearSession(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    this.stopRefreshTokenTimer();
  }

  /**
   * Démarrer le timer pour rafraîchir le token
   */
  private startRefreshTokenTimer(): void {
    // Récupérer l'expiration du token (par défaut 24h)
    const token = this.getAccessToken();
    if (!token) return;

    // Décoder le token JWT pour obtenir l'expiration
    try {
      const jwtPayload = JSON.parse(atob(token.split('.')[1]));
      const expires = new Date(jwtPayload.exp * 1000);
      const timeout = expires.getTime() - Date.now() - (60 * 1000); // Rafraîchir 1 minute avant expiration

      this.refreshTokenTimeout = setTimeout(() => {
        this.refreshToken().subscribe();
      }, timeout);
    } catch (e) {
      console.error('Error decoding token', e);
    }
  }

  private stopRefreshTokenTimer(): void {
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
    }
  }

  // ==================== GETTERS ====================
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // Note: Le backend ne retourne pas userId, email, firstName dans le login
  // Vous devez faire un appel supplémentaire ou stocker ces infos après login
  getUserId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? parseInt(id) : null;
  }

  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  isFormateur(): boolean {
    return this.getRole() === 'FORMATEUR';
  }

  isApprenant(): boolean {
    return this.getRole() === 'APPRENANT';
  }

  // Stocker les informations utilisateur supplémentaires
  setUserInfo(userId: number, email: string, firstName: string, lastName: string): void {
    localStorage.setItem('userId', userId.toString());
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', `${firstName} ${lastName}`);
  }

  redirectToDashboard(): void {
    const role = this.getRole();
    switch(role) {
      case 'ADMIN':
        this.router.navigate(['/admin']);
        break;
      case 'FORMATEUR':
        this.router.navigate(['/formateur']);
        break;
      case 'APPRENANT':
        this.router.navigate(['/apprenant']);
        break;
      default:
        this.router.navigate(['/login']);
    }
  }
}
