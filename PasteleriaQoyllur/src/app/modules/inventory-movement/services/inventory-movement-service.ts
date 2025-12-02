import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryMovement } from '../../../shared/models/inventoryMovement';

@Injectable({
  providedIn: 'root'
})
export class InventoryMovementService {

  private url = 'http://localhost:3002/inventoryMovements';

  constructor(private http: HttpClient) {}

  getAll(): Observable<InventoryMovement[]> {
    return this.http.get<InventoryMovement[]>(this.url);
  }

  getById(id: number): Observable<InventoryMovement> {
    return this.http.get<InventoryMovement>(`${this.url}/${id}`);
  }

  create(data: InventoryMovement): Observable<InventoryMovement> {
    return this.http.post<InventoryMovement>(this.url, data);
  }

  update(data: InventoryMovement): Observable<InventoryMovement> {
    return this.http.put<InventoryMovement>(`${this.url}/${data.id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
