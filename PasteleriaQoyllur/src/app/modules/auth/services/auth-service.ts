import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;
  private userName = '';

  login(username: string, password: string): boolean {
    // Simulación de login: usuario "admin", clave "1234"
    if (username === 'admin' && password === '1234') {
      this.loggedIn = true;
      this.userName = username;
      localStorage.setItem('user', username);
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn = false;
    this.userName = '';
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return this.loggedIn || !!localStorage.getItem('user');
  }

  getUser(): string {
    return this.userName || localStorage.getItem('user') || '';
  }
}
