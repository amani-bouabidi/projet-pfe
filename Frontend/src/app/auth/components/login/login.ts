import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth';   // ← .service ajouté (souvent la cause)
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthLeft } from '../../../components/auth-left/auth-left';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AuthLeft],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {

    this.auth.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.jwt);
        localStorage.setItem('refresh', res.refreshToken);
        localStorage.setItem('role', res.role);

        if (res.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if (res.role === 'FORMATEUR') {
          this.router.navigate(['/formateur']);
        } else {
          this.router.navigate(['/apprenant']);
        }
      },

      error: () => {
        alert("Email ou mot de passe incorrect ");
      }
    })

  }}
