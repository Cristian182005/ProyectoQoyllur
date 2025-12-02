import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../../shared/models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url = 'http://localhost:3002/employees';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
  }

  getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.url}/${id}`);
  }

  create(data: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.url, data);
  }

  update(data: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.url}/${data.id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
