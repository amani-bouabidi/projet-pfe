import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles'] as Array<string>;
    const userRole = this.authService.getUserRole();

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (expectedRoles && userRole && expectedRoles.includes(userRole)) {
      return true;
    }

    // Redirect based on role
    if (userRole === 'ADMIN') {
      this.router.navigate(['/admin/dashboard']);
    } else if (userRole === 'FORMATEUR') {
      this.router.navigate(['/formateur/dashboard']);
    } else if (userRole === 'APPRENANT') {
      this.router.navigate(['/apprenant/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
    return false;
  }
}
