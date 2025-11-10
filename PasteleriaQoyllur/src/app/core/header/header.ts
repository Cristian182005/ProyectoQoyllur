import { Component } from '@angular/core';
import { AuthService } from '../../modules/auth/services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styles: ``,
})
export class Header {
  constructor(private auth: AuthService, private router: Router) {}

  goHome(): void {
    this.router.navigate(['/dashboard']);
  }
  logout() {
    this.auth.logout();
    alert('Sesión cerrada correctamente 👋');
    this.router.navigate(['/login']);
  }
}
