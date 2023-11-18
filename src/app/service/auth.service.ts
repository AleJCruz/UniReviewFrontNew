import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {environment} from "../../environments/environment";
const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = "http://18.217.87.35:8080/" + "authenticate";
  private userUrl = `${base_url}` + "user/me";
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());
  authStatus$ = this.authStatus.asObservable();
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http:HttpClient) { }

  authenticate(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.authUrl, { username, password }, this.httpOptions).pipe(
      tap(response => {
        if (response.jwttoken) {
          localStorage.setItem('token', response.jwttoken);
          this.setAuthStatus(true);
        }
      })
    );
  }

  getUserData(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(this.userUrl, { headers });
  }

  logOut(): void {
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.setAuthStatus(false);
  }
  setAuthStatus(value: boolean) {
    this.authStatus.next(value);
  }
  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }
}
