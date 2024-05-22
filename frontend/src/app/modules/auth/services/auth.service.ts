import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/login-credentials';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthUser } from '../models/auth-user.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService{

  apiUrl = `${environment.API_URL}/auth`

  isLoggedIn$ = new BehaviorSubject<boolean>(false)

  userRole$ = new BehaviorSubject<string | null>('')
  
  constructor(private http: HttpClient, private router: Router) { }


  register(user: User): Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/register`, user)
    
  }

  login(user: User): Observable<AuthUser>{
    return this.http.post<AuthUser>(`${this.apiUrl}/login`, user)
  }

  checkRole(): string | null{
    const role = localStorage.getItem(environment.USER_ROLE)
    this.userRole$.next(role)
    return this.userRole$.value
  }

  checkLogin(): Observable<boolean> {
    const token = localStorage.getItem(environment.TOKEN_KEY) 
    this.isLoggedIn$.next(!!token) 
    return this.isLoggedIn$
  }

  logout(): void{
    localStorage.removeItem(environment.TOKEN_KEY)
    localStorage.removeItem(environment.USER_ROLE)
    this.checkLogin()
    this.router.navigate(['auth', 'login'])
  }
}
