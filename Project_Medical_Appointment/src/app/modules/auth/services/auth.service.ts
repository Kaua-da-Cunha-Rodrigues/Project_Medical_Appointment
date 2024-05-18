import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/login-credentials';
import { Observable } from 'rxjs';
import { AuthUser } from '../models/auth-user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = `${environment.API_URL}/auth`
  
  constructor(private http: HttpClient) { }

  register(user: User): Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/register`, user)
    
  }

  login(user: User): Observable<AuthUser>{
    return this.http.post<AuthUser>(`${this.apiUrl}/login`, user)
    
  }
}
