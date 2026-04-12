import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, FormsModule , ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { AuthLeft } from '../../components/auth-left/auth-left';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule,
          ReactiveFormsModule, FormsModule,
           AuthLeft],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
    this.initForm();
  }

  private initForm(): void {
    this.registerForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { confirmPassword, ...registerData } = this.registerForm.value;

    this.authService.register(registerData).subscribe({
      next: (response: any) => {
        this.successMessage = response || 'Compte créé avec succès !';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
