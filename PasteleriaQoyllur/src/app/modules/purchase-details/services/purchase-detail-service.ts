import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PurchaseDetails } from '../../../shared/models/purchaseDetails';

@Injectable({
  providedIn: 'root'
})
export class PurchaseDetailService {

  private apiUrl = 'http://localhost:3002/purchaseDetails';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PurchaseDetails[]> {
    return this.http.get<PurchaseDetails[]>(this.apiUrl);
  }

  getById(id: number): Observable<PurchaseDetails> {
    return this.http.get<PurchaseDetails>(`${this.apiUrl}/${id}`);
  }

  create(data: PurchaseDetails): Observable<PurchaseDetails> {
    return this.http.post<PurchaseDetails>(this.apiUrl, data);
  }

  update(data: PurchaseDetails): Observable<PurchaseDetails> {
    return this.http.put<PurchaseDetails>(`${this.apiUrl}/${data.id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
