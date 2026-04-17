import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userRole = localStorage.getItem('roles');
    const allowedRoles = route.data['roles']

    if (!userRole || allowedRoles.includes(userRole)) {
      alert("access denied");
      return false;
    }

   return true;
  }
}
