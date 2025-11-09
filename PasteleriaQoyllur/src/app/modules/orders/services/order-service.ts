import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../../shared/models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'http://localhost:3002/orders';

  constructor(private http: HttpClient) {}

  // 🔹 Retorna todos los pedidos
  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }

  // 🔹 Retorna un pedido por ID
  getById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`);
  }

  // 🔹 Registra un nuevo pedido
  create(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, order);
  }

  // 🔹 Actualiza un pedido
  update(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/${order.id}`, order);
  }

  // 🔹 Elimina un pedido
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
