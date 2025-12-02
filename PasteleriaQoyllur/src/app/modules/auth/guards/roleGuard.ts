import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(route: any): boolean {

    const allowedRoles = route.data['roles']; // roles permitidos
    const userRole = this.auth.getRoleId();

    if (!userRole) {
      this.router.navigate(['/auth']);
      return false;
    }

    if (!allowedRoles.includes(userRole)) {
      alert('No tienes permiso para acceder a esta sección.');
      return false;
    }

    return true;
  }
}
