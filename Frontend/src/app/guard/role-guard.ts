import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data['role'];

  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const userRole = auth.getRole();

  if (userRole === expectedRole) {
    return true;
  }

  switch(userRole) {
    case 'ADMIN':
      router.navigate(['/admin']);
      break;
    case 'FORMATEUR':
      router.navigate(['/formateur']);
      break;
    case 'APPRENANT':
      router.navigate(['/apprenant']);
      break;
    default:
      router.navigate(['/login']);
  }
  return false;
};
