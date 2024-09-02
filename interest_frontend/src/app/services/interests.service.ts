import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {

  private apiUrl = `${environment.apiUrl}interests/`;

  constructor(private http: HttpClient) { }

  getInterests(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}received/`, { headers });
  }

  getSentInterests(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}sent/`, { headers });
  }

  sendInterest(receiver: string, message: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
    });
    const body = {
      receiver: parseInt(receiver, 10),
      message: message
    };
    return this.http.post(`${this.apiUrl}send/`, body, { headers });
  }

  acceptInterest(interestId: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
    });
    const body = {
      status: 'accepted'
    };
    return this.http.put(`${this.apiUrl}respond/${interestId}/`, body, { headers });
  }

  rejectInterest(interestId: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
    });
    const body = {
      status: 'rejected'
    };
    return this.http.put(`${this.apiUrl}respond/${interestId}/`, body, { headers });
  }

}
