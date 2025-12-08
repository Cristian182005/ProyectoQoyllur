import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecipeDetails } from '../../../shared/models/recipeDetails';

@Injectable({ providedIn: 'root' })
export class RecipeDetailService {
  private apiUrl = 'http://localhost:3002/recipeDetails';

  constructor(private http: HttpClient) {}

  getByRecipe(recipeId: number): Observable<RecipeDetails[]> {
    return this.http.get<RecipeDetails[]>(`${this.apiUrl}?recipeId=${recipeId}`);
  }

  create(detail: RecipeDetails): Observable<RecipeDetails> {
    return this.http.post<RecipeDetails>(this.apiUrl, detail);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAll() {
    return this.http.get<RecipeDetails[]>(this.apiUrl);
  }
}
