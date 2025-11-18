import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Units } from '../../../shared/models/units';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  private apiUrl = 'http://localhost:3002/units';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Units[]> {
    return this.http.get<Units[]>(this.apiUrl);
  }

  getById(id: number): Observable<Units> {
    return this.http.get<Units>(`${this.apiUrl}/${id}`);
  }

  create(unit: Units): Observable<Units> {
    return this.http.post<Units>(this.apiUrl, unit);
  }

  update(unit: Units): Observable<Units> {
    return this.http.put<Units>(`${this.apiUrl}/${unit.id}`, unit);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
