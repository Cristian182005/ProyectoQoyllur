import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingredients } from '../../../shared/models/ingredients';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private apiUrl = 'http://localhost:3002/ingredients';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Ingredients[]> {
    return this.http.get<Ingredients[]>(this.apiUrl);
  }

  getById(id: number): Observable<Ingredients> {
    return this.http.get<Ingredients>(`${this.apiUrl}/${id}`);
  }

  create(ing: Ingredients): Observable<Ingredients> {
    return this.http.post<Ingredients>(this.apiUrl, ing);
  }

  update(ing: Ingredients): Observable<Ingredients> {
    return this.http.put<Ingredients>(`${this.apiUrl}/${ing.id}`, ing);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
