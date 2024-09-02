import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}users/`;

  constructor(private http: HttpClient) { }

  register(username: any, email: string, password: string, confirm_password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}register/`, { username, email, password, confirm_password });
  }
  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}login/`, { email, password });
  }
  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    return this.http.get(`${environment.apiUrl}users/me/`, { headers });
  }

}
