import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from '../../../shared/models/inventory';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private url = 'http://localhost:3002/inventory';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.url);
  }

  getById(id: number): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.url}/${id}`);
  }

  create(data: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(this.url, data);
  }

  update(data: Inventory): Observable<Inventory> {
    return this.http.put<Inventory>(`${this.url}/${data.id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
