import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../../../shared/models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersHttpService {

  private url = 'http://localhost:3002/users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Users[]> {
    return this.http.get<Users[]>(this.url);
  }
}
