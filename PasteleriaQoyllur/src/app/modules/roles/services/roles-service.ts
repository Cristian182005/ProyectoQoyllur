import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../../../shared/models/role';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private url = 'http://localhost:3002/roles';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(this.url);
  }

  getById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.url}/${id}`);
  }

  create(data: Role): Observable<Role> {
    return this.http.post<Role>(this.url, data);
  }

  update(data: Role): Observable<Role> {
    return this.http.put<Role>(`${this.url}/${data.id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
