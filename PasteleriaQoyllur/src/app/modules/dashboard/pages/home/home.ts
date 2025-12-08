import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  standalone: false
})
export class DashboardHome implements OnInit {

  roleId: number | null = null;
  roleName: string = '';
  welcomeMessage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const session = this.authService.getSession();

    this.roleId = Number(session?.roleId);
    this.roleName = session?.employee?.roleName || '';

    this.setWelcomeMessage();
  }

  setWelcomeMessage() {
    switch (this.roleId) {
      case 1:
        this.welcomeMessage = 'Bienvenido Administrador General 👑';
        break;
      case 2:
        this.welcomeMessage = 'Bienvenido al Módulo Comercial 🛒';
        break;
      case 3:
        this.welcomeMessage = 'Bienvenido al Módulo de Compras 📦';
        break;
      case 4:
        this.welcomeMessage = 'Bienvenido al Módulo de Producción 👨‍🍳';
        break;
      case 5:
        this.welcomeMessage = 'Bienvenido al Módulo de Inventario 📊';
        break;
      default:
        this.welcomeMessage = 'Bienvenido a QOYLLUR Pastelería ✨';
        break;
    }
  }

  // Helpers para el HTML
  get isAdmin() { return this.roleId === 1; }
  get isComercial() { return this.roleId === 2; }
  get isCompras() { return this.roleId === 3; }
  get isProduccion() { return this.roleId === 4; }
  get isInventario() { return this.roleId === 5; }
}
