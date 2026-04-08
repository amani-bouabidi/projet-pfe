import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { UserService } from '../../services/user'; // Service pour récupérer les infos utilisateur
import { AuthLeft } from '../../components/auth-left/auth-left';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, AuthLeft],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        // Après login, récupérer les infos utilisateur
        this.loadUserInfo(response.role);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Email ou mot de passe incorrect';
        this.isLoading = false;
      }
    });
  }

  private loadUserInfo(role: string): void {
    // Appeler un endpoint pour récupérer les infos de l'utilisateur connecté
    // Selon le rôle, appeler le bon endpoint
    let endpoint = '';
    switch(role) {
      case 'ADMIN':
        endpoint = '/api/admin/me';
        break;
      case 'FORMATEUR':
        endpoint = '/api/formateur/me';
        break;
      case 'APPRENANT':
        endpoint = '/api/apprenant/me';
        break;
      default:
        endpoint = '/api/users/me';
    }

    this.userService.getCurrentUser(endpoint).subscribe({
      next: (user) => {
        this.authService.setUserInfo(user.id, user.email, user.firstName, user.lastName);
        this.authService.redirectToDashboard();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading user info', err);
        // Même sans infos, on redirige
        this.authService.redirectToDashboard();
        this.isLoading = false;
      }
    });
  }
}
