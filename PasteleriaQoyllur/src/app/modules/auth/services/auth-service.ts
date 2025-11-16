// src/app/modules/auth/services/auth-service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Users } from '../../../shared/models/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3002/users';
  private storageKey = 'user';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .get<Users[]>(`${this.apiUrl}?username=${username}&password=${password}`)
      .pipe(
        map((users: Users[]) => {
          if (users.length > 0 && users[0]) {
            // Guarda al usuario completo (incluyendo id autogenerado)
            localStorage.setItem(this.storageKey, JSON.stringify(users[0]));
            return true;
          }
          return false;
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }

  getUser(): Users | null {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }
}
