import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, of, Observable } from 'rxjs';
import { Users } from '../../../shared/models/users';
import { Employee } from '../../../shared/models/employee';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private usersUrl = 'http://localhost:3002/users';
  private employeesUrl = 'http://localhost:3002/employees';
  private storageKey = 'session';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .get<Users[]>(`${this.usersUrl}?username=${username}&password=${password}`)
      .pipe(
        mergeMap(users => {
          if (users.length === 0) {
            return of(false);
          }

          const user = users[0];

          // Obtener empleado asociado al usuario
          return this.http
            .get<Employee[]>(`${this.employeesUrl}?userId=${user.id}`)
            .pipe(
              map((employees) => {
                if (employees.length === 0) return false;

                const employee = employees[0];

                // Guardar sesión completa
                localStorage.setItem(this.storageKey, JSON.stringify({
                  user,
                  employee,
                  roleId: Number(employee.roleId)
                }));

                return true;
              })
            );
        })
      );
  }

  logout() {
    localStorage.removeItem(this.storageKey);
  }

  getSession() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }

  getRoleId(): number | null {
    const session = this.getSession();
    return session ? session.roleId : null;
  }
}
