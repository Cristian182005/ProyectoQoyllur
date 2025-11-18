import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Suppliers } from '../../../shared/models/suppliers';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private apiUrl = 'http://localhost:3002/suppliers';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Suppliers[]> {
    return this.http.get<Suppliers[]>(this.apiUrl);
  }

  getById(id: number): Observable<Suppliers> {
    return this.http.get<Suppliers>(`${this.apiUrl}/${id}`);
  }

  create(supplier: Suppliers): Observable<Suppliers> {
    return this.http.post<Suppliers>(this.apiUrl, supplier);
  }

  update(supplier: Suppliers): Observable<Suppliers> {
    return this.http.put<Suppliers>(`${this.apiUrl}/${supplier.id}`, supplier);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
