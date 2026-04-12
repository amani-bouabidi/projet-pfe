import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { AuthLeft } from '../../components/auth-left/auth-left';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    AuthLeft
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.redirectByRole();
    }
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.redirectByRole();
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
  }

  private redirectByRole(): void {
    const role = this.authService.getUserRole();
    if (role === 'ADMIN') {
      this.router.navigate(['/admin/dashboard']);
    } else if (role === 'FORMATEUR') {
      this.router.navigate(['/formateur/dashboard']);
    } else if (role === 'APPRENANT') {
      this.router.navigate(['/apprenant/dashboard']);
    } else {
      this.router.navigate(['/public/catalogue']);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
