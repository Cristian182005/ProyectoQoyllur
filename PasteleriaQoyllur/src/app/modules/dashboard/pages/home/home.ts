import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth-service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styles: ``,
})
export class Home implements OnInit {
  roleId: number | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.roleId = Number(this.authService.getRoleId());
  }

  get isAdmin(): boolean {
    return this.roleId === 1;
  }

  get isComercial(): boolean {
    return this.roleId === 2;
  }

  get isCompras(): boolean {
    return this.roleId === 3;
  }

  get isProduccion(): boolean {
    return this.roleId === 4;
  }

  get isInventario(): boolean {
    return this.roleId === 5;
  }
}
