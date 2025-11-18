import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipes } from '../../../shared/models/recipes';

@Injectable({ providedIn: 'root' })
export class RecipeService {

  private apiUrl = 'http://localhost:3002/recipes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Recipes[]> {
    return this.http.get<Recipes[]>(this.apiUrl);
  }

  getById(id: number): Observable<Recipes> {
    return this.http.get<Recipes>(`${this.apiUrl}/${id}`);
  }

  create(data: Recipes): Observable<Recipes> {
    return this.http.post<Recipes>(this.apiUrl, data);
  }

  update(data: Recipes): Observable<Recipes> {
    return this.http.put<Recipes>(`${this.apiUrl}/${data.id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
